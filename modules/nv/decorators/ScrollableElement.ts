import {Directive, Ancestor} from 'angular2/angular2';
import {Scrollable} from 'nv/decorators';
import {Highlightable} from 'nv/core/Highlightable';

@Directive({
    selector: "[nv-scrollable-element]",
    properties: {
        'highlightable': 'highlightable',
    },
    hostListeners: {
      'mouseover': 'onMouseOver()',
      'mouseleave': 'onMouseLeave()'
    },
})
export class ScrollableElement {
    highlightable:Highlightable;
    scrollable: Scrollable;

    constructor(@Ancestor(Scrollable) scrollable: Scrollable) {
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