import type { NewsPoint, PointWithCoordinates } from '../data/mapNews';

export function calculatePointsCoordinates(
  svg: SVGSVGElement,
  mapNews: NewsPoint[],
  regionsPaths: { name: string }[],
) {
  const pointsCoordinates: PointWithCoordinates[] = [];
  const svgRect = svg.getBoundingClientRect();
  const iconSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );

  regionsPaths.forEach(path => {
    const pathElement = svg.querySelector(
      `path[data-region="${path.name}"]`,
    ) as SVGGeometryElement;

    if (!pathElement) return;

    const bbox = pathElement.getBBox();
    const matrix = pathElement.getScreenCTM();
    if (!matrix) return;

    const center = svg.createSVGPoint();
    center.x = bbox.x + bbox.width / 2;
    center.y = bbox.y + bbox.height / 2;

    const transformedCenter = center.matrixTransform(matrix);
    const numWards = mapNews.filter(w => w.region.slug === path.name).length;
    let angleStep = (2 * Math.PI) / numWards;

    mapNews
      .filter(w => w.region.slug === path.name)
      .forEach((ward, index) => {
        const radius = 0.7 * iconSize * Math.sqrt(index + 1);
        const angle = 0.8 * angleStep * index;

        const offsetX = radius * Math.cos(angle);
        const offsetY = radius * Math.sin(angle);

        const x = transformedCenter.x + offsetX - svgRect.left;
        const y = transformedCenter.y + offsetY - svgRect.top;

        pointsCoordinates.push({ ...ward, x, y });
      });
  });

  // console.log(pointsCoordinates);
  return pointsCoordinates;
}
