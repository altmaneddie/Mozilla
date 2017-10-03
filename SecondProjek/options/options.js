function addEventsToDisplayedPlaylist() {
    let myNodeList = document.querySelectorAll(".delBtn");
    myNodeList.forEach((el) => {
        el.addEventListener("click", function (e) {
            e.preventDefault;
            index = e.target.id;
            browser.storage.local.get("ytPL").then((playList) => {
                let currPlayList = playList.ytPL;
                currPlayList.splice(index, 1);
                browser.storage.local.set({ ytPL: currPlayList });
                displayPlaylist();
            })
        })
    })
}

function displayPlaylist() {
    browser.storage.local.get("ytPL").then((obj) => {
        var tempPl = obj.ytPL;
        let dispPl = tempPl.map((el, i) => `<li class="vid"><iframe id="${i}" width="320" height="240" src="https://www.youtube.com/embed/${el}" frameborder="0"></iframe><button type="button" class="delBtn" id="${i}">Delete video</button></li>`).join('');
        $("#listWrapper").html(dispPl);
        addEventsToDisplayedPlaylist();
    })
}

function addURL() {
    let newURL = $("#addVidText").val();
    const urlRegexTester = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    const regexMatcher = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    if (urlRegexTester.test(newURL)) {
        browser.storage.local.get("ytPL").then((playList) => {
            if (playList.ytPL === undefined) {
                playList.ytPL = []
                let currPlayList = playList.ytPL;
                var match = newURL.match(regexMatcher);
                currPlayList.push(match[2]);
                browser.storage.local.set({ ytPL: currPlayList });
            } else {
                let currPlayList = playList.ytPL;
                var match = newURL.match(regexMatcher);
                currPlayList.push(match[2]);
                browser.storage.local.set({ ytPL: currPlayList });
                displayPlaylist();
            }
        })
    } else {
        alert("That is not a valid Youtube URL");
    }
}

$("#addVidBtn").on("click", addURL);

browser.storage.onChanged.addListener(displayPlaylist);
displayPlaylist();