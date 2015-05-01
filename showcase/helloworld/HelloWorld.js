import {Component,Template, View} from 'angular2/angular2';

@Component({
    selector: 'hello-world'
})
@View({
    template: ` <h2>Angular 2 Hello World</h2>
                <div>
                    <label>Message:</label>
                    <input type="text" (keyup) #ref>
                    <div>Echo:{{ref.value}}</div>
                </div>`
})
export class HelloWorld {


}
