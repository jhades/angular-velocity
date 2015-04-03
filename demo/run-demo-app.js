
var angularVelocity = require('angular-velocity'),
    countries = require('./scripts/referenceData');

angularVelocity.app()
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
    .controller('EditableTablesCtrl', function ($scope) {
        $scope.page.title = $scope.lbl['editable.tables'];
    })
    .controller('LeftMenuCtrl', function ($scope) {
        $scope.page.title = $scope.lbl['left.menu.page.title'];
    });

angularVelocity.start();

