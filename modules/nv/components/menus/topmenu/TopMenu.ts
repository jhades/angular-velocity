
import {Component, View, CORE_DIRECTIVES, Query, QueryList} from 'angular2/angular2';
import {MenuEntry} from '../menuentry/MenuEntry';

@Component({
    selector: 'nv-top-menu'
})
@View({
    directives: [CORE_DIRECTIVES],
    template: `
        <nav class="layout-top-menu">
            <ul>
                <li *ng-for="#option of options"><a>{{option.title}}</a></li>
            </ul>
        </nav>`
})
export class TopMenu {

    options: QueryList<MenuEntry>;

    constructor(@Query(MenuEntry) topMenuEntries: QueryList<MenuEntry>) {
        console.log("builded top menu");
        this.options = topMenuEntries;

        this.options.changes.toRx().subscribe(() => {
            console.log("received query results");
           console.log(this.options);
        });
    }

}