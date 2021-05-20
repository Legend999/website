$(document).ready(function () {
    $("#search").focus();

    $.get("dictionary.umg", function (response) {
        var file = response;
        var splitted = file.split("\n"); //splitted into an array of substring
        for (var i = 0; i < splitted.length; ++i) {
            if (splitted[i] == "")
                break;
            var tmp = splitted[i].split("-");
            tmp.push.apply(tmp, [i, 0]); // [id, value]

            $('<div class="row ROW u' + (i + 1) + '"><div class="col pol">' + tmp[0] + '</div><div class="col eng">' + tmp[1] + '</div></div>').insertAfter(".u" + i);
        }
    });


    var typingTimer;
    var doneTypingInterval = 1000;  
    $('#search').keydown(function () {
        clearTimeout(typingTimer);
    });
    $('#search').keyup(function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });
    
    function doneTyping () {
        console.log($('#search').val());
        $(".u2").addClass("go-down");
        $(".u3").addClass("go-up");

        $(".go-down").addClass("u3").removeClass("u2")
        $(".go-up").addClass("u2").removeClass("u3");

        setTimeout(function () {
            var tmp = $(".u3").html();
            $(".u3").html($(".u2").html());
            $(".u2").html(tmp);
            $(".u3").removeClass("go-down");
            $(".u2").removeClass("go-up");
        }, 500);
    } 
});
