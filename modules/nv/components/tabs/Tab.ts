
import {Component, View, Attribute, coreDirectives} from 'angular2/angular2';

@Component({
    selector: 'nv-tab'
})
@View({
    directives: [coreDirectives],
    template: `<div class="tabcontainer-body" *ng-if="selected">

                    <ng-content></ng-content>

                </div>`
})
export class Tab {

    title:string;
    selected:boolean = false;

    constructor(@Attribute("title") title) {
        this.title = title;
    }

}