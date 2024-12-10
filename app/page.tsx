'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./auth/page";

export default function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  );
}
