import type { AstroGlobal } from 'astro';
import axios from 'axios';
import {
  ourMissionSlideArraySchema,
  type OurMissionSlide,
} from '../schemas/data/ourMissionSlidesSchema';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchOurMissionSlides = withDataFetching(getWpData)(
  '/our-mission-slides',
  ourMissionSlideArraySchema,
);

export const getOurMissionSlides = async (astro: AstroGlobal) =>
  axios
    .get<OurMissionSlide[]>('/api/our-mission', {
      baseURL: astro.site!.origin,
    })
    .then(res => res.data);
