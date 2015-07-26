
import {Component, View, Query, QueryList, coreDirectives} from 'angular2/angular2';
import {Tab} from './Tab';

@Component({
    selector: 'nv-tabs'
})
@View({
    directives: [coreDirectives],
    templateUrl: 'nv/components/tabs/tabs.html'
})
export class Tabs {

    tabsQuery: QueryList<Tab>;
    tabs: Array<Tab>;

    constructor(@Query(Tab) tabsQuery: QueryList<Tab>) {
        this.tabsQuery = tabsQuery;
        tabsQuery.onChange(() => this.onTabsChanged());
    }

    onTabsChanged() {
        this.tabs= [];
        for (let tab of this.tabsQuery._results) { //TODO refactor once Query list is an observable
            this.tabs.push(tab);
        }
        if (this.tabs.length > 0) {
            this.tabs[0].selected = true;
        }
    }

    selectTab(tab) {
        this.tabs.forEach((tab) => tab.selected = false);
        tab.selected = true;
    }

}