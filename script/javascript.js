// creating an empty arrays
let openDeck = []; // storing all flipped cards
let matched = []; // store it here when they are correct

// making a array for the cards picture. In a array format
const deckCards = ["stock.jpg", "stock.jpg", "babyYoda.jpg", "babyYoda.jpg", "catmeme.jpg", "catmeme.jpg", "cryingCat.jpg", "cryingCat.jpg", "dogeMeme.jpg", "dogeMeme.jpg",
    "gigaChad.jpg", "gigaChad.jpg", "pikachu.jpg", "pikachu.jpg", "pogchamp.jpeg", "pogchamp.jpeg", "spongebob.jpg", "spongebob.jpg"
];

// declaring and reorganizing all variables
// getting access to the html using document.querySelector()

const deck = document.querySelector(".deck");

const modal = document.getElementById("modal");

const resetBtn = document.querySelector(".reset-btn");

const playAgain = document.querySelector(".play-again-btn");

const movesCount = document.querySelector(".moves-counter");




let moves = 0; // moves will start at 0 add 1 each time something happens


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function shuffle(array) { // input array from other method (method call)
    let cIndex = array.length,
        temp, random;

    // create a while loop to run the random generator. Using math.random
    while (cIndex !== 0) {
        random = Math.floor(Math.random() * cIndex);
        cIndex -= 1; // similar to i-- for cIndex
        temp = array[cIndex]; // 1 2 3 => 2 3 1 so on as random, logic similar to previous assignments
        array[cIndex] = array[random]; // generating random order here
        array[random] = temp; // switching order
    }
    return array
}


// https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes
function remove() {
    while (deck.hasChildNodes()) { // gives a boolean value 
        // https://www.w3schools.com/jsref/prop_node_firstchild.asp
        deck.removeChild(deck.firstChild); // returns first element of the node 
    }
}

// making time function
// this is the time function variables
const timeCounter = document.querySelector(".timer");
let time;
let timeStart = false; // turn this to true when the game starts
let min = 0;
let sec = 0;

function timer() {
    time = setInterval(function() { // set time here 
        sec++;
        if (sec === 60) { // absolute 60sec
            min++; // add 1 to min
            sec = 0; // reset sec
        }
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
        timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + "Timer: " + min + "Mins " + sec + "Sec";
    }, 1000);
}

function stopTime() {
    clearInterval(time); // reset time when game starts again
}

function reset() {
    stopTime();

    timeStart = false;
    sec = 0;
    min = 0;
    timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + "TIMER: 00:00";

    // clear both arrays 
    matched = [];
    openDeck = [];

    //reset moves 
    moves = 0;
    movesCount.innerHTML = 0;

    remove(); // clear the cards 
    start(); // start new game
}

// making moves function
function movesCounter() {
    movesCount.innerHTML++; // add 1 to 0 in html file
    moves++; // like i++ but with moves 
}

// making the matched function to compare if images matches each other: 

function compareImg() {
    if (openDeck.length === 2) { // if 2 cards are flip over then pointer event will be none, the user cannot click on other images until it reset
        document.body.style.pointerEvents = "none";
    }
    if (openDeck.length === 2 && openDeck[0].src === openDeck[1].src) {
        match();
    } else if (openDeck.length === 2 && openDeck[0].src != openDeck[1].src) {
        notMatch();
    }
}


// create the match function to check if both images match. 

function match() {
    setTimeout(function() {
        openDeck[0].parentElement.classList.add("matched");
        openDeck[1].parentElement.classList.add("matched");
        matched.push(...openDeck); // push to the matched array 
        document.body.style.pointerEvents = "auto"; // enable clicking for user
        winner(); // calling winner method.
        openDeck = []; // reset openDeck array
    }, 600);

    movesCounter(); // adding moves
}

// creating the notMatch() here
function notMatch() {
    setTimeout(function() {
        openDeck[0].parentElement.classList.remove("flip");
        openDeck[1].parentElement.classList.remove("flip");
        document.body.style.pointerEvents = "auto"; // enable clicking for user
        openDeck = []; // reset openDeck array
    }, 700);
    movesCounter(); // adding moves
}

// create report() here 
function report() {
    const report = document.querySelector(".modal-content");
    for (let i = 1; i <= 3; i++) {
        const reportElement = document.createElement("p"); // creating a place for report 
        reportElement.classList.add("report");
        report.appendChild(reportElement);
    }
    let p = report.querySelectorAll("p.report");
    p[0].innerHTML = "Time: " + min + "Mins and " + sec + " Sec";
    p[1].innerHTML = "Moves: " + moves;
}

// https://www.w3schools.com/jsref/event_onclick.asp
// create a model to display your modal 
function display() {
    const modalC = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    modalC.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) { // when you click window it is a event 
        if (event.target == modal) { // if the event that is the targeted is the modal, do something
            modal.style.display = "none"; // set display style = none
        }
    };
}

// create the winner function: will be called when you win the game
function winner() {
    if (matched.length === 16) { // 8 pairs 16 cards total
        stopTime();
        report();
    }
}
deck.addEventListener("click", function(evt) {
    if (evt.target.nodeName === "LI") {
        // console.log(evt.target.nodeName + " was clicked");
        if (timeStart === false) {
            timeStart = true; // turning timeStart from false to true. 
            timer();
        }
        flip();
    }
    // making the flip function here. 
    function flip() {
        evt.target.classList.add("flip"); // change the evt to flip, to show animation
        addOp();
    }

    // making addOp here: main goal is to add flip cards to openDeck array. 
    function addOp() {
        if (openDeck.length === 0 || openDeck.length === 1) { // if array length is 0 or array length is 1
            openDeck.push(evt.target.firstElementChild); // add to array openDeck
        }

        compareImg();
    }
});

resetBtn.addEventListener('click', reset); // if the user click on restart button the whole game restarts

playAgain.addEventListener('click', function() {
    modal.style.display = "none";
    reset();
})

// question whats the difference between ' and "" : https://stackoverflow.com/questions/944081/what-is-the-difference-between-and-in-javascript

// making a start function here
// main goal, start the game

function start() {
    // calling the shuffle function here and store it in i
    const shuffled = shuffle(deckCards); // const bec it will never change
    // passing deckCards array (line 6)

    // use a for loop to run the shuffle cards and make things playable
    for (let i = 0; i < shuffled.length; i++) { // syntax simple for loop
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        const liT = document.createElement('LI');
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
        liT.classList.add('card');
        const img = document.createElement('img');
        // append or add to image to list 
        liT.appendChild(img);
        img.setAttribute("src", "img/" + shuffled[i]); // setting src paths for all images in the img folder
        // setting alt tags, overall good practice: 
        img.setAttribute("alt", "image of memes");
        // update list 
        deck.appendChild(liT);
    }
}

// calling start to start the game: 
start();