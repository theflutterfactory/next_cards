import { useQuery } from "@tanstack/react-query";
import { supabase } from "../client";

async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(error.message);
  }
  return data.session?.user ?? null;
}

export function useAuth() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getSession,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}