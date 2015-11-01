import {SelectOne} from 'nv/components/selectone/SelectOne';
import {SelectOneValueAccessor} from 'nv/components/selectone/SelectOneValueAccessor';
import {SelectionOption} from 'angular-velocity';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';

export class SelectOneWithInput<T extends SelectionOption> extends SelectOne<T> {

    constructor(private keyUtils: KeyboardUtils, dropdownHeight, dropdownWidth, valueAccessor: SelectOneValueAccessor) {
        super(dropdownHeight, dropdownWidth, valueAccessor);
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
        let key = event.keyCode;
        if (this.keyUtils.isSpecialKey(key) && !this.showSelectionList) {
            this.showSelectionList = true;
        }
    }

}