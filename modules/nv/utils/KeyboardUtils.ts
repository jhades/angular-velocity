/// <reference path="../../../typings/angular2/angular2.d.ts" />

import {Injectable} from "angular2/di";

@Injectable()
export class KeyboardUtils {

    isNumericKey(keyCode) {
        return (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
    }

    isBackSpace(keyCode) {
        return keyCode == 8;
    }

    isArrowKey(keyCode) {
        return keyCode >= 37 && keyCode <= 40;
    }

    isArrowUp(keyCode) {
        return keyCode == 38;
    }

    isArrowDown(keyCode) {
        return keyCode == 40;
    }

    isArrowLeft(keyCode) {
        return keyCode == 37;
    }

    isArrowRight(keyCode) {
        return keyCode == 39;
    }

    isEnter(keyCode) {
        return keyCode == 13;
    }

    isTab(keyCode) {
        return keyCode == 9;
    }

    isEsc(keyCode) {
        return keyCode == 27;
    }

    isShift(keyCode) {
        return keyCode == 16;
    }

    isAlt(keyCode) {
        return keyCode == 18;
    }

    isCtrl(keyCode) {
        return keyCode == 17;
    }

    isMeta(keyCode) {
        return this.isAlt(keyCode) || this.isCtrl(keyCode) || keyCode == 91;
    }

}




