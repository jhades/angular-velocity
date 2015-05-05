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
    template: ` <div class="ngv-input select-one clearfix" #dropdown>
                    <input type="text" (click)="onInputClicked(input, button, dropdown)" #input>
                    <div tabindex="0" class="widget-button dropdown-button" (click)="onButtonToggle(dropdown)" #button></div>
                    <ngv-selection-list *if="active"
                        [options]="options"
                         (change)="onSelectionChanged($event, dropdown, input)"
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
        this.change = new EventEmitter();
    }

    onButtonToggle(dropdown) {
        this.active = !this.active;
        this.updateActiveState(dropdown);
    }

    onInputClicked(input, button, dropdown) {
        this.active = true;
        input.blur();
        button.focus();
        this.updateActiveState(dropdown);
    }

    onSelectionChanged(option, dropdown, input) {
        this.change.next(option);
        input.value = option.description;
        this.active = false;
        this.updateActiveState(dropdown);
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


