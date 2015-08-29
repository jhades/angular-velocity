import {Component, View, NgFor, NgModel, CORE_DIRECTIVES} from 'angular2/angular2';
import {ReferenceData, ReferenceDataService} from 'showcase/common/referenceData';
import {Dropdown,NvSelect, NvSelectOption, NvOptGroup, TypeAhead, Autocomplete, NvValidators,NV_DIRECTIVES} from 'angular-velocity';
import {FORM_DIRECTIVES, Validators, NgFormModel, FormBuilder, NgControl} from 'angular2/forms';
import {Inject} from 'angular2/di';
import * as Rx from 'rx';

@Component({
    selector: 'sample-app'
})
@View({
    templateUrl: "showcase/screens/main/main.html",
    directives: [CORE_DIRECTIVES,FORM_DIRECTIVES, NgModel,NV_DIRECTIVES],
    viewBindings: [FormBuilder, ReferenceDataService]
})
export class Main {
    refData: ReferenceData;
    refDataService: ReferenceDataService;
    form;
    user: Object = {};

    constructor(@Inject(FormBuilder) fb: FormBuilder, @Inject(ReferenceDataService) refDataService: ReferenceDataService) { //TODO remove @Inject? https://github.com/angular/angular/issues/2788
        this.refData = new ReferenceData();
        this.refDataService = refDataService;

        this.form = fb.group({
            "countryDropdown": ["", Validators.required],
            "username": ["", Validators.required],
            "password": ["", Validators.required],
            //"country": ["", Validators.required]
            "numbersOnly": ["",NvValidators.integer],
            "ssn": [""]

        });

        this.form.valueChanges.toRx().map((value) =>value).subscribe((value) => {
            console.log(value);
            console.log(this.user);
        });

        //TODO default pipes not on by default https://github.com/angular/angular/issues/3173
        // TODO passing an observable to autocomplete should just work, but iterableDiff Pipe is not on to make ng-for use the observable out of the box
        this.countriesObs = Rx.Observable.create((observer: Rx.Observer) => {

            observer.onNext([
                {
                    description: 'Finland'
                }
            ]);

        });

    }

    onSelection(option) {
        console.log("clicked option, event received in app: " + option.description);
    }

    onSubmit() {
        console.log("username valid " + this.form.controls.username.valid);
    }

    onCountrySearch(search) {
        console.log("looking for country " + search);
    }

    onFirstTabSelected() {
        console.log("On first tab selected ...");
    }

}
