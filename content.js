console.log("Hello from content.js");

function getRandomPosition(element) {
    const x = Math.floor(
        Math.random() * (window.innerWidth - element.clientWidth)
    );
    const y = Math.floor(
        Math.random() * (window.innerHeight - element.clientHeight)
    );
    return { x, y };
}

function addRandomImage() {
    const img = document.createElement("img");
    img.src = `images/collection/image${
        Math.floor(Math.random() * 10) + 1
    }.jpg`; // Assuming there are 10 images named image1.jpg to image10.jpg
    img.style.position = "absolute";
    img.style.zIndex = 1000;

    const closeButton = document.createElement("button");
    closeButton.innerText = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "0";
    closeButton.style.right = "0";
    closeButton.style.backgroundColor = "red";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.cursor = "pointer";
    closeButton.addEventListener("click", () => {
        document.body.removeChild(img);
    });

    img.appendChild(closeButton);
    document.body.appendChild(img);

    const { x, y } = getRandomPosition(img);
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
}

function startRandomImageTimer() {
    const randomTime =
        Math.floor(Math.random() * (5 * 60 * 1000)) + 1 * 60 * 1000; // Random time between 1 to 5 minutes
    setTimeout(() => {
        addRandomImage();
        startRandomImageTimer();
    }, randomTime);
}

startRandomImageTimer();
