import {Directive, EventEmitter} from 'angular2/angular2';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';

/**
 * @ngdoc Decorator
 *
 * @description
 * When the user starts typing on a element, this decorator keeps track of the ongoing search, firing
 * a search event with the current search.
 *
 * If the user stops typing for more the 0.5 second the search is resetted.
 *
 * This woks for any element where the user can set the focus.
 *
 */
@Directive({
    selector: '[nv-type-search]',
    hostListeners: {
        'keydown': 'onKeyDown($event)'
    },
    events: ['search'],
    hostInjector: [KeyboardUtils]

})
export class TypeSearch {
    keyUtils: KeyboardUtils;
    resetSearchHandle: number;
    search: EventEmitter = new EventEmitter();
    searchText: string = "";

    constructor(keyUtils: KeyboardUtils) {
        this.keyUtils = keyUtils;

    }

    onKeyDown(evt) {
        var key = evt.keyCode;
        if (this.keyUtils.isAlphaNumeric(key)) {
            if (this.resetSearchHandle) {
                clearTimeout(this.resetSearchHandle);
            }
            var keyTyped = String.fromCharCode(key);
            this.searchText += keyTyped;

            this.search.next(this.searchText);

            this.resetSearchHandle = setTimeout(() => {
                this.searchText = "";
                this.resetSearchHandle = null;
            },500);
        }
    }


}