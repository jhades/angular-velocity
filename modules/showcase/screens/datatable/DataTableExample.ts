import {Component, View, NgFor, NgModel, coreDirectives} from 'angular2/angular2';
import {ReferenceData, ReferenceDataService} from 'showcase/common/referenceData';
import {Dropdown,NvSelect, NvSelectOption, NvOptGroup, TypeAhead, Autocomplete, NvValidators} from 'angular-velocity';
import {formDirectives, Validators, NgFormModel, FormBuilder, NgControl} from 'angular2/forms';
import {Inject} from 'angular2/di';
import * as Rx from 'rx';

@Component({
    selector: 'data-table-example'
})
@View({
    templateUrl: "screens/datatable/data-table-example.html"
})
export class DataTableExample {


}