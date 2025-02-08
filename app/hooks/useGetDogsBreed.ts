import { useQuery } from "@tanstack/react-query";
import { fetchDogBreeds } from "@/app/lib/api/dogs";

export const useDogBreeds = () => {
    return useQuery({
      queryKey: ['dogBreeds'],
      queryFn: fetchDogBreeds,
      retry: 2,
      refetchOnWindowFocus: false,
    });
};