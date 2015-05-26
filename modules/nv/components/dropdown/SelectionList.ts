/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, NgFor, Parent, onChange, EventEmitter} from 'angular2/angular2';


@Component({
    selector: 'ngv-selection-list',
    properties: {
        options: 'options',
        height: 'height',
        width: 'width',
        owner: 'owner'
    },
    events: ['change'],
    lifecycle: [onChange]
})
@View({
    template: `
                <div class="selection-list" [style.max-height]="height" [style.width]="width">
                    <div *ng-for="#option of options;" class="selection-option" [class.selected]="option.selected">
                        <div class="selection-description"
                            (click)="onOptionClicked(option)"
                            (mouseover)="selectOption(option)"
                            (mouseleave)="unselectOption(option)">
                                {{option.description}}
                        </div>
                    </div>
                </div>`,
    directives: [NgFor]
})
export class SelectionList {
    change: EventEmitter;
    selectedIndex: number;
    options: List<any>;

    constructor() {
        this.change = new EventEmitter();
        this.selectedIndex = 0;
    }

    // finishes object initialization
    onChange() {
        this.selectIndex(0);
    }


    selectOption(option) {
        this.options.forEach((option) => option.selected = false);
        option.selected = true;
    }

    unselectOption(option) {
        option.selected = false;
    }

    onOptionClicked(option) {
        this.change.next(option);
    }

    selectFirstElement() {
        this.selectIndex(0);
    }

    selectIndex(index) {
        this.options.forEach((option) => option.selected = false);
        this.selectedIndex = index;
        this.options[index].selected = true;
    }

    selectNext() {
        if (this.options.length >= this.selectedIndex + 1) {
            this.selectedIndex += 1;
            this.changeSelectedItem(this.selectedIndex);
        }
    }

    selectPrevious() {
        if (this.selectedIndex > 0) {
            this.selectedIndex -= 1;
            this.changeSelectedItem(this.selectedIndex);
        }
    }

    changeSelectedItem(next) {
        this.options.forEach((option) => option.selected = false);
        this.options[next].selected = true;
    }
}