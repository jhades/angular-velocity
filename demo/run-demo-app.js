///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Defines the javascript files that need to be loaded and their dependencies.
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////

require.config({
    paths: {
        // Angular Velocity dependencies
        angular: '/ngv/bower_components/angular/angular',
        angularRoute: '/ngv/bower_components/angular-route/angular-route',
        angularAnimate: '/ngv/bower_components/angular-animate/angular-animate',
        angularMessages: '/ngv/bower_components/angular-messages/angular-messages',
        angularCookies: '/ngv/bower_components/angular-cookies/angular-cookies',
        lodash: "/ngv/bower_components/lodash/dist/lodash",
        ngvCommons: "/ngv/services/ngvCommons",
        ngvMenuModel: "/ngv/model/menuModel",
        ngvStartApp: "/ngv/directives/startApp",
        ngvCollapsible: "/ngv/directives/collapsible",
        ngvDraggable: "/ngv/directives/draggable",
        ngvUtilityDialogs: "/ngv/directives/utilityDialogs",
        ngvNavigationCommons: "/ngv/directives/navigationCommons",
        ngvLeftMenuNavigation: "/ngv/directives/leftMenuNavigation",
        ngvSelectOne: "/ngv/directives/selectOne",
        ngvCalendar: "/ngv/directives/calendar",
        ngvForms: "/ngv/directives/forms",
        ngvPanels: "/ngv/directives/panels",
        angularVelocity: '/ngv/angular-velocity',
        // demo application dependencies
        referenceData: "/demo/scripts/referenceData",
        partials: '/dist/partials'
    },
    shim: {
        referenceData: {
            deps: []
        },
        angular: {
            exports: "angular"
        },
        angularRoute: {
            deps: ['angular']
        },
        angularAnimate: {
            deps: ['angular']
        },
        angularCookies: {
            deps: ['angular']
        },
        angularMessages: {
            deps: ['angular']
        },
        partials: {
            deps: ['angular']
        },
        ngvCommons: {
            deps: ['angular', 'lodash']
        },
        ngvCollapsible: {
            deps: ['angular', 'partials']
        },
        ngvDraggable: {
            deps: ['angular' , 'partials']
        },
        ngvStartApp: {
            deps: ['angular' , 'partials']
        },
        ngvUtilityDialogs: {
            deps: ['angular' , 'partials']
        },
        ngvNavigationCommons: {
            deps: ['angular' , 'partials']
        },
        ngvMenuModel: {
            deps: ['lodash' , 'partials']
        },
        ngvLeftMenuNavigation: {
            deps: ['angular', 'partials']
        },      
        ngvSelectOne: {
            deps: ['angular', 'ngvCommons', 'partials']
        },
        ngvCalendar: {
            deps: ['angular', 'ngvCommons', 'partials']
        },
        ngvForms: {
            deps: ['angular', 'angularMessages', 'ngvCommons', 'ngvPanels', 'ngvSelectOne', 'ngvCalendar', 'partials']
        },
        ngvPanels: {
            deps: ['angular', 'ngvCommons', 'partials']
        },
        angularVelocity: {
            deps: [ 'lodash', 'angular', 'angularRoute', 'angularAnimate', 'angularCookies',
                'ngvStartApp', 'ngvCollapsible', 'ngvDraggable', 'ngvUtilityDialogs',
                'ngvNavigationCommons', 'ngvMenuModel', 'ngvLeftMenuNavigation', 'ngvForms' ]
        }
    }
});

require(['angularVelocity', 'referenceData'], function () {

    AngularVelocity.app()
        .controller('SimpleFormCtrl', function ($scope, $http, $q) {
            $scope.page.title = $scope.lbl['input.widgets.page.title'];

            $scope.user = {};

            $scope.findAllCountryRefData = function () {
                return countries;
            }

            $scope.validateSimpleForm = function () {

                var deferred = $q.defer();

                $http.get('/demo/mocks/test-validate-simple-form.json', $scope.user)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function () {
                        deferred.reject('Failed validating form.');
                    });

                return deferred.promise;
            }
        })
        .controller('CollapsibleCtrl', function ($scope) {
            $scope.page.title = $scope.lbl['panels.collapsible'];
        })
        .controller('DropdownCtrl', function ($scope) {
            $scope.page.title = $scope.lbl['dropdown.samples'];
        })
        .controller('LeftMenuCtrl', function ($scope) {
            $scope.page.title = $scope.lbl['left.menu.page.title'];
        });

    AngularVelocity.start();

});