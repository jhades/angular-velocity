
import {Component, View, bootstrap} from 'angular2/angular2';
import {ReferenceData} from "helloworld/referenceData";
import {HelloWorld} from 'helloworld/HelloWorld';
import {Dropdown} from 'dropdown/Dropdown';


@Component({
    selector: 'demo-app'
})
@View({
    template: `<div class="demos">

                    <div class="demo">
                        <hello-world></hello-world>
                    </div>

                    <div class="demo">

                        <form class="pure-form">
                            <h2>Dropdown</h2>
                            <ngv-dropdown
                                [options]="refData.COUNTRIES"
                                (change)="onSelection($event)"
                                [height]="'100px'"
                                [width]="'280px'">
                            </ngv-dropdown>
                        </form>
                    </div>

                </div>`,
    directives: [HelloWorld, Dropdown]
})
export class DemoApp {

    constructor() {
        this.refData = new ReferenceData();
    }

    onSelection(option) {
        console.log("clicked option, event received in app: " + option.description);
    }

}

bootstrap(DemoApp);
