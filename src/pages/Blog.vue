<template>
  <Layout>
    <section class="page-section text-black">
      <div class="container">
        <div v-for="edge in $page.posts.edges" :key="edge.node.id">
          <h2>
            <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
          </h2>
          <h5>{{edge.node.fields.createdAt}}</h5>
        </div>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query BlogPosts {
  posts: allBlogPosts (sortBy: "createdAt", order: DESC) {
    edges {
      node { 
        id,
        title,
        path,
        fields {
            createdAt
        }
      }
    }
  }
}
</page-query>

 <script>
import Layout from "~/layouts/Default.vue";
export default {
  metaInfo: {
    title: "Blog"
  }
};
</script>