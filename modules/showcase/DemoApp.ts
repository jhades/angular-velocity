/// <reference path="../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {ReferenceData} from 'showcase/common/referenceData';
import {Dropdown} from 'nv/components/dropdown/Dropdown';

@Component({
    selector: 'sample-app'
})
@View({
    template: `<div class="demos">

                    <div class="demo">

                        <form class="pure-form">
                            <h2>Dropdown</h2>
                            <nv-dropdown
                                [options]="refData.COUNTRIES"
                                (change)="onSelection($event)"
                                [num-visible-options]="7"
                                [width]="'200px'">
                            </nv-dropdown>
                        </form>
                    </div>
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