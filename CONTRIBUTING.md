# How to contribute

## Running Fondue Locally

1. Clone the Git repository
2. Install the dependencies
3. Run Storybook
4. Implement your changes
5. Profit!

> Fondue uses `pnpm` to manage the dependencies. If you don't have it installed in your local, please refer to [their installation guide](https://pnpm.io/installation).

```shell
$ git clone git@github.com:Frontify/fondue.git
$ pnpm i
```

Run `pnpm storybook` to start the storybook development server.

Storybook will be available on [http://localhost:6010](http://localhost:6010).
This Storybook instance is configured and served from the `/storybook-docs` package which is caused to proxy and compose all other Storybook instances in the monorepo.

In the background, multiple instances of Storybook will start up, one for each component package in the monorepo.

-   Storybook for `@frontify/fondue-components` will be available on port 6006
-   Storybook for `@frontify/fondue` will be available on port 6008

You can also start the Storybook instances for the individual packages by running `pnpm storybook` in the respective package directory.

## Create a new Component

When adding a new component to Fondue this is the flow that is applied.

1. Create new branch
2. Create component files, write tests, write stories
3. Open PR
4. Squash

### Create new branch

Create a new branch for your additions

```shell
git checkout -b feat/add-fancy-component
```

The name of the branch is not really relevant. Nonetheless we usually go for a prefix following Conventional Commits, slash as a separator and a short description of what the branch will change in kebab-case.

### Create Component Files

Theres a nifty script that creates that files you'll need:

```shell
pnpm component:create FancyComponent
```

This will add a folder inside `src/components` with the name `CoolCatsAndKittens` and three files:

-   `CoolCatsAndKittens.tsx` which is where your React magic happens 🧙‍♀️
-   `CoolCatsAndKittens.spec.tsx` is the place to write your tests 🔬
-   `CoolCatsAndKittens.stories.tsx` is for your Stories inside Storybook 📄

## Building Packages

The Packages in the Monorepo are built independently.
To build the packages, run `pnpm build` in the respective package directory.

Alternatively you can run the following scripts in the root directory.

-   `pnpm build:components`
-   `pnpm build:fondue`
-   `pnpm build:icons`
-   `pnpm build:charts`

## Releasing Packages

We utilize [Changesets](https://github.com/changesets/changesets) to manage our releases.

To bump the version of a Package, run `pnpm release` in the root directory and follow the prompts to select your package and version bump.
A file containg your release notes will be created in the `.changeset` directory.

After your change is merged to the `main` branch, the change will automatically be added to a release PR.
Once we merge the release PR, the package will be published to NPM.
