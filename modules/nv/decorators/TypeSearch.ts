import {Directive, EventEmitter} from 'angular2/angular2';
import {KeyboardUtils} from 'nv/services/KeyboardUtils';


@Directive({
    selector: '[nv-type-search]',
    hostListeners: {
        'keydown': 'onKeyDown($event)'
    },
    events: ['search'],
    appInjector: [KeyboardUtils]

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