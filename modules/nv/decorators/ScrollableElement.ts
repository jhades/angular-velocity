import {Directive, Ancestor, ElementRef, EventEmitter} from 'angular2/angular2';
import {Scrollable} from 'nv/decorators';

@Directive({
    selector: "[nv-scrollable-element]",
    hostListeners: {
      'mouseover': 'onHighlightOn()',
      'mouseleave': 'onHighlightOff()'
    },
    events: ['highlight']
})
export class ScrollableElement {
    scrollable: Scrollable;
    highlight: EventEmitter = new EventEmitter();
    el: ElementRef;

    constructor(@Ancestor(Scrollable) scrollable: Scrollable, el: ElementRef) {
        this.scrollable = scrollable;
        this.el = el;
        this.scrollable.addScrollableElement(this);
    }

    onHighlightOn() {
        this.scrollable.setHighlightedIndex(this);
        this.highlight.next(true);
    }

    onHighlightOff() {
        this.highlight.next(false);
    }

}