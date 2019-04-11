<template>
  <div>
    <div class="top-header d-none d-sm-block">
      <div class="container d-flex">

          <div class="top-header--left">
            <a href="" class="top-header__link link-left active"><small>Personal</small></a>
            <a href="" class="top-header__link link-left"><small>Golden</small></a>
            <a href="" class="top-header__link link-left"><small>Business</small></a>
          </div>
          <div class="top-header--right ml-auto">
            <a href="https://dynamicbank.modyo.cloud/retail/places" class="top-header__link link-right"><small><i class="icon-map-marker"></i> Locations</small></a>
            <a href="" class="top-header__link link-right"><small>Customer Service</small></a>
            <a href="" class="top-header__link link-right link-red"><small>Emergencies</small></a>
          </div>

      </div>
    </div>
  <header id="main-header">
    <div class="container d-flex">
      <g-link class="navbar-brand js-scroll-trigger" to="/" >
        <img :alt="$static.metaData.siteName" :title="$static.metaData.siteName" src="https://cloud.modyocdn.com/uploads/d401ed2b-bd7a-4c0a-9b32-e9f1e427bb74/original/dynamic_bank.png" />
      </g-link>
      <nav class="navbar ml-auto" id="mainNav">
        <ul class="nav ml-auto my-2 my-lg-0 d-flex">
          <li class="nav-item" v-for="edge in $static.menu.edges" :key="edge.node.slug">
            <g-link class="nav-link js-scroll-trigger" :to="edge.node.slug">{{edge.node.title}}</g-link>
          </li>
        </ul>
        <a href="#" class="btn btn-secondary mr-1">Online Banking</a>
        <a href="#" class="btn btn-primary">Become a Client</a>
      </nav>
    </div>
  </header>
  </div>
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
  metaData {
  siteName
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
  .top-header {
    background: #f4f4f4;
    font-size: 12px
  }
  .top-header__link.active {
    font-weight: 400;
    background-color: #FFF;
    color: #4d4d4d;
  }
  .top-header__link.link-left,
  .top-header__link.link-right {
    color: #4d4d4d;
  }
  .top-header__link {
    display: inline-block;
    padding: 3px 12px;
  }
  .navbar-brand {
    display: flex;
    align-items: center;
  }
  .navbar-brand img {
    height: 25px;
    display: block;
  }
  #main-header {
    display: flex;
    align-items: center;
    padding: 1rem 0;
  }
  .navbar {
    padding: 0;
  }
</style>