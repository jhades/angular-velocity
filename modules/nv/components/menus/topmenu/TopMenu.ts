
import {Component, View, Query, QueryList} from 'angular2/core';


@Component({
    selector: 'nv-top-menu'
})
@View({
    template: `
        <nav class="layout-top-menu">
            <ul>
                <li *ngFor="#option of options"><a>{{option.title}}</a></li>
            </ul>
        </nav>`
})
export class TopMenu {

    //options: QueryList<MenuEntry>;

    constructor(/*@Query(MenuEntry) topMenuEntries: QueryList<MenuEntry>*/) {
        console.log("builded top menu");
        /*
        this.options = topMenuEntries;

        this.options.changes.toRx().subscribe(() => {
            console.log("received query results");
           console.log(this.options);
        });*/
    }

}