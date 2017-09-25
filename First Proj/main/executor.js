const btn = document.querySelector("#myApp");

btn.addEventListener("click", function () {
    browser.tabs.executeScript(null, {
        file: "../content_scripts/content.js"
    });
    var gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
    gettingActiveTab.then(function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, {method : 'create'});
    });
})