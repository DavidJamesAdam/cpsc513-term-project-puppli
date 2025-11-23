import { useState, useEffect } from "react";
import type { Route } from "./+types/home";
import Header from "../components/header/header";
import VotingCard from "../components/voting-card/voting-card";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Posts" },
    { name: "description", content: "View all posts" },
  ];
}

interface Post {
  id: string;
  UserId: string;
  petId: string;
  imageUrl: string;
  caption: string;
  createdAt: string;
  voteCount: number;
  favouriteCount: number;
}

export default function Home() {
  const matches = useMediaQuery("(min-width: 600px)");
    const [animateKey, setAnimateKey] = useState(0);

  const handleAnyVote = () => {
    // increment to retrigger animation in children
    setAnimateKey((k) => k + 1);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      {matches ? (
        <main
          className="voting-page"
          style={{ display: "flex", flexDirection: "row", flex: 1 }}
        >
          <VotingCard animateKey={animateKey} onVote={handleAnyVote}/>
          <h1 style={{fontSize: '5vh'}}>VS</h1>
          <VotingCard animateKey={animateKey} onVote={handleAnyVote}/>
        </main>
      ) : (
        <main
          className="voting-page"
          style={{ display: "flex", flexDirection: "column", width: "auto", flex: 1, justifyContent: "space-between", height: '100%' }}
        >
          <VotingCard animateKey={animateKey} onVote={handleAnyVote}/>
          <h1 style={{fontSize: '5vh'}}>VS</h1>
          <VotingCard animateKey={animateKey} onVote={handleAnyVote}/>
        </main>
      )}
    </div>
  );
}
