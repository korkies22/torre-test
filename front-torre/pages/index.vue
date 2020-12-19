<!-- Página principal, aquí se muestran los tabs con 
ofertas recibidas, ofertas enviadas y facturas -->

<template>
  <div class="main">
    <h1>Groups</h1>
  </div>
</template>

<script>
export default {
  middleware: ['init-auth', 'authenticated', 'redirect-child'],
}
</script>

<style lang="scss" scoped>
.main {
  transition-duration: 500ms;
}
</style>
