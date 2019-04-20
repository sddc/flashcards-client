<template>
  <div>
    <h1>Decks</h1>
    <DeckItem
    v-for="deck in decks"
    v-bind:key="deck.id"
    v-bind:deckid="deck.id"
    v-bind:name="deck.name"
    v-bind:desc="deck.description"
    v-on:deleteDeck="deleteDeck($event)"
    ></DeckItem>
    <DeckAdd v-on:addDeck="addDeck($event)"></DeckAdd>
  </div>
</template>

<script>
import DeckItem from "@/components/DeckItem.vue";
import DeckAdd from "@/components/DeckAdd.vue";
import axios from 'axios'

export default {
  name: "Deck",
  components: {
    DeckItem,
    DeckAdd
  },
  data() {
    return {
      decks: []
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
