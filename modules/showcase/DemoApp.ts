/// <reference path="../../node_modules/angular2/bundles/typings/angular2/angular2.d.ts" />
/// <reference path="../../node_modules/angular2/bundles/typings/es6-shim/es6-shim.d.ts" />
/// <reference path="../../node_modules/angular2/bundles/typings/angular2/http.d.ts" />
/// <reference path="../../node_modules/angular2/bundles/typings/angular2/router.d.ts" />
/// <reference path="../../typings/rx/rx-lite.d.ts" />

import {Component, View, bootstrap, NgFor, NgModel,FORM_BINDINGS, bind} from 'angular2/core';
import {RouteConfig, RouterOutlet, RouterLink, ROUTER_BINDINGS, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {Main} from './screens/main/Main';
import {DataTableExample} from './screens/datatable/DataTableExample';
import {ReferenceData, ReferenceDataService} from './common/referenceData';
import {NV_LAYOUT_DIRECTIVES} from 'angular-velocity';

@Component({
    selector: 'app',
    viewBindings: [ReferenceDataService]
})
@RouteConfig([
    { path: '/', component: Main, as: 'Home' },
    { path: '/data-table-example', component: DataTableExample, as: 'DataTableExample' }

])
@View({
    templateUrl: 'showcase/demo-app.html',
    directives: [RouterOutlet, RouterLink, NV_LAYOUT_DIRECTIVES]
})
class DemoApp {


}

bootstrap(
    DemoApp,
    [
        ReferenceDataService,
        ROUTER_BINDINGS,
        FORM_BINDINGS,
        bind(ROUTER_PRIMARY_COMPONENT).toValue(DemoApp)
    ]);
