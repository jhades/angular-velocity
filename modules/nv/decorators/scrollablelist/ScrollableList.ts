import {Directive, onChange, ElementRef} from 'angular2/angular2';
import {NavigationAction, NavActionEnum,ScrollableListElement} from 'angular-velocity';

/**
 *
 * @ngdoc Decorator
 *
 * @description
 * Decorates a list of elements for adding common scrolling features:
 *
 * - scrolling via the up and down keyboard arrows
 * - allow the mouse to take over the scrolling from the keyboard and vice-versa
 * - support for disabled elements
 *
 * @see ScrollableListElement
 *
 */

@Directive({
    selector: "[nv-scrollable-list]",
    properties: ['navigationAction'],
    lifecycle: [onChange]

})
export class ScrollableList {
    navigationAction: NavigationAction;
    scrollableElements: Array<ScrollableListElement> = [];
    selectedIndex: number = null;
    scrollIntoViewOngoing: boolean = false;

    constructor(private el: ElementRef) {

    }

    onChange(changes) {
        if (changes['navigationAction'] && this.navigationAction) {
            var action = this.navigationAction.actionType;
            switch(action) {
                case NavActionEnum.DOWN:
                    this.onArrowDown();
                    break;
                case NavActionEnum.UP:
                    this.onArrowUp();
                    break;
            }
        }
        else if (this.navigationAction === null) {
            this.selectedIndex = null;
        }
    }

    addScrollableElement(scrollableElement) {
        this.scrollableElements.push(scrollableElement);
    }

    onArrowDown() {
        if (this.existsNextEnabledElement()) {
            this.highlightNext();
            this.scrollHighlightedIntoViewIfNeeded();
            if(this.getCurrentHighlighted().disabled) {
                this.onArrowDown();
            }
        }
    }

    existsNextEnabledElement() {
        return this.scrollableElements.slice(this.selectedIndex + 1, this.scrollableElements.length).some((el: ScrollableListElement) => !el.disabled);
    }

    onArrowUp() {
        if (this.existsPreviousEnabledElement()) {
            this.highlightPrevious();
            this.scrollHighlightedIntoViewIfNeeded();
            if(this.getCurrentHighlighted().disabled) {
                this.onArrowUp();
            }
        }
    }

    scrollHighlightedIntoViewIfNeeded() {
        var deltaScrollDown = (this.getCurrentHighlighted().el.nativeElement.offsetTop + this.getCurrentHighlighted().el.nativeElement.offsetHeight  - this.el.nativeElement.scrollTop - this.el.nativeElement.offsetHeight);
        if (deltaScrollDown > 0) {
            this.launchScroll(deltaScrollDown);
        }
        var deltaScrollUp = (this.getCurrentHighlighted().el.nativeElement.offsetTop - this.el.nativeElement.scrollTop);
        if (deltaScrollUp < 0) {
            this.launchScroll(deltaScrollUp);
        }
    }

    private launchScroll(scrollOffset) {
        var scrollHandler = (evt) => {
            this.el.nativeElement.removeEventListener('scroll', scrollHandler);
            setTimeout(() => this.scrollIntoViewOngoing = false, 100);
        };
        this.scrollIntoViewOngoing = true;
        this.el.nativeElement.addEventListener('scroll', scrollHandler);
        this.el.nativeElement.scrollTop += scrollOffset;
    }

    existsPreviousEnabledElement() {
        return this.scrollableElements.slice(0, this.selectedIndex).some((el: ScrollableListElement) => !el.disabled);
    }

    getCurrentHighlighted() : ScrollableListElement {
        return  this.scrollableElements[this.selectedIndex];
    }

    highlightNext() {
        if (this.selectedIndex === null) {
            this.selectedIndex = 0;
        }
        else if (this.scrollableElements.length >= this.selectedIndex + 1) {
            this.getCurrentHighlighted().highlightOff();
            this.selectedIndex += 1;
        }
        this.getCurrentHighlighted().highlightOn();
    }

    highlightPrevious() {
        if (this.selectedIndex > 0) {
            this.getCurrentHighlighted().highlightOff();
            this.selectedIndex -= 1;
            this.getCurrentHighlighted().highlightOn();
        }
    }

    setHighlightedIndex(se: ScrollableListElement) {
        this.selectedIndex = this.scrollableElements.indexOf(se);
    }


    scrollStep(scrollSteps:number) {
        this.el.nativeElement.scrollTop += scrollSteps * 22;
    }
}
