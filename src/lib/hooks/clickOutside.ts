export function clickOutside(
  node: HTMLElement,
  ignoreElements?: (HTMLElement | string)[] | null,
) {
  const handleClick = (event: MouseEvent) => {
    if (node.contains(event.target as HTMLElement)) return;

    // Преобразуем `ignoreElements` в массив элементов
    const stopProp = ignoreElements?.reduce((acc: HTMLElement[], el) => {
      if (typeof el === 'string') {
        // Ищем элементы по селектору, если строка
        const elements = document.querySelectorAll(el);
        acc.push(...Array.from(elements as NodeListOf<HTMLElement>)); // Преобразуем NodeList в массив
      } else if (el instanceof HTMLElement) {
        // Если это элемент, просто добавляем его в аккумулятор
        acc.push(el);
      }
      return acc;
    }, [] as HTMLElement[]); // Задаём аккумулятор как массив элементов

    // Проверяем, клик ли был на одном из игнорируемых элементов
    const isClickIgnored = stopProp?.some(el =>
      el.contains(event.target as HTMLElement),
    );

    // Если клик на игнорируемом элементе, выходим
    if (isClickIgnored) return;

    // Если клик был снаружи, диспатчим кастомное событие
    node.dispatchEvent(new CustomEvent('outclick'));
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
}
