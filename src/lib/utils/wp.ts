import axios from 'axios';
import 'dotenv/config';
import { ZodError, ZodSchema } from 'zod';

export async function getWpData(url: string) {
  const response = await axios.get(url, {
    baseURL: process.env.WP_URL + '/wp-json/acf/v3',
    headers: {
      Accept: 'application/json',
    },
    params: {
      per_page: 100,
    },
  });
  if (response.status !== 200) {
    throw new Error('Failed to fetch data');
  }

  if (Array.isArray(response.data)) {
    return response.data.map(item => ({
      id: item.id,
      ...item.acf,
    }));
  }

  return {
    id: response.data.id,
    ...response.data.acf,
  };
}

export async function getWpSingularData(slug: string) {
  const response = await axios.get(slug, {
    baseURL: process.env.WP_URL + '/wp-json/acf/v3/options/options/',
    headers: {
      Accept: 'application/json',
    },
  });
  if (response.status !== 200) {
    throw new Error('Failed to fetch data');
  }

  return response.data[slug];
}

export function withDataFetching(
  getDataFunc: (endpoint: string) => Promise<any>,
) {
  return function <T>(endpoint: string, schema: ZodSchema<T>) {
    return async (): Promise<T> => {
      try {
        const rawData = await getDataFunc(endpoint);
        const parsedData = schema.parse(rawData);
        return parsedData;
      } catch (error) {
        if (error instanceof ZodError) {
          console.error(error.issues);
        }
        console.error(error);
        throw error;
      }
    };
  };
}
