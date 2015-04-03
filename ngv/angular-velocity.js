///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// The Angular Velocity application module - initializes the application.
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////

var angular = require('angular');
require('angular-route');
require('angular-animate');
require('angular-messages');
var _ = require('lodash');

var model = require('./model/menuModel');

require('./directives/startApp');
require('./directives/leftMenuNavigation');
require('./directives/forms');
require('../dist/templateCachePartials');

//  'ngvLeftMenuNavigation', 'ngvForms', 'ngvPartials'

var menuConfig, pageConfig;

//private function that creates a div containing the bootstrap invisible application (loads config from backend)
function createBootstrapDiv() {

    var body = document.getElementsByTagName('body')[0];

    var bootstrapDiv = document.createElement('div');
    bootstrapDiv['ngv-start-app'] = '';

    body.appendChild(bootstrapDiv);

    return bootstrapDiv;
}

// private function that initializes the Angular Velocity App with the JSON config received from the backend.
function initConfig(cfg) {

    pageConfig = cfg.pageContent;
    var topMenuEntries = [];

    // build the menu model based on the JSON config
    _.each(cfg.menu.entries, function (topJsonEntry) {

        var topMenuEntry = new model.SelectableMenuEntry(topJsonEntry.text, topJsonEntry.href, []);

        _.each(topJsonEntry.entries, function (leftSection) {
            var section = new model.CollapsibleMenuEntry(leftSection.text, []);

            _.each(leftSection.entries, function (leafEntry) {
                section.addSubEntry(new model.SelectableMenuEntry(leafEntry.text, leafEntry.href, [],
                    leafEntry.templateUrl, leafEntry.controller));
            });

            topMenuEntry.addSubEntry(section);
        });

        topMenuEntries.push(topMenuEntry);
    });

    menuConfig = new model.Menu(topMenuEntries, cfg.menu.defaultHref, cfg.menu.length, cfg.menu.resizable);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// private variable containing the main Angular Velocity app, initializes the router.

var angularVelocityApp = angular.module('ngvApp', ['ngvStartApp', 'ngRoute', 'ngAnimate', 'ngMessages',
     'ngvLeftMenuNavigation', 'ngvForms', 'ngvPartials'])
    .config(function ($routeProvider) {

        var routes = menuConfig.findRoutableMenuEntries();

        _.each(routes, function (routeConfig) {
            $routeProvider.when(routeConfig.href, routeConfig);
        });

        $routeProvider.otherwise({redirectTo: menuConfig.defaultHref});

    })
    .run(function ($rootScope, lbl) {
        $rootScope.lbl = lbl;

        // highlight the menu's selected entry
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            menuConfig.selectMenuWithHref(current.$$route.href);
        });

    });


AngularVelocity  =  {

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Start the application - launch the bootstrap application, retrieve the config from the backend
    // and initialize the main application.
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    start: function () {

        var bootstrapDiv = createBootstrapDiv(),
            configHRef = document.getElementById('ngvApp').getAttribute("config-href");

        // run the bootstrap app
        angular.bootstrap(bootstrapDiv, ['ngvStartApp']);

        var bootstrapInjector = angular.element(bootstrapDiv).injector(),
            configLoader = bootstrapInjector.get('ConfigLoader');

        // use the bootstrap app to load the config and start the Angular Velocity app
        configLoader.loadConfig(configHRef).then(function (cfg) {

            initConfig(cfg);

            // run the main app
            angular.bootstrap(document.getElementById('ngvApp'), ['ngvApp']);
        });
    },

    app: function () {
        return angularVelocityApp;
    },

    getMenuConfig: function () {
        return menuConfig;
    },

    getPageContentConfig: function () {
        return pageConfig;
    }
};

module.exports = AngularVelocity;