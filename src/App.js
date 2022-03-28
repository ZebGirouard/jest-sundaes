import { Container } from "react-bootstrap";
import { OrderEntry } from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
const App = () => {
  return (
    <OrderDetailsProvider>
      <Container>
        <OrderEntry />
      </Container>
    </OrderDetailsProvider>
  );
};

export default App;
