<template>

<div class="row">
  <div class="col">


      <div class="card mt-3">


        <div class="card-body">
            <h5 class="card-title">{{ name }}</h5>
            <p class="card-text">{{ desc }}</p>

            <router-link :to="{ name: 'review', params: {deckid} }" class="card-link">Review</router-link>
            <router-link :to="{ name: 'edit', params: {deckid} }" class="card-link">Edit</router-link>
            <span v-if="showConfirmDelete" class="card-link">
              Are you sure?
              <a href="javascript:void(0)" @click="deleteDeck()">Yes</a> /
              <a href="javascript:void(0)" @click="showConfirmDelete = false">No</a>
            </span>
            <span v-else class="card-link">
              <a href="javascript:void(0)" @click="showConfirmDelete = true">Delete</a>
            </span>
        </div>

      </div>

</div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: "DeckItem",
  props: {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    deckid: {
      type: Number,
      required: true
    },
  },
  data: function() {
    return {
      showConfirmDelete: false
    }
  },
  methods: {
    async deleteDeck() {
      try {
        const res = await axios.delete(process.env.VUE_APP_API + `api/decks/${this.deckid}`)
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
