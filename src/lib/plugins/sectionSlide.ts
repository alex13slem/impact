import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.section-slide').forEach(section => {
  gsap.to(section, {
    opacity: 0,
    filter: 'grayscale(50%) blur(2px)',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      snap: 1,
      scrub: 1,
      pin: true,
      pinSpacing: false,
      onLeave: () => {
        ScrollTrigger.refresh();
      },
    },
  });
});
