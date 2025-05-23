<template>
  <section class="hero-banner">
    <div class="overlay">
      <div class="container">
        <h1>Muebles con 75 años de tradición</h1>
        <p>Hechos a mano en Tetecala, Morelos</p>
        <router-link to="/productos" class="cta-button">Ver Catálogo</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-banner {
  background: url('/assets/img/hero-banner.jpg') no-repeat center/cover;
  height: 70vh;
  position: relative;
}

.overlay {
  background-color: rgba(134, 7, 52, 0.7);
  height: 100%;
  display: flex;
  align-items: center;
}

.container {
  color: white;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.cta-button {
  display: inline-block;
  background: white;
  color: #860734;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-weight: bold;
  margin-top: 1rem;
  transition: transform 0.3s;
}

.cta-button:hover {
  transform: translateY(-5px);
}
</style>