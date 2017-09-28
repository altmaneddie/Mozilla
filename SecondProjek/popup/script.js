function addEvents() {
    $("#randomBtn").on("click", function () {
        var gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
        gettingActiveTab.then(function (tabs) {
            browser.tabs.sendMessage(tabs[0].id, { name: "bored" });
        });
    })
    $("#scareBtn").on("click", function () {
        var gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
        gettingActiveTab.then(function (tabs) {
            browser.tabs.sendMessage(tabs[0].id, { name: "scare" });
        });
    })
    $("#nameBtn").on("click", function () {
        let x = $("#userName").val();
        let y = $("#userPass").val();
        var gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
        gettingActiveTab.then(function (tabs) {
            browser.tabs.sendMessage(tabs[0].id, { name: "login", username: x, password: y });
        });
    })

    $("#ytBtn").on("click", function () {
        alert("got url")
        var urlRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        var gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
        gettingActiveTab.then(function (tabs) {
            tempUrl = tabs[0].url;
            if (urlRegex.test(tempUrl)) {
                browser.storage.local.set({ url: tempUrl });
                browser.tabs.sendMessage(tabs[0].id, { name: "yt" });
            } else {
                alert("You are not on a valid Youtube page");
            }
        });
    })
}

function popCreator() {
    $("#myExtApp").append($("<div id='random'></div>"));
    $("#random").append($("<input type='button' id='randomBtn' value='Meme it up boys!'>"));
    $("#myExtApp").append($("<div id='scareMe'></div>"));
    $("#scareMe").append($("<input type='button' id='scareBtn' value='Ohhh please God! Wake me up!'>"));
    $("#myExtApp").append($("<div id='logIn'></div>"));
    $("#logIn").append($("<input type='text' id='userName' placeholder='Facebook Username'>"));
    $("#logIn").append($("<input type='password' id='userPass' placeholder='Password'>"));
    $("#logIn").append($("<input type='button' id='nameBtn' value='I&#39;m not sure I should trust this'>"));
    $("#myExtApp").append($("<div id='yt'></div>"));
    $("#yt").append($("<input type='button' id='ytBtn' value='Get this video!'>"));
    $("#myExtApp").append($("<div id='writeS'></div>"));
    $("#writeS").append($("<input type='button' id='randomBtn' value='I want to write stuff'>"));

    addEvents();

    browser.storage.local.get(url).then((url) => {
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