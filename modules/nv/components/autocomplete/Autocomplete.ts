/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, EventEmitter, Attribute} from 'angular2/angular2';
import {SelectOne} from 'nv/components/selectone/SelectOne';
import {NavigationAction,NavActionEnum,TypeSearch,SelectionList, SelectionOption, BlankOption, SelectionGroup, KeyCodes, Dropdown} from 'angular-velocity';
import {Pipes} from 'angular2/change_detection';
import {filterOptions} from 'nv/components/autocomplete/FilterOptionsPipe';

@Component({
    selector: 'nv-autocomplete',
    events: ['change'],
    properties: ['options', 'optionGroups', 'dropdownHeight', 'dropdownWidth'],
    viewInjector: [
        Pipes.append({
            'filterOptions': filterOptions
        })
    ]
})
@View({
    template: ` <div class="ngv-input select-one autocomplete clearfix" [class.active]="active">

                    <div class="input">
                        <input type="text" (blur)="onFocusLost()" (keydown)="onKeyDown($event, input)" (keyup)="onKeyUp($event, input)" (focus)="onInputFocus(input)" #input>

                        <div class="widget-button dropdown-button"
                            (click)="onButtonToggle(input)">
                        </div>
                    </div>

                    <ngv-selection-list
                        [hidden]="!showSelectionList"
                        [height]="dropdownHeight"
                        [width]="dropdownWidth"
                        [options]="options | filterOptions: search"
                        (change)="onSelectionChanged($event, input)"
                        [navigation-action]="navigationAction"
                        [highlighted-option]="highlighted" (highlight)="onHighlightedChanged($event)">
                    </ngv-selection-list>

                </div>`,
    directives: [SelectionList, TypeSearch]
})
export class Autocomplete<T extends SelectionOption> extends SelectOne<T> {

    search: string;

    constructor(@Attribute("dropdown-height") dropdownHeight, @Attribute("dropdown-width") dropdownWidth) {
        super(dropdownHeight, dropdownWidth);
    }

    onInputFocus(input) {
        input.select();
        this.active = true;
    }

    onSelectionChanged(option: T, input) {
        super.onSelectionChanged(option, input);
        input.value = option.description;
    }

    onKeyDown(event, input) {
        super.onKeyDown(event, input);
        var key = event.keyCode;
        if (!this.showSelectionList && key !== KeyCodes.ESC && key !== KeyCodes.ENTER && key !== KeyCodes.LEFT && key !== KeyCodes.RIGHT) {
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
        super.onButtonToggle(input);
        input.focus();
    }

}
