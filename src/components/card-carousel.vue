<template>
  <div class="container my-5">
    <carousel :perPageCustom="[[768, 2], [1024, 3]]">
      <slide v-for="entry in entries" :key="entry.id">
        <div class="p-3 h-100">
          <CardItemCarousel
            :title="entry.fields.title"
            :description="entry.fields.description"
            :cover="entry.fields.cover.url"
          ></CardItemCarousel>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import CardItemCarousel from "./card-item-carousel";
import axios from "axios";
import { Carousel, Slide } from "vue-carousel";
export default {
  components: {
    CardItemCarousel,
    Carousel,
    Slide
  },
  name: "card-carousel",
  data() {
    return {
      loading: true,
      entries: ""
    };
  },
  created() {
    const baseURI =
      "https://dynamicbank.modyo.build/api/content/spaces/fintech/content_types/card/entries/?meta.tag=carousel-home";
    axios
      .get(baseURI)
      .then(result => {
        this.entries = result.data.entries;
        this.loading = false;
      })
      .catch(error => {
        // console.log(error.response);
        this.error = error.response;
      });
  }
};
</script>

<style>
.carousel-caption {
  position: static !important;
}
</style>

