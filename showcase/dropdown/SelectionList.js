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
export class SelectionList {

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