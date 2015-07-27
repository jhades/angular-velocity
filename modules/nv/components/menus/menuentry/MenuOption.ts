
import {Directive, View, coreDirectives, Query, QueryList, Attribute} from 'angular2/angular2';

@Directive({
    selector: 'nv-top-menu option'
})
export class MenuOption {
    title: string;
    options: QueryList<MenuOption>;

    constructor(@Query(MenuOption) options: QueryList<MenuOption>, @Attribute("title") title) {
        console.log("builded menu option");
        this.options = options;
        this.title = title;
        this.options.onChange(() => {
            console.log('top menu entries ' + this.options.length);
        });
    }

}