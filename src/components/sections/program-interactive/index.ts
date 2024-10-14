import { urlQuery } from '@sveu/browser';
import ProgramInteractiveNews from './news.svelte';
import ProgramInteractivePartners from './partners.svelte';

export const query = urlQuery();

export { ProgramInteractiveNews, ProgramInteractivePartners };
