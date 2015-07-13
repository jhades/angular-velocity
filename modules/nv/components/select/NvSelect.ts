
import {Component, View, Query, QueryList} from 'angular2/angular2';
import {SelectionList} from 'angular-velocity';
import {NvSelectOption} from 'nv/components/select/NvSelectOption';
import {NvOptGroup} from 'nv/components/select/NvOptGroup';

@Component({
    selector:"nv-select"
})
@View({
    template: `<div>nv-select</div>`,
    directives: [SelectionList, NvSelectOption, NvOptGroup]
})
export class NvSelect {

    constructor(@Query(NvSelectOption) optionElements: QueryList<NvSelectOption>,
                @Query(NvOptGroup) optionGroups: QueryList<NvOptGroup>) {
        console.log(optionElements);
        console.log(optionGroups);
    }

}