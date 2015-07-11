import {Directive, Ancestor, ElementRef, EventEmitter} from 'angular2/angular2';
import {ScrollableList} from 'nv/decorators';

/**
 *
 * @ngdoc Decorator
 *
 * @description
 * Identifies a scrollable element inside a @see Scrollable.
 *
 */

@Directive({
    selector: "[nv-scrollable-list-element]",
    properties: ['skipElement'],
    host: {
      '(mouseover)': 'onMouseOver()',
      '(mouseleave)': 'onMouseOut()'
    },
    events: ['highlight']
})
export class ScrollableListElement {
    scrollable: ScrollableList;
    highlight: EventEmitter = new EventEmitter();
    skipElement: boolean = false;

    constructor(@Ancestor(ScrollableList) scrollable: ScrollableList, public el: ElementRef) {
        this.scrollable = scrollable;
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