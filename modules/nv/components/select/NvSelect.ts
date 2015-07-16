
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
                <div class="nv-select">
                    <nv-dropdown [num-visible-options]="numVisibleOptions" [dropdown-width]="dropdownWidth"
                        [options]="options" [option-groups]="optionGroups"
                        (change)="onSelection($event)">
                    </nv-dropdown>
                </div>
                `,
    directives: [SelectionList, NvSelectOption, NvOptGroup,coreDirectives, Dropdown]
})
export class NvSelect {

    optionElementsQuery: QueryList<NvSelectOption>;
    optionGroupsQuery: QueryList<NvOptGroup>;
    options: Array;
    optionGroups: Array;
    numVisibleOptions: number;
    dropdownWidth: string;
    change: EventEmitter = new EventEmitter();

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
            this.options.push(optionEl.option);
        }
    }

    onOptGroupsChanged() {
        this.optionGroups = [];
        for (let optionGroupEl of this.optionGroupsQuery._results) {
            var optionGroup = <SelectionGroup> {
                label: optionGroupEl.label,
            };
            for (let optionEl of optionGroupEl.optionElementsQuery._results) {
                optionGroup.options.push(optionEl.option);
            }
            this.optionGroups.push(optionGroup);
        }
    }

    onSelection(option) {
        this.change.next(option.value);
    }

}