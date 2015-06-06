import {Directive, Ancestor, ElementRef, EventEmitter} from 'angular2/angular2';
import {Scrollable} from 'nv/decorators';

@Directive({
    selector: "[nv-scrollable-element]",
    properties: ['skipElement'],
    hostListeners: {
      'mouseover': 'onMouseOver()',
      'mouseleave': 'onMouseOut()'
    },
    events: ['highlight']
})
export class ScrollableElement {
    scrollable: Scrollable;
    highlight: EventEmitter = new EventEmitter();
    el: ElementRef;
    skipElement: boolean = false;

    constructor(@Ancestor(Scrollable) scrollable: Scrollable, el: ElementRef) {
        this.scrollable = scrollable;
        this.el = el;
        this.scrollable.addScrollableElement(this);
    }

    onMouseOver() {
        if (!this.scrollable.scrollOngoing) {
            this.highlightOn();
        }
    }

    onMouseOut() {
        if (!this.scrollable.scrollOngoing) {
            this.highlightOff();
        }
    }

    highlightOn() {
        this.scrollable.setHighlightedIndex(this);
        this.highlight.next(true);
    }

    highlightOff() {
        this.highlight.next(false);
    }

}