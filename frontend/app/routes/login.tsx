import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "login" },
    { name: "description", content: "Login page" },
  ];
}

export default function Login() {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>Login page</h1>
    </main>
  );
}