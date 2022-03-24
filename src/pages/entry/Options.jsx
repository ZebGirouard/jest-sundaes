import axios from "axios";
import { useEffect, useState } from "react";
import { ScoopOption } from "./ScoopOption";
import { Row } from "react-bootstrap";
import { ToppingOption } from "./ToppingOption";
export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, [optionType]);
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

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
