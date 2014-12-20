///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Components that are common to all menu navigation systems: top menu, left menu, etc.
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////

angular.module('ngvNavigationCommons', [])
    .constant('AppConfig', {
        getMenuConfig: function () {
            return AngularVelocity.getMenuConfig();
        },
        getPageLength: function () {
            return AngularVelocity.getPageContentConfig().length;
        }
    })
    .directive('ngvTopMenu', function () {
        return {
            replace: true,
            scope: true,
            templateUrl: '/ngv/partials/top-menu.html',
            controller: function ($scope, AppConfig) {

                var menu = AppConfig.getMenuConfig();

                $scope.topMenuEntries = menu.getTopMenuEntries();
            }
        }
    })
    .directive('ngvBreadcrumb', function () {
        return {
            replace: true,
            templateUrl: '/ngv/partials/breadcrumb.html'
        }
    });