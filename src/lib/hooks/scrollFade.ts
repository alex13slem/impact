export function scrollHidden(
  node: HTMLElement,
  { triggerHeight }: { triggerHeight: string | number } = { triggerHeight: 0 },
) {
  let currentPos = 0;
  let prevPos = 0;
  // let top = parseFloat(getComputedStyle(node).top) || 0;
  // let headerHeight: number;
  const triggerPoint =
    typeof triggerHeight === 'string'
      ? (parseFloat(triggerHeight) / 100) * window.innerHeight
      : triggerHeight;

  // Оптимизация прокрутки с использованием requestAnimationFrame
  let ticking = false;

  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }

  function updateScroll() {
    currentPos = window.scrollY;

    // Оптимизация: избегаем лишних обновлений transform
    if (currentPos !== prevPos) {
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

      node.setAttribute('style', `--tw-bg-opacity: `);
      // node.style.transform = `translateY(${top}px)`;
    }

    prevPos = currentPos;
    ticking = false; // Сбрасываем флаг
  }

  window.addEventListener('scroll', handleScroll);

  // Инициализируем headerHeight
  headerHeight = node.clientHeight;

  return {
    destroy() {
      window.removeEventListener('scroll', handleScroll);
    },
  };
}
