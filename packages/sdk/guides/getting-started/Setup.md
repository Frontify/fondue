# Setup

Welcome to Fondue, the design system for the [Frontify](https://frontify.com) ecosystem.

## Requirements

- **React 18.** `@frontify/fondue` declares `react@^18` and `react-dom@^18` as peer dependencies. React 19 is not supported yet. Some project templates (e.g. `npm create vite@latest -- --template react-ts`) scaffold React 19, so pin React 18 before installing Fondue:

    ```shell
    npm i react@^18 react-dom@^18
    npm i -D @types/react@^18 @types/react-dom@^18
    ```

- **Tailwind CSS v3 (optional).** The Fondue Tailwind preset targets Tailwind `^3.4.17`. Tailwind v4 is not supported: it changes how presets and prefixes are configured, so the `tw-` classes used throughout these guides won't be generated.

## Installation

Add the Fondue design system package as a dependency to your project.

```shell
npm i @frontify/fondue
# or
pnpm add @frontify/fondue
# or
yarn add @frontify/fondue
```

#### Importing style tokens

Import the base tokens at the root of your application. They define every token as a CSS variable on `:root`, with the values of the `light` theme.

```tsx
import '@frontify/fondue/tokens/base';

export const App = () => {
    return <div>{/* Your application */}</div>;
};
```

#### Importing component styles

The component styles are imported separately from the component itself. This allows you to import the styles only once in your application, instead of importing them with every usage. Import only the stylesheets for the entry points you use:

| Stylesheet                           | Import it when you use…                                     | Includes Tailwind preflight |
| ------------------------------------ | ----------------------------------------------------------- | --------------------------- |
| `@frontify/fondue/components/styles` | components from `@frontify/fondue/components` (most apps)   | No                          |
| `@frontify/fondue/charts/styles`     | charts from `@frontify/fondue/charts`                       | No                          |
| `@frontify/fondue/rte/styles`        | the rich text editor from `@frontify/fondue/rte`            | Yes                         |
| `@frontify/fondue/styles`            | legacy components imported directly from `@frontify/fondue` | Yes                         |

```tsx
// component styles
import '@frontify/fondue/components/styles';

// chart styles
import '@frontify/fondue/charts/styles';

// rte styles
import '@frontify/fondue/rte/styles';

// legacy component styles
import '@frontify/fondue/styles';
```

The legacy and rich text editor stylesheets ship their own copy of Tailwind's preflight (a global CSS reset for `body`, headings, buttons, …). Importing them resets base element styles even if your app doesn't use Tailwind itself. If your app also uses Tailwind with `@tailwind base`, the same reset is applied twice, which is harmless.

#### Font Family

Due to licensing restrictions, we cannot provide the fonts in the package. You therefore need to define the font faces in your application.

The fonts used are `Diatype` and `Cranny`. To use it in your application, you need to define the font face in your application.

```css
@font-face {
    font-family: Diatype;
    font-weight: 1 999;
    src: url(YOUR_FONT_URL) format('woff');
}

@font-face {
    font-family: Cranny;
    font-weight: 1 999;
    src: url(YOUR_FONT_URL) format('woff');
}

/* If you work for Frontify and need access to Diatype or Cranny, reach out to the frontend platform team */
```

For cases where developers do not have access to Diatype or Cranny, the tokens specify a fallback font `Geist`.
You can download the font from the Geist [GitHub repository](https://github.com/vercel/geist-font/releases).

The tokens use the weights 300 (light), 400 (regular), 500 (medium) and 700 (bold). Use the variable font (`Geist[wght].woff2` in the release archive) and declare its full weight range, otherwise the browser falls back to a single weight and synthesizes bold.

```css
@font-face {
    font-family: Geist;
    src: url(YOUR_FONT_URL) format('woff2');
    font-weight: 100 900;
    font-style: normal;
}
```

#### Configuring tailwind (optional)

If you are using Tailwind, you can use the Fondue configuration preset for tailwind.
The configuration preset will configure Tailwind to provide custom classes for every token in the Fondue design system.

The preset requires **Tailwind v3** (see [Requirements](#requirements)). Install Tailwind and its PostCSS plugins:

```shell
npm i -D tailwindcss@^3.4.17 postcss autoprefixer
```

Configure Tailwind with the Fondue preset. The preset does not set a class prefix. All Fondue documentation and examples use the `tw-` prefix, so set it explicitly:

```js
// tailwind.config.js
import frontifyTailwindConfig from '@frontify/fondue/tokens/tailwind';

export default {
    prefix: 'tw-',
    presets: [frontifyTailwindConfig],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
};
```

Register Tailwind as a PostCSS plugin. Vite picks up this file automatically:

```js
// postcss.config.js
export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};
```

Add the Tailwind directives to your main stylesheet and import it at the root of your application, after the Fondue stylesheets:

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```tsx
import '@frontify/fondue/tokens/base';
import '@frontify/fondue/components/styles';
import './index.css';
```

See the Styling guide (`usage/Styling`) for the classes the preset generates and which colours to use.

#### Using themes

We utilize a provider component to allow for theming and providing the correct tokens to the components.

The `ThemeProvider` is required: wrap your whole application (or at minimum every Fondue component) in it, in addition to importing the base tokens. Besides the theme, it provides the text direction (`dir`) and the locale used for built-in component strings, and it carries the theme over to portaled content such as dropdowns, tooltips and dialogs.

The available themes are `light` (default) and `dark`. The `theme` type also accepts `base`, which only defines the primitive colour palette and none of the semantic colours the components use, so don't pass it.

```tsx
import '@frontify/fondue/tokens/base';
import { ThemeProvider } from '@frontify/fondue/components';

const App = () => <ThemeProvider theme="light">...YourApp</ThemeProvider>;
```

The `ThemeProvider` supports nesting to specify a theme for a specific set of components, the closest provider will be used.

```tsx
<ThemeProvider theme="light">
    <ComponentUsingLightTheme />
    <ThemeProvider theme="dark">
        <ComponentUsingDarkTheme />
    </ThemeProvider>
</ThemeProvider>
```

#### Theming the page background

The `ThemeProvider` renders a `div` and applies the theme as a class on that element, not on `:root` or `<body>`. Two consequences:

- The theme's CSS variables only apply inside the provider. `<body>` keeps the `light` values from `@frontify/fondue/tokens/base`, so a `dark` theme does not reach it.
- Fondue does not set a background or text colour on the page. Content outside a Fondue component inherits the browser defaults (black serif text on a white background) unless you set them.

To paint the page in the theme's colours, use `asChild` so the provider merges its theme class onto your own root element instead of rendering an extra `div`, and set the surface colour, text colour and font family there:

```tsx
<ThemeProvider theme="dark" asChild>
    <div className="tw-min-h-screen tw-bg-surface tw-text-primary tw-font-primary">...YourApp</div>
</ThemeProvider>
```

Don't put layout classes like these on the provider's `className` prop: that class is propagated to every portaled overlay (dropdowns, tooltips, dialogs) so scoped styles still apply there.

## Important links

- [Storybook](https://fondue-components.frontify.com) – Storybook for previewing Fondue components
- [Fondue documentation](https://weare.frontify.com/document/1266?#/using-fondue) – Documentation for the Fondue design system
- [Tailwind](https://v3.tailwindcss.com/docs) – Utility-first CSS framework used in Fondue
