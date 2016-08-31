(function (angular) {

    angular.module('app',
        [
            'ui.router',
            'ionic',
            'ourpalm-util-directive',
            'ourpalm-util-filter',
            'ourpalm-util-http',
            'ourpalm-service'
        ])

        .constant('$ionicLoadingConfig', {
            template: 'Default Loading Template...'
        })

        .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
            /* 设置cors post不发送options请求 */
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            /* 设置超时 */
            $httpProvider.interceptors.push('timeoutHttpInterceptor');

            $locationProvider.html5Mode(true);

            $urlRouterProvider.otherwise('/state1');

            $stateProvider
                .state('state1', {
                    url: "/state1",
                    template: `
                            <h1>State 1</h1>
                            <hr/>
                            <a ui-sref="state1.list">Show List</a>
                            <div ui-view></div>
                        `
                })
                .state('state1.list', {
                    url: "/list",
                    template: `
                        <h1>State 2</h1>
                        <hr/>
                        <a ui-sref="state2.list">Show List</a>
                        <div ui-view></div>
                    `,
                    controller: function ($scope) {
                        $scope.items = ["A", "List", "Of", "Items"];
                    }
                })
                .state('state2', {
                    url: "/state2",
                    template: `
                        <h1>State 2</h1>
                        <hr/>
                        <a ui-sref="state2.list">Show List</a>
                        <div ui-view></div>
                    `
                })
                .state('state2.list', {
                    url: "/list",
                    template: `
                        <h3>List of State 2 Things</h3>
                        <ul>
                          <li ng-repeat="thing in things">{{ thing }}</li>
                        </ul>
                    `,
                    controller: function ($scope) {
                        $scope.things = ["A", "Set", "Of", "Things"];
                    }
                });
        });

})(angular);