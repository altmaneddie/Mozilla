function playYt(){
    $("body").first().prepend($("<div id='ytWrapper'></div>"));
    $("#ytWrapper").html(`<iframe id="tehVideo" src="https://www.youtube.com/watch?v=EtRlNd3dYbw" frameborder="0" allowfullscreen></iframe>`);
    $("#ytWrapper").append($('<button type="button" id="randomBtn">Randomize</button>'));
}

function masterFunction(message, sender, sendResponse) {
    if (message.name === "playYt") {
        playYt();
    }
}

browser.runtime.onMessage.addListener(masterFunction);