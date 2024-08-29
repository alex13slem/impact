export function scrollHidden(
  node: HTMLElement,
  { triggerHeight }: { triggerHeight: string | number } = { triggerHeight: 0 },
) {
  let currentPos = 0;
  let prevPos = 0;
  let top = parseFloat(getComputedStyle(node).top) || 0;
  let headerHeight: number;
  const triggerPoint =
    typeof triggerHeight === 'string'
      ? (parseFloat(triggerHeight) / 100) * window.innerHeight
      : triggerHeight;

  function handleScroll() {
    currentPos = window.scrollY;

    if (currentPos < triggerPoint) {
      top = 0;
    } else {
      const posStep = currentPos - prevPos;

      if (top - posStep > 0) {
        top = 0;
      } else if (top - posStep >= -headerHeight) {
        top -= posStep;
      } else {
        top = -headerHeight - 1;
      }
    }

    prevPos = currentPos;
    node.style.transform = `translateY(${top}px)`;
  }

  function handleResize() {
    headerHeight = node.clientHeight;
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);

  // Инициализируем headerHeight
  handleResize();

  return {
    destroy() {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    },
  };
}
