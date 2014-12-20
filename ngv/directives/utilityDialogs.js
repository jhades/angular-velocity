///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Utility dialogs - confirmations, navigate away, renew session, please wait transition dialog ,etc.
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////

angular.module('ngvUtilityDialogs', [])

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// The please wait transition dialog

    .directive('ngvPleaseWaitDialog', function () {
        return {
            replace: true,
            templateUrl: '/ngv/partials/please-wait-dialog.html',
            controller: function ($scope, $rootScope, $element, $timeout) {

                $scope.transitionOngoing = true;
                $scope.waitOngoing = true;

                checkIfStillWaiting();

                $rootScope.$on('$routeChangeStart', function () {
                    $scope.transitionOngoing = true;
                    checkIfStillWaiting();
                });
                $rootScope.$on('$routeChangeSuccess', function () {
                    endTransition();
                });
                $rootScope.$on('$routeChangeError', function () {
                    endTransition();
                });

                function checkIfStillWaiting() {
                    // show please wait dialog if the wait gets longer than 0.5sec
                    $timeout(function () {
                        $scope.waitOngoing = $scope.transitionOngoing;
                    }, 500);
                }

                function endTransition() {
                    $scope.transitionOngoing = false;
                    $scope.waitOngoing = false;
                }
            }
        }
    });
