<template>
<div>
    <MainMenu></MainMenu>
    <!-- Site body -->
    <slot/>
    <!-- Footer -->
    <Footer></Footer>
</div>
</template>

<static-query>

</static-query>

<script>
  import MainMenu from '~/components/menu.vue';
  import Footer from '~/components/footer.vue'

  export default {
    components: {
      MainMenu,
        Footer
    }
  }
</script>


<style>
</style>
