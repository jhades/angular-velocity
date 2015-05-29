import {Directive, Ancestor} from 'angular2/angular2';
import {Scrollable} from 'nv/decorators';

@Directive({
    selector: "[nv-scrollable-element]"
})
export class ScrollableElement {

    constructor(@Ancestor(Scrollable) scrollable: Scrollable) {
        scrollable.addScrollableElement(this);
    }

}