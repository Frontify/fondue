import{j as e}from"./iframe-REYuDC4z.js";import{a as z}from"./fondue-icons366-r0jp1SUt.js";import{a as D}from"./Checkbox-ZwRH8XoG.js";import{S as a}from"./Select-BbN_bUOi.js";import{T as l}from"./TextInput-BVmxrX5Z.js";import{T as h}from"./Tooltip-BreDenWs.js";import{a as _,L as n}from"./Label-DlChXeTR.js";import"./preload-helper-B46SeKxo.js";import"./index-D0lESQQy.js";import"./index-DA4zZfLh.js";import"./index-Cmubw1UJ.js";import"./index-Dav-xDvL.js";import"./index-DiC776XI.js";import"./index-CAiJd-J9.js";import"./styleUtilities-Byf6Fdv2.js";import"./focusStyle-IgMhxCMT.js";import"./index-CURCVrfN.js";import"./index-DO-o6v79.js";import"./component-CKvsoGTL.js";import"./LoadingCircle-BotltJcU.js";import"./useTranslation-B_Lenywl.js";import"./Button-DXSo8BqZ.js";const de={title:"Components/Label",component:_,tags:["autodocs"],parameters:{status:{type:"released"}},args:{children:"Label"}},s={args:{required:!0},render:t=>{const o=r=>e.jsx(l,{...r});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,htmlFor:"input-mandatory"}),e.jsx(o,{id:"input-mandatory",placeholder:"Enter your name"})]})}},p={args:{children:"Hello World"},render:t=>{const o=r=>e.jsx(l,{...r});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,htmlFor:"input-text"}),e.jsx(o,{id:"input-text",placeholder:"Enter your name"})]})}},i={args:{children:"Hello World"},render:t=>{const o=r=>e.jsx(l,{...r});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,htmlFor:"input-disabled"}),e.jsx(o,{id:"input-disabled",placeholder:"Enter your name",disabled:!0})]})}},c={args:{children:"Hello World"},render:t=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,id:"label-select",htmlFor:"select"}),e.jsxs(a,{id:"select","aria-labelledby":"label-select",placeholder:"Select...",children:[e.jsx(a.Item,{value:"1",children:"Option 1"}),e.jsx(a.Item,{value:"2",children:"Option 2"})]})]})},d={args:{children:"Hello World"},render:t=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,id:"label-combobox",htmlFor:"combobox"}),e.jsxs(a.Combobox,{id:"combobox","aria-labelledby":"label-combobox",placeholder:"Select...",children:[e.jsx(a.Item,{value:"1",children:"Option 1"}),e.jsx(a.Item,{value:"2",children:"Option 2"})]})]})},m={args:{children:"Hello World"},render:t=>e.jsxs("div",{className:"tw-flex tw-gap-1.5",children:[e.jsx(D,{id:"input-checkbox","aria-labelledby":"label"}),e.jsx(n,{...t,id:"label",htmlFor:"input-checkbox"})]})},u={args:{required:!0},render:t=>{const o=r=>e.jsx(l,{...r});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1.5",children:[e.jsxs(n,{...t,htmlFor:"input-tooltip",children:["Hello World",e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx(z,{size:16})}),e.jsx(h.Content,{children:"Tooltip"})]})]}),e.jsx(o,{id:"input-tooltip",placeholder:"Enter your name"})]})}},x={args:{children:"Strong Label",variant:"strong"},render:t=>{const o=r=>e.jsx(l,{...r});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,htmlFor:"input-strong"}),e.jsx(o,{id:"input-strong",placeholder:"Enter your name"})]})}};var b,g,T;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(T=(g=s.parameters)==null?void 0:g.docs)==null?void 0:T.source}}};var I,S,f;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(f=(S=p.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var w,y,j;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(j=(y=i.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var v,N,W;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(W=(N=c.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};var C,F,L;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(L=(F=d.parameters)==null?void 0:F.docs)==null?void 0:L.source}}};var k,E,H;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(H=(E=m.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};var R,O,P;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
                            <IconQuestionMarkCircle size={16} />
                        </Tooltip.Trigger>
                        <Tooltip.Content>Tooltip</Tooltip.Content>
                    </Tooltip.Root>
                </Label>
                <STextInput id="input-tooltip" placeholder="Enter your name" />
            </div>;
  }
}`,...(P=(O=u.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var U,q,M;x.parameters={...x.parameters,docs:{...(U=x.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    children: 'Strong Label',
    variant: 'strong'
  },
  render: args => {
    // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
    const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
    STextInput.displayName = 'TextInput';
    return <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} htmlFor="input-strong" />
                <STextInput id="input-strong" placeholder="Enter your name" />
            </div>;
  }
}`,...(M=(q=x.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};const me=["Mandatory","WithTextInput","WithDisabledInput","WithSelect","WithCombobox","WithCheckbox","WithTooltip","Strong"];export{s as Mandatory,x as Strong,m as WithCheckbox,d as WithCombobox,i as WithDisabledInput,c as WithSelect,p as WithTextInput,u as WithTooltip,me as __namedExportsOrder,de as default};
