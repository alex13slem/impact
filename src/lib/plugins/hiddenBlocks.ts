const hiddenBlocks = document.querySelectorAll('.hidden-block');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('hidden-block--visible');
    }
  });
});
hiddenBlocks.forEach(el => observer.observe(el));
