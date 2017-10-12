// Auto-Add button => add current url to playlist.
function addEvents() {
    $("#ytBtn").on("click", function () {
        var urlRegexTester = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        var regexMatcher = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var gettingActiveTab = browser.tabs.query({
            active: true,
            currentWindow: true
        });
        gettingActiveTab.then(function (tabs) {
            newURL = tabs[0].url;
            if (urlRegexTester.test(newURL)) {
                browser.storage.local.get("ytPL").then((playList) => {
                    if (playList.ytPL === undefined) {
                        playList.ytPL = []
                        let currPlayList = playList.ytPL;
                        var match = newURL.match(regexMatcher);
                        currPlayList.push(match[2]);
                        browser.storage.local.set({
                            ytPL: currPlayList
                        });
                    } else {
                        let currPlayList = playList.ytPL;
                        var match = newURL.match(regexMatcher);
                        currPlayList.push(match[2]);
                        browser.storage.local.set({
                            ytPL: currPlayList
                        });
                    }
                })
            } else {
                alert("You are not on a valid Youtube page");
            }
        });
    })
}

// Add button => play video if storage has been changed (so it wont repeat itself and no button will appear when to item is in the playlist)
function playBtn() {
    browser.storage.local.get("ytPL").then((playList) => {
        if (Object.keys(playList).length !== 0) {
            if (playList.ytPL.length !== 0 && $('#ytPlayBtn').length == 0) {
                $("#yt").append($("<input type='button' id='ytPlayBtn' value='Play the Video'>"))
                $("#ytPlayBtn").on("click", function () {
                    var gettingActiveTab = browser.tabs.query({
                        active: true,
                        currentWindow: true
                    });
                    gettingActiveTab.then(function (tabs) {
                        browser.tabs.sendMessage(tabs[0].id, {
                            name: "playYt"
                        });
                    });
                })
            }
        } else {
            browser.storage.local.set({
                ytPL: []
            })
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
    playBtn();
}

popCreator();
browser.storage.onChanged.addListener(playBtn);