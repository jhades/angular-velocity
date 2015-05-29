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

    constructor( el: ElementRef, keyUtils: KeyboardUtils) {
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
                this.selectPrevious();
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
        console.log('registered ' + scrollableElement);
        this.scrollableElements.push(scrollableElement);
    }

    onArrowDown() {
        if (this.selectedIndex == null) {
            this.selectIndex(0);
        }
        else {
            this.selectNext();
        }
    }

    selectIndex(index) {
        this.scrollableElements.forEach((se: ScrollableElement) => se.selected = false);
        this.selectedIndex = index;
        this.scrollableElements[index].selected = true;
    }

    selectNext() {
        if (this.scrollableElements.length >= this.selectedIndex + 1) {
            this.selectedIndex += 1;
            this.changeSelectedItem(this.selectedIndex);
        }
    }

    selectPrevious() {
        if (this.selectedIndex > 0) {
            this.selectedIndex -= 1;
            this.changeSelectedItem(this.selectedIndex);
        }
    }

    changeSelectedItem(next) {
        this.scrollableElements.forEach((se: ScrollableElement) => se.selected = false);
        this.scrollableElements[next].selected = true;
    }

}
