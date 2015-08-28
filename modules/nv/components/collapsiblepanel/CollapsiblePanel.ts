
import {Component, View, EventEmitter, CORE_DIRECTIVES, Attribute} from "angular2/angular2";

@Component({
    selector:'nv-collapsible-panel'
})
@View({
    directives: [CORE_DIRECTIVES],
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