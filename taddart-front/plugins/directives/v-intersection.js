import Vue from 'vue'
Vue.directive('intersection', {
  inserted: (el, binding, vnode) => {
    const observer = new IntersectionObserver((entries)=> {
      const isIntersecting = Boolean(entries.find(entry => entry.isIntersecting))
      if(isIntersecting) {
        entries.forEach(entry => entry.target.classList.add(binding.value || 'visible'))
        observer.unobserve(el);
      }
    }, {
      threshold: 0.25,
    });
    observer.observe(el);
  }
})
