import {Directive, Ancestor, ElementRef, EventEmitter, onChange} from 'angular2/angular2';
import {ScrollableList} from 'angular-velocity';

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
    properties: ['disabled', 'highlighted'],
    host: {
      '(mouseover)': 'onMouseOver()',
      '(mouseleave)': 'onMouseOut()',
      '(mousewheel)': 'onMouseWheel($event)',
      '(DOMMouseScroll)': 'onMouseWheel($event)'
    },
    events: ['highlight'],
    lifecycle: [onChange]
})
export class ScrollableListElement {
    scrollable: ScrollableList;
    highlight: EventEmitter = new EventEmitter();
    highlighted:boolean;
    disabled: boolean = false;

    constructor(@Ancestor(ScrollableList) scrollable: ScrollableList, public el: ElementRef) {
        this.scrollable = scrollable;
        this.scrollable.addScrollableElement(this);
    }

    onChange(changes) {
        if (changes['highlighted'] && this.highlighted) {
            this.scrollable.setHighlightedIndex(this);
            this.scrollable.scrollElementIntoViewIfNeeded();
        }
    }

    onMouseOver() {
        if (!this.scrollable.scrollIntoViewOngoing) {
            this.highlightOn();
        }
    }

    onMouseOut() {
        if (!this.scrollable.scrollIntoViewOngoing) {
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

    protected onMouseWheel($event) {
        var delta = $event.wheelDelta || -$event.detail;
        this.scrollable.scrollStep(delta < 0 ? 1 : -1);
        $event.preventDefault();
    }


}