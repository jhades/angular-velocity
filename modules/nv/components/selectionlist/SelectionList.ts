/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, EventEmitter, Attribute, coreDirectives, LifecycleEvent} from 'angular2/angular2';
import {NavigationAction,NavActionEnum ,ScrollableList, ScrollableListElement, SelectionOption, BlankOption, SelectionGroup} from 'angular-velocity';

/**
 *
 * @ngdoc Component
 *
 * @description
 * A selection list for single or multiple selection components. The list will take as main input either a list of options
 * or a list of option groups.
 *
 * Features:
 *
 * - scrollable via keyboard
 * - support for disabled elements
 * - support for option groups
 *
 */
@Component({
    selector: 'nv-selection-list',
    properties: ['options','optionGroups', 'highlightedOption', 'height', 'width', 'navigationAction', 'hidden'],
    events: ['change','highlight'],
    lifecycle: [LifecycleEvent.onChange]
})
@View({
    template: `
                <div class="selection-list" [style.max-height]="height"  [style.width]="width"
                     nv-scrollable-list [navigation-action]="navigationAction" [hidden]="hidden || isEmptyOptions()">

                    <div [ng-switch]="isGroupMode()">
                        <template [ng-switch-when]="true">
                            <div *ng-for="#group of optionGroups;">
                                <div class="option-group" (click)="onOptionClicked(null)">{{group.label}}</div>
                                <div *ng-for="#option of group.options;"
                                    class="selection-option" [class.highlighted]="option.highlighted" [class.disabled]="option.disabled">

                                    <div nv-scrollable-list-element [highlighted]="option.highlighted" (highlight)="onHighlightChanged($event, option)" [disabled]="option.disabled"
                                        class="selection-description"
                                        (click)="onOptionClicked(option)">
                                            {{option.description}}
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template [ng-switch-when]="false">
                            <div *ng-for="#option of options;"
                                class="selection-option" [class.highlighted]="option.highlighted" [class.disabled]="option.disabled">

                                <div nv-scrollable-list-element [highlighted]="option.highlighted" (highlight)="onHighlightChanged($event, option)" [disabled]="option.disabled"
                                    class="selection-description"
                                    (click)="onOptionClicked(option)">
                                        {{option.description}}
                                </div>
                            </div>
                        </template>
                    </div>


                </div>`,
    directives: [ScrollableList, ScrollableListElement, coreDirectives]
})
export class SelectionList<T extends SelectionOption> {

    options: Array<T>;
    optionGroups: Array<SelectionGroup<T>>;
    change: EventEmitter = new EventEmitter();
    highlightedOption: T;
    highlight: EventEmitter = new EventEmitter();

    onChange(changes) {
        if ((changes['options'] || changes['optionGroups']) && this.options && this.optionGroups) {
            throw new Error("both option and option-groups  cannot be defined at the same time for a nv-dropdown component.");
        }
        if (changes['highlightedOption'] && this.highlightedOption) {
            if (this.options) {
                this.highlightOption(this.options);
            }
            else if (this.optionGroups) {
                this.highlightOption(this.optionGroups.reduce( (all: Array<T>, optionGroup) => all.concat(optionGroup.options) ,[]));
            }
        }
    }

    onHighlightChanged(highlighted: boolean, option: T) {
        option.highlighted = highlighted;
        if (highlighted) {
            this.highlight.next(option);
        }
    }

    onOptionClicked(option: SelectionOption) {
        this.change.next(option);
    }

    isGroupMode() {
        return (typeof this.optionGroups !== "undefined");
    }

    highlightOption(options: Array<T>) {
        options.forEach((option) => option.highlighted = false);
        options[options.indexOf(this.highlightedOption)].highlighted = true;

    }

    isEmptyOptions() {
        if (this.isGroupMode()) {
            return this.optionGroups.length === 0;
        }
        else {
            return this.options && this.options.length === 0;
        }
    }

}