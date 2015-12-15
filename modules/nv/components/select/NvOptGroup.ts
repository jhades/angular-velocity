import {Directive, View, Query, QueryList} from 'angular2/core';
import {SelectionOption} from 'angular-velocity';
import {NvSelectOption} from 'nv/components/select/NvSelectOption';

@Directive({
    selector:"nv-select optgroup",
    inputs: ['label']
})
@View({
    directives: [NvSelectOption]
})
export class NvOptGroup {

    label:string;
    options: SelectionOption[];
    optionElementsQuery: QueryList<NvSelectOption>;

    constructor(@Query(NvSelectOption) optionElements: QueryList<NvSelectOption>) {
        this.optionElementsQuery = optionElements;
        optionElements.changes.subscribe(() => this.onOptionsChanged());
    }

    onOptionsChanged() {
        this.options = [];
        this.optionElementsQuery.toArray().forEach((optionEl) => this.options.push(optionEl.option));
    }


}