import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function counter(node: HTMLElement, { counter }: { counter: number }) {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: node,
      start: 'top 120%', // Начать анимацию до попадания элемента в центр экрана
      end: 'top 60%', // Завершить, когда элемент в центре экрана
      scrub: 1,
      once: true,
      markers: false, // Установите true для отладки
    },
  });

  timeline.fromTo(
    node,
    {
      innerText: '0',
      opacity: 0,
    },
    {
      opacity: 1,
      innerText: counter,
      duration: 0.5,
      ease: 'power1.out',
      snap: { innerText: 1 },
      immediateRender: false,
    },
  );

  // return {
  //   destroy() {
  //     (timeline.scrollTrigger as ScrollTrigger).kill(); // Удаляем ScrollTrigger при уничтожении компонента
  //   },
  // };
}
