<template>
  <section class="benefits-section">
    <div class="container">
      <h2 class="benefits-title">Conoce los beneficios de comprar en MueblesLF</h2>
      <div class="benefits-row">
        <div class="benefit-card" v-for="(item, idx) in benefits" :key="idx">
          <div class="benefit-icon" v-html="item.icon"></div>
          <div class="benefit-title">{{ item.title }}</div>
          <div class="benefit-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const benefits = [
  {
    icon: `
      <svg width="60" height="60" fill="none" viewBox="0 0 60 60">
        <rect x="10" y="20" width="40" height="18" rx="3" stroke="#176C5B" stroke-width="3"/>
        <circle cx="18" cy="45" r="3" fill="#176C5B"/>
        <circle cx="42" cy="45" r="3" fill="#176C5B"/>
      </svg>
    `,
    title: 'PAGO SEGURO',
    desc: 'Realiza de manera segura tus compras, contamos con protección 3D Secure gracias a la tecnología de VISA.'
  },
  {
    icon: `
      <svg width="60" height="60" fill="none" viewBox="0 0 60 60">
        <rect x="12" y="25" width="36" height="16" rx="7" stroke="#176C5B" stroke-width="3"/>
        <circle cx="18" cy="43" r="3" fill="#176C5B"/>
        <circle cx="42" cy="43" r="3" fill="#176C5B"/>
        <rect x="25" y="18" width="10" height="8" rx="2" stroke="#176C5B" stroke-width="2"/>
      </svg>
    `,
    title: 'ENVIOS A TODO MÉXICO',
    desc: 'Realizamos entregas gratuitas. A toda la zona sur por solo el 5% del valor de su pedido. Envíos a toda la república mediante fleteras aliadas, cotiza por chat!'
  },
  {
    icon: `
      <svg width="60" height="60" fill="none" viewBox="0 0 60 60">
        <rect x="18" y="23" width="24" height="20" rx="2" stroke="#176C5B" stroke-width="3"/>
        <rect x="28" y="43" width="4" height="8" rx="1" fill="#176C5B"/>
        <rect x="34" y="43" width="4" height="8" rx="1" fill="#176C5B"/>
        <rect x="22" y="18" width="16" height="8" rx="2" stroke="#176C5B" stroke-width="2"/>
      </svg>
    `,
    title: 'OFERTAS INCREIBLES',
    desc: 'Descubre las mejores ofertas en nuestros Modelos! Además, recibe una garantía de 1 año al comprar cualquier producto en Muebles.'
  },
  {
    icon: `
      <svg width="60" height="60" fill="none" viewBox="0 0 60 60">
        <rect x="14" y="32" width="32" height="13" rx="3" stroke="#176C5B" stroke-width="3"/>
        <rect x="18" y="18" width="24" height="14" rx="2" stroke="#176C5B" stroke-width="2"/>
        <rect x="18" y="35" width="6" height="7" rx="2" fill="#176C5B"/>
        <rect x="36" y="35" width="6" height="7" rx="2" fill="#176C5B"/>
      </svg>
    `,
    title: '+20 AÑOS',
    desc: 'Contamos con más de 20 años de experiencia y  Sucursales en morelos, ofreciendo Muebles de Calidad a Precios Justos.'
  },
];
</script>

<style scoped>
.benefits-section {
  background: linear-gradient(135deg, #f9f9f9, #ffffff);
  padding: 3rem 0;
  border-radius: 0 0 2rem 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.benefits-title {
  font-size: 2.2rem;
  font-family: 'Montserrat', serif;
  font-weight: 700;
  color: #333;
  margin-bottom: 2.5rem;
  text-align: center;
}

.benefits-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.benefit-card {
  flex: 1 1 280px;
  max-width: 320px;
  background: #ffffff;
  border-radius: 1.5rem;
  text-align: center;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.benefit-icon {
  margin-bottom: 1.2rem;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.benefit-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #176C5B;
  margin-bottom: 0.8rem;
  letter-spacing: 0.5px;
}

.benefit-desc {
  color: #555;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .benefits-row {
    flex-direction: column;
    align-items: center;
  }
  .benefit-card {
    max-width: 100%;
    margin-bottom: 1.5rem;
  }
  .container {
    padding: 0 1rem;
  }
  .benefits-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
}
</style>
