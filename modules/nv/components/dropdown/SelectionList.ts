/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, NgFor, Parent, onChange, EventEmitter} from 'angular2/angular2';
import {KeyboardUtils} from 'nv/utils/KeyboardUtils';
import {SelectionOption, BlankOption} from 'nv/components/selectone/SelectionOption';

@Component({
    selector: 'ngv-selection-list',
    properties: {
        'options': 'options',
        'height': 'height',
        'width': 'width',
        'navigationKey': 'navigationKey',
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
export class SelectionList<T extends SelectionOption> {

    change: EventEmitter = new EventEmitter();
    selectedIndex: number = null;
    options: List<T>;
    navigationKey: number;
    keyUtils: KeyboardUtils;

    constructor(keyUtils: KeyboardUtils) {
        this.keyUtils = keyUtils;
    }

    onChange(changes) {
        if (changes['navigationKey'] && this.navigationKey) {
            var key = this.navigationKey;
            if (this.keyUtils.isArrowDown(key)) {
                this.onArrowDown();
            }
            else if (this.keyUtils.isArrowUp(key)) {
                this.selectPrevious();
            }
        }

    }

    onArrowDown() {
        if (!this.selectedIndex) {
            this.selectIndex(0);
        }
        else {
            this.selectNext();
        }
    }

    selectOption(option) {
        this.options.forEach((option: T) => option.selected = false);
        option.selected = true;
    }

    unselectOption(option) {
        option.selected = false;
    }

    onOptionClicked(option) {
        this.change.next(option);
    }


    selectIndex(index) {
        this.options.forEach((option: T) => option.selected = false);
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
        this.options.forEach((option: T) => option.selected = false);
        this.options[next].selected = true;
    }
}