import {Component, View, Inject} from 'angular2/core';
import {NgModel} from 'angular2/common';
import {ReferenceData, ReferenceDataService} from 'showcase/common/referenceData';
import {Dropdown,NvSelect, NvSelectOption, NvOptGroup, TypeAhead, Autocomplete, NvValidators} from 'angular-velocity';
import {FORM_DIRECTIVES, Validators, NgFormModel, FormBuilder, NgControl} from 'angular2/common';

@Component({
    selector: 'data-table-example'
})
@View({
    templateUrl: "screens/datatable/data-table-example.html"
})
export class DataTableExample {


}
