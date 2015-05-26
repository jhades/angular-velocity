import {Component, View, bootstrap} from "angular2/angular2";
import {KeyboardUtils} from "nv/utils/KeyboardUtils";
import {Injectable} from 'angular2/di';


@Injectable()
class SomeService {

}



@Component({
    selector: "test",
    appInjector: [SomeService]
})
@View({
    template: `<h1>Testing 123</h1>`
})
export class Test {
    keyboardUtils: KeyboardUtils;

    constructor(keyboardUtils : KeyboardUtils) {
        debugger;
        this.keyboardUtils = keyboardUtils;
    }

}



bootstrap(Test);