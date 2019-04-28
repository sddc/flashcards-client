<template>
  <div>
    <form @submit.prevent="addCard">
      <div class="input-group mb-3">
        <input v-model="front" type="text" class="form-control" placeholder="Front" ref="front" required>
        <input v-model="back" type="text" class="form-control" placeholder="Back" required>
        <div class="input-group-append">
          <button class="btn btn-primary" type="submit">Add Card</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "EditCardAdd",
  props: {
    deckid: {
      type: Number,
      required: true
    }
  },
  data: function() {
    return {
      front: '',
      back: ''
    }
  },
  methods: {
    async addCard() {
      try {
        const res = await axios.post(process.env.VUE_APP_API + `api/cards/${this.deckid}`, {
          front: this.front,
          back: this.back
        })

        this.$emit('addCard', res.data)
        this.front = '';
        this.back = '';
        this.$refs.front.focus();
      } catch(err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
</style>
