
import {DefaultValueAccessor, Directive, Self, NgControl, Renderer, ElementRef} from 'angular2/angular2';

@Directive({
    selector:
        'nv-dropdown-TODO[ng-control],nv-dropdown-TODO[ng-form-control],nv-dropdown-TODO[ng-model],nv-typeahead-TODO[ng-control],nv-typeahead-TODO[ng-form-control],nv-typeahead-TODO[ng-model]',
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