import {Directive, Query, QueryList, ElementRef, Attribute, onChange} from 'angular2/angular2';
import {LastNavAction} from 'nv/core/LastNavAction';

@Directive({
    selector: "[nv-scrollable]",
    properties: {
        'lastNavAction': 'lastNavAction',
    },
    hostListeners: {
        'scroll': 'onKeyDown($event)'
    },
    lifecycle: [onChange]

})
export class Scrollable {
    selectedClass: string;
    el:ElementRef;
    lastNavAction: LastNavAction;

    constructor(@Attribute("nv-scrollable") selectedClass, el: ElementRef) {
        this.selectedClass = selectedClass;
        this.el = el;
    }

    onChange(changes) {
        if (this.lastNavAction) {
            console.log('ok ' + this.lastNavAction.value);
        }
    }

    getScrollTop() {
        return this.el.domElement.scrollTop;
    }

    onKeyDown(evt) {
        //console.log(this.lastNavKey);
    }

}
