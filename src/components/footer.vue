<template>
  <footer class="bg-light py-5">
    <div class="container">
      <div class="small text-center text-muted" v-html="hint"></div>
    </div>
  </footer>

</template>

<script>
    import axios from "axios";
    export default {
        name: "Footer",
        data() {
            return {
                hint: ""
            };
        },
        mounted() {
            console.log("mounted");
        },
        created() {
            const baseURI = "https://dynamicbank.modyo.build/api/content/spaces/static-data/content_types/footer/entries/64df5949-27be-413b-99ed-9c40007daac4";
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

        }
    };
</script>

<style scoped>

</style>