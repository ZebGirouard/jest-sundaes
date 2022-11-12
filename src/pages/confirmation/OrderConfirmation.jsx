import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import axios from "axios";
export const OrderConfirmation = ({ setOrderPhase }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const { clearOrder } = useOrderDetails();

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((res) => setOrderNumber(res.data.orderNumber));
    //   TODO: Handle error
  }, []);

  return orderNumber === null ? (
    <div>Loading</div>
  ) : (
    <div>
      <h1>Thank you!</h1>
      <h2>Your order number is {orderNumber}</h2>
      <Button
        onClick={() => {
          setOrderPhase("inProgress");
          clearOrder();
        }}
      >
        Create new order
      </Button>
    </div>
  );
};
