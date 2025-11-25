import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

interface TemporaryNotificationProps {
  visible: boolean;
  onAction: (value: boolean) => void;
  message: string;
  successful: boolean;
}

export default function TemporaryNotification({
  visible,
  onAction,
  message,
  successful,
}: TemporaryNotificationProps) {
  // determine color of background of temp notif
  const notificationColor = successful ? "#80c784ff" : "#ed7a7aff";

  const notificationStyle = {
    textAlign: "left",
    backgroundColor: notificationColor,
    borderRadius: "40px",
    justifyContent: "space-between",
    minWidth: "300px",
    maxHeight: "100px",
    padding: "5px",
    position: "absolute",
    right: "20px",
    top: "120px",
  };

  const dismissButtonStyle = {
    color: "#675844",
    font: "inherit",
    display: "flex",
    justifyContent: "flex-end",
    textTransform: "none",
    fontSize: "24px",
    borderRadius: "30px",
    padding: "10px",
    textDecoration: "underline",
  };

  return (
    visible && (
      <Card sx={notificationStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              color: "#675844",
              font: "inherit",
              fontSize: "24px",
              padding: "10px",
            }}
          >
            {message}
          </p>
          <Button sx={dismissButtonStyle} onClick={() => onAction(false)}>
            Dismiss
          </Button>
        </div>
      </Card>
    )
  );
}
