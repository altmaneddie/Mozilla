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

function addStylingToVid(id) {
    let myVid = $("#tehVideo");
    let myWrapper = $("#ytWrapper");

    var ytApp = {
        "position": "fixed",
        "height": "auto",
        "width": "auto",
        "z-index": "9999"
    }

    browser.storage.local.get("options").then((opt) => {
        console.log(opt.options.hposition, opt.options.vposition);
        console.log(opt);
        switch (opt.options.hposition) {
            case "Left":
                ytApp.left = "2%";
                break;
            case "Right":
                ytApp.right = "2%";
                break;
            default:
                ytApp.left = "2%";
        }
        console.log(ytApp);

        switch (opt.options.vposition) {
            case "Top":
                ytApp.top = "15%";
                break;
            case "Middle":
                ytApp.top = "35%";
                break;
            case "Lower":
                ytApp.top = "50%";
                break;
            case "Bottom":
                ytApp.top = "85%";
                break;
            default:
                ytApp.top = "50%";
        }
        console.log(ytApp);
        switch (opt.options.size) {
            case "240p":
                $(myVid).attr({
                    width: "426",
                    height: "240",
                });
                break;
            case "360p":
                $(myVid).attr({
                    width: "480",
                    height: "360",
                });
                break;
            case "480p":
                $(myVid).attr({
                    width: "640",
                    height: "480",
                });
                break;
            case "720p":
                $(myVid).attr({
                    width: "1280",
                    height: "720",
                });
                break;
            default:
                $(myVid).attr({
                    width: "480",
                    height: "360",
                });
        }
    })
    $(myWrapper).css(ytApp);
    $(myVid).attr("src", `https://www.youtube.com/embed/${id}`)

}

function vidCreator(id) {
    if (document.getElementById("ytWrapper")) {
        $("#ytWrapper").remove()
        $("#randomBtn").off("click", Event)
    }
    $("body").first().prepend($("<div id='ytWrapper'></div>"));
    $("#ytWrapper").html(`<iframe id="tehVideo" frameborder="0" allowfullscreen></iframe>`);
    $("#ytWrapper").append($('<button type="button" id="randomBtn">Randomize</button>').css(ytRandomBtn));
    addStylingToVid(id);
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