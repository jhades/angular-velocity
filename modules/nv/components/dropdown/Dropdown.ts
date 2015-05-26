/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, NgIf, EventEmitter} from 'angular2/angular2';
import {SelectionList} from 'nv/components/dropdown/SelectionList';
import {KeyboardUtils} from 'nv/utils/KeyboardUtils';
import {SelectionOption, BlankOption} from 'nv/components/selectone/SelectionOption';

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
    template: ` <div class="ngv-input select-one dropdown clearfix" [class.active]="active">

                    <div tabindex="0" class="input"
                        (click)="onButtonToggle()"
                        (blur)="onFocusLost()"
                        (keydown)="onKeyDown($event, button)" #input>
                        
                        <span (click)="onButtonToggle()">{{selected.description}}</span>
                        
                        <div class="widget-button dropdown-button"
                            (click)="onButtonToggle()" #button>
                        </div>
                        
                    </div>

                    <ngv-selection-list *ng-if="showSelectionList"
                        [options]="options"
                         (change)="onSelectionChanged($event, input)"
                        [height]="22 * numVisibleOptions + 'px'"
                        [width]="width">
                    </ngv-selection-list>

                </div>`,
    directives: [SelectionList, NgIf]
})
export class Dropdown<T extends SelectionOption> {
    active: boolean;
    showSelectionList: boolean;
    change: EventEmitter;
    search: string;
    keyUtils: KeyboardUtils;
    selectionList: SelectionList;
    resetSearchHandle: number;
    selected: BlankOption;

    constructor(keyUtils: KeyboardUtils) {
        this.active = false;
        this.showSelectionList = false;
        this.change = new EventEmitter();
        this.search = "";
        this.keyUtils = keyUtils;
        this.selected = new BlankOption();
    }

    onButtonToggle() {
        console.log('onButtonToggle');
        this.showSelectionList = !this.showSelectionList;
        if (!this.active) {
            this.active = true;
        }
    }

    onSelectionChanged(option, input) {
        console.log('onSelectionChanged');
        this.selected = option;
        this.showSelectionList = false;
        this.change.next(option);
        input.focus();
    }

    onFocusLost() {
        setTimeout(() => {
            console.log('debounced focus lost ...');
            this.showSelectionList = false;
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
