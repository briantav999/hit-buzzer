const outputTextElement = document.querySelector('#text-output');
const buttonElement = document.querySelector('button');
const invCookies = document.querySelector('#cookie-list');
const playerHpElement = document.querySelector('#player-hp');
const outputElement = document.querySelector('#output');
const cookiesAvailable = ['chocolate', 'oatmeal', 'macademia', 'vanilla', 'chocolate-chip'];
const player = {
    hp: 3,
    inventory: [],
};

function randomCookie() {
    const randomIndex = Math.floor(Math.random() * cookiesAvailable.length);
    return cookiesAvailable[randomIndex];
}

function clickHandler() {
    if (outputTextElement.innerHTML.includes('You got a Cookie!') && (player.hp > 0) ){
        outputTextElement.innerHTML = "try again!";
    } else if(player.hp <= 0){
        player.hp = 0;
        outputTextElement.innerHTML = `Oh no!<br><br>You lost!!`;
    } else {
        const cookie = randomCookie();
        outputTextElement.innerHTML = 'You got a Cookie!<br><br>' + cookie;
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
