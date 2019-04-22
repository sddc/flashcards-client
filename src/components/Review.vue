<template>
  <div>

    <Header></Header>

    <div class="container mt-3">

      <div class="row" v-show="showStart">
        <div class="col">
          <div class="jumbotron">
            <h1 class="display-4">Review</h1>
            <p class="lead">{{ cards.length + " card" + ( cards.length === 1 ? '' : 's') }} to review.</p>
            <button @click="start" v-if="cards.length > 0" class="btn btn-primary btn-lg">Start</button>
          </div>
        </div>
      </div>

      <div class="row" v-show="showCard">
        <div class="col">
          <div class="jumbotron">
            <p class="lead">Card {{ i + 1 }}/{{ cards.length }}</p>
            <ReviewCardItem
            v-for="card in currentCard"
            v-bind:key="card.id"
            v-bind:front="card.front"
            v-bind:back="card.back"
            v-on:nextCard="showNextCardButton = true"></ReviewCardItem>
            <button @click="nextCard" v-show="showNextCardButton" class="btn btn-primary btn-lg">Next</button>
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
      const res = await axios.get(process.env.VUE_APP_API + `api/cards/${this.deckid}`);
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
      return this.$router.push('/404');
    });
  }
};
</script>

<style scoped>
</style>
