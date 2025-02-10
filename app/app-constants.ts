import { createListCollection } from "@chakra-ui/react";

export const MAX_AGE=35;

export const sortByOptions = createListCollection({
    items: [
      { label: "Ascending name", value: "name:asc" },
      { label: "Ascending breed", value: "breed:asc" },
      { label: "Ascending age", value: "age:asc" },
      { label: "Descending name", value: "name:desc" },
      { label: "Descending breed", value: "breed:desc" },
      { label: "Descending age", value: "age:desc" },
    ],
  });
  
  export const defaultSortBy = "breed:asc";
  