document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("toggle-switch");
    chrome.storage.sync.get(["toggleState"], function (result) {
        toggleSwitch.checked = result.toggleState || false;
    });

    toggleSwitch.addEventListener("change", function () {
        chrome.storage.sync.set({ toggleState: toggleSwitch.checked });
    });
});
