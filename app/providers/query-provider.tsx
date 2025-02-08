'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

type Props = {
  children: React.JSX.Element
};

export function QueryProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}