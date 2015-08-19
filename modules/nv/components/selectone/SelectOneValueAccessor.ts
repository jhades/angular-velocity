
import {DefaultValueAccessor, Directive, Self, NgControl, Renderer, ElementRef} from 'angular2/angular2';

@Directive({
    selector:
        'nv-dropdown[ng-control],nv-dropdown[ng-form-control],nv-dropdown[ng-model]',
    host: {
        '[class.ng-untouched]': 'ngClassUntouched',
        '[class.ng-touched]': 'ngClassTouched',
        '[class.ng-pristine]': 'ngClassPristine',
        '[class.ng-dirty]': 'ngClassDirty',
        '[class.ng-valid]': 'ngClassValid',
        '[class.ng-invalid]': 'ngClassInvalid'
    }
})
export class SelectOneValueAccessor extends DefaultValueAccessor {

    constructor(@Self() cd: NgControl, private renderer: Renderer, private elementRef: ElementRef) {
        super(cd, renderer, elementRef);
    }
}