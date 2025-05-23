<template>
  <footer class="footer-section">
    <div class="container footer-row">
      <div class="footer-col footer-brand">
        <h4><i class="fas fa-couch"></i> Mueblería Plaza Reforma</h4>
        <p><i class="fas fa-map-marker-alt"></i> Tetecala, Morelos, México</p>
        <p><i class="fas fa-phone"></i> 734 153 2692</p>
        <p><i class="fas fa-clock"></i> Lunes a Sábado <span class="footer-horario">(9:00 AM - 8:00 PM)</span></p>
      </div>
      <div class="footer-col">
        <h4><i class="fas fa-star"></i> Especialidades</h4>
        <ul>
          <li><i class="fas fa-couch"></i> Muebles rústicos y modernos</li>
          <li><i class="fas fa-award"></i> 75 años de experiencia</li>
          <li><i class="fas fa-truck"></i> Entrega a domicilio</li>
          <li><i class="fas fa-credit-card"></i> Créditos internos</li>
        </ul>
      </div>
      <div class="footer-col footer-social">
        <h4><i class="fas fa-share-alt"></i> Síguenos</h4>
        <div class="footer-social-links">
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
        <small class="footer-copyright">
          &copy; {{ new Date().getFullYear() }} Mueblería Plaza Reforma
        </small>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No hay JS real, pero puedes agregar lógica para el año si prefieres
</script>

<style scoped>
.footer-section {
  background: linear-gradient(120deg, #860734 80%, #440224 100%);
  color: #fff;
  padding: 3rem 0 2rem 0;
  margin-top: 3rem;
  border-radius: 1.5rem 1.5rem 0 0;
  box-shadow: 0 -4px 24px #86073426;
  font-size: 1.07rem;
}

.footer-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-col {
  flex: 1 1 210px;
  min-width: 180px;
  max-width: 350px;
  margin-bottom: 1.5rem;
  padding: 1.2rem 1rem 0.8rem 1rem;
  border-radius: 18px;
  background: rgba(255,255,255,0.05);
  box-shadow: 0 2px 18px #86073413;
}

.footer-col h4 {
  margin-bottom: 1.2rem;
  font-weight: 800;
  font-size: 1.17rem;
  color: #ffd700;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.footer-col p, .footer-col li, .footer-col a {
  color: #fff;
  font-weight: 500;
  margin-bottom: 0.5rem;
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}
.footer-horario { font-size: 0.95em; color: #ffd700; margin-left: 0.5em; }
.footer-col ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}
.footer-col li i {
  color: #ffd700;
  min-width: 1.3em;
}
.footer-social-links {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 0.6rem;
}
.footer-social-links a {
  color: #ffd700;
  background: #fff2;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: background 0.2s, color 0.19s, transform 0.19s;
}
.footer-social-links a:hover {
  background: #fff5;
  color: #fff;
  transform: translateY(-4px) scale(1.09);
}
.footer-copyright {
  display: block;
  margin-top: 1.1rem;
  color: #ffd700cc;
  font-size: 0.97rem;
  text-align: left;
  letter-spacing: 0.7px;
}

@media (max-width: 800px) {
  .footer-row {
    flex-direction: column;
    align-items: center;
    gap: 1.1rem;
  }
  .footer-col { width: 98%; max-width: 550px; text-align: center; }
  .footer-copyright { text-align: center; }
}
</style>
