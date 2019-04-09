<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
      <div class="container">
        <g-link class="navbar-brand js-scroll-trigger" to="/">{{ $static.metaData.siteName }}</g-link>
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto my-2 my-lg-0">
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#services">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#portfolio">Portfolio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#contact">Contact</a>
            </li>
            <li class="nav-item">
              <g-link class="nav-link js-scroll-trigger" to="/about">/About (ruta)</g-link>
            </li>
            <li class="nav-item">
              <g-link class="nav-link js-scroll-trigger" to="/posts">/Posts (ruta)</g-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Site body -->
    <slot/>
    <!-- Footer -->
    <footer class="bg-light py-5">
      <div class="container">
        <div class="small text-center text-muted">Copyright &copy; 2019 - Start Bootstrap</div>
      </div>
    </footer>
  </div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<style>
</style>
