<template>
  <Layout>
    <Hero></Hero>
    <Promotions></Promotions>
    <MainBanner></MainBanner>
    <SecondBanner></SecondBanner>
  </Layout>
</template>

<script>
import Hero from '~/components/hero.vue';
import Promotions from '~/components/promotions.vue';
import MainBanner from '~/components/banner1.vue';
import SecondBanner from '~/components/banner2.vue';

export default {
  components: {
      Hero,
      Promotions,
      MainBanner,
      SecondBanner
  },
  metaInfo: {
    title: "Hello, world!"
  }
};
</script>

<style>

</style>
