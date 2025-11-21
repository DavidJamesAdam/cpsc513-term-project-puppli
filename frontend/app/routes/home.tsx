import type { Route } from "./+types/home";
import Header from "../components/header/header";
import VotingCard from "../components/voting-card/voting-card";
import useMediaQuery from "@mui/material/useMediaQuery";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const matches = useMediaQuery("(min-width: 600px)");
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      {matches ? (
        <main
          className="voting-page"
          style={{ display: "flex", flexDirection: "row", flex: 1 }}
        >
          <VotingCard />
          <h1 style={{fontSize: '5vh'}}>VS</h1>
          <VotingCard />
        </main>
      ) : (
        <main
          className="voting-page"
          style={{ display: "flex", flexDirection: "column", width: "auto", flex: 1, justifyContent: "space-between", height: '100%' }}
        >
          <VotingCard />
          <h1 style={{fontSize: '5vh'}}>VS</h1>
          <VotingCard />
        </main>
      )}
    </div>
  );
}
