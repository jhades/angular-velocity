import {Component, View, NgFor, NgModel, CORE_DIRECTIVES, Inject} from 'angular2/angular2';
import {ReferenceData, ReferenceDataService} from 'showcase/common/referenceData';
import {Dropdown,NvSelect, NvSelectOption, NvOptGroup, TypeAhead, Autocomplete, NvValidators,NV_DIRECTIVES} from 'angular-velocity';
import {FORM_DIRECTIVES, Validators, NgFormModel, FormBuilder, NgControl} from 'angular2/angular2';

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

    constructor(fb: FormBuilder, @Inject(ReferenceDataService) refDataService: ReferenceDataService) {
        this.refData = new ReferenceData();
        this.refDataService = refDataService;

        this.form = fb.group({
            //"countryDropdown": ["", Validators.required], //TODO pending SelectOneValueAccessor - need more info on how to do a custom component
            "username": ["", Validators.required],
            "password": ["", Validators.required],
            //"country": ["", Validators.required]
            "numbersOnly": ["",NvValidators.integer],
            /*"countryTypeAhead": ["", Validators.required],*/ //TODO pending SelectOneValueAccessor - need more info on how to do a custom component
            "ssn": [""]

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
