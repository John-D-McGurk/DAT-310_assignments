class Card {
  constructor(img) {
    this.img_id = img;
    this.img = "images/" + img + ".svg";
  }
}

function getDeck() {
  const cards = [];
  const suits = ["J", "H", "D", "C"];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 1; j < 14; j++) {
      cards.push(`${j}${suits[i]}`);
    }
  }
  return cards;
}

function mixedCards() {
  let cardLetters = getDeck();
  let cards = [];
  for (let i = 0; i < cardLetters.length; i++) {
    cards.push(new Card(cardLetters[i]));
    cards.push(new Card(cardLetters[i]));
  }
  mixedCards = [];
  // 6x6
  const numCards = 18;
  for (let i = 0; i < numCards; i++) {
    chosenIdx = Math.floor(Math.random() * cards.length);
    mixedCards.push(cards[chosenIdx]);
    mixedCards.push(cards[chosenIdx]);
    cards.slice(chosenIdx, 1);
  }
  return mixedCards;
}

function getDimensions(cards) {
  return Math.sqrt(cards);
}

const boardC = {
  template: `
    <div class="cardboard" :style="{ width: Math.sqrt(cards.length) * 100 + 'px' }">
        <div class="outer" v-for="(card, index) in cards" :key="index" @click="flipCard" >
            <div class="card front">
                <img v-bind:src="card.img">
            </div>
            <div class="card back"></div>
        </div>
    </div>
    `,
  data: function () {
    // need logic here fore flipping cards,
    // finding matched cards,
    // removing cards if they are matched,
    // flip them back if they are not matching.

    return {
      cards: mixedCards(),
    }
  },

    methods: {
      flipCard(event) {
        console.log(event.target.parent)
      }
    }

};
