
import {Directive, Ancestor} from 'angular2/angular2';
import {LayoutContent} from './LayoutContent';

@Directive({
    selector:"[nv-layout-left-menu]"
})
export class LayoutLeftMenu {

    constructor(@Ancestor(LayoutContent) content: LayoutContent) {

    }

}