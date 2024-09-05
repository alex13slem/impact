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

export const wardsWithRelatedData = await fetchWardsWithRelatedData();

export const getWardsWithRelatedDataByCharity = (
  slug: 'socialnye-lifty' | 'nezhnie-ruki' | 'pomozj-detyam',
) => {
  return wardsWithRelatedData.filter(w => w.charityProgram.slug === slug);
};

export type WardWithRelatedData = (typeof wardsWithRelatedData)[number];
