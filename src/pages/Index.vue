<template>
  <Layout>
    <Hero></Hero>
    <Promotions></Promotions>
    <MainBanner></MainBanner>
  </Layout>
</template>

<script>
import Hero from '~/components/hero.vue';
import Promotions from '~/components/promotions.vue';
import MainBanner from '~/components/banner1.vue';
export default {
  components: {
      Hero,
      Promotions,
      MainBanner
  },
  metaInfo: {
    title: "Hello, world!"
  }
};
</script>

<style>

</style>
