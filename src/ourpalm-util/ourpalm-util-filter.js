(function (angular) {
    angular.module('ourpalm-util-filter', [])

    /**
     * 处理手机号 13041182378 --> 1304***2378
     */
        .filter('phone_mask', function () {
            return function (phone) {
                try {
                    return phone.substr(0, 4) + '***' + phone.substr(7, 4);
                } catch (err) {
                    return phone;
                }
            }
        })

        /**
         * 将待展示的文本 安全过滤 防止XSS注入
         */
        .filter('sce_trust', ['$sce', function ($sce) {
            return function (val) {
                return $sce.trustAsHtml(val);
            }
        }])

        /**
         * 字符串过长的时候 截取
         */
        .filter('string_cut', function () {
            return function (val, limit, postfix) {
                if (!!val && val.length > limit) {
                    return val.substr(0, limit) + postfix;
                }
                return val;
            }
        })

        /**
         * 字符串长度截取 ，字符串过长的时候转为tooltip
         */
        .filter('string_cut_tooltip', function () {
            return function (val, limit, postfix) {
                if (!!val && val.length > limit) {
                    var text = val.substr(0, limit) + postfix;
                    return ['<span uib-tooltip="', val, '" uib-popover="', val, '" popover-placement="bottom">', text, '</span>'].join('');
                }
                return ['<span uib-tooltip="', val, '" uib-popover="', val, '" popover-placement="bottom">', val, '</span>'].join('');
            }
        })

})(angular);