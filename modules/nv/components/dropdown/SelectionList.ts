/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, NgFor, Parent, onChange, EventEmitter} from 'angular2/angular2';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';
import {LastNavAction} from 'nv/core/LastNavAction';
import {SelectionOption, BlankOption} from 'nv/components/selectone/SelectionOption';
import {CursorScrollable, ScrollableElement} from 'nv/decorators';

@Component({
    selector: 'ngv-selection-list',
    properties: {
        'options': 'options',
        'height': 'height',
        'width': 'width',
        'lastNavAction': 'lastNavAction',
        'hidden': 'hidden'
    },
    events: ['change'],
    lifecycle: [onChange]
})
@View({
    template: `
                <div nv-cursor-scrollable class="selection-list" [style.max-height]="height" [style.width]="width" [last-nav-action]="lastNavAction" >
                    <div *ng-for="#option of options;" class="selection-option" [class.highlighted]="option.highlighted">
                        <div nv-cursor-scrollable-element [selectable]="option"
                            class="selection-description"
                            (click)="onOptionClicked(option)"
                            (mouseover)="onMouseOverOption(option)"
                            (mouseleave)="onMouseLeaveOption(option)">
                                {{option.description}}
                        </div>
                    </div>
                </div>`,
    directives: [NgFor, CursorScrollable, ScrollableElement]
})
export class SelectionList<T extends SelectionOption> {

    options: List<T>;
    change: EventEmitter = new EventEmitter();
    hidden: boolean = true;
    lastNavAction: LastNavAction;
    keyUtils: KeyboardUtils;

    constructor(keyUtils: KeyboardUtils) {
        this.keyUtils = keyUtils;
    }

    onChange(changes) {
        if (changes['hidden'] && this.hidden) {
            //TODO call action to reset list
        }
    }

    onMouseOverOption(option: SelectionOption) {
        this.options.forEach((option: T) => option.highlighted = false);
        option.highlighted = true;
    }

    onMouseLeaveOption(option: SelectionOption) {
        option.highlighted = false;
    }

    onOptionClicked(option: SelectionOption) {
        this.change.next(option);
    }

}