import {Component, View, EventEmitter, Attribute, Self, Optional} from 'angular2/angular2';
import {SelectOneWithInput} from 'nv/components/selectone/SelectOneWithInput';
import {SelectOneValueAccessor} from 'nv/components/selectone/SelectOneValueAccessor';
import {NavigationAction,NavActionEnum,TypeSearch, SelectionOption, BlankOption, SelectionGroup, KeyCodes, Dropdown} from 'angular-velocity';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';
import {SelectionList} from 'nv/components/selectionlist/SelectionList';

@Component({
    selector: 'nv-autocomplete',
    outputs: ['selection','search'],
    inputs: ['options', 'dropdownHeight', 'dropdownWidth'],
    viewBindings: [KeyboardUtils]
})
@View({
    template: ` <div class="select-one autocomplete clearfix" [class.active]="active">

                    <div class="input">
                        <input type="text"  (blur)="onFocusLost()" (keydown)="onKeyDown($event, input)" (keyup)="onKeyUp($event, input)"
                        (focus)="onInputFocus($event, input)" (click)="onInputClicked($event, input)" #input>

                    </div>

                    <nv-selection-list
                        [class.hidden]="!showSelectionList"
                        [height]="dropdownHeight"
                        [width]="dropdownWidth"
                        [options]="options"
                        (selection)="onSelectionChanged($event, input)"
                        [navigation-action]="navigationAction"
                        [highlighted-option]="highlighted" (highlight)="onHighlightedChanged($event)">
                    </nv-selection-list>

                </div>`,
    directives: [SelectionList]
})
export class Autocomplete<T extends SelectionOption> extends SelectOneWithInput<T> {

    search: EventEmitter = new EventEmitter();

    constructor(@Attribute("dropdown-height") dropdownHeight, @Attribute("dropdown-width") dropdownWidth,
                 keyUtils: KeyboardUtils, @Optional() @Self() valueAccessor: SelectOneValueAccessor) {
        super(keyUtils, dropdownHeight, dropdownWidth, valueAccessor);
    }

    onKeyUp(event, input) {
        var key = event.keyCode;
        if (key !== KeyCodes.UP && key != KeyCodes.DOWN) {
            this.search.next(input.value);

        }

    }

}
