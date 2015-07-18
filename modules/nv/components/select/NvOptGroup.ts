import {Directive, Query, QueryList} from 'angular2/angular2';
import {NvSelectOption, SelectionOption} from 'angular-velocity';

@Directive({
    selector:"nv-select optgroup",
    properties: ['label']
})
export class NvOptGroup {

    options: Array<SelectionOption>;
    optionElementsQuery: QueryList<NvSelectOption>;

    constructor(@Query(NvSelectOption) optionElements: QueryList<NvSelectOption>) {
        this.optionElementsQuery = optionElements;
        optionElements.onChange(() => this.onOptionsChanged());
    }

    onOptionsChanged() {
        this.options = [];
        this.optionElementsQuery._results.forEach((optionEl) => this.options.push(optionEl.option));
    }


}