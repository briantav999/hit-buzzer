const outputTextElement = document.querySelector('#text-output');
const outputScreenElement = document.querySelector('#screen')
const buttonElement = document.querySelector('#button');
const invCookies = document.querySelector('#cookie-list');
const playerHpElement = document.querySelector('#player-hp');
const outputElement = document.querySelector('#output');
const consumeElement = document.querySelector("#consumer")
const cookiesAvailable = ['chocolate', 'oatmeal', 'macademia', 'vanilla', 'chocolatechip'];
const cookieImages = {
    chocolate: "https://media.istockphoto.com/id/1046582724/photo/close-up-image-of-soft-baked-dark-chocolate-cookies.jpg?s=612x612&w=0&k=20&c=jeP79ypxgj3s7oiMpdrHFpShzUMAJemxh9Je2LzfMKA=",
    vanilla: "https://media.istockphoto.com/id/1270135720/photo/vanilla-wafer-stack.jpg?s=1024x1024&w=is&k=20&c=9U4ZL3J6M9sg2Dd7XLKzVV8n1WsbLGztx7lcArBMsOw=",
    oatmeal: "https://media.istockphoto.com/id/1089728238/photo/oatmeal-cookies-with-glass-of-milk.jpg?s=612x612&w=0&k=20&c=TrtPGRyDrUBaw21iae_YhqYro9zdARDnlpuv7KPb6-I=",
    chocolatechip: "https://media.istockphoto.com/id/517109442/photo/chocolate-chip-cookie-isolated.jpg?s=612x612&w=0&k=20&c=RgZOYwzVRTXnIBy8zSkXK-wJfNBy9w023UGULkbH_VE=",
    macademia: "https://media.istockphoto.com/id/175535621/photo/macadamia-nut-and-white-chocolate-cookies.jpg?s=612x612&w=0&k=20&c=Sujp59JmfNkjHGUgQ3iIBGwhQk3TejJJyvfyA3vPznY="
}
const player = {
    hp: 3,
    inventory: [],
};
let firstTurn = true; // Flag to track if it's the first turn

function consumeCookie() {
    if (player.inventory.length === 0) {
        outputTextElement.innerHTML = "You don't have any cookies to consume!";
    } else {
        // Remove the last cookie from the inventory
        const consumedCookie = player.inventory.pop();
        if (!firstTurn) {
            outputTextElement.innerHTML = `You consumed a ${consumedCookie} cookie!`;
        }
    }
    firstTurn = false; // Update the flag after the first turn
}

// Add event listener for the consume button
consumeElement.addEventListener("click", consumeCookie);
  

function randomCookie() {
    const randomIndex = Math.floor(Math.random() * cookiesAvailable.length);
    return cookiesAvailable[randomIndex];
}

function clickHandler() {
    if (outputTextElement.innerHTML.includes('You got a Cookie!') && (player.hp > 0)) {
        outputTextElement.innerHTML = "try again!";
    } else if (player.hp <= 0) {
        player.hp = 0;
        outputTextElement.innerHTML = `Oh no!<br><br>You lost!!`;
    } else if(outputTextElement.innerHTML.includes("Oh no!") || (outputTextElement.innerHTML.includes('Congratulations!'))){
        
    }
    else {
        const cookie = randomCookie();
        const img = document.createElement("img");
        img.src = cookieImages[cookie];
        outputTextElement.innerHTML = `You got a Cookie!<br><br>${cookie}`;
        outputTextElement.appendChild(img); 
        addToInventory(cookie);
    }

    if (checkSameCookieCount(player.inventory) >= 3) {
        outputTextElement.innerHTML = `Congratulations!<br><br>You won!!`;
    }
}

function addToInventory(cookie) {
    player.inventory.push(cookie);
    const listItem = document.createElement('li');
    listItem.innerHTML = cookie;
    invCookies.appendChild(listItem);

    if (cookie === 'macademia') {
        player.hp--;
        playerHpElement.textContent = `HP: ${player.hp}`; // Update HP display
    }
}
function checkSameCookieCount(inventory) {
    const cookieCounts = {};
    let maxCount = 0;

    for (const cookie of inventory) {
        cookieCounts[cookie] = (cookieCounts[cookie] || 0) + 1;
        maxCount = Math.max(maxCount, cookieCounts[cookie]);
    }

    return maxCount;
}
buttonElement.addEventListener('click', clickHandler);
