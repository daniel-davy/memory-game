const cards = document.querySelectorAll(".card"),
timeTag =  document.querySelector('.time b'),
flipsTag = document.querySelector('.flips b'),
refreshBtn = document.querySelector('.details button');


let maxTime = 25;
let timeLeft = maxTime;
let flips = 0;
let matched = 0;
let isPlaying = false;
let cardOne, cardTwo, timer;
let disableDeck = false;

function initTimer() {
    if(timeLeft <= 0) {
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}


function flipCards(e) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    let clickedCard = e.target;
    if(cardOne !== clickedCard && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}
function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 6 && timeLeft > 0) {
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCards);
        cardTwo.removeEventListener("click", flipCards);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}
function shuffleCards() {
    timeLeft = maxTime;
    flips = matched = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = [1, 4, 5, 6, 7, 8, 1, 4, 5, 6, 7, 8];

    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `img/img-${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCards);
    });
}

shuffleCards();
    
refreshBtn.addEventListener('click', shuffleCards);

cards.forEach(card => {
    card.addEventListener("click", flipCards);
});