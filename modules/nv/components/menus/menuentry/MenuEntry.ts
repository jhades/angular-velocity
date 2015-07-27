import {Component, View, coreDirectives, Attribute, Query, QueryList} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

@Component({
    selector: 'menu-entry',
    properties: ['title', 'routing']
})
@View({
    directives: [coreDirectives, RouterLink],
    templateUrl: 'nv/components/menus/menuentry/menu-entry.html'
})
export class MenuEntry {

    title: string;
    routing:string;
    menuEntries: QueryList<MenuEntry>;

    constructor(@Attribute("routing") routing, @Query(MenuEntry, {descendants: false}) menuEntries: QueryList<MenuEntry>) {
        this.routing = routing;
        this.menuEntries = menuEntries;
    }

}