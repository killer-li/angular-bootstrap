(function (angular) {

    angular
        .module('app')

        /**
         * 最热帖子 最新帖子
         */
        .controller('TopicController', function (Service, NgTableParams, $q) {
            var vm = this;

            vm.tableParams = new NgTableParams({}, {
                getData: function (params) {
                    var deferred = $q.defer();
                    Service.loadTopic().success(function (result) {
                        params.total(result.total);
                        deferred.resolve(result.data);
                    });
                    return deferred.promise;
                }
            });
        })

        /**
         * 帖子管理
         */
        .controller('DashboardController', function (Service, $timeout) {
            var vm = this;

            $timeout(function () {
                vm.loadHotTopic();
                vm.loadRecentTopic();
            });

            vm.loadRecentTopic = function () {
                Service.loadRecentTopic().success(function (result) {
                    vm.recentTopic = result.data;
                });
            };

            vm.loadHotTopic = function () {
                Service.loadHotTopic().success(function (result) {
                    vm.hotTopic = result.data;
                });
            };
        })

        .controller('ForumController', function (NgTableParams, $Http, $q) {
            var vm = this;

            vm.tableParams = new NgTableParams({}, {
                getData: function (params) {
                    var deferred = $q.defer();
                    // console.info(params.orderBy());
                    $Http.post('/mock/forum', {
                        page: params.page(),
                        rows: params.count()
                    }, {
                        cache: true
                    }).success(function (result) {
                        params.total(result.total);
                        deferred.resolve(result.data);
                    });
                    return deferred.promise;
                }
            });
        })

})(angular);