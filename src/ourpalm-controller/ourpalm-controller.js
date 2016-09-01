(function (angular) {

    angular
        .module('app')

        /**
         * 最热帖子 最新帖子
         */
        .controller('TopicController', function (Service, $uibModal) {
            var vm = this;

            Service.loadTopic().success(function (result) {
                vm.topic = result.data;
            });

            vm.openSettingColumnModal = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'setting-column-tpl'
                });

                modalInstance.result.then(function (selectedItem) {

                });
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