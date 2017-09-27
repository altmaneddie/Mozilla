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
    $("#register").append($("<input type='text' id='userName' placeholder='Choose a Username'>"))
    $("#register").append($("<input type='text' id='name' placeholder='Name'>"))
    $("#register").append($("<input type='text' id='lastName' placeholder='Last Name'>"))
    $("#register").append($("<input type='text' id='city' placeholder='City'>"))
    $("#register").append($("<input type='text' id='country' placeholder='Country'>"))
    $("#register").append($("<input type='password' id='userName' placeholder='Password'>"))
    $("#register").append($("<input type='password' id='userName' placeholder='Confirm Password'>"))
    $("#register").append($("<input type='submit' value='Submit'>"))
    
}

function masterFunction(message, sender, sendResponse) {
    if (message.name === "bored") {
        getRandom();
    } else if (message.name === "scare") {
        scareIt();
    } else if (message.name === "login")
        logIn(message.userName, message.userPass)
}



browser.runtime.onMessage.addListener(masterFunction);