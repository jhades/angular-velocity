
import {Directive, View, CORE_DIRECTIVES, Query, QueryList} from 'angular2/angular2';

@Directive({
    selector: 'nv-top-menu submenu'
})
export class Submenu {

    constructor() {
        console.log("builded menu option group");
    }


}