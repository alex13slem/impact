import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export function sectionSlide(node: HTMLElement) {
  if (!node) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(node, {
    opacity: 0,
    filter: 'grayscale(50%) blur(2px)',
    scrollTrigger: {
      trigger: node,
      start: 'top top',
      end: 'bottom top',
      snap: 1,
      scrub: 3,
      pin: true,
      pinSpacing: false,
      onLeave: () => {
        ScrollTrigger.refresh();
      },
    },
  });
}
