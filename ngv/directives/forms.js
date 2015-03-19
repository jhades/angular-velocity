///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Angular Velocity form directives
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////


angular.module('ngvForms', ['ngvCommons', 'ngvPanels', 'ngvSelectOne', 'ngvCalendar'])
    .directive('grabFocus', function () {
        return {
            controller: function ($scope, $element) {
                $scope.$evalAsync(function () {
                    $element[0].focus();
                });
            }
        }
    })
    .directive('ngvForm', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                class: '@'
            },
            templateUrl: '/ngv/partials/form.html',
            controller: function ($scope) {

                $scope.messages = [];
                this.textPerMessage = [];

                this.onValidationsAvailable = function (validations) {
                    this.errors = validations.errors;
                    $scope.messagesVisible = true;
                };

                this.getForm = function () {
                    return $scope.form;
                };

                this.getMessages = function () {
                    return $scope.messages;
                }

                this.addMessage = function (message) {
                    $scope.messages.push(message);
                    this.textPerMessage[message.msgId] = message.text;
                };
            }
        };
    })
    .directive('ngvValidate', function () {
        return {
            scope: {
                ngvValidate: '&'
            },
            require: '^ngvForm',
            link: function (scope, element, attrs, ngvForm) {
                scope.ngvForm = ngvForm;
            },
            controller: function ($scope, $element) {
                $element.on('click', function () {
                    $scope.ngvValidate()
                        .then(function (validations) {
                            $scope.ngvForm.onValidationsAvailable(validations);
                    });
                });
            }
        }
    })
    .directive('ngvMessages', function ($compile, $http, $templateCache) {
        return {
            restrict: 'E',
            require: '^ngvForm',
            link: function (scope, element, attrs, ngvForm) {
                scope.formCtrl = ngvForm;

                // manually load template from the server, cache it and compile it
                $http.get('/ngv/partials/messages.html', {cache: $templateCache}).success(function (template) {
                    element.replaceWith($compile(template)(scope));
                });
            },
            controller: function ($scope) {
                $scope.messages = [];
            }
        };
    })
    .directive('ngvError', function () {
        return {
            restrict: 'E',
            require: '^ngvForm',
            compile: function () {
                return {
                    pre: function (scope, element, attrs, ngvForm) {
                        ngvForm.addMessage({
                            msgId: attrs.msgid,
                            type: 'error',
                            field: attrs.field,
                            clientTrigger: attrs.clienttrigger,
                            text: element.text()
                        });
                    }
                };
            }
        };
    })
    .directive('ngvField', function ($compile) {
        return {
            scope: true,
            link: function (scope, element, attrs) {
                var fieldMessages = $compile('<ngv-field-messages class="ngv-field-messages" ng-class="{\'visible\':messagesVisible}" field="' + attrs.name + '"></ngv-field-messages>')(scope);
                element.after(fieldMessages);
            },
            controller: function ($scope, $element) {
                $element.on('focus', function () {
                    $scope.messagesVisible = true;
                    if (!$scope.$$phase) {
                        $scope.$digest();
                    }
                });
                $element.on('blur', function () {
                    $scope.messagesVisible = false;
                    if (!$scope.$$phase) {
                        $scope.$digest();
                    }
                });
            }
        };
    })
    .directive('ngvFieldMessages', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                field: '@'
            },
            require: '^ngvForm',
            templateUrl: '/ngv/partials/field-messages.html',
            link: function (scope, element, attrs, formCtrl) {
                scope.form = formCtrl.getForm();

                var fieldMessages = _.filter(formCtrl.getMessages(), function (message) {
                    return message.field == attrs.field && message.clientTrigger;
                });

                // add ng-message elements manually - cannot be done using ng-repeat
                _.each(fieldMessages, function (message) {
                    element.children(0).append('<div ng-message="' + message.clientTrigger + '">' + message.text + '</div>');
                });

                // recompile the directive contents
                $compile(element.contents())(scope);


            }
        };
    });