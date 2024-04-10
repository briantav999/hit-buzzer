const outputTextElement = document.querySelector('#text-output');
const buttonElement = document.querySelector('button');
const invCookies = document.querySelector('#cookie-list');
const playerHpElement = document.querySelector('#player-hp');
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
    if (outputTextElement.innerHTML.includes('You got a Cookie!')) {
        outputTextElement.innerHTML = "starting over!";
    } else {
        const cookie = randomCookie();
        outputTextElement.innerHTML = 'You got a Cookie!<br><br>' + cookie;
        addToInventory(cookie);
    }
    console.log(player.hp);
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

buttonElement.addEventListener('click', clickHandler);
