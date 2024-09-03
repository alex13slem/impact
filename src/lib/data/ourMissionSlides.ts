import { ourMissionSlideArraySchema } from '../schemas/data/ourMissionSlidesSchema';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchOurMissionSlides = withDataFetching(getWpData)(
  '/our-mission-slides',
  ourMissionSlideArraySchema,
);

export const ourMissionSlides = (await fetchOurMissionSlides()).sort(
  (a, b) => a.order - b.order,
);
