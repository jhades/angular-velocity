import {Component, View, bind} from 'angular2/core';
import {NgFor, NgModel,FORM_BINDINGS} from 'angular2/common';
import {bootstrap} from 'angular2/platform/browser';
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
