<template>
  <footer class="bg-light py-5">
    <div class="container align-items-center d-flex justify-content-center flex-column">
      <ul class="nav d-inline-flex mb-5">
        <li class="nav-item" v-for="item in menu" :key="item.url">
          <g-link class="nav-link js-scroll-trigger" :to="item.url">{{item.name}}</g-link>
        </li>
      </ul>
      <div class="row">
        <div class="col-lg-3"></div>
        <div class="col-lg-6">
          <div class="small text-center text-muted" v-html="hint"></div>
        </div>
      </div>
    </div>
  </footer>

</template>

<script>
    import axios from "axios";
    export default {
        name: "Footer",
        data() {
            return {
                hint: "",
                menu: []
            };
        },
        mounted() {
            console.log("mounted");
        },
        created() {
            const baseURI = "https://dynamicbank.modyo.build/api/content/spaces/static-data/types/footer/entries/f2740b44-0eb4-4d94-bc53-1384ce88db7c";
            axios
                .get(baseURI)
                .then(result => {
                    this.hint = result.data.fields.footer_hint;
                    this.loading = false;

                })
                .catch(error => {
                    // console.log(error.response);
                    this.error = error.response;
                });
            this.fetchMenu();

        },
        methods: {
            fetchMenu: function() {
                this.error = this.menu = [];
                this.loading = true;
                const baseURI =
                    "https://dynamicbank.modyo.build/api/content/spaces/static-data/types/menu-item/entries";
                axios
                    .get(baseURI)
                    .then(result => {
                        // console.log("result.data.entries: ", result.data.entries);
                        const entries = result.data.entries;
                        let menutmp = [];
                        for (const item of entries) {
                            // console.log("item: ", item);
                            const menuItem = {
                                id: item.meta.uuid,
                                name: item.fields.name,
                                url: item.fields.url,
                                position: item.fields.position,
                                showFooter: item.fields.show_in_footer
                            };
                            menutmp.push(menuItem);
                        }
                        this.menu = menutmp.filter(entry => entry.showFooter)

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