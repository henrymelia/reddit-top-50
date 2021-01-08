<h1 align="center">
  <a href="https://github.com/henrymelia/reddit-top-50">
    <img src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
    width="150" alt="Reddit logo">
  </a>
  <br>
  Reddit Top 50
</h1>

## Local environment setup

### Requirements

Install the latest Yarn version for your OS from https://classic.yarnpkg.com/en/docs/install/.

### Clone this repository

Running the following command:
```bash
git clone git@github.com:henrymelia/reddit-top-50.git
```

### Install the project dependencies

Being in the project root directory, just run:
```bash
yarn install
```

### Run it

Again, being in the project root directory, run:
```bash
yarn dev
```
This Yarn task will build the app in development mode and serve it. A link will be provided by the script output.

## Yarn tasks

The following is a list of the available tasks with a brief description for each of them:

- `yarn build` to build the app for production.
- `yarn dev` to build the app in development mode and run the local server.
- `yarn lint` lint the code and report the issues found.
- `yarn test` run unit tests.
- `yarn test:coverage` generate the unit tests coverage report.
- `yarn test:watch` run unit tests in watch mode.

## Architecture details

I've picked **Parcel** as the project bundler for the sake of simplicity and because it seemed to be enough for this small project. **ESLint** has been integrated and configured to use **Airbnb's** configuration as a base, while **Prettier** is used for code formatting. Regarding code transpilation, **Babel** is using the `@babel/preset-env` preset in order to transform the syntax and include the required polyfills for the browsers targetted by the **browserlist** configuration in the project's `package.json` file.
