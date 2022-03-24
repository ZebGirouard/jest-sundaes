import axios from "axios";
import { useEffect, useState } from "react";
import { ScoopOption } from "./ScoopOption";
import { Row } from "react-bootstrap";
import { ToppingOption } from "./ToppingOption";
import { AlertBanner } from "../common/AlertBanner";
export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => setError(true));
  }, [optionType]);
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  if (error) {
    return <AlertBanner />;
  }

  return (
    <Row>
      {items.map((item) => (
        <ItemComponent
          key={item.name}
          name={item.name}
          imagePath={item.imagePath}
        />
      ))}
    </Row>
  );
};
