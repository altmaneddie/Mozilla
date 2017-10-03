// function masterFunction(message, sender, sendResponse) {
//     if (message.hasOwnProperty("name")) {
//         console.log("entered if");
//         browser.storage.local.get("ytPL").then((url) => {
//             if (message.name === "ytA") {
//                 console.log("entered second if");
//                 url.push(message.link);
//             } else if (message.name === "ytR") {
//                 var ind = url.indexOf(message.link)
//                 if (ind > -1) {
//                     url.splice(i, 1);
//                     browser.storage.local.set({ ytPL: url });
//                 }
//             }
//         }
//         )
//     }
// }


// browser.runtime.onMessage.addListener(backgroundFunction);
