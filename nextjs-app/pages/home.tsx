import { useEffect } from "react";
import { useKeycloak } from "./_app";
import { useRouter } from "next/router";
import Link from "next/link";

export default function HomePage() {
  const { authenticated, role, kc, loading, username } = useKeycloak();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) {
      kc?.login();
      return;
    }
  }, [authenticated, loading, kc]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome, {username}!</h1>
          <p className="text-xl text-gray-300 mb-2">You are logged in as:</p>
          <span className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-semibold">
            {role === "simple-user"
              ? "User"
              : role === "realm-admin"
              ? "Realm Administrator"
              : role === "tenant-manager"
              ? "Tenant Manager"
              : role || "Unknown Role"}
          </span>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            What would you like to do?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Always show general protected page */}
            <Link href="/protected" className="block">
              <div className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg transition-colors border border-gray-600 hover:border-blue-500">
                <h3 className="text-xl font-semibold mb-3 text-blue-300">
                  Protected Page
                </h3>
                <p className="text-gray-300">
                  View the general protected dashboard with your login status.
                </p>
              </div>
            </Link>

            {/* Role-specific options */}
            {role === "realm-admin" && (
              <Link href="/realm-dashboard" className="block">
                <div className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg transition-colors border border-gray-600 hover:border-red-500">
                  <h3 className="text-xl font-semibold mb-3 text-red-300">
                    Realm Dashboard
                  </h3>
                  <p className="text-gray-300">
                    Access the realm administration panel with full
                    administrative privileges.
                  </p>
                </div>
              </Link>
            )}

            {role === "tenant-manager" && (
              <Link href="/tenant-dashboard" className="block">
                <div className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg transition-colors border border-gray-600 hover:border-green-500">
                  <h3 className="text-xl font-semibold mb-3 text-green-300">
                    Tenant Dashboard
                  </h3>
                  <p className="text-gray-300">
                    Manage tenant-specific resources and configurations.
                  </p>
                </div>
              </Link>
            )}

            {/* Show what they can't access */}
            {role !== "realm-admin" && (
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 opacity-50 cursor-not-allowed">
                <h3 className="text-xl font-semibold mb-3 text-gray-400">
                  Realm Dashboard
                </h3>
                <p className="text-gray-500">
                  Requires Realm Administrator role
                </p>
              </div>
            )}

            {role !== "tenant-manager" && (
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 opacity-50 cursor-not-allowed">
                <h3 className="text-xl font-semibold mb-3 text-gray-400">
                  Tenant Dashboard
                </h3>
                <p className="text-gray-500">Requires Tenant Manager role</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
