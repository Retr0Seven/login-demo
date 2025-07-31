import { useEffect, useState } from "react";
import Keycloak from "keycloak-js";

export default function Protected() {
  const [kc, setKc] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const keycloak = new Keycloak({
      url: "http://localhost:8080",
      realm: "myrealm",
      clientId: "nextjs-client",
    });

    keycloak.init({ onLoad: "check-sso" }).then((auth) => {
      if (auth && keycloak.tokenParsed) {
        setUsername(keycloak.tokenParsed.preferred_username);
      }
      setKc(keycloak);
      setAuthenticated(auth);
      setLoading(false);
    }).catch((err) => {
      console.error("Keycloak init failed:", err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-white">Loading Keycloak...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8 space-y-4 border border-gray-700">
        <h1 className="text-2xl font-bold text-primary">Welcome to the Dashboard</h1>
        {authenticated ? (
          <>
            <p className="text-gray-300">✅ Logged in as <span className="text-white font-medium">{username}</span></p>
            <button
              onClick={() => kc?.logout()}
              className="w-full bg-primary text-black font-semibold py-2 rounded hover:brightness-110 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <p className="text-red-400">❌ You are not logged in.</p>
            <button
              onClick={() => kc?.login()}
              className="w-full bg-primary text-black font-semibold py-2 rounded hover:brightness-110 transition"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}