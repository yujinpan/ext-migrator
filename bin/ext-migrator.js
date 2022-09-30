#!/usr/bin/env node

const argv = require('yargs')(process.argv.slice(2))
  .scriptName('ext-migrator')
  .usage('$0 [args]')
  .options({
    f: {
      alias: 'files',
      default: ['src/**/*'],
      describe: 'input files',
      array: true,
    },
    a: {
      alias: 'alias',
      default: ['@=src'],
      describe: 'path alias',
      array: true,
      coerce(alias) {
        return alias.reduce((prev, next) => {
          const [key, val] = next.split('=');
          prev[key] = val;
          return prev;
        }, {});
      },
    },
    e: {
      alias: 'extensions',
      default: ['js', 'ts', 'jsx', 'tsx', 'vue', 'css', 'scss'],
      describe: 'extensions for imports files',
      array: true,
    },
    c: {
      alias: 'complete',
      default: ['vue', 'scss', 'css'],
      describe:
        'need to complete extensions, use ! prefix will be remove, like: !vue',
      array: true,
      coerce(complete) {
        return complete.reduce((prev, next) => {
          const key = next.startsWith('!') ? next.slice(1) : next;
          return { ...prev, [key]: !next.startsWith('!') };
        }, {});
      },
    },
  })
  .alias('v', 'version')
  .alias('h', 'help')
  .help().argv;

require('../lib/index').extMigrator(argv);
