<template>
  <div>

    <Header></Header>
    <div class="container">

      <div class="row" v-show="fetchOk">
        <div class="col">
          <h1 class="mt-3 mb-3">Decks <small class="text-muted">{{ numDecks }}</small></h1>
        </div>
      </div>

      <div class="row" v-show="fetchOk">
        <div class="col">
          <input type="search" v-model="deckFilter" class="form-control" placeholder="Filter decks by name">
        </div>
      </div>

      <transition-group name="fade">
        <DeckItem
        v-for="deck in filteredDecks"
        v-bind:key="deck.id"
        v-bind:deckid="deck.id"
        v-bind:name="deck.name"
        v-bind:desc="deck.description"
        v-on:deleteDeck="deleteDeck($event)"
        v-show="fetchOk"
        ></DeckItem>
      </transition-group>

      <div class="row" v-show="fetchOk">
        <div class="col">
          <DeckAdd v-on:addDeck="addDeck($event)"></DeckAdd>
        </div>
      </div>

      <div class="row" v-show="!fetchOk">
        <div class="col text-center" v-show="!fetchFail">
          <div class="spinner-border mt-3">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div class="col mt-3" v-show="fetchFail">
          <p>api error</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import DeckItem from "@/components/DeckItem.vue";
import DeckAdd from "@/components/DeckAdd.vue";
import Header from "@/components/Header.vue";
import axios from 'axios'

export default {
  name: "Deck",
  components: {
    DeckItem,
    DeckAdd,
    Header
  },
  data() {
    return {
      decks: [],
      fetchOk: false,
      fetchFail: false,
      deckFilter: ''
    }
  },
  computed: {
    filteredDecks() {
      return this.decks.filter(deck => deck.name.toLowerCase().match(this.deckFilter.toLowerCase()));
    },
    numDecks() {
      return this.decks.length + " deck" + ( this.decks.length === 1 ? '' : 's');
    }
  },
  methods: {
    async fetchDecks() {
      const res = await axios.get(process.env.VUE_APP_API + 'api/decks');
      this.decks = res.data;
      this.fetchOk = true;
    },
    deleteDeck(id) {
      this.decks = this.decks.filter(deck => deck.id != id);
    },
    addDeck(deck) {
      this.decks.push(deck);
    }
  },
  mounted() {
    this.fetchDecks().catch((err) => {
      console.log(err);
      this.fetchFail = true;
    });
  }
};
</script>

<style scoped>
</style>
