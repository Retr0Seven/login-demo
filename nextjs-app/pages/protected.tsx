import { useKeycloak } from "./_app";
import Link from "next/link";

export default function Protected() {
  const { kc, authenticated, loading, username, role } = useKeycloak();

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

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6 border border-gray-700">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-300 mb-4">
            Protected Dashboard
          </h1>
          <p className="text-gray-300">
            This page requires authentication to access
          </p>
        </div>

        {authenticated ? (
          <div className="space-y-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-green-300">
                ✅ Authentication Status
              </h2>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="font-medium">Username:</span>
                  <span className="text-white font-medium ml-2">
                    {username}
                  </span>
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Role:</span>
                  <span className="text-white font-medium ml-2">
                    {role === "simple-user"
                      ? "User"
                      : role === "realm-admin"
                      ? "Realm Administrator"
                      : role === "tenant-manager"
                      ? "Tenant Manager"
                      : role || "Unknown"}
                  </span>
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Status:</span>
                  <span className="text-green-400 font-medium ml-2">
                    Authenticated
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-blue-300">
                Available Actions
              </h2>
              <div className="space-y-3">
                <p className="text-gray-300 mb-4">
                  You have access to the following areas:
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/home"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    Home Dashboard
                  </Link>
                  {role === "realm-admin" && (
                    <Link
                      href="/realm-dashboard"
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                    >
                      Realm Dashboard
                    </Link>
                  )}
                  {role === "tenant-manager" && (
                    <Link
                      href="/tenant-dashboard"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                    >
                      Tenant Dashboard
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => kc?.logout()}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-red-300">
                ❌ Not Authenticated
              </h2>
              <p className="text-gray-300 mb-4">
                You need to log in to access this protected content.
              </p>
            </div>
            <button
              onClick={() => kc?.login()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
