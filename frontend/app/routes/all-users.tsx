import Header from "~/components/header/header";
import type { Route } from "./+types/all-users";
import { useLoaderData } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "All Users" },
    { name: "List of all users", content: "Only accessible by admin" },
  ];
}

export async function loader(_: Route.LoaderArgs) {
  const resp = await fetch("http://localhost:8000/users", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!resp.ok) {
    throw new Response("Failed to fetch users", { status: resp.status });
  }

  const users = await resp.json();
  return users;
}

export default function AllUsers() {
  const users = useLoaderData() as Array<Record<string, any>> | undefined;

  return (
    <div>
      <Header />
      <h1>All Users</h1>
      {users && users.length > 0 ? (
        <ul>
          {users.map((u) => (
            <li key={u.id ?? JSON.stringify(u)}>
              <strong>{u.username ?? u.displayName ?? u.id}</strong>
              {u.about ? <div>{u.about}</div> : null}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}