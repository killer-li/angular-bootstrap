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

        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
            /* 设置cors post不发送options请求 */
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            /* 设置超时 */
            $httpProvider.interceptors.push('timeoutHttpInterceptor');

            $urlRouterProvider.otherwise('/ionic_scroll');

            $stateProvider
                .state('ionic_scroll', {
                    url: '/ionic_scroll',
                    template: require('./../ourpalm-view/inoic_scroll.html')
                });
        });

})(angular);