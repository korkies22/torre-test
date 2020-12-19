<!-- Este es el layout principal con el nav a la izquierda, se muestra siempre que un usuario esté autenticado -->
<template>
  <div class="main">
    <!-- La notificación está acá para que se muestre en todas las pantallas de la aplicación -->
    <nuxt class="container" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  display: flex;
  position: relative;
}
</style>
