function dataValidator(arr) {
    if(arr.pass !== arr.rePass){
        var gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
        gettingActiveTab.then(function (tabs) {
            browser.tabs.sendMessage(tabs[0].id, { name: "error", error: "Password and Password confirmation are different" });
        });
    }
}


function masterFunction(message, sender, sendResponse) {
    if (message.hasOwnProperty(formData) && message.hasOwnProperty(name) && message.name === "formdata") {
        dataValidator(message.formData);
    }
}


browser.runtime.onMessage.addListener(masterFunction);
