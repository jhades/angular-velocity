import {Directive, Ancestor} from 'angular2/angular2';
import {CursorScrollable} from 'nv/decorators';
import {Highlightable} from 'nv/core/Highlightable';

@Directive({
    selector: "[nv-cursor-scrollable-element]",
    properties: {
        'highlightable': 'highlightable',
    },
})
export class CursorScrollableElement {
    highlightable:Highlightable;

    constructor(@Ancestor(CursorScrollable) scrollable: CursorScrollable) {
        scrollable.addScrollableElement(this);
    }


    set highlight(selected: boolean) {
        this.highlightable.highlighted = selected;
    }

}