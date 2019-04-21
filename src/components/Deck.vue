<template>
  <div>


    <Header></Header>
    <div class="container">
      <div class="row">

        <div class="col">
          <h1 class="mt-3 mb-3">Decks <small class="text-muted">{{ decks.length + " deck" + ( decks.length === 1 ? '' : 's') }}</small></h1>
        </div>

      </div>

      <div class="row">
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
        ></DeckItem>
      </transition-group>

      <div class="row">

        <div class="col">
          <DeckAdd v-on:addDeck="addDeck($event)"></DeckAdd>
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
      deckFilter: ''
    }
  },
  computed: {
    filteredDecks() {
      return this.decks.filter(deck => deck.name.toLowerCase().match(this.deckFilter.toLowerCase()));
    }
  },
  methods: {
    async fetchDecks() {
      const res = await axios.get('http://localhost:5000/api/decks');
      this.decks = res.data;
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
    });
  }
};
</script>

<style scoped>
</style>
