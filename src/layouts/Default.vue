<template>
    <header class="header">
      <strong>
        <g-link to="/">{{ $static.metaData.siteName }}</g-link>
      </strong>
      <g-link to="/"><g-image alt="Logo Modyo" src="/logo-modyo.png" /></g-link>
      <nav class="nav">
        <g-link class="nav__link" to="/">Inicio</g-link>
        <g-link class="nav__link" to="/about">Acerca de</g-link>
      </nav>
    </header>
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
