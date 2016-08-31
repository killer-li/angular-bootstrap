(function (angular) {

    angular.module('app',
        [
            'ui.router',
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

            $urlRouterProvider.otherwise('/admin/index');

            $stateProvider
                .state('admin', {
                    abstract: true,
                    url: '/admin',
                    template: [
                        '<div ui-view="top"></div>',
                        '<div ui-view="left"></div>',
                        '<div ui-view="main"></div>',
                        '<div ui-view="right"></div>'
                    ].join('')
                })
                .state('admin.index', {
                    url: "/index",
                    views: {
                        top: {
                            templateUrl: './../ourpalm-view/top_menu.html'
                        },
                        left: {
                            templateUrl: './../ourpalm-view/left_menu.html'
                        },
                        right: {
                            templateUrl: './../ourpalm-view/right_menu.html'
                        },
                        main: {
                            templateUrl: './../ourpalm-view/main.html'
                        }
                    }
                });
        });

    angular.bootstrap(document, ['app']);
})(angular);