/// <reference path="../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {ReferenceData} from 'showcase/common/referenceData';
import {Dropdown} from 'angular-velocity';

@Component({
    selector: 'sample-app'
})
@View({
    template: `<div class="demos">
                    <form class="pure-form">
                        <div class="demo">
                            <h3>nv-dropdown:</h3>
                            <nv-dropdown num-visible-options="7" dropdown-width="200px"
                                [options]="refData.COUNTRIES"
                                (change)="onSelection($event)">
                            </nv-dropdown>
                        </div>
                        <div class="demo">
                            <h3>nv-dropdown with groups:</h3>
                            <nv-dropdown num-visible-options="7" dropdown-width="200px"
                                [option-groups]="refData.NBA_DIVISIONS"
                                (change)="onSelection($event)">
                            </nv-dropdown>
                        </div>
                        <div class="demo">
                            <h3>nv-select:</h3>
                        </div>

                    </form>
                </div>`,
    directives: [Dropdown]
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
