document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("toggle-switch");
    const savedState = localStorage.getItem("toggleState") === "true";
    toggleSwitch.checked = savedState;

    toggleSwitch.addEventListener("change", function () {
        localStorage.setItem("toggleState", toggleSwitch.checked);
    });
});
