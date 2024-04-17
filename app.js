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
let hasConsumedCookie = false;




function consumeCookie() {
    // checks to see if inventory has any cookies that can be consumed
    if (player.inventory.length === 0) {
        outputTextElement.innerHTML = "You don't have any cookies to consume!";
        // checks to see if the player has already consumed a cookie this turn
    } else if (hasConsumedCookie) {
        outputTextElement.innerHTML = "You've already consumed a cookie this turn!";
        // checks to see if last entered cookie was a macadamia cookie
    } else if (player.inventory[player.inventory.length - 1] === 'macademia') {
        outputTextElement.innerHTML = "You cannot consume a macadamia cookie!"
    } else {
        // Regular cookie consumption
        const consumedCookie = player.inventory.pop();
        // removes last cookie from oven display
        invCookies.removeChild(invCookies.lastChild);
        const crunchSound = document.getElementById('crunch-sound');
        crunchSound.play();
        player.hp++;
        playerHpElement.textContent = `HP: ${player.hp}`;
        outputTextElement.innerHTML = `You consumed a ${consumedCookie} cookie!`;
        
        hasConsumedCookie = true; // Update the flag after consuming a cookie
    }
    firstTurn = false; // Update the flag after the first turn
}




// Add event listener for the consume button
consumeElement.addEventListener("click", consumeCookie);
  
// function to get random cookie
function randomCookie() {
    const randomIndex = Math.floor(Math.random() * cookiesAvailable.length);
    return cookiesAvailable[randomIndex];
}

function clickHandler() {
    // checks to see if player lost , if not prompts the user to keep playing
    if (outputTextElement.innerHTML.includes('You got a Cookie!') && (player.hp > 0)) {
        outputTextElement.innerHTML = "try again!";
    } else if (player.hp <= 0) {
        player.hp = 0;
        outputTextElement.innerHTML = `Oh no!<br><br>You lost!!`;
    } else if(outputTextElement.innerHTML.includes("Oh no!") || (outputTextElement.innerHTML.includes('Congratulations!'))){
        
    }else {
        const cookie = randomCookie();
        const img = document.createElement("img");
        // Attach each picture to its corresponding cookie
        img.src = cookieImages[cookie];
        outputTextElement.innerHTML = `You got a Cookie!<br><br>${cookie}`;
        // Add the image to the screen element
        outputTextElement.appendChild(img);
    
        // Play the ding sound
        const dingSound = document.getElementById('ding-sound');
        dingSound.play();
    
        addToInventory(cookie);
    }
        // define my winning condition
    if (checkSameCookieCount(player.inventory) >= 3) {
        outputTextElement.innerHTML = `Congratulations!<br><br>You won!!`;
    }
}
// function that pushes the random cookie into the inventory of the player and have it displayed on the screen aswell
function addToInventory(cookie) {
    player.inventory.push(cookie);
    const listItem = document.createElement('li');
    listItem.innerHTML = cookie;
    invCookies.appendChild(listItem);
    // for each macademia cookie they add to their inventory they lose a health point
    if (cookie === 'macademia') {
        player.hp--;
        playerHpElement.textContent = `HP: ${player.hp}`; // Update HP display
    }
    hasConsumedCookie = false
}
// checks to see which cookie i have the most of in the inventory
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


