// document.querySelectorAll('video').forEach(v => {
//   v.addEventListener('mouseover', () => {
//     if (!v.src) {
//       v.src = v.dataset.src;
//     }
//   });
// });
document.querySelectorAll('.product').forEach(product => {
  product.addEventListener('mouseover', () => {
    const video = product.querySelector('video');
    if (!video.src) {
      video.src = video.dataset.src;
    }
  });
});