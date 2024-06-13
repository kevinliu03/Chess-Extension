// Checks if the website is correct, if so then it sents a message depending on the website
var previousUrl = "";

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        console.log("Tab updated:", tab.url);
        console.log(tab.url);
        if (tab.url.startsWith("https://www.chess.com/game/")) {
            chrome.tabs.sendMessage(tabId, { action: "createButton" });
        }
        if (tab.url.startsWith("https://lichess.org/analysis")) {
            if (!previousUrl.startsWith("https://lichess.org/analysis")) {
                chrome.tabs.sendMessage(tabId, { action: "updatePGN" });
            } else {
                console.log("Same website");
            }
        }
        previousUrl = tab.url;
    }
});
