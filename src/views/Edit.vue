<template>
  <div>
    <h1>DeckEdit</h1>
    <p>deck id: {{ deckid }}</p>
    <EditCardItem></EditCardItem>
    <EditCardItem></EditCardItem>
    <EditCardItem></EditCardItem>
  </div>
</template>

<script>
import EditCardItem from "@/components/EditCardItem.vue";

export default {
  name: "DeckEdit",
  components: {
    EditCardItem
  },
  props: {
    deckid: Number
  }
};
</script>

<style scoped>
</style>
