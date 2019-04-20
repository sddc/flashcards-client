<template>
  <div>
    <form @submit.prevent="addCard">
      <div>
        <input v-model="front" placeholder="Front">
        <input v-model="back" placeholder="Back">
        <button type="submit">Add</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "EditCardAdd",
  props: ['deckid'],
  data: function() {
    return {
      front: '',
      back: ''
    }
  },
  methods: {
    async addCard() {
      try {
        const res = await axios.post(`http://localhost:5000/api/cards/${this.deckid}`, {
          front: this.front,
          back: this.back
        })

        this.$emit('addCard', res.data)
        this.front = '';
        this.back = '';
      } catch(err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
</style>
