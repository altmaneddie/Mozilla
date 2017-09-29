function addEvents() {
    $("#ytBtn").on("click", function () {
        alert("got url")
        var urlRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        var gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
        gettingActiveTab.then(function (tabs) {
            tempUrl = tabs[0].url;
            if (urlRegex.test(tempUrl)) {
                browser.tabs.sendMessage(tabs[0].id, { name: "ytA", link: tempUrl });
            } else {
                alert("You are not on a valid Youtube page");
            }
        });
    })
}

function popCreator() {
    $("#myExtApp").append($("<div id='yt'></div>"));
    $("#yt").append($("<input type='button' id='ytBtn' value='Get this video!'>"));
    $("#myExtApp").append($("<div id='writeS'></div>"));
    $("#writeS").append($("<input type='button' id='randomBtn' value='I want to write stuff'>"));

    addEvents();

    browser.storage.local.get("url").then((url) => {
        if (url !== undefined) {
            alert("url exists")
            $("#yt").append($("<input type='button' id='ytPlayBtn' value='Play the Video'>"))
            $("ytPlayBtn").on("click", function () {
                var gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
                gettingActiveTab.then(function (tabs) {
                    browser.tabs.sendMessage(tabs[0].id, { name: "playYt", currentUrl: url });
                });
            })
        }
    })

}

popCreator();