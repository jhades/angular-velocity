///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Collapsible behaviour: a collapsible elements needs to define a collapsible section (a div that get's
// collapsed/expanded), and a collapsible trigger - a clickable element that triggers the collapse
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////

angular.module('ngvCollapsible', [])
    .directive('ngvCollapsible', function () {
        return {
            scope: true,
            controller: function ($scope, $element) {

                $scope.state = {};
                $scope.collapsedClass = $element.attr('collapsed-class');
                $scope.expandedClass = $element.attr('expanded-class');
                $scope.state.collapsed = ($element.attr('init-collapsed') === "true");

                function updateCollapsedIcon() {
                    if ($scope.state.collapsed) {
                        $element.removeClass($scope.expandedClass);
                        $element.addClass($scope.collapsedClass);
                    }
                    else {
                        $element.removeClass($scope.collapsedClass);
                        $element.addClass($scope.expandedClass);
                    }
                }

                updateCollapsedIcon();

                this.toggle = function () {
                    $scope.state.collapsed = !($scope.state.collapsed);
                    updateCollapsedIcon();
                }
            }
        }
    })
    .directive('ngvCollapsibleTrigger', function () {
        return {
            require: '^ngvCollapsible',

            link: function (scope, element, attrs, collapsibleCtrl) {
                scope.collapsibleCtrl = collapsibleCtrl;
            },

            controller: function ($scope, $element) {
                $element.on('click', function () {
                    $scope.collapsibleCtrl.toggle();
                    $scope.$digest();
                });
            }
        }
    })
    .directive('ngvCollapsibleSection', function ($timeout) {
        return {
            controller: function ($scope, $element) {

                // wait for page to render, then measure height
                $timeout(function () {
                    $scope.initialHeight = $element[0].clientHeight;
                    $element.css({'height': $scope.initialHeight + 'px'});
                }, 500);

                $scope.$watch('state.collapsed', function (collapsed) {
                    if ($scope.initialHeight != undefined) {
                        var newHeight = collapsed ? '0' : ($scope.initialHeight + 'px');
                        $element.css({'height': newHeight});
                    }
                });
            }
        }
    });

