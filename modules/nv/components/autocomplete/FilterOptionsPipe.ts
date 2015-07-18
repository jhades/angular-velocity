
import {BasePipe} from 'angular2/angular2';
import {SelectionOption} from 'angular-velocity';

export class FilterOptionsPipe extends BasePipe {

    transform(value:SelectionOption, args:List<any>):any {
        console.log('filtering ' + value.description);
        return value;
    }

    supports(option:any):boolean {
        return true;
    }

    onDestroy():void {
    }


}