#!/usr/bin/env node
import * as dotenv from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { cmdLogin, cmdLogout, cmdMe, cmdRefresh, cmdSwitch } from "./commands";

dotenv.config();

yargs(hideBin(process.argv))
  .command(cmdLogin)
  .command(cmdLogout)
  .command(cmdMe)
  .command(cmdRefresh)
  .command(cmdSwitch)
  .demandCommand(1)
  .help().argv;
