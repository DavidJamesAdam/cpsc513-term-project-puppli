import { useState, useEffect } from "react";
import type { Route } from "./+types/home";
import Header from "../components/header/header";
import VotingCard from "../components/voting-card/voting-card";
import useMediaQuery from "@mui/material/useMediaQuery";
import { authCheck } from "../utils/authCheck";
import Link from "@mui/material/Link";
import LoginHeader from "~/components/header/loginHeader";

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
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<[Post | null, Post | null]>([null, null]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from backend
  useEffect(() => {
    (async () => {
      try {
        await authCheck();
        setAuthorized(true);
      } catch (e) {
        // Not authenticated — display guest version of the page
        setAuthorized(false);
      }

      // Fetch all posts
      try {
        const response = await fetch("http://localhost:8000/posts", {
          credentials: "include",
        });

        if (response.ok) {
          const postsData = await response.json();
          setPosts(postsData);

          // Select 2 random posts for initial display
          if (postsData.length >= 2) {
            selectRandomPosts(postsData);
          }
        } else {
          console.error("Error fetching posts:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Function to select 2 random posts
  const selectRandomPosts = (postsList: Post[]) => {
    if (postsList.length < 2) {
      setSelectedPosts([null, null]);
      return;
    }

    const shuffled = [...postsList].sort(() => Math.random() - 0.5);
    setSelectedPosts([shuffled[0], shuffled[1]]);
  };

  if (authorized === null || loading) {
    // Still checking; render nothing (avoids showing protected content).
    return null;
  }

  const handleAnyVote = () => {
    // Select new random posts after voting
    selectRandomPosts(posts);
    // increment to retrigger animation in children
    setAnimateKey((k) => k + 1);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {authorized ? <Header /> : <LoginHeader />}
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
            {selectedPosts[0] && selectedPosts[1] ? (
              <>
                <VotingCard
                  animateKey={animateKey}
                  onVote={handleAnyVote}
                  authorized={authorized}
                  post={selectedPosts[0]}
                />
                <h1 style={{ fontSize: "5vh" }}>VS</h1>
                <VotingCard
                  animateKey={animateKey}
                  onVote={handleAnyVote}
                  authorized={authorized}
                  post={selectedPosts[1]}
                />
              </>
            ) : (
              <h1 style={{ fontSize: "3vh", alignSelf: "center", margin: "auto" }}>
                Not enough posts available. Please upload some posts to start voting!
              </h1>
            )}
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
          {selectedPosts[0] && selectedPosts[1] ? (
            <>
              <VotingCard
                animateKey={animateKey}
                onVote={handleAnyVote}
                authorized={authorized}
                post={selectedPosts[0]}
              />
              <h1 style={{ fontSize: "5vh" }}>VS</h1>
              <VotingCard
                animateKey={animateKey}
                onVote={handleAnyVote}
                authorized={authorized}
                post={selectedPosts[1]}
              />
            </>
          ) : (
            <h1 style={{ fontSize: "3vh", alignSelf: "center", margin: "auto" }}>
              Not enough posts available. Please upload some posts to start voting!
            </h1>
          )}
        </main>
      )}
    </div>
  );
}
