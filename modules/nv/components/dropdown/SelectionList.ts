/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, NgFor, Parent, onChange, EventEmitter, Attribute} from 'angular2/angular2';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';
import {LastNavAction} from 'nv/core/LastNavAction';
import {SelectionOption, BlankOption} from 'nv/components/selectone/SelectionOption';
import {Scrollable, ScrollableElement} from 'nv/decorators';

@Component({
    selector: 'ngv-selection-list',
    properties: ['options', 'height', 'width', 'lastNavAction', 'hidden'],
    events: ['change'],
    lifecycle: [onChange]
})
@View({
    template: `
                <div nv-scrollable [last-nav-action]="lastNavAction"
                    class="selection-list" [style.max-height]="height" [style.width]="width" >

                    <div *ng-for="#option of options;" class="selection-option" [class.highlighted]="option.highlighted" [class.disabled]="option.disabled">

                        <div nv-scrollable-element (highlight)="onHighlightChanged($event, option)" [skip-element]="option.disabled"
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

    constructor(private keyUtils: KeyboardUtils) {

    }

    onChange(changes) {
        if (changes['hidden'] && this.hidden) {
            //TODO call action to reset list refactor last-nav-action to use an actual action?
        }
    }

    onHighlightChanged(highlighted: boolean, option: T) {
        option.highlighted = highlighted;
    }

    onOptionClicked(option: SelectionOption) {
        this.change.next(option);
    }

}