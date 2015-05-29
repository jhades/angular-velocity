import {Directive, Query, QueryList, ElementRef, Attribute, onChange} from 'angular2/angular2';
import {LastNavAction} from 'nv/core/LastNavAction';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';

@Directive({
    selector: "[nv-scrollable]",
    properties: {
        'lastNavAction': 'lastNavAction',
    },
    lifecycle: [onChange]

})
export class Scrollable {
    selectedClass: string;
    el:ElementRef;
    lastNavAction: LastNavAction;
    keyUtils: KeyboardUtils;

    constructor(@Attribute("nv-scrollable") selectedClass, el: ElementRef, keyUtils: KeyboardUtils) {
        this.selectedClass = selectedClass;
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
    }

    getScrollTop() {
        return this.el.domElement.scrollTop;
    }

    onArrowDown() {
        console.log("next " + this.getScrollTop());
    }

    selectPrevious() {
        console.log("previous " + this.getScrollTop());
    }

}
