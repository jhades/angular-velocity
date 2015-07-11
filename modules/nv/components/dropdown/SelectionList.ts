/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, NgFor, Parent, onChange, EventEmitter, Attribute} from 'angular2/angular2';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';
import {LastNavAction} from 'angular-velocity';
import {SelectionOption, BlankOption} from 'nv/components/selectone/SelectionOption';
import {ScrollableList, ScrollableListElement} from 'nv/decorators';

/**
 *
 * @ngdoc Component
 *
 * @description
 * A selection list for dropdown/autocomplete single-selection components.
 *
 * Features:
 *
 * - the list is keyboard scrollable
 * - there is support for disabled elements
 *
 */
@Component({
    selector: 'ngv-selection-list',
    properties: ['options','highlightedOption', 'height', 'width', 'lastNavAction', 'hidden'],
    events: ['change','highlight'],
    lifecycle: [onChange]
})
@View({
    template: `
                <div class="selection-list" [style.max-height]="height"  [style.width]="width"
                     nv-scrollable-list [last-nav-action]="lastNavAction">

                    <div *ng-for="#option of options;"
                        class="selection-option" [class.highlighted]="option.highlighted" [class.disabled]="option.disabled">

                        <div nv-scrollable-list-element [highlighted]="option.highlighted" (highlight)="onHighlightChanged($event, option)" [skip-element]="option.disabled"
                            class="selection-description"
                            (click)="onOptionClicked(option)">
                                {{option.description}}
                        </div>

                    </div>

                </div>`,
    directives: [NgFor, ScrollableList, ScrollableListElement]
})
export class SelectionList<T extends SelectionOption> {

    options: List<T>;
    change: EventEmitter = new EventEmitter();
    highlightedOption: T;
    highlight: EventEmitter = new EventEmitter();

    constructor(private keyUtils: KeyboardUtils) {

    }

    onHighlightChanged(highlighted: boolean, option: T) {
        option.highlighted = highlighted;
        this.highlight.next(option);
    }

    onOptionClicked(option: SelectionOption) {
        this.change.next(option);
    }

    onChange(changes) {
        if (changes['highlightedOption'] && this.highlightedOption) {
            console.log('changes on highlightedOption ' + this.highlightedOption.description);
            this.options.forEach((option) => option.highlighted = false);
            this.options[this.options.indexOf(this.highlightedOption)].highlighted = true;
        }
    }

}