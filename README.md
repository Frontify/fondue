# Frontify React Components

<a href="https://github.com/Frontify/react-components/actions/workflows/continuous-integration.yml">
    <img src="https://github.com/Frontify/react-components/actions/workflows/continuous-integration.yml/badge.svg" alt="CI Status" />
</a>
<a href="https://snyk.io/test/github/Frontify/react-components">
    <img src="https://snyk.io/test/github/Frontify/react-components/badge.svg" alt="Known Vulnerabilities" />
</a>
<a href="https://github.com/Frontify/arcade/blob/main/README.md" title="latest">
    <img alt="latest" src="https://img.shields.io/npm/v/@frontify/arcade/latest.svg" />
</a>

---

# Updating Arcade

## Tagging a new release

Before we can use an updated version of Arcade in our main project, we need to tag a new release of the package.

### Locally

Set your working directory to the `main` branch:

```bash
git checkout main
```

Then pull the latest changes:

```bash
git pull
```

Next, we need to update the package version using [semantic versioning](https://semver.org/) (e.g. `npm version 0.4.1`).

Semantic versioning follows certain rules such as:

| Breaking changes | New features | Improvements or bugfixes |
| :--------------: | :----------: | :----------------------: |
|      Major       |   . Minor    |         . Patch          |

```bash
npm version <major|minor|patch>
```

Then push to GitHub along with the tags:

```bash
git push && git push --tags
```

### GitHub

Now that we've tagged a new version, we can head to GitHub and navigate to the **releases** page.

-   Create a new draft by clicking on the **Draft a new release** button
-   In the **Choose a tag** dropdown, select the version you've just tagged and pushed to GitHub
-   In the title input, enter a tag name that matches the one you pushed (e.g. v0.4.1)
-   Select the _main_ branch as the **target**
-   Write down the changelog for the release in the textarea using the following template:

```text
# Breaking changes
- ...
- ...

# New features
- ...
- ...

# Improvements
- ...
- ...

# Bugfixes
- ...
- ...
```

-   Click on **Save draft** to save a draft to publish it later or **Publish release** to publish it immediately
