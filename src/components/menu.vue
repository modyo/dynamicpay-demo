<template>
  <ul class="navbar-nav ml-auto my-2 my-lg-0">
    <li class="nav-item" v-for="edge in $static.menu.edges" :key="edge.node.slug">
      <g-link class="nav-link js-scroll-trigger" :to="edge.node.slug">{{edge.node.title}}</g-link>
    </li>
  </ul>
</template>

<static-query>
query Menu {
  menu: allMenu {
    edges {
      node {
        title,
        id,
        slug
      }
    }
  }
}
</static-query>

<script>
export default {
  name: "MainMenu",
  data() {
    return {
      name: "",
      rut: "",
      noRut: false,
      depto: "",
      as: [],
      deptoPanel: "",
      parking: "",
      parkingStatus: false
    };
  },
  mounted() {
    console.log("mounted");
  },
  created() {
    console.log("creado");
  }
};
</script>

<style scoped>
</style>