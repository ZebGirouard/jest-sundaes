import React from "react";
import { SummaryForm } from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
export const OrderSummary = ({ setOrderPhase }) => {
  const { orderDetails } = useOrderDetails();

  const scoopsArray = Array.from(orderDetails.scoops);

  const toppingsArray = Array.from(orderDetails.toppings.keys());

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      {scoopsArray.map(([type, value]) => (
        <p key={type}>
          - {value} {type}
        </p>
      ))}
      {orderDetails.toppings.size && (
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
      )}
      {toppingsArray.map((type) => (
        <p key={type}>- {type}</p>
      ))}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};
