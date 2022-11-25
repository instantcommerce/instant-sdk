#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import "./env";
import * as commands from "./commands";

yargs(hideBin(process.argv))
  .command(commands.login)
  .command(commands.whoami)
  .command(commands.logout)
  .command(commands.refresh)
  .command(commands.select)
  .command(commands.init)
  .command(commands.generate)
  .command(commands.dev)
  .command(commands.add)
  .command(commands.publish)
  .showHelpOnFail(true)
  .demandCommand()
  .recommendCommands()
  .strict().argv;
