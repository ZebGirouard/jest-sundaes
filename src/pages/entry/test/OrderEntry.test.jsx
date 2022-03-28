import { render, screen } from "../../../test-utils/testing-library-utils";
import { OrderEntry } from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import { waitFor } from "@testing-library/dom";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  render(<OrderEntry />);
  await waitFor(async () => {
    //   BOO I Do not like how she just deleted the name prop here and moved on.
    // const alerts = await screen.findAllByRole("alert", { name: /error/i });
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
    //   BOO I Do not like how there's no explanation of how else I could check these things...2 waitFors?
    // expect(alerts[0]).toHaveTextContent(/error/i);
  });
});
