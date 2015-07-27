
import {Directive, View, coreDirectives, Query, QueryList} from 'angular2/angular2';

@Directive({
    selector: 'nv-top-menu optgroup'
})
export class MenuOptionGroup {

    constructor() {
        console.log("builded menu option group");
    }


}