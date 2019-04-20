<template>
  <div>
    <div v-show="showStart">
      <button @click="$router.push('/')" type="button">Back to Decks</button>
      <p>{{ cards.length + " card" + ( cards.length === 1 ? '' : 's') }} to review.</p>
      <button @click="start" v-if="cards.length > 0">Start</button>
    </div>

    <div v-show="showCard">
      <p>Card {{ i + 1 }}/{{ cards.length }}</p>
      <ReviewCardItem
      v-for="card in currentCard"
      v-bind:key="card.id"
      v-bind:front="card.front"
      v-bind:back="card.back"
      v-on:nextCard="showNextCardButton = true"></ReviewCardItem>
      <button @click="nextCard" v-show="showNextCardButton">Next</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import ReviewCardItem from "@/components/ReviewCardItem.vue";

export default {
  name: "Review",
  components: {
    ReviewCardItem
  },
  props: {
    deckid: Number,
    required: true
  },
  data() {
    return {
      cards: [],
      i: 0,
      showNextCardButton: false,
      showStart: true
    }
  },
  computed: {
    currentCard() {
      return this.cards.filter(card => card.id === this.cards[this.i].id)
    }
  },
  methods: {
    async fetchCards() {
      const res = await axios.get(`http://localhost:5000/api/cards/${this.deckid}`);
      this.cards = res.data;
    },
    start() {
      this.showStart = false;
      this.showCard = true;
    },
    nextCard() {
      this.showNextCardButton = false;
      if(this.i + 1 >= this.cards.length) {
        this.$router.push('/');
      } else {
        this.i++;
      }
    }
  },
  mounted() {
    this.fetchCards().catch((err) => {
      console.log(err);
    });
  }
};
</script>

<style scoped>
</style>
