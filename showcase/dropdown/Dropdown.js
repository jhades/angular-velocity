import {Component,Template, View, For, If} from 'angular2/angular2';


@Component({
    selector: 'ngv-selection-list',
    properties: {
        options: 'options',
        height: 'height',
        width: 'width'
    }
})
@View({
    template: `
                <div class="selection-list" [style.max-height]="height" [style.width]="width">
                    <div *for="#option of options;" class="selection-option" #opt>
                        <div class="selection-description"
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
    }

    onOptionHover(option) {
        option.classList.add(this.SELECTED_OPTION_CLASS);
    }

    onOptionLeave(option) {
        option.classList.remove(this.SELECTED_OPTION_CLASS);
    }

}

@Component({
    selector: 'ngv-dropdown',
    properties: {
       options: 'options',
       height: 'height',
       width: 'width'
    }
})
@View({
    template: ` <div class="ngv-input select-one clearfix">
                    <input type="text" (click)="onInputClicked(button)" (blur)="onInputBlur(button)">
                    <div class="widget-button dropdown-button" #button></div>
                    <ngv-selection-list *if="showSelectionList" [options]="options" [height]="height" [width]="width"></ngv-selection-list>

                </div>`,
    directives: [SelectionList, If]
})
export class Dropdown {

    constructor() {
        this.ACTIVE_BUTTON_CLASS = 'active';
        this.showSelectionList = false;
    }

    onInputClicked(button) {
        this.showSelectionList = true;
        button.classList.add(this.ACTIVE_BUTTON_CLASS);
    }

    onInputBlur(button) {
        this.showSelectionList = false;
        button.classList.remove(this.ACTIVE_BUTTON_CLASS);
    }

}


