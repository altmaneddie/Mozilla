function generateInput() {
    let div = $("<div id='myAppDiv'></div>");
    let sibling = $("body").first();
    sibling.prepend(div);
    sibling.prepend($("<div id='externalContent'></div>"));
    $(div).css("margin-top", "100px");
    inputText = div.append("<input type='text' id='inputName'>");
    inputBtn = div.append("<button type='button' id='inputBtn' placeholder='push me!'>");
    // addInputEvent(inputBtn, inputText);
    addInputEvent();
}

function addInputEvent(a, b) {
    $("#inputBtn").on("click", function () {
        browser.runtime.sendMessage({ letter: $("#inputName").val() });
    });
}
// function addInputEvent(a, b) {
//     a.on("click", function () {
//         browser.runtime.sendMessage({ letter: b.val() });
//     });
// }

function masterFunction(request, sender, sendResponse) {
    if (request.hasOwnProperty('method') && request.method === 'create') {
        browser.runtime.onMessage.removeListener(masterFunction);
        generateInput()
    } else if (request.hasOwnProperty('name')) {
        let textWrapper = $("<span style='color:white'></span>");
        $("#externalContent").html(request.name);
        
        // textWrapper.html(request.name);
    }
}
$("#externalContent").insertAdjacentHTML("alert('XSS')");
browser.runtime.onMessage.addListener(masterFunction);
