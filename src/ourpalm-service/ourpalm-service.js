(function (angular) {

    angular.module('ourpalm-service', [])

        .service('Service', function ($q, $timeout, $http) {
            function loadTopic() {
                return $http.get('/mock/topic');
            }

            return {
                loadTopic: loadTopic
            }
        })

})(angular);