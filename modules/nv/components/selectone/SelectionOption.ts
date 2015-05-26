

export interface SelectionOption {
    description: string;
    selected: boolean;
}


export class BlankOption implements SelectionOption {
    description:string;
    selected:boolean;
    constructor() {
        this.description = "";
        this.selected = false;
    }
}