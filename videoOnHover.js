document.querySelectorAll('video').forEach(v => {
  v.addEventListener('mouseover', () => {
    if (!v.src) {
      v.src = v.dataset.src;
    }
  });
});