import {Component, View, EventEmitter, Attribute, Self, Optional} from 'angular2/core';
import {SelectOneWithInput} from 'nv/components/selectone/SelectOneWithInput';
import {NavigationAction,NavActionEnum, SelectionOption, BlankOption,
    SelectionGroup, KeyCodes, Dropdown} from 'angular-velocity';
import {SelectionList} from 'nv/components/selectionlist/SelectionList';
import {FilterOptionsPipe} from 'nv/components/typeahead/FilterOptionsPipe';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';
import {SelectOneValueAccessor} from 'nv/components/selectone/SelectOneValueAccessor';
import {TypeSearch} from 'nv/decorators/typesearch/TypeSearch';


@Component({
    selector: 'nv-typeahead',
    outputs: ['selection'],
    inputs: ['options', 'optionGroups', 'dropdownHeight', 'dropdownWidth'],
    viewBindings: [
        KeyboardUtils
    ]
})
@View({
    template: ` <div class="select-one typeahead clearfix" [class.active]="active">

                    <div class="input">
                        <input type="text" (blur)="onFocusLost()" (keydown)="onKeyDown($event, input)" (keyup)="onKeyUp($event, input)"
                        (focus)="onInputFocus($event, input)" (click)="onInputClicked($event, input)" #input>

                        <div class="widget-button dropdown-button"
                            (click)="onButtonToggle(input)">
                        </div>
                    </div>

                    <nv-selection-list
                        [class.hidden]="!showSelectionList"
                        [height]="dropdownHeight"
                        [width]="dropdownWidth"
                        [options]="options | filterOptions: search"
                        (selection)="onSelectionChanged($event, input)"
                        [navigationAction]="navigationAction"
                        [highlightedOption]="highlighted" (highlight)="onHighlightedChanged($event)">
                    </nv-selection-list>

                </div>`,
    directives: [SelectionList, TypeSearch],
    pipes: [FilterOptionsPipe]
})
export class TypeAhead<T extends SelectionOption> extends SelectOneWithInput<T> {

    search: string;

    constructor(@Attribute("dropdown-height") dropdownHeight, @Attribute("dropdown-width") dropdownWidth,
                keyUtils: KeyboardUtils, @Optional() @Self() valueAccessor: SelectOneValueAccessor) {
        super(keyUtils, dropdownHeight, dropdownWidth, valueAccessor);
    }

    onKeyUp(event, input) {
        let key = event.keyCode;
        if (key !== KeyCodes.UP && key != KeyCodes.DOWN) {
            this.search = input.value;
            let match = this.findClosestMatch(this.search.toUpperCase());
            if (match) {
                this.highlighted = match;
            }
        }

    }

    onButtonToggle(input) {
        if (this.active) {
            this.cancelFocusLost = true;
        }
        super.onButtonToggle(input);
        input.focus();
    }

}
