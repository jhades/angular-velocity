import {Directive, ElementRef, EventEmitter, Host, OnChanges, SimpleChange} from 'angular2/angular2';
import {ScrollableList} from 'nv/decorators/scrollablelist/ScrollableList';


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
    inputs: ['disabled', 'highlighted'],
    host: {
      '(mouseover)': 'onMouseOver()',
      '(mouseleave)': 'onMouseOut()',
      '(mousewheel)': 'onMouseWheel($event)',
      '(DOMMouseScroll)': 'onMouseWheel($event)'
    },
    outputs: ['highlight']
})
export class ScrollableListElement {
    scrollable: ScrollableList;
    highlight: EventEmitter = new EventEmitter();
    highlighted:boolean;
    disabled: boolean = false;


    constructor(@Host(ScrollableList) scrollable: ScrollableList, public el: ElementRef) {
        this.scrollable = scrollable;
        this.scrollable.addScrollableElement(this);
    }

    onChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes['highlighted'] && this.highlighted) {
            this.scrollable.setHighlightedIndex(this);
            this.scrollable.scrollHighlightedIntoViewIfNeeded();
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

    onMouseWheel($event) {
        $event.preventDefault();
        $event.stopPropagation();
        var delta = $event.wheelDelta || -$event.detail;
        if (!this.scrollable.scrollIntoViewOngoing) {
            this.scrollable.scrollStep(delta < 0 ? 1 : -1);
        }
    }


}