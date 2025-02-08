'use client'

import { use, useState } from "react";
import { AppContext } from "@/app/providers/app-provider";
import Header from "@/app/components/Header";
import { ResponsiveFilter } from "./components/Filter";
import { DogSearchParams, Sort } from "@/app/lib/api/dogs";
import { useGetDogs } from "@/app/hooks/useGetDogs";
import DogCard from "@/app/components/DogCard";
import { useGetDogsInfo } from "@/app/hooks/useGetDogsInfo";
import { createListCollection, Flex } from "@chakra-ui/react";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "@/components/ui/select";
import { BodyContainer } from "./components/BodyContainer";

const sortByOptions = createListCollection({
  items: [
    { label: "Ascending name", value: "name:asc" },
    { label: "Ascending breed", value: "breed:asc" },
    { label: "Ascending age", value: "age:asc" },
    { label: "Descending name", value: "name:desc" },
    { label: "Descending breed", value: "breed:desc" },
    { label: "Descending age", value: "age:desc" },
  ],
})

export default function Home() {
  const { user } = use(AppContext);
  const [filterState, setFilterState] = useState<DogSearchParams>({ageMin: 0, ageMax: 35});
  const [sortBy, setSortBy] = useState<Sort | undefined>();
  const { data } = useGetDogs(filterState, sortBy);
  const dogIds = data?.pages.flatMap(page => page.resultIds) ?? [];
  const { data: dogs } = useGetDogsInfo(dogIds);

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
      {dogs?.map(dog => <DogCard key={dog.id} name={dog.name} age={dog.age} breed={dog.breed} zipCode={dog.zip_code} imageUrl={dog.img} />)}
      </BodyContainer>
    </div>
  );
}
