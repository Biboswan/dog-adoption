import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDogsInfo } from "@/app/lib/api/dogs";
import { Dog } from "../types/dog";

export const useGetDogsInfo = (ids: string[]) => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['dogs-info', ids], 
        queryFn: async () => {
            // 🔍 Check if the full list is already cached
            const cachedData = queryClient.getQueryData<Dog[]>(['dogs-info', ids]);

            if (cachedData) {
                return cachedData; // Return cached data immediately
            }

            // 🛜 Fetch fresh data from API if not cached
            const freshData = await fetchDogsInfo(ids);
            
            // ✅ Store the fetched data in the cache
            queryClient.setQueryData(['dogs-info', ids], freshData);

            return freshData;
        },
        enabled: ids.length > 0, // Prevents unnecessary fetches
        staleTime: 1000 * 60 * 10, // Keep data fresh for 10 minutes
    });
};
