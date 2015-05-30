import {Highlightable} from 'nv/core/Highlightable';

export interface SelectionOption extends Highlightable {
    description: string;
}


export class BlankOption implements SelectionOption {
    description:string;
    highlighted:boolean;
    constructor() {
        this.description = "";
        this.highlighted = false;
    }
}