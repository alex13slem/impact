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
      snap: 1, // Позволяет Snap к ближайшему положению
      scrub: 1, // Добавляет "скраб" для плавности
      pin: true, // Фиксирует элемент
      pinSpacing: false, // Отключает дополнительное пространство
      anticipatePin: 1, // Сглаживает фиксацию
      invalidateOnRefresh: true, // Инвалидирует триггеры при обновлении, уменьшает количество вызовов refresh
    },
  });
}
