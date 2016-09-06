(function (angular) {

    angular

        .module('ourpalm-bootstrap-directive', [])

        /**
         * date-time-picker provider 提供默认配置，并可以通过config修改默认配置
         */
        .provider('datetimePickerProvider', function () {
            var options = {
                singleDatePicker: true,
                timePicker: true,
                timePickerIncrement: 1,
                format: 'YYYY-MM-DD HH:mm:ss'
            };

            this.configure = function (config) {
                angular.extend(options, config);
            };

            this.$get = function () {
                return {
                    options: options
                }
            };
        })
        /**
         * 将bootstrap date-time-picker 转换为指令
         */
        .directive('ourpalmDatetimePicker', function (datetimePickerProvider) {
            return {
                restrict: 'A',
                link: function (scope, ele, attrs) {
                    var options = attrs.ourpalmDatetimePicker || '{}';
                    options = angular.fromJson(options);
                    options = angular.extend(datetimePickerProvider.options, options);
                    $(ele).daterangepicker(options);
                }
            }
        })

        /**
         * 将bootstrap select-picker 转换为指令
         */
        .directive('ourpalmSelectPicker', function () {
            return {
                restrict: 'A',
                link: function (scope, ele, attrs) {
                    var options = attrs.ourpalmSelectPicker || '{}';
                    options = angular.fromJson(options);
                    $(ele).selectpicker(options);
                }
            }
        })

        /**
         * 模态对话框
         */
        .directive('ourpalmModal', ['$rootScope', function ($rootScope) {
            return {
                restrict: 'EA',
                scope: true,
                link: function (scope, ele, attrs) {
                    var hide = 'close';
                    /* 监听service open服务 */
                    scope.$on('ourpalm-modal:open@' + attrs.ourpalmModal, function () {
                        $(ele).modal('show');
                    });
                    /* 监听confirm指令事件 */
                    scope.$on('ourpalm-modal:confirm', function () {
                        hide = 'confirm';
                        $(ele).modal('hide');
                    });
                    /* 监听close指令事件 */
                    scope.$on('ourpalm-modal:close', function () {
                        hide = 'close';
                        $(ele).modal('hide');
                    });

                    /* 将close事件广播给service服务 */
                    $(ele).on('hide.bs.modal', function (e) {
                        switch (hide) {
                            case 'confirm':
                                scope.$emit('ourpalm-modal:confirm@' + attrs.ourpalmModal);
                                break;
                            case 'close':
                                scope.$emit('ourpalm-modal:close@' + attrs.ourpalmModal);
                                break;
                        }
                        hide = 'close';
                    });
                }
            }
        }])
        .directive('ourpalmModalConfirm', function () {
            return {
                restrict: 'EA',
                scope: true,
                link: function (scope, ele, attrs) {
                    ele.on('click', function () {
                        scope.$emit('ourpalm-modal:confirm');
                    });
                }
            }
        })
        .directive('ourpalmModalClose', function () {
            return {
                restrict: 'EA',
                scope: true,
                link: function (scope, ele, attrs) {
                    ele.on('click', function () {
                        scope.$emit('ourpalm-modal:close');
                    });
                }
            }
        })
        .factory('modal', ['$rootScope', '$q', function ($rootScope, $q) {
            return function (templateId) {
                var deferred = $q.defer();
                templateId = templateId || '';
                $rootScope.$broadcast('ourpalm-modal:open@' + templateId);
                $rootScope.$on('ourpalm-modal:confirm@' + templateId, function () {
                    deferred.resolve();
                });
                $rootScope.$on('ourpalm-modal:close@' + templateId, function () {
                    deferred.reject();
                });
                return deferred.promise;
            }
        }])


})(angular);