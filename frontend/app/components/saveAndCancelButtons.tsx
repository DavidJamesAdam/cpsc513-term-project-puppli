import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

interface SaveAndCancelButtonsProps {
  onAction: (value: boolean) => void;
}

export default function SaveAndCancelButtons({
  onAction,
}: SaveAndCancelButtonsProps) {
  const saveButtonStyle = {
    backgroundColor: "rgba(179, 232, 232, 1)",
    color: "#675844",
    font: "inherit",
    display: "flex",
    justifyContent: "flex-end",
    textTransform: "none",
    fontSize: "24px",
  };

  const cancelButtonStyle = {
    backgroundColor: "#ffc2cf",
    color: "#675844",
    font: "inherit",
    display: "flex",
    justifyContent: "flex-end",
    textTransform: "none",
    fontSize: "24px",
  };

  const buttonGroupStyle = {
    paddingLeft: "15px",
  };

  return (
    <ButtonGroup
      size="small"
      color="secondary"
      variant="text"
      aria-label="save and cancel button group"
      sx={buttonGroupStyle}
    >
      <Button onClick={() => onAction(true)} sx={saveButtonStyle}>
        Save
      </Button>
      <Button onClick={() => onAction(false)} sx={cancelButtonStyle}>
        Cancel
      </Button>
    </ButtonGroup>
  );
}
