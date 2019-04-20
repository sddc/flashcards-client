<template>
  <div>
    <button @click="$router.push('/')" type="button">Back to Decks</button>
    <h1>Edit</h1>
    <h2>Cards</h2>
    <EditCardItem
    v-for="card in cards"
    v-bind:key="card.id"
    v-bind:cardid="card.id"
    v-bind:front="card.front"
    v-bind:back="card.back"
    v-bind:deckid="card.deck_id"
    v-on:deleteCard="deleteCard($event)"></EditCardItem>
    <EditCardAdd v-bind:deckid="deckid" v-on:addCard="addCard($event)"></EditCardAdd>
  </div>
</template>

<script>
import EditCardItem from "@/components/EditCardItem.vue";
import EditCardAdd from "@/components/EditCardAdd.vue";
import axios from 'axios'

export default {
  name: "DeckEdit",
  components: {
    EditCardItem,
    EditCardAdd
  },
  props: ['deckid'],
  data() {
    return {
      cards: [],
      deck: {}
    }
  },
  methods: {
    async fetchCards() {
      const res = await axios.get(`http://localhost:5000/api/cards/${this.deckid}`);
      this.cards = res.data;
    },
    deleteCard(id) {
      this.cards = this.cards.filter(card => card.id != id)
    },
    addCard(card) {
      this.cards.push(card)
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
