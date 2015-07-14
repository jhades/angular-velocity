import {Directive, onChange, ElementRef} from 'angular2/angular2';
import {LastNavAction,ScrollableListElement} from 'angular-velocity';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';

/**
 *
 * @ngdoc Decorator
 *
 * @description
 * Decorates a list of elements for adding common scrolling features:
 *
 * - scrolling via the up and down keyboard arrows
 * - allow the mouse to take over the scrolling from the keyboard and vice-versa
 *
 * @see ScrollableListElement
 *
 */

@Directive({
    selector: "[nv-scrollable-list]",
    properties: ['lastNavAction'],
    lifecycle: [onChange]

})
export class ScrollableList {
    lastNavAction: LastNavAction;
    scrollableElements: Array<ScrollableListElement> = [];
    selectedIndex: number = null;
    scrollIntoViewOngoing: boolean = false;

    constructor(private keyUtils: KeyboardUtils, private el: ElementRef) {

    }

    onChange(changes) {
        if (changes['lastNavAction'] && this.lastNavAction) {
            var key = this.lastNavAction.value;
            if (this.keyUtils.isArrowDown(key)) {
                this.onArrowDown();
            }
            else if (this.keyUtils.isArrowUp(key)) {
                this.onArrowUp();
            }
        }
        else if (this.lastNavAction === null) {
            this.selectedIndex = null;
        }
    }

    addScrollableElement(scrollableElement) {
        this.scrollableElements.push(scrollableElement);
    }

    onArrowDown() {
        if (this.existsNextEnabledElement()) {
            this.highlightNext();
            this.scrollElementIntoViewIfNeeded();
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
            this.scrollElementIntoViewIfNeeded();
            if(this.getCurrentHighlighted().disabled) {
                this.onArrowUp();
            }
        }
    }

    existsPreviousEnabledElement() {
        return this.scrollableElements.slice(0, this.selectedIndex).some((el: ScrollableListElement) => !el.disabled);
    }

    scrollElementIntoViewIfNeeded() {
        if (this.getCurrentHighlighted()) {
            var shouldScrollDown = this.getCurrentHighlighted().el.nativeElement.offsetTop +
                this.getCurrentHighlighted().el.nativeElement.offsetHeight > this.el.nativeElement.scrollTop + this.el.nativeElement.offsetHeight;
            if (shouldScrollDown) {
                this.scrollElementIntoView(false);
            }
            else {
                var shouldScrollUp = this.getCurrentHighlighted().el.nativeElement.offsetTop < this.el.nativeElement.scrollTop;
                if (shouldScrollUp) {
                    this.scrollElementIntoView(true);
                }
            }
        }
    }

    protected scrollElementIntoView(adjustToTop) {
        var scrollHandler = (evt) => {
            this.el.nativeElement.removeEventListener('scroll', scrollHandler);
            setTimeout(() => this.scrollIntoViewOngoing = false, 100);
        };
        this.scrollIntoViewOngoing = true;
        this.el.nativeElement.addEventListener('scroll', scrollHandler);
        //TODO
        this.getCurrentHighlighted().el.nativeElement.scrollIntoView(adjustToTop);
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
        //TODO can this scroll step stay hardcoded?
        this.el.nativeElement.scrollTop += scrollSteps * 22;
    }
}
