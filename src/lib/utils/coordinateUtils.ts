import type { Needy } from '../data/needys';

export function calculateNeedysCoordinates(
  svg: SVGSVGElement,
  needys: Needy[],
  regionsPaths: { name: string }[],
) {
  const needysCoordinates: (Needy & { x: number; y: number })[] = [];
  const svgRect = svg.getBoundingClientRect();
  const iconSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  ); // 1rem в пикселях

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
    const numNeedys = needys.filter(n => n.regionSlug === path.name).length;
    let angleStep = (2 * Math.PI) / numNeedys;

    needys
      .filter(n => n.regionSlug === path.name)
      .forEach((n, index) => {
        const radius = 0.7 * iconSize * Math.sqrt(index + 1);
        const angle = 0.8 * angleStep * index;

        const offsetX = radius * Math.cos(angle);
        const offsetY = radius * Math.sin(angle);

        const x = transformedCenter.x + offsetX - svgRect.left;
        const y = transformedCenter.y + offsetY - svgRect.top;

        needysCoordinates.push({
          ...n,
          x,
          y,
        });
      });
  });

  return needysCoordinates;
}
