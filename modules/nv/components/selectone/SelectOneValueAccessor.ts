
import {DefaultValueAccessor, Directive, Self, NgControl, Renderer, ElementRef} from 'angular2/angular2';

@Directive({
    selector:
        'nv-dropdown-TODO[ngControl],nv-dropdown-TODO[ngFormControl],nv-dropdown-TODO[ngModel],nv-typeahead-TODO[ngControl],nv-typeahead-TODO[ngForm-Control],nv-typeahead-TODO[ngModel]',
    host: {
        '(change)': 'onChange($event.target.value)',
        '(input)': 'onChange($event.target.value)',
        '(blur)': 'onTouched()'
    }
})
export class SelectOneValueAccessor extends DefaultValueAccessor {

    constructor(private renderer: Renderer, private elementRef: ElementRef) {
        super(renderer, elementRef);
    }
}