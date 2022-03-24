import { SummaryForm } from "../SummaryForm";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

describe("Terms and Conditions", () => {
  it("is unchecked by default", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("enables checkout when checked", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox");
    const checkoutButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    userEvent.click(checkbox);
    expect(checkoutButton).toBeEnabled();
  });

  it("disables button when checked then unchecked", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox");
    const checkoutButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    userEvent.click(checkbox);
    expect(checkoutButton).toBeEnabled();
    userEvent.click(checkbox);
    expect(checkoutButton).toBeDisabled();
  });

  // get: expect element to be in DOM
  // query: expect element NOT to be in DOM
  // find: expect element to appear async
  it("popover responds to hover", async () => {
    render(<SummaryForm />);
    const termsAndConditions = screen.getByText(/terms and conditions/i);

    const blankPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(blankPopover).not.toBeInTheDocument();

    userEvent.hover(termsAndConditions);
    const popover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
