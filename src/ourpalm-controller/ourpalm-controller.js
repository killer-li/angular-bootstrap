(function (angular) {

    angular
        .module('app')

        /**
         * 最热帖子 最新帖子
         */
        .controller('TopicController', function (Service, $uibModal, $scope, modal) {
            var vm = this;

            $scope.topic = [
                {
                    "firstName": "Cox",
                    "lastName": "Carney",
                    "company": "Enormo",
                    "employed": true
                },
                {
                    "firstName": "Lorraine",
                    "lastName": "Wise",
                    "company": "Comveyer",
                    "employed": false
                },
                {
                    "firstName": "Nancy",
                    "lastName": "Waters",
                    "company": "Fuelton",
                    "employed": false
                }
            ];

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
        });

})(angular);