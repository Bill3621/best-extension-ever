document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("toggle-switch");
    const intervalTimeInput = document.getElementById("interval-time");

    chrome.storage.sync.get(["toggleState", "intervalTime"], function (result) {
        toggleSwitch.checked = result.toggleState || false;
        intervalTimeInput.value = result.intervalTime || 1;
    });

    toggleSwitch.addEventListener("change", function () {
        chrome.storage.sync.set({ toggleState: toggleSwitch.checked });
    });

    intervalTimeInput.addEventListener("change", function () {
        chrome.storage.sync.set({ intervalTime: intervalTimeInput.value });
    });
});
