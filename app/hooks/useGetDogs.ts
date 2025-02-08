import { useInfiniteQuery } from "@tanstack/react-query";
import { DogSearchParams, fetchDogs, FetchDogsResponse, Sort } from "@/app/lib/api/dogs";

export const useGetDogs = (queryParams: DogSearchParams, sort?: Sort) => {
    return useInfiniteQuery<FetchDogsResponse, unknown>({
        queryKey: ['dogs', queryParams, sort],
        initialPageParam: undefined,
        queryFn: ({ pageParam }) => fetchDogs(queryParams, pageParam as string | undefined, sort), // Using fetchDogs without modifications
        getNextPageParam: (lastPage) => lastPage.next, // Use the `next` field for pagination
        getPreviousPageParam: (firstPage) => firstPage.prev,
    });
};
