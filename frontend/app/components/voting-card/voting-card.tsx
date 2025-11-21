import Button from "@mui/material/Button";
import * as React from "react";
import CommentModal from "../comment-modal/comment-modal";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function VotingCard() {
  const matches = useMediaQuery("(min-width: 600px)");
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
    <>
      {matches ? (
        <div
          style={{
            border: "1px solid rgba(255, 132, 164, 1)",
            width: "30%",
            height: "50%",
            borderRadius: "40px",
            backgroundColor: "rgba(224, 205, 178, 1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              border: "1px solid",
              borderRadius: "40px",
              width: "75%",
              height: "75%",
              margin: "20px",
              backgroundColor: "rgba(217, 217, 217, 1)",
            }}
          >
            <img src={"assets/icons/ant-design--picture-outlined.svg"} />
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
            <CommentModal />
            <Button id="favorite-button" onClick={handleFavoriteButtonClick}>
              <img src="assets\icons\heart icon.svg" />
            </Button>
            <Button id="vote-button" onClick={handleVoteButtonClick}>
              <img src="assets\icons\vote icon.svg" />
            </Button>
          </div>
        </div>
      ) : (
        <div
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
          <div
            style={{
              border: "1px solid",
              borderRadius: "40px",
              width: "75%",
              height: "75%",
              marginTop: "20px",
              marginLeft: "20px",
              marginBottom: "20px",
              backgroundColor: "rgba(217, 217, 217, 1)",
            }}
          >
            <img src={"assets/icons/ant-design--picture-outlined.svg"} />
          </div>
          <div id='menuOptions'
            style={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              height: "400px",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <CommentModal />
            <Button id="favorite-button" onClick={handleFavoriteButtonClick}>
              <img src="assets\icons\heart icon.svg" />
            </Button>
            <Button id="vote-button" onClick={handleVoteButtonClick}>
              <img src="assets\icons\vote icon.svg" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
