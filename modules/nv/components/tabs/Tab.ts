
import {Component, View, Attribute, CORE_DIRECTIVES, EventEmitter} from 'angular2/angular2';

@Component({
    selector: 'nv-tab',
    outputs: ['selection']
})
@View({
    directives: [CORE_DIRECTIVES],
    template: `<div class="tabcontainer-body" *ngIf="_selected">

                    <ng-content></ng-content>

                </div>`
})
export class Tab {

    title:string;
    _selected:boolean = false;
    selection: EventEmitter = new EventEmitter();

    constructor(@Attribute("title") title) {
        this.title = title;
    }

    set selected(isSelected) {
        this._selected = isSelected;
        if (this._selected) {
            this.selection.next(null);
        }
    }

    get selected() {
        return this._selected;
    }

}