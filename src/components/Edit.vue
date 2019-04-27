<template>
  <div>
    <Header></Header>

    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="mt-3 mb-3">Edit Deck <small class="text-muted">{{ cards.length + " card" + ( cards.length === 1 ? '' : 's') }}</small></h1>
        </div>
      </div>

      <div class="row">
        <div class="col">

          <table class="table">

            <thead>
              <tr>
                <th>Front</th>
                <th>Back</th>
                <th></th>
              </tr>
            </thead>

            <tbody name="fade" is="transition-group">

              <EditCardItem
              v-for="card in cards"
              v-bind:key="card.id"
              v-bind:cardid="card.id"
              v-bind:front="card.front"
              v-bind:back="card.back"
              v-bind:deckid="card.deck_id"
              v-on:deleteCard="deleteCard($event)"></EditCardItem>
            </tbody>


          </table>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <EditCardAdd v-bind:deckid="deckid" v-on:addCard="addCard($event)"></EditCardAdd>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditCardItem from "@/components/EditCardItem.vue";
import EditCardAdd from "@/components/EditCardAdd.vue";
import Header from "@/components/Header.vue";
import axios from 'axios'

export default {
  name: "DeckEdit",
  components: {
    EditCardItem,
    EditCardAdd,
    Header
  },
  props: {
    deckid: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      cards: [],
      deck: {}
    }
  },
  methods: {
    async fetchCards() {
      const res = await axios.get(process.env.VUE_APP_API + `api/cards/${this.deckid}`);
      this.cards = res.data;
    },
    deleteCard(id) {
      this.cards = this.cards.filter(card => card.id != id)
    },
    addCard(card) {
      this.cards.push(card)
    }
  },
  mounted() {
    this.fetchCards().catch((err) => {
      console.log(err);
      return this.$router.push('/404');
    });
  }
};
</script>

<style scoped>
</style>
