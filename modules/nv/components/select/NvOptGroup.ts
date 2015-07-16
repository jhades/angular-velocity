import {Directive, Query, QueryList} from 'angular2/angular2';
import {NvSelectOption} from 'angular-velocity';

@Directive({
    selector:"nv-select optgroup",
    properties: ['label']
})
export class NvOptGroup {

    options: Array;
    optionElementsQuery: QueryList<NvSelectOption>;

    constructor(@Query(NvSelectOption) optionElements: QueryList<NvSelectOption>) {
        this.optionElementsQuery = optionElements;
        optionElements.onChange(() => this.onOptionsChanged());
    }

    onOptionsChanged() {
        this.options = [];
        debugger;
        for (let optionEl of this.optionElementsQuery._results) {
            this.options.push(optionEl.option);
        }
    }


}