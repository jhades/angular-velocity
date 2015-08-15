
import {Component, View, coreDirectives, Query, QueryList} from 'angular2/angular2';
import {MenuOption} from '../menuentry/MenuOption';
import {Submenu} from '../menuentry/Submenu';

@Component({
    selector: 'nv-top-menu'
})
@View({
    directives: [coreDirectives],
    templateUrl: 'nv/components/menus/topmenu/top-menu.html'
})
export class TopMenu {

    options: QueryList<MenuOption>;

    //TODO pending https://github.com/angular/angular/issues/3034   https://github.com/angular/angular/issues/1828
    /**
     *
     * design: inject a list of both groups and options. loop through them and do an ng-switch - it's either a <a> or a <dropdown-menu [options]="option.options">
     *
     */
    constructor(@Query(MenuOption) topMenuEntries: QueryList<MenuOption>) {
        console.log("builded top menu");
        this.options = topMenuEntries;
        this.options.onChange(() => {
            console.log("received query results");
           console.log(this.options);
        });
    }

}