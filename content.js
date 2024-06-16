var pgnCurrent = "";

// https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
// Waits for an element to show up using the Promise constructor 
// Takes in an input of an element
function elementWait(selector) {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver((mutations) => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

// Creates the button in the chess.com
async function createButtonInPopup() {
    const reviewButtonsComponent = await elementWait('.game-review-buttons-component');
    var button = document.createElement("button");
    var iconSpan = document.createElement("span");
    var labelSpan = document.createElement("span");

    button.setAttribute("type", "button");
    button.setAttribute("aria-label", "Lichess Import");
    button.setAttribute("data-click-spam-id", "7");

    iconSpan.setAttribute("aria-hidden", "true");

    labelSpan.textContent = "Lichess Import";

    button.classList.add("ui_v5-button-component", "ui_v5-button-basic");
    iconSpan.classList.add("ui_v5-button-icon", "icon-font-chess", "chess-board-search");
    labelSpan.classList.add("new-game-buttons-label");

    button.appendChild(iconSpan);
    button.appendChild(labelSpan);

    button.addEventListener("click", async function () {
        pgn = grabPGN();
        openLichess();
        lichessImport(pgn);
    });

    reviewButtonsComponent.appendChild(button);
    console.log("Button was generated");
}

// Takes the pgn from the chess game
async function grabPGN() {
    var pgn = "";
    (await elementWait("button.share")).click();
    (await elementWait(".share-menu-tab-selector-component .share-menu-tab-selector-tab")).click();
    pgn = (await elementWait("textarea[name=pgn]")).value;
    (await elementWait('#share-modal button[aria-label="Close"]')).click();
    if (pgn != "") {
        pgnFound = true;
    }

    chrome.storage.sync.set({ "pgnKey": pgn }, function () {
        console.log(`PGN was added\n${pgn}`);
    });

    return pgn;
}

// Opening Lichess
async function openLichess() {
    window.open('https://lichess.org/analysis', '_blank');
}

// Importing the pgn to the lichess
async function lichessImport() {
    const analysisChess = document.getElementById('analyse-toggle-ceval');
    if (analysisChess) {
        const changeEvent = new Event('change', { bubbles: true });
        analysisChess.dispatchEvent(changeEvent);
    }
    var pgnTextarea = document.querySelector('.copyables .pgn .pair .copyable');

    chrome.storage.sync.get(['pgnKey'], function (result) {
        pgnTextarea.value = result.pgnKey;
        console.log(pgnTextarea.value);
        (document.querySelector(".copyables .pgn .pair .button")).click();
    });
    
    console.log("Button was clicked");
    chrome.storage.sync.remove("pgnKey", function () {
        console.log("Removed pgn");
    });
}

// Listeners to recieve messages from background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "createButton") {
        createButtonInPopup();
    }
    if (message.action === "updatePGN") {
        lichessImport();
    }
});