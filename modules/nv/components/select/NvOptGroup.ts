import {Directive, Query, QueryList} from 'angular2/angular2';
import {NvSelectOption} from 'angular-velocity';

@Directive({
    selector:"nv-select optgroup",
    properties: ['label']
})
export class NvOptGroup {

    optionElementsQuery: QueryList<NvSelectOption>;

    constructor(@Query(NvSelectOption) optionElements: QueryList<NvSelectOption>) {
        this.optionElementsQuery = optionElements;
    }



}