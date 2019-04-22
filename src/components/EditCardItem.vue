<template>
    <tr>
      <td><input class="form-control" v-model="cardFront" placeholder="Front" v-bind:class="{ redborder: frontEmpty }"></td>
      <td><input class="form-control" v-model="cardBack" placeholder="Back" v-bind:class="{ redborder: backEmpty }"></td>
      <td><button type="button" class="btn btn-danger" @click="deleteCard">Delete</button></td>
    </tr>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  name: "EditCardItem",
  props: ['cardid', 'front', 'back'],
  watch: {
    cardFront: function() {
      if(this.cardFront.length > 0) {
        this.frontEmpty = false;
        this.editCard();
      } else {
        this.frontEmpty = true;
      }
    },
    cardBack: function() {
      if(this.cardBack.length > 0) {
        this.backEmpty = false;
        this.editCard();
      } else {
        this.backEmpty = true;
      }
    }
  },
  data: function() {
    return {
      cardFront: this.front,
      cardBack: this.back,
      frontEmpty: false,
      backEmpty: false
    }
  },
  methods: {
    deleteCard() {
      axios.delete(process.env.VUE_APP_API + `api/cards/${this.cardid}`)
      .then(() => {
        this.$emit('deleteCard', this.cardid)
      })
      .catch((err) => {
        console.log(err);
      })
    },
    editCard:
      _.debounce(function() {
        if(this.cardFront.length > 0 && this.cardBack.length > 0) {
        axios.put(process.env.VUE_APP_API + `api/cards/${this.cardid}`,{
          front: this.cardFront,
          back: this.cardBack
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
      }
      }, 500)

      // }
    }
};
</script>

<style scoped>
.redborder {
  border: 2px solid red;
}
</style>
