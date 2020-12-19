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
  @include page;
  flex-direction: column;
  display: flex;
  margin-left: 7rem;
  margin-right: 5rem;

  &__bag {
    width: 1.8rem;
    height: 1.8rem;
    position: absolute;
    right: 1.5rem;
    top: 1rem;
    margin-top: 0.3rem;
    margin-right: 0.3rem;
    cursor: pointer;
  }
}
</style>
