import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  render(<App />);

  //   add ice cream scoops and toppings
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  userEvent.click(cherriesCheckbox);

  // find and click order button
  const orderButton = await screen.findByRole("button", {
    name: "Order Sundae",
  });
  userEvent.click(orderButton);

  // check summary information based on order
  await screen.findByRole("heading", { name: "Order Summary" });

  const scoops = await screen.findByText("Scoops", { exact: false });
  expect(scoops).toHaveTextContent("$4.00");

  const flavor = await screen.findByText(/chocolate/i, { exact: false });
  expect(flavor).toHaveTextContent("2");

  const toppings = await screen.findByText("Toppings", { exact: false });
  expect(toppings).toHaveTextContent("$1.50");

  await screen.findByText(/cherries/i, {
    exact: false,
  });

  // accept terms and conditions and click button to confirm order
  const termsCheckbox = await screen.findByRole("checkbox");
  userEvent.click(termsCheckbox);

  const confirmButton = await screen.findByRole("button", { name: /confirm/i });
  userEvent.click(confirmButton);

  // verify loading shows
  screen.getByText("Loading");

  // Verify heading shows after loading disappears
  await screen.findByRole("heading", { name: "Thank you!" });
  expect(screen.queryByText("Loading")).not.toBeInTheDocument();

  // confirm order number on confirmation page
  const orderNumber = await screen.findByRole("heading", {
    name: /order number/i,
  });
  expect(orderNumber).toHaveTextContent("1234567890");

  // click "new order" button on confirmation page
  const newOrderButton = await screen.findByRole("button", {
    name: "Create new order",
  });
  userEvent.click(newOrderButton);

  await screen.findByRole("heading", { name: "Design Your Sundae!" });

  // check that scoops and toppings subtotals have been reset
  const grandTotal = screen.getByRole("heading", { name: /grand total/i });
  expect(grandTotal).toHaveTextContent("Grand total: $0.00");

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const scoopsSubtotal = screen.getByText("Scoops total: $", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
});

test("order phases for no toppings", async () => {
  render(<App />);

  //   add ice cream scoops but NO toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");

  // find and click order button
  const orderButton = await screen.findByRole("button", {
    name: "Order Sundae",
  });
  userEvent.click(orderButton);

  const scoops = await screen.findByText("Scoops", { exact: false });
  expect(scoops).toHaveTextContent("$4.00");

  const flavor = await screen.findByText(/vanilla/i, { exact: false });
  expect(flavor).toHaveTextContent("2");

  const toppings = screen.queryByText("Toppings", { exact: false });
  expect(toppings).not.toBeInTheDocument();
});
