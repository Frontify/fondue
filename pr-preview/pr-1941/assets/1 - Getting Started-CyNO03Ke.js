import{j as n}from"./jsx-runtime-Nms4Y4qS.js";import{useMDXComponents as i}from"./index-DlpNa54Y.js";import"./index-BwDkhjyp.js";import"./_commonjsHelpers-BosuxZz1.js";function t(o){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"getting-started",children:"Getting started"}),`
`,n.jsxs(e.p,{children:["Welcome to Fondue, the design system for the ",n.jsx(e.a,{href:"https://frontify.com",rel:"nofollow",children:"Frontify"})," ecosystem."]}),`
`,n.jsx(e.h2,{id:"installation",children:"Installation"}),`
`,n.jsx(e.p,{children:"Add the Fondue design system package as a dependency to your project."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-shell",children:`npm i @frontify/fondue
# or
pnpm i @frontify/fondue
# or
yarn add @frontify/fondue
`})}),`
`,n.jsx(e.h2,{id:"finding-components",children:"Finding components"}),`
`,n.jsxs(e.p,{children:["You can browse all available components in the Storybook instance of the ",n.jsx(e.a,{href:"https://fondue-components.frontify.com",rel:"nofollow",children:"Fondue design system"}),`.
This Storybook contains all components from all subpackages in the Fondue monorepo. Each component will have a badge in the top bar indicating its current lifecycle state.`]}),`
`,n.jsxs(e.p,{children:["For the designers, the documentation is available in the ",n.jsx(e.a,{href:"https://weare.frontify.com/document/1266?#/using-fondue",rel:"nofollow",children:"Fondue design system documentation"})," on weare."]}),`
`,n.jsx(e.h2,{id:"usage",children:"Usage"}),`
`,n.jsx(e.p,{children:"During the transition period in which we are cleaning up the Fondue components, you can use old and new components side by side."}),`
`,n.jsx(e.h3,{id:"was-this-component-already-refactored",children:"Was this component already refactored?"}),`
`,n.jsxs(e.p,{children:["If a component was refactored, the old implementation will be marked as ",n.jsx(e.strong,{children:"deprecated"}),"."]}),`
`,n.jsx(e.p,{children:"This will be visible in the code when you consume the component and through a badge in the top bar of the Storybook story."}),`
`,n.jsx(e.h3,{id:"using-refactored-components",children:"Using refactored components"}),`
`,n.jsxs(e.p,{children:["If you want to use a refactored component, you can already import them through the ",n.jsx(e.code,{children:"/components"})," subexport in the fondue package."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Button } from '@frontify/fondue/components';

const App = () => <Button>Click Me</Button>;
`})}),`
`,n.jsx(e.h3,{id:"using-old-components",children:"Using old components"}),`
`,n.jsxs(e.p,{children:["If you are using the old components, you can continue to import them directly from the ",n.jsx(e.code,{children:"@frontify/fondue"})," package."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Button } from '@frontify/fondue';

const App = () => <Button>Click Me</Button>;
`})}),`
`,n.jsx(e.h2,{id:"contributing",children:"Contributing"}),`
`,n.jsxs(e.p,{children:["See ",n.jsx(e.a,{href:"CONTRIBUTING.md",children:"Contribution guidelines"})," for contributing and local development help."]}),`
`,n.jsx(e.h2,{id:"important-links",children:"Important links"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"https://fondue-components.frontify.com",rel:"nofollow",children:"Storybook"})," – Storybook for previewing Fondue components"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"https://weare.frontify.com/document/1266?#/using-fondue",rel:"nofollow",children:"Fondue documentation"})," – Documentation for the Fondue design system"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"https://tailwindcss.com/docs",rel:"nofollow",children:"Tailwind"})," – Utility-first CSS framework used in fondue"]}),`
`]})]})}function l(o={}){const{wrapper:e}={...i(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(t,{...o})}):t(o)}export{l as default};
