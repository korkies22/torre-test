<!-- Este es el layout principal con el nav a la izquierda, se muestra siempre que un usuario esté autenticado -->
<template>
  <div class="app">
    <Nav></Nav>
    <!-- La notificación está acá para que se muestre en todas las pantallas de la aplicación -->
    <nuxt class="container" />
  </div>
</template>

<script>
import Nav from '@/components/nav/Nav'
export default {
  components: { Nav },
}
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  display: flex;
  position: relative;
}

.container {
  padding-top: $navHeight;
}
</style>
