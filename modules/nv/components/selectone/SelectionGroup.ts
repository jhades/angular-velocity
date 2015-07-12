
import {SelectionOption} from 'angular-velocity';

export class SelectionGroup<T extends SelectionOption> {
    constructor(public label: string, public options: Array<T>) {

    }

}