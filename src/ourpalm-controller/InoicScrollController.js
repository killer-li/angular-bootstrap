(function (angular) {

    angular.module('app')
        .controller('IonicController', function ($scope, $timeout, $ionicPopover) {
            var vm = this;
            vm.items = ['1', '2', '3', '4', '5', '6', '7', '8'];
            
            $ionicPopover.fromTemplateUrl('my-popover.html', {
                scope: $scope
            }).then(function(popover) {
                vm.popover = popover;
            });

            vm.refresh = function () {
                $timeout(function () {
                    console.info('refresh');
                    var arr = [], toarr = vm.items;
                    for (var i = vm.items.length + 1; i < vm.items.length + 5; i++) {
                        arr.push(i);
                    }
                    toarr = toarr.concat(arr);
                    toarr.sort(function (a, b) {
                        return a < b;
                    });
                    vm.items = toarr;
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            };

            vm.loadMore = function () {
                $timeout(function () {
                    console.info('loadMore');
                    var arr = [], toarr = vm.items;
                    for (var i = vm.items.length + 1; i < vm.items.length + 5; i++) {
                        arr.push(i);
                    }
                    toarr = toarr.concat(arr);
                    vm.items = toarr;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }, 1000);
            };

            vm.openPopover = function($event) {
                vm.popover.show($event);
            };
        });
})(angular);