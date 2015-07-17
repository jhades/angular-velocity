/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, EventEmitter, Attribute} from 'angular2/angular2';
import {NavigationAction,NavActionEnum,TypeSearch,SelectionList, SelectionOption, BlankOption, SelectionGroup, KeyCodes} from 'angular-velocity';


export class SelectOne<T extends SelectionOption> {
    change: EventEmitter = new EventEmitter();

    options: Array<T>;
    optionGroups: Array<SelectionGroup<T>>;
    dropdownHeight: number;
    dropdownWidth: string;

    active: boolean = false;
    showSelectionList: boolean = false;
    selected: SelectionOption = new BlankOption();
    highlighted: SelectionOption;

    navigationAction: NavigationAction;
    cancelFocusLost: boolean = false;

    constructor(dropdownHeight, dropdownWidth) {
        this.dropdownHeight = dropdownHeight;
        this.dropdownWidth = dropdownWidth;
    }

    /**
     * open/close the selection list when dropdown button is clicked. set focus if first clicked.
     *
     */
    onButtonToggle() {
        this.showSelectionList = !this.showSelectionList;
        if (!this.active) {
            this.active = true;
        }
    }

    /**
     * track which element is highlighted, so if the user presses Enter we know which item was selected
     *
     */
    onHighlightedChanged(option) {
        this.highlighted = option;
    }

    /**
     *
     * if the option clicked is enabled, select it and close the dropdown.
     * Otherwise cancel the loss of focus to keep the dropdown opened, and set the focus back to the input,
     * this way we can keep track of the user keyboard input.
     *
     */
    onSelectionChanged(option: SelectionOption, input) {
        if (option && !option.disabled) {
            this.selected = option;
            this.showSelectionList = false;
            this.change.next(option);
        }
        else {
            this.cancelFocusLost = true;
        }
        input.focus();
    }

    /**
     * if the focus is lost from the input 'field' (its a div), wait a small amount of time to see if the focus is really lost.
     * For example in the case of clicks on disabled elements, we want to put the focus back on the input.
     *
     */
    onFocusLost() {
        setTimeout(() => {
            if (!this.cancelFocusLost) {
                this.showSelectionList = false;
            }
            this.cancelFocusLost = false;
        },200);
    }

    /**
     *
     * track the up and down arrow for keyboard navigation, selection via enter, etc.
     * we cancel the keyboard event preventing it's propagation: otherwise the whole page would scroll up and down!!
     *
     */
    onKeyDown(event, input) {
        var key = event.keyCode;

        switch (key) {
            case KeyCodes.ESC:
                this.showSelectionList = false;
                break;
            case KeyCodes.TAB:
                this.onTab();
                break;
            case KeyCodes.DOWN:
                this.onArrowDown();
                break;
            case KeyCodes.UP:
                this.onArrowUp();
                break;
            case KeyCodes.ENTER:
                this.onSelectionChanged(this.highlighted, input);
                break;
        }

        event.preventDefault();
        event.stopPropagation();
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

}
