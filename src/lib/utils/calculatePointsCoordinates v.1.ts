import type { NewsPoint, PointWithCoordinates } from '../data/mapNews';
import { zoomLevel } from '../stores/hoveredRegionStore';

export function calculatePointsCoordinates(
  svg: SVGSVGElement,
  mapNews: NewsPoint[],
  regionsPaths: { name: string }[],
) {
  const pointsCoordinates: PointWithCoordinates[] = [];
  const iconSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );

  regionsPaths.forEach(path => {
    const pathElement = svg.querySelector(
      `path[data-region="${path.name}"]`,
    ) as SVGGeometryElement;

    if (!pathElement) return;

    // Получаем ограничивающую рамку path
    const bbox = pathElement.getBBox();

    // Получаем матрицу трансформации элемента (если есть)
    const ctm = pathElement.getCTM();

    // Определяем центр элемента без учета масштаба всего SVG
    const center = svg.createSVGPoint();
    center.x = bbox.x + bbox.width / 2;
    center.y = bbox.y + bbox.height / 2;

    // Применяем локальные трансформации (CTM), если они есть
    const transformedCenter = center.matrixTransform(
      ctm || svg.createSVGMatrix(),
    );

    // Получаем количество новостей в регионе
    const numWards = mapNews.filter(w => w.region.slug === path.name).length;
    const angleStep = (4 * Math.PI) / numWards;

    // Получаем текущий уровень зума
    let curZoomLevel = 1;
    zoomLevel.subscribe(value => (curZoomLevel = value));

    mapNews
      .filter(w => w.region.slug === path.name)
      .forEach((ward, index) => {
        // Рассчитываем радиус смещения с учётом зума
        const radius = 0.4 * iconSize * Math.sqrt(index + 1) * curZoomLevel;
        const angle = 0.8 * angleStep * index;

        // Рассчитываем смещение для каждой иконки
        const offsetX = radius * Math.cos(angle);
        const offsetY = radius * Math.sin(angle);

        // Вычисляем итоговые координаты с учётом смещения и зума
        const x = transformedCenter.x + offsetX;
        const y = transformedCenter.y + offsetY;

        // Добавляем координаты в список
        pointsCoordinates.push({ ...ward, x, y });
      });
  });

  return pointsCoordinates;
}
