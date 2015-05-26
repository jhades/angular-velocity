/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, NgIf, EventEmitter} from 'angular2/angular2';
import {SelectionList} from 'nv/components/dropdown/SelectionList';
import {KeyboardUtils} from 'nv/utils/KeyboardUtils';


@Component({
    selector: 'nv-dropdown',
    appInjector: [KeyboardUtils],
    events: ['change']
})
@View({
    template: `<div>Hello</div>`,
    directives: [SelectionList, NgIf]
})
export class Dropdown {
    active: boolean;
    showSelectionList: boolean;
    change: EventEmitter;
    search: string;
    keyUtils: KeyboardUtils;
    selectionList: SelectionList;
    resetSearchHandle: number;

    constructor(keyUtils: KeyboardUtils) {
        this.active = false;
        this.showSelectionList = false;
        this.change = new EventEmitter();
        this.search = "";
    }
}

// TODO the issue is when injection KeyboardUtls


/*
@Component({ 
    selector: 'nv-dropdown',
    events: ['change'],
    appInjector: [KeyboardUtils],
    properties: {
       options: 'options',
       numVisibleOptions: 'numVisibleOptions',
       width: 'width'
    }
})
@View({
    template: ` <div class="ngv-input select-one dropdown clearfix" [class.active]="active" #dropdown>

                    <div tabindex="0" class="input"
                        (click)="onButtonToggle(dropdown)"
                        (blur)="onFocusLost()"
                        (keydown)="onKeyDown($event, button)" #input>
                        
                        <span #current (click)="onButtonToggle(dropdown)"></span>
                        
                        <div class="widget-button dropdown-button"
                            (click)="onButtonToggle(dropdown)" #button>
                        </div>
                        
                    </div>

                    <ngv-selection-list *ng-if="showSelectionList"
                        [options]="options"
                         (change)="onSelectionChanged($event, dropdown, current, input)"
                        [height]="22 * numVisibleOptions + 'px'"
                        [owner]="getSelectionListOwner()"
                        [width]="width">
                    </ngv-selection-list>

                </div>`,
    directives: [SelectionList, NgIf]
})
export class Dropdown {
    active: boolean;
    showSelectionList: boolean;
    change: EventEmitter;
    search: string;
    keyUtils: KeyboardUtils;
    selectionList: SelectionList;
    resetSearchHandle: number;

    constructor(keyUtils: KeyboardUtils) {
        this.active = false;
        this.showSelectionList = false;
        this.change = new EventEmitter();
        this.search = "";
        this.keyUtils = keyUtils;
    }

    onButtonToggle(dropdown) {
        console.log('onButtonToggle');
        this.showSelectionList = !this.showSelectionList;
        if (!this.active) {
            this.active = true;
        }
    }

    onSelectionChanged(option, dropdown, current, input) {
        console.log('onSelectionChanged');
        current.textContent = option.description;
        this.showSelectionList = false;
        this.change.next(option);
        input.focus();
    }

    getSelectionListOwner() {
        return this;
    }

    onFocusLost() {
        setTimeout(() => {
            console.log('debounced focus lost ...');
            this.showSelectionList = false;
        },200);
    }

    onKeyDown(event, button) {
        var key = event.keyCode;
        if (this.keyUtils.isEsc(key)) {
            this.showSelectionList = false;
        }
        else if (this.keyUtils.isTab(key)) {
            this.onTab();
        }
        else if (this.keyUtils.isArrowDown(key)) {
            this.onArrowDown();
        }
        else if (this.keyUtils.isArrowUp(key)) {
            this.selectionList.selectPrevious();
        }
        else {
            this.handleTypeFilter(key);
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

    onArrowDown() {
        if (!this.showSelectionList) {
            this.showSelectionList = true;
            this.selectionList.selectFirstElement();
        }
        else {
            this.selectionList.selectNext();
        }
    }

    handleTypeFilter(key) {
        if (this.resetSearchHandle) {
            clearTimeout(this.resetSearchHandle);
        }
        var keyTyped = String.fromCharCode(key);
        this.search += keyTyped;
        console.log('searching for ' + this.search);

        this.resetSearchHandle = setTimeout(() => {
            this.search = "";
            this.resetSearchHandle = null;
        },500);
    }

}


*/