import {Directive, Ancestor} from 'angular2/angular2';
import {Scrollable} from 'nv/decorators';
import {Highlightable} from 'nv/core/Highlightable';

@Directive({
    selector: "[nv-scrollable-element]",
    properties: {
        'selectable': 'selectable',
    },
})
export class ScrollableElement {
    selectable:Highlightable;

    constructor(@Ancestor(Scrollable) scrollable: Scrollable) {
        scrollable.addScrollableElement(this);
    }


    set selected(selected: boolean) {
        this.selectable.highlighted = selected;
    }

}