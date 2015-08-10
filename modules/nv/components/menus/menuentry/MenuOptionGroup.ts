
import {Directive, View, coreDirectives, Query, QueryList} from 'angular2/angular2';

@Directive({
    selector: 'nv-top-menu option-group'
})
export class MenuOptionGroup {

    constructor() {
        console.log("builded menu option group");
    }


}