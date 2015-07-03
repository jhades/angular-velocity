/// <reference path="../../../../typings/angular2/angular2.d.ts" />
/// <reference path="../../../../typings/lodash/lodash.d.ts" />

import {Component, View, EventEmitter, Attribute} from 'angular2/angular2';
import {SelectionList} from 'nv/components/dropdown/SelectionList';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';
import {LastNavAction} from 'nv/core';
import {TypeSearch} from 'nv/decorators';
import {SelectionOption, BlankOption} from 'nv/components/selectone/SelectionOption';


@Component({ 
    selector: 'nv-dropdown',
    events: ['change'],
    appInjector: [KeyboardUtils],
    properties: ['options']
})
@View({
    template: ` <div class="ngv-input select-one dropdown clearfix" [class.active]="active">

                    <div #input class="input"
                        tabindex="0"
                        nv-type-search
                        (search)="onSearch($event)"
                        (click)="onButtonToggle()"
                        (blur)="onFocusLost()"
                        (keydown)="onKeyDown($event)">
                        
                        <span (click)="onButtonToggle()">{{selected.description}}</span>

                        <div class="widget-button dropdown-button"
                            (click)="onButtonToggle()">
                        </div>
                        
                    </div>

                    <ngv-selection-list [hidden]="!showSelectionList"
                         [options]="options"
                         (change)="onSelectionChanged($event, input)"
                        [height]="22 * numVisibleOptions + 'px'"
                        [width]="dropdownWidth"
                        [last-nav-action]="navigationAction" >
                    </ngv-selection-list>

                </div>`,
    directives: [SelectionList, TypeSearch]
})
export class Dropdown<T extends SelectionOption> {
    keyUtils: KeyboardUtils;
    change: EventEmitter = new EventEmitter();

    options: Array<T>;
    numVisibleOptions: number;
    dropdownWidth: string;

    active: boolean = false;
    showSelectionList: boolean = false;
    selected: SelectionOption = new BlankOption();

    navigationAction: LastNavAction;
    cancelFocusLost: boolean = false;

    constructor(private keyUtils: KeyboardUtils, @Attribute("num-visible-options") numVisibleOptions, @Attribute("dropdown-width") dropdownWidth) {
        this.numVisibleOptions = numVisibleOptions;
        this.dropdownWidth = dropdownWidth;
    }

    onButtonToggle() {
        this.showSelectionList = !this.showSelectionList;
        if (!this.active) {
            this.active = true;
        }
    }

    onSelectionChanged(option: SelectionOption, input) {
        if (!option.disabled) {
            this.selected = option;
            this.showSelectionList = false;
            this.change.next(option);
        }
        else {
            this.cancelFocusLost = true;
        }
        input.focus();
    }

    onFocusLost() {
        setTimeout(() => {
            if (!this.cancelFocusLost) {
                this.showSelectionList = false;
            }
            this.cancelFocusLost = false;
        },200);
    }

    onKeyDown(event) {
        var key = event.keyCode;
        if (this.keyUtils.isEsc(key)) {
            this.showSelectionList = false;
        }
        else if (this.keyUtils.isTab(key)) {
            this.onTab();
        }
        else if (this.keyUtils.isArrowKey(key)) {
            if (this.keyUtils.isArrowDown(key)) {
                this.onArrowDown();
            }
            this.navigationAction = new LastNavAction(key);
        }
        else if (this.keyUtils.isEnter(key)) {
            //TODO call selectCurrent or getHighlighted
        }
    }

    onArrowDown() {
        if (!this.showSelectionList) {
            this.showSelectionList = true;
        }
    }

    onTab() {
        if (this.showSelectionList) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            this.active = false;
        }
    }

    onSearch(search) {
        console.log('searching for ' + search);
        var regex = new RegExp('^' + search);
        var match = _.find(this.options, (option:T) => {
            return option.description === null ? false : option.description.toUpperCase().match(regex) && !option.disabled;
        });

        if (match) {
            if (this.showSelectionList) {
                //TODO call @highlight(match)
            }
            else {
                this.selected = match; //TODO remove this
                //TODO call @select(match)
            }
        }

    }

}
