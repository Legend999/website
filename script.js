const options = {
    // isCaseSensitive: false,
    includeScore: true,
    // shouldSort: true,
    // includeMatches: false, //interesting option
    // findAllMatches: false,
    // minMatchCharLength: 1, //mozna ustawic na 2
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    ignoreLocation: true,
    // ignoreFieldNorm: false,
    keys: ['pl', 'en']
};

$(document).ready(function () {
    $("#search").focus();
    var list = [];
    $.get("dictionary.umg", function (response) {
        var file = response;
        var splitted = file.split("\n"); //splitted into an array of substring
        for (var i = 0; i < splitted.length; ++i) {
            if (splitted[i] == "")
                break;
            var tmp = splitted[i].split("=");
            let tmp2 = {
                "pl": tmp[0],
                "en": tmp[1],
                "id": i,
                "value": i
            };
            list.push(tmp2);

            $('<div class="row ROW u' + (i + 1) + '"><div class="col pol">' + tmp[0] + '</div><div class="col eng">' + tmp[1] + '</div></div>').insertAfter(".u" + i);
        }
        console.log(list);
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

    function doneTyping() {
        var pattern = $('#search').val();
        const fuse = new Fuse(list, options);
        var result = fuse.search(pattern);

        for (var i = 0; i < 1; ++i) {
            let j;
            for (j = 0; list[j]['id'] != result[i]['item']['id']; ++j);
            var FOR = window.setInterval(function () {
                if (j == 0) {
                    clearInterval(FOR);
                    return;
                }
                $(".u" + (list[j]['value'])).addClass("go-down");
                $(".u" + (list[j + 1]['value'])).addClass("go-up");
                setTimeout(function () {
                    var tmp = $(".u" + list[j + 2]['value']).html();
                    $(".u" + list[j + 2]['value']).html($(".u" + list[j + 1]['value']).html());
                    $(".u" + list[j + 1]['value']).html(tmp);
                    $(".u" + list[j + 1]['value']).removeClass("go-down");
                    $(".u" + list[j + 2]['value']).removeClass("go-up");
                    [list[j], list[j + 1]] = [list[j + 1], list[j]];
                    [list[j]['value'], list[j + 1]['value']] = [list[j + 1]['value'], list[j]['value']];
                    console.log(list);
                }, 300);
                --j;
            }, 310)
        }
    }
});
