<template>
  <header class="navbar">
    <div class="navbar__inner">
      <div class="navbar__brand-wrap">
        <a href="#" class="navbar__brand">
          <span class="navbar__logo">
            <!-- SVG logo -->
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_6_330)">
                <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="#1976D2" fill-rule="evenodd"/>
              </g>
              <defs><clipPath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clipPath></defs>
            </svg>
          </span>
          <span class="navbar__title">Furniture Haven</span>
        </a>
      </div>

      <nav class="navbar__nav">
        <a v-for="item in nav" :key="item.label" :href="item.href" class="navbar__link" :class="{ active: item.active }">{{ item.label }}</a>
      </nav>

      <div class="navbar__actions">
        <div class="navbar__search">
          <span class="navbar__search-icon">
            <svg width="16" height="16" viewBox="0 0 256 256" fill="none"><path fill="#9EADB3" d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>
          </span>
          <input type="search" class="navbar__search-input" placeholder="Search products..." aria-label="Buscar productos" />
        </div>

        <button class="navbar__icon" title="Wishlist" aria-label="Wishlist">
          <svg width="20" height="20" viewBox="0 0 256 256"><path fill="#9EADB3" d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"/></svg>
        </button>

        <button class="navbar__icon" title="Cart" aria-label="Cart">
          <svg width="20" height="20" viewBox="0 0 256 256"><path fill="#9EADB3" d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a48,48,0,0,1-96,0,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0Z"/></svg>
        </button>

        <span class="navbar__avatar" aria-hidden="true">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User avatar" />
        </span>
      </div>
    </div>
  </header>
</template>

<script setup>
const nav = [
  { label: 'Home', href: '#', active: true },
  { label: 'Living Room', href: '#', active: false },
  { label: 'Bedroom', href: '#', active: false },
  { label: 'Dining', href: '#', active: false },
  { label: 'Office', href: '#', active: false }
]
</script>

<style scoped>
/* Navbar outer container (rounded border visible) */
.navbar {
  padding: 12px; /* outer spacing so border is visible around page content */
}

.navbar__inner {
  background: linear-gradient(180deg, #ffffff, #fbfdff);
  border-radius: 12px;
  border: 3px solid #9cc7ff; /* soft blue border like the screenshot */
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 10px 20px;
}

.navbar__brand-wrap {
  display: flex;
  align-items: center;
  min-width: 220px; /* leave space for brand */
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.navbar__logo svg { display: block; }

.navbar__title {
  font-family: Inter, 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial;
  font-weight: 700;
  color: #0f1724;
  font-size: 1.05rem;
  letter-spacing: 0.2px;
}

/* Center nav links */
.navbar__nav {
  display: flex;
  gap: 22px;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
}

.navbar__link {
  color: #475569;
  text-decoration: none;
  font-weight: 600;
  padding: 6px 8px;
  border-radius: 8px;
  font-size: 0.98rem;
  transition: color 160ms ease, background 160ms ease, transform 160ms ease;
}

.navbar__link:hover {
  color: #0ea5e9;
}

.navbar__link.active {
  color: #0ea5e9;
  background: rgba(14,165,233,0.06);
}

/* Actions to the right */
.navbar__actions {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
  min-width: 260px;
}

/* Search capsule */
.navbar__search {
  display: flex;
  align-items: center;
  background: #f3f9ff;
  border-radius: 999px;
  padding: 8px 12px;
  height: 40px;
  border: 1px solid rgba(14,165,233,0.12);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
}

.navbar__search-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: #222c36;
  width: 160px;
  font-family: inherit;
}
.navbar__search-input::placeholder {
  color: #b0bec5;
  font-weight: 400;
}
.navbar__icon {
  background: none;
  border: none;
  padding: 0;
  margin: 0 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 50%;
  transition: background 0.15s;
  height: 40px;
  width: 40px;
  justify-content: center;
}
.navbar__icon:hover {
  background: #e3f0fc;
}
.navbar__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e3f0fc;
  background: #fff;
}
.navbar__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
@media (max-width: 900px) {
  .navbar__container {
    padding: 0 12px;
    gap: 10px;
  }
  .navbar__nav {
    gap: 16px;
  }
  .navbar__search {
    min-width: 120px;
    padding: 0 6px;
  }
  .navbar__search-input {
    width: 80px;
    font-size: 0.95rem;
  }
}
@media (max-width: 700px) {
  .navbar__container {
    flex-wrap: wrap;
    gap: 8px;
    min-height: 56px;
  }
  .navbar__nav {
    gap: 8px;
  }
  .navbar__search {
    min-width: 60px;
    padding: 0 2px;
  }
  .navbar__search-input {
    width: 50px;
    font-size: 0.9rem;
  }
  .navbar__title {
    font-size: 1rem;
  }
}
</style>
