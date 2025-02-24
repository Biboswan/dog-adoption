'use client'

import { use, useCallback, useEffect, useMemo, useState } from "react";
import { useIntersection } from '@mantine/hooks'
import Header from "@/app/components/Header";
import { ResponsiveFilter } from "@/app/components/Filter";
import { DogSearchParams, Sort } from "@/app/lib/api/dogs";
import { useGetDogs } from "@/app/hooks/useGetDogs";
import DogCard from "@/app/components/DogCard";
import { useGetDogsInfo } from "@/app/hooks/useGetDogsInfo";
import {  Flex, Spinner } from "@chakra-ui/react";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "@/components/ui/select";
import { BodyContainer } from "@/app/components/BodyContainer";
import { AppContext } from "@/app/providers/app-provider";
import { FindAMatch } from "@/app/components/FindAMatch";
import { User } from "@/app/types/user";
import { defaultSortBy, sortByOptions } from "@/app/app-constants";

//Todo: Use React Window for more optimising large lists

export default function Home() {
  const {dogsFavourite, favouriteDog, unfavouriteDog, user} = use(AppContext);
  const [filterState, setFilterState] = useState<DogSearchParams>({ageMin: 0, ageMax: 35});
  const [sortBy, setSortBy] = useState<Sort | undefined>(defaultSortBy);
  const { data, fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
     } = useGetDogs(filterState, sortBy);
  const dogIds = useMemo(() => data?.pages.flatMap(page => page.resultIds) ?? [],[data?.pages]);
  const { data: dogs, isLoading: isLoadingDogsInfo } = useGetDogsInfo(dogIds);

  const { ref: dummyItemRef, entry } = useIntersection({
    root: null,
    threshold: 0.8,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isLoadingDogsInfo && dogs && dogs.length > 0) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage, isFetchingNextPage, dogs?.length]);

  const toggleFavourite = useCallback((isFavourite: boolean, id: string) => {
    return isFavourite ? unfavouriteDog(id): favouriteDog(id);
  },[]);

  if (!user) return null;

  return (
    <div>
      <Header/>
      <BodyContainer>
        <Flex justifyContent='space-between'>
        <ResponsiveFilter filterState={filterState} setFilterState={setFilterState} />
        <SelectRoot
          collection={sortByOptions}
          width="200px"
          value={[sortBy as string]}
          onValueChange={(e) => setSortBy(e.value[0] as Sort)}
      >
        <SelectTrigger clearable>
          <SelectValueText placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {sortByOptions.items.map((sortByOption) => (
            <SelectItem item={sortByOption} key={sortByOption.value}>
              {sortByOption.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      </Flex>
      <Flex m={{ base: 4, md: 6, lg: 8 }} justifyContent='center'>
        <FindAMatch user={user as User} dogsFavourite={dogsFavourite}/>
      </Flex>
      <Flex 
      justifyContent='space-around'
      columnGap={8}
      rowGap={8}
      wrap="wrap">
      {dogs?.map(dog => {
        const dogId = dog.id;
        const isFavourite = dogsFavourite.some(id => id === dogId);
        return <DogCard
        id={dogId}
        key={dogId}
        isFavourite={isFavourite}
        toggleFavourite={toggleFavourite}
        name={dog.name}
        age={dog.age}
        breed={dog.breed}
        zipCode={dog.zip_code}
        imageUrl={dog.img} />})}
      {!isLoadingDogsInfo && <div  ref={dummyItemRef} />}
      </Flex>
      {isLoadingDogsInfo && (
          <Flex justifyContent="center" py={4}>
            <Spinner  color="colorPalette.600" size="lg" />
          </Flex>
        )}
        
        {/* No more dogs message */}
        {!hasNextPage && dogs && dogs.length > 0 && (
          <Flex justifyContent="center" py={4}>
            No more dogs to load
          </Flex>
        )}
      </BodyContainer>
    </div>
  );
}
