<template lang="html">
  <div>
    <div class="text-center" id="cardbox">
      <h1 class="display-4">{{ front }}</h1>
      <hr>
      <transition name="bounce">
        <h1 class="display-4" v-show="showBack">{{ back }}</h1>
      </transition>
    </div>
    <button @click="flipCard" v-show="!showBack" class="btn btn-primary btn-lg btn-block">Show</button>

    <div class="text-center" v-show="showBack">
      <p class="lead">Rate Card Difficulty</p>
      <div class="btn-group btn-group-lg text-center" role="group">
        <button @click="nextCard(0)" type="button" class="btn btn-danger">0</button>
        <button @click="nextCard(1)" type="button" class="btn btn-danger">1</button>
        <button @click="nextCard(2)" type="button" class="btn btn-warning">2</button>
        <button @click="nextCard(3)" type="button" class="btn btn-warning">3</button>
        <button @click="nextCard(4)" type="button" class="btn btn-success">4</button>
        <button @click="nextCard(5)" type="button" class="btn btn-success">5</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ReviewCardItem",
  props: {
    front: {
      type: String,
      required: true
    },
    back: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showBack: false
    }
  },
  methods: {
    flipCard() {
      this.showBack = true;
    },
    nextCard(rating) {
      this.showBack = false;
      this.$emit('nextCard', rating);
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

.bounce-leave {
  opacity: 0;
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
