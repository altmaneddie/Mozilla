function masterFunction(message, sender, sendResponse) {
    if (message.hasOwnProperty(formData) && message.hasOwnProperty(name) && message.name === "formdata") {
        dataValidator(message.formData);
    } else if (message.hasOwnProperty("name")) {
        browser.storage.local.get("ytPL").then((url) => {
            if (message.name === "ytA") {
                url.push(message.link);
            } else if (message.name === "ytR") {
                var ind = url.indexOf(message.link)
                if (ind > -1) {
                    url.splice(i, 1);
                    browser.storage.local.set({ ytPL: url });
                }
            }
        }
        )
    }
}


browser.runtime.onMessage.addListener(masterFunction);
