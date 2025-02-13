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

function addRandomImage(imageUrl) {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.zIndex = 999999;
    container.style.left = `-1000px`;
    container.style.top = `-1000px`;

    const img = document.createElement("img");
    img.style.display = "block";
    const randomSize = Math.floor(Math.random() * (30 - 15 + 1)) + 15; // Random size between 15 and 30
    img.style.maxWidth = `${randomSize}vw`; // Set random max width
    img.style.height = "auto"; // Maintain aspect ratio

    const closeButton = document.createElement("button");
    closeButton.innerText = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "0";
    closeButton.style.right = "0";
    closeButton.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "50%";
    closeButton.style.width = "30px";
    closeButton.style.height = "30px";
    closeButton.style.display = "flex";
    closeButton.style.alignItems = "center";
    closeButton.style.justifyContent = "center";
    closeButton.style.cursor = "pointer";
    closeButton.style.zIndex = 999999 + 1;
    closeButton.style.fontSize = "16px";
    closeButton.style.padding = "0";
    closeButton.addEventListener("click", () => {
        document.body.removeChild(container);
    });

    container.appendChild(img);
    container.appendChild(closeButton);
    document.body.appendChild(container);

    img.onload = function () {
        const { x, y } = getRandomPosition(container);
        container.style.left = `${x}px`;
        container.style.top = `${y}px`;
        container.style.display = "block";
    };

    img.src = imageUrl;
}

function fetchRandomImage() {
    fetch(
        "https://e621.net/posts.json?tags=femboy+crossdressing+male+fur+-human+rating%3As+order%3Arandom+-animated+-comic+limit%3A1+status%3Aactive+score%3A>15"
    )
        .then((response) => response.json())
        .then((data) => {
            const imageUrl = data.posts[0].file.url;
            addRandomImage(imageUrl);
        })
        .catch((error) => console.error("Error fetching image:", error));
}

function startRandomImageTimer(intervalTime) {
    const randomTime =
        Math.floor(Math.random() * (intervalTime * 60 * 1000)) + 1 * 60 * 1000; // Random time between 1 minute and intervalTime minutes
    setTimeout(() => {
        fetchRandomImage();
        startRandomImageTimer(intervalTime);
    }, randomTime);
}

chrome.storage.sync.get(["toggleState", "intervalTime"], function (result) {
    if (result.toggleState) {
        const intervalTime = result.intervalTime || 1;
        startRandomImageTimer(intervalTime);
    }
});
