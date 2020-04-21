# A typescript monorepo template
This repo contains a stub for a TypeScript monorepo, allowing simultaneous development of multiple packages dependant on each other.

## Rationale
The main goal here was to share dependencies between an Express.js backend and a React frontend (with [create-react-app](https://github.com/facebook/create-react-app)). Create-react-app does not support imports from outside the project's `src`, and I'm far from a WebPack/Babel guru. Plus, transpiling the dependencies with the project that's being build is a pretty weird idea in itself.

Hence the [Yarn workspace](https://classic.yarnpkg.com/docs/workspaces/) and concurrent compilation!

## Directory structure
The packages for the monorepo are located under `packages/`. To add new packages, just create a subdirectory in `packages/` with a `package.json` insude. Each package can be referenced from inside the other one, for example:

Package structure:
```
| packages
| -- models
| -- frontend
```

/packages/models/src/index.tsx:
```
export const hello: string = 'hello world!';
```

/packages/frontend/src/App.tsx:
```
import { hello } from 'models';
```

## Starting the dev server
The workspace has a top-level dependency [wsrun](https://github.com/hfour/wsrun) which can be utilized to run a command in all packages concurrently (or in serial, for that matter). Check it out, it's awesome!

## Current problems
 - New package.json `exports` is not supported by Typescript, so no quick&easy way to import child modules of the package (e.g. `models/my-file`)
 - Typescript does not resolve import extensions on compile if compiling to ESM. `import from './some-file'` stays unchanged in JS, while it should be `import from './some-file.js'` to work natively in Node. Had to step down to CommonJS. Some alternative solutions would be bundlers or [ttypescript](https://github.com/cevek/ttypescript) + [this brilliant transformer](https://github.com/Zoltu/typescript-transformer-append-js-extension/).
 - CommonJS does not support `esnext` syntax even in newer (13.x) version of node. Had to step down to ES2015 compilation target.