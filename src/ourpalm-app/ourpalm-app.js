(function (angular) {

    var app = angular.module('app',
        [
            'ui.router',
            'ui.grid',
            'ui.bootstrap',
            'datatables',
            'ourpalm-util-directive',
            'ourpalm-bootstrap-directive',
            'ourpalm-util-filter',
            'ourpalm-util-http',
            'ourpalm-service'
        ]);

    window.angularAPP = app; //export for mock test

    app
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
                })
                .state('admin.index', {
                    url: '/index',
                    views: {
                        'content': {
                            templateUrl: './../ourpalm-view/dashboard.html'
                        }
                    }
                })
                .state('admin.forum', {
                    url: '/forum',
                    views: {
                        'content': {
                            templateUrl: './../ourpalm-view/forum.html'
                        }
                    }
                })
                .state('admin.dashboard', {
                    url: '/dashboard',
                    views: {
                        'content': {
                            templateUrl: './../ourpalm-view/dashboard.html'
                        }
                    }
                })
                .state('admin.topic', {
                    url: '/topic',
                    views: {
                        'content': {
                            templateUrl: './../ourpalm-view/topic.html'
                        }
                    }
                })
            ;
        });
})(angular);