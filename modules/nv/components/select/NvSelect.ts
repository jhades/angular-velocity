
import {Component, View, Query, QueryList,  CORE_DIRECTIVES,Attribute, EventEmitter} from 'angular2/angular2';
import {SelectionOption, SelectionGroup} from 'angular-velocity';
import {NvSelectOption} from 'nv/components/select/NvSelectOption';
import {NvOptGroup} from 'nv/components/select/NvOptGroup';
import {SelectionList} from 'nv/components/selectionlist/SelectionList';
import {Dropdown} from 'nv/components/dropdown/Dropdown';

@Component({
    selector:"nv-select",
    inputs: ['options', 'optionGroups', 'dropdownHeight', 'dropdownWidth'],
    outputs: ['selection']
})
@View({
    template: `
                <div class="nv-select">
                    <nv-dropdown [dropdown-height]="dropdownHeight" [dropdown-width]="dropdownWidth"
                        [options]="options" [option-groups]="optionGroups"
                        (selection)="onSelection($event)">
                    </nv-dropdown>
                </div>
                `,
    directives: [SelectionList, NvSelectOption, NvOptGroup,CORE_DIRECTIVES, Dropdown]
})
export class NvSelect<T extends SelectionOption> {

    optionElementsQuery: QueryList<NvSelectOption>;
    optionGroupsQuery: QueryList<NvOptGroup>;
    options: T[];
    optionGroups: SelectionGroup<T>[];
    dropdownHeight: number;
    dropdownWidth: string;
    selection: EventEmitter = new EventEmitter();

    constructor(@Query(NvSelectOption, {descendants: false}) optionElements: QueryList<NvSelectOption>,
                @Query(NvOptGroup) optionGroups: QueryList<NvOptGroup>,
                @Attribute("dropdown-height") dropdownHeight,
                @Attribute("dropdown-width") dropdownWidth) {

        this.optionElementsQuery = optionElements;
        this.optionGroupsQuery = optionGroups;
        this.dropdownHeight = dropdownHeight;
        this.dropdownWidth = dropdownWidth;

        optionElements.changes.toRx().subscribe(() => this.onOptionsChanged());
        optionGroups.changes.toRx().subscribe(() => this.onOptGroupsChanged());
    }

    onOptionsChanged() {
        let options = this.optionElementsQuery.toArray();
        if (options.length > 0) {
            this.options = [];
            options.forEach((optionEl) => this.options.push(optionEl.option));
        }
    }

    onOptGroupsChanged() {
        let groups = this.optionGroupsQuery.toArray();
        if (groups.length) {
            this.optionGroups = [];
            for (let optionGroupEl of groups) {
                let optionGroup = <SelectionGroup<T>> {
                    label: optionGroupEl.label,
                    options: optionGroupEl.options
                };
                this.optionGroups.push(optionGroup);
            }
        }

    }

    onSelection(option) {
        this.selection.next(option.value);
    }

}