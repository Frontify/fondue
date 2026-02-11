import{j as e}from"./jsx-runtime-C-JUsR95.js";import{useMDXComponents as s}from"./index-ByrlQXZh.js";import"./iframe-BcVR8L5z.js";import"./preload-helper-C1FmrZbK.js";function i(o){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"how-to-contribute",children:"How to contribute"}),`
`,e.jsx(n.h2,{id:"running-fondue-locally",children:"Running Fondue locally"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Clone the Git repository"}),`
`,e.jsx(n.li,{children:"Install the dependencies"}),`
`,e.jsx(n.li,{children:"Run Storybook"}),`
`,e.jsx(n.li,{children:"Implement your changes"}),`
`,e.jsx(n.li,{children:"Profit!"}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Fondue uses ",e.jsx(n.code,{children:"pnpm"})," to manage the dependencies. If you don't have it installed in your local, please refer to ",e.jsx(n.a,{href:"https://pnpm.io/installation",rel:"nofollow",children:"their installation guide"}),"."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`$ git clone git@github.com:Frontify/fondue.git
$ pnpm i
`})}),`
`,e.jsxs(n.p,{children:["Run ",e.jsx(n.code,{children:"pnpm storybook"})," to start the storybook development server."]}),`
`,e.jsxs(n.p,{children:["Storybook will be available on ",e.jsx(n.a,{href:"http://localhost:6010",rel:"nofollow",children:"http://localhost:6010"}),`.
This Storybook instance is configured and served from the `,e.jsx(n.code,{children:"/storybook-docs"})," package which is used to proxy and compose all other Storybook instances in the monorepo."]}),`
`,e.jsx(n.p,{children:"In the background, multiple instances of Storybook will start up, one for each component package in the monorepo."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Storybook for ",e.jsx(n.code,{children:"@frontify/fondue-components"})," will be available on port 6006"]}),`
`,e.jsxs(n.li,{children:["Storybook for ",e.jsx(n.code,{children:"@frontify/fondue-icons"})," will be available on port 6007"]}),`
`,e.jsxs(n.li,{children:["Storybook for ",e.jsx(n.code,{children:"@frontify/fondue-charts"})," will be available on port 6008"]}),`
`,e.jsxs(n.li,{children:["Storybook for ",e.jsx(n.code,{children:"@frontify/fondue"})," will be available on port 6009"]}),`
`]}),`
`,e.jsxs(n.p,{children:["You can also start the Storybook instances for the individual packages by running ",e.jsx(n.code,{children:"pnpm storybook"})," in the respective package directory."]}),`
`,e.jsx(n.h2,{id:"create-a-new-component",children:"Create a new component"}),`
`,e.jsx(n.p,{children:"When adding a new component to Fondue this is the flow that is applied."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Create new branch"}),`
`,e.jsx(n.li,{children:"Create component files, write tests, write stories"}),`
`,e.jsx(n.li,{children:"Open PR"}),`
`,e.jsx(n.li,{children:"Squash"}),`
`]}),`
`,e.jsx(n.h3,{id:"create-new-branch",children:"Create new branch"}),`
`,e.jsx(n.p,{children:"Create a new branch for your additions"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`git checkout -b feat/add-fancy-component
`})}),`
`,e.jsx(n.p,{children:"The name of the branch is not really relevant. Nonetheless we usually go for a prefix following conventional commits, slash as a separator and a short description of what the branch will change in kebab-case."}),`
`,e.jsx(n.h3,{id:"create-component-files",children:"Create component files"}),`
`,e.jsx(n.p,{children:"Theres a nifty script that creates that files you'll need:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`pnpm component:create FancyComponent
`})}),`
`,e.jsxs(n.p,{children:["This will add a folder inside ",e.jsx(n.code,{children:"src/components"})," with the name ",e.jsx(n.code,{children:"CoolCatsAndKittens"})," and three files:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"CoolCatsAndKittens.tsx"})," which is where your React magic happens 🧙‍♀️"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"CoolCatsAndKittens.spec.tsx"})," is the place to write your tests 🔬"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"CoolCatsAndKittens.stories.tsx"})," is for your Stories inside Storybook 📄"]}),`
`]}),`
`,e.jsx(n.h2,{id:"building-packages",children:"Building packages"}),`
`,e.jsxs(n.p,{children:[`The packages in the monorepo are built independently.
To build the packages, run `,e.jsx(n.code,{children:"pnpm build"})," in the respective package directory."]}),`
`,e.jsx(n.p,{children:"Alternatively you can run the following scripts in the root directory."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"pnpm build:components"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"pnpm build:fondue"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"pnpm build:icons"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"pnpm build:charts"})}),`
`]}),`
`,e.jsx(n.h2,{id:"releasing-packages",children:"Releasing packages"}),`
`,e.jsxs(n.p,{children:["We utilize ",e.jsx(n.a,{href:"https://github.com/changesets/changesets",rel:"nofollow",children:"changesets"})," to manage our releases."]}),`
`,e.jsxs(n.p,{children:["To bump the version of a package, run ",e.jsx(n.code,{children:"pnpm changeset"})," in the root directory and follow the prompts to select your package and version bump."]}),`
`,e.jsx(n.p,{children:'When creating your changeset, please prefix the description with "When creating your changeset, please prefix the description with one of the following:'}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"feat:"})," for a new feature"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"fix:"})," for a bug fix"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"chore:"})," for changes to the build process or auxiliary tools and libraries such as documentation generation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"docs:"})," for documentation only changes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"build:"})," for changes that affect the build system or external dependencies"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"refactor:"})," for a code change that neither fixes a bug nor adds a feature"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"perf:"})," for a code change that improves performance"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"test:"})," for adding missing tests or correcting existing tests"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"ci:"})," for changes to our CI configuration files and scripts"]}),`
`]}),`
`,e.jsx(n.p,{children:"These prefixes help to quickly identify the type of changes included in the release. The description should be easily readable and understandable. Clear and concise descriptions help others to understand the changes you've made and their impact on the project."}),`
`,e.jsxs(n.p,{children:["A file containg your release notes will be created in the ",e.jsx(n.code,{children:".changeset"})," directory."]}),`
`,e.jsxs(n.p,{children:["After your change is merged to the ",e.jsx(n.code,{children:"main"}),` branch, the change will automatically be added to a release PR.
Once we merge the release PR, the package will be published to npm.`]})]})}function d(o={}){const{wrapper:n}={...s(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(i,{...o})}):i(o)}export{d as default};
