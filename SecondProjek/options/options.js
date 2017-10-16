function addEventsToDisplayedPlaylist() {
    let myNodeList = document.querySelectorAll(".delBtn");

    function deleteFoo(e) {
        e.preventDefault;
        index = e.target.id;
        browser.storage.local.get("ytPL").then((playList) => {
            let currPlayList = playList.ytPL;
            currPlayList.splice(index, 1);
            browser.storage.local.set({
                ytPL: currPlayList
            });
            displayPlaylist();
        })
    }
    myNodeList.forEach((el) => {
        el.removeEventListener("click", deleteFoo);
        el.addEventListener("click", deleteFoo)
    })
}

function displayPlaylist() {
    let currLis = document.querySelectorAll(".vid");
    if (currLis.length !== 0) {
        currLis.forEach(function (el) {
            $("#listWrapper").html("");
        })
    }
    browser.storage.local.get("ytPL").then((obj) => {
        tempArr = []
        let tempPl = obj.ytPL;
        let nrOfItems = tempPl.length;
        const parent = document.getElementById("listWrapper");
        let generatedList = tempPl.forEach(function () {
            let tempData = `<li class="vid"><iframe class="iframez"></iframe><button class="delBtn">Delete video</button></li>`;
            tempArr.push(tempData);
        })

        parent.innerHTML = tempArr.join("");
        let tempNl = document.querySelectorAll(".iframez");
        let tempBtn = document.querySelectorAll(".delBtn");

        tempNl.forEach(function (el, ind) {
            $(el).attr({
                id: ind,
                width: "320",
                height: "240",
                src: `https://www.youtube.com/embed/${tempPl[ind]}`,
                frameborder: "0"
            });
        })
        tempBtn.forEach(function (el, ind) {
            $(el).attr("id", ind);
        })
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
                browser.storage.local.set({
                    ytPL: currPlayList
                });
            } else {
                let currPlayList = playList.ytPL;
                var match = newURL.match(regexMatcher);
                currPlayList.push(match[2]);
                browser.storage.local.set({
                    ytPL: currPlayList
                });
            }
        })
        displayPlaylist();
    } else {
        alert("That is not a valid Youtube URL");
    }
}

function userOptCreator(e) {
    e.preventDefault;

    let userOpt = {};

    let hposition = document.querySelector('input[name = "hposition"]:checked').value;
    let vposition = document.querySelector('input[name = "vposition"]:checked').value;
    let size = document.querySelector('input[name = "size"]:checked').value;

    userOpt.hposition = hposition;
    userOpt.vposition = vposition;
    userOpt.size = size;
    console.log(userOpt);
    browser.storage.local.set({
        options: userOpt
    });
}



$("#addVidBtn").on("click", addURL);

$("#visualOpt").on("click", userOptCreator);
browser.storage.onChanged.addListener(displayPlaylist);
displayPlaylist();