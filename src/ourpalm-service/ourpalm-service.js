(function (angular) {

    angular.module('ourpalm-service', [])

        .service('Service', function ($q, $timeout, $http) {
            function loadData() {
                var deferred = $q.defer();
                $http.post('http://test.haokaishi365.com/api/ad/list', {
                    a: '中文',
                    b: 2
                }).success(function (response) {
                    console.info(response);
                });
                return deferred.promise;
            }

            return {
                loadData: loadData
            }
        })

})(angular);