import { EmptyState, VStack } from "@chakra-ui/react"
import { PawPrint } from "lucide-react";
import { memo } from "react";

export const EmptyStateNoDogsResult = memo(() => {
    return (<EmptyState.Root size="md">
            <EmptyState.Content>
              <EmptyState.Indicator>
               <PawPrint />
              </EmptyState.Indicator>
              <VStack textAlign="center">
                <EmptyState.Title>No Dogs Found</EmptyState.Title>
                <EmptyState.Description>
                  Apply a larger range of filters to see results
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>);
});

EmptyStateNoDogsResult.displayName = 'EmptyStateNoDogsResult';