function appStarter() {
    var gettingActiveTab = browser.tabs.query({
        active: true,
        currentWindow: true
    });
    gettingActiveTab.then(function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            name: "playYt"
        });
    })
}

let appStart = document.querySelector("#appStart");

appStart.addEventListener("click", appStarter);