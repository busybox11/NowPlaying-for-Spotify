$(document).ready(function() {  
        var idleMouseTimer;
        var forceMouseHide = false;

        $("body").css('cursor', 'none');

        $("body").mousemove(function(ev) {
                if(!forceMouseHide) {
                        $("body").css('cursor', '');

                        clearTimeout(idleMouseTimer);

                        idleMouseTimer = setTimeout(function() {
                                $("body").css('cursor', 'none');

                                forceMouseHide = true;
                                setTimeout(function() {
                                        forceMouseHide = false;
                                }, 500);
                        }, 2000);
                }
        });
});