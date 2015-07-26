
import {Component, View, Query, QueryList, coreDirectives} from 'angular2/angular2';
import {Tab} from './Tab';

@Component({
    selector: 'nv-tabs'
})
@View({
    directives: [coreDirectives, Tab],
    template: `<div class="tabcontainer">
                <ul class="tabcontainer-buttons">
                    <li *ng-for="#tab of tabs" class="selected">{{tab.label}}</li>
                </ul>

                <div class="tabcontainer-body">

                    <content></content>

                </div>`
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
    }

}