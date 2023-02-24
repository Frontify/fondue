# How to contribute

## Running Fondue Locally

1. Clone the Git repository
2. Install the dependencies with
3. Run Storybook
4. ???
5. Profit!

> Fondue uses `pnpm` to manage the dependencies. If you don't have it installed in your local, please refer to [their installation guide](https://pnpm.io/installation).

```shell
$ git clone git@github.com:Frontify/fondue.git
$ pnpm i
$ pnpm storybook
$ echo "YAY ✨"
```

## Create a new Component

When adding a new component to Fondue this is the flow that is applied.

1. Create new branch
2. Create component files, write tests, write stories & fiddle with React
3. Open PR
4. Squash

### Create new branch

Create a new branch for your additions

```
git checkout -b feat/add-cool-cats-and-kittens
```

The name of the branch is not really relevant. Nonetheless we usually go for a prefix following Conventional Commits, slash as a separator and a short description of what the branch will change in kebab-case.

### Create Component Files

Theres a nifty script that creates that files you'll need:

```
pnpm component:create CoolCatsAndKittens
```

This will add a folder inside `src/components` with the name `CoolCatsAndKittens` and three files:

-   `CoolCatsAndKittens.tsx` which is where your React magic happens 🧙‍♀️
-   `CoolCatsAndKittens.spec.tsx` is the place to write your tests 🔬
-   `CoolCatsAndKittens.stories.tsx` is for your Stories inside Storybook 📄

## Opening a PR

Once you're happy with your new component, it's time to open a new PR. Push your branch to GitHub as a start:

```
git push -u origin feat/cool-cats-and-kittens
```

and click the link provided by the git CLI.

### Naming your PR

The Pull Requests basically follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

The name of your PR should be:

```
<type>[optional scope]: <description>
```

Following the example from above, it would look like this:

```
feat: Add CoolCatsAndKittens Component
```

Breaking Changes can be declared with a exclamation mark (!) after the type.

### GitHub Actions

-   GitHub automatically deploys Storybook with your new changes to Netlify and adds a Preview link to the PR.
-   SonarCloud checks the code base for its quality.
-   Cypress tests are run to make sure, you're not breaking anything.

### Merge Pull Request

Make sure you choose "Squash and merge" when merging the PR into the `main` branch.
You can find more about that [here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges).
