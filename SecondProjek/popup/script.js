// Auto-Add button => add current url to playlist.
function addEvents() {
    $("#ytBtn").on("click", function () {
        var urlRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        var gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
        gettingActiveTab.then(function (tabs) {
            tempUrl = tabs[0].url;
            if (urlRegex.test(tempUrl)) {
                browser.storage.local.get("ytPL").then((playList) => {
                    let currPlayList = playList.ytPL;
                    currPlayList.push(tempUrl);
                    browser.storage.local.set({ ytPL: currPlayList });
                })
            } else {
                alert("You are not on a valid Youtube page");
            }
        });
    })
}

// Add button => play video if storage has been changed and playlist length is 1 (so it wont repeat itself and no button will appear when to item is in the playlist)
function playBtn() {
    browser.storage.local.get().then((url) => {
        if (Object.keys(url).length !== 0) {
            if (url.ytPL.length !== 0 && url.ytPL.length < 2) {
                $("#yt").append($("<input type='button' id='ytPlayBtn' value='Play the Video'>"))
                $("ytPlayBtn").on("click", function () {
                    var gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
                    gettingActiveTab.then(function (tabs) {
                        browser.tabs.sendMessage(tabs[0].id, { name: "playYt", currentUrl: url });
                    });
                })
            }
        } else {
            browser.storage.local.set({ ytPL: [] })
        }
    })
}

// Auto Fct => adds all elements to the pop-up
function popCreator() {
    $("#myExtApp").append($("<div id='yt'></div>"));
    $("#yt").append($("<input type='button' id='ytBtn' value='Get this video!'>"));
    $("#myExtApp").append($("<div id='writeS'></div>"));
    $("#writeS").append($("<input type='button' id='randomBtn' value='I want to write stuff'>"));

    addEvents();
}

popCreator();
browser.storage.onChanged.addListener(playBtn);