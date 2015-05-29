/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, NgFor, Parent, onChange, EventEmitter, ElementRef} from 'angular2/angular2';
import {KeyboardUtils} from 'nv/utils/KeyboardUtils';
import {SelectionOption, BlankOption} from 'nv/components/selectone/SelectionOption';
import {Scrollable, ScrollableElement} from 'nv/decorators/scrollable';

@Component({
    selector: 'ngv-selection-list',
    properties: {
        'options': 'options',
        'height': 'height',
        'width': 'width',
        'navigationKey': 'navigationKey',
        'hidden': 'hidden'
    },
    events: ['change'],
    lifecycle: [onChange]
})
@View({
    template: `
                <div class="selection-list" [style.max-height]="height" [style.width]="width"
                    nv-scrollable="selected" [navigationKey]="navigationKey" >
                    <div *ng-for="#option of options;" class="selection-option" [class.selected]="option.selected">
                        <div nv-scrollable-element class="selection-description"
                            (click)="onOptionClicked(option)"
                            (mouseover)="selectOption(option)"
                            (mouseleave)="unselectOption(option)">
                                {{option.description}}
                        </div>
                    </div>
                </div>`,
    directives: [NgFor, Scrollable, ScrollableElement]
})
export class SelectionList<T extends SelectionOption> {

    options: List<T>;
    change: EventEmitter = new EventEmitter();
    hidden: boolean = true;

    navigationKey: number;
    selectedIndex: number = null;
    keyUtils: KeyboardUtils;
    el: ElementRef;


    constructor(keyUtils: KeyboardUtils, el: ElementRef) {
        this.keyUtils = keyUtils;
        this.el = el;
    }

    onChange(changes) {
        if (changes['navigationKey'] && this.navigationKey) {
            var key = this.navigationKey;
            if (this.keyUtils.isArrowDown(key)) {
                if (changes['hidden'] && !this.hidden) {
                    this.resetSelectionList();
                }
                this.onArrowDown();
            }
            else if (this.keyUtils.isArrowUp(key)) {
                this.selectPrevious();
            }
        }
    }

    resetSelectionList() {
        this.getSelectionList().scrollTop = 0;
        this.selectedIndex = null;
    }

    getSelectionList() {
        return this.el.domElement.querySelector('.selection-list');
    }

    onArrowDown() {
        if (this.selectedIndex == null) {
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