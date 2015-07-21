
import {Directive,Ancestor} from 'angular2/angular2';
import {LayoutContent} from './LayoutContent';

@Directive({
    selector:"[nv-layout-main]"
})
export class LayoutMain {

    constructor(@Ancestor(LayoutContent) content: LayoutContent) {
        console.log(content);
    }

}