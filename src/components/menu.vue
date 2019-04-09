<template>
    <ul class="navbar-nav ml-auto my-2 my-lg-0">
        <li class="nav-item">
            <g-link class="nav-link js-scroll-trigger" to="/about">/About (ruta)</g-link>
        </li>
    </ul>
</template>

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