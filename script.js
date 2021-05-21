const options = {
    // isCaseSensitive: false,
    includeScore: true,
    // shouldSort: true,
    // includeMatches: false, //interesting option
    // findAllMatches: false,
    // minMatchCharLength: 1, //mozna ustawic na 2
    // location: 0,
    threshold: 0.3,
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
        $('<div class="u' + (i + 1) + '"></div>').insertAfter(".u" + i);
        let tmp2 = {
            "pl": "",
            "en": "",
            "id": i,
            "value": i
        };
        list.push(tmp2);
    });

    var typingTimer, num = 0;
    var doneTypingInterval = 200;
    $('#search').keydown(function () {
        clearTimeout(typingTimer);
        ++num;
    });
    $('#search').keyup(function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    async function doneTyping() {
        let tmp_num = num;
        var pattern = $('#search').val();
        const fuse = new Fuse(list, options);
        var result = fuse.search(pattern);

        for (var i = 0;
            (i < Math.min(4, result.length)) && (tmp_num == num); ++i) {
            let j;
            for (j = 0; list[j]['id'] != result[i]['item']['id']; ++j);
            while ((j > 10) && (tmp_num == num)) {
                $(".u" + list[j]['value']).addClass("go-down-fast");
                $(".u" + (list[j]['value'] + 1)).addClass("go-up-fast");
                await new Promise(r => setTimeout(r, 2));
                --j;
                var tmp = $(".u" + list[j + 2]['value']).html();
                $(".u" + list[j + 2]['value']).html($(".u" + list[j + 1]['value']).html());
                $(".u" + list[j + 1]['value']).html(tmp);
                $(".u" + list[j + 1]['value']).removeClass("go-down-fast");
                $(".u" + list[j + 2]['value']).removeClass("go-up-fast");
                [list[j], list[j + 1]] = [list[j + 1], list[j]];
                [list[j]['value'], list[j + 1]['value']] = [list[j + 1]['value'], list[j]['value']];
            }
            while ((j > i) && (tmp_num == num)) {
                $(".u" + list[j]['value']).addClass("go-down");
                $(".u" + (list[j]['value'] + 1)).addClass("go-up");
                await new Promise(r => setTimeout(r, 40));
                --j;
                var tmp = $(".u" + list[j + 2]['value']).html();
                $(".u" + list[j + 2]['value']).html($(".u" + list[j + 1]['value']).html());
                $(".u" + list[j + 1]['value']).html(tmp);
                $(".u" + list[j + 1]['value']).removeClass("go-down");
                $(".u" + list[j + 2]['value']).removeClass("go-up");
                [list[j], list[j + 1]] = [list[j + 1], list[j]];
                [list[j]['value'], list[j + 1]['value']] = [list[j + 1]['value'], list[j]['value']];
            }
        }
        console.log(list);
    }
});
