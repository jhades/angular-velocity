///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Panel directives - block panels, collapsible panels, tabbed panels, etc.
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////


angular.module('ngvPanels', ['ngvCommons'])
    .directive('ngvCollapsiblePanel', function() {
        return {
            transclude: true,
            scope: true,
            templateUrl: '/ngv/partials/collapsible-panel.html',
            link: function (scope, element, attrs) {
                scope.panelTitle = attrs.ngvCollapsiblePanel;
            }
        };
    })
    .directive('ngvTabContainer', function() {
        return {
            scope: true,
            transclude: true,
            templateUrl: '/ngv/partials/tab-container.html',
            controller: function($scope) {
                $scope.tabs = [];

                this.addTab = function(tab) {
                    $scope.tabs.push(tab);
                    if ($scope.tabs.length == 1) {
                        tab.selected = true;
                        tab.htmlElement.addClass('selected');
                    }
                };

                $scope.onTabSelected = function(selectedIndex) {
                    _.each($scope.tabs, function(tab) {
                        tab.selected = false;
                        tab.htmlElement.removeClass('selected');
                    });

                    var tab = $scope.tabs[selectedIndex];
                    tab.selected = true;
                    tab.htmlElement.addClass('selected');
                };
             }
        };
    })
    .directive('ngvTabPane', function() {
        return {
            scope: true,
            require: '^ngvTabContainer',
            link: function(scope, element, attrs, tabContainerCtrl) {
                tabContainerCtrl.addTab({
                    tabText: attrs.ngvTabPane,
                    htmlElement: element
                });
            }
        };
    });