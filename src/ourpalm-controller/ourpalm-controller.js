(function (angular) {

    angular.module('app')
        .controller('TopicController', function (Service) {
            var vm = this;

            Service.loadTopic().success(function (result) {
                console.warn(result);
                vm.topic = result.data;
            });
        });

})(angular);