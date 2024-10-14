import type { AstroGlobal } from 'astro';
import axios from 'axios';
import { docsArraySchema, type Docs } from '../schemas/data/docsSchema';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchDocs = withDataFetching(getWpData)('/docs', docsArraySchema);

export const getDocs = async (astro: AstroGlobal) =>
  await axios
    .get<Docs[]>('/api/docs', {
      baseURL: astro.site!.origin,
    })
    .then(res => res.data)
    .catch(e => {
      console.error(e.message);
      throw new Error('Failed to fetch data in getDocs');
    });
