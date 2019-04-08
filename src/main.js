// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "~/assets/base.css";
import DefaultLayout from "~/layouts/Default.vue";

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  head.link.push(
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700"
    },
    {
      rel: "stylesheet",
      href:
        "https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic"
    }
  );
  Vue.use(BootstrapVue);
}
