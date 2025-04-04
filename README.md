This template is exclusively for frontend projects only and wont work for projects working with react

Installation Guide

ESLint with Airbnb JavaScript Style:

```
npx install-peerdeps --dev eslint-config-airbnb
```

Create an ESLint config file in the root of the project:

```
npx eslint --init
```

Install eslint-config-prettier to fix clashing between Airbnb js style and prettier:

```
Install eslint-config-prettier:
```

Install Babel

```
npm install -D babel-loader @babel/core @babel/preset-env webpack
```

install package to store api key:

```
npm install dotenv-webpack
```

settings.josn addon settngs for eslint
```
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "eslint.format.enable": true,
    "eslint.experimental.useFlatConfig": true,
    "eslint.run": "onSave",
    "editor.formatOnSave": true
```
