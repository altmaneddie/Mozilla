function onYouTubeApiLoad() {
    console.log("api received");
}

function playYt() {
    $("body").first().prepend($("<div id='ytWrapper'></div>"));
    $("#ytWrapper").html(`<iframe id="tehVideo" src="https://www.youtube.com/watch?v=EtRlNd3dYbw" frameborder="0" allowfullscreen></iframe>`);
    $("#ytWrapper").append($('<button type="button" id="randomBtn">Randomize</button>'));

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    onYouTubeApiLoad();
}



function masterFunction(message, sender, sendResponse) {
    if (message.name === "playYt") {
        playYt();
    }
}

browser.runtime.onMessage.addListener(masterFunction);


let key = "AIzaSyBiP7J4BatJPBQtLlk8b1yM9STPexFafVI";