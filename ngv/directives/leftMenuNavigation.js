///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Defines the components for the Left Menu navigation system.
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////


angular.module('ngvLeftMenuNavigation', ['ngvUtilityDialogs', 'ngvDraggable',
    'ngvCollapsible', 'ngvNavigationCommons'])

    .value('lbl', {
        //TODO
        "please.wait.dialog": "Please wait ...",
        "page.header": "Angular Velocity Showcase",
        "input.widgets.page.title": "Input Widgets Overview",
        "dropdown.samples": "Dropdown Samples",
        "panels.collapsible": "Collapsible Panels",
        "left.menu.page.title": "Left Menu Layout",
        "please.select.country": "Please select country",
        "please.select.city": "Please select city"
    })
    .value('page', {
        title: ""
    })

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// The left menu component

    .directive('ngvLeftMenu', function () {
        return {
            scope: true,
            replace: true,
            templateUrl: '/ngv/partials/left-menu.html',
            controller: function ($scope, $location, AppConfig) {

                $scope.menu = AppConfig.getMenuConfig();

                $scope.leftMenuSections = $scope.menu.getLeftMenuSections();

                $scope.$watch('menu', function (newMenu) {
                    $scope.leftMenuSections = newMenu.getLeftMenuSections();
                }, true);

                $scope.onEntryClicked = function (section, entry, index) {
                    $scope.menu.clearLeftMenuSelection();
                    $location.path(entry.href);
                };
            }
        }
    })
    .directive('ngvLeftMenuLayout', function () {
        return {
            scope: true,
            templateUrl: '/ngv/partials/left-layout.html',
            link: function (scope, element, attrs) {
                scope.configHref = attrs.configHref;
                scope.logoHref = attrs.logoHref;
                scope.footerHref = attrs.footerHref;
            },
            controller: function ($scope, $rootScope, $timeout, AppConfig) {

                $scope.menu = AppConfig.getMenuConfig();

                $scope.page = {
                    menuLength: $scope.menu.menuLength,
                    pageLength: 24 - $scope.menu.menuLength
                };

                var leftMenuOffset = 0, pageContentMaxX = 0;

                $scope.setSliderPosition = function (currentX) {

                    if (leftMenuOffset == 0) {
                        leftMenuOffset = document.getElementById('leftMenu').offsetLeft;
                        var pageContent = document.getElementById('pageContent');
                        pageContentMaxX = pageContent.offsetLeft + pageContent.offsetWidth;
                    }

                    $scope.leftMenuWidth = currentX - leftMenuOffset + 2;
                    $scope.pageContentWidth = pageContentMaxX - currentX - 2;
                    $scope.$apply();
                }
            }
        }
    })
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The left menu slider

    .directive('ngvMenuSlider', function () {
        return {
            scope: true,
            replace: true,
            templateUrl: '/ngv/partials/menu-slider.html',
            controller: function ($scope, AppConfig) {

                $scope.menu = AppConfig.getMenuConfig();

                $scope.onDragCompleted = function (newClientX) {
                    $scope.setSliderPosition(newClientX);
                };
            }
        }
    })
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The left menu drag bar - gray bar visible only during menu resizing

    .directive('ngvMenuDragBar', function () {
        return {
            controller: function ($scope, $element, $window) {

                $scope.dragOngoing = false;

                $element.on('mousedown', function () {
                    $scope.dragOngoing = true;
                    $scope.$digest();
                });

                angular.element($window).on('mouseup', function ($event) {
                    if ($scope.dragOngoing) {
                        $scope.dragOngoing = false;
                        $scope.$digest();
                    }
                });
            }
        }
    });