
import {Component, View, Query, QueryList,  CORE_DIRECTIVES,Attribute, EventEmitter} from 'angular2/angular2';
import {SelectionList, Dropdown, SelectionOption, SelectionGroup} from 'angular-velocity';
import {NvSelectOption} from 'nv/components/select/NvSelectOption';
import {NvOptGroup} from 'nv/components/select/NvOptGroup';
import {ObservableWrapper} from 'angular2/src/core/facade/async';

@Component({
    selector:"nv-select",
    inputs: ['options', 'optionGroups', 'dropdownHeight', 'dropdownWidth'],
    outputs: ['change']
})
@View({
    template: `
                <div class="nv-select">
                    <nv-dropdown [dropdown-height]="dropdownHeight" [dropdown-width]="dropdownWidth"
                        [options]="options" [option-groups]="optionGroups"
                        (change)="onSelection($event)">
                    </nv-dropdown>
                </div>
                `,
    directives: [SelectionList, NvSelectOption, NvOptGroup,CORE_DIRECTIVES, Dropdown]
})
export class NvSelect<T extends SelectionOption> {

    optionElementsQuery: QueryList<NvSelectOption>;
    optionGroupsQuery: QueryList<NvOptGroup>;
    options: Array<T>;
    optionGroups: Array<SelectionGroup<T>>;
    dropdownHeight: number;
    dropdownWidth: string;
    change: EventEmitter = new EventEmitter();

    constructor(@Query(NvSelectOption, {descendants: false}) optionElements: QueryList<NvSelectOption>,
                @Query(NvOptGroup) optionGroups: QueryList<NvOptGroup>,
                @Attribute("dropdown-height") dropdownHeight,
                @Attribute("dropdown-width") dropdownWidth) {

        this.optionElementsQuery = optionElements;
        this.optionGroupsQuery = optionGroups;
        this.dropdownHeight = dropdownHeight;
        this.dropdownWidth = dropdownWidth;

        ObservableWrapper.subscribe(optionElements.changes, () => this.onOptionsChanged());
        ObservableWrapper.subscribe(optionGroups.changes, () => this.onOptGroupsChanged());
    }

    onOptionsChanged() {
        this.options = [];
        this.optionElementsQuery._results.forEach((optionEl) => this.options.push(optionEl.option));
    }

    onOptGroupsChanged() {
        this.optionGroups = [];
        for (let optionGroupEl of this.optionGroupsQuery._results) { //TODO refactor once Query list is an observable
            var optionGroup = <SelectionGroup<T>> {
                label: optionGroupEl.label,
                options: optionGroupEl.options
            };
            this.optionGroups.push(optionGroup);
        }
    }

    onSelection(option) {
        this.change.next(option.value);
    }

}