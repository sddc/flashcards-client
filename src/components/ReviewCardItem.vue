<template lang="html">
  <div>
    <h1>{{ front }}</h1>
    <h1 v-show="showBack">{{ back }}</h1>
    <button @click="flipCard" v-show="flipCardButton">Flip</button>
  </div>
</template>

<script>
export default {
  name: "ReviewCardItem",
  props: ['front', 'back'],
  data() {
    return {
      showBack: false,
      flipCardButton: true
    }
  },
  methods: {
    flipCard() {
      this.showBack = true;
      this.flipCardButton = false;
      this.$emit('nextCard');
    }
  }
}
</script>

<style lang="css" scoped>
</style>
