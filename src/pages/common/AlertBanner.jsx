import { Alert } from "react-bootstrap";

export const AlertBanner = ({ message, variant }) => {
  const alertMessage = message || "An unknown error occurred.";
  const alertVariant = variant || "danger";
  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
};
