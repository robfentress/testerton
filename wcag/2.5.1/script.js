$(document).on("click", "ul li span.delete", function () {
    var listview = $(this).closest("ul");
    $(".ui-content").css({
        overflow: "hidden"
    });
    $(this).parent().css({
        display: "block"
    }).animate({
        opacity: 0
    }, {
        duration: 250,
        queue: false
    }).animate({
        height: 0
    }, 300, function () {
        $(this).remove();
        listview.listview("refresh");
        $(".ui-content").removeAttr("style");
    });
}).on("click", "ul li span.flag", function () {
    var text = $("p", this),
        button = $(this).siblings("a"),
        flagged = button.find(".flagged").hasClass("ui-screen-hidden") ? false : true;
    if (!flagged) {
        button.find(".flagged").removeClass("ui-screen-hidden");
        text.text("Unflag");
    } else {
        button.find(".flagged").addClass("ui-screen-hidden");
        text.text("Flag");
    }
}).on("click", "ul li span.more", function () {
    alert("nothing");
}).on("swipeleft", "ul li a", function (e) {
    $(this).prevAll("span").addClass("show");
    $(this).off("click").blur();
    $(this).css({
        transform: "translateX(-210px)"
    }).one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () {
        $(this).one("swiperight", function () {
            $(this).prevAll("span").removeClass("show");
            $(this).css({
                transform: "translateX(0)"
            }).blur();
        });
    });
});