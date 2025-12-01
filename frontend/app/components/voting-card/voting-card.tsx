import Button from "@mui/material/Button";
import * as React from "react";
import CommentModal from "../modals/comment-modal/comment-modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect, useRef } from "react";
import "./styles.css";
import disabledVoteIcon from "./icons/disabled_vote.svg";
import disabledLikeIcon from "./icons/disabled_like.svg";

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

type VotingCardProps = {
  animateKey?: number;
  onVote?: () => void;
  authorized: boolean;
  post?: Post;
};

export default function VotingCard({
  animateKey,
  onVote,
  authorized,
  post,
}: VotingCardProps) {
  const [isFadedOut, setIsFadedOut] = useState(false);
  const [isPopped, setIsPopped] = useState(false);
  const [plusOnes, setPlusOnes] = useState<number[]>([]);
  const [voteCount, setVoteCount] = useState(post?.voteCount || 0);
  const matches = useMediaQuery("(min-width: 600px)");
  const firstRunRef = useRef(true);
  const [imgFitMode, setImgFitMode] = useState<
    "fit-width" | "fit-height" | "contain"
  >("contain");

  // helper to set mode on image load
  function handleImgLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    const naturalW = img.naturalWidth || 1;
    const naturalH = img.naturalHeight || 1;
    const imageAspect = naturalW / naturalH;

    // compute container aspect: you may use a fixed ratio you set in CSS,
    // or compute from clientWidth/clientHeight of the container:
    const container = img.parentElement as HTMLElement | null;
    let containerAspect = 1;
    if (container) {
      const rect = container.getBoundingClientRect();
      containerAspect = rect.width / Math.max(rect.height, 1);
    }

    // choose fit mode
    if (imageAspect > containerAspect) {
      // image is wider than container -> fit by width so width fills and height shrinks
      setImgFitMode("fit-width");
    } else if (imageAspect < containerAspect) {
      // image is taller -> fit by height
      setImgFitMode("fit-height");
    } else {
      setImgFitMode("contain");
    }
  }

  // keep vote count in sync with incoming post prop
  useEffect(() => {
    setVoteCount(post?.voteCount || 0);
  }, [post]);
  const handleCommentButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Open comment model to leave comment on picture
  };

  const handleFavoriteButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Add picture to favorites

    // create a short-lived +1
    const id = Date.now();
    setPlusOnes((prev) => [...prev, id]);

    // remove it after the animation duration (match CSS 800ms)
    window.setTimeout(() => {
      setPlusOnes((prev) => prev.filter((x) => x !== id));
    }, 2000); // small buffer > animation duration
  };

  useEffect(() => {
    if (animateKey === undefined) return;
    // avoid running on first mount if you don't want it
    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }

    // fade out then pop in (timings should match your CSS)
    setIsFadedOut(true);
    const fadeTimer = window.setTimeout(() => {
      setIsFadedOut(false);
      setIsPopped(true);
      const popTimer = window.setTimeout(() => setIsPopped(false), 300);
      // cleanup pop timer if necessary
      return () => clearTimeout(popTimer);
    }, 320);

    return () => {
      clearTimeout(fadeTimer);
    };
  }, [animateKey]);

  const handleVoteButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Vote for specific picture
    if (!post) return;

    try {
      const response = await fetch(
        `http://localhost:8000/posts/vote/${post.id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        setVoteCount((prev) => prev + 1);
        if (onVote) onVote();
      } else {
        console.error("Error voting on post:", response.status);
      }
    } catch (error) {
      console.error("Failed to vote on post:", error);
    }
  };
  return (
    <>
      {matches ? (
        <div
          className={`fade-target ${isFadedOut ? "fade-out" : ""} ${isPopped ? "pop-in" : ""}`}
          style={{
            border: "1px solid rgba(255, 132, 164, 1)",
            width: "30%",
            height: "80%",
            borderRadius: "40px",
            backgroundColor: "rgba(224, 205, 178, 1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div className="image-container">
            {post?.imageUrl ? (
              <img
                src={post.imageUrl}
                alt={post.caption}
                onLoad={handleImgLoad}
                className={imgFitMode}
              />
            ) : (
              <img
                src={"assets/icons/ant-design--picture-outlined.svg"}
                className="fallback-image"
              />
            )}
          </div>
          <div
            className="voting-card-options"
            style={{
              display: "flex",
              flexDirection: "row",
              width: "50%",
              height: "20%",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <CommentModal authorized={authorized} />
            <div style={{ position: "relative", display: "inline-block" }}>
              {authorized ? (
                <Button
                  id="favorite-button"
                  onClick={handleFavoriteButtonClick}
                >
                  <img src="assets\icons\heart icon.svg" />
                </Button>
              ) : (
                <Button id="favorite-button">
                  <img src={disabledLikeIcon} />
                </Button>
              )}
              {plusOnes.map((id) => (
                <span key={id} className="plus-one">
                  +1
                </span>
              ))}
            </div>
            {authorized ? (
              <Button id="vote-button" onClick={handleVoteButtonClick}>
                <img src="assets\icons\vote icon.svg" />
              </Button>
            ) : (
              <Button id="vote-button">
                <img src={disabledVoteIcon} />
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`fade-target ${isFadedOut ? "fade-out" : ""} ${isPopped ? "pop-in" : ""}`}
          style={{
            border: "1px solid rgba(255, 132, 164, 1)",
            width: "100%",
            height: "100%",
            borderRadius: "40px",
            backgroundColor: "rgba(224, 205, 178, 1)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div className="image-container">
            {post?.imageUrl ? (
              <img
                src={post.imageUrl}
                alt={post.caption}
                onLoad={handleImgLoad}
                className={imgFitMode}
              />
            ) : (
              <img
                src={"assets/icons/ant-design--picture-outlined.svg"}
                className="fallback-image"
              />
            )}
          </div>
          <div
            id="menuOptions"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              height: "400px",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <CommentModal authorized={authorized} />
            {authorized ? (
              <Button id="favorite-button" onClick={handleFavoriteButtonClick}>
                <img src="assets\icons\heart icon.svg" />
              </Button>
            ) : (
              <Button id="favorite-button">
                <img src={disabledLikeIcon} />
              </Button>
            )}
            {authorized ? (
              <Button id="vote-button" onClick={handleVoteButtonClick}>
                <img src="assets\icons\vote icon.svg" />
              </Button>
            ) : (
              <Button id="vote-button">
                <img src={disabledVoteIcon} />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
