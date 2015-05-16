import {Injectable} from "angular2/di";

@Injectable
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

}
