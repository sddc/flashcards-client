<template>
  <div>
    <h1>Deck</h1>
    <DeckItem deckid="1"></DeckItem>
    <DeckItem deckid="2"></DeckItem>
    <DeckItem deckid="3"></DeckItem>
    <DeckAdd></DeckAdd>
  </div>
</template>

<script>
import DeckItem from "@/components/DeckItem.vue";
import DeckAdd from "@/components/DeckAdd.vue";

export default {
  name: "Deck",
  components: {
    DeckItem,
    DeckAdd
  }
};
</script>

<style scoped>
</style>
