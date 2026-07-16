# Setup

Welcome to Fondue, the design system for the [Frontify](https://frontify.com) ecosystem.

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

Import the base tokens and the default theme styles at the root of your application.

```tsx
import '@frontify/fondue/tokens/base';

export const App = () => {
    return <div>{/* Your application */}</div>;
};
```

#### Importing component styles

The component styles are imported separately from the component itself. This allows you to import the styles only once in your application, instead of importing them with every usage.

```tsx
// chart styles
import '@frontify/fondue/charts/styles';

// component styles
import '@frontify/fondue/components/styles';

// legacy component styles
import '@frontify/fondue/styles';

// rte styles
import '@frontify/fondue/rte/styles';
```

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

```css
@font-face {
    font-family: Geist;
    src: url(YOUR_FONT_URL) format('truetype');
    font-weight: normal;
    font-style: normal;
}
```

#### Configuring tailwind (optional)

If you are using Tailwind, you can use the Fondue configuration preset for tailwind.
The configuration preset will configure Tailwind to provide custom classes for every token in the Fondue design system.

```tsx
import frontifyTailwindConfig from '@frontify/fondue/tokens/tailwind';

export default {
    presets: [frontifyTailwindConfig],
    content: [
        //your content config
    ],
};
```

#### Using themes (optional)

We utilize a provider component to allow for theming and providing the correct tokens to the components.

To use the provider, in addition to the base tokens, you need to wrap your application in the `ThemeProvider` component.
The `ThemeProvider` will provide the correct tokens to the components based on the theme you provide. The currently available themes are `light` and `dark`.

```tsx
import "@frontify/fondue/tokens/base";
import { ThemeProvider } "@frontify/fondue/components";

const App = () => (
    <ThemeProvider theme="light">
        ...YourApp
    </ThemeProvider>
);
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

## Important links

- [Storybook](https://fondue-components.frontify.com) – Storybook for previewing Fondue components
- [Fondue documentation](https://weare.frontify.com/document/1266?#/using-fondue) – Documentation for the Fondue design system
- [Tailwind](https://tailwindcss.com/docs) – Utility-first CSS framework used in Fondue
