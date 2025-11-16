import type { Route } from "./+types/settings";
import Header from "../components/header/header";
import ChangePasswordModal from "~/components/change-password-modal/change-password-modal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings" },
    { name: "description", content: "Settings Page" },
  ];
}

export default function Settings() {
  return (
    <>
      <Header />
      <main style={{ backgroundColor: "var{--bg-color}" }}>
        <p>Settings page</p>
        <ChangePasswordModal/>
      </main>
    </>
  );
}
