import Button from "@mui/material/Button";
import * as React from "react";

export default function VotingCard() {
  const handleCommentButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Open comment model to leave comment on picture
  };

  const handleFavoriteButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Add picture to favorites
  };
  const handleVoteButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Vote for specific picture
  };
  return (
    <div className="voting-card">
      <div className="picture"></div>
      <div className="voting-card-options">
        <Button id="comment-button" onClick={handleCommentButtonClick}>
          <img src="assets\icons\Message icon.svg" />
        </Button>
        <Button id="favorite-button" onClick={handleFavoriteButtonClick}>
          <img src="assets\icons\heart icon.svg" />
        </Button>
        <Button id="vote-button" onClick={handleVoteButtonClick}>
          <img src="assets\icons\vote icon.svg" />
        </Button>
      </div>
    </div>
  );
}
