#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import "./env";
import * as commands from "./commands";

yargs(hideBin(process.argv))
  .command(commands.login)
  .command(commands.logout)
  .command(commands.me)
  .command(commands.refresh)
  .command(commands.select)
  .command(commands.init)
  .command(commands.generate)
  .showHelpOnFail(true)
  .demandCommand()
  .recommendCommands()
  .strict().argv;
