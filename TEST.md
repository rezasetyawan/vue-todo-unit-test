# How to add and implement unit test and e2e test

## Unit test with vitest/vue-utils

1. vitest

- yard add -D vitest
- yarn add -D @types/jest
- yard add -D @vitest/coverage-v8 (optinal for converage)
- yarn add -D @vue/test-utils
- yarn add happy-dom

2. vite.config.ts

```
test: {
    include: ['src/tests/*']
}

```

3. create new `tests` folder
 - add file test `*.spec.ts`


4. update script

script: {
    "test": "vitest --dom" // --dom is optinal if install happy-dom or jsdom
}