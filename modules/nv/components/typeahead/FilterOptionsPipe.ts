
import {Pipe} from 'angular2/metadata';
import {PipeTransform} from 'angular2/change_detection';
import {SelectionOption} from 'angular-velocity';
import {Injectable} from 'angular2/di';

@Injectable()
@Pipe({name: 'filterOptions'})
export class FilterOptionsPipe implements PipeTransform {

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



