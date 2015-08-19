/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {SelectOne} from 'nv/components/selectone/SelectOne';
import {SelectionOption} from 'angular-velocity';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';

export class SelectOneWithInput<T extends SelectionOption> extends SelectOne<T> {

    constructor(private keyUtils: KeyboardUtils, dropdownHeight, dropdownWidth) {
        super(dropdownHeight, dropdownWidth);
    }

    onInputFocus($event, input) {
        input.select();
        this.active = true;
    }

    onInputClicked($event, input) {
        this.onInputFocus($event, input);
        $event.preventDefault();
    }

    onSelectionChanged(option: T, input) {
        super.onSelectionChanged(option, input);
        input.value = option.description;
        input.select();
    }

    onKeyDown(event, input) {
        super.onKeyDown(event, input);
        var key = event.keyCode;
        if (this.keyUtils.isSpecialKey(key) && !this.showSelectionList) {
            this.showSelectionList = true;
        }
    }

}