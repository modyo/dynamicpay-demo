
<template>
  <Layout>
    <section class="page-section">
      <div class="container">
        <h2>{{this.$page.blogPosts.title}}</h2>
        <div v-html="this.$page.blogPosts.content"></div>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query BlogPosts ($id: String!) {
  blogPosts (id: $id) {
    title
    id,
    content
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.blogPosts.title
    };
  }
};
</script>