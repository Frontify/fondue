import{j as t}from"./jsx-runtime-Nms4Y4qS.js";import"./index-BwDkhjyp.js";import{c as v}from"./fondue-icons332-iG2pYX5H.js";import{a as C}from"./Checkbox-BC616o3h.js";import{T as d}from"./TextInput-BMORzYJH.js";import{T as u}from"./Tooltip-BgwgP2G-.js";import{a as L,L as o}from"./Label-Dm6TJ1JV.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-BtCsUTRM.js";import"./index-CS4BWtGh.js";import"./index-BSNoMcJN.js";import"./index-DOnKqARA.js";import"./index-DGaPG0k3.js";import"./index-BgCrdp81.js";import"./index-kUwV4muI.js";import"./index-C1SWbrhG.js";import"./styleUtilities-CZDH020m.js";import"./focusStyle-IgMhxCMT.js";import"./index-CAR1Fn1S.js";import"./index-BnOD_KYf.js";import"./index-DduqEaLY.js";const Y={title:"Components/Label",component:L,tags:["autodocs"],parameters:{status:{type:"released"}},args:{children:"Label"}},p={args:{required:!0},render:n=>{const e=r=>t.jsx(d,{...r});return e.displayName="TextInput",t.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[t.jsx(o,{...n,htmlFor:"input"}),t.jsx(e,{id:"input",placeholder:"Enter your name"})]})}},s={args:{children:"Hello World"},render:n=>{const e=r=>t.jsx(d,{...r});return e.displayName="TextInput",t.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[t.jsx(o,{...n,htmlFor:"input"}),t.jsx(e,{id:"input",placeholder:"Enter your name"})]})}},a={args:{children:"Hello World"},render:n=>{const e=r=>t.jsx(d,{...r});return e.displayName="TextInput",t.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[t.jsx(o,{...n,htmlFor:"input"}),t.jsx(e,{id:"input",placeholder:"Enter your name",disabled:!0})]})}},l={args:{children:"Hello World"},render:n=>t.jsxs("div",{className:"tw-flex tw-gap-1.5",children:[t.jsx(C,{id:"input","aria-labelledby":"label"}),t.jsx(o,{...n,id:"label",htmlFor:"input"})]})},i={args:{required:!0},render:n=>{const e=r=>t.jsx(d,{...r});return e.displayName="TextInput",t.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1.5",children:[t.jsxs(o,{...n,htmlFor:"input",children:["Hello World",t.jsxs(u.Root,{children:[t.jsx(u.Trigger,{children:t.jsx(v,{size:16})}),t.jsx(u.Content,{children:"Tooltip"})]})]}),t.jsx(e,{id:"input",placeholder:"Enter your name"})]})}};var c,m,x;p.parameters={...p.parameters,docs:{...(c=p.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    required: true
  },
  render: args => {
    // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
    const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
    STextInput.displayName = 'TextInput';
    return <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} htmlFor="input" />
                <STextInput id="input" placeholder="Enter your name" />
            </div>;
  }
}`,...(x=(m=p.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var T,h,I;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    children: 'Hello World'
  },
  render: args => {
    // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
    const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
    STextInput.displayName = 'TextInput';
    return <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} htmlFor="input" />
                <STextInput id="input" placeholder="Enter your name" />
            </div>;
  }
}`,...(I=(h=s.parameters)==null?void 0:h.docs)==null?void 0:I.source}}};var g,f,y;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    children: 'Hello World'
  },
  render: args => {
    // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
    const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
    STextInput.displayName = 'TextInput';
    return <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} htmlFor="input" />
                <STextInput id="input" placeholder="Enter your name" disabled />
            </div>;
  }
}`,...(y=(f=a.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var b,w,S;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    children: 'Hello World'
  },
  render: args => {
    // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
    const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
    STextInput.displayName = 'TextInput';
    return <div className="tw-flex tw-gap-1.5">
                <Checkbox id="input" aria-labelledby="label" />
                <Label {...args} id="label" htmlFor="input" />
            </div>;
  }
}`,...(S=(w=l.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var j,N,W;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    required: true
  },
  render: args => {
    // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
    const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
    STextInput.displayName = 'TextInput';
    return <div className="tw-flex tw-flex-col tw-gap-1.5">
                <Label {...args} htmlFor="input">
                    Hello World
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <IconIcon size={16} />
                        </Tooltip.Trigger>
                        <Tooltip.Content>Tooltip</Tooltip.Content>
                    </Tooltip.Root>
                </Label>
                <STextInput id="input" placeholder="Enter your name" />
            </div>;
  }
}`,...(W=(N=i.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};const Z=["Mandatory","WithTextInput","WithDisabledInput","WithCheckbox","WithTooltip"];export{p as Mandatory,l as WithCheckbox,a as WithDisabledInput,s as WithTextInput,i as WithTooltip,Z as __namedExportsOrder,Y as default};
