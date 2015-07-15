import {Directive, ElementRef} from 'angular2/angular2';
import {SelectionOption} from 'angular-velocity';

@Directive({
    selector:"nv-select option",
    properties: ['value', 'text']
})
export class NvSelectOption {




}