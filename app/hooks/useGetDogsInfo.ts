import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDogsInfo } from "@/app/lib/api/dogs";
import { Dog } from "../types/dog";

export const useGetDogsInfo = (ids: string[]) => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['dogs-info', ids], 
        queryFn: async () => {
            const cachedDogs = queryClient.getQueryData<Dog[]>(['dogs-info']) || [];
            const cachedDogsMap = new Map(cachedDogs.map(dog => [dog.id, dog]));

            // Filter out already cached IDs
            const newIds = ids.filter(id => !cachedDogsMap.has(id));

            // Fetch only the missing dogs
            const freshDogs = newIds.length > 0 ? await fetchDogsInfo(newIds) : [];

            // Merge new data with cached data
            freshDogs.forEach(dog => cachedDogsMap.set(dog.id, dog));

            // Update cache with merged data
            const updatedDogs = Array.from(cachedDogsMap.values());
            queryClient.setQueryData(['dogs-info'], updatedDogs);

            // 🔄 Sort dogs based on the original `ids` order
            return ids.map(id => cachedDogsMap.get(id)!);
        },
        enabled: ids.length > 0, // Prevents unnecessary fetches
        staleTime: 1000 * 60 * 10, // Keep data fresh for 10 minutes
        placeholderData: (prev) => prev,
    });
};
