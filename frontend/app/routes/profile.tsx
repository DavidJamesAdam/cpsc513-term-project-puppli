import type { Route } from "./+types/profile";
import Header from "../components/header/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "profile" },
    { name: "description", content: "profile page" },
  ];
}

export default function Profile() {
  return (
    <>
      <Header />
      <main style={{ backgroundColor: "var{--bg-color}" }}>
        <p>Profile page</p>
      </main>
    </>
  );
}
