(function (angular) {

    angular.module('app',
        [
            'ui.router',
            'ngSanitize',
            'emoji',
            'ourpalm-util-directive',
            'ourpalm-util-filter',
            'ourpalm-util-http',
            'ourpalm-service'
        ])
        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
            /* 设置cors post不发送options请求 */
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            /* 设置超时 */
            $httpProvider.interceptors.push('timeoutHttpInterceptor');

            $urlRouterProvider.otherwise('/state1');

            $stateProvider
                .state('state1', {
                    url: '/state1',
                    template: ['<h1>State 1</h1>',
                        '<hr/>',
                        '<a ui-sref="state1.list">Show List</a>',
                        '<div ui-view></div>'
                    ].join('')
                })
                .state('state1.list', {
                    url: '/list',
                    template: ['<h3>List of State 1 Items</h3>',
                        '<ul>',
                        '<li ng-repeat="message in vm.messages" ourpalm-compile-html="message | emoji"></li>',
                        '<br/>',
                        '<div style="width:350px;height:130px;border:1px solid #ccc;" contenteditable="true" ourpalm-compile-html="vm.text | emoji"></div>',
                        '<br/>',
                        '<button ng-click="vm.getValue();">get value</button>',
                        '<div>{{vm.result}}</div>',
                        '</ul>'
                    ].join(''),
                    controllerAs: 'vm',
                    controller: function () {
                        var vm = this;
                        vm.text = 'Animals: :dog: :cat: :snake:';
                        vm.messages = [
                            "Animals: :dog: :cat: :snake:",
                            "People: :smile: :confused: :angry:",
                            "Places: :house: :school: :hotel:"
                        ];
                        vm.getValue = function () {
                            console.info(vm.text);
                            vm.result = vm.text;
                        }
                    }
                })
        });

    angular.bootstrap(document, ['app']);

})(angular);