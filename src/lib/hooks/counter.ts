import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export function counter(node: HTMLElement, { counter }: { counter: number }) {
  if (!node) return;

  const section = node.closest("section");
  if (!section) return;

  gsap.registerPlugin(ScrollTrigger);

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "top center",
      scrub: 1,
      invalidateOnRefresh: true,
      refreshPriority: 1,
      anticipatePin: 1,
    },
  });

  timeline.fromTo(
    node,
    {
      textContent: "0",
      opacity: 0,
      translateY: 50,
    },
    {
      translateY: 0,
      opacity: 1,
      textContent: String(counter),
      duration: 0.5,
      ease: "power1.out",
      snap: { textContent: 1 },
      immediateRender: false,
    }
  );
}
