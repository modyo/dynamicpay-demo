<template>
  <Layout>
    <Hero></Hero>
    <MainBanner></MainBanner>
    <SecondBanner></SecondBanner>
    <CardCarousel></CardCarousel>

  </Layout>
</template>

<script>
import Hero from '~/components/hero.vue';
import MainBanner from '~/components/banner1.vue';
import SecondBanner from '~/components/banner2.vue';
import CardCarousel from "../components/card-carousel";

export default {
  components: {
      CardCarousel,
      Hero,
      MainBanner,
      SecondBanner
  },
  metaInfo: {
    title: "Dynamic Bank"
  }
};
</script>

<style>

</style>
