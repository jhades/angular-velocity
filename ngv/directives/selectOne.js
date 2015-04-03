///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Directives for the auto-complete and dropdown widgets. for the moment the auto-complete is
// a client-side only auto-complete, for example for selecting a country.
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////

var _ = require('lodash');
require('../services/ngvCommons');

angular.module('ngvSelectOne', ['ngvCommons'])
    .directive('ngvSelectionList', function () {
        return {
            replace: true,
            scope: {
                selectionEntries: '=',
                maxVisibleEntries: "=",
                dropdownWidth: '=',
                onEntrySelected: '&'
            },
            templateUrl: '/ngv/partials/selection-list.html',
            controller: function ($scope, KeyUtils, $element) {

                $scope.selectedIndex = -1;
                $scope.scrollOffset = 0;

                $scope.$parent.selectionCommands = {
                    down: onDownPressed,
                    up: onUpPressed,
                    select: onSelectionMade,
                    reset: reset
                };

                function reset() {
                    $scope.selectedIndex = -1;
                    $scope.scrollOffset = 0;
                    adjustScroll();
                }

                /**
                 *
                 * Adjust the scrolling position of the selection list
                 *
                 */
                function adjustScroll() {
                    $element[0].scrollTop = $scope.scrollOffset * 22;
                }

                $scope.getMaxVisibleEntries = function () {
                    return $scope.maxVisibleEntries ? parseInt($scope.maxVisibleEntries) : 7;
                };

                $scope.onEntryHover = function ($event, index) {
                    if (!$scope.suspendMouseSelection) {
                        $scope.selectedIndex = index;
                        $scope.scrollOffset = Math.floor(index / $scope.getMaxVisibleEntries()) * $scope.getMaxVisibleEntries();
                    }
                };

                $scope.selectEntry = function (selectedIndex, selectText) {
                    $scope.onEntrySelected({selectedIndex: selectedIndex, selectText: selectText});
                    reset();
                }

                /**
                 *
                 * suspend selection via the mouse, in case the mouse is hovering over the selection list and
                 * at the same time the user started to use the up and down arrows.
                 *
                 */
                $scope.suspendMouseSelectionIfApplicable = function () {
                    if ($scope.mouseInsideSelectionList) {
                        $scope.suspendMouseSelection = true;
                    }
                }

                function onDownPressed() {
                    if ($scope.selectedIndex < $scope.selectionEntries.length - 1) {
                        $scope.selectedIndex++;
                        if ($scope.selectedIndex > $scope.scrollOffset + $scope.getMaxVisibleEntries() - 1) {
                            $scope.scrollOffset += 1;
                            adjustScroll();
                            $scope.suspendMouseSelectionIfApplicable();
                        }
                    }
                }

                function onUpPressed() {
                    if ($scope.selectedIndex > 0) {
                        $scope.selectedIndex--;
                        if ($scope.selectedIndex < $scope.scrollOffset) {
                            $scope.scrollOffset -= 1;
                            adjustScroll();
                            $scope.suspendMouseSelectionIfApplicable();
                        }
                    }
                }

                function onSelectionMade(key) {
                    if ($scope.selectedIndex >= 0) {
                        $scope.selectEntry($scope.selectedIndex, KeyUtils.isEnter(key));
                    }
                }

            }
        };
    })
    .directive('ngvDropdown', function() {
        return {
            replace:true,
            templateUrl: '/ngv/partials/dropdown.html',
            require: 'ngModel',
            scope: {
                optionsCommand: '&',
                maxVisibleEntries: '@?',
                dropdownWidth: '@?',
                name: '@',
                emptyEntry: '@?'
            },
            link: function (scope, element, attrs, ngModel) {
                scope.ngModel = ngModel;
                scope.required = (attrs.required != undefined);
            },
            controller: function($scope) {
                $scope.isShowDropdownButton = function() {
                    return true;
                };
            }
        };
    })
    .directive('ngvAutocomplete', function() {
        return {
            replace:true,
            templateUrl: '/ngv/partials/autocomplete.html',
            require: 'ngModel',
            scope: {
                optionsCommand: '&',
                maxVisibleEntries: '@?',
                dropdownWidth: '@?',
                name: '@',
                showDropdownButton: '=?',
                emptyEntry: '@?'
            },
            link: function (scope, element, attrs, ngModel) {
                scope.ngModel = ngModel;
                scope.required = (attrs.required != undefined);
            },
            controller: function($scope) {
                $scope.isShowDropdownButton = function() {
                    return ($scope.showDropdownButton != undefined) ? $scope.showDropdownButton : true;
                };
            }
        };
    })
    .directive('ngvSelectOne', function ($filter) {
        return {
            replace: true,
            scope: true,
            templateUrl: '/ngv/partials/select-one.html',
            link: function(scope, element, attrs) {
                scope.cssIcon = attrs.cssIcon;
                scope.openSelectionOnClick = (attrs.openSelectionOnClick === 'true');
                scope.preventTyping = (attrs.preventTyping === 'true');
            },
            controller: function ($scope, KeyUtils, $element, $timeout, lbl) {
                $scope.model = {};
                $scope.entries = angular.copy($scope.optionsCommand());
                $scope.selectionEntries = $scope.entries;

                $scope.isAllowEmpty = function() {
                    return $scope.emptyEntry != undefined;
                };

                addEmptyEntryIfNeeded();
                $scope.showDropdown = false;

                if ($scope.ngModel.$viewValue == null && $scope.emptyEntry != undefined) {
                    $scope.model.searchInput = lbl[$scope.emptyEntry];
                }

                function getInput() {
                    return $element.children()[0];
                }

                function addEmptyEntryIfNeeded() {
                    if($scope.isAllowEmpty()) {
                        $scope.selectionEntries.unshift({id: null, description: lbl[$scope.emptyEntry]});
                    }
                }

                $scope.onButtonClicked = function () {
                    $scope.showDropdown = !$scope.showDropdown;
                    if ($scope.showDropdown) {
                        $timeout(function () {
                            getInput().focus();
                        });
                    }
                };

                /**
                 *
                 * when an entry is chosen, update the ng-model, close dropdown and select the input text.
                 *
                 */
                $scope.onEntrySelected = function (selectedIndex, selectText) {
                    $scope.ngModel.$setViewValue($scope.selectionEntries[selectedIndex].id);
                    $scope.model.searchInput = $scope.selectionEntries[selectedIndex].description;
                    $scope.showDropdown = false;
                    if (selectText) {
                        $timeout(function () {
                            getInput().select();
                        });
                    }
                    $scope.ngModel.$setValidity('fieldRequired', true);
                };

                $scope.onInputFocus = function () {
                    $scope.active = true;
                };
                
                $scope.onInputClicked = function () {
                    $scope.active = true;
                    if ($scope.openSelectionOnClick) {
                        $scope.showDropdown = true;
                    }
                };

                $scope.onInputBlur = function () {
                    $scope.showDropdown = false;
                    $scope.active = false;
                };

                /**
                 *
                 * There are two scope variables for search: one directly binded to the input box, and the other
                 * used for filtering the selection list, that are synched at appropriate moments.
                 *
                 * This separation allows to do things like clicking the dropdown icon and see all options available,
                 * independently of the fact that text was already typed in the input text field.
                 *
                 */
                $scope.syncSearchInputWithList = function () {
                    $timeout(function () {
                        $scope.selectionEntries = $filter('filter')($scope.entries, $scope.model.searchInput);
                        $scope.$apply();
                    });
                };

                $scope.onKeyDown = function ($event) {
                    var key = $event.keyCode;

                    if (!KeyUtils.isArrowLeft(key) && !KeyUtils.isArrowRight(key) && !KeyUtils.isShift(key)
                        && !KeyUtils.isMeta(key)) {
                        $scope.showDropdown = true;
                    }

                    if (KeyUtils.isArrowDown(key)) {
                        $scope.selectionCommands.down();
                    }
                    else if (KeyUtils.isArrowUp(key)) {
                        $scope.selectionCommands.up();
                    }
                    else if (KeyUtils.isEnter(key) || KeyUtils.isTab(key)) {
                        $scope.selectionCommands.select(key);
                        if (KeyUtils.isEnter(key)) {
                            $event.preventDefault();
                        }
                    }
                    else if (KeyUtils.isBackSpace(key) && !$scope.preventTyping) {
                        $scope.selectionCommands.reset();
                        $scope.showDropdown = true;
                        if(!$scope.preventTyping) {
                            $scope.syncSearchInputWithList();
                        }
                    }
                    else if (KeyUtils.isEsc(key)) {
                        $scope.showDropdown = false;
                        $scope.selectionCommands.reset();
                        $timeout(function () {
                            getInput().blur();
                        });
                    }
                    else {
                        if ($scope.preventTyping) {
                            $event.preventDefault();
                        }
                        else {
                            $scope.selectionCommands.reset();
                            $scope.syncSearchInputWithList();
                        }
                    }
                };

            }
        };
    })
    .directive('checkEmptyAllowed', function(lbl) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ngModel) {
                ngModel.$validators.checkEmptyAllowed = function(modelValue, viewValue) {
                    // if the value is required and its null, then its invalid
                    return !(scope.required && modelValue == lbl[scope.emptyEntry] );
                };
            }
        };
    });
