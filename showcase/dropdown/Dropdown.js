import {Component,Template, View, For, If} from 'angular2/angular2';
import { EventEmitter } from 'angular2/angular2';

@Component({
    selector: 'ngv-selection-list',
    properties: {
        options: 'options',
        height: 'height',
        width: 'width'
    },
    events: ['change']
})
@View({
    template: `
                <div class="selection-list" [style.max-height]="height" [style.width]="width">
                    <div *for="#option of options;" class="selection-option"  #opt>
                        <div class="selection-description"
                            (click)="onOptionClicked(option)"
                            (mouseover)="onOptionHover(opt)"
                            (mouseleave)="onOptionLeave(opt)">
                                {{option.description}}
                        </div>
                    </div>
                </div>`,
    directives: [For]
})
class SelectionList {

    constructor() {
        this.SELECTED_OPTION_CLASS = "selected";
        this.change = new EventEmitter();
    }

    onOptionHover(option) {
        option.classList.add(this.SELECTED_OPTION_CLASS);
    }

    onOptionLeave(option) {
        option.classList.remove(this.SELECTED_OPTION_CLASS);
    }

    onOptionClicked(option) {
        this.change.next(option);
    }
}

@Component({
    selector: 'ngv-dropdown',
    events: ['change'],
    properties: {
       options: 'options',
       height: 'height',
       width: 'width'
    }
})
@View({
    template: ` <div class="ngv-input select-one dropdown clearfix" #dropdown>

                    <input type="text"
                        (click)="onInputClicked(input, button, dropdown)" #input>

                    <div tabindex="0" class="widget-button dropdown-button"
                        (click)="onButtonToggle(dropdown)"
                        (keyup)="onKeyUp($event, button)"
                         (blur)="onFocusLost(dropdown, button, input)" #button>
                    </div>

                    <ngv-selection-list *if="showSelectionList"
                        [options]="options"
                         (change)="onSelectionChanged($event, dropdown, input, button)"
                        [height]="height"
                        [width]="width">
                    </ngv-selection-list>

                </div>`,
    directives: [SelectionList, If]
})
export class Dropdown {

    constructor() {
        this.ACTIVE_CLASS = 'active';
        this.active = false;
        this.showSelectionList = false;
        this.change = new EventEmitter();
    }

    onButtonToggle(dropdown) {
        console.log('onButtonToggle');
        this.showSelectionList = !this.showSelectionList;
        if (!this.active) {
            this.active = true;
        }
        this.updateActiveState(dropdown);
    }

    onInputClicked(input, button, dropdown) {
        console.log('onInputClicked');
        input.blur();
        button.click();
    }

    onSelectionChanged(option, dropdown, input, button) {
        console.log('onSelectionChanged');
        input.value = option.description;
        this.showSelectionList = false;
        this.updateActiveState(dropdown);
        this.change.next(option);
    }

    // TODO
    onFocusLost(dropdown, button, input) {
        //console.log('onFocusLost');
        if (document.activeElement !== input) {
            setTimeout(() => {
                //this.active = false;
                //this.showSelectionList = false;
                //this.updateActiveState(dropdown);
            },200);
        }
    }

    onKeyUp(event, button) {
        if (event.keyCode === 27) {
            this.showSelectionList = false;
        }
        console.log(event.keyCode);
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


