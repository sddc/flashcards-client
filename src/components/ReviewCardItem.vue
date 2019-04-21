<template lang="html">
  <div>
    <div class="text-center" id="cardbox">
      <h1 class="display-4">{{ front }}</h1>
      <hr>
      <transition name="bounce">
      <h1 class="display-4" v-show="showBack">{{ back }}</h1>
    </transition>
    </div>
    <button @click="flipCard" v-show="flipCardButton" class="btn btn-primary btn-lg">Flip</button>
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
  #cardbox {
    height: 200px;
  }

  .bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
