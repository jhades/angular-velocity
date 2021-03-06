import {Component, View, EventEmitter, Attribute} from 'angular2/core';
import {SelectOneValueAccessor} from 'nv/components/selectone/SelectOneValueAccessor';
import {NavigationAction,NavActionEnum,TypeSearch,SelectionList, SelectionOption, BlankOption, SelectionGroup, KeyCodes} from 'angular-velocity';

/**
 *
 * @ngdoc Component
 *
 * @description
 * Base class with common functionality for all single-selection controls.
 *
 *
 */
export class SelectOne<T extends SelectionOption> {
    selection: EventEmitter = new EventEmitter();

    options: T[];
    optionGroups: SelectionGroup<T>[];
    dropdownHeight: number;
    dropdownWidth: string;

    active: boolean = false;
    showSelectionList: boolean = false;
    selected: SelectionOption = new BlankOption();
    highlighted: SelectionOption;

    navigationAction: NavigationAction;
    cancelFocusLost: boolean = false;
    valueAccessor: SelectOneValueAccessor;

    constructor(dropdownHeight, dropdownWidth, valueAccessor: SelectOneValueAccessor) {
        this.dropdownHeight = dropdownHeight || '250px';
        this.dropdownWidth = dropdownWidth || '200px';
        this.valueAccessor = valueAccessor;
    }

    /**
     * open/close the selection list when dropdown button is clicked. set focus if first clicked
     *
     */
    onButtonToggle(input) {
        this.showSelectionList = !this.showSelectionList;
        if (!this.active) {
            this.activate();
        }
    }

    /**
     * track which element is highlighted, so if for example the user presses Enter we know which item was selected
     *
     */
    onHighlightedChanged(option) {
        this.highlighted = option;
    }

    /**
     *
     * if the option clicked is enabled, select it and close the dropdown.
     * Otherwise cancel the loss of focus to keep the dropdown opened, and set the focus back to the input.
     * This way we can continue to keep track of the user's keyboard input.
     *
     */
    onSelectionChanged(option: SelectionOption, input) {
        console.log('onSelectionChanged');
        if (option && !option.disabled) {
            this.selected = option;
            this.showSelectionList = false;
            this.selection.next(option);
            if (this.valueAccessor) {
                this.valueAccessor.onChange(option);
            }
        }
        this.cancelFocusLost = true;
        input.focus();
    }

    /**
     *
     * display the focus border if the user tabs into or clicks the field
     *
     */
    onFocus() {
        this.activate();
    }

    /**
     * if the focus is lost from the input component, wait a small amount of time to see if the focus is really lost,
     * as there are occasions where we would want to cancel the focus loss.
     *
     */
    onFocusLost() {
        setTimeout(() => {
            if (!this.cancelFocusLost) {
                this.showSelectionList = false;
                this.active = false;
            }
            this.cancelFocusLost = false;
        },200);
    }

    /**
     *
     * change the status to active, and report the control as touched in case Angular 2 Forms is being used.
     *
     */
    activate() {
        this.active = true;
        if (this.valueAccessor) {
            this.valueAccessor.onTouched();
        }
    }

    /**
     *
     * track the up and down arrow for keyboard navigation, selection via enter, etc.
     *
     */
    onKeyDown(event, input) {
        let key = event.keyCode;

        switch (key) {
            case KeyCodes.ESC:
                this.showSelectionList = false;
                break;
            case KeyCodes.TAB:
                this.onTab();
                break;
            case KeyCodes.DOWN:
                this.onArrowDown();
                event.preventDefault();
                event.stopPropagation();
                break;
            case KeyCodes.UP:
                this.onArrowUp();
                event.preventDefault();
                event.stopPropagation();
                break;
            case KeyCodes.ENTER:
                this.onSelectionChanged(this.highlighted, input);
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }

    /**
     * show the selection list if hidden; the scrolling behaviour itself is implemented inside the selection list component.
     *
     */
    onArrowDown() {
        if (!this.showSelectionList) {
            this.showSelectionList = true;
        }
        else {
            this.navigationAction = new NavigationAction(NavActionEnum.DOWN);
        }
    }

    /**
     * navigate up the list only if its visible, otherwise stay at the currently selected option.
     *
     */
    onArrowUp() {
        if (this.showSelectionList) {
            this.navigationAction = new NavigationAction(NavActionEnum.UP);
        }
    }

    /**
     * if the selection list is visible, block the tab, just like the native select element.
     * Otherwise remove focus from the dropdown.
     *
     */
    onTab() {
        if (this.showSelectionList) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            this.active = false;
        }
    }

    findClosestMatch(search: string) {
        let regex = new RegExp('^' + search);
        return this.findAllOptions().find((option:T) => {
            return option.description === null ? false : option.description.toUpperCase().match(regex) && !option.disabled;
        });
    }

    /**
     *
     * returns all the options, independently if they are grouped or not - useful to apply an operation to all options without checking if the dropdown is in group mode
     *
     */
    findAllOptions(): T[] {
        if (this.options) {
            return this.options;
        }
        else if (this.optionGroups) {
            return SelectionGroup.findAllOptions(this.optionGroups);

        }
        else {
            throw new Error("A nv-dropdown must either have an [options] or an [option-groups] property defined.");
        }
    }

}
