<!-- Esta es la página de error cuando se entra a una página que no existe o sucede un error general en la aplicación -->
<template>
  <div class="layoutError">
    <div class="layoutError__background">
      <h1>404</h1>
      <h3>Page not found</h3>
      <p>Looks like you're lost</p>
      <div class="layoutError__button" @click="$router.push('/')">
        <div class="layoutError__button-back">Go to home</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layoutError {
  height: 100vh;
  width: 100%;
  &__background {
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.9),
        rgba(0, 0, 0, 0.7)
      ),
      url('~@/assets/images/peopleWorking.jpg') no-repeat fixed center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    text-align: center;
    & h1 {
      font-size: 12rem;
      margin: 0;
      color: $white;
    }
    & h3 {
      font-size: 2.3rem;
      margin: 0;
      color: $white;
    }
    & p {
      font-size: 1rem;
      margin: 0;
      color: $white;
    }
  }
  &__button {
    margin: 1rem 0;
    width: 15rem;

    &-back {
      width: 100%;
      height: 4rem;
      border-radius: 17px;
      border: solid 5px transparent;
      background-image: linear-gradient(
        rgba($color: #fff, $alpha: 0),
        rgba($color: #fff, $alpha: 0)
      );
      background-origin: border-box;
      background-clip: content-box, border-box;
      box-shadow: 2px 1000px 1px $black inset;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 200ms;
      & img {
        width: 2rem;
        height: 2rem;
      }
      &:hover {
        box-shadow: none;
        color: white;
      }
    }
  }
}
</style>
