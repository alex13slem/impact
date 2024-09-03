import { wardsArraySchema } from '../schemas/data/wardsSchema';
import { getWpData, withDataFetching } from '../utils/wp';
import { fetchCharityProgramById } from './charityPrograms';
import { fetchRegionById } from './regions';

export const fetchWards = withDataFetching(getWpData)(
  '/wards',
  wardsArraySchema,
);

export const wards = await fetchWards();

async function fetchWardsWithRelatedData() {
  return await Promise.all(
    wards.map(async ward => ({
      ...ward,
      charityProgram: await fetchCharityProgramById(ward.charityProgramId)(),
      region: await fetchRegionById(ward.regionId)(),
    })),
  );
}

export const wardsWithRelatedData = await fetchWardsWithRelatedData();
export const getWardsWithRelatedDataByCharity = (
  slug: 'socialnye-lifty' | 'nezhnie-ruki' | 'pomozj-detyam',
) => {
  return wardsWithRelatedData.filter(w => w.charityProgram.slug === slug);
};

export type WardWithRelatedData = (typeof wardsWithRelatedData)[number];
