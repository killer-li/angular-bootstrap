(function (angular) {

    angular.module('ourpalm-util-directive', ['pascalprecht.translate'])

    /**
     * 自己编译，防止动态html代码中的指令不能被编译的问题，如ng-bind ng-bind-html不能编译自定义指令
     */
        .directive('ourpalmCompileHtml', ['$compile', '$filter', function ($compile, $filter) {
            return function (scope, element, attrs) {
                scope.$watch(
                    function (scope) {
                        // watch the 'compile' expression for changes
                        return scope.$eval(attrs.ourpalmCompileHtml);
                    },
                    function (value) {
                        // when the 'compile' expression changes
                        // assign it into the current DOM
                        element.html(value);
                        // compile the new DOM and link it to the current
                        // scope.
                        // NOTE: we only compile .childNodes so that
                        // we don't get into infinite loop compiling ourselves
                        $compile(element.contents())(scope);
                    }
                );
            };
        }])

        /**
         * 后退
         */
        .directive('ourpalmBack', [function () {
            return {
                restrict: 'A',
                scope: true,
                controller: ['$rootScope', '$scope', '$element', '$attrs', function ($rootScope, $scope, $element, $attrs) {
                    $element.bind('click', function (event) {
                        $scope.$apply(function () {
                            window.history.back();
                        });
                    });
                }]
            }
        }])

        /**
         * 刷新
         */
        .directive('ourpalmReload', [function () {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, ele, attrs) {
                    ele.on('click', function () {
                        window.location.reload();
                    });
                }
            }
        }])

        /**
         * hash跳转
         */
        .directive('ourpalmGoto', ['$timeout', '$window', function ($timeout, $window) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, ele, attrs) {
                    ele.on('click', function () {
                        window.location.hash = attrs.ourpalmGoto;
                    });
                }
            }
        }])

        /**
         * loading mask
         */
        .factory('loading', ['$rootScope', function ($rootScope) {
            var loading = function () {
            };

            loading.show = function () {
                $rootScope.$broadcast('ourpalm-loading-add');
            };

            loading.hide = function () {
                $rootScope.$broadcast('ourpalm-loading-remove');
            };

            return loading;
        }])
        .directive('ourpalmLoading', [function () {
            return {
                replace: true,
                restrict: 'EA',
                scope: true,
                // template: '<div><div ng-repeat="loading in loading_arr" class="ourpalm-toast">{{toast.val}}</div></div>',
                template: '<div ng-show="count > 0"><div style="position:fixed;top:0px;left:0px;border:0px none;padding:0px;margin:0px;width:100%;height:100%;z-index:100;background:rgb(224, 236, 255) none repeat scroll 0% 0%;opacity:0;"></div><img src="data:image/gif;base64,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" style="position:fixed;top:50%;left:50%;width:32px;height:32px;margin-top:-16px;margin-left:-16px;z-index:1001"/></div>',
                link: function (scope, elements, attrs) {
                    scope.count = 0;
                    scope.$on('ourpalm-loading-add', function () {
                        scope.count = scope.count + 1;
                    });
                    scope.$on('ourpalm-loading-remove', function () {
                        scope.count = scope.count - 1;
                    });
                }
            }
        }])


        /**
         * toast消息提示
         */
        .factory('toast', ['$rootScope', '$translate', function ($rootScope, $translate) {
            /* 处理普通文本 */
            var toast = function (val) {
                $rootScope.$broadcast('toast-new', val);
            };
            /* 处理国际化 文本*/
            toast.translate = function (translateId) {
                $translate(translateId).then(function (translation) {
                    $rootScope.$broadcast('toast-new', translation);
                }, function () {
                    $rootScope.$broadcast('toast-show', '处理国际化失败,国际化key为：' + translateId);
                });
            };
            /* sdktoast toast */
            toast.sdktoast = function (val) {
                window.pageBridge && window.pageBridge.invokeSdkNativeToast(val);
            };
            /* sdktoast toast + 国际化*/
            toast.sdktoast.translate = function (translateId) {
                $translate(translateId).then(function (translation) {
                    window.pageBridge && window.pageBridge.invokeSdkNativeToast(translation);
                }, function () {
                    window.pageBridge && window.pageBridge.invokeSdkNativeToast('处理国际化失败,国际化key为：' + translateId);
                });
            };
            return toast;
        }])
        .directive('ourpalmToast', ['$sce', '$timeout', function ($sce, $timeout) {
            return {
                replace: true,
                restrict: 'EA',
                scope: true,
                link: function ($scope, $ele, $attrs) {
                    $attrs.$set('ngShow', 'vm.isShow');
                    $scope.$watch($attrs.ngShow, function (newValue, oldValue, scope) {
                        if (newValue) {
                            $ele.css('display', 'block');
                        } else {
                            $ele.css('display', 'none');
                        }
                    });
                },
                template: '<div class="ourpalm-toast">{{vm.message}}</div>',
                controllerAs: 'vm',
                controller: ['$scope', function ($scope) {
                    var vm = this;
                    $scope.$on('toast-new', function (event, val) {
                        vm.isShow = false;
                        vm.timer && $timeout.cancel(vm.timer);
                        window.setTimeout(function () {
                            $timeout(function () {
                                vm.message = val;
                                vm.isShow = true;
                                vm.timer = $timeout(function () {
                                    vm.isShow = false;
                                    vm.message = '';
                                    vm.timer = null;
                                }, 2000);
                            }, 10);
                        });
                    });
                }]
            }
        }])

        /**
         * 消息提示
         */
        .directive('ourpalmMessager', ['$timeout', '$parse', function ($timeout, $parse) {
            return {
                restrict: 'EA',
                scope: true,
                template: function ($element, $attrs) {
                    $attrs.$set('ngShow', 'vm.isShow');
                    $element.addClass('ourpalm-shake').append('{{message}}');
                },
                link: function (scope, elem, attrs) {
                    scope.$watch(attrs.ngShow, function (newValue, oldValue, scope) {
                        if (newValue) {
                            elem.css('display', 'block');
                        } else {
                            elem.css('display', 'none');
                        }
                    });
                },
                controllerAs: 'vm',
                controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
                    var vm = this;
                    vm.isShow = false;
                    vm.timer = null;
                    $scope.$on('messager-show', function (event, val) {
                        //reset
                        vm.timer && $timeout.cancel(vm.timer);
                        vm.isShow = false;
                        vm.message = '';
                        //new
                        window.setTimeout(function () {
                            $timeout(function () {
                                $scope.message = val;
                                vm.isShow = true;
                                vm.timer = $timeout(function () {
                                    vm.isShow = false;
                                    vm.timer = null;
                                }, 3000);
                            });
                        });
                    });
                }]
            }
        }])
        .factory('messager', ['$rootScope', '$translate', 'toast', function ($rootScope, $translate, toast) {
            /* 处理普通文本 */
            var messager = function (val) {
                if (val.length > 25) {
                    toast(val);
                } else {
                    $rootScope.$broadcast('messager-show', val);
                }
            };
            /* 处理国际化 文本*/
            messager.translate = function (translateId) {
                $translate(translateId).then(function (translation) {
                    if (translation.length > 25) {
                        toast(translation);
                    } else {
                        $rootScope.$broadcast('messager-show', translation);
                    }
                }, function () {
                    $rootScope.$broadcast('messager-show', '处理国际化失败,国际化key为：' + translateId);
                });
            };
            return messager;
        }])


        /**
         * 弹出对话框
         */
        .directive('ourpalmDialog', ['$rootScope', function ($rootScope) {
            return {
                restrict: 'EA',
                scope: true,
                template: function ($element, $attrs) {
                    $element.css('display', 'none');
                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $scope.close = function () {
                        $element.css('display', 'none');
                        $rootScope.$emit('ourpalm-dialog-close');
                    };
                    $scope.confirm = function () {
                        $element.css('display', 'none');
                        $rootScope.$emit('ourpalm-dialog-confirm');
                    };
                    $scope.$on('ourpalm-dialog-open', function () {
                        $element.css('display', 'block');
                    });
                }]
            }
        }])
        .factory('dialog', ['$rootScope', '$q', function ($rootScope, $q) {
            return function () {
                var deferred = $q.defer();
                $rootScope.$broadcast('ourpalm-dialog-open');
                $rootScope.$on('ourpalm-dialog-confirm', function () {
                    deferred.resolve();
                });
                $rootScope.$on('ourpalm-dialog-close', function () {
                    deferred.reject();
                });
                return deferred.promise;
            }
        }])

        .directive('ourpalmIframeEditor', function () {
            return {
                restrict: 'A',
                scope: true,
                link: function ($scope, $element, $attrs) {
                    console.info($element);

                    $scope.$on('ourpalm-iframe-editor:insertHtml', function (event, html) {

                    })
                }
            }
        })

})(angular);