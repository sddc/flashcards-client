<template>
  <div>
    <Header></Header>

    <div class="container">
      <div class="row" v-show="fetchOk">
        <div class="col">
          <h6 class="mt-3"><router-link :to="{ name: 'deck' }">Back to Decks</router-link></h6>
          <h1 class="mb-3">Edit Deck <small class="text-muted">{{ numCards }}</small></h1>
        </div>
      </div>

      <div class="row" v-show="fetchOk">
        <div class="col">
          <EditCardAdd v-bind:deckid="deckid" v-on:addCard="addCard($event)"></EditCardAdd>
        </div>
      </div>

      <div class="row mb-3" v-show="fetchOk">
        <div class="col">
          <input type="search" v-model="cardFilter" class="form-control" placeholder="Filter cards by front or back">
        </div>
      </div>

      <div class="row" v-show="fetchOk">
        <div class="col">

          <table class="table table-striped">

            <thead>
              <tr>
                <th>Front</th>
                <th>Back</th>
                <th></th>
              </tr>
            </thead>

            <tbody name="fade" is="transition-group">

              <EditCardItem
              v-for="card in filteredCards"
              v-bind:key="card.id"
              v-bind:cardid="card.id"
              v-bind:front="card.front"
              v-bind:back="card.back"
              v-bind:deckid="card.deck_id"
              v-on:deleteCard="deleteCard($event)"></EditCardItem>
            </tbody>


          </table>
        </div>
      </div>

      <div class="row" v-show="!fetchOk">
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
import EditCardItem from "@/components/EditCardItem.vue";
import EditCardAdd from "@/components/EditCardAdd.vue";
import Header from "@/components/Header.vue";
import axios from 'axios'

export default {
  name: "DeckEdit",
  components: {
    EditCardItem,
    EditCardAdd,
    Header
  },
  props: {
    deckid: {
      type: Number,
      required: true
    }
  },
  computed: {
    numCards() {
      return this.cards.length + " card" + ( this.cards.length === 1 ? '' : 's');
    },
    filteredCards() {
      return this.cards.filter(card => card.front.toLowerCase().match(this.cardFilter.toLowerCase()) ||
      card.back.toLowerCase().match(this.cardFilter.toLowerCase()));
    }
  },
  data() {
    return {
      cards: [],
      fetchOk: false,
      deck: {},
      cardFilter: ''
    }
  },
  methods: {
    async fetchCards() {
      const res = await axios.get(process.env.VUE_APP_API + `api/cards/${this.deckid}`);
      this.cards = res.data;
      this.fetchOk = true;
    },
    deleteCard(id) {
      this.cards = this.cards.filter(card => card.id != id)
    },
    addCard(card) {
      this.cards.unshift(card)
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
