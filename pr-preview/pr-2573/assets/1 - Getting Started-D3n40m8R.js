import{j as e}from"./jsx-runtime-BkgB3KfT.js";import{useMDXComponents as i}from"./index-CMFfYBGN.js";import"./iframe-BTlgKVoU.js";import"./preload-helper-C1FmrZbK.js";function t(o){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"getting-started",children:"Getting started"}),`
`,e.jsxs(n.p,{children:["Welcome to Fondue, the design system for the ",e.jsx(n.a,{href:"https://frontify.com",rel:"nofollow",children:"Frontify"})," ecosystem."]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.p,{children:"Add the Fondue design system package as a dependency to your project."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`npm i @frontify/fondue
# or
pnpm add @frontify/fondue
# or
yarn add @frontify/fondue
`})}),`
`,e.jsx(n.h2,{id:"finding-components",children:"Finding components"}),`
`,e.jsxs(n.p,{children:["You can browse all available components in the Storybook instance of the ",e.jsx(n.a,{href:"https://fondue-components.frontify.com",rel:"nofollow",children:"Fondue design system"}),`.
This Storybook contains all components from all subpackages in the Fondue monorepo. Each component will have a badge in the top bar indicating its current lifecycle state.`]}),`
`,e.jsxs(n.p,{children:["For the designers, the documentation is available in the ",e.jsx(n.a,{href:"https://weare.frontify.com/document/1266?#/using-fondue",rel:"nofollow",children:"Fondue design system documentation"})," on Weare."]}),`
`,e.jsx(n.h2,{id:"setup",children:"Setup"}),`
`,e.jsx(n.h4,{id:"importing-style-tokens",children:"Importing style tokens"}),`
`,e.jsx(n.p,{children:"Import the base tokens and the default theme styles at the root of your application."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import "@frontify/fondue/tokens/base";

export const App = () => {
    return (
        <div>
            {/* Your application */}
        </div>
    );
};
`})}),`
`,e.jsx(n.h4,{id:"importing-component-styles",children:"Importing component styles"}),`
`,e.jsx(n.p,{children:"The component styles are imported separately from the component itself. This allows you to import the styles only once in your application, instead of importing them with every usage."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// chart styles
import '@frontify/fondue/charts/styles';

// component styles
import '@frontify/fondue/components/styles';

// legacy component styles
import '@frontify/fondue/styles';

// rte styles
import '@frontify/fondue/rte/styles';
`})}),`
`,e.jsx(n.h4,{id:"font-family",children:"Font Family"}),`
`,e.jsx(n.p,{children:"Due to licensing restrictions, we cannot provide the fonts in the package. You therefore need to define the font faces in your application."}),`
`,e.jsxs(n.p,{children:["The primary font used is ",e.jsx(n.code,{children:"Diatype"}),". To use it in your application, you need to define the font face in your application."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`@font-face {
    font-family: Diatype;
    font-weight: 1 999;
    src: url(YOUR_FONT_URL) format('woff');
}

/* If you work for Frontify and need access to Diatype, reach out to the frontend platform team */
`})}),`
`,e.jsxs(n.p,{children:["For cases where developers do not have access to Diatype, the tokens specify a fallback font ",e.jsx(n.code,{children:"Geist"}),`.
You can download the font from the Geist `,e.jsx(n.a,{href:"https://github.com/vercel/geist-font/releases",rel:"nofollow",children:"GitHub repository"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`@font-face {
    font-family: Geist;
    src: url(YOUR_FONT_URL) format('truetype');
    font-weight: normal;
    font-style: normal;
}
`})}),`
`,e.jsx(n.h4,{id:"configuring-tailwind-optional",children:"Configuring tailwind (optional)"}),`
`,e.jsx(n.p,{children:`If you are using Tailwind, you can use the Fondue configuration preset for tailwind.
The configuration preset will configure Tailwind to provide custom classes for every token in the Fondue design system.`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import frontifyTailwindConfig from '@frontify/fondue/tokens/tailwind';

export default {
    presets: [frontifyTailwindConfig],
    content: [
        //your content config
    ],
};

`})}),`
`,e.jsx(n.h4,{id:"using-themes-optional",children:"Using themes (optional)"}),`
`,e.jsx(n.p,{children:"We utilize a provider component to allow for theming and providing the correct tokens to the components."}),`
`,e.jsxs(n.p,{children:["To use the provider, in addition to the base tokens, you need to wrap your application in the ",e.jsx(n.code,{children:"ThemeProvider"}),` component.
The `,e.jsx(n.code,{children:"ThemeProvider"})," will provide the correct tokens to the components based on the theme you provide. The currently available themes are ",e.jsx(n.code,{children:"light"})," and ",e.jsx(n.code,{children:"dark"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import "@frontify/fondue/tokens/base";
import { ThemeProvider } "@frontify/fondue/components";

const App = () => (
    <ThemeProvider theme="light">
        ...YourApp
    </ThemeProvider>
);
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"ThemeProvider"})," supports nesting to specify a theme for a specific set of components, the closest provider will be used."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<ThemeProvider theme="light">
    <ComponentUsingLightTheme />
    <ThemeProvider theme="dark">
        <ComponentUsingDarkTheme />
    </ThemeProvider>
</ThemeProvider>
`})}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.h3,{id:"components",children:"Components"}),`
`,e.jsxs(n.p,{children:["If you want to use a component, you can import them through the ",e.jsx(n.code,{children:"@frontify/fondue/components"})," subpackage from Fondue."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Button } from '@frontify/fondue/components';

const App = () => <Button>Click Me</Button>;
`})}),`
`,e.jsx(n.h4,{id:"legacy-components",children:"Legacy components"}),`
`,e.jsxs(n.p,{children:["If you need to use a legacy component (indicated by a [legacy] badge in the Storybook top bar), you can continue to import them directly from the ",e.jsx(n.code,{children:"@frontify/fondue"})," package."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Button } from '@frontify/fondue';

const App = () => <Button>Click Me</Button>;
`})}),`
`,e.jsx(n.h3,{id:"style-tokens",children:"Style tokens"}),`
`,e.jsxs(n.p,{children:["Explore the available tokens in ",e.jsx(n.a,{href:"/story/current_tokens",children:"Storybook"})]}),`
`,e.jsx(n.h4,{id:"using-tailwind-classes",children:"Using tailwind classes"}),`
`,e.jsx(n.p,{children:"When using tailwind, all tokens are available as classes."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<div className="tw-bg-primary-default tw-text-primary-on-primary">
    ...
</div>
`})}),`
`,e.jsx(n.h4,{id:"using-css-variables",children:"Using CSS variables"}),`
`,e.jsxs(n.p,{children:["All style tokens are available as css variables. When using the ",e.jsx(n.code,{children:"ThemeProvider"}),", the tokens will be provided to the components based on the theme you provide."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.my-element {
    background-color: var(--color-primary-default);
    color: var(--color-primary-on-primary);
}
`})}),`
`,e.jsx(n.h3,{id:"utilities",children:"Utilities"}),`
`,e.jsxs(n.p,{children:["Explore the available utilities in ",e.jsx(n.a,{href:"/story/current_utilities",children:"Storybook"})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"When using tailwind"}),`, we provide a set of utilities to help style your components.
Currently, we provide utilities for typography styles. Each utility combines definitions for `,e.jsx(n.code,{children:"font-size"}),", ",e.jsx(n.code,{children:"line-height"}),", ",e.jsx(n.code,{children:"font-weight"}),", ",e.jsx(n.code,{children:"letter-spacing"})," and ",e.jsx(n.code,{children:"letter-casing"}),"."]}),`
`,e.jsx(n.p,{children:"Use with caution, as these utilities are purely for styling purposes and do not affect the semantic meaning of the text."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<span className="tw-body-large-strong">
    ...
</span>
<span className="tw-heading-xx-large-strong">
    ...
</span>
`})}),`
`,e.jsx(n.h2,{id:"contributing",children:"Contributing"}),`
`,e.jsxs(n.p,{children:["See ",e.jsx(n.a,{href:"CONTRIBUTING.md",children:"Contribution guidelines"})," for contributing and local development help."]}),`
`,e.jsx(n.h2,{id:"important-links",children:"Important links"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://fondue-components.frontify.com",rel:"nofollow",children:"Storybook"})," – Storybook for previewing Fondue components"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://weare.frontify.com/document/1266?#/using-fondue",rel:"nofollow",children:"Fondue documentation"})," – Documentation for the Fondue design system"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://tailwindcss.com/docs",rel:"nofollow",children:"Tailwind"})," – Utility-first CSS framework used in Fondue"]}),`
`]})]})}function c(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{c as default};
