import {Component,Template, View, bootstrap} from 'angular2/angular2';

@Component({
    selector: 'hello-world'
})
@View({
    template: ` <h1>Angular 2 Hello World</h1>
                <div>
                    <label>Message:</label>
                    <input type="text" (keyup)  #ref>
                    <div>Echo:{{ref.domElement.value}}</div>
                </div>`
})
export class HelloWorld {


}

bootstrap(HelloWorld);
