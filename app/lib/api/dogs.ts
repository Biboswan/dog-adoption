import { apiClient } from './client';
import type { Dog } from '../../types/dog';

export const fetchDogBreeds = async (): Promise<string[]> => {
    try {
        const response = await apiClient.get('/dogs/breeds'); 
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
}

export type DogSearchParams = {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
};

export type FetchDogsResponse = {
    resultIds: string[];
    total: number;
    next: string;
    prev?: string;
};

export type Sort = 'breed:asc' | 'name:asc' | 'age:asc' | 'breed:desc' | 'name:desc' | 'age:desc';

export const fetchDogs = async (
    queryParams: DogSearchParams,
    from: string | undefined,
    sort?: Sort,
  ) : Promise<FetchDogsResponse> => {
    try {
    const derivedFrom = from ? new URLSearchParams(from?.split('?')[1]).get('from'): undefined;
      const response = await apiClient.get('/dogs/search', {
            params: {
                ...queryParams, // Include the queryParams object
                ...(from && { from: derivedFrom }), // Only include if defined
                ...(sort && { sort }),
            }
      });
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
}

export const fetchDogsInfo = async (ids: string[]): Promise<Dog[]> => {
    try {
        const response = await apiClient.post('/dogs', ids);
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }

}

interface Match {
    match: string
}

export const findDogMatch = async (ids: string[]): Promise<Match> => {
    try {
        const response = await apiClient.post('/dogs/match', ids);
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
}