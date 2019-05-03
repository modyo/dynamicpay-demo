<template>
  <div v-else class="card-item-carousel h-100">
      <div class="cover mb-2" :style="{backgroundImage: 'url(' + cover + ')'}">

      </div>
      <div class="description p-4">
          <h2 class="h5 mb-3">{{ title }}</h2>
          <p v-html="description"></p>
      </div>
  </div>
</template>

<script>
    export default {
        name: "card-item-carousel",
        props: {
            title: String,
            description: String,
            cover: String
        }

    }
</script>

<style scoped>
  .cover {
    background-size: cover;
    background-position: center;
  }
  .cover {
    height: 100px;
    overflow: hidden;
  }
  .card-item-carousel {
    background: #f9f9f9;
  }
</style>