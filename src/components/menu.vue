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
        <img src="https://cloud.modyocdn.com/uploads/d401ed2b-bd7a-4c0a-9b32-e9f1e427bb74/original/dynamic_bank.png" />
      </g-link>
      <nav class="navbar ml-auto" id="mainNav">
        <ul class="nav ml-auto my-2 my-lg-0 d-flex">
          <li class="nav-item" v-for="item in menu" :key="item.slug">
            <g-link class="nav-link js-scroll-trigger" :to="item.slug">{{item.title}}</g-link>
          </li>
        </ul>
        <a href="#" class="btn btn-secondary mr-1">Online Banking</a>
        <a href="#" class="btn btn-primary">Become a Client</a>
      </nav>
    </div>
  </header>
  </div>
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
        "https://dynamicbank.modyo.build/api/content/spaces/static-data/content_types/menu/entries";
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