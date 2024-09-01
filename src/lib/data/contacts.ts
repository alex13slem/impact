import { contactsSchema } from '../schemas/data/contactsSchema';
import { getWpSingularData, withDataFetching } from '../utils/wp';

const fetchContacts = withDataFetching(getWpSingularData)(
  'contacts',
  contactsSchema,
);

export const contacts = await fetchContacts();
