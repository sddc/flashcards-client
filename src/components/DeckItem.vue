<template>
  <div>
    <h2>DeckItem</h2>
    <p>deck id: {{ deckid }}</p>
    <p><router-link :to="{name: 'edit', params: {deckid}}">edit</router-link></p>
    <p><router-link :to="{name: 'review', params: {deckid}}">review</router-link></p>
  </div>
</template>

<script>
export default {
  name: "DeckItem",
  props: {
    deckid: Number,
  }
};
</script>

<style scoped>
</style>
