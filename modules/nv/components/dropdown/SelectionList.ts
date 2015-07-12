/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, NgFor, Parent, EventEmitter, Attribute, onChange} from 'angular2/angular2';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';
import {LastNavAction, ScrollableList, ScrollableListElement, SelectionOption, BlankOption, SelectionGroup} from 'angular-velocity';

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
    properties: ['options','optionGroups', 'highlightedOption', 'height', 'width', 'lastNavAction', 'hidden'],
    events: ['change','highlight'],
    lifecycle: [onChange]
})
@View({
    template: `
                <div class="selection-list" [style.max-height]="height"  [style.width]="width"
                     nv-scrollable-list [last-nav-action]="lastNavAction">

                    <div ng-switch="option.length">
                        <div ng-switch-when="10">
                            <div *ng-for="#option of options;"
                                class="selection-option" [class.highlighted]="option.highlighted" [class.disabled]="option.disabled">

                                <div nv-scrollable-list-element [highlighted]="option.highlighted" (highlight)="onHighlightChanged($event, option)" [skip-element]="option.disabled"
                                    class="selection-description"
                                    (click)="onOptionClicked(option)">
                                        {{option.description}}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>`,
    directives: [NgFor, ScrollableList, ScrollableListElement]
})
export class SelectionList<T extends SelectionOption> {

    options: List<T>;
    optionGroups: Array<SelectionGroup<T>>;
    change: EventEmitter = new EventEmitter();
    highlightedOption: T;
    highlight: EventEmitter = new EventEmitter();

    constructor(private keyUtils: KeyboardUtils) {

    }

    private onChange(changes) {
        if (changes['highlightedOption'] && this.highlightedOption) {
            this.options.forEach((option) => option.highlighted = false);
            this.options[this.options.indexOf(this.highlightedOption)].highlighted = true;
        }
        if ((changes['options'] || changes['optionGroups']) && this.options && this.optionGroups) {
            throw new Error("both option and option-groups  cannot be defined at the same time for a nv-dropdown component.");
        }
    }

    protected onHighlightChanged(highlighted: boolean, option: T) {
        option.highlighted = highlighted;
        if (highlighted) {
            this.highlight.next(option);
        }
    }

    protected onOptionClicked(option: SelectionOption) {
        this.change.next(option);
    }

    protected isGroupMode() {
        return this.optionGroups !== undefined;
    }

}