import Header from "~/components/header/header";
import type { Route } from "./+types/all-users";
import { useLoaderData } from "react-router";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";

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

  async function deleteUser(uid: String) {
    const resp = await fetch("http://localhost:8000/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: uid }),
    });

    if(!resp.ok){

    }
  }

  return (
    <div>
      <Header />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Bio</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Delete?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((u) => (
                <TableRow key={u.id ?? JSON.stringify(u)}>
                  <TableCell>
                    <strong>{u.username ?? u.displayName ?? u.id}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{u.email}</strong>
                  </TableCell>
                  <TableCell>{u.bio ? <div>{u.bio}</div> : null}</TableCell>
                  <TableCell>{u.location}</TableCell>
                  <TableCell>
                    <Button
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={deleteUser(u.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No users found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
