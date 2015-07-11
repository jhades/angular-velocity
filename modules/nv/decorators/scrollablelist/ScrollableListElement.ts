import {Directive, Ancestor, ElementRef, EventEmitter, onChange} from 'angular2/angular2';
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
    properties: ['skipElement', 'highlighted'],
    host: {
      '(mouseover)': 'onMouseOver()',
      '(mouseleave)': 'onMouseOut()'
    },
    events: ['highlight'],
    lifecycle: [onChange]
})
export class ScrollableListElement {
    scrollable: ScrollableList;
    highlight: EventEmitter = new EventEmitter();
    highlighted:boolean;
    skipElement: boolean = false;

    constructor(@Ancestor(ScrollableList) scrollable: ScrollableList, public el: ElementRef) {
        this.scrollable = scrollable;
        this.scrollable.addScrollableElement(this);
    }

    onChange(changes) {
        if (changes['highlighted'] && this.highlighted) {
            //this.scrollable.setHighlightedIndex(this);
            this.scrollable.scrollElementIntoViewIfNeeded();
        }
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