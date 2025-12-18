# How to contribute

## Running Fondue locally

1. Clone the Git repository
2. Install the dependencies
3. Run Storybook
4. Implement your changes
5. Profit!

> Fondue uses `pnpm` to manage the dependencies. If you don't have it installed in your local, please refer to [their installation guide](https://pnpm.io/installation).

```shell
$ git clone git@github.com:Frontify/fondue.git
$ pnpm i
$ pnpm build # needs to be ran before starting storybook
```

Run `pnpm storybook` to start the storybook development server.

Storybook will be available on [http://localhost:6010](http://localhost:6010).
This Storybook instance is configured and served from the `/storybook-docs` package which is used to proxy and compose all other Storybook instances in the monorepo.

In the background, multiple instances of Storybook will start up, one for each component package in the monorepo.

- Storybook for `@frontify/fondue-tokens` will be available on port 6005
- Storybook for `@frontify/fondue-components` will be available on port 6006
- Storybook for `@frontify/fondue-icons` will be available on port 6007
- Storybook for `@frontify/fondue-charts` will be available on port 6008
- Storybook for `@frontify/fondue-rte` will be available on port 6011
- Storybook for `@frontify/fondue` will be available on port 6009

You can also start the Storybook instances for the individual packages by running `pnpm storybook` in the respective package directory.

## Create a new component

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

The name of the branch is not really relevant. Nonetheless we usually go for a prefix following conventional commits, slash as a separator and a short description of what the branch will change in kebab-case.

### Create component files

Theres a nifty script that creates the files you'll need:

```shell
pnpm create:component FancyComponent
```

This will add a folder inside `src/components` with the name `FancyComponent` containing:

- `FancyComponent.tsx` - Your React component 🧙‍♀️
- `FancyComponent.spec.ts` - Unit tests 🔬
- `FancyComponent.ct.tsx` - Visual/component tests with Playwright 🎭
- `FancyComponent.stories.tsx` - Storybook stories 📄
- `styles/fancy-component.module.scss` - SCSS module for styling 🎨

**Styling approach**: Components use SCSS modules with data attributes for variants (e.g., `data-size="large"`). See existing components like Button or Label for examples.

## Building packages

The packages in the monorepo are built independently.
To build the packages, run `pnpm build` in the respective package directory.

Alternatively you can run the following scripts in the root directory.

- `pnpm build:components`
- `pnpm build:fondue`
- `pnpm build:icons`
- `pnpm build:charts`

## Releasing packages

We utilize [changesets](https://github.com/changesets/changesets) to manage our releases.

To bump the version of a package, run `pnpm changeset` in the root directory and follow the prompts to select your package and version bump.

When creating your changeset, please prefix the description with "When creating your changeset, please prefix the description with one of the following:

- `feat:` for a new feature
- `fix:` for a bug fix
- `chore:` for changes to the build process or auxiliary tools and libraries such as documentation generation
- `docs:` for documentation only changes
- `build:` for changes that affect the build system or external dependencies
- `refactor:` for a code change that neither fixes a bug nor adds a feature
- `perf:` for a code change that improves performance
- `test:` for adding missing tests or correcting existing tests
- `ci:` for changes to our CI configuration files and scripts

These prefixes help to quickly identify the type of changes included in the release. The description should be easily readable and understandable. Clear and concise descriptions help others to understand the changes you've made and their impact on the project.

A file containg your release notes will be created in the `.changeset` directory.

After your change is merged to the `main` branch, the change will automatically be added to a release PR.
Once we merge the release PR, the package will be published to npm.
