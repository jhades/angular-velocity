import {Directive, Ancestor} from 'angular2/angular2';
import {CursorScrollable} from 'nv/decorators';
import {Highlightable} from 'nv/core/Highlightable';

@Directive({
    selector: "[nv-scrollable-element]",
    properties: {
        'selectable': 'selectable',
    },
})
export class ScrollableElement {
    selectable:Highlightable;

    constructor(@Ancestor(CursorScrollable) scrollable: CursorScrollable) {
        scrollable.addScrollableElement(this);
    }


    set selected(selected: boolean) {
        this.selectable.highlighted = selected;
    }

}