import{j as e}from"./jsx-runtime-BSxFkHFN.js";import"./index-i66itsuO.js";import{c as F}from"./fondue-icons348-DbatLcWa.js";import{a as H}from"./Checkbox-CmqTlVXy.js";import{S as u}from"./Select-DHZxL7Dr.js";import{T as c}from"./TextInput-DVb6zBct.js";import{T as m}from"./Tooltip-DJM_t4lA.js";import{a as R,L as n}from"./Label-WzP-sa5Y.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-C7Xses_O.js";import"./index-BQPO3JLn.js";import"./index-BwxsjnLo.js";import"./index-BNYVQE02.js";import"./index-P4w4wmP2.js";import"./index-Dh_oXSn4.js";import"./index-BVL3yOfb.js";import"./index-cPkRJAzz.js";import"./styleUtilities-rhQWLmVU.js";import"./focusStyle-IgMhxCMT.js";import"./index-Nz8TJpHF.js";import"./index-C9TK974O.js";import"./Combination-BQ0A-8sA.js";import"./index-CIFYclHn.js";import"./ThemeProvider-nZnSZuXa.js";const ae={title:"Components/Label",component:R,tags:["autodocs"],parameters:{status:{type:"released"}},args:{children:"Label"}},a={args:{required:!0},render:t=>{const r=o=>e.jsx(c,{...o});return r.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,htmlFor:"input-mandatory"}),e.jsx(r,{id:"input-mandatory",placeholder:"Enter your name"})]})}},l={args:{children:"Hello World"},render:t=>{const r=o=>e.jsx(c,{...o});return r.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,htmlFor:"input-text"}),e.jsx(r,{id:"input-text",placeholder:"Enter your name"})]})}},s={args:{children:"Hello World"},render:t=>{const r=o=>e.jsx(c,{...o});return r.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,htmlFor:"input-disabled"}),e.jsx(r,{id:"input-disabled",placeholder:"Enter your name",disabled:!0})]})}},p={args:{children:"Hello World"},render:t=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,id:"select-label"}),e.jsxs(u,{placeholder:"Select...",labelId:"select-label",children:[e.jsx(u.Item,{value:"1",children:"Option 1"}),e.jsx(u.Item,{value:"2",children:"Option 2"})]})]})},i={args:{children:"Hello World"},render:t=>e.jsxs("div",{className:"tw-flex tw-gap-1.5",children:[e.jsx(H,{id:"input-checkbox","aria-labelledby":"label"}),e.jsx(n,{...t,id:"label",htmlFor:"input-checkbox"})]})},d={args:{required:!0},render:t=>{const r=o=>e.jsx(c,{...o});return r.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1.5",children:[e.jsxs(n,{...t,htmlFor:"input-tooltip",children:["Hello World",e.jsxs(m.Root,{children:[e.jsx(m.Trigger,{children:e.jsx(F,{size:16})}),e.jsx(m.Content,{children:"Tooltip"})]})]}),e.jsx(r,{id:"input-tooltip",placeholder:"Enter your name"})]})}};var x,h,T;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    required: true
  },
  render: args => {
    // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
    const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
    STextInput.displayName = 'TextInput';
    return <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} htmlFor="input-mandatory" />
                <STextInput id="input-mandatory" placeholder="Enter your name" />
            </div>;
  }
}`,...(T=(h=a.parameters)==null?void 0:h.docs)==null?void 0:T.source}}};var I,g,b;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    children: 'Hello World'
  },
  render: args => {
    // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
    const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
    STextInput.displayName = 'TextInput';
    return <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} htmlFor="input-text" />
                <STextInput id="input-text" placeholder="Enter your name" />
            </div>;
  }
}`,...(b=(g=l.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var f,S,y;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    children: 'Hello World'
  },
  render: args => {
    // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
    const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
    STextInput.displayName = 'TextInput';
    return <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} htmlFor="input-disabled" />
                <STextInput id="input-disabled" placeholder="Enter your name" disabled />
            </div>;
  }
}`,...(y=(S=s.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var w,j,v;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    children: 'Hello World'
  },
  render: args => {
    return <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} id="select-label" />
                <Select placeholder="Select..." labelId="select-label">
                    <Select.Item value="1">Option 1</Select.Item>
                    <Select.Item value="2">Option 2</Select.Item>
                </Select>
            </div>;
  }
}`,...(v=(j=p.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var N,W,C;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    children: 'Hello World'
  },
  render: args => {
    // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
    const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
    STextInput.displayName = 'TextInput';
    return <div className="tw-flex tw-gap-1.5">
                <Checkbox id="input-checkbox" aria-labelledby="label" />
                <Label {...args} id="label" htmlFor="input-checkbox" />
            </div>;
  }
}`,...(C=(W=i.parameters)==null?void 0:W.docs)==null?void 0:C.source}}};var k,L,E;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    required: true
  },
  render: args => {
    // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
    const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
    STextInput.displayName = 'TextInput';
    return <div className="tw-flex tw-flex-col tw-gap-1.5">
                <Label {...args} htmlFor="input-tooltip">
                    Hello World
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <IconIcon size={16} />
                        </Tooltip.Trigger>
                        <Tooltip.Content>Tooltip</Tooltip.Content>
                    </Tooltip.Root>
                </Label>
                <STextInput id="input-tooltip" placeholder="Enter your name" />
            </div>;
  }
}`,...(E=(L=d.parameters)==null?void 0:L.docs)==null?void 0:E.source}}};const le=["Mandatory","WithTextInput","WithDisabledInput","WithSelect","WithCheckbox","WithTooltip"];export{a as Mandatory,i as WithCheckbox,s as WithDisabledInput,p as WithSelect,l as WithTextInput,d as WithTooltip,le as __namedExportsOrder,ae as default};
