'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./auth/page";
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

export default function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <Login />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
