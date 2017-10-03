var containerStyle = {
    "position": "fixed",
    "top": "0",
    "left": "0",
    "height": "100%",
    "width": "100%",
    "background-color": "rgba(0,0,0,0.8)"
}

var ytWrapperStyle = {
    "position": "fixed",
    "top": "50%",
    "left": "50%",
    "height": "auto",
    "width": "auto",
    "-webkit-transform": "translate(-50%,-50%)",
    "-moz-transform": "translate(-50%,-50%)",
    "-ms-transform": "translate(-50%,-50%)",
    "-o-transform": "translate(-50%,-50%)",
    "transform": "translate(-50%,-50%)"
}

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
        console.log("im in the vidcreator if")
        $("#ytWrapper").remove()
        $("#randomBtn").off("click", Event)
    }
    console.log("im after the vidcreator if")
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
            console.log("1st if")            
        } else {
            console.log("2nd if")     
            vidCreator(playList[0]);
        }
    })
}

function masterFunction(message, sender, sendResponse) {
    if (message.name === "playYt") {
        console.log("master function");
        playYt();
    }
}

browser.runtime.onMessage.addListener(masterFunction);  