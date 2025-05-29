export default {
  mounted(el) {
    el.classList.add('before-enter');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('enter');
          el.classList.remove('before-enter');
        } else {
          el.classList.remove('enter');
          el.classList.add('before-enter');
        }
      },
      { threshold: 0.13 }
    );
    el._observer = observer;
    observer.observe(el);
  },
  unmounted(el) {
    if (el._observer) el._observer.disconnect();
  }
};