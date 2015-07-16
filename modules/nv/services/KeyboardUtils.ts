/// <reference path="../../../typings/angular2/angular2.d.ts" />

import {KeyCodes} from 'angular-velocity';
import {Injectable} from "angular2/di";

@Injectable()
export class KeyboardUtils {

    isAlpha(keyCode) {
        return keyCode >= 65 && keyCode <= 90;
    }

    isNumericKey(keyCode) {
        return (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
    }

    isAlphaNumeric(keyCode) {
        return this.isAlpha(keyCode) || this.isNumericKey(keyCode);
    }

    isMeta(keyCode) {
        return keyCode == KeyCodes.ALT || KeyCodes.CTRL || keyCode == 91;
    }

}




