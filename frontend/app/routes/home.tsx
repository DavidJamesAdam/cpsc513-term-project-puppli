import { useState, useEffect } from "react";
import type { Route } from "./+types/home";
import Header from "../components/header/header";
import VotingCard from "../components/voting-card/voting-card";
import useMediaQuery from "@mui/material/useMediaQuery";
import { authCheck } from "../utils/authCheck";
import Link from "@mui/material/Link";

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
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const matches = useMediaQuery("(min-width: 600px)");
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        await authCheck();
        setAuthorized(true);
      } catch (e) {
        // Not authenticated — display guest version of the page
        setAuthorized(false);
      }
    })();
  }, []);

  if (authorized === null) {
    // Still checking; render nothing (avoids showing protected content).
    return null;
  }

  const handleAnyVote = () => {
    // increment to retrigger animation in children
    setAnimateKey((k) => k + 1);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      {matches ? (
        <>
          {!authorized && (
            <h1
              style={{
                fontSize: "5vh",
                alignSelf: "center",
                paddingTop: "30px",
              }}
              className="blinking-text"
            >
              To like, comment, or vote, please{" "}
              <Link className="link" href="signup">
                Sign-up here
              </Link>
              !
            </h1>
          )}
          <main
            className="voting-page"
            style={{ display: "flex", flexDirection: "row", flex: 1 }}
          >
            <VotingCard
              animateKey={animateKey}
              onVote={handleAnyVote}
              authorized={authorized}
            />
            <h1 style={{ fontSize: "5vh" }}>VS</h1>
            <VotingCard
              animateKey={animateKey}
              onVote={handleAnyVote}
              authorized={authorized}
            />
          </main>
        </>
      ) : (
        <main
          className="voting-page"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "auto",
            flex: 1,
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <VotingCard
            animateKey={animateKey}
            onVote={handleAnyVote}
            authorized={authorized}
          />
          <h1 style={{ fontSize: "5vh" }}>VS</h1>
          <VotingCard
            animateKey={animateKey}
            onVote={handleAnyVote}
            authorized={authorized}
          />
        </main>
      )}
    </div>
  );
}
