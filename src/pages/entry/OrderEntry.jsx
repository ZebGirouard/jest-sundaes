import { Button } from "react-bootstrap";
import { Options } from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

export const OrderEntry = ({ setOrderPhase }) => {
  const { orderDetails } = useOrderDetails();

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button
        disabled={orderDetails.totals.scoops === "$0.00"}
        onClick={() => setOrderPhase("review")}
      >
        Order Sundae
      </Button>
    </div>
  );
};
