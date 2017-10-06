var ytApp = {
    "position": "fixed",
    "top": "50%",
    "left": "2%",
    "height": "auto",
    "width": "auto",
}
var ytRandomBtn = {
    'display': 'block',
    'width': '100%'
}
function addEventsToRandomBtn() {
    function Event() {
        playYt(3);
    }
    $("#randomBtn").on("click", Event);
}

function vidCreator(id) {
    if (document.getElementById("ytWrapper")) {
        $("#ytWrapper").remove()
        $("#randomBtn").off("click", Event)
    }
    $("body").first().prepend($("<div id='ytWrapper'></div>").css(ytApp));
    $("#ytWrapper").html(`<iframe width="480" height="320" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`);
    $("#ytWrapper").append($('<button type="button" id="randomBtn">Randomize</button>').css(ytRandomBtn));
    addEventsToRandomBtn();
}

function playYt(ind = 0) {
    browser.storage.local.get("ytPL").then((obj) => {
        playList = obj.ytPL;
        nrOfItems = playList.length;
        if (ind !== 0) {
            ind = Math.floor((Math.random() * nrOfItems) + 1)
            item = playList[ind - 1];
            vidCreator(item);
        } else {
            vidCreator(playList[0]);
        }
    })
}

function masterFunction(message, sender, sendResponse) {
    if (message.name === "playYt") {
        playYt();
    }
}

browser.runtime.onMessage.addListener(masterFunction);  