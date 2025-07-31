import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    window.location.href = "/protected";
  }, []);
  return <div className="text-primary">Redirecting...</div>;
}