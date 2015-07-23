/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap, NgFor, NgModel} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {formInjectables} from 'angular2/forms';
import {Main} from './screens/main/Main';
import {ReferenceData, ReferenceDataService} from 'showcase/common/referenceData';


@Component({
    selector: 'app',
    viewInjector: [ReferenceDataService]
})
@RouteConfig([
    { path: '/', component: Main, as: 'home' }
])
@View({
    templateUrl: 'demo-app.html',
    directives: [RouterOutlet, RouterLink]
})
class DemoApp {}


bootstrap(DemoApp, [formInjectables, routerInjectables, ReferenceDataService]);
