import type { Route } from "./+types/message";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Message" },
    { name: "description", content: "Message page" },
  ];
}

export default function Message() {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>Message page</h1>
    </main>
  );
}