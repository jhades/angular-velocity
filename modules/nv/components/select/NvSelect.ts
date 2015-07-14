
import {Component, View, Query, QueryList, coreDirectives} from 'angular2/angular2';
import {SelectionList} from 'angular-velocity';
import {NvSelectOption} from 'nv/components/select/NvSelectOption';
import {NvOptGroup} from 'nv/components/select/NvOptGroup';

@Component({
    selector:"nv-select"
})
@View({
    template: `<div>nv-select</div>`,
    directives: [SelectionList, NvSelectOption, NvOptGroup, coreDirectives]
})
export class NvSelect {

    isGroupMode: boolean = false;

    constructor(@Query(NvSelectOption, {descendants: false}) optionElements: QueryList<NvSelectOption>,
                @Query(NvOptGroup) optionGroups: QueryList<NvOptGroup>) {

        this.isGroupMode = (optionGroups.length > 0);
    }

}