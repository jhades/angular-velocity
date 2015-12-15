
import {Component, View, EventEmitter, Attribute} from "angular2/core";

@Component({
    selector:'nv-collapsible-panel'
})
@View({
    templateUrl:'nv/components/collapsiblepanel/collapsible-panel.html'
})
export class CollapsiblePanel {

    collapsed: boolean = false;
    title: String;


    constructor(@Attribute("title") title:string) {
        this.title = title;
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
    }

}