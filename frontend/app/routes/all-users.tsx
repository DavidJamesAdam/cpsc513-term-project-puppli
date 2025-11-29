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
import { useState } from "react";
import ConfirmDeletionModal from "~/components/confirm-modal/confirm-modal";
import toast from "react-hot-toast";

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
  // Keep a local, mutable copy so we can remove a deleted user from the UI immediately
  const [localUsers, setLocalUsers] = useState<Array<Record<string, any>>>(users ?? []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUid, setSelectedUid] = useState<string | undefined>(undefined);

  async function deleteUser(uid: string | undefined) {
    if (!uid) {
      console.error("No uid provided for delete");
      return;
    }

    try {
      const resp = await fetch("http://localhost:8000/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        console.error("Failed to delete user:", err);
        return;
      }
      toast.promise(
        Promise.resolve(resp),
        {
          loading: "Deleting...",
          success: "User Deleted",
          error: (err: Error) => `User deletion failed: ${err.message}`,
        },
        {
          style: {
            borderRadius: "100px",
            width: "100%",
            fontSize: "2em",
            backgroundColor: "#e0cdb2",
            border: "1px solid rgba(255, 132, 164, 1)",
          },
          duration: 3000,
        }
      );

      // Remove the user from local state so UI updates immediately
      setLocalUsers((prev) => prev.filter((u) => u.id !== uid));
    } catch (e) {
      console.error("Error deleting user", e);
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
            {localUsers && localUsers.length > 0 ? (
              localUsers.map((u) => (
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
                      onClick={() => {
                        setSelectedUid(u.id);
                        setIsModalOpen(true);
                      }}
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
        <ConfirmDeletionModal
          open={isModalOpen}
          uid={selectedUid}
          onClose={() => setIsModalOpen(false)}
          onConfirm={async (uid) => {
            await deleteUser(uid);
            setIsModalOpen(false);
          }}
        />
    </div>
  );
}
