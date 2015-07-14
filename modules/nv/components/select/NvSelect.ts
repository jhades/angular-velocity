
import {Component, View, Query, QueryList, NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/angular2';
import {SelectionList} from 'angular-velocity';
import {NvSelectOption} from 'nv/components/select/NvSelectOption';
import {NvOptGroup} from 'nv/components/select/NvOptGroup';

@Component({
    selector:"nv-select"
})
@View({
    template: `
                <h1>{{isGroupMode}}</h1>
                <div class="nv-select" [ng-switch]="isGroupMode">
                    <template [ng-switch-when]="true">
                        <div>
                            simple mode
                        </div>
                    </template>
                    <template [ng-switch-when]="false">
                        <div>
                            group mode
                        </div>
                    </template>
                </div>
                `,
    directives: [SelectionList, NvSelectOption, NvOptGroup, NgSwitch, NgSwitchWhen, NgSwitchDefault]
})
export class NvSelect {

    isGroupMode: boolean = false;
    optionElementsQuery: QueryList<NvSelectOption>;
    optionGroupsQuery: QueryList<NvOptGroup>;

    constructor(@Query(NvSelectOption, {descendants: false}) optionElements: QueryList<NvSelectOption>,
                @Query(NvOptGroup) optionGroups: QueryList<NvOptGroup>) {

        this.optionElementsQuery = optionElements;
        this.optionGroupsQuery = optionGroups;
        optionGroups.onChange(() => this.onOptGroupsChanged());

    }

    onOptGroupsChanged() {
        this.isGroupMode =  (this.optionGroupsQuery._results.length > 0);
    }

}