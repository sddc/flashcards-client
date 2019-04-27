import Vue from "vue";
import Router from "vue-router";
import Deck from "@/components/Deck.vue";
import Edit from "@/components/Edit.vue";
import Review from "@/components/Review.vue";
import NotFound from "@/components/NotFound.vue";

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
      props: route => { return { deckid: Number(route.params.deckid) } }
    },
    {
      path: "/review/:deckid",
      name: "review",
      component: Review,
      props: route => { return { deckid: Number(route.params.deckid) } }
    },
    {
      path: "/404",
      component: NotFound
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});
