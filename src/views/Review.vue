<template>
  <div>
    <h1>ReviewDeck</h1>
    <p><p>deck id: {{ deckid }}</p></p>
    <ReviewCardItem></ReviewCardItem>
    <ReviewControl></ReviewControl>
  </div>
</template>

<script>
import ReviewCardItem from "@/components/ReviewCardItem.vue";
import ReviewControl from "@/components/ReviewControl.vue";

export default {
  name: "ReviewDeck",
  components: {
    ReviewCardItem,
    ReviewControl
  },
  props: {
    deckid: Number,
  }
};
</script>

<style scoped>
</style>
