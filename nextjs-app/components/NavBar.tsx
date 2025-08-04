import Link from "next/link";

export default function NavBar({
  role,
  username,
  onLogout,
}: {
  role: string | null;
  username: string | null;
  onLogout: () => void;
}) {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <Link
        href="/home"
        className="font-semibold text-lg hover:text-blue-300 transition-colors"
      >
        Role-Based App
      </Link>
      <div className="space-x-6 flex items-center">
        <span className="text-gray-300">Welcome, {username || "User"}</span>
        {role && (
          <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
            {role === "simple-user"
              ? "User"
              : role === "realm-admin"
              ? "Realm Admin"
              : role === "tenant-manager"
              ? "Tenant Manager"
              : role}
          </span>
        )}
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
