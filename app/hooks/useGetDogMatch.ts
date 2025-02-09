import { useQuery } from "@tanstack/react-query";
import { findDogMatch } from "@/app//lib/api/dogs";

export const useGetLazyDogMatch = () => {
    return useQuery({
        queryKey: ['dog-match'], 
        queryFn: ({ queryKey }) => {
            const ids = queryKey.slice(1); 
            if (!ids || ids.length === 0) return null;
            return findDogMatch(ids);
        },
        staleTime: 1000 * 60 * 5,
        enabled: false
    });
};
