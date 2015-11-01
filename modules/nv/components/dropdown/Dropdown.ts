import {Component, View, EventEmitter, Attribute, Self, Optional} from 'angular2/angular2';
import {SelectOne} from 'nv/components/selectone/SelectOne';
import {SelectOneValueAccessor} from 'nv/components/selectone/SelectOneValueAccessor';
import {NavigationAction,NavActionEnum, SelectionOption, BlankOption, SelectionGroup, KeyCodes} from 'angular-velocity';
import {TypeSearch} from 'nv/decorators/typesearch/TypeSearch';
import {SelectionList} from 'nv/components/selectionlist/SelectionList';

/**
 *
 * @ngdoc Component
 *
 * @description
 * A dropdown component with behaviour similar to a native browser <select> element, but with several commonly needed enhancements:
 *
 *  - integrated with ng-model (but does not require it)
 *  - integrated with Angular 2 Forms - can have standard and custom validators plugged, etc.
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
    outputs: ['selection'],
    inputs: ['options', 'optionGroups', 'dropdownHeight', 'dropdownWidth','ngFormControl']
})
@View({
    template: ` <div class="select-one dropdown clearfix" [class.active]="active">

                    <div #input class="input"
                        tabindex="0"
                        (focus)="onFocus()"
                        nv-type-search
                        (search)="onTypeSearch($event)"
                        (click)="onButtonToggle()"
                        (blur)="onFocusLost()"
                        (keydown)="onKeyDown($event, input)">
                        
                        <span (click)="onButtonToggle()">{{selected.description}}</span>

                        <div class="widget-button dropdown-button"
                            (click)="onButtonToggle(input)">
                        </div>

                    </div>

                    <nv-selection-list
                        [class.hidden]="!showSelectionList"
                        [height]="dropdownHeight"
                        [width]="dropdownWidth"
                        [options]="options"
                        [option-groups]="optionGroups"
                        (selection)="onSelectionChanged($event, input)"
                        [navigation-action]="navigationAction"
                        [highlighted-option]="highlighted" (highlight)="onHighlightedChanged($event)">
                    </nv-selection-list>

                </div>`,
    directives: [SelectionList, TypeSearch]
})
export class Dropdown<T extends SelectionOption> extends SelectOne<T> {

    constructor(@Attribute("dropdown-height") dropdownHeight, @Attribute("dropdown-width") dropdownWidth,
        @Optional() @Self() valueAccessor: SelectOneValueAccessor) {
        super(dropdownHeight, dropdownWidth, valueAccessor);
    }

    /**
     * search for closest match for the current ongoing type search, and highlight the element. The element will be scrolled into view if needed.
     * If the dropdown is closed then the element is immediately selected.
     *
     * @param search - the current search the user is typing
     */
    onTypeSearch(search) {
        var match = this.findClosestMatch(search);
        if (match) {
            this.highlighted = match;
            if (!this.showSelectionList) {
                this.selected = match;
            }
        }
    }

}
