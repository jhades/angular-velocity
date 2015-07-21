
import {Pipe, PipeFactory, NullPipeFactory} from 'angular2/angular2';
import {SelectionOption} from 'angular-velocity';

export class FilterOptionsPipe implements Pipe {

    transform(options:Array<SelectionOption>, args: Array<any>):Array<SelectionOption> {
        if (!options || args.length === 0 || !args[0]) {
            return options;
        }
        else {
            let search: string = args[0];

            return options.filter((option: SelectionOption) => {
                return option && option.description && option.description.toUpperCase().includes(search.toUpperCase());
            });
        }
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

