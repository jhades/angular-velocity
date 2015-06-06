import {Component, View, bootstrap, onChange} from "angular2/angular2";



@Component({
    selector:"some",
    properties: ['testprop'],
    lifecycle: [onChange]
})
@View({
    template: `<h2>{{testprop}}</h2>`
})
class SomeComponent {
    testprop: string;

    constructor() {
        this.testprop = "initial";
    }

    onChange() {
        console.log("onChange");
    }
}



@Component({
    selector: "test"
})
@View({
    template: `<div>
                    <h1>Testing 123</h1>
                    <input type="text" (keydown)="onKeyDown($event, input.value)" #input>
                    <some [testprop]="search"></some>
                </div>`,
    directives: [SomeComponent]
})
export class Test {
    search: string;

    constructor() {
        this.search = "";
    }

    onKeyDown($event, value) {
        this.search = value;
        console.log(this.search);
    }

}



bootstrap(Test);