
browser.storage.local.get("ytPL").then((playList) => {})

$("body").first().prepend($("<div id='ytWrapper'></div>").css(ytApp));
$("#ytWrapper").html(`<iframe width="320" height="240" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`);
$("#ytWrapper").append($('<button type="button" id="randomBtn">Randomize</button>').css(ytRandomBtn));


<iframe id="tehVideo" width="320" height="240" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>