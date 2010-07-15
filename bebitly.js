var urls = ["http://dirolf.com",
            "http://www.mongodb.org",
            "http://loudonvillelongboards.com",
            "http://www.google.com",
            "http://bit.ly"];
var hashes = [];
var shorts = {};
var longs = {};
var current_url;
var current_hash;

function opt(url) {
    return "<a href='#' onclick='javascript:handle_long(\"" + url + "\")'>" + url + "</a><br>";
}

function lengthen () {
    $("#options").show();
    $("#options").html("");
    $("#text").hide();
    current_hash = hashes[Math.floor(Math.random() * hashes.length)];
    current_url = null;
    $("#help").html("Unshorten this:");
    $("#url").html(current_hash);

    var answer = longs[current_hash];
    var alt1 = answer;
    while (alt1 === answer) {
        alt1 = urls[Math.floor(Math.random() * urls.length)];
    }
    var alt2 = answer;
    while (alt2 === answer || alt2 === alt1) {
        alt2 = urls[Math.floor(Math.random() * urls.length)];
    }
    var options = [opt(answer),
                   opt(alt1),
                   opt(alt2)];
    options.sort(function() { return 0.5 - Math.random(); });
    options.forEach(function(o) {
                        $("#options").append(o);
                    });
}

function shorten () {
    $("#options").hide();
    $("#text").show().focus();
    current_url = urls[Math.floor(Math.random() * urls.length)];
    current_hash = null;
    $("#help").html("Shorten this:");
    $("#url").html(current_url);
}

function task () {
    var r = Math.random();
    if (hashes.length === 0 || r < 0.5) {
        shorten();
    } else {
        lengthen();
    }
}

function handle_short (text) {
    if (!shorts[current_url]) {
        if (!longs[text]) {
            hashes.push(text);
            shorts[current_url] = text;
            longs[text] = current_url;
            task();
        } else {
            alert("repeat hash!");
        }
    } else if (text === shorts[current_url]) {
        task();
    } else {
        alert("wrong hash!");
    }
}

function handle_long (text) {
    if (text === longs[current_hash]) {
        task();
    } else {
        alert("wrong url!");
    }
}

function handle_text (e) {
    if (e.which == 13) {
        var text = $.trim($("#text").val());
        if (!text) {
            return true;
        }
        $("#text").val("");

        if (current_url) {
            handle_short(text);
        } else {
            handle_long(text);
        }
        return false;
    }
    return true;
}

function init () {
    $("#text").keyup(handle_text);
    task();
}

$(document).ready(init);
