
import {Component, View, EventEmitter, coreDirectives, Attribute} from "angular2/angular2";

@Component({
    selector:'nv-collapsible-panel'
})
@View({
    directives: [coreDirectives],
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