import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState, createContext, useContext } from "react";
import Keycloak from "keycloak-js";
import NavBar from "../components/NavBar";

// Create a context for Keycloak
const KeycloakContext = createContext<{
  kc: Keycloak | null;
  authenticated: boolean;
  role: string | null;
  username: string | null;
  loading: boolean;
}>({
  kc: null,
  authenticated: false,
  role: null,
  username: null,
  loading: true,
});

export const useKeycloak = () => useContext(KeycloakContext);

function MyApp({ Component, pageProps }: AppProps) {
  const [kc, setKc] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const keycloak = new Keycloak({
      url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:8080",
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "myrealm",
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "nextjs-client",
    });

    keycloak
      .init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          typeof window !== "undefined"
            ? window.location.origin + "/silent-check-sso.html"
            : "",
        checkLoginIframe: false, // Disable iframe check in Docker environment
      })
      .then((isAuthenticated) => {
        setAuthenticated(isAuthenticated);
        setKc(keycloak);

        if (isAuthenticated && keycloak.tokenParsed) {
          const roles = keycloak.tokenParsed.realm_access?.roles || [];
          const matched = roles.find((r) =>
            ["simple-user", "realm-admin", "tenant-manager"].includes(r)
          );
          setRole(matched || null);
          setUsername(keycloak.tokenParsed.preferred_username || null);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Keycloak init failed:", err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    kc?.logout();
  };

  if (loading) return <div className="text-white">Loading session...</div>;

  return (
    <KeycloakContext.Provider
      value={{ kc, authenticated, role, username, loading }}
    >
      {authenticated && (
        <NavBar role={role} username={username} onLogout={handleLogout} />
      )}
      <Component {...pageProps} />
    </KeycloakContext.Provider>
  );
}

export default MyApp;
