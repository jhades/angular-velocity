import {ComponentAnnotation as Component, ViewAnnotation as View, For, If} from 'angular2/angular2';
import {ParentAnnotation as Parent} from 'angular2/annotations';
import { EventEmitter } from 'angular2/angular2';


@Component({
    selector: 'ngv-selection-list',
    properties: {
        options: 'options',
        height: 'height',
        width: 'width',
        owner: 'owner'
    },
    events: ['change']
})
@View({
    template: `
                <div class="selection-list" [style.max-height]="height" [style.width]="width">
                    <div *for="#option of options;" class="selection-option" [class.selected]="option.selected" #opt>
                        <div class="selection-description"
                            (click)="onOptionClicked(option)"
                            (mouseover)="selectOption(option)"
                            (mouseleave)="unselectOption(option)">
                                {{option.description}}
                        </div>
                    </div>
                </div>`,
    directives: [For]
})
export class SelectionList {

    constructor() {
        this.change = new EventEmitter();
        setTimeout(() => {
            this.owner.selectionList = this;
        });
    }

    selectOption(option) {
        option.selected = true;
    }

    unselectOption(option) {
        option.selected = false;
    }

    onOptionClicked(option) {
        this.change.next(option);
    }

    selectFirstElement() {
        console.log('selecting first element ...');
        this.options[0].selected = true;
    }
}