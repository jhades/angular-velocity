import {Component, View, EventEmitter, Attribute, CORE_DIRECTIVES, OnChanges, SimpleChange} from 'angular2/angular2';
import {NavigationAction,NavActionEnum, SelectionOption, BlankOption, SelectionGroup} from 'angular-velocity';
import {ScrollableList} from 'nv/decorators/scrollablelist/ScrollableList';
import {ScrollableListElement} from 'nv/decorators/scrollablelist/ScrollableListElement';

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
    inputs: ['options','optionGroups', 'highlightedOption', 'height', 'width', 'navigationAction', 'hidden'],
    outputs: ['selection','highlight']
})
@View({
    template: `
                    <div [ngSwitch]="isGroupMode()">
                        <template [ngSwitchWhen]="true">
                            <div class="selection-list" [style.max-height]="height"  [style.width]="width"
                                 nv-scrollable-list [navigationAction]="navigationAction" [class.hidden]="hidden || isEmptyOptions()">
                                <div *ngFor="#group of optionGroups;">
                                    <div class="option-group" (click)="onOptionClicked(null)">{{group.label}}</div>
                                    <div *ngFor="#option of group.options;"
                                        class="selection-option" [class.highlighted]="option.highlighted" [class.disabled]="option.disabled">

                                        <div nv-scrollable-list-element [highlighted]="option.highlighted" (highlight)="onHighlightChanged($event, option)" [disabled]="option.disabled"
                                            class="selection-description"
                                            (click)="onOptionClicked(option)">
                                                {{option.description}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template [ngSwitchWhen]="false">
                            <div class="selection-list" [style.max-height]="height"  [style.width]="width"
                                 nv-scrollable-list [navigationAction]="navigationAction" [class.hidden]="false">
                                <div *ngFor="#option of options;"
                                    class="selection-option" [class.highlighted]="option.highlighted" [class.disabled]="option.disabled">

                                    <div nv-scrollable-list-element [highlighted]="option.highlighted" (highlight)="onHighlightChanged($event, option)" [disabled]="option.disabled"
                                        class="selection-description"
                                        (click)="onOptionClicked(option)">
                                            {{option.description}}
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>`,
    directives: [ScrollableList, ScrollableListElement, CORE_DIRECTIVES]
})
export class SelectionList<T extends SelectionOption> implements OnChanges {

    options: T[];
    optionGroups: SelectionGroup<T>[];
    selection: EventEmitter = new EventEmitter();
    highlightedOption: T;
    highlight: EventEmitter = new EventEmitter();

    onChanges(changes) {
        let optionChanges : T[] = changes['options'];
        let optionGroupsChanges: SelectionGroup<T>[] = changes['optionGroups'];
        if (optionChanges && optionChanges.length && optionChanges.length > 0 && this.optionGroups) {
            throw new Error("both option and option-groups  cannot be defined at the same time for a nv-dropdown component.");
        }
        if (optionGroupsChanges && optionGroupsChanges.length && optionGroupsChanges.length > 0 && this.options) {
            throw new Error("both option and option-groups  cannot be defined at the same time for a nv-dropdown component.");
        }
        if (changes['highlightedOption'] && this.highlightedOption) {
            if (this.options) {
                this.highlightOption(this.options);
            }
            else if (this.optionGroups) {
                this.highlightOption(this.optionGroups.reduce( (all: T[], optionGroup) => all.concat(optionGroup.options) ,[]));
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
        this.selection.next(option);
    }

    isGroupMode() {
        return (typeof this.optionGroups !== "undefined");
    }

    highlightOption(options: T[]) {
        let highlightedPosition = options.indexOf(this.highlightedOption);
        if (highlightedPosition >= 0) {
            options.forEach((option) => option.highlighted = false);
            options[options.indexOf(this.highlightedOption)].highlighted = true;
        }
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