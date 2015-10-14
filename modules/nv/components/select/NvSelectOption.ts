import {Directive, ElementRef} from 'angular2/angular2';
import {SelectionOption} from 'angular-velocity';

@Directive({
    selector:"nv-select option",
    inputs: ['value', 'text']
})
export class NvSelectOption {

    text: string;
    value: any;

    get option() {
        return {
            description: this.text,
            value: this.value
        }
    }


}