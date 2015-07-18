/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, EventEmitter, Attribute} from 'angular2/angular2';
import {SelectOne} from 'nv/components/selectone/SelectOne';
import {NavigationAction,NavActionEnum,TypeSearch,SelectionList, SelectionOption, BlankOption, SelectionGroup, KeyCodes, Dropdown} from 'angular-velocity';

@Component({ 
    selector: 'nv-autocomplete',
    events: ['change'],
    properties: ['options', 'optionGroups', 'dropdownHeight', 'dropdownWidth']
})
@View({
    template: ` <div class="ngv-input select-one autocomplete clearfix" [class.active]="active">

                    <div class="input">
                        <input type="text" (blur)="onFocusLost()" (keydown)="onKeyDown($event, input)" #input>

                        <div class="widget-button dropdown-button"
                            (click)="onButtonToggle()">
                        </div>
                    </div>

                    <ngv-selection-list
                        [hidden]="!showSelectionList"
                        [height]="dropdownHeight"
                        [width]="dropdownWidth"
                        [options]="options"
                        [option-groups]="optionGroups"
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


    onSelectionChanged(option: T, input) {
        super.onSelectionChanged(option, input);
        input.value = option.description;
    }


    onKeyDown(event, input) {
        super.onKeyDown(event, input);
        this.search = input.value;
    }


}
