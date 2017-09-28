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
    $("#myExtApp").append($("<div id='writeStuff'></div>"));
    $("#writeStuff").append($("<input type='button' id='writeBtn' value='I think i wanna write stuff down'>"));

    addEvents();
}

popCreator();