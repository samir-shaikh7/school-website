import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const [session, setSession] = useState<any>(undefined);

  useEffect(() => {
    // 🔥 ONLY auth listener (no getSession)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // initial user check (real user, not cached session)
    supabase.auth.getUser().then(({ data }) => {
      setSession(data.user ? {} : null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ⏳ wait until we know
  if (session === undefined) return <p>Loading...</p>;

  // ❌ not logged in
  if (!session) return <Navigate to="/login" replace />;

  // ✅ logged in
  return children;
};

export default ProtectedRoute;