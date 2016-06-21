# service-npm-module

Transform (almost) any npm module into a web service.


## install

```bash
git clone git@github.com:kr1sp1n/service-npm-module.git
cd service-npm-module
npm install
```

## run

```bash
npm start
```

The default npm module is `lodash` but you can override it via
the env var `NPM_MODULE`. See `src/config.js`.


## usage

The idea is to do a `POST /:moduleName/:functionName` like `POST /lodash/upperCase` and
the request body should be an array of arguments that will be
applied via `moduleName[functionName].apply(null, req.body)`.

The response looks like this:

```json
{
  "moduleName": "lodash",
  "functionName": "upperCase",
  "arguments": [
    "hello world"
  ],
  "result": "HELLO WORLD"
}
```
