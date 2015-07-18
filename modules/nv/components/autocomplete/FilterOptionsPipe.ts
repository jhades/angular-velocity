
import {Pipe, PipeFactory, NullPipeFactory} from 'angular2/angular2';
import {SelectionOption} from 'angular-velocity';

export class FilterOptionsPipe implements Pipe {

    transform(value:SelectionOption, args:List<any>):any {
        console.log('filtering ' + args);
        return value;
    }

    supports(option:any):boolean {
        return true;
    }

    onDestroy():void {
    }

}

export class FilterOptionsPipeFactory implements PipeFactory {
    supports(txt): boolean {
        return true;
    }
    create(cdRef): Pipe {
        return new FilterOptionsPipe();
    }
}

export const filterOptions = [ new FilterOptionsPipeFactory(), new NullPipeFactory() ];


