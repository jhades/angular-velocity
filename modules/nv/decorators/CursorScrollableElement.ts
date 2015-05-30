import {Directive, Ancestor} from 'angular2/angular2';
import {CursorScrollable} from 'nv/decorators';
import {Highlightable} from 'nv/core/Highlightable';

@Directive({
    selector: "[nv-cursor-scrollable-element]",
    properties: {
        'highlightable': 'highlightable',
    },
    hostListeners: {
      'mouseover': 'onMouseOver()',
      'mouseleave': 'onMouseLeave()'
    },
})
export class CursorScrollableElement {
    highlightable:Highlightable;
    scrollable: CursorScrollable;

    constructor(@Ancestor(CursorScrollable) scrollable: CursorScrollable) {
        this.scrollable = scrollable;
        this.scrollable.addScrollableElement(this);
    }

    onMouseOver() {
        this.scrollable.highlight(this);
        this.highlightable.highlighted = true;
    }

    onMouseLeave() {
        this.highlightable.highlighted = false;
    }


    set highlight(selected: boolean) {
        this.highlightable.highlighted = selected;
    }

}