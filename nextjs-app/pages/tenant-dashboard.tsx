import { useEffect } from "react";
import { useKeycloak } from "./_app";
import { useRouter } from "next/router";
import Link from "next/link";

export default function TenantDashboard() {
  const { authenticated, role, kc, loading } = useKeycloak();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!authenticated) {
        kc?.login();
        return;
      }

      if (!role || role !== "tenant-manager") {
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

  if (role !== "tenant-manager") {
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
          <h1 className="text-4xl font-bold text-green-300 mb-4">
            Tenant Management Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Manage your tenant resources and configurations
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-green-600">
              <h3 className="text-xl font-semibold mb-3 text-green-300">
                Tenant Users
              </h3>
              <p className="text-gray-300 mb-4">
                Manage users within your tenant and their permissions.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">
                Manage Users
              </button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-green-600">
              <h3 className="text-xl font-semibold mb-3 text-green-300">
                Resource Management
              </h3>
              <p className="text-gray-300 mb-4">
                Configure and manage tenant-specific resources and quotas.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">
                Manage Resources
              </button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-green-600">
              <h3 className="text-xl font-semibold mb-3 text-green-300">
                Billing & Usage
              </h3>
              <p className="text-gray-300 mb-4">
                View billing information and resource usage statistics.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">
                View Billing
              </button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-green-600">
              <h3 className="text-xl font-semibold mb-3 text-green-300">
                Support & Help
              </h3>
              <p className="text-gray-300 mb-4">
                Access support resources and submit help requests.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">
                Get Support
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
