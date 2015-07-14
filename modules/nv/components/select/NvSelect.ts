
import {Component, View, Query, QueryList, coreDirectives} from 'angular2/angular2';
import {SelectionList} from 'angular-velocity';
import {NvSelectOption} from 'nv/components/select/NvSelectOption';
import {NvOptGroup} from 'nv/components/select/NvOptGroup';
import {CONST_EXPR} from 'angular2/src/facade/lang';

@Component({
    selector:"nv-select"
})
@View({
    template: `
                <div class="nv-select" ng-switch>

                </div>
                `,
    directives: [SelectionList, NvSelectOption, NvOptGroup, coreDirectives]
})
export class NvSelect {

    isGroupMode: boolean = false;

    constructor(@Query(NvSelectOption, {descendants: false}) optionElements: QueryList<NvSelectOption>,
                @Query(NvOptGroup) optionGroups: QueryList<NvOptGroup>) {

        this.isGroupMode = (optionGroups.length && optionGroups.length > 0);
    }

}