
import {SelectionOption} from 'angular-velocity';

export class SelectionGroup<T extends SelectionOption> {

    constructor(public label: string, public options: Array<T> = []) {

    }

    static findAllOptions(optionGroups: Array<SelectionGroup<T>>) {
        if (!optionGroups) {
            throw new Error("optionsGroups must be defined");
        }
        return optionGroups
            .map((optionGroup) => optionGroup.options)
            .reduce((all, optionGroup) => all.concat(optionGroup), []);
    }

}