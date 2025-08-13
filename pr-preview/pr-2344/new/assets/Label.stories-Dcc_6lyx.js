import{j as e}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import{c as P}from"./fondue-icons351-CNs5B0wj.js";import{a as U}from"./Checkbox-DjmJW5up.js";import{S as l}from"./Select-BQTPnDOX.js";import{T as x}from"./TextInput-CdyHHfa9.js";import{T as u}from"./Tooltip-DYMQ7i3U.js";import{a as q,L as n}from"./Label-CD_TBDsM.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BUNfiIdP.js";import"./index-CWz5EflU.js";import"./index-BIU06K05.js";import"./index-6uuHhnjI.js";import"./index-sY83p_TZ.js";import"./index-Dkr9yJHh.js";import"./index-Cr2iZZCw.js";import"./index-Cho7bklK.js";import"./styleUtilities-Byf6Fdv2.js";import"./focusStyle-IgMhxCMT.js";import"./index-DISCH4w8.js";import"./index-DuL23WnM.js";import"./Combination-Dejovr5Y.js";import"./LoadingCircle-C0VoU-pr.js";import"./ThemeProvider-DCIFmFo4.js";const ie={title:"Components/Label",component:q,tags:["autodocs"],parameters:{status:{type:"released"}},args:{children:"Label"}},a={args:{required:!0},render:t=>{const o=r=>e.jsx(x,{...r});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,htmlFor:"input-mandatory"}),e.jsx(o,{id:"input-mandatory",placeholder:"Enter your name"})]})}},s={args:{children:"Hello World"},render:t=>{const o=r=>e.jsx(x,{...r});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,htmlFor:"input-text"}),e.jsx(o,{id:"input-text",placeholder:"Enter your name"})]})}},p={args:{children:"Hello World"},render:t=>{const o=r=>e.jsx(x,{...r});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,htmlFor:"input-disabled"}),e.jsx(o,{id:"input-disabled",placeholder:"Enter your name",disabled:!0})]})}},i={args:{children:"Hello World"},render:t=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,id:"label-select",htmlFor:"select"}),e.jsxs(l,{id:"select","aria-labelledby":"label-select",placeholder:"Select...",children:[e.jsx(l.Item,{value:"1",children:"Option 1"}),e.jsx(l.Item,{value:"2",children:"Option 2"})]})]})},c={args:{children:"Hello World"},render:t=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,id:"label-combobox",htmlFor:"combobox"}),e.jsxs(l.Combobox,{id:"combobox","aria-labelledby":"label-combobox",placeholder:"Select...",children:[e.jsx(l.Item,{value:"1",children:"Option 1"}),e.jsx(l.Item,{value:"2",children:"Option 2"})]})]})},d={args:{children:"Hello World"},render:t=>e.jsxs("div",{className:"tw-flex tw-gap-1.5",children:[e.jsx(U,{id:"input-checkbox","aria-labelledby":"label"}),e.jsx(n,{...t,id:"label",htmlFor:"input-checkbox"})]})},m={args:{required:!0},render:t=>{const o=r=>e.jsx(x,{...r});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1.5",children:[e.jsxs(n,{...t,htmlFor:"input-tooltip",children:["Hello World",e.jsxs(u.Root,{children:[e.jsx(u.Trigger,{children:e.jsx(P,{size:16})}),e.jsx(u.Content,{children:"Tooltip"})]})]}),e.jsx(o,{id:"input-tooltip",placeholder:"Enter your name"})]})}};var h,b,I;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(I=(b=a.parameters)==null?void 0:b.docs)==null?void 0:I.source}}};var T,g,S;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(S=(g=s.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};var f,w,y;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(y=(w=p.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var j,v,W;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    children: 'Hello World'
  },
  render: args => {
    return <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} id="label-select" htmlFor="select" />
                <Select id="select" aria-labelledby="label-select" placeholder="Select...">
                    <Select.Item value="1">Option 1</Select.Item>
                    <Select.Item value="2">Option 2</Select.Item>
                </Select>
            </div>;
  }
}`,...(W=(v=i.parameters)==null?void 0:v.docs)==null?void 0:W.source}}};var N,C,F;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    children: 'Hello World'
  },
  render: args => {
    return <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} id="label-combobox" htmlFor="combobox" />
                <Select.Combobox id="combobox" aria-labelledby="label-combobox" placeholder="Select...">
                    <Select.Item value="1">Option 1</Select.Item>
                    <Select.Item value="2">Option 2</Select.Item>
                </Select.Combobox>
            </div>;
  }
}`,...(F=(C=c.parameters)==null?void 0:C.docs)==null?void 0:F.source}}};var k,L,H;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(H=(L=d.parameters)==null?void 0:L.docs)==null?void 0:H.source}}};var E,O,R;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(R=(O=m.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};const ce=["Mandatory","WithTextInput","WithDisabledInput","WithSelect","WithCombobox","WithCheckbox","WithTooltip"];export{a as Mandatory,d as WithCheckbox,c as WithCombobox,p as WithDisabledInput,i as WithSelect,s as WithTextInput,m as WithTooltip,ce as __namedExportsOrder,ie as default};
