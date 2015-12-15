
import {Component, View, Query, QueryList} from 'angular2/core';
import {Tab} from './Tab';

@Component({
    selector: 'nv-tabs'
})
@View({
    templateUrl: 'nv/components/tabs/tabs.html'
})
export class Tabs {

    tabsQuery: QueryList<Tab>;
    tabs: Tab[];

    constructor(@Query(Tab) tabsQuery: QueryList<Tab>) {
        this.tabsQuery = tabsQuery;
        tabsQuery.changes.subscribe(() => this.onTabsChanged());
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