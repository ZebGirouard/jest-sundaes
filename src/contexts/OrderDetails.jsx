import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { pricePerItem } from "../constants";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

const OrderDetails = createContext();

export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetails context"
    );
  }

  return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);
  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionCounts = { ...optionCounts };

      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    };

    return [
      {
        ...optionCounts,
        totals,
      },
      updateItemCount,
    ];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
  //   const [scoops, setScoops] = useState([]);
  //   const [toppings, setToppings] = useState([]);
  //   const [subtotal, setSubtotal] = useState(0);
  //   const [tax, setTax] = useState(0);
  //   const [total, setTotal] = useState(0);

  //   const subtotalWithTax = useMemo(() => subtotal + tax, [subtotal, tax]);

  //   return (
  //     <OrderDetails.Provider
  //       value={{
  //         scoops,
  //         setScoops,
  //         toppings,
  //         setToppings,
  //         subtotal,
  //         setSubtotal,
  //         tax,
  //         setTax,
  //         total,
  //         setTotal,
  //         subtotalWithTax,
  //       }}
  //     >
  //       {children}
  //     </OrderDetails.Provider>
  //   );
};
