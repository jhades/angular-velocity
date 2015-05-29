import {Selectable} from 'nv/core/Selecteable';

export interface SelectionOption extends Selectable {
    description: string;
}


export class BlankOption implements SelectionOption {
    description:string;
    selected:boolean;
    constructor() {
        this.description = "";
        this.selected = false;
    }
}