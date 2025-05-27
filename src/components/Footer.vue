<template>
  <footer class="footer-section">
    <div class="container footer-row">
      <!-- Dirección y descripción breve -->
      <div class="footer-col footer-brand">
        <h4><i class="fas fa-couch"></i> Tetecala, Morelos</h4>
        <p><i class="fas fa-map-marker-alt"></i> Mueblería Plaza Reforma, tu mejor opción en la zona sur.</p>
        <p><i class="fas fa-phone"></i> 734 153 2692</p>
        <p><i class="fas fa-clock"></i> Lunes a Sábado <span class="footer-horario">(9:00 AM - 8:00 PM)</span></p>
      </div>

      <!-- Beneficios y Métodos de pago -->
      <div class="footer-col footer-benefits">
        <h4><i class="fas fa-star"></i> Beneficios</h4>
        <ul>
          <li><i class="fas fa-couch"></i> Cobertura de entrega</li>
          <li><i class="fas fa-award"></i> Devolución sin costo los primeros 7 días</li>
          <li><i class="fas fa-truck"></i> Entrega a domicilio</li>
          <li><i class="fas fa-credit-card"></i> Tarjeta, efectivo y meses sin intereses</li>
          <li><i class="fas fa-hand-holding-heart"></i> Garantía de satisfacción</li>
        </ul>
        <!-- Métodos de pago -->
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

        <div class="payment-section">
          <span class="payment-label"><i class="fas fa-shipping-fast"></i> Métodos de pago:</span>
          <div class="payment-icons">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" title="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="MasterCard"
              title="MasterCard" />
            <img src="https://seeklogo.com/images/M/mercado-pago-logo-0B017F44B8-seeklogo.com.png" alt="Mercado Pago"
              title="Mercado Pago" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Logo_Oxxo.svg" alt="Oxxo" title="Oxxo" />
          </div>
        </div>
      </div>

      <!-- Descripción -->
      <div class="footer-col footer-description">
        <h4><i class="fas fa-lightbulb"></i> Diseña la vida que tú quieras</h4>
        <p>
          Gaia es la marca mexicana de muebles y accesorios de diseño.<br>
          Compra rápido, fácil y seguro. Sofás, sillas, mesas, escritorios, cómodas, burós, camas, colchones, lámparas y
          accesorios en diferentes estilos.<br>
          Proponemos diseños simples y modernos adaptados a tu espacio.<br>
          <span class="footer-mision">Nuestra misión: empoderarte a seguir soñando y diseñar la vida que tú
            quieras.</span>
        </p>
      </div>

      <!-- Redes sociales -->
      <div class="footer-col footer-social">
        <h4><i class="fas fa-share-alt"></i> Síguenos</h4>
        <div class="footer-social-links">
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
        <div class="footer-ayuda">
          <h4><i class="fas fa-question-circle"></i> Ayuda</h4>
          <a href="tel:7341532692"><i class="fas fa-phone"></i> 734 153 2692</a>
          <a href="tel:5585250137"><i class="fas fa-phone"></i> 55 8525 0137</a>
        </div>
      </div>
    </div>
    <!-- Copyright centrado abajo -->
    <div class="footer-copyright">
      &copy; {{ new Date().getFullYear() }} Mueblería Plaza Reforma. Todos los derechos reservados.
    </div>
  </footer>
</template>

<script setup>

import './assets/styles.css';
</script>

<style scoped>
.footer-section {
  background: linear-gradient(120deg, #860734 80%, #440224 100%);
  color: #fff;
  padding: 3rem 0 1rem 0;
  border-radius: 1.5rem 1.5rem 0 0;
  box-shadow: 0 -4px 24px #86073426;
  font-size: 1.07rem;
  margin-top: 3rem;
}

.footer-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  align-items: flex-start;
}

.footer-col {
  flex: 1 1 240px;
  min-width: 210px;
  max-width: 350px;
  margin-bottom: 1.5rem;
  padding: 1.2rem 1rem 0.8rem 1rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 2px 18px #86073413;
}

.footer-col h4 {
  margin-bottom: 1.2rem;
  font-weight: 800;
  font-size: 1.15rem;
  color: #ffd700;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-col ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0.8rem;
}

.footer-col li,
.footer-col a,
.footer-col p {
  color: #fff;
  font-weight: 500;
  margin-bottom: 0.5rem;
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1rem;
}

.footer-col li i,
.footer-col a i {
  color: #ffd700;
  min-width: 1.3em;
}

.footer-mision {
  color: #ffd700;
  font-style: italic;
  display: block;
  margin-top: 0.6em;
}

.payment-section {
  margin-top: 1.3em;
}

.payment-label {
  font-weight: 700;
  color: #fffde6;
  margin-bottom: 0.7em;
  display: block;
}

.payment-icons {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 0.4em;
}

.payment-icons img {
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 1px 6px #0002;
  padding: 3px 8px;
  height: 28px;
  transition: box-shadow 0.2s, transform 0.16s;
  border: 1px solid #eee;
}

.payment-icons img:hover {
  box-shadow: 0 2px 16px #ffd70044;
  transform: scale(1.09) rotate(-2deg);
}

.footer-social-links {
  display: flex;
  gap: 1.3rem;
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

.footer-ayuda {
  margin-top: 1.4em;
}

.footer-ayuda h4 {
  color: #ffd700;
  font-size: 1.09rem;
  margin-bottom: 0.5rem;
  gap: 0.4rem;
}

.footer-ayuda a {
  color: #fff;
  font-weight: 600;
  font-size: 0.97rem;
  margin-right: 1.3rem;
}

.footer-ayuda a i {
  color: #25D366;
  margin-right: 0.5em;
}

.footer-horario {
  color: #ffd700;
  font-size: 0.95em;
  margin-left: 0.5em;
}

.footer-description {
  font-size: 0.99rem;
  line-height: 1.6;
  color: #ffe6f0;
}

@media (max-width: 950px) {
  .footer-row {
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
  }

  .footer-col {
    width: 99%;
    max-width: 570px;
    text-align: center;
  }
}

.footer-copyright {
  margin-top: 1.8rem;
  color: #ffd700e3;
  font-size: 0.99rem;
  text-align: center;
  letter-spacing: 0.8px;
  border-top: 1px solid #ffd70022;
  padding-top: 0.7rem;
}
</style>
