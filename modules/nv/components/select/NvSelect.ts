
import {Component, View, Query, QueryList} from 'angular2/angular2';
import {SelectionList} from 'angular-velocity';
import {NvSelectOption} from 'nv/components/select/NvSelectOption';

@Component({
    selector:"nv-select"
})
@View({
    template: `<div>nv-select</div>`,
    directives: [SelectionList, NvSelectOption]
})
export class NvSelect {

    constructor(@Query(NvSelectOption) optionElements: QueryList<NvSelectOption>) {
        console.log(optionElements);
    }

}