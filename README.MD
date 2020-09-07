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
| -- react
```

/packages/models/src/index.tsx:
```
export const hello: string = 'hello world!';
```

/packages/react/src/App.tsx:
```
import { hello } from 'models';
```

## Starting the dev server
The workspace has a top-level dependency [wsrun](https://github.com/hfour/wsrun) which can be utilized to run a command in all packages concurrently (or in serial, for that matter). Check it out, it's awesome!

## Current problems
 - New package.json `exports` is not supported by Typescript([tracking issue](https://github.com/microsoft/TypeScript/issues/33079)), so no quick&easy way to import child modules of the package (e.g. `models/my-file`)
 - Cannot use module: "esnext" because Node still does not support named imports from cjs modules, and the workarounds are quite annoying (e.g. `import express from 'express'; const { Router } = express;`)
 - CommonJS does not support `esnext` syntax even in newer (13.x) version of node. Had to step down to ES2015 compilation target.
