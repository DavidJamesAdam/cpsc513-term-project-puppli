import type { Route } from "./+types/settings";
import Header from "../components/header/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings" },
    { name: "description", content: "Settings Page" },
  ];
}

export default function Settings() {
  return (
    <>
      <Header />
      <main style={{ backgroundColor: "var{--bg-color}" }}>
        <p>Settings page</p>
      </main>
    </>
  );
}
