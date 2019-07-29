<template>
  <div class="banner-2 py-5" v-if="loading === false">
    <div class="container p-5" :style="{backgroundImage: 'url(' + entry.cover.url + ')'}">
      <div class="row no-gutters">
        <div class="col-md-8"></div>
        <div class="col-md-4">
          <div class="bg-white p-5">
          <h2>{{ entry.title}}</h2>
          <p>Conoce los beneficios del mes de Abril</p>
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
        name: "banner2",
        data() {
            return {
                loading: true,
                entry: ''
            }
        },
        created() {
            const baseURI = "https://dynamicbank.modyo.build/api/content/spaces/fintech/types/card/entries?meta.tag=banner2";
            axios
                .get(baseURI)
                .then(result => {
                    this.entry = result.data.entries[0].fields;
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
  .banner-2 .container {
    background-size: cover;
  }
</style>