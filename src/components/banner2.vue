<template>
  <div class="banner-2 py-5">
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
            const baseURI = "https://dynamicbank.modyo.build/api/content/spaces/fintech/content_types/card/entries/7b6e7b55-1583-4dc3-8106-06b3296403b3";
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
  .banner-2 .container {
    background-size: cover;
  }
</style>