import type { Route } from "./+types/profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "profile" },
    { name: "description", content: "profile page" },
  ];
}

export default function Profile() {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>profile page</h1>
    </main>
  );
}