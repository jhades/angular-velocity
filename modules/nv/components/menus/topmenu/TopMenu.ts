
import {Component, View, coreDirectives, Query, QueryList} from 'angular2/angular2';
import {MenuOption} from '../menuentry/MenuOption';
import {MenuOptionGroup} from '../menuentry/MenuOptionGroup';

@Component({
    selector: 'nv-top-menu'
})
@View({
    directives: [coreDirectives],
    templateUrl: 'nv/components/menus/topmenu/top-menu.html'
})
export class TopMenu {

    options: QueryList<MenuOption>;

    //TODO pending https://github.com/angular/angular/issues/3034
    /**
     *
     * design: inject a list of both groups and options
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


    static queryOptionsAndOptionGroups(obj) {
        return obj instanceof MenuOption || obj instanceof MenuOptionGroup;
    }


}