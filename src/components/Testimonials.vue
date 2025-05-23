<template>
  <section class="testimonials-section py-5">
    <div class="container">
      <h3 class="mb-4 text-center testimonials-title">Testimonios</h3>
      <div class="testimonials-grid">
        <div
          class="testimonial-card"
          v-for="(item, i) in testimonials"
          :key="i"
          :style="{ animationDelay: (i * 0.18) + 's' }"
        >
          <div class="testimonial-img-wrap">
            <img :src="item.img" class="testimonial-img" :alt="item.name" />
          </div>
          <blockquote class="testimonial-text">
            <span class="quote-mark">“</span>
            {{ item.text }}
            <span class="quote-mark">”</span>
          </blockquote>
          <div class="testimonial-author">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ testimonials: Array })
</script>

<style scoped>
.testimonials-section {
  background: linear-gradient(120deg, #faf6fa 60%, #f7e6ef 100%);
  border-radius: 22px;
  margin-bottom: 2rem;
  box-shadow: 0 6px 30px #8607340c;
}

.testimonials-title {
  color: #860734;
  font-weight: 800;
  font-size: 2.1rem;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px #86073418;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.testimonial-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 28px #86073415;
  padding: 2.2rem 1.7rem 1.7rem 1.7rem;
  min-width: 250px;
  max-width: 410px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1.5px solid #fff4f8;
  position: relative;
  animation: fadeInUp 0.7s cubic-bezier(.68,-0.55,.27,1.55) backwards;
  transition: box-shadow 0.16s, border-color 0.18s;
}
.testimonial-card:hover {
  box-shadow: 0 6px 38px #86073431;
  border: 1.5px solid #86073440;
  z-index: 2;
}

.testimonial-img-wrap {
  background: linear-gradient(120deg, #fff, #fff7fa 90%);
  border-radius: 50%;
  box-shadow: 0 2px 14px #86073416;
  padding: 6px;
  margin-bottom: 1.1rem;
  width: 78px;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.testimonial-img {
  width: 66px;
  height: 66px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #86073433;
  box-shadow: 0 1px 10px #86073416;
  transition: filter 0.17s, transform 0.18s;
}
.testimonial-card:hover .testimonial-img {
  filter: brightness(1.1) saturate(1.2);
  transform: scale(1.05);
}

.testimonial-text {
  font-size: 1.11rem;
  color: #573043;
  margin-bottom: 1rem;
  font-weight: 500;
  line-height: 1.65;
  position: relative;
  padding: 0 0.5rem;
  font-family: 'Georgia', 'Cambria', serif;
}

.quote-mark {
  font-size: 2rem;
  color: #e94e77;
  vertical-align: sub;
  opacity: 0.5;
}

.testimonial-author {
  color: #860734;
  font-weight: bold;
  font-size: 1.04rem;
  margin-top: 0.3rem;
  letter-spacing: 0.7px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 700px) {
  .testimonials-section { border-radius: 12px; }
  .testimonials-title { font-size: 1.28rem; }
  .testimonial-card { padding: 1.2rem 0.7rem; max-width: 97vw; }
}
</style>
