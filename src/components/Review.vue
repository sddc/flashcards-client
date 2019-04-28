<template>
  <div>

    <Header></Header>

    <div class="container mt-3" v-show="fetchOk">

      <div class="row" v-if="show === 'start'">
        <div class="col">
          <div class="jumbotron">
            <h1 class="display-4">Review</h1>
            <p class="lead">{{ numCards }} due to review.</p>
            <button @click="start" v-if="cards.length > 0" class="btn btn-primary btn-lg">Start</button>
            <button @click="$router.push('/')" v-else class="btn btn-primary btn-lg">Back to Decks</button>
          </div>
        </div>
      </div>

      <div class="row" v-else-if="show === 'card'">
        <div class="col">
          <div class="jumbotron">
            <p class="lead">{{ numCards }} remaining</p>

            <ReviewCardItem
            v-bind:front="currentCard.front"
            v-bind:back="currentCard.back"
            v-on:nextCard="nextCard($event)"></ReviewCardItem>

          </div>
        </div>

      </div>

      <div class="row" v-if="show === 'finish'">
        <div class="col">
          <div class="jumbotron">
            <h1 class="display-4">Review Finish</h1>
            <button @click="$router.push('/')" class="btn btn-primary btn-lg">Back to Decks</button>
          </div>
        </div>
      </div>

    </div>

    <div class="container" v-show="!fetchOk">
      <div class="row">
        <div class="col text-center">
          <div class="spinner-border mt-3">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import Header from "@/components/Header.vue";
import axios from 'axios'
import ReviewCardItem from "@/components/ReviewCardItem.vue";

export default {
  name: "Review",
  components: {
    ReviewCardItem,
    Header
  },
  props: {
    deckid: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      cards: [],
      fetchOk: false,
      show: 'start',
      currentCard: {front: '', back: ''}
    }
  },
  computed: {
    numCards() {
      return this.cards.length + " card" + ( this.cards.length === 1 ? '' : 's');
    }
  },
  methods: {
    async nextCard(rating) {

      if(rating < 0 || rating > 5) {
        console.log(`invalid rating ${rating}`);
        return;
      }

      if(!this.currentCard.updated) {
        // precalculated from ease factor formula
        const easeModifier = [-0.8, -0.54, -0.32, -0.14, 0, 0.1];

        this.currentCard.easiness += easeModifier[rating];
        if(this.currentCard.easiness < 1.3) this.currentCard.easiness = 1.3;

        if(rating < 3) {
          this.currentCard.repetitions = 0;
        } else {
          this.currentCard.repetitions += 1;
        }

        if(this.currentCard.repetitions <= 1) {
          this.currentCard.interval = 1;
        } else if(this.currentCard.repetitions === 2) {
          this.currentCard.interval = 6;
        } else {
          this.currentCard.interval = Math.round(this.currentCard.interval * this.currentCard.easiness);
        }

        let nextReview = new Date(this.currentCard.next_review);
        nextReview.setDate(nextReview.getDate() + this.currentCard.interval);
        this.currentCard.next_review = nextReview.toISOString();

        try {
          await axios.put(process.env.VUE_APP_API + `api/cards/${this.currentCard.id}`,{
            easiness: this.currentCard.easiness,
            repetitions: this.currentCard.repetitions,
            interval: this.currentCard.interval,
            next_review: this.currentCard.next_review
          });
          console.log(`updated card ${this.currentCard.id}`);
        } catch(err) {
          console.log(err);
        }

        this.currentCard.updated = true;
      }

      if(rating < 4) {
        this.cards.push(this.currentCard);
      }

      let nextCard = this.cards.shift();
      if(nextCard == null) {
        this.show = 'finish';
      } else {
        this.currentCard = nextCard;
      }

    },
    async fetchCards() {
      const res = await axios.get(process.env.VUE_APP_API + `api/cards/${this.deckid}`);
      const today = new Date();
      this.cards = res.data.filter(card => new Date(card.next_review) <= today);
      this.cards.forEach(card => card.updated = false);
      this.fetchOk = true;
    },
    start() {
      this.currentCard = this.cards.shift();
      this.show = 'card';
    }
  },
  mounted() {
    this.fetchCards().catch((err) => {
      console.log(err);
      return this.$router.push('/404');
    });
  }
};
</script>

<style scoped>
</style>
