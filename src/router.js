import Vue from "vue";
import Router from "vue-router";
import Deck from "@/components/Deck.vue";
import Edit from "@/components/Edit.vue";
import Review from "@/components/Review.vue";

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
