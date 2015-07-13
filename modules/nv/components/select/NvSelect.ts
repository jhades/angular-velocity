
import {Component, View} from 'angular2/angular2';
import {SelectionList} from 'angular-velocity';

@Component({
    selector:"nv-select"
})
@View({
    template: `<div>nv-select</div>`,
    directives: [SelectionList]
})
export class NvSelect {

}