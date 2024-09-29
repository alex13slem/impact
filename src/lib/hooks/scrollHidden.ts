export function scrollHidden(
  node: HTMLElement,
  opts?: Partial<{ enable: boolean }>,
) {
  const { enable = true } = opts || {};

  if (!enable) return;

  let currentPos = 0;
  let prevPos = 0;
  let opacity = 1;
  let top = parseFloat(getComputedStyle(node).top) || 0;
  let headerHeight: number;

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
      if (currentPos === 0) {
        top = 0;
        opacity = 1;
      } else {
        const posStep = currentPos - prevPos;

        if (top - posStep > 0) {
          top = 0;
          opacity = 1;
        } else if (top - posStep >= -headerHeight) {
          top -= posStep;
          opacity = 1 + top / headerHeight;
        } else {
          top = -headerHeight - 1;
          opacity = 0;
        }
      }

      node.setAttribute(
        'style',
        `
        opacity: ${opacity};
        transform: translateY(${top}px);
        `,
      );
    }

    prevPos = currentPos;
    ticking = false; // Сбрасываем флаг
  }

  // Дебаунс для изменения размеров
  let resizeTimeout: number;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      headerHeight = node.clientHeight;
    }, 150); // Уменьшаем частоту вычисления высоты хедера при ресайзе
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);

  // Инициализируем headerHeight
  headerHeight = node.clientHeight;

  return {
    destroy() {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    },
  };
}
