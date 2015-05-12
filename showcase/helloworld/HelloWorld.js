import {ComponentAnnotation as Component, ViewAnnotation as View} from 'angular2/angular2';

@Component({
    selector: 'hello-world'
})
@View({
    template: ` <h2>Angular 2 Hello World</h2>
                <div>
                    <label>Message:</label>
                    <input type="text" #hello>
                    <div>Echo:{{hello.value}}</div>
                </div>`
})
export class HelloWorld {


}
