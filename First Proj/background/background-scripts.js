
function getName(request, sender, sendResponse) {
    console.log(request);
    $.get("http://carcompanion.16mb.com/backend/script.php?q=" + request.letter,
        function (data, status) {
            console.log(data);
            if (status == "success") {
                let returnedName = JSON.parse(data).results;
                var gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
                gettingActiveTab.then(function (tabs) {
                    browser.tabs.sendMessage(tabs[0].id, { name: returnedName });
                });
            } else {
                alert(status + ":" + statusText);
            }
        })
}

browser.runtime.onMessage.addListener(getName);