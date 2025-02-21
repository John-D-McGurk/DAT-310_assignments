class Card {
  constructor(img) {
    this.img_id = img;
    this.img = "images/" + img + ".svg";
  }
}

function getDeck() {
  const cards = [];
  const suits = ["S", "H", "D", "C"];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 1; j < 14; j++) {
      cards.push(`${j}${suits[i]}`);
    }
  }
  return cards;
}

function mixedCards() {
  let cardLetters = getDeck();
  // 6x6
  const numCards = 8;
  chosenCards = []

  for (let i = 0; i < numCards; i++) {
    const fromIdx = Math.floor(Math.random() * cardLetters.length);
    chosenCards.push(new Card(cardLetters[fromIdx]));
    chosenCards.push(new Card(cardLetters[fromIdx]));
    cardLetters.splice(fromIdx, 1);
  }

  for (let i = chosenCards.length - 1; i > 0; i--) {
    const rndIdx = Math.floor(Math.random() * i + 1);
    [chosenCards[i], chosenCards[rndIdx]] =
      [chosenCards[rndIdx], chosenCards[i]]
  }


  return chosenCards;
}

function getDimensions(cards) {
  return Math.sqrt(cards);
}



const boardC = {
  props: {
    resetTrigger: {
      type: Boolean,
    }
  },
  watch: {
    resetTrigger() {
      this.resetBoard();
    }
  },
  template: `
    <div class="cardboard" :style="{ width: Math.sqrt(cards.length) * 100 + 'px' }">
        <div class="outer" v-for="card in cards" :data-card="card.img_id" @click="flipCard" >
            <div class="card front">
                <img v-bind:src="card.img">
            </div>
            <div class="card back"></div>
        </div>
    </div>
    `,
  data: function () {
    return {
      cards: mixedCards(),
      currentlyTurned: [],
      removedCards: [],
    }
  },

  methods: {
    flipCard(event) {
      const card = event.currentTarget;

      if (this.currentlyTurned.length < 2 && !this.currentlyTurned.includes(card)) {
        const cardBack = event.currentTarget.querySelector('.back');
        const cardFront = event.currentTarget.querySelector('.front');

        cardBack.style.transform = 'rotateY(180deg)';
        cardFront.style.transform = 'rotateY(180deg)';
        this.currentlyTurned.push(card);
        if (this.currentlyTurned.length === 2) {
          this.checkMatch();
          this.$emit('flip');
        }
      }
    },
    checkMatch() {
      let match = false
      if (this.currentlyTurned[0].dataset.card === this.currentlyTurned[1].dataset.card) {
        this.$emit('found-pair');
        match = true;
      } else {
        match = false;
      }
      setTimeout(() => {
        this.resetCards(match);
      }, 1000);
    },
    resetCards(match) {
      this.currentlyTurned.forEach(card => {
        const cardBack = card.querySelector('.back');
        const cardFront = card.querySelector('.front');
        if (match) {
          card.style.opacity = '0';
          setTimeout(() => {
            cardBack.style = '';
            cardFront.style = '';
          }, 1000)
          this.removedCards.push(card);
          this.checkFinished()
        }
        cardBack.style.transform = '';
        cardFront.style.transform = '';

      });
      this.currentlyTurned = [];
      if (!match) {
        this.$emit('turn-finished');
      }
    },
    resetBoard() {
      console.log('resetting board');
      this.cards = mixedCards();
      console.log(this.currentlyTurned)
      cardsToReset = this.currentlyTurned.concat(this.removedCards)
      cardsToReset.forEach(card => {
        const cardBack = card.querySelector('.back');
        const cardFront = card.querySelector('.front');
        card.style.opacity = ''
        cardInners = card.querySelectorAll('.card');
        console.log(cardInners)
        cardInners.forEach(inner => {
          inner.style.transform = '';

        })

      });
      this.removedCards = [];
      this.currentlyTurned = [];
    },
    checkFinished() {
      if (this.removedCards.length === this.cards.length) {
        this.$emit('all-cards-flipped');
      }
    }
  }
}

