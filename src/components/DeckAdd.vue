<template>
  <div class="mt-3 mb-5">


    <form @submit.prevent="addDeck">

      <div class="input-group mb-3" v-if="showAddDeckForm">
        <input v-model="name" type="text" class="form-control" placeholder="Name" required>
        <input v-model="desc" type="text" class="form-control" placeholder="Description" required>
        <div class="input-group-append">
          <button class="btn btn-primary" type="submit">Add</button>
        </div>
      </div>
      <div v-else>
        <button @click="showAddDeckForm = true" class="btn btn-primary" type="button">Add Deck</button>
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
      showAddDeckForm: false
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
        this.showAddDeckForm = false;
      } catch(err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
</style>
