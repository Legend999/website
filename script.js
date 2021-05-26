const options = {
    // isCaseSensitive: false,
    includeScore: true,
    // shouldSort: true,
    // includeMatches: false, //interesting option
    // findAllMatches: false,
    // minMatchCharLength: 1, //mozna ustawic na 2
    // location: 0,
    threshold: 0.25,
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

            $('<fieldset class="row ROW u' + (i + 1) + '"><legend>Matches: -%</legend><div class="col pol">' + tmp[0] + '</div><div class="col eng">' + tmp[1] + '</fieldset></div>').insertAfter(".u" + i);
        }
        $('<div class="u' + (i + 1) + '"></div>').insertAfter(".u" + i);
        let tmp2 = {
            "pl": "",
            "en": "",
            "id": i,
            "value": i
        };
        list.push(tmp2);
        if (localStorage.getItem('dark') != null) {
            $('#switch').prop('checked', true);
            $('body').css('background', 'black');
            $('fieldset').css('background-image', "linear-gradient(to right, rgba(255, 255, 255, 0) 69%, rgba(0, 0, 0, 1)), url(https://flagcdn.com/120x90/pl.png), linear-gradient(to left, rgba(255, 255, 255, 0), rgba(0, 0, 0, 1)), url(https://flagcdn.com/120x90/gb.png)");
            $('.pol').css('color', 'rgb(52 130 52)');
            $('.u1').css('border', '2px #30f000 solid');
            $('#fade-head').css('background-image', 'linear-gradient(rgb(6 99 13) 0%, rgb(0 0 0) 72%, rgba(6, 2, 69, 0) 100%)');
            $('#fade-foot').css('background-image', 'linear-gradient(rgba(6, 2, 69, 0) 0%, rgba(6, 99, 13,0.15) 100%)');
        }

    });

    $('#switch').change(function () {
        if (this.checked) {
            $('body').css('background', 'black');
            $('fieldset').css('background-image', "linear-gradient(to right, rgba(255, 255, 255, 0) 69%, rgba(0, 0, 0, 1)), url(https://flagcdn.com/120x90/pl.png), linear-gradient(to left, rgba(255, 255, 255, 0), rgba(0, 0, 0, 1)), url(https://flagcdn.com/120x90/gb.png)");
            $('.pol').css('color', 'rgb(52 130 52)');
            $('.u1').css('border', '2px #30f000 solid');
            $('#fade-head').css('background-image', 'linear-gradient(rgb(6 99 13) 0%, rgb(0 0 0) 72%, rgba(6, 2, 69, 0) 100%)');
            $('#fade-foot').css('background-image', 'linear-gradient(rgba(6, 2, 69, 0) 0%, rgba(6, 99, 13,0.15) 100%)');
            localStorage.setItem('dark', JSON.stringify('1'));
        } else {
            $('body').removeAttr('style');
            $('fieldset').removeAttr('style');
            $('.pol').removeAttr('style');
            $('.u1').removeAttr('style');
            $('#fade-head').removeAttr('style');
            $('#fade-foot').removeAttr('style');
            localStorage.removeItem('dark');
        }
    });

    var typingTimer, num = 0;
    var doneTypingInterval = 200;
    var lastpattern = "";
    $('#search').keydown(function () {
        clearTimeout(typingTimer);
        ++num;
    });
    $('#search').keyup(function () {
        var pattern = $('#search').val();
        if (lastpattern != pattern) {
            $('html,body').scrollTop(0);
            $('.ROW').addClass('hide');
            $('.loader').removeAttr('style').removeClass('hide').addClass('unHide');
            clearTimeout(typingTimer);
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }
    });

    async function doneTyping() {
        let tmp_num = num;
        var pattern = $('#search').val();
        if (pattern == "") {
            $('.ROW').removeClass('hide');
        }
        if (lastpattern == pattern)
            return;
        lastpattern = pattern;
        const fuse = new Fuse(list, options);
        var result = fuse.search(pattern);

        $('.loader').removeClass('unHide').addClass('hide');
        for (let k = 0; k < list.length; ++k)
            $(".u" + (list[k]['value'] + 1)).children(":first").html("Matches: -%");

        for (var i = 0;
            (i < Math.min(10, result.length)) && (tmp_num == num); ++i) {
            let j;
            for (j = 0; list[j]['id'] != result[i]['item']['id']; ++j);
            $(".u" + (list[j]['value'] + 1)).children(":first").html("Matches: " + Math.round(100 - (result[i]['score'] * 100)) + "%");
            /*while ((j > 10) && (tmp_num == num)) {
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
            }*/
            while ((j > i) && (tmp_num == num)) {
                /*$(".u" + list[j]['value']).addClass("go-down");
                $(".u" + (list[j]['value'] + 1)).addClass("go-up");
                await new Promise(r => setTimeout(r, 40));*/
                --j;
                var tmp = $(".u" + list[j + 2]['value']).html();
                $(".u" + list[j + 2]['value']).html($(".u" + list[j + 1]['value']).html());
                $(".u" + list[j + 1]['value']).html(tmp);
                /*$(".u" + list[j + 1]['value']).removeClass("go-down");
                $(".u" + list[j + 2]['value']).removeClass("go-up");*/
                [list[j], list[j + 1]] = [list[j + 1], list[j]];
                [list[j]['value'], list[j + 1]['value']] = [list[j + 1]['value'], list[j]['value']];
            }
            $(".u" + (list[j]['value'] + 1)).removeClass('hide');
            $(".u" + (list[j]['value'] + 1)).addClass('slide');
            setTimeout(function () {
                $(".u" + (list[j]['value'] + 1)).removeClass('slide');
            }, 300);
            await new Promise(r => setTimeout(r, 40));
        }
    }
});
