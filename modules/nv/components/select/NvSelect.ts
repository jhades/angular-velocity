
import {Component, View, Query, QueryList,  coreDirectives,Attribute, EventEmitter} from 'angular2/angular2';
import {SelectionList, Dropdown, SelectionOption, SelectionGroup} from 'angular-velocity';
import {NvSelectOption} from 'nv/components/select/NvSelectOption';
import {NvOptGroup} from 'nv/components/select/NvOptGroup';

@Component({
    selector:"nv-select",
    events: ['change']
})
@View({
    template: `
                <div class="nv-select" [ng-switch]="isGroupMode">
                    <template [ng-switch-when]="true">
                        <div>
                            group mode
                        </div>
                    </template>
                    <template [ng-switch-when]="false">
                        <nv-dropdown [num-visible-options]="numVisibleOptions" [dropdown-width]="dropdownWidth"
                            [options]="options"
                            (change)="onSelection($event)">
                        </nv-dropdown>
                    </template>
                </div>
                `,
    directives: [SelectionList, NvSelectOption, NvOptGroup,coreDirectives, Dropdown]
})
export class NvSelect {

    optionElementsQuery: QueryList<NvSelectOption>;
    optionGroupsQuery: QueryList<NvOptGroup>;
    options: Array;
    numVisibleOptions: number;
    dropdownWidth: string;
    change: EventEmitter = new EventEmitter();
    isGroupMode: boolean = false;

    constructor(@Query(NvSelectOption, {descendants: false}) optionElements: QueryList<NvSelectOption>,
                @Query(NvOptGroup) optionGroups: QueryList<NvOptGroup>,
                @Attribute("num-visible-options") numVisibleOptions,
                @Attribute("dropdown-width") dropdownWidth) {

        this.optionElementsQuery = optionElements;
        this.optionGroupsQuery = optionGroups;
        this.numVisibleOptions = numVisibleOptions;
        this.dropdownWidth = dropdownWidth;

        optionElements.onChange(() => this.onOptionsChanged());
        optionGroups.onChange(() => this.onOptGroupsChanged());

    }

    onOptionsChanged() {
        this.options = [];
        for (let optionEl of this.optionElementsQuery._results) {
            this.options.push({
                description: optionEl.text,
                value: optionEl.value
            });
        }
    }

    onOptGroupsChanged() {
        this.isGroupMode =  (this.optionGroupsQuery._results.length > 0);
        this.options = [];
        for (let optionGroupEl of this.optionGroupsQuery._results) {
            this.options.concat(optionGroupEl.options);
        }
    }

    onSelection(option) {
        this.change.next(option.value);
    }

}