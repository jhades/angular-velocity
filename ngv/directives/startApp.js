////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Bootstrap module - allows loading the app config from the backend.
//
//  This bootstrap app is needed because the Angular Velocity App needs access to backend files for it's setup,
//  for example for the routing configuration of the navigation menu.
//
//  The $http service is only available late in the initialization process, so the solution is to bootstrap
// first an invisible app that just loads the config from the backend, and only then initialize the main app.
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////

angular.module('ngvStartApp', [])
    .factory('ConfigLoader', function ($q, $http) {

        return {
            loadConfig: function (configHRef) {

                var deferred = $q.defer();

                $http({method: 'GET', url: configHRef})
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function () {
                        deferred.reject('Failed loading Angular Velocity configuration file.');
                    });

                return deferred.promise;
            }
        }

    });
