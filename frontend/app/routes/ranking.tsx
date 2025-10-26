import type { Route } from "./+types/ranking";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ranking" },
    { name: "description", content: "ranking page" },
  ];
}

export default function Ranking() {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>ranking page</h1>
    </main>
  );
}