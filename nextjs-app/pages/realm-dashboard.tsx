import { useEffect } from "react";
import { useKeycloak } from "./_app";
import { useRouter } from "next/router";
import Link from "next/link";

export default function RealmDashboard() {
  const { authenticated, role, kc, loading } = useKeycloak();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!authenticated) {
        kc?.login();
        return;
      }

      if (!role || role !== "realm-admin") {
        router.push("/unauthorized");
      }
    }
  }, [authenticated, role, loading, kc, router]);

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

  if (role !== "realm-admin") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <p>Checking permissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-300 mb-4">
            Realm Administration Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Full administrative access to the realm
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-red-600">
              <h3 className="text-xl font-semibold mb-3 text-red-300">
                User Management
              </h3>
              <p className="text-gray-300 mb-4">
                Manage all users in the realm, assign roles, and configure
                permissions.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
                Manage Users
              </button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-red-600">
              <h3 className="text-xl font-semibold mb-3 text-red-300">
                Realm Settings
              </h3>
              <p className="text-gray-300 mb-4">
                Configure realm-wide settings, security policies, and
                authentication flows.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
                Configure Realm
              </button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-red-600">
              <h3 className="text-xl font-semibold mb-3 text-red-300">
                Client Applications
              </h3>
              <p className="text-gray-300 mb-4">
                Manage client applications and their configurations.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
                Manage Clients
              </button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-red-600">
              <h3 className="text-xl font-semibold mb-3 text-red-300">
                System Monitoring
              </h3>
              <p className="text-gray-300 mb-4">
                Monitor system health, view logs, and analyze usage statistics.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
                View Analytics
              </button>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/home"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
