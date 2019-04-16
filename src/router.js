import Vue from "vue";
import Router from "vue-router";
import Deck from "./views/Deck.vue";
import Edit from "./views/Edit.vue";
import Review from "./views/Review.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "deck",
      component: Deck
    },
    {
      path: "/edit/:deckid",
      name: "edit",
      component: Edit,
      props: true
    },
    {
      path: "/review/:deckid",
      name: "review",
      component: Review,
      props: true
    },
  ]
});
