import {Directive, View, Query, QueryList} from 'angular2/angular2';
import {SelectionOption, EMPTY_TEMPLATE} from 'angular-velocity';
import {NvSelectOption} from 'nv/components/select/NvSelectOption';

@Directive({
    selector:"nv-select optgroup",
    properties: ['label']
})
@View({
    directives: [NvSelectOption]
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