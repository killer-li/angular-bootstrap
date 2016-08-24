(function (window, angular) {

    angular.module('ourpalm-util-http', ['ourpalm-util-directive'])
    /**
     * 在 HttpModule 模块上添加 拦截器 用来给http请求 增加 mask loading
     * 通过 angular 指令 实现
     */
        .factory('ajaxLoadingInterceptor', ["$q", "$rootScope", 'loading', function ($q, $rootScope, loading) {
            return {
                request: function (config) {
                    config.mask === true && loading.show();
                    return config || $q.when(config)
                },
                response: function (response) {
                    response.config.mask === true && loading.hide();
                    return response || $q.when(response);
                },
                responseError: function (response) {
                    response.config.mask === true && loading.hide();
                    return $q.reject(response);
                }
            };
        }])

        /**
         * 设置超时
         */
        .factory('timeoutHttpInterceptor', function () {
            return {
                request: function (config) {
                    config.timeout = 1000 * 30;
                    return config;
                }
            }
        })

        /**
         * 统一的异常处理
         */
        .factory('httpErrorInterceptor', ['$q', 'toast', function ($q, toast) {
            return {
                responseError: function (response) {
                    console.info(response);
                    switch (response.status) {
                        case -1:
                            toast('网络异常');
                            break;
                        // case 404:
                        //     toast('请求地址不存在(404)');
                        //     break;
                        // case 500:
                        //     toast('服务器开小差了,请稍后再试(500)');
                        //     break;
                        // case 502:
                        //     toast('Bad GateWay(502)');
                        //     break;
                        default:
                            toast('网络异常(' + response.status + ')')
                    }
                    return $q.reject(response);
                }
            }
        }])

})(window, angular);