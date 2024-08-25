import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.section-slide').forEach(section => {
  gsap.to(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      snap: 1,
      scrub: 1,
      pin: true,
      pinSpacing: false,
    },
  });
});
