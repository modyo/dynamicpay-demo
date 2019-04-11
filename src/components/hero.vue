<template>
  <div class="hero">
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <h1>Cuenta Corriente Costo $0</h1>
          <div class="mt-4">
            <a href="#" class="btn btn-primary btn-xl">Abre ahora</a>
          </div>
        </div>
      </div>
    </div>
    <div id="jarallax-container-0" style="position: absolute; top: 0px; left: 0px; right: 0; bottom: 0; overflow: hidden; pointer-events: none; z-index: -100;"></div>
  </div>
</template>

<script>
    export default {
        name: "hero"
    }
</script>

<style scoped>
  .hero {
    position: relative;
    height: 380px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  #jarallax-container-0 {
    background: url("https://images.ctfassets.net/p6eyia4djstu/NYPqw9mLqoiQyoCC0UuEK/35aa66ea402c26be6a2cdd19e34da20e/banner-octubre-bienvenida.png");
    background-size: cover;
  }

</style>