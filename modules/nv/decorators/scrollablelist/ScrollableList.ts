import {Directive, ElementRef, OnChanges, SimpleChange} from 'angular2/core';
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
    inputs: ['navigationAction','hidden']
})
export class ScrollableList implements OnChanges {
    navigationAction: NavigationAction;
    hidden: boolean;
    scrollableElements: ScrollableListElement[] = [];
    selectedIndex: number = null;
    scrollIntoViewOngoing: boolean = false;
    scrollOngoingTimeoutHandle: number;

    //TODO inject a list with live content and subscribe to it - probably using @ContentChildren - opened this issue for this -> https://github.com/angular/angular/issues/5051
    constructor(private el: ElementRef) {

    }

    onChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes['navigationAction'] && this.navigationAction) {
            this.onNavigationAction();
        }
        else if (this.navigationAction === null) {
            this.selectedIndex = null;
        }
        if (changes['hidden'] && !this.hidden) {
            this.onShow();
        }
    }

    onNavigationAction() {
        let action = this.navigationAction.actionType;
        switch(action) {
            case NavActionEnum.DOWN:
                this.onArrowDown();
                break;
            case NavActionEnum.UP:
                this.onArrowUp();
                break;
        }
    }

    onShow() {
        if (this.getCurrentHighlighted()) {
            this.scrollHighlightedIntoViewIfNeeded();
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
        let deltaScrollDown = (this.getCurrentHighlighted().el.nativeElement.offsetTop + this.getCurrentHighlighted().el.nativeElement.offsetHeight  - this.el.nativeElement.scrollTop - this.el.nativeElement.offsetHeight);
        if (deltaScrollDown > 0) {
            this.launchScroll(deltaScrollDown);
        }
        let deltaScrollUp = (this.getCurrentHighlighted().el.nativeElement.offsetTop - this.el.nativeElement.scrollTop);
        if (deltaScrollUp < 0) {
            this.launchScroll(deltaScrollUp);
        }
    }

    launchScroll(scrollOffset) {
        this.scrollIntoViewOngoing = true;
        clearTimeout(this.scrollOngoingTimeoutHandle);
        this.scrollOngoingTimeoutHandle = setTimeout(() => this.scrollIntoViewOngoing = false, 200);
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
        this.el.nativeElement.scrollTop += scrollSteps * 25;
    }
}
