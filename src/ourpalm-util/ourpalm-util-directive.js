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

        .directive('ourpalmIframeEditor', function ($timeout) {
            var iframe, idoc;

            function initIframeEditor() {
                idoc.open();
                idoc.write('<html><head><link rel="stylesheet" href="bower_components/angular-emoji/dist/emoji.min.css"><style>img[src=""]{opacity: 0;}</style></head><body></body></html>');
                idoc.designMode = 'on';
                idoc.contentEditable = true;
                idoc.close();
            }

            function insertHtml(html) {
                //获取焦点
                iframe.focus();
                idoc.queryCommandSupported('InsertHTML') && idoc.execCommand('InsertHTML', false, html);
            }

            function insertImage(url) {
                //获取焦点
                iframe.focus();
                idoc.queryCommandSupported('InsertImage') && idoc.execCommand('InsertImage', false, url);
            }

            function updateNgModel(ngModelController) {
                //更新ngModel
                if (ngModelController) {
                    $timeout(function () {
                        ngModelController.$setViewValue(idoc.body.innerHTML);
                    });
                }
            }

            return {
                restrict: 'A',
                scope: true,
                require: '?ngModel',
                link: function ($scope, $element, $attrs, ngModelController) {
                    iframe = $element[0];
                    idoc = $element[0].contentDocument;
                    //初始化编辑器
                    initIframeEditor();
                    //监听插入HTML事件 并更新ngModel
                    $scope.$on('ourpalm-iframe-editor:insertHtml', function (event, html) {
                        insertHtml(html);
                        updateNgModel(ngModelController);
                    });
                    //监听插入IMAGE事件 并更新ngModel
                    $scope.$on('ourpalm-iframe-editor:insertImage', function (event, url) {
                        insertImage(url);
                        updateNgModel(ngModelController);
                    });
                    //获取值
                    $scope.$on('ourpalm-iframe-editor:getValue', function (event, callback) {
                        angular.isFunction(callback) && callback(idoc.body.innerHTML);
                    });
                    //监听键盘事件 更新ngModel
                    angular.element(idoc).on('keydown', function () {
                        updateNgModel(ngModelController);
                    });
                }
            }
        })
        .factory('iframeEditor', function ($rootScope) {
            function iframeEditor() {
            }

            iframeEditor.insertHtml = function (html) {
                console.info(html);
                $rootScope.$broadcast('ourpalm-iframe-editor:insertHtml', html);
            };
            iframeEditor.insertImage = function (url) {
                $rootScope.$broadcast('ourpalm-iframe-editor:insertImage', url);
            };
            iframeEditor.getValue = function (callback) {
                $rootScope.$broadcast('ourpalm-iframe-editor:getValue', callback);
            };

            return iframeEditor;
        })

        .directive('ourpalmEmojis', function () {
            var emojis = ["bowtie", "smile", "laughing", "blush", "smiley", "relaxed", "smirk", "heart_eyes", "kissing_heart", "kissing_closed_eyes", "flushed", "relieved", "satisfied", "grin", "wink", "stuck_out_tongue_winking_eye", "stuck_out_tongue_closed_eyes", "grinning", "kissing", "kissing_smiling_eyes", "stuck_out_tongue", "sleeping", "worried", "frowning", "anguished", "open_mouth", "grimacing", "confused", "hushed", "expressionless", "unamused", "sweat_smile", "sweat", "disappointed_relieved", "weary", "pensive", "disappointed", "confounded", "fearful", "cold_sweat", "persevere", "cry", "sob", "joy", "astonished", "scream", "neckbeard", "tired_face", "angry", "rage", "triumph", "sleepy", "yum", "mask", "sunglasses", "dizzy_face", "imp", "smiling_imp", "neutral_face", "no_mouth", "innocent", "alien", "yellow_heart", "blue_heart", "purple_heart", "heart", "green_heart", "broken_heart", "heartbeat", "heartpulse", "two_hearts", "revolving_hearts", "cupid", "sparkling_heart", "sparkles", "star", "star2", "dizzy", "boom", "collision", "anger", "exclamation", "question", "grey_exclamation", "grey_question", "zzz", "dash", "sweat_drops", "notes", "musical_note", "fire", "hankey", "poop", "shit", "\\+1", "thumbsup", "-1", "thumbsdown", "ok_hand", "punch", "facepunch", "fist", "v", "wave", "hand", "raised_hand", "open_hands", "point_up", "point_down", "point_left", "point_right", "raised_hands", "pray", "point_up_2", "clap", "muscle", "metal", "fu", "walking", "runner", "running", "couple", "family", "two_men_holding_hands", "two_women_holding_hands", "dancer", "dancers", "ok_woman", "no_good", "information_desk_person", "raising_hand", "bride_with_veil", "person_with_pouting_face", "person_frowning", "bow", "couplekiss", "couple_with_heart", "massage", "haircut", "nail_care", "boy", "girl", "woman", "man", "baby", "older_woman", "older_man", "person_with_blond_hair", "man_with_gua_pi_mao", "man_with_turban", "construction_worker", "cop", "angel", "princess", "smiley_cat", "smile_cat", "heart_eyes_cat", "kissing_cat", "smirk_cat", "scream_cat", "crying_cat_face", "joy_cat", "pouting_cat", "japanese_ogre", "japanese_goblin", "see_no_evil", "hear_no_evil", "speak_no_evil", "guardsman", "skull", "feet", "lips", "kiss", "droplet", "ear", "eyes", "nose", "tongue", "love_letter", "bust_in_silhouette", "busts_in_silhouette", "speech_balloon", "thought_balloon", "feelsgood", "finnadie", "goberserk", "godmode", "hurtrealbad", "rage1", "rage2", "rage3", "rage4", "suspect", "trollface", "sunny", "umbrella", "cloud", "snowflake", "snowman", "zap", "cyclone", "foggy", "ocean", "cat", "dog", "mouse", "hamster", "rabbit", "wolf", "frog", "tiger", "koala", "bear", "pig", "pig_nose", "cow", "boar", "monkey_face", "monkey", "horse", "racehorse", "camel", "sheep", "elephant", "panda_face", "snake", "bird", "baby_chick", "hatched_chick", "hatching_chick", "chicken", "penguin", "turtle", "bug", "honeybee", "ant", "beetle", "snail", "octopus", "tropical_fish", "fish", "whale", "whale2", "dolphin", "cow2", "ram", "rat", "water_buffalo", "tiger2", "rabbit2", "dragon", "goat", "rooster", "dog2", "pig2", "mouse2", "ox", "dragon_face", "blowfish", "crocodile", "dromedary_camel", "leopard", "cat2", "poodle", "paw_prints", "bouquet", "cherry_blossom", "tulip", "four_leaf_clover", "rose", "sunflower", "hibiscus", "maple_leaf", "leaves", "fallen_leaf", "herb", "mushroom", "cactus", "palm_tree", "evergreen_tree", "deciduous_tree", "chestnut", "seedling", "blossom", "ear_of_rice", "shell", "globe_with_meridians", "sun_with_face", "full_moon_with_face", "new_moon_with_face", "new_moon", "waxing_crescent_moon", "first_quarter_moon", "waxing_gibbous_moon", "full_moon", "waning_gibbous_moon", "last_quarter_moon", "waning_crescent_moon", "last_quarter_moon_with_face", "first_quarter_moon_with_face", "moon", "earth_africa", "earth_americas", "earth_asia", "volcano", "milky_way", "partly_sunny", "octocat", "squirrel", "bamboo", "gift_heart", "dolls", "school_satchel", "mortar_board", "flags", "fireworks", "sparkler", "wind_chime", "rice_scene", "jack_o_lantern", "ghost", "santa", "christmas_tree", "gift", "bell", "no_bell", "tanabata_tree", "tada", "confetti_ball", "balloon", "crystal_ball", "cd", "dvd", "floppy_disk", "camera", "video_camera", "movie_camera", "computer", "tv", "iphone", "phone", "telephone", "telephone_receiver", "pager", "fax", "minidisc", "vhs", "sound", "speaker", "mute", "loudspeaker", "mega", "hourglass", "hourglass_flowing_sand", "alarm_clock", "watch", "radio", "satellite", "loop", "mag", "mag_right", "unlock", "lock", "lock_with_ink_pen", "closed_lock_with_key", "key", "bulb", "flashlight", "high_brightness", "low_brightness", "electric_plug", "battery", "calling", "email", "mailbox", "postbox", "bath", "bathtub", "shower", "toilet", "wrench", "nut_and_bolt", "hammer", "seat", "moneybag", "yen", "dollar", "pound", "euro", "credit_card", "money_with_wings", "e-mail", "inbox_tray", "outbox_tray", "envelope", "incoming_envelope", "postal_horn", "mailbox_closed", "mailbox_with_mail", "mailbox_with_no_mail", "door", "smoking", "bomb", "gun", "hocho", "pill", "syringe", "page_facing_up", "page_with_curl", "bookmark_tabs", "bar_chart", "chart_with_upwards_trend", "chart_with_downwards_trend", "scroll", "clipboard", "calendar", "date", "card_index", "file_folder", "open_file_folder", "scissors", "pushpin", "paperclip", "black_nib", "pencil2", "straight_ruler", "triangular_ruler", "closed_book", "green_book", "blue_book", "orange_book", "notebook", "notebook_with_decorative_cover", "ledger", "books", "bookmark", "name_badge", "microscope", "telescope", "newspaper", "football", "basketball", "soccer", "baseball", "tennis", "8ball", "rugby_football", "bowling", "golf", "mountain_bicyclist", "bicyclist", "horse_racing", "snowboarder", "swimmer", "surfer", "ski", "spades", "hearts", "clubs", "diamonds", "gem", "ring", "trophy", "musical_score", "musical_keyboard", "violin", "space_invader", "video_game", "black_joker", "flower_playing_cards", "game_die", "dart", "mahjong", "clapper", "memo", "pencil", "book", "art", "microphone", "headphones", "trumpet", "saxophone", "guitar", "shoe", "sandal", "high_heel", "lipstick", "boot", "shirt", "tshirt", "necktie", "womans_clothes", "dress", "running_shirt_with_sash", "jeans", "kimono", "bikini", "ribbon", "tophat", "crown", "womans_hat", "mans_shoe", "closed_umbrella", "briefcase", "handbag", "pouch", "purse", "eyeglasses", "fishing_pole_and_fish", "coffee", "tea", "sake", "baby_bottle", "beer", "beers", "cocktail", "tropical_drink", "wine_glass", "fork_and_knife", "pizza", "hamburger", "fries", "poultry_leg", "meat_on_bone", "spaghetti", "curry", "fried_shrimp", "bento", "sushi", "fish_cake", "rice_ball", "rice_cracker", "rice", "ramen", "stew", "oden", "dango", "egg", "bread", "doughnut", "custard", "icecream", "ice_cream", "shaved_ice", "birthday", "cake", "cookie", "chocolate_bar", "candy", "lollipop", "honey_pot", "apple", "green_apple", "tangerine", "lemon", "cherries", "grapes", "watermelon", "strawberry", "peach", "melon", "banana", "pear", "pineapple", "sweet_potato", "eggplant", "tomato", "corn", "house", "house_with_garden", "school", "office", "post_office", "hospital", "bank", "convenience_store", "love_hotel", "hotel", "wedding", "church", "department_store", "european_post_office", "city_sunrise", "city_sunset", "japanese_castle", "european_castle", "tent", "factory", "tokyo_tower", "japan", "mount_fuji", "sunrise_over_mountains", "sunrise", "stars", "statue_of_liberty", "bridge_at_night", "carousel_horse", "rainbow", "ferris_wheel", "fountain", "roller_coaster", "ship", "speedboat", "boat", "sailboat", "rowboat", "anchor", "rocket", "airplane", "helicopter", "steam_locomotive", "tram", "mountain_railway", "bike", "aerial_tramway", "suspension_railway", "mountain_cableway", "tractor", "blue_car", "oncoming_automobile", "car", "red_car", "taxi", "oncoming_taxi", "articulated_lorry", "bus", "oncoming_bus", "rotating_light", "police_car", "oncoming_police_car", "fire_engine", "ambulance", "minibus", "truck", "train", "station", "train2", "bullettrain_front", "bullettrain_side", "light_rail", "monorail", "railway_car", "trolleybus", "ticket", "fuelpump", "vertical_traffic_light", "traffic_light", "warning", "construction", "beginner", "atm", "slot_machine", "busstop", "barber", "hotsprings", "checkered_flag", "crossed_flags", "izakaya_lantern", "moyai", "circus_tent", "performing_arts", "round_pushpin", "triangular_flag_on_post", "jp", "kr", "cn", "us", "fr", "es", "it", "ru", "gb", "uk", "de", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "keycap_ten", "1234", "zero", "hash", "symbols", "arrow_backward", "arrow_down", "arrow_forward", "arrow_left", "capital_abcd", "abcd", "abc", "arrow_lower_left", "arrow_lower_right", "arrow_right", "arrow_up", "arrow_upper_left", "arrow_upper_right", "arrow_double_down", "arrow_double_up", "arrow_down_small", "arrow_heading_down", "arrow_heading_up", "leftwards_arrow_with_hook", "arrow_right_hook", "left_right_arrow", "arrow_up_down", "arrow_up_small", "arrows_clockwise", "arrows_counterclockwise", "rewind", "fast_forward", "information_source", "ok", "twisted_rightwards_arrows", "repeat", "repeat_one", "new", "top", "up", "cool", "free", "ng", "cinema", "koko", "signal_strength", "u5272", "u5408", "u55b6", "u6307", "u6708", "u6709", "u6e80", "u7121", "u7533", "u7a7a", "u7981", "sa", "restroom", "mens", "womens", "baby_symbol", "no_smoking", "parking", "wheelchair", "metro", "baggage_claim", "accept", "wc", "potable_water", "put_litter_in_its_place", "secret", "congratulations", "m", "passport_control", "left_luggage", "customs", "ideograph_advantage", "cl", "sos", "id", "no_entry_sign", "underage", "no_mobile_phones", "do_not_litter", "non-potable_water", "no_bicycles", "no_pedestrians", "children_crossing", "no_entry", "eight_spoked_asterisk", "eight_pointed_black_star", "heart_decoration", "vs", "vibration_mode", "mobile_phone_off", "chart", "currency_exchange", "aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpius", "sagittarius", "capricorn", "aquarius", "pisces", "ophiuchus", "six_pointed_star", "negative_squared_cross_mark", "a", "b", "ab", "o2", "diamond_shape_with_a_dot_inside", "recycle", "end", "on", "soon", "clock1", "clock130", "clock10", "clock1030", "clock11", "clock1130", "clock12", "clock1230", "clock2", "clock230", "clock3", "clock330", "clock4", "clock430", "clock5", "clock530", "clock6", "clock630", "clock7", "clock730", "clock8", "clock830", "clock9", "clock930", "heavy_dollar_sign", "copyright", "registered", "tm", "x", "heavy_exclamation_mark", "bangbang", "interrobang", "o", "heavy_multiplication_x", "heavy_plus_sign", "heavy_minus_sign", "heavy_division_sign", "white_flower", "100", "heavy_check_mark", "ballot_box_with_check", "radio_button", "link", "curly_loop", "wavy_dash", "part_alternation_mark", "trident", "black_square", "white_square", "white_check_mark", "black_square_button", "white_square_button", "black_circle", "white_circle", "red_circle", "large_blue_circle", "large_blue_diamond", "large_orange_diamond", "small_blue_diamond", "small_orange_diamond", "small_red_triangle", "small_red_triangle_down", "shipit"];
            return {
                restrict: 'E',
                replace: false,
                template: '<ourpalm-emoji class="ourpalm-emoji" ng-repeat="emoji in vm.emojis" ng-click="vm.onEmojiClickEvent(emoji);"><i class="emoji emoji_{{emoji}}">{{emoji}}</i></ourpalm-emoji>',
                controllerAs: 'vm',
                controller: function ($scope) {
                    var vm = this;
                    vm.emojis = emojis;
                    vm.onEmojiClickEvent = function (emoji) {
                        $scope.$emit('ourpalm-emoji:click', emoji);
                    };
                }
            }
        })

        .directive('ourpalmEmojisEditor', function () {
            return {
                restrict: 'EA',
                template: '<div><iframe ourpalm-iframe-editor class="ourpalm-iframe-editor"></iframe><div class="ourpalm-emoji-panel"><ourpalm-emojis></ourpalm-emojis></div></div>',
                controller: function ($rootScope, iframeEditor) {
                    console.info(iframeEditor);
                    $rootScope.$on('ourpalm-emoji:click', function (event, emoji) {
                        iframeEditor.insertHtml('<img class="emoji emoji_' + emoji + '" src="" alt="' + emoji + '"/>');
                        // iframeEditor.insertHtml('<i class="emoji emoji_' + emoji + '">' + emoji + '<i/>');
                    });
                }
            }
        })

        /**
         * 随进给元素添加一个class
         * eg: <i class="fa" ourpalm-random-class="fa-folder-o,fa-file-archive-o,fa-file-pdf-o"></i>
         */
        .directive('ourpalmRandomClass', ['$timeout', '$parse', function ($timeout, $parse) {
            function randomItem(arr) {
                var index = Math.floor(Math.random() * arr.length);
                return arr[index];
            }

            return {
                restrict: 'A',
                scope: true,
                link: function (scope, elem, attrs) {
                    if (angular.isArray(attrs.ourpalmRandomClass)) {
                        elem.addClass(randomItem(attrs.ourpalmRandomClass));
                    } else {
                        elem.addClass(randomItem(attrs.ourpalmRandomClass.split(',')));
                    }
                }
            }
        }])
})(angular);