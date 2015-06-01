/// <reference path="../../../../typings/angular2/angular2.d.ts" />
/// <reference path="../../../../typings/lodash/lodash.d.ts" />

import {Component, View, EventEmitter} from 'angular2/angular2';
import {SelectionList} from 'nv/components/dropdown/SelectionList';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';
import {LastNavAction} from 'nv/core/LastNavAction';
import {SelectionOption, BlankOption} from 'nv/components/selectone/SelectionOption';

@Component({ 
    selector: 'nv-dropdown',
    events: ['change'],
    appInjector: [KeyboardUtils],
    properties: {
       'options': 'options',
       'numVisibleOptions': 'numVisibleOptions',
       'width': 'width'
    }
})
@View({
    template: ` <div class="ngv-input select-one dropdown clearfix" [class.active]="active">

                    <div class="input" tabindex="0"
                        (click)="onButtonToggle()"
                        (blur)="onFocusLost()"
                        (keydown)="onSearch($event, button)" #input>
                        
                        <span (click)="onButtonToggle()">{{selected.description}}</span>

                        <div class="widget-button dropdown-button"
                            (click)="onButtonToggle()">
                        </div>
                        
                    </div>

                    <ngv-selection-list [hidden]="!showSelectionList"
                         [options]="options"
                         (change)="onSelectionChanged($event, input)"
                        [height]="22 * numVisibleOptions + 'px'"
                        [width]="width"
                        [last-nav-action]="navigationAction" >
                    </ngv-selection-list>

                </div>`,
    directives: [SelectionList]
})
export class Dropdown<T extends SelectionOption> {
    options: Array<T>;
    active: boolean = false;
    showSelectionList: boolean = false;
    selected: SelectionOption = new BlankOption();
    change: EventEmitter = new EventEmitter();
    search: string = "";
    keyUtils: KeyboardUtils;
    resetSearchHandle: number;
    navigationAction: LastNavAction;

    constructor(keyUtils: KeyboardUtils) {
        this.keyUtils = keyUtils;
    }

    onButtonToggle() {
        this.showSelectionList = !this.showSelectionList;
        if (!this.active) {
            this.active = true;
        }
    }

    onSelectionChanged(option, input) {
        this.selected = option;
        this.showSelectionList = false;
        this.change.next(option);
        input.focus();
    }

    onFocusLost() {
        setTimeout(() => {
            this.showSelectionList = false;
        },200);
    }

    onSearch(event) {
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
        else {
            this.handleTypeFilter(key);
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

    handleTypeFilter(key) {
        if (this.resetSearchHandle) {
            clearTimeout(this.resetSearchHandle);
        }
        var keyTyped = String.fromCharCode(key);
        this.search += keyTyped;
        console.log('searching for ' + this.search);

        var regex = new RegExp('^' + this.search);
        var match = _.find(this.options, (option:T) => option.description === null ? false : option.description.toUpperCase().match(regex));
        
        if (match) {
            this.displayMatchingSearch(match);
        } 

        this.resetSearchHandle = setTimeout(() => {
            this.search = "";
            this.resetSearchHandle = null;
        },500);
    }

    displayMatchingSearch(match) {
        if (this.showSelectionList) {
            //TODO call @highlight(match)
        }
        else {
            this.selected = match; //TODO remove this
            //TODO call @select(latch)
        }        
    }

}
