$(document).ready(function() {
    var idleMouseTimer;
    var forceMouseHide = false;
    var canHide = true;

    $("body").css('cursor', 'none');

    $("body").mousemove(function(ev) {
        if(!forceMouseHide) {
            $("body").css('cursor', '');
            $(".settings-div").removeClass('hidden');
            $("#pause-button").removeClass('hidden');
            $("#previous-button").removeClass('hidden');
            $("#next-button").removeClass('hidden');
            clearTimeout(idleMouseTimer);

            idleMouseTimer = setTimeout(function() {
                $("body").css('cursor', 'none');
                $(".settings-div").addClass('hidden');
                $("#pause-button").addClass('hidden');
                $("#previous-button").addClass('hidden');
                $("#next-button").addClass('hidden');
                forceMouseHide = true;
                setTimeout(function() {
                    forceMouseHide = false;
                }, 500);
            }, 2000);
        }
    });
});
