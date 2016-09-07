(function (angular) {

    angular
        .module('app')

        /**
         * 最热帖子 最新帖子
         */
        .controller('TopicController', function (Service, NgTableParams, $scope, modal, $q) {
            var vm = this;

            // vm.cols = [
            //     {field: "number", title: "帖子编号", show: false},
            //     {field: "title", title: "标题", show: true},
            //     {field: "nickName", title: "用户昵称", show: true}
            // ];

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
        .controller('DashboardController', function (Service, $q) {
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
                getData: function (params) {
                    var deferred = $q.defer();
                    // console.info(params.orderBy());
                    $Http.post('http://192.168.75.107/monitor/task/pageURLTask/2', {
                        page: params.page(),
                        rows: params.count()
                    }, {
                        cache: true
                    }).success(function (result) {
                        params.total(result.total);
                        deferred.resolve(result.rows);
                    });
                    return deferred.promise;
                }
            });
        })

})(angular);