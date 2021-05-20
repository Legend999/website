$(document).ready(function () {
    $(".test").click(function () {
        alert("OK");
    });

    $.get("dictionary.umg", function (response) {
        var file = response;
        var splitted = file.split("\n"); //splitted into an array of substring
        console.log(splitted);
    });

    $('#search').keyup(function () {
        console.log($(this).val());
    });
});
