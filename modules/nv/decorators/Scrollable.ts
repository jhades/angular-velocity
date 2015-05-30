import {Directive, Query, QueryList, ElementRef, Attribute, onChange} from 'angular2/angular2';
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
    el:ElementRef;
    lastNavAction: LastNavAction;
    keyUtils: KeyboardUtils;
    scrollableElements: Array<ScrollableElement> = [];
    selectedIndex: number = null;

    constructor(el: ElementRef, keyUtils: KeyboardUtils) {
        this.el = el;
        this.keyUtils = keyUtils;
    }

    onChange(changes) {
        if (changes['lastNavAction'] && this.lastNavAction) {
            var key = this.lastNavAction.value;
            if (this.keyUtils.isArrowDown(key)) {
                this.onArrowDown();
            }
            else if (this.keyUtils.isArrowUp(key)) {
                this.highlightPrevious();
            }
        }
        else if (this.lastNavAction === null) {
            this.selectedIndex = null;
        }
    }

    getScrollTop() {
        return this.el.domElement.scrollTop;
    }

    addScrollableElement(scrollableElement) {
        this.scrollableElements.push(scrollableElement);
    }

    onArrowDown() {
        if (this.selectedIndex == null) {
            this.highlightIndex(0);
        }
        else {
            this.highlightNext();
        }
    }

    clearHighlight() {
        this.scrollableElements.forEach((se: ScrollableElement) => se.highlight = false);
    }

    highlightNext() {
        if (this.scrollableElements.length >= this.selectedIndex + 1) {
            this.selectedIndex += 1;
            this.highlightIndex(this.selectedIndex);
        }
    }

    highlightPrevious() {
        if (this.selectedIndex > 0) {
            this.selectedIndex -= 1;
            this.highlightIndex(this.selectedIndex);
        }
    }

    highlight(highlighted:ScrollableElement) {
        this.clearHighlight();
        this.highlightIndex(this.scrollableElements.indexOf(highlighted));
    }

    highlightIndex(index) {
        this.clearHighlight();
        this.selectedIndex = index;
        var highlighted = this.scrollableElements[index];
        highlighted.highlight = true;
        this.scrollIntoViewIfNeeded(highlighted);
    }

    private scrollIntoViewIfNeeded(se: ScrollableElement) {

        console.log("scrollable div scrollTop= " +  this.getScrollTop());

    }

}
