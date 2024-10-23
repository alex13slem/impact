import { onDestroy } from 'svelte';
import type { NewsPoint } from '../data/mapNews';
import { type RegionsPath } from '../data/regionsPaths';
import { isPanning, offset, zoomLevel } from '../stores/hoveredRegionStore';
import { pointsCoordinates } from '../stores/wardsStore';
import { calculatePointsCoordinates } from '../utils/calculatePointsCoordinates';

interface Props {
  mapNews: NewsPoint[];
  regionsPaths: RegionsPath[];
}

export function updateCoordinates(
  element: SVGSVGElement,
  { mapNews, regionsPaths }: Props,
) {
  if (!element || !mapNews) return;
  pointsCoordinates.set(
    calculatePointsCoordinates(element, mapNews, regionsPaths),
  );
}

export function setNewTransform(content: SVGGElement) {
  zoomLevel.subscribe(value => {
    offset.subscribe(({ x, y }) => {
      const newTransform = `transform: translate(${x}px, ${y}px) scale(${value})`;
      content.setAttribute('style', newTransform);
    })();
  })();
}

export function zoomPan(content: SVGGElement) {
  let minZoomLevel: number;

  zoomLevel.subscribe(value => {
    minZoomLevel = value;
  })();

  const maxZoomLevel = 4;

  let start = { x: 0, y: 0 };
  let startDistance = 0;
  let lastTouchMove = { x: 0, y: 0 }; // Для панорамирования одним пальцем
  const ZOOM_SLOWDOWN = 0.1;

  interface ZoomOptions {
    newZoom?: number;
    scaleChange?: number;
    centerX: number;
    centerY: number;
  }

  const applyZoom = ({
    newZoom,
    scaleChange,
    centerX,
    centerY,
  }: ZoomOptions) => {
    if (newZoom === undefined && scaleChange === undefined) {
      throw new Error("Either 'newZoom' or 'scaleChange' must be provided.");
    }

    zoomLevel.update(oldZoomLevel => {
      let curZoomLevel = oldZoomLevel;

      if (newZoom !== undefined) {
        curZoomLevel = Math.min(Math.max(newZoom, minZoomLevel), maxZoomLevel);
      } else if (scaleChange !== undefined) {
        curZoomLevel = Math.min(
          Math.max(oldZoomLevel * scaleChange, minZoomLevel),
          maxZoomLevel,
        );
      }

      const scaleDelta = curZoomLevel / oldZoomLevel;

      offset.update(({ x, y }) => ({
        x: centerX - (centerX - x) * scaleDelta,
        y: centerY - (centerY - y) * scaleDelta,
      }));

      setNewTransform(content);
      return curZoomLevel;
    });
  };

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();

    const delta = event.deltaY;

    // коэффициент изменения масштаба
    const scaleAmount = delta > 0 ? 0.9 : 1.1;

    const svgRect = content.getBoundingClientRect();
    const mouseX = event.clientX - svgRect.left;
    const mouseY = event.clientY - svgRect.top;

    applyZoom({
      scaleChange: scaleAmount,
      centerX: mouseX,
      centerY: mouseY,
    });
  };

  const handleMouseDown = (event: MouseEvent) => {
    isPanning.set(true);
    offset.subscribe(({ x, y }) => {
      start = { x: event.clientX - x, y: event.clientY - y };
    })();
  };

  const handleMouseMove = (event: MouseEvent) => {
    isPanning.subscribe(value => {
      if (!value) return;
      offset.set({ x: event.clientX - start.x, y: event.clientY - start.y });
      setNewTransform(content);
    })();
  };

  const handleMouseUp = () => {
    isPanning.set(false);
  };

  const handleTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 2) {
      const [touch1, touch2] = event.touches;
      start.x = (touch1.clientX + touch2.clientX) / 2;
      start.y = (touch1.clientY + touch2.clientY) / 2;

      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2),
      );
      startDistance = distance;
    } else if (event.touches.length === 1) {
      lastTouchMove = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
      isPanning.set(true);
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    if (event.touches.length === 2) {
      const [touch1, touch2] = event.touches;
      const currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2),
      );

      const scaleChange =
        1 + ((currentDistance - startDistance) * ZOOM_SLOWDOWN) / startDistance;

      const centerX = (touch1.clientX + touch2.clientX) / 2;
      const centerY = (touch1.clientY + touch2.clientY) / 2;

      applyZoom({
        scaleChange,
        centerX,
        centerY,
      });
    } else if (event.touches.length === 1 && isPanning) {
      const touch = event.touches[0];
      const deltaX = touch.clientX - lastTouchMove.x;
      const deltaY = touch.clientY - lastTouchMove.y;

      offset.update(({ x, y }) => ({ x: x + deltaX, y: y + deltaY }));

      lastTouchMove = { x: touch.clientX, y: touch.clientY };
      setNewTransform(content);
    }
  };

  const handleTouchEnd = () => {
    isPanning.set(false);
  };

  const handleDoubleClick = (event: MouseEvent) => {
    event.preventDefault();
    const svgRect = content.getBoundingClientRect();
    const mouseX = event.clientX - svgRect.left;
    const mouseY = event.clientY - svgRect.top;
    applyZoom({
      newZoom: maxZoomLevel,
      centerX: mouseX,
      centerY: mouseY,
    });
    setNewTransform(content);
  };

  content.addEventListener('wheel', handleWheel, { passive: false });
  content.addEventListener('mousedown', handleMouseDown, { passive: true });
  content.addEventListener('mousemove', handleMouseMove, { passive: true });
  content.addEventListener('mouseup', handleMouseUp, { passive: true });
  content.addEventListener('touchstart', handleTouchStart, { passive: true });
  content.addEventListener('touchmove', handleTouchMove, { passive: false });
  content.addEventListener('touchend', handleTouchEnd, { passive: false });
  content.addEventListener('dblclick', handleDoubleClick, { passive: true });

  onDestroy(() => {
    content.removeEventListener('wheel', handleWheel);
    content.removeEventListener('mousedown', handleMouseDown);
    content.removeEventListener('mousemove', handleMouseMove);
    content.removeEventListener('mouseup', handleMouseUp);
    content.removeEventListener('touchstart', handleTouchStart);
    content.removeEventListener('touchmove', handleTouchMove);
    content.removeEventListener('touchend', handleTouchEnd);
    content.removeEventListener('dblclick', handleDoubleClick);
  });
}
