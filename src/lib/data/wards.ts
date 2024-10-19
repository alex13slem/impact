import type { AstroGlobal } from 'astro';
import axios from 'axios';
import {
  wardsArraySchema,
  wardsSchema,
  type Ward,
} from '../schemas/data/wardsSchema';
import { getWpData, withDataFetching } from '../utils/wp';
import { fetchCharityProgramById } from './charityPrograms';
import { fetchRegionById } from './regions';

export const fetchWards = withDataFetching(getWpData)(
  '/wards',
  wardsArraySchema,
);

export const fetchWardById = (id: number) =>
  withDataFetching(getWpData)(`/wards/${id}`, wardsSchema.omit({ id: true }));

const fetchRelatedDataForWard = async (ward: Ward) => {
  const [charityProgram, region] = await Promise.all([
    fetchCharityProgramById(ward.charityProgramId)(),
    fetchRegionById(ward.regionId)(),
  ]);
  return { ...ward, charityProgram, region };
};

export const fetchWardsWithRelatedData = async () => {
  const wards = await fetchWards();
  return Promise.all(wards.map(fetchRelatedDataForWard));
};

export const fetchWardWithRelatedById = async (id: number) => {
  const ward = await fetchWardById(id)();
  return fetchRelatedDataForWard({ ...ward, id });
};

export const fetchWardsByIds = async (ids: number[]) =>
  await Promise.all(ids.map(fetchWardWithRelatedById));

export const getWards = (astro: AstroGlobal) =>
  axios
    .get<WardWithRelatedData[]>('/api/wards', {
      baseURL: astro.url!.origin,
    })
    .then(res => res.data)
    .catch(e => {
      console.error(e.message);
      throw new Error('Failed to fetch data in getWards');
    });

export const getWardsWithRelatedDataByCharity = async (
  astro: AstroGlobal,
  slug: 'socialnye-lifty' | 'nezhnie-ruki' | 'pomozj-detyam',
) => {
  return axios
    .get<WardWithRelatedData[]>('/api/wards', {
      baseURL: astro.url!.origin,
      params: { 'charity-program': slug },
    })
    .then(res => res.data)
    .catch(e => {
      console.error(e.message);
      throw new Error('Failed to fetch data in getWards');
    });
};

export type WardWithRelatedData = Awaited<
  ReturnType<typeof fetchWardsWithRelatedData>
>[number];
