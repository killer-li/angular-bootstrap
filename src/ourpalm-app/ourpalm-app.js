(function (angular) {

    agGrid.initialiseAgGridWithAngular1(angular);

    var app = angular.module('app',
        [
            'ui.router',
            'ui.grid',
            'ui.bootstrap',
            'datatables',
            'agGrid',
            'ngTable',
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
        })
        .run(function (DTDefaultOptions, ngTableDefaults) {
            ngTableDefaults.params.count = 10;
            // ngTableDefaults.settings.counts = [];


            //开启读取服务器数据时显示正在加载中……特别是大数据量的时候，开启此功能比较好
            // DTDefaultOptions.setOption('bProcessing', true);
            //开启服务器模式，使用服务器端处理配置datatable。注意：sAjaxSource参数也必须被给予为了给datatable源代码来获取所需的数据对于每个画。 这个翻译有点别扭。开启此模式后，你对datatables的每个操作 每页显示多少条记录、下一页、上一页、排序（表头）、搜索，这些都会传给服务器相应的值
            // DTDefaultOptions.setOption('bServerSide', true);
            //国际化
            DTDefaultOptions.setOption('oLanguage', {
                "sProcessing": "正在加载数据...",
                "sLengthMenu": "显示_MENU_条 ",
                "sZeroRecords": "没有您要搜索的内容",
                "sInfo": "显示 _START_ 至 _END_ 条 &nbsp;&nbsp;共 _TOTAL_ 条",
                "sInfoEmpty": "没有数据",
                "sInfoFiltered": "(全部记录数 _MAX_  条)",
                "sInfoPostFix": "",
                "sSearch": "搜索",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "前一页",
                    "sNext": "后一页",
                    "sLast": "末页"
                },
                "oAria": {}
            });
        })
    ;
})(angular);