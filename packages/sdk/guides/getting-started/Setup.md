# Setup

Welcome to Fondue, the design system for the [Frontify](https://frontify.com) ecosystem.

Setting up Fondue takes six steps. Steps 1–5 are required; step 6 is only needed if you use Tailwind.

1. [Check the requirements](#1-check-the-requirements)
2. [Install Fondue](#2-install-fondue)
3. [Import tokens and styles](#3-import-tokens-and-styles)
4. [Add the fonts](#4-add-the-fonts)
5. [Wrap your app in the ThemeProvider](#5-wrap-your-app-in-the-themeprovider)
6. [Configure Tailwind (optional)](#6-configure-tailwind-optional)

## 1. Check the requirements

- **React 18.** `@frontify/fondue` declares `react@^18` and `react-dom@^18` as peer dependencies. React 19 is not supported yet. Some project templates (e.g. `npm create vite@latest -- --template react-ts`) scaffold React 19, so pin React 18 before installing Fondue:

```shell
npm i react@^18 react-dom@^18
npm i -D @types/react@^18 @types/react-dom@^18
```

- **Tailwind CSS v3 (optional).** The Fondue Tailwind preset targets Tailwind `^3.4.17`. Tailwind v4 is not supported: it changes how presets and prefixes are configured, so the `tw-` classes used throughout these guides won't be generated.

## 2. Install Fondue

```shell
npm i @frontify/fondue
# or
pnpm add @frontify/fondue
# or
yarn add @frontify/fondue
```

## 3. Import tokens and styles

Import the base tokens and the stylesheets once, at the root of your application. Components don't import their own styles.

```tsx
// main.tsx
import "@frontify/fondue/tokens/base";
import "@frontify/fondue/components/styles";
```

The base tokens define every token as a CSS variable on `:root`, with the values of the `light` theme.

Then add the stylesheet for each other entry point you use:

| Stylesheet                           | Import it when you use…                                     | Includes Tailwind preflight |
| ------------------------------------ | ----------------------------------------------------------- | --------------------------- |
| `@frontify/fondue/components/styles` | components from `@frontify/fondue/components` (most apps)   | No                          |
| `@frontify/fondue/charts/styles`     | charts from `@frontify/fondue/charts`                       | No                          |
| `@frontify/fondue/rte/styles`        | the rich text editor from `@frontify/fondue/rte`            | Yes                         |
| `@frontify/fondue/styles`            | legacy components imported directly from `@frontify/fondue` | Yes                         |

The legacy and rich text editor stylesheets ship their own copy of Tailwind's preflight (a global CSS reset for `body`, headings, buttons, …). Importing them resets base element styles even if your app doesn't use Tailwind itself. If your app also uses Tailwind with `@tailwind base`, the same reset is applied twice, which is harmless.

## 4. Add the fonts

Due to licensing restrictions, the fonts are not included in the package. Define the font faces in your application's CSS.

The tokens use `Diatype` and `Cranny`, and fall back to `Geist` when those aren't available.

**Diatype and Cranny** (if you have a license):

```css
@font-face {
    font-family: Diatype;
    font-weight: 1 999;
    src: url(YOUR_FONT_URL) format("woff");
}

@font-face {
    font-family: Cranny;
    font-weight: 1 999;
    src: url(YOUR_FONT_URL) format("woff");
}

/* If you work for Frontify and need access to Diatype or Cranny, reach out to the frontend platform team */
```

**Geist** (everyone else): download it from the Geist [GitHub repository](https://github.com/vercel/geist-font/releases). The tokens use the weights 300 (light), 400 (regular), 500 (medium) and 700 (bold). Use the variable font (`Geist[wght].woff2` in the release archive) and declare its full weight range, otherwise the browser falls back to a single weight and synthesizes bold.

```css
@font-face {
    font-family: Geist;
    src: url(YOUR_FONT_URL) format("woff2");
    font-weight: 100 900;
    font-style: normal;
}
```

## 5. Wrap your app in the ThemeProvider

The `ThemeProvider` is required: wrap your whole application (or at minimum every Fondue component) in it. Besides the theme, it provides the text direction (`dir`) and the locale used for built-in component strings, and it carries the theme over to portaled content such as dropdowns, tooltips and dialogs.

```tsx
import { ThemeProvider } from "@frontify/fondue/components";

const App = () => <ThemeProvider theme="light">...YourApp</ThemeProvider>;
```

The available themes are `light` (default) and `dark`.

### Theme the page

The `ThemeProvider` renders a `div` and applies the theme as a class on that element, not on `:root` or `<body>`. Two consequences:

- The theme's CSS variables only apply inside the provider. `<body>` keeps the `light` values from `@frontify/fondue/tokens/base`, so a `dark` theme does not reach it.
- Fondue does not set a background or text colour on the page. Content outside a Fondue component inherits the browser defaults (black serif text on a white background) unless you set them.

To paint the page in the theme's colours, use `asChild` so the provider merges its theme class onto your own root element instead of rendering an extra `div`, and set the surface colour, text colour and font family there:

```tsx
<ThemeProvider theme="dark" asChild>
    <div className="app-root">...YourApp</div>
</ThemeProvider>
```

```css
.app-root {
    min-height: 100vh;
    background-color: var(--color-surface-default);
    color: var(--color-primary-default);
    font-family: var(--typography-font-family-primary);
}
```

With Tailwind (step 6) the same is `className="tw-min-h-screen tw-bg-surface tw-text-primary tw-font-primary"`.

Don't put layout classes like these on the provider's `className` prop: that class is propagated to every portaled overlay (dropdowns, tooltips, dialogs) so scoped styles still apply there.

### Nest themes

The closest provider wins, so you can give part of the page a different theme:

```tsx
<ThemeProvider theme="light">
    <ComponentUsingLightTheme />
    <ThemeProvider theme="dark">
        <ComponentUsingDarkTheme />
    </ThemeProvider>
</ThemeProvider>
```

## 6. Configure Tailwind (optional)

If you use Tailwind, the Fondue preset generates a class for every token in the design system. It requires **Tailwind v3** (see [requirements](#1-check-the-requirements)).

1. Install Tailwind and its PostCSS plugins:

```shell
npm i -D tailwindcss@^3.4.17 postcss autoprefixer
```

2. Add the Fondue preset. The preset does not set a class prefix. All Fondue documentation and examples use the `tw-` prefix, so set it explicitly:

```js
// tailwind.config.js
import frontifyTailwindConfig from "@frontify/fondue/tokens/tailwind";

export default {
    prefix: "tw-",
    presets: [frontifyTailwindConfig],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
};
```

3. Register Tailwind as a PostCSS plugin. Vite picks up this file automatically:

```js
// postcss.config.js
export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};
```

4. Add the Tailwind directives to your main stylesheet and import it after the Fondue stylesheets:

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```tsx
// main.tsx
import "@frontify/fondue/tokens/base";
import "@frontify/fondue/components/styles";
import "./index.css";
```

See the Styling guide (`usage/Styling`) for the classes the preset generates and which colours to use.

## Important links

- [Storybook](https://fondue-components.frontify.com) – Storybook for previewing Fondue components
- [Fondue documentation](https://weare.frontify.com/document/1266?#/using-fondue) – Documentation for the Fondue design system
- [Tailwind](https://v3.tailwindcss.com/docs) – Utility-first CSS framework used in Fondue
