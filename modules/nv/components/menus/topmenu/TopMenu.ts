
import {Component, View, coreDirectives, Query, QueryList} from 'angular2/angular2';
import {MenuEntry} from '../menuentry/MenuEntry';

@Component({
    selector: 'nv-top-menu'
})
@View({
    directives: [coreDirectives, MenuEntry],
    templateUrl: 'nv/components/menus/topmenu/top-menu.html'
})
export class TopMenu {

    topMenuEntries: QueryList<MenuEntry>;

    constructor(@Query(MenuEntry, {descendants:false}) topMenuEntries: QueryList<MenuEntry>) {
        this.topMenuEntries = topMenuEntries;
    }


}