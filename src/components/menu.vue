<template>
    <ul class="navbar-nav ml-auto my-2 my-lg-0">
        <li class="nav-item" v-for="edge in $components.menu.edges" :key="edge.node.slug">
            <g-link class="nav-link js-scroll-trigger" :to="edge.node.slug">{{edge.node.name}}</g-link>
        </li>
    </ul>
</template>

<page-query>
query Menu {
  posts: allPosts {
    edges {
      node {
        name,
        slug
      }
    }
  }
}
</page-query>

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