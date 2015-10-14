
import {Directive, View, CORE_DIRECTIVES, Query, QueryList, Attribute} from 'angular2/angular2';

@Directive({
    selector: 'nv-top-menu option'
})
export class MenuOption {
    title: string;

    constructor(@Attribute("title") title:string) {
        console.log("builded menu option");
        this.title = title;
    }

}