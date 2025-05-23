<template>
  <section class="hero-banner">
    <div class="hero-overlay">
      <div class="hero-content container">
        <h1 class="hero-title animate-fade-in">Muebles con <span>75 años</span> de tradición</h1>
        <p class="hero-sub animate-fade-in" style="animation-delay:.18s">Hechos a mano en Tetecala, Morelos</p>
        <router-link
          to="/productos"
          class="cta-button animate-fade-in"
          style="animation-delay:.35s"
        >
          <i class="fas fa-couch"></i> Ver Catálogo
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-banner {
  min-height: 66vh;
  position: relative;
  background: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80') no-repeat center/cover;
  display: flex;
  align-items: stretch;
  box-shadow: 0 4px 44px #86073423;
  border-radius: 0 0 2.4rem 2.4rem;
  overflow: hidden;
}

.hero-overlay {
  width: 100%;
  height: 100%;
  background: linear-gradient(100deg,rgba(134,7,52,0.85) 70%,rgba(255,255,255,0.01) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 38px #8607341a inset;
  position: relative;
}

.hero-content {
  color: #fff;
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
  z-index: 2;
}

.hero-title {
  font-size: 3.2rem;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 1.3rem;
  line-height: 1.12;
  text-shadow: 0 4px 28px #86073430;
  animation: fadeInUp 1.1s cubic-bezier(.68,-0.55,.27,1.55) backwards;
}
.hero-title span {
  color: #ffd700;
  font-size: 1.1em;
  font-family: 'Georgia', serif;
  font-style: italic;
  text-shadow: 0 2px 8px #ffd70051;
}

.hero-sub {
  font-size: 1.22rem;
  font-weight: 500;
  color: #ffd4ec;
  letter-spacing: 0.4px;
  margin-bottom: 2.4rem;
  text-shadow: 0 1px 8px #86073438;
  animation: fadeInUp 0.8s 0.18s backwards;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: .8rem;
  background: linear-gradient(90deg,#ffd700 65%,#860734 120%);
  color: #860734 !important;
  padding: 1rem 2.5rem;
  border-radius: 36px;
  font-weight: 800;
  font-size: 1.19rem;
  margin-top: 1.3rem;
  box-shadow: 0 3px 20px #ffd70025;
  border: none;
  text-decoration: none;
  letter-spacing: 1.1px;
  outline: none;
  transition: background 0.19s, color 0.19s, box-shadow 0.18s, transform 0.18s;
  animation: fadeInUp 0.7s 0.35s backwards;
  position: relative;
  overflow: hidden;
}
.cta-button i {
  font-size: 1.5rem;
  color: #860734;
  filter: drop-shadow(0 2px 7px #ffd70080);
}
.cta-button:hover {
  background: linear-gradient(90deg,#ffe66b 50%,#c37fa3 100%);
  color: #6a0530 !important;
  transform: translateY(-6px) scale(1.06);
  box-shadow: 0 7px 34px #ffd70051;
}
.cta-button:active {
  transform: scale(0.98);
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.animate-fade-in {
  opacity: 0;
  animation: fadeInUp 1s forwards;
}
.hero-title.animate-fade-in { animation-delay: 0s; }
.hero-sub.animate-fade-in { animation-delay: .18s; }
.cta-button.animate-fade-in { animation-delay: .35s; }

@media (max-width: 700px) {
  .hero-banner { min-height: 37vh; border-radius: 0 0 1.1rem 1.1rem; }
  .hero-content { max-width: 95vw; }
  .hero-title { font-size: 1.47rem; }
  .hero-sub { font-size: 1.01rem; }
  .cta-button { font-size: 0.97rem; padding: 0.7rem 1.3rem; }
}
</style>
