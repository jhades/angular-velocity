/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap, NgFor, NgModel} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, ROUTER_BINDINGS} from 'angular2/router';

import {FORM_BINDINGS} from 'angular2/forms';
import {Main} from './screens/main/Main';
import {DataTableExample} from './screens/datatable/DataTableExample';
import {ReferenceData, ReferenceDataService} from './common/referenceData';
import {NV_LAYOUT_DIRECTIVES} from 'angular-velocity';

@Component({
    selector: 'app',
    viewBindings: [ReferenceDataService]
})
@RouteConfig([
    { path: '/', component: Main, as: 'home' },
    { path: '/data-table-example', component: DataTableExample, as: 'data-table-example' }

])
@View({
    templateUrl: 'showcase/demo-app.html',
    directives: [RouterOutlet, RouterLink, NV_LAYOUT_DIRECTIVES]
})
class DemoApp {}


bootstrap(DemoApp, [ReferenceDataService, ROUTER_BINDINGS, FORM_BINDINGS]);
