import type { Route } from "./+types/ranking";
import Header from "../components/header/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ranking" },
    { name: "description", content: "ranking page" },
  ];
}

export default function Ranking() {
  return (
    <>
      <Header />
      <main style={{ backgroundColor: "var{--bg-color}" }}>
        <p>Ranking page</p>
      </main>
    </>
  );
}
