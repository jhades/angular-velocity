/// <reference path="../../../typings/angular2/angular2.d.ts" />

import {KeyCodes} from 'angular-velocity';
import {Injectable} from "angular2/di";

@Injectable()
export class KeyboardUtils {

    isAlpha(keyCode): boolean {
        return keyCode >= 65 && keyCode <= 90;
    }

    isNumericKey(keyCode): boolean {
        return (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
    }

    isAlphaNumeric(keyCode): boolean {
        return this.isAlpha(keyCode) || this.isNumericKey(keyCode);
    }

    isMeta(keyCode): boolean {
        return keyCode == KeyCodes.ALT || keyCode == KeyCodes.CTRL || keyCode == 91;
    }

    isSpecialKey(keyCode) : boolean {
        return !this.isMeta(keyCode) && keyCode !== KeyCodes.ESC &&
                keyCode !== KeyCodes.ENTER && keyCode !== KeyCodes.LEFT && keyCode !== KeyCodes.RIGHT &&
                keyCode !== KeyCodes.TAB && keyCode != KeyCodes.SHIFT;
    }

}




