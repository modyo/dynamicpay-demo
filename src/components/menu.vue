<template>
  <ul class="navbar-nav ml-auto my-2 my-lg-0">
    <li class="nav-item" v-for="item in menu" :key="item.slug">
      <g-link class="nav-link js-scroll-trigger" :to="item.slug">{{item.title}}</g-link>
    </li>
  </ul>
</template>

<script>
import axios from "axios";
export default {
  name: "MainMenu",
  data: () => {
    return {
      loading: false,
      menu: [],
      error: null
    };
  },
  created() {
    this.fetchMenu();
  },
  methods: {
    fetchMenu: function() {
      this.error = this.menu = [];
      this.loading = true;
      // replace `getPost` with your data fetching util / API wrapper
      const baseURI =
        "http://dynamicbank.modyo.build/api/content/spaces/static-data/content_types/menu/entries";
      axios
        .get(baseURI)
        .then(result => {
          // console.log("result.data.entries: ", result.data.entries);
          const entries = result.data.entries;
          let menu = [];
          for (const item of entries) {
            // console.log("item: ", item);
            const menuItem = {
              id: item.meta.uuid,
              title: item.fields.Titulo,
              slug: item.fields.Slug
            };
            this.menu.push(menuItem);
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

<style scoped>
</style>