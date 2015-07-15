/// <reference path="../../../../typings/angular2/angular2.d.ts" />

import {Component, View, EventEmitter, Attribute} from 'angular2/angular2';
import {LastNavAction,TypeSearch,SelectionList, SelectionOption, BlankOption, KeyboardUtils, SelectionGroup} from 'angular-velocity';


/**
 *
 * @ngdoc Component
 *
 * @description
 * A dropdown component, similar to a native browser <select> element
 *
 * Visually it consists of an input box, a dropdown button and and option selection list. Features:
 *
 *  - fully stylable (dropdown width, height ,etc.)
 *  - scrolling using mouse or keyboard
 *  - scrolling via keyboard takes over scrolling via mouse seamlessly and vice-versa
 *  - support for disabled elements
 *  - support for option groups
 *  - if the user starts typing, the closest matching element is highlighted if the dropdown is opened (@see TypeSearch)
 *  - if the dropdown is closed and the user starts typing, the closest match is automatically selected
 *  - wraps long text options in multiple lines
 *  - displays "..." if text too long
 *  - the dropdown is always correctly positioned, even if the user resizes the browser window
 *    or if the dropdown is used inside scrolling dialogs
 *  - the scrolling of the selection list does not cause the whole page to scroll or "bump"
 *
 * When the user chooses an option, a change event is triggered.
 *
 */

@Component({ 
    selector: 'nv-dropdown',
    events: ['change'],
    viewInjector: [KeyboardUtils],
    properties: ['options', 'optionGroups']
})
@View({
    template: ` <div class="ngv-input select-one dropdown clearfix" [class.active]="active">

                    <div #input class="input"
                        tabindex="0"
                        nv-type-search
                        (search)="onTypeSearch($event)"
                        (click)="onButtonToggle()"
                        (blur)="onFocusLost()"
                        (keydown)="onKeyDown($event, input)">
                        
                        <span (click)="onButtonToggle()">{{selected.description}}</span>

                        <div class="widget-button dropdown-button"
                            (click)="onButtonToggle()">
                        </div>
                        
                    </div>

                    <ngv-selection-list
                        [hidden]="!showSelectionList"
                        [height]="22 * numVisibleOptions + 'px'"
                        [width]="dropdownWidth"
                        [options]="options"
                        [option-groups]="optionGroups"
                        (change)="onSelectionChanged($event, input)"
                        [last-nav-action]="navigationAction"
                        [highlighted-option]="highlighted" (highlight)="onHighlightedChanged($event)">
                    </ngv-selection-list>

                </div>`,
    directives: [SelectionList, TypeSearch]
})
export class Dropdown<T extends SelectionOption> {
    change: EventEmitter = new EventEmitter();

    options: Array<T>;
    optionGroups: Array<SelectionGroup<T>>;
    numVisibleOptions: number;
    dropdownWidth: string;

    active: boolean = false;
    showSelectionList: boolean = false;
    selected: SelectionOption = new BlankOption();
    highlighted: SelectionOption;

    navigationAction: LastNavAction;
    cancelFocusLost: boolean = false;

    constructor(private keyUtils: KeyboardUtils, @Attribute("num-visible-options") numVisibleOptions, @Attribute("dropdown-width") dropdownWidth) {
        this.numVisibleOptions = numVisibleOptions;
        this.dropdownWidth = dropdownWidth;
    }

    /**
     * open/close the selection list when dropdown button is clicked. set focus if first clicked.
     *
     */
    protected onButtonToggle() {
        this.showSelectionList = !this.showSelectionList;
        if (!this.active) {
            this.active = true;
        }
    }

    /**
     * track which element is highlighted, so if the user presses Enter we know which item was selected
     *
     */
    protected onHighlightedChanged(option) {
        this.highlighted = option;
    }

    /**
     *
     * if the option clicked is enabled, select it and close the dropdown.
     * Otherwise cancel the loss of focus to keep the dropdown opened, and set the focus back to the input,
     * this way we can keep track of the user keyboard input.
     *
     */
    protected onSelectionChanged(option: SelectionOption, input) {
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
    protected onFocusLost() {
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
    protected onKeyDown(event, input) {
        var key = event.keyCode;
        if (this.keyUtils.isEsc(key)) {
            this.showSelectionList = false;
        }
        else if (this.keyUtils.isTab(key)) {
            this.onTab();
        }
        else if (this.keyUtils.isArrowKey(key)) {
            if (this.keyUtils.isArrowDown(key)) {
                this.onArrowDown();
            }
            this.navigationAction = new LastNavAction(key);
        }
        else if (this.keyUtils.isEnter(key)) {
            this.onSelectionChanged(this.highlighted, input);
        }
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * show the selection list if hidden; the scrolling behaviour itself is implemented inside the selection list component.
     *
     */
    protected onArrowDown() {
        if (!this.showSelectionList) {
            this.showSelectionList = true;
        }
    }

    /**
     * if the selection list is visible, block the tab, just like the native select element.
     * Otherwise remove focus from the dropdown.
     *
     */
    protected onTab() {
        if (this.showSelectionList) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            this.active = false;
        }
    }

    /**
     * search for closest match for the current ongoing type search, and highlight the element. The element will be scrolled into view if needed.
     * If the dropdown is closed then the element is imediatelly selected.
     *
     * @param search - the current type search
     */
    protected onTypeSearch(search) {
        var regex = new RegExp('^' + search);
        var match = this.findAllOptions().find((option:T) => {
            return option.description === null ? false : option.description.toUpperCase().match(regex) && !option.disabled;
        });

        if (match) {
            this.highlighted = match;
            if (!this.showSelectionList) {
                this.selected = match;
            }
        }
    }

    protected findAllOptions(): Array<T> {
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
