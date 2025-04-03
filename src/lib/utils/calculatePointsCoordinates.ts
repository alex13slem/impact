import type { NewsPoint, PointWithCoordinates } from "../data/mapNews";
import { zoomLevel } from "../stores/hoveredRegionStore";

function getUniqueNewsByRegion(newsPoints: NewsPoint[]): NewsPoint[] {
  // Используем reduce, чтобы пройти по каждому элементу массива
  return newsPoints.reduce((acc, current) => {
    // Находим уже существующую запись по региону в аккумуляторе
    const regionExists = acc.find(
      (item) => item.region.name === current.region.name
    );

    // Если регион уже добавлен в аккумулятор
    if (regionExists) {
      // Проверяем, есть ли объект с таким же charityProgramSlug в этом регионе
      const hasSameProgram = acc.some(
        (item) =>
          item.region.name === current.region.name &&
          item.region.mapDescription[0].charityProgram.slug ===
            current.region.mapDescription[0].charityProgram.slug
      );

      // Если нет такого charityProgramSlug, добавляем текущий объект
      if (!hasSameProgram) {
        acc.push(current);
      }
    } else {
      // Если регион еще не добавлен, просто добавляем объект
      acc.push(current);
    }

    return acc;
  }, [] as NewsPoint[]);
}

export function calculatePointsCoordinates(
  svg: SVGSVGElement,
  mapNews: NewsPoint[],
  regionsPaths: { name: string }[]
) {
  const viewedNews = getUniqueNewsByRegion(mapNews);

  const pointsCoordinates: PointWithCoordinates[] = [];
  const iconSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  regionsPaths.forEach((path) => {
    const pathElement = svg.querySelector(
      `path[data-region="${path.name}"]`
    ) as SVGGeometryElement;

    if (!pathElement) return;

    const regionNews = viewedNews.filter((n) => n.region.slug === path.name);

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
      ctm || svg.createSVGMatrix()
    );

    // Получаем количество новостей в регионе
    const numNews = regionNews.length;
    const angleStep = (2 * Math.PI) / numNews;

    // Получаем текущий уровень зума
    let curZoomLevel = 1;
    zoomLevel.subscribe((value) => (curZoomLevel = value));

    regionNews.forEach((ward, index) => {
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
