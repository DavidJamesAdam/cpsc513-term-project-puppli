import type { Route } from "./+types/signup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "login" },
    { name: "description", content: "Sign-up page" },
  ];
}

export default function SignUp() {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>Sign-up page</h1>
    </main>
  );
}