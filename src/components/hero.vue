<template>
  <div class="hero">
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <h1>{{ posts[0].fields['Title']}}</h1>
          <p v-html="posts[0].fields['Description']"></p>
          <div class="mt-4">
            <a href="#" class="btn btn-link btn-xl">Abre ahora</a>
          </div>
        </div>
        <div class="col-md-7" style="position: static">
          <img class="absolute-right" :src="posts[0].fields['Cover'].url" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import axios from "axios";
  export default {
    name: "hero",
      data() {
        return {
          loading: true,
          posts: []
        }
      },
      created() {
          const baseURI = "https://dynamicbank.modyo.build/api/content/spaces/fintech/content_types/hero/entries";
        axios
          .get(baseURI)
          .then(result => {
              this.posts = result.data.entries;
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
  .hero {
    position: relative;
    height: 60vh;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .absolute-right {
    position: absolute;
    width: 500px;
    top: 40px;
    right: 0;
    left: auto;
    display: block;
  }
</style>