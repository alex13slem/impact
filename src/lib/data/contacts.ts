import type { AstroGlobal } from 'astro';
import axios from 'axios';
import { contactsSchema, type Contacts } from '../schemas/data/contactsSchema';
import { getWpSingularData, withDataFetching } from '../utils/wp';

export const fetchContacts = withDataFetching(getWpSingularData)(
  'contacts',
  contactsSchema,
);

export const getContacts = async (astro: AstroGlobal) =>
  axios
    .get<Contacts>('/api/contacts', {
      baseURL: astro.url!.origin,
    })
    .then(res => res.data)
    .catch(e => {
      console.error(e.message);
      throw new Error('Failed to fetch data in getContacts.');
    });
