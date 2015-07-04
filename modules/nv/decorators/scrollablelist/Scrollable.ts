import {Directive, onChange, ElementRef} from 'angular2/angular2';
import {LastNavAction} from 'nv/core/LastNavAction';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';
import {ScrollableElement} from 'nv/decorators';

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
 * @see ScrollableElement
 *
 */

@Directive({
    selector: "[nv-scrollable-list]",
    properties: ['lastNavAction'],
    lifecycle: [onChange]

})
export class Scrollable {
    lastNavAction: LastNavAction;
    scrollableElements: Array<ScrollableElement> = [];
    selectedIndex: number = null;
    scrollOngoing: boolean = false;

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
            var shouldScrollDown = this.getCurrentHighlighted().el.domElement.offsetTop +
                this.getCurrentHighlighted().el.domElement.offsetHeight > this.el.domElement.scrollTop + this.el.domElement.offsetHeight;
            if (shouldScrollDown) {
                this.scrollElementIntoView(false);
            }
            if(this.getCurrentHighlighted().skipElement) {
                this.onArrowDown();
            }
        }
    }

    existsNextEnabledElement() {
        return _.some(this.scrollableElements.slice(this.selectedIndex + 1, this.scrollableElements.length), (el: ScrollableElement) => !el.skipElement);
    }

    onArrowUp() {
        if (this.existsPreviousEnabledElement()) {
            this.highlightPrevious();
            var shouldScrollUp = this.getCurrentHighlighted().el.domElement.offsetTop < this.el.domElement.scrollTop;
            if (shouldScrollUp) {
                this.scrollElementIntoView(true);
            }
            if(this.getCurrentHighlighted().skipElement) {
                this.onArrowUp();
            }
        }
    }

    existsPreviousEnabledElement() {
        return _.some(this.scrollableElements.slice(0, this.selectedIndex), (el: ScrollableElement) => !el.skipElement);
    }

    scrollElementIntoView(adjustToTop) {
        // report scroll ongoing up to one second after the scroll ended
        var scrollHandler = (evt) => {
            this.el.domElement.removeEventListener('scroll', scrollHandler);
            setTimeout(() => this.scrollOngoing = false, 1000);
        };
        this.scrollOngoing = true;
        this.el.domElement.addEventListener('scroll', scrollHandler);
        this.getCurrentHighlighted().el.domElement.scrollIntoView(adjustToTop);
    }

    getCurrentHighlighted() : ScrollableElement {
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

    setHighlightedIndex(se: ScrollableElement) {
        if (this.getCurrentHighlighted() && this.getCurrentHighlighted() !== se) {
            this.getCurrentHighlighted().highlightOff();
        }
        this.selectedIndex = this.scrollableElements.indexOf(se);
    }


}
