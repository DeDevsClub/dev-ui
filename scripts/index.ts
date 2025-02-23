#!/usr/bin/env node

import { execSync } from 'node:child_process';

const args = process.argv.slice(2);

if (args.length < 2 || args[0] !== 'add') {
  process.stdout.write('Usage: npx dev-ui add [...packages]\n');
  process.exit(1);
}

const packageNames = args.slice(1);

for (const packageName of packageNames) {
  if (!packageName.trim()) {
    continue;
  }

  process.stdout.write(`Adding ${packageName} component...\n`);

  const url = new URL(
    `registry/${packageName}.json`,
    'https://devui.dedevs.club'
  );

  execSync(`npx shadcn@latest add ${url.toString()}`);
}
