/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, NgFor, Parent, onChange, EventEmitter} from 'angular2/angular2';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';
import {LastNavAction} from 'nv/core/LastNavAction';
import {SelectionOption, BlankOption} from 'nv/components/selectone/SelectionOption';
import {Scrollable, ScrollableElement} from 'nv/decorators';

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
                <div nv-scrollable [last-nav-action]="lastNavAction"
                    class="selection-list" [style.max-height]="height" [style.width]="width" >

                    <div *ng-for="#option of options;" class="selection-option" [class.highlighted]="option.highlighted">

                        <div nv-scrollable-element [highlightable]="option"
                            class="selection-description"
                            (click)="onOptionClicked(option)">
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
    lastNavAction: LastNavAction;
    keyUtils: KeyboardUtils;

    constructor(keyUtils: KeyboardUtils) {
        this.keyUtils = keyUtils;
    }

    onChange(changes) {
        if (changes['hidden'] && this.hidden) {
            //TODO call action to reset list refactor last-nav-action to use an actual action?
        }
    }

    onOptionClicked(option: SelectionOption) {
        this.change.next(option);
    }

}