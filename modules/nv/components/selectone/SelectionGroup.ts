
import {SelectionOption} from 'angular-velocity';

export class SelectionGroup<T extends SelectionOption> {

    constructor(public label: string, public options: T[] = []) {

    }

    static findAllOptions(optionGroups: SelectionGroup<T>[]) {
        if (!optionGroups) {
            throw new Error("optionsGroups must be defined");
        }
        return optionGroups
            .map((optionGroup) => optionGroup.options)
            .reduce((all, optionGroup) => all.concat(optionGroup), []);
    }

}