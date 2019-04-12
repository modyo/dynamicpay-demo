<template>
  <div v-if="!posts.length">
    Cargando
  </div>
  <div v-else class="banner-1 py-5">
    <div class="container">
      <div class="row no-gutters">
        <div class="col-md-6">
          <img :src="entry.cover.url" />
        </div>
        <div class="col-md-6 d-flex align-items-center">
          <div>
          <h2>{{ entry.title }}</h2>
          <p v-html="entry.description"></p>
          <div class="mt-4">
            <a :href="entry.url" class="btn btn-secondary">{{ entry.button}}</a>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "banner-1",
        data() {
            return {
                loading: true,
                entry: ''
            }
        },
        created() {
            const baseURI = "https://dynamicbank.modyo.build/api/content/spaces/fintech/content_types/card/entries/0a2556f1-a33c-4f88-80b7-a8c87c727b24";
            axios
                .get(baseURI)
                .then(result => {
                    this.entry = result.data.fields;
                    this.loading = false;
                })
                .catch(error => {
                    // console.log(error.response);
                    this.error = error.response;
                });
        }


    }
</script>

<style scoped>
  img {
    max-width: 100%;
    width: 60%;
  }
.banner-1 {
  background: #f9f9f9;
  height: 70vh;
  display: flex;
  align-items: center;
}
</style>