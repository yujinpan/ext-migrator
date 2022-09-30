# Ext Migrator

Complete or remove files extension.

| source                     | target                               |
| -------------------------- | ------------------------------------ |
| `import '@/example-js'`    | `import '@/example-js.js'`           |
| `import '@/example-ts'`    | `import '@/example-ts.ts'`           |
| `import '@/example-jsx'`   | `import '@/example-jsx.jsx'`         |
| `import '@/example-tsx'`   | `import '@/example-tsx.tsx'`         |
| `import '@/example-vue'`   | `import '@/example-vue.vue'`         |
| `import '@/example-index'` | `import '@/example-index/index.vue'` |

> By default, only `.vue` `.scss` `.css` extensions will be added.

## Install

```shell
npm i --no-save ext-migrator
```

## Start

```shell
ext-migrator
```

## Options

```
ext-migrator [args]

Options:
  -f, --files       input files                  [array] [default: ["src/**/*"]]
  -a, --alias       path alias                      [array] [default: ["@=src"]]
  -e, --extensions  extensions for imports files
                   [array] [default: ["js","ts","jsx","tsx","vue","css","scss"]]
  -c, --complete    need to complete extensions, use ! prefix will be remove,
                    like: !vue           [array] [default: ["vue","scss","css"]]
  -v, --version     Show version number                                [boolean]
  -h, --help        Show help                                          [boolean]

```
