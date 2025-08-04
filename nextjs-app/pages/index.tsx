import { useEffect } from "react";
import { useKeycloak } from "./_app";
import { useRouter } from "next/router";

export default function Index() {
  const { authenticated, kc, loading } = useKeycloak();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!authenticated) {
        kc?.login();
        return;
      }

      // Always redirect to home page for all authenticated users
      router.push("/home");
    }
  }, [authenticated, loading, kc, router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Setting up your session...</p>
      </div>
    </div>
  );
}
