import {Directive, View, Query, QueryList} from 'angular2/angular2';
import {SelectionOption} from 'angular-velocity';
import {NvSelectOption} from 'nv/components/select/NvSelectOption';
import {ObservableWrapper} from 'angular2/src/core/facade/async';

@Directive({
    selector:"nv-select optgroup",
    inputs: ['label']
})
@View({
    directives: [NvSelectOption]
})
export class NvOptGroup {

    options: Array<SelectionOption>;
    optionElementsQuery: QueryList<NvSelectOption>;

    constructor(@Query(NvSelectOption) optionElements: QueryList<NvSelectOption>) {
        this.optionElementsQuery = optionElements;
        ObservableWrapper.subscribe(optionElements.changes, () => this.onOptionsChanged());
    }

    onOptionsChanged() {
        this.options = [];
        this.optionElementsQuery._results.forEach((optionEl) => this.options.push(optionEl.option));
    }


}