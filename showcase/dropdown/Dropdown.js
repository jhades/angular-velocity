import {ComponentAnnotation as Component, ViewAnnotation as View, For, If} from 'angular2/angular2';
import { EventEmitter } from 'angular2/angular2';
import {SelectionList} from 'dropdown/SelectionList';
import {Injectable} from "angular2/di";

@Injectable
class KeyboardUtils {

    isNumericKey(keyCode) {
    return (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
    }

    isBackSpace(keyCode) {
    return keyCode == 8;
    }

    isArrowKey(keyCode) {
        return keyCode >= 37 && keyCode <= 40;
    }

}



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

    constructor(keyUtils: KeyboardUtils) {
        this.ACTIVE_CLASS = 'active';
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
        var keyCode = event.keyCode;
        if (keyCode === 27) {
            this.showSelectionList = false;
        }
        else if (this.keyUtils.isArrowKey(keyCode)) {
            console.log('Key code ...');
        }
        else {
            var key = String.fromCharCode(keyCode);
            this.search += key;
            console.log(this.search);
        }
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


