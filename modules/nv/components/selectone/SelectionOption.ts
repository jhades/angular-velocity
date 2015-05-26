

export interface SelectionOption {
    description: string;
}


export class BlankOption implements SelectionOption {
    description:string;
    constructor() {
        this.description = "";
    }
}