/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, EventEmitter, Attribute} from 'angular2/angular2';
import {SelectOne} from 'nv/components/selectone/SelectOne';
import {NavigationAction,NavActionEnum,TypeSearch,SelectionList, SelectionOption, BlankOption, SelectionGroup, KeyCodes, Dropdown} from 'angular-velocity';
import {Pipes} from 'angular2/change_detection';
import {filterOptions} from 'nv/components/typeahead/FilterOptionsPipe';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';

@Component({
    selector: 'nv-typeahead',
    events: ['change'],
    properties: ['options', 'optionGroups', 'dropdownHeight', 'dropdownWidth'],
    viewBindings: [
        Pipes.extend({
            'filterOptions': filterOptions
        }),
        KeyboardUtils
    ]
})
@View({
    template: ` <div class="select-one typeahead clearfix" [class.active]="active">

                    <div class="input">
                        <input type="text" (focus)="onFocus()" (blur)="onFocusLost()" (keydown)="onKeyDown($event, input)" (keyup)="onKeyUp($event, input)" (
                        focus)="onInputFocus($event, input)" (click)="onInputClicked($event, input)" #input>

                        <div class="widget-button dropdown-button"
                            (click)="onButtonToggle(input)">
                        </div>
                    </div>

                    <nv-selection-list
                        [class.hidden]="!showSelectionList"
                        [height]="dropdownHeight"
                        [width]="dropdownWidth"
                        [options]="options | filterOptions: search"
                        (change)="onSelectionChanged($event, input)"
                        [navigation-action]="navigationAction"
                        [highlighted-option]="highlighted" (highlight)="onHighlightedChanged($event)">
                    </nv-selection-list>

                </div>`,
    directives: [SelectionList, TypeSearch]
})
export class TypeAhead<T extends SelectionOption> extends SelectOne<T> {

    search: string;

    constructor(@Attribute("dropdown-height") dropdownHeight, @Attribute("dropdown-width") dropdownWidth,
                private keyUtils: KeyboardUtils) {
        super(dropdownHeight, dropdownWidth);
    }

    onInputFocus($event, input) {
        input.select();
        this.active = true;
    }

    onInputClicked($event, input) {
        this.onInputFocus($event, input);
        $event.preventDefault();
    }

    onSelectionChanged(option: T, input) {
        super.onSelectionChanged(option, input);
        input.value = option.description;
        input.select();
    }

    onKeyDown(event, input) {
        super.onKeyDown(event, input);
        var key = event.keyCode;
        if (!this.keyUtils.isMeta(key) && !this.showSelectionList && key !== KeyCodes.ESC &&
            key !== KeyCodes.ENTER && key !== KeyCodes.LEFT && key !== KeyCodes.RIGHT && key !== KeyCodes.TAB && key != KeyCodes.SHIFT) {
            this.showSelectionList = true;
        }
    }

    onKeyUp(event, input) {
        var key = event.keyCode;
        if (key !== KeyCodes.UP && key != KeyCodes.DOWN) {
            this.search = input.value;
            var match = this.findClosestMatch(this.search.toUpperCase());
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
