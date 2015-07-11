import {Highlightable} from 'angular-velocity';

export interface SelectionOption extends Highlightable {
    description: string;
    disabled: boolean;
}


export class BlankOption implements SelectionOption {
    description:string = "";
    highlighted:boolean = false;
    disabled: boolean = false;
}