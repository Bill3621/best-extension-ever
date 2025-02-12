console.log("Hello from content.js");

function getRandomPosition(element) {
    const x = Math.floor(
        Math.random() *
            (document.documentElement.scrollWidth - element.clientWidth - 5)
    );
    const y = Math.floor(
        Math.random() *
            (document.documentElement.scrollHeight - element.clientHeight - 5)
    );
    return { x, y };
}

function addRandomImage() {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.zIndex = 999999;

    const img = document.createElement("img");
    img.style.display = "hidden";
    const randomSize = Math.floor(Math.random() * (30 - 15 + 1)) + 15; // Random size between 15 and 30
    img.style.maxWidth = `${randomSize}vw`; // Set random max width
    img.style.height = "auto"; // Maintain aspect ratio

    const closeButton = document.createElement("button");
    closeButton.innerText = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "0";
    closeButton.style.right = "0";
    closeButton.style.backgroundColor = "red";
    closeButton.style.color = "white";
    closeButton.style.border = "1px solid black"; // Add border for visibility
    closeButton.style.outline = "1px solid black"; // Add outline for visibility
    closeButton.style.cursor = "pointer";
    closeButton.style.zIndex = 999999 + 1; // Ensure the button is above the image
    closeButton.style.fontSize = "16px"; // Increase button size
    closeButton.style.padding = "5px"; // Increase button padding
    closeButton.addEventListener("click", () => {
        document.body.removeChild(container);
    });

    container.appendChild(img);
    container.appendChild(closeButton);
    document.body.appendChild(container); // Append to body before calculating position

    img.onload = function () {
        const { x, y } = getRandomPosition(container);
        container.style.left = `${x}px`;
        container.style.top = `${y}px`;
        img.style.display = "block";
    };

    img.src = chrome.runtime.getURL(
        `images/collection/image${Math.floor(Math.random() * 20)}.png`
    );
}

function startRandomImageTimer() {
    const randomTime =
        Math.floor(Math.random() * (5 * 60 * 1000)) + 1 * 60 * 1000; // Random time between 1 to 5 minutes
    setTimeout(() => {
        addRandomImage();
        startRandomImageTimer();
    }, randomTime);
}

chrome.storage.sync.get(["toggleState"], function (result) {
    if (result.toggleState) {
        addRandomImage();
        startRandomImageTimer();
    }
});
