import {Component,Template, View, bootstrap} from 'angular2/angular2';

@Component({
    selector: 'ngv-dropdown'
})
@View({
    template: ` <div class="ngv-input select-one clearfix">
                    <input type="text">
                    <div class="widget-button dropdown-button active"></div>

                    <div class="selection-list" style="max-height:100px;width:280px">

                        <div class="selection-option">
                            <div class="selection-description">Option 1</div>
                        </div>
                        <div class="selection-option selected">
                            <div class="selection-description">Option 2</div>
                        </div>
                        <div class="selection-option">
                            <div class="selection-description">Option 3</div>
                        </div>
                    </div>
                </div>`
})
export class Dropdown {


}


bootstrap(Dropdown);