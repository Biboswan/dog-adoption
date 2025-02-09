"use client"

import { Box, Text, createListCollection, Flex, useBreakpointValue } from "@chakra-ui/react";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider"
import { useDogBreeds } from "@/app/hooks/useGetDogsBreed";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { DogSearchParams } from "@/app/lib/api/dogs";
import { memo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MAX_AGE } from "@/app/app-constants";

type FilterProps = {
    filterState: DogSearchParams,
    setFilterState:  Dispatch<SetStateAction<DogSearchParams>>;
};

export const ResponsiveFilter = memo(({ filterState, setFilterState }: FilterProps) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Conditionally show filters based on screen size
    const showFiltersButton = useBreakpointValue({ base: true, md: false, lg: false });
  
    return (
      <Box>
        {showFiltersButton ? (
          <PopoverRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
            <PopoverTrigger>
            <Flex 
              align="center" 
              color="green.600" 
              fontWeight="bold" 
              cursor="pointer" 
              onClick={() => setIsOpen(!isOpen)}
            >
              <Text>{isOpen? "Hide Filters":  "Show Filters"}</Text>
              {isOpen ? (
                <ChevronUp size={20} style={{ marginLeft: "6px" }} />  // Up arrow when open
              ) : (
                <ChevronDown size={20} style={{ marginLeft: "6px" }} /> // Down arrow when closed
              )}
            </Flex>
            </PopoverTrigger>
            <PopoverContent width="360px">
              <PopoverBody>
              <Flex flexDirection='column' gap={4}>
                <Filter filterState={filterState} setFilterState={setFilterState} />
              </Flex>
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        ) : (
          <Flex gap={8}>
            <Filter filterState={filterState} setFilterState={setFilterState} />
          </Flex>
        )}
      </Box>
    );
});

ResponsiveFilter.displayName = 'ResponsiveFilter';

const Filter = memo(({filterState, setFilterState }: FilterProps) => {
  const { data } = useDogBreeds();
  const { ageMin = 0, ageMax = MAX_AGE } = filterState;

  const breeds = useMemo(() => {
    return createListCollection({
      items: data || [],
      itemToString: (item: string) => item,
      itemToValue: (item: string) => item,
    })
  }, [data])

  return (
    <>
   <SelectRoot multiple value={filterState.breeds} onValueChange={e => {
            setFilterState(state => ({...state, breeds: e.value}));
        }} collection={breeds} size="sm" width="300px">
      <SelectLabel>Select Breed</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Affenpinscher" />
      </SelectTrigger>
      <SelectContent zIndex={1600}>
        {breeds.items.map((breed: string) => (
          <SelectItem item={breed} key={breed}>
            {breed}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
    <Slider width="200px"  
        value={[ageMin ?? 0, ageMax ?? MAX_AGE]}
        onValueChange={e => {
            setFilterState(state => ({...state, ageMin: e.value[0], ageMax: e.value[1]}));
        }}
        marks={[{value: ageMin, label: ageMin}, { label: ageMax, value: ageMax}]}
        min={0} max={MAX_AGE} label="Select Age Range"/>
    </>
    )
});

Filter.displayName = 'Filter';