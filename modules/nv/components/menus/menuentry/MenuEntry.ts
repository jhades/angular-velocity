import {Component, View, coreDirectives, Attribute, Query, QueryList} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';
import {MenuOption} from './MenuOption';

@Component({
    selector: 'menu-entry',
    properties: ['option']
})
@View({
    directives: [coreDirectives, RouterLink],
    templateUrl: 'nv/components/menus/menuentry/menu-entry.html'
})
export class MenuEntry {

    menuEntries: QueryList<MenuEntry>;

    constructor(/*, @Query(MenuEntry, {descendants: true}) menuEntries: QueryList<MenuEntry>*/) {
        console.log("builded menu entry");
    }

    hasSubEntries() {
        return this.menuEntries && this.menuEntries.length > 0;
    }

}