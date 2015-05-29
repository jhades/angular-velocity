import {Directive, Ancestor} from 'angular2/angular2';
import {Scrollable} from 'nv/decorators';
import {Selectable} from 'nv/core/Selecteable';

@Directive({
    selector: "[nv-scrollable-element]",
    properties: {
        'selectable': 'selectable',
    },
})
export class ScrollableElement {
    selectable:Selectable;

    constructor(@Ancestor(Scrollable) scrollable: Scrollable) {
        scrollable.addScrollableElement(this);
    }


    set selected(selected: boolean) {
        this.selectable.selected = selected;
    }

}