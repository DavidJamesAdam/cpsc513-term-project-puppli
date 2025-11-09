import type { Route } from "./+types/message";
import Header from "../components/header/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Message" },
    { name: "description", content: "Message page" },
  ];
}

export default function Message() {
  return (
    <>
      <Header />
      <main style={{ backgroundColor: "var{--bg-color}" }}>
        <p>Message page</p>
      </main>
    </>
  );
}
