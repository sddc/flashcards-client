<template>
  <div>
    <h2>{{ name }}</h2>
    <p>{{ desc }}</p>
    <button @click="$router.push({name: 'review', params: {deckid}})" type="button">Review</button>
    <button @click="$router.push({name: 'edit', params: {deckid}})" type="button">Edit</button>
    <button @click="deleteDeck">Delete</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "DeckItem",
  props: ['name', 'desc', 'deckid'],
  data: function() {
    return {
    }
  },
  methods: {
    async deleteDeck() {
      try {
        const res = await axios.delete(`http://localhost:5000/api/decks/${this.deckid}`)
        this.$emit('deleteDeck', this.deckid)
      } catch(err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
</style>
