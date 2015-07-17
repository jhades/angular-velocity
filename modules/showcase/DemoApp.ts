/// <reference path="../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {ReferenceData} from 'showcase/common/referenceData';
import {Dropdown,NvSelect, NvSelectOption, NvOptGroup, Autocomplete} from 'angular-velocity';

@Component({
    selector: 'sample-app'
})
@View({
    template: `<div class="demos">
                    <form class="pure-form">
                        <div class="demo">
                            <h3>nv-dropdown:</h3>
                            <nv-dropdown dropdown-height="250px" dropdown-width="200px"
                                [options]="refData.COUNTRIES"
                                (change)="onSelection($event)">
                            </nv-dropdown>
                        </div>
                        <div class="demo">
                            <h3>nv-dropdown with groups:</h3>
                            <nv-dropdown dropdown-height="250px" dropdown-width="200px"
                                [option-groups]="refData.NBA_DIVISIONS"
                                (change)="onSelection($event)">
                            </nv-dropdown>
                        </div>
                        <div class="demo">
                            <h3>nv-autocomplete (in-memory):</h3>
                            <nv-autocomplete dropdown-height="250px" dropdown-width="200px"
                                [options]="refData.COUNTRIES"
                                (change)="onSelection($event)">
                            </nv-autocomplete>
                        </div>
                        <div class="demo">
                            <h3>nv-select:</h3>
                            <nv-select dropdown-height="250px" dropdown-width="200px" (change)="onSelection($event)">
                                <option *ng-for="#team of refData.NBA_TEAMS" [value]="team" [text]="team.description"></option>
                            </nv-select>
                        </div>
                        <div class="demo">
                            <h3>nv-select with groups:</h3>
                            <nv-select dropdown-height="250px" dropdown-width="200px" (change)="onSelection($event)">
                                <optgroup *ng-for="#division of refData.NBA_DIVISIONS;" [label]="division.label">
                                    <option *ng-for="#team of division.options" [value]="team" [text]="team.description"></option>
                                </optgroup>
                            </nv-select>
                        </div>

                    </form>
                </div>`,
    directives: [Dropdown,NgFor,NvSelect, NvSelectOption, NvOptGroup, Autocomplete]
})
export class DemoApp {
    refData: ReferenceData;

    constructor() {
        this.refData = new ReferenceData();
    }

    onSelection(option) {
        console.log("clicked option, event received in app: " + option.description);
    }

}

bootstrap(DemoApp);
