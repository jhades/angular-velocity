import {Directive, onChange, ElementRef} from 'angular2/angular2';
import {LastNavAction} from 'nv/core/LastNavAction';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';
import {ScrollableElement} from 'nv/decorators';

@Directive({
    selector: "[nv-scrollable]",
    properties: {
        'lastNavAction': 'lastNavAction',
    },
    lifecycle: [onChange]

})
export class Scrollable {
    lastNavAction: LastNavAction;
    keyUtils: KeyboardUtils;
    scrollableElements: Array<ScrollableElement> = [];
    selectedIndex: number = null;
    el: ElementRef;

    constructor(keyUtils: KeyboardUtils, el: ElementRef) {
        this.keyUtils = keyUtils;
        this.el = el;
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
        this.highlightNext();
        var shouldScrollDown = this.getCurrentHighlighted().el.domElement.offsetTop +
            this.getCurrentHighlighted().el.domElement.offsetHeight > this.el.domElement.scrollTop + this.el.domElement.offsetHeight;
        if (shouldScrollDown) {
            this.getCurrentHighlighted().el.domElement.scrollIntoView(false);
        }

    }

    onArrowUp() {
        this.highlightPrevious();
        var shouldScrollUp = this.getCurrentHighlighted().el.domElement.offsetTop < this.el.domElement.scrollTop;
        if (shouldScrollUp) {
            this.getCurrentHighlighted().el.domElement.scrollIntoView(true);
        }
    }

    getCurrentHighlighted() : ScrollableElement {
        return  this.scrollableElements[this.selectedIndex];
    }

    highlightNext() {
        if (this.selectedIndex === null) {
            this.selectedIndex = 0;
        }
        else if (this.scrollableElements.length >= this.selectedIndex + 1) {
            this.getCurrentHighlighted().onHighlightOff();
            this.selectedIndex += 1;
        }
        this.getCurrentHighlighted().onHighlightOn();
    }

    highlightPrevious() {
        if (this.selectedIndex > 0) {
            this.getCurrentHighlighted().onHighlightOff();
            this.selectedIndex -= 1;
            this.getCurrentHighlighted().onHighlightOn();
        }
    }

    setHighlightedIndex(se: ScrollableElement) {
        this.selectedIndex = this.scrollableElements.indexOf(se);
    }


}
