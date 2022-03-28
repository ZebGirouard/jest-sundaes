import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { Options } from "../Options";
import { OrderEntry } from "../OrderEntry";

test("update scoop total when scoops change", async () => {
  render(<Options optionType="scoops" />);

  const scoopsSubtotal = screen.getByText("Scoops total: $", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings total when toppings change", async () => {
  render(<Options optionType="toppings" />);

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const strawberryCheckbox = await screen.findByRole("checkbox", {
    name: /strawberries/i,
  });
  userEvent.click(strawberryCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  userEvent.click(strawberryCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  // This throws a cleanup error
  test.skip("grand total starts at 0", () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", { name: /grand total/i });
    expect(grandTotal).toHaveTextContent("Grand total: $0.00");
  });

  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", { name: /grand total/i });
    expect(grandTotal).toHaveTextContent("Grand total: $0.00");

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: /chocolate/i,
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");

    const strawberryCheckbox = await screen.findByRole("checkbox", {
      name: /strawberries/i,
    });
    userEvent.click(strawberryCheckbox);

    expect(grandTotal).toHaveTextContent("Grand total: $5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", { name: /grand total/i });

    const cherryCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.click(cherryCheckbox);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("Grand total: $3.50");
  });

  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", { name: /grand total/i });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    const strawberryCheckbox = await screen.findByRole("checkbox", {
      name: /strawberries/i,
    });

    userEvent.click(strawberryCheckbox);
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    userEvent.click(strawberryCheckbox);

    expect(grandTotal).toHaveTextContent("Grand total: $4.00");
  });
});
