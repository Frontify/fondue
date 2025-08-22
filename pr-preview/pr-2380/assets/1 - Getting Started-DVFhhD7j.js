import{j as e}from"./jsx-runtime-BvcDW_wf.js";import{useMDXComponents as s}from"./index-evPkH1Wg.js";import"./index-diqPE6K5.js";import"./_commonjsHelpers-Cpj98o6Y.js";function t(o){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"getting-started",children:"Getting started"}),`
`,e.jsxs(n.p,{children:["Welcome to Fondue, the design system for the ",e.jsx(n.a,{href:"https://frontify.com",rel:"nofollow",children:"Frontify"})," ecosystem."]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.p,{children:"Add the Fondue design system package as a dependency to your project."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`npm i @frontify/fondue
# or
pnpm i @frontify/fondue
# or
yarn add @frontify/fondue
`})}),`
`,e.jsx(n.h2,{id:"finding-components",children:"Finding components"}),`
`,e.jsxs(n.p,{children:["You can browse all available components in the Storybook instance of the ",e.jsx(n.a,{href:"https://fondue-components.frontify.com",rel:"nofollow",children:"Fondue design system"}),`.
This Storybook contains all components from all subpackages in the Fondue monorepo. Each component will have a badge in the top bar indicating its current lifecycle state.`]}),`
`,e.jsxs(n.p,{children:["For the designers, the documentation is available in the ",e.jsx(n.a,{href:"https://weare.frontify.com/document/1266?#/using-fondue",rel:"nofollow",children:"Fondue design system documentation"})," on weare."]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.p,{children:"During the transition period in which we are cleaning up the Fondue components, you can use old and new components side by side."}),`
`,e.jsx(n.h3,{id:"was-this-component-already-refactored",children:"Was this component already refactored?"}),`
`,e.jsxs(n.p,{children:["If a component was refactored, the old implementation will be marked as ",e.jsx(n.strong,{children:"deprecated"}),"."]}),`
`,e.jsx(n.p,{children:"This will be visible in the code when you consume the component and through a badge in the top bar of the Storybook story."}),`
`,e.jsx(n.h3,{id:"using-refactored-components",children:"Using refactored components"}),`
`,e.jsxs(n.p,{children:["If you want to use a refactored component, you can already import them through the ",e.jsx(n.code,{children:"/components"})," subexport in the fondue package."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Button } from '@frontify/fondue/components';

const App = () => <Button>Click Me</Button>;
`})}),`
`,e.jsx(n.h3,{id:"using-old-components",children:"Using old components"}),`
`,e.jsxs(n.p,{children:["If you are using the old components, you can continue to import them directly from the ",e.jsx(n.code,{children:"@frontify/fondue"})," package."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Button } from '@frontify/fondue';

const App = () => <Button>Click Me</Button>;
`})}),`
`,e.jsx(n.h3,{id:"styles",children:"Styles"}),`
`,e.jsxs(n.h4,{id:"tokens--themes-new-in-v124",children:["Tokens / Themes [new in ",e.jsx(n.code,{children:"v12.4"}),"]"]}),`
`,e.jsx(n.p,{children:"We utilize a theme provider to provide the correct tokens to the components."}),`
`,e.jsxs(n.p,{children:["To use the provider, you need to import the theme styles and wrap your application in the ",e.jsx(n.code,{children:"ThemeProvider"}),` component.
The `,e.jsx(n.code,{children:"ThemeProvider"})," will provide the correct tokens to the components based on the theme you provide. The currently available themes are ",e.jsx(n.code,{children:"light"})," and ",e.jsx(n.code,{children:"dark"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import "@frontify/fondue/tokens/themes";
import { ThemeProvider } "@frontify/fondue/components";

const App = () => (
    <ThemeProvider theme="light">
        ...YourApp
    </ThemeProvider>
);
`})}),`
`,e.jsx(n.h4,{id:"component-styles",children:"Component Styles"}),`
`,e.jsx(n.p,{children:"The component styles are imported separately from the component itself. This allows you to import the styles only once in your application, instead of importing them with every usage."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// chart styles
import '@frontify/fondue/charts/styles';

// component styles
import '@frontify/fondue/components/styles';

// legacy component styles
import '@frontify/fondue/styles';
`})}),`
`,e.jsxs(n.p,{children:["Usages of ",e.jsx(n.code,{children:"ThemeProvider"})," can be nested to specify a theme for a specific set of components, the closest provider will be used."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<ThemeProvider theme="light">
    <ComponentUsingLightTheme />
    <ThemeProvider theme="dark">
        <ComponentUsingDarkTheme />
    </ThemeProvider>
</ThemeProvider>
`})}),`
`,e.jsx(n.h2,{id:"contributing",children:"Contributing"}),`
`,e.jsxs(n.p,{children:["See ",e.jsx(n.a,{href:"CONTRIBUTING.md",children:"Contribution guidelines"})," for contributing and local development help."]}),`
`,e.jsx(n.h2,{id:"important-links",children:"Important links"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://fondue-components.frontify.com",rel:"nofollow",children:"Storybook"})," – Storybook for previewing Fondue components"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://weare.frontify.com/document/1266?#/using-fondue",rel:"nofollow",children:"Fondue documentation"})," – Documentation for the Fondue design system"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://tailwindcss.com/docs",rel:"nofollow",children:"Tailwind"})," – Utility-first CSS framework used in fondue"]}),`
`]})]})}function l(o={}){const{wrapper:n}={...s(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{l as default};
