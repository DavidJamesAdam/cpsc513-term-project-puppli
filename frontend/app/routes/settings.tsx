import type { Route } from "./+types/settings";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings" },
    { name: "description", content: "Settings Page" },
  ];
}

export default function Settings() {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>Settings page</h1>
      <p>Here is a paragraph</p>
    </main>
  );
}