(function (angular) {

    angular
        .module('app')

        /**
         * 最热帖子 最新帖子
         */
        .controller('TopicController', function (Service, $uibModal, $scope, modal) {
            var vm = this;

            Service.loadTopic().success(function (result) {
                vm.topic = result.data;
            });

            vm.openSettingColumnModal = function () {
                modal().then(function () {
                    console.info('confirm');
                }, function () {
                    console.info('close');
                })
            };
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

        .controller('ExampleCtrl', function (NgTableParams, $Http) {
            var vm = this;

            vm.tableParams = new NgTableParams({}, {
                getData: function ($defer, params) {
                    // console.info(params.orderBy());
                    $Http.post('http://localhost/monitor/task/pageURLTask/2', {
                        page: params.page(),
                        rows: params.count()
                    }, {
                        cache: true
                    }).success(function (result) {
                        params.total(result.total);
                        $defer.resolve(result.rows);
                    });
                }
            });
        })

})(angular);