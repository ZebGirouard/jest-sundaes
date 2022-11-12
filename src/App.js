import { Container } from "react-bootstrap";
import { useState } from "react";
import { OrderConfirmation } from "./pages/confirmation/OrderConfirmation";
import { OrderEntry } from "./pages/entry/OrderEntry";
import { OrderSummary } from "./pages/summary/OrderSummary";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
const App = () => {
  const [orderPhase, setOrderPhase] = useState("inProgress");
  return (
    <OrderDetailsProvider>
      <Container>
        {orderPhase === "inProgress" && (
          <OrderEntry setOrderPhase={setOrderPhase} />
        )}
        {orderPhase === "review" && (
          <OrderSummary setOrderPhase={setOrderPhase} />
        )}
        {orderPhase === "complete" && (
          <OrderConfirmation setOrderPhase={setOrderPhase} />
        )}
      </Container>
    </OrderDetailsProvider>
  );
};

export default App;
