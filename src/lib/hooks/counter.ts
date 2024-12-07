import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export function counter(node: HTMLElement, { counter }: { counter: number }) {
  if (!node) return;
  gsap.registerPlugin(ScrollTrigger);

  const section = node.closest("section");
  if (!section) return;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 100%", // Начать анимацию до попадания элемента в центр экрана
      end: "top 50%", // Завершить, когда элемент в центре экрана
      scrub: 1,
      invalidateOnRefresh: true,
      refreshPriority: 1,
      anticipatePin: 1,
    },
  });

  timeline.fromTo(
    node,
    {
      innerText: "0",
      opacity: 0,
      translateY: 50,
    },
    {
      translateY: 0,
      opacity: 1,
      innerText: counter,
      duration: 0.5,
      ease: "power1.out",
      snap: { innerText: 1 },
      immediateRender: false,
    }
  );
}
