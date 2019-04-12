<template>
  <Layout>
    <section class="page-section bg-dark text-white">
      <div class="container">
        <div v-if="loading">
          <h2>Cargando....</h2>
        </div>
        <div v-else>
          <div v-for="post in posts" :key="post.id">
            <h2>{{ post.title }}</h2>
            <h5>
              <code>id:</code>
              {{post.id}}
            </h5>
            <div v-html="post.description"/>
            <hr class="divider light my-5">
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import axios from "axios";
import Layout from "~/layouts/Default.vue";
export default {
  metaInfo: {
    title: "Posts"
  },
  created() {
    this.fetchPosts();
  },
  data: () => {
    return {
      loading: false,
      posts: [],
      error: null
    };
  },
  methods: {
    fetchPosts: function() {
      this.error = this.posts = [];
      this.loading = true;
      const baseURI = `${this.$api}/fintech/content_types/post/entries`;
      axios
        .get(baseURI)
        .then(result => {
          // console.log("result.data.entries: ", result.data.entries);
          const entries = result.data.entries;
          let posts = [];
          for (const entry of entries) {
            // console.log("entry: ", entry);
            const post = {
              id: entry.meta.uuid,
              title: entry.fields.Titulo,
              description: entry.fields.Descripcion
            };
            this.posts.push(post);
          }
          this.loading = false;
        })
        .catch(error => {
          // console.log(error.response);
          this.error = error.response;
        });
    }
  }
};
</script>
