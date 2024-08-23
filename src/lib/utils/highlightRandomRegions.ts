// Функция для подсветки случайных регионов
// async function highlightRandomRegions(count: number, delay: number) {
//   if (!svg) {
//     return;
//   }
//   const paths = Array.from(svg.querySelectorAll('path')) as SVGPathElement[];
//   const randomPaths: SVGPathElement[] = [];

//   while (randomPaths.length < count) {
//     const randomIndex = Math.floor(Math.random() * paths.length);
//     const randomPath = paths[randomIndex];

//     if (!randomPaths.includes(randomPath)) {
//       randomPaths.push(randomPath);
//     }
//   }

//   for (const path of randomPaths) {
//     path.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
//     await new Promise(resolve => setTimeout(resolve, delay));
//     path.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
//   }
// }

// onMount(() => {
//   highlightRandomRegions(30, 100);
// });

// Вызов функции для зажигания 20 регионов с задержкой в 500 мс
// $: highlightRandomRegions(20, 500);
