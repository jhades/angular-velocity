import {ComponentAnnotation as Component, ViewAnnotation as View, For, If} from 'angular2/angular2';
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

                    <div tabindex="0" class="input"
                        (click)="onButtonToggle(dropdown)"
                        (blur)="onFocusLost(dropdown, button, input)"
                        (keyup)="onKeyUp($event, button)" #input>
                        <div class="widget-button dropdown-button"
                            (click)="onButtonToggle(dropdown)" #button>
                        </div>
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

    onSelectionChanged(option, dropdown, input, button) {
        console.log('onSelectionChanged');
        input.textContent = option.description;
        this.showSelectionList = false;
        this.updateActiveState(dropdown);
        this.change.next(option);
    }

    onFocusLost(dropdown, button, input) {
/*        var currentValue = input.textContent;
        setTimeout(() => {
            var maybeNewValue = input.textContent;
            if (maybeNewValue === currentValue) {
                this.active = false;
                this.showSelectionList = false;
                this.updateActiveState(dropdown);
            }
        });*/
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


