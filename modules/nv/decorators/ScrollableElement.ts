import {Directive, Ancestor, ElementRef} from 'angular2/angular2';
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
    el: ElementRef;

    constructor(@Ancestor(Scrollable) scrollable: Scrollable, el: ElementRef) {
        this.scrollable = scrollable;
        this.el = el;
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