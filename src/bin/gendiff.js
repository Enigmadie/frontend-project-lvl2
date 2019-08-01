#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package.json';

program
  .description('Compares two configuration files and shows a difference.')
  .version(version);

program.parse(process.argv);
