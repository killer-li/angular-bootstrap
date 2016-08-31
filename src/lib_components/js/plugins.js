/* Sidebar Menu*/
$(document).ready(function () {
    /*右边菜单点击事件*/
    $(document).on('click', '.nav > li > a', function () {
        if ($(this).attr('class') != 'active') {
            $('.nav li ul').slideUp();
            $(this).next().slideToggle();
            $('.nav li a').removeClass('active');
            $(this).addClass('active');
        } else {
            $('.nav li ul').slideUp();
            $('.nav li a').removeClass('active');
        }
    });
});

/* Top Stats Show Hide */
$(document).ready(function () {
    $(document).on('click', '#topstats', function () {
        $(".topstats").slideToggle(100);
    });
});


/* Sidepanel Show-Hide */
$(document).ready(function () {
    $(document).on('click', '.sidepanel-open-button', function () {
        $(".sidepanel").toggle(100);
    });
});


/* Sidebar Show-Hide On Mobile */
$(document).ready(function () {
    $(document).on('click', '.sidebar-open-button-mobile', function () {
        $(".sidebar").toggle(150);
    });
});


/* Sidebar Show-Hide */
$(document).ready(function () {

    $(document).on('click', '.sidebar-open-button', function () {
        if ($('.sidebar').hasClass('hidden')) {
            $('.sidebar').removeClass('hidden');
            $('.content').css({
                'marginLeft': 250
            });
        } else {
            $('.sidebar').addClass('hidden');
            $('.content').css({
                'marginLeft': 0
            });
        }
    });

});


/* ===========================================================
 PANEL TOOLS
 ===========================================================*/
/* Minimize */
$(document).ready(function () {
    $(document).on('click', ".panel-tools .minimise-tool", function (event) {
        $(this).parents(".panel").find(".panel-body").slideToggle(100);
        return false;
    });

});

/* Close */
$(document).ready(function () {
    $(document).on('click', ".panel-tools .closed-tool", function (event) {
        $(this).parents(".panel").fadeToggle(400);
        return false;
    });

});

/* Search */
$(document).ready(function () {
    $(document).on('click', ".panel-tools .search-tool", function (event) {
        $(this).parents(".panel").find(".panel-search").toggle(100);
        return false;
    });

});


/* expand */
$(document).ready(function () {

    $(document).on('click', '.panel-tools .expand-tool', function () {
        if ($(this).parents(".panel").hasClass('panel-fullsize')) {
            $(this).parents(".panel").removeClass('panel-fullsize');
        }
        else {
            $(this).parents(".panel").addClass('panel-fullsize');

        }
    });

});


/* ===========================================================
 Widget Tools
 ===========================================================*/


/* Close */
$(document).ready(function () {
    $(document).on('click', ".widget-tools .closed-tool", function (event) {
        $(this).parents(".widget").fadeToggle(400);

        return false;
    });

});


/* expand */
$(document).ready(function () {

    $(document).on('click', '.widget-tools .expand-tool', function () {
        if ($(this).parents(".widget").hasClass('widget-fullsize')) {
            $(this).parents(".widget").removeClass('widget-fullsize');
        }
        else {
            $(this).parents(".widget").addClass('widget-fullsize');
        }
    });

});

/* Kode Alerts */
/* Default */
$(document).ready(function () {
    $(document).on('click', ".kode-alert .closed", function (event) {
        $(this).parents(".kode-alert").fadeToggle(350);
        return false;
    });

});


/* Click to close */
$(document).ready(function () {
    $(document).on('click', ".kode-alert-click", function (event) {
        $(this).fadeToggle(350);
        return false;
    });

});


/* Tooltips */
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

/* Popover */
$(function () {
    $('[data-toggle="popover"]').popover()
});


/* Page Loading */
$(window).load(function () {
    $(".loading").fadeOut(750);
});