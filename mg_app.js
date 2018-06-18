/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let cards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'];

let card = $('.card');
//empty array for cards that will be opened during the game
let openedCards = [];
let counter = 0;
/*restart the game
 * timer, move counter set to 0
 */
$(document).ready(function() {

  $('.restart').click(function() {
    counter = 0;
    clearInterval(timer);
    document.querySelector('.timer').innerHTML = '00.00';
    document.querySelector('.moves').innerHTML = counter;
    $('.card').remove();
    $('.congrat-panel').fadeOut('slow');

    shuffle(cards);
    newGame();
    starsCount();
  });
});


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cards) {
  var currentIndex = cards.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }

  return cards;
}
shuffle(cards);

//put shuffled cards on the desk, display timer, star rating and move counter
function newGame() {
  shuffle(cards);
  cards.forEach(function(card) {
    $((`<li class="card">
        <i class="${card}"></i>
      </li>`)).appendTo('.deck');
  });
  $('.stars').appendTo('.score-panel');
  $((`<span>Moves</span>`)).appendTo('.moves');
  $('.moves').appendTo('.score-panel');
  $('.timer').appendTo('.score-panel');
  pickCard();
}
newGame();


//pick a card and open for to check if match
function pickCard() {
  $('.card').on('click', function() {
    this.classList.add('open');
    this.classList.add('show');
    openedCards.unshift(this);
    matchCards();
  })
}
// check if it is a match, hold match pairs open;
//dismiss if unmatch
function matchCards() {
  if (openedCards.length > 1) {
    moveCount();
    if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
      openedCards[0].classList.add('match');
      openedCards[1].classList.add('match');
      openedCards = [];
    } else {
      openedCards[0].classList.add('unmatch');
      openedCards[1].classList.add('unmatch');
      setTimeout(function() {
        openedCards[0].classList.remove('show', 'open', 'unmatch');
        openedCards[1].classList.remove('show', 'open', 'unmatch');
        openedCards = [];
      }, 400);
    }
  }
}

//display star rating based on moves made
function starsCount() {
  let st = counter
  let blackStar = document.getElementsByClassName('fa fa-star');
  if (st == 0) {
    for (var i = 0; i < blackStar.length; i++) {
      blackStar[i].style.color = '#02ccba';
    }
  }
  if (st == 12) {
    blackStar[2].style.color = 'black';
  }
  if (st >= 16) {
    blackStar[1].style.color = 'black';
  }
}

//set timer on the first move
function setTime() {
  timer = setInterval(timeCount, 1000);
  let seconds = 0;

  function timeCount() {

    seconds++;

    let min = Math.floor(seconds / 60 % 60);
    let sec = seconds % 60;
    if (sec < 10) {
      sec = '0' + sec;
    } else if (min < 10) {
      min = '0' + min;
    }

    document.querySelector('.timer').innerHTML = (`${min} : ${sec}`);
  }
}

//count moves (picked pairs of cards)
function moveCount() {

  counter++;
  if (counter == 1) {
    setTime();
  }
  document.querySelector('.moves').innerHTML = counter;
  starsCount();
  gameOver();
}
//display congratulation panel, rating, game time and moves
function gameOver() {
  let matchedCards = document.querySelectorAll('.match');
  if (matchedCards.length == 14) {
    clearInterval(timer);
    $('.stars').appendTo('.yourstars');
    $('.timer').appendTo('.yourtime');
    $('.moves').appendTo('.yourmoves');
    $('.congrat-panel').show('fast');
    $('.card').remove();

  }
}