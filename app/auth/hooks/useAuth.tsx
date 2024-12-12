import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/client";
import { SetStateAction, useAtom } from "jotai";
import { sessionAtom } from "@/app/store/auth";
import { Session } from "@supabase/supabase-js";

async function getSession(
  session: Session | null,
  setSession: (update: SetStateAction<Session | null>) => void)
  : Promise<Session | null> {

  let isSessionExpired = false;
  if (session?.expires_at) {
    isSessionExpired = session && (session.expires_at < Date.now() / 1000);
    if (!isSessionExpired) {
      console.log('session not expired so returning current session');
      setSession(session);
      return session;
    }
  }

  const { data, error } = await supabase.auth.getSession();

  console.log('getting new session...');
  console.log(data);

  if (error) {
    console.error('Error when fetching session:', error);
    setSession(null);
    return null;
  }

  const newSession = data.session;
  setSession(newSession);
  return newSession;

}

export function useAuth() {
  const [session, setSession] = useAtom(sessionAtom);

  return useQuery({
    queryKey: ['session'],
    queryFn: () => getSession(session, setSession),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}