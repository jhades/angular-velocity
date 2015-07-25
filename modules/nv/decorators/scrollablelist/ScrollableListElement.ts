import {Directive, Ancestor, ElementRef, EventEmitter, LifecycleEvent} from 'angular2/angular2';
import {ScrollableList} from 'angular-velocity';
import {FunctionalUtils} from 'nv/services/FunctionalUtils';


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
    lifecycle: [LifecycleEvent.onChange],
    hostInjector: [FunctionalUtils]
})
export class ScrollableListElement {
    scrollable: ScrollableList;
    highlight: EventEmitter = new EventEmitter();
    highlighted:boolean;
    disabled: boolean = false;
    onMouseWheel: Function;


    constructor(@Ancestor(ScrollableList) scrollable: ScrollableList, public el: ElementRef, private fUtils: FunctionalUtils) {
        this.scrollable = scrollable;
        this.scrollable.addScrollableElement(this);
        this.onMouseWheel = fUtils.debounce(this.onDebouncedMouseWheel,10);
    }

    onChange(changes) {
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

    onDebouncedMouseWheel($event) {
        var delta = $event.wheelDelta || -$event.detail;
        if (!this.scrollable.scrollIntoViewOngoing) {
            this.scrollable.scrollStep(delta < 0 ? 1 : -1);
        }
        $event.preventDefault();
        $event.stopPropagation();
    }


}