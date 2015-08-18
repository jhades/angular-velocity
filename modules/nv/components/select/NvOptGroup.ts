import {Component, View, Query, QueryList} from 'angular2/angular2';
import {SelectionOption, EMPTY_TEMPLATE} from 'angular-velocity';
import {NvSelectOption} from 'nv/components/select/NvSelectOption';

@Component({
    selector:"nv-select optgroup",
    properties: ['label']
})
@View({
    template: `<div style='display:none'></div>`,
    directives: [NvSelectOption]
})
export class NvOptGroup {

    options: Array<SelectionOption>;
    optionElementsQuery: QueryList<NvSelectOption>;

    //TODO nv-select with groups needs this issue fixed https://github.com/angular/angular/issues/1792 - <option> elements inside <optgroup> dont' show up on the query
    constructor(@Query(NvSelectOption) optionElements: QueryList<NvSelectOption>) {
        this.optionElementsQuery = optionElements;
        optionElements.onChange(() => this.onOptionsChanged());
    }

    onOptionsChanged() {
        this.options = [];
        this.optionElementsQuery._results.forEach((optionEl) => this.options.push(optionEl.option));
    }


}