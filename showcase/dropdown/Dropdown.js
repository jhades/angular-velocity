import {ComponentAnnotation as Component, ViewAnnotation as View, For, If} from 'angular2/angular2';
import { EventEmitter } from 'angular2/angular2';
import {SelectionList} from 'dropdown/SelectionList';
import {KeyboardUtils} from 'common/KeyboardUtils';
import {QueryAnnotation as Query, QueryList} from 'angular2/angular2';

@Component({ 
    selector: 'ngv-dropdown',
    events: ['change'],
    injectables: [KeyboardUtils],
    properties: { 
       options: 'options',
       height: 'height',
       width: 'width'
    }
})
@View({
    template: ` <div class="ngv-input select-one dropdown clearfix" #dropdown>

                    <div tabindex="0" class="input"
                        (click)="onButtonToggle(dropdown)"
                        (blur)="onFocusLost(dropdown, button, input)"
                        (keyup)="onKeyUp($event, button)" #input>
                        
                        <span #current (click)="onButtonToggle(dropdown)"></span>
                        
                        <div class="widget-button dropdown-button"
                            (click)="onButtonToggle(dropdown)" #button>
                        </div>
                        
                    </div>

                    <ngv-selection-list *if="showSelectionList"
                        [options]="options"
                         (change)="onSelectionChanged($event, dropdown, current, input)"
                        [height]="height"
                        [width]="width">
                    </ngv-selection-list>

                </div>`,
    directives: [SelectionList, If]
})
export class Dropdown {

    constructor(keyUtils: KeyboardUtils, @Query(SelectionList) selectionList:SelectionList ) {
        this.ACTIVE_CLASS = 'active';
        this.active = false;
        this.showSelectionList = false;
        this.change = new EventEmitter();
        this.search = "";
        this.keyUtils = keyUtils;
        this.selectionList = selectionList;
    }

    onButtonToggle(dropdown) {
        console.log('onButtonToggle');
        this.showSelectionList = !this.showSelectionList;
        if (!this.active) {
            this.active = true;
        }
        this.updateActiveState(dropdown);
    }

    onSelectionChanged(option, dropdown, current, input) {
        console.log('onSelectionChanged');
        current.textContent = option.description;
        this.showSelectionList = false;
        this.updateActiveState(dropdown);
        this.change.next(option);
        input.focus();
    }

    onFocusLost(dropdown, button, input) {
        setTimeout(() => {
            console.log('debounced focus lost ...');
            this.showSelectionList = false;
        },200);
    }

    onKeyUp(event, button) {
        var key = event.keyCode;
        if (this.keyUtils.isEsc(key)) {
            this.showSelectionList = false;
        }
        else if (this.keyUtils.isArrowKey(key)) {
            if (this.keyUtils.isArrowDown(key)) {
                if (!this.showSelectionList) {
                    this.showSelectionList = true;
                    this.selectionList.selectFirstElement();
                }
            }
        }
        else {
            this.handleTypeFilter(key);
        }
    }

    handleTypeFilter(key) {
        if (this.resetSearchHandle) {
            clearTimeout(this.resetSearchHandle);
        }
        var keyTyped = String.fromCharCode(key);
        this.search += keyTyped;
        console.log(this.search);

        this.resetSearchHandle = setTimeout(() => {
            this.search = "";
            this.resetSearchHandle = null;
        },500);
    }

    updateActiveState(dropdown) {
        if (!this.active) {
            dropdown.classList.remove(this.ACTIVE_CLASS);
        }
        else {
            dropdown.classList.add(this.ACTIVE_CLASS);
        }
    }

}


