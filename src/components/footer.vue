<template>
  <footer class="bg-light py-5">
    <div class="container">
      <div class="small text-center text-muted">Copyright &copy; 2019 - Start Bootstrap</div>
    </div>
  </footer>

</template>

<script>
    export default {
        name: "Footer",
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