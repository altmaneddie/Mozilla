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
    "bottom": "50%",
    "left": "80%",
    "height": "auto",
    "width": "auto",
}


function getRandom() {
    $("body").append($("<div id='videoD'></div>"));
    $("#videoD").css(containerStyle);
    $("#videoD").append($("<div id='wrapper'></div>")).css(wrapperStyle);
    $("#wrapper").html('<iframe width="1280" height="720" src="https://www.youtube.com/embed/JbepN4dKLbU?autoplay=1" frameborder="0" allowfullscreen></iframe>');
}

function scareIt() {
    $("body").append($("<div id='videoD'></div>"));
    $("#videoD").css(containerStyle);
    $("#videoD").append($("<div id='wrapper'></div>")).css(wrapperStyle);
    $("#wrapper").html('<iframe width="1280" height="720" src="https://www.youtube.com/embed/wWscTmqR-48?start=9;autoplay=1" frameborder="0" allowfullscreen></iframe>');
}

function logIn(a, b) {
    alert("We are sorry, but we are well aware those are not real credentials(the SQL guys are cracking up). And btw, using " + b + " as a password? Really?\n Please register");
    $("body").first().prepend("<form id='register'></form>")
    $("#register").append($("<input type='text' class='registerForm' name='userName' placeholder='Choose a Username'>"))
    $("#register").append($("<input type='text' class='registerForm' name='name' placeholder='Name'>"))
    $("#register").append($("<input type='text' class='registerForm' name='lastName' placeholder='Last Name'>"))
    $("#register").append($("<input type='text' class='registerForm' name='city' placeholder='City'>"))
    $("#register").append($("<input type='text' class='registerForm' name='country' placeholder='Country'>"))
    $("#register").append($("<input type='password' class='registerForm' name='pass' placeholder='Password'>"))
    $("#register").append($("<input type='password' class='registerForm' name='rePass' placeholder='Confirm Password'>"))
    $("#register").append($("<input type='submit' id='submitBtn' value='Submit'>"))

    addEventsToSubmit();
}

function addEventsToSubmit() {
    let dataArr = [];
    $("#submitBtn").on("click", function (e) {
        e.preventDefault();
        let data = document.querySelectorAll(".registerForm");
        if (data.length < 7) {
            alert("Please fill in all fields");
        }

        data.forEach(function (el) {
            console.log(dataArr);
            dataArr.push({
                name: el.name,
                value: el.value
            })
        })
        browser.runtime.sendMessage({ name: "formData", formData: dataArr })
    })
}

function playYoutube(arg) {
    var regex = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = arg.match(regex)
    if (match === null) {
        alert("The the caught youtube URL is not of an accepted format. Try again please")
    } else {
        videoId = match[match.length - 1];
        var ifrm = $(`<iframe width="480" height="240" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`).css(ytApp);
        $("body").first().prepend($("<div id='wrapper'></div>"));
        $("#wrapper").html(ifrm);
    }
}

function masterFunction(message, sender, sendResponse) {
    if (message.name === "bored") {
        getRandom();
    } else if (message.name === "scare") {
        scareIt();
    } else if (message.name === "login") {
        logIn(message.username, message.userpass)
    } else if (message.name === "playYt") {
        playYoutube(message.currentUrl)
    }
}



browser.runtime.onMessage.addListener(masterFunction);