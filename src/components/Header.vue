<template lang="html">
  <nav class="navbar navbar-light bg-dark justify-content-center">
    <span class="navbar-brand mb-0 h1 text-white">Flashcards</span>

    <ul class="nav">
      <li class="nav-item">
        <router-link :to="{ name: 'deck', params: {} }" class="nav-link active">Decks</router-link>
      </li>
    </ul>


  </nav>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
