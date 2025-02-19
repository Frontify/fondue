import{j as e}from"./jsx-runtime-BSxFkHFN.js";import"./index-i66itsuO.js";import{c as L}from"./fondue-icons348-DbatLcWa.js";import{a as H}from"./Checkbox-CmqTlVXy.js";import{S as m}from"./Select-E3QY-mQF.js";import{T as d}from"./TextInput-DVb6zBct.js";import{T as u}from"./Tooltip-DJM_t4lA.js";import{a as R,L as n}from"./Label-WzP-sa5Y.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-C7Xses_O.js";import"./index-BQPO3JLn.js";import"./index-BwxsjnLo.js";import"./index-BNYVQE02.js";import"./index-P4w4wmP2.js";import"./index-Dh_oXSn4.js";import"./index-BVL3yOfb.js";import"./index-cPkRJAzz.js";import"./styleUtilities-rhQWLmVU.js";import"./focusStyle-IgMhxCMT.js";import"./index-Nz8TJpHF.js";import"./index-C9TK974O.js";import"./Combination-BQ0A-8sA.js";import"./index-CIFYclHn.js";import"./ThemeProvider-nZnSZuXa.js";const ae={title:"Components/Label",component:R,tags:["autodocs"],parameters:{status:{type:"released"}},args:{children:"Label"}},a={args:{required:!0},render:r=>{const t=o=>e.jsx(d,{...o});return t.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...r,htmlFor:"input-mandatory"}),e.jsx(t,{id:"input-mandatory",placeholder:"Enter your name"})]})}},s={args:{children:"Hello World"},render:r=>{const t=o=>e.jsx(d,{...o});return t.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...r,htmlFor:"input-text"}),e.jsx(t,{id:"input-text",placeholder:"Enter your name"})]})}},l={args:{children:"Hello World"},render:r=>{const t=o=>e.jsx(d,{...o});return t.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...r,htmlFor:"input-disabled"}),e.jsx(t,{id:"input-disabled",placeholder:"Enter your name",disabled:!0})]})}},p={args:{children:"Hello World"},render:r=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...r,htmlFor:"select",onClick:()=>{var t;return(t=document.getElementById("select"))==null?void 0:t.click()}}),e.jsxs(m,{id:"select",placeholder:"Select...",children:[e.jsx(m.Item,{value:"1",children:"Option 1"}),e.jsx(m.Item,{value:"2",children:"Option 2"})]})]})},i={args:{children:"Hello World"},render:r=>e.jsxs("div",{className:"tw-flex tw-gap-1.5",children:[e.jsx(H,{id:"input-checkbox","aria-labelledby":"label"}),e.jsx(n,{...r,id:"label",htmlFor:"input-checkbox"})]})},c={args:{required:!0},render:r=>{const t=o=>e.jsx(d,{...o});return t.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1.5",children:[e.jsxs(n,{...r,htmlFor:"input-tooltip",children:["Hello World",e.jsxs(u.Root,{children:[e.jsx(u.Trigger,{children:e.jsx(L,{size:16})}),e.jsx(u.Content,{children:"Tooltip"})]})]}),e.jsx(t,{id:"input-tooltip",placeholder:"Enter your name"})]})}};var x,h,T;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(T=(h=a.parameters)==null?void 0:h.docs)==null?void 0:T.source}}};var g,I,f;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(f=(I=s.parameters)==null?void 0:I.docs)==null?void 0:f.source}}};var S,b,y;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(y=(b=l.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var w,j,v;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    children: 'Hello World'
  },
  render: args => {
    return <div className="tw-flex tw-flex-col tw-gap-2">
                {/* The select is using a 'div' as a trigger, this means we have to trigger it manually. */}
                <Label {...args} htmlFor="select" onClick={() => document.getElementById('select')?.click()} />
                <Select id="select" placeholder="Select...">
                    <Select.Item value="1">Option 1</Select.Item>
                    <Select.Item value="2">Option 2</Select.Item>
                </Select>
            </div>;
  }
}`,...(v=(j=p.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var N,W,k;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(k=(W=i.parameters)==null?void 0:W.docs)==null?void 0:k.source}}};var C,E,F;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(F=(E=c.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};const se=["Mandatory","WithTextInput","WithDisabledInput","WithSelect","WithCheckbox","WithTooltip"];export{a as Mandatory,i as WithCheckbox,l as WithDisabledInput,p as WithSelect,s as WithTextInput,c as WithTooltip,se as __namedExportsOrder,ae as default};
