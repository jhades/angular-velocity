
import {Component, View, Query, QueryList, CORE_DIRECTIVES} from 'angular2/angular2';
import {Tab} from './Tab';

@Component({
    selector: 'nv-tabs'
})
@View({
    directives: [CORE_DIRECTIVES],
    templateUrl: 'nv/components/tabs/tabs.html'
})
export class Tabs {

    tabsQuery: QueryList<Tab>;
    tabs: Tab[];

    constructor(@Query(Tab) tabsQuery: QueryList<Tab>) {
        this.tabsQuery = tabsQuery;
        tabsQuery.changes.toRx().subscribe(() => this.onTabsChanged());
    }

    onTabsChanged() {
        this.tabs= this.tabsQuery.toArray();
        if (this.tabs.length > 0) {
            this.tabs[0].selected = true;
        }
    }

    selectTab(tab) {
        this.tabs.forEach((tab) => tab.selected = false);
        tab.selected = true;
    }

}