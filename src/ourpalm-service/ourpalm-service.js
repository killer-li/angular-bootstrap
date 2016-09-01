(function (angular) {

    angular.module('ourpalm-service', [])

        .service('Service', function ($q, $timeout, $http) {
            function loadTopic() {
                return $http.get('/mock/topic');
            }

            function loadHotTopic() {
                return $http.get('/mock/hot');
            }

            function loadRecentTopic() {
                return $http.get('/mock/recent');
            }

            return {
                loadTopic: loadTopic,
                loadHotTopic: loadHotTopic,
                loadRecentTopic: loadRecentTopic
            }
        })

})(angular);