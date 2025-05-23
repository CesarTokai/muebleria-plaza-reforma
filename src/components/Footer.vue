<template>
  <footer class="footer">
    <div class="container footer-container">
      <div>
        <h4>Mueblería Plaza Reforma</h4>
        <p>Tetecala, Morelos, México</p>
        <p>Teléfono: 734 153 2692</p>
        <p>Horario: Lunes a Sábado (9:00 AM - 8:00 PM)</p>
      </div>
      <div>
        <h4>Especialidades</h4>
        <ul>
          <li>Muebles rústicos y modernos</li>
          <li>75 años de experiencia</li>
          <li>Entrega a domicilio</li>
          <li>Créditos internos</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #860734;
  color: white;
  padding: 2rem 0;
  margin-top: 3rem;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-container div {
  flex: 1 1 300px;
  margin-bottom: 1rem;
}

.footer h4 {
  margin-bottom: 1rem;
}

.footer ul {
  list-style: none;
  padding-left: 0;
}

.footer ul li {
  margin-bottom: 0.5rem;
}
</style>
