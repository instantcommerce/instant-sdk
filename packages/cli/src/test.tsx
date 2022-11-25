/** @TODO not working yet */
import React from "react";
import chalk from "chalk";
import test from "ava";
import { render } from "ink-testing-library";
import { Logout } from "./commands";

test("Logout of current account", (t) => {
  const { lastFrame } = render(<Logout />);

  t.is(lastFrame(), chalk`Successfully logged out.`);
});
