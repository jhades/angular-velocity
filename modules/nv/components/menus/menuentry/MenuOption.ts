
import {Directive, View, coreDirectives, Query, QueryList, Attribute} from 'angular2/angular2';

@Directive({
    selector: 'nv-top-menu option'
})
export class MenuOption {
    title: string;

    constructor(@Attribute("title") title) {
        console.log("builded menu option");
        this.title = title;
    }

}