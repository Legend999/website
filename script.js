$(document).ready(function () {
    $(".test").click(function () {
        alert("OK");
    });

    $.get("dictionary.umg", function (response) {
        var file = response;
        var splitted = file.split("\n"); //splitted into an array of substring
        for (var i = 0; i < splitted.length; ++i) {
            if (splitted[i] == "")
                break;
            var tmp = splitted[i].split("-");
            tmp.push.apply(tmp, [i, 0]); // [id, value]
            
            $('<div class="row ROW" id="u'+(i+1)+'"><div class="col pol">'+tmp[0]+'</div><div class="col eng">'+tmp[1]+'</div></div>').insertAfter("#u"+i);
        }
    });

    $('#search').keyup(function () {
        console.log($(this).val());
    });
});
