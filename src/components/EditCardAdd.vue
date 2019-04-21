<template>
  <div>




      <form @submit.prevent="addCard">

        <div class="input-group mb-3" v-if="showAddCardForm">
          <input v-model="front" type="text" class="form-control" placeholder="Front" required>
          <input v-model="back" type="text" class="form-control" placeholder="Back" required>
          <div class="input-group-append">
            <button class="btn btn-primary" type="submit">Add</button>
          </div>
        </div>
        <div v-else>
          <button @click="showAddCardForm = true" class="btn btn-primary" type="button">Add Card</button>
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
      back: '',
      showAddCardForm: false
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
        this.showAddCardForm = false;
      } catch(err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
</style>
