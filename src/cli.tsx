#!/usr/bin/env node
import * as dotenv from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as commands from "./commands";

dotenv.config();

yargs(hideBin(process.argv))
  .command(commands.login)
  .command(commands.logout)
  .command(commands.me)
  .command(commands.refresh)
  .command(commands.select)
  .command(commands.init)
  .demandCommand(1)
  .help().argv;
