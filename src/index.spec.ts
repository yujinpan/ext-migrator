import fs from 'fs';
import path from 'path';

import { extMigrator } from './index';

const root = 'example-files';

beforeEach(() => {
  fs.mkdirSync(root);
});

afterEach(() => {
  fs.rmdirSync(root, { recursive: true });
});

const writeFile = (filepath: string, data = '') => {
  filepath = path.resolve(root, filepath);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, data);
};

const readFile = (filepath: string) => {
  return fs.readFileSync(path.resolve(root, filepath)).toString();
};

describe('extMigrator', () => {
  it('should complete js/ts/jsx/tsx/vue', async function () {
    writeFile('example-js.js');
    writeFile('example-ts.ts');
    writeFile('example-jsx.jsx');
    writeFile('example-tsx.tsx');
    writeFile('example-vue.vue');
    writeFile(
      'index.js',
      `
import "example-js";
import "example-ts";
import "example-jsx";
import "example-tsx";
import "example-vue";
`,
    );

    await extMigrator({
      files: [path.resolve(root, 'index.js')],
      complete: true,
    });
    expect(readFile('index.js')).toBe(
      `
import "example-js.js";
import "example-ts.ts";
import "example-jsx.jsx";
import "example-tsx.tsx";
import "example-vue.vue";
`,
    );

    await extMigrator({
      files: [path.resolve(root, 'index.js')],
    });
    expect(readFile('index.js')).toBe(
      `
import "example-js";
import "example-ts";
import "example-jsx";
import "example-tsx";
import "example-vue.vue";
`,
    );
  });

  it('should complete index.js/ts/jsx/tsx/vue', async function () {
    writeFile('example-js/index.js');
    writeFile('example-ts/index.ts');
    writeFile('example-jsx/index.jsx');
    writeFile('example-tsx/index.tsx');
    writeFile('example-vue/index.vue');
    writeFile(
      'index.js',
      `
import "example-js";
import "example-ts";
import "example-jsx";
import "example-tsx";
import "example-vue";
`,
    );

    await extMigrator({
      files: [path.resolve(root, 'index.js')],
      complete: true,
    });
    expect(readFile('index.js')).toBe(
      `
import "example-js/index.js";
import "example-ts/index.ts";
import "example-jsx/index.jsx";
import "example-tsx/index.tsx";
import "example-vue/index.vue";
`,
    );

    await extMigrator({
      files: [path.resolve(root, 'index.js')],
    });
    expect(readFile('index.js')).toBe(
      `
import "example-js";
import "example-ts";
import "example-jsx";
import "example-tsx";
import "example-vue/index.vue";
`,
    );
  });

  it('should complete with alias', async function () {
    writeFile('src/index.js');
    writeFile('src/example.js');
    writeFile(
      'index.js',
      `
import '@'
import '@/example'
    `,
    );

    await extMigrator({
      files: [path.resolve(root, 'index.js')],
      complete: true,
      alias: {
        '@': root + '/src',
      },
    });
    expect(readFile('index.js')).toBe(`
import '@/index.js'
import '@/example.js'
    `);

    await extMigrator({
      files: [path.resolve(root, 'index.js')],
      alias: {
        '@': root + '/src',
      },
    });
    expect(readFile('index.js')).toBe(`
import '@'
import '@/example'
    `);
  });
});
