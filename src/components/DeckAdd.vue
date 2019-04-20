<template>
  <div>
    <h2>Add Deck</h2>
    <form @submit.prevent="addDeck">
      <div>
        <input v-model="name" placeholder="Name">
      </div>

      <div>
        <input v-model="desc" placeholder="Description">
      </div>

      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "DeckAdd",
  data: function() {
    return {
      name: '',
      desc: '',
    }
  },
  methods: {
    async addDeck() {
      try {
        const res = await axios.post('http://localhost:5000/api/decks', {
          name: this.name,
          description: this.desc
        })

        this.$emit('addDeck', res.data)
        this.name = '';
        this.desc = '';
      } catch(err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
</style>
