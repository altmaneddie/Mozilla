var containerStyle = {
    "position": "fixed",
    "top": "0",
    "left": "0",
    "height": "100%",
    "width": "100%",
    "background-color": "rgba(0,0,0,0.8)"
}

var wrapperStyle = {
    "position": "fixed",
    "top": "50%",
    "left": "50%",
    "height": "auto",
    "width": "auto",
    "-webkit-transform": "translate(-50%,-50%)",
    "-moz-transform": "translate(-50%,-50%)",
    "-ms-transform": "translate(-50%,-50%)",
    "-o-transform": "translate(-50%,-50%)",
    "transform": "translate(-50%,-50%)"
}

var ytApp = {
    "position": "fixed",
    "top": "50%",
    "left": "80%",
    "height": "auto",
    "width": "auto",
}

function playYt() {
    browser.storage.local.get("url").then((url) => {
        alert(url);
        var regex = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regex)
        $("body").append($("<div id='wrapper'></div>")).css(ytApp);
        $("#wrapper").html(`<iframe width="480" height="320" src="https://www.youtube.com/embed/${match}" frameborder="0" allowfullscreen></iframe>`);

    })
}

function masterFunction(message, sender, sendResponse) {
    if (message.name === "playYt") {
        playYt();
    }
}



browser.runtime.onMessage.addListener(masterFunction);