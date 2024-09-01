import { docsArraySchema } from '../schemas/data/docsSchema';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchDocs = withDataFetching(getWpData)('/docs', docsArraySchema);

export const docs = await fetchDocs();
