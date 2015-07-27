
import {Directive, View, coreDirectives, Query, QueryList} from 'angular2/angular2';

@Directive({
    selector: 'nv-top-menu option'
})
export class MenuOption {

    options: QueryList<MenuOption>;

    constructor(@Query(MenuOption, {descendants:false}) options: QueryList<MenuOption>) {
        console.log("builded menu option");
        this.options = options;
        this.options.onChange(() => {
            console.log('top menu entries ' + this.options.length);
        });
    }


}