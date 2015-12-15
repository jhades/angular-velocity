
import {Pipe,PipeTransform,Injectable} from 'angular2/core';
import {SelectionOption} from 'angular-velocity';

@Injectable()
@Pipe({name: 'filterOptions'})
export class FilterOptionsPipe implements PipeTransform {

    transform(options:SelectionOption[], args: any[]):SelectionOption[] {
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



