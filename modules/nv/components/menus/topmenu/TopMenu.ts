
import {Component, View, coreDirectives, Query, QueryList} from 'angular2/angular2';
import {MenuOption} from '../menuentry/MenuOption';

@Component({
    selector: 'nv-top-menu'
})
@View({
    directives: [coreDirectives, MenuOption],
    templateUrl: 'nv/components/menus/topmenu/top-menu.html'
})
export class TopMenu {

    options: QueryList<MenuOption>;

    constructor(@Query(MenuOption, {descendants:false}) topMenuEntries: QueryList<MenuOption>) {
        console.log("builded top menu");
        this.options = topMenuEntries;
        this.options.onChange(() => {
           console.log('top menu entries ' + this.options.length);
        });
    }


}