<template>
  <Layout>
    <section class="page-section bg-dark text-white">
      <div v-for="edge in $page.posts.edges" :key="edge.node.id">
        <h2>
          {{ edge.node.title }} (
          <code>id:</code>
          {{edge.node.id}})
        </h2>
        {{edge.node}}
      </div>
    </section>
  </Layout>
</template>

<page-query>
query Posts {
  posts: allPosts {
    edges {
      node { 
        id,
        title,
        fields { 
            spaceId,
            typeName
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
    title: "Posts"
  }
};
</script>
