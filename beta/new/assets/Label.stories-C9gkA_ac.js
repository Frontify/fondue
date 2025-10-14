import{j as e}from"./iframe-CSnpxWyo.js";import{a as z}from"./fondue-icons352-D635tvzz.js";import{a as D}from"./Checkbox-Ck-2yLnY.js";import{S as a}from"./Select-B72puqWe.js";import{T as l}from"./TextInput-GENHgVeD.js";import{T as h}from"./Tooltip-BHum29sd.js";import{a as _,L as n}from"./Label-Clwv0VWx.js";import"./preload-helper-Bzs0p09u.js";import"./index-BbdUuVHH.js";import"./index-BtbfuIla.js";import"./index-BLdkZN8d.js";import"./index-CNEMk17P.js";import"./index-B8lMa-dV.js";import"./index-CtK4oAn9.js";import"./styleUtilities-A7Ia-tuh.js";import"./focusStyle-CSp3JXta.js";import"./index-D6bCCZr-.js";import"./index-15A6AsIA.js";import"./component-B4LvZqN-.js";import"./LoadingCircle-yvUhkoDB.js";import"./Button-Blgqs6lz.js";const ce={title:"Components/Label",component:_,tags:["autodocs"],parameters:{status:{type:"released"}},args:{children:"Label"}},s={args:{required:!0},render:t=>{const o=r=>e.jsx(l,{...r});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,htmlFor:"input-mandatory"}),e.jsx(o,{id:"input-mandatory",placeholder:"Enter your name"})]})}},p={args:{children:"Hello World"},render:t=>{const o=r=>e.jsx(l,{...r});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,htmlFor:"input-text"}),e.jsx(o,{id:"input-text",placeholder:"Enter your name"})]})}},i={args:{children:"Hello World"},render:t=>{const o=r=>e.jsx(l,{...r});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,htmlFor:"input-disabled"}),e.jsx(o,{id:"input-disabled",placeholder:"Enter your name",disabled:!0})]})}},c={args:{children:"Hello World"},render:t=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,id:"label-select",htmlFor:"select"}),e.jsxs(a,{id:"select","aria-labelledby":"label-select",placeholder:"Select...",children:[e.jsx(a.Item,{value:"1",children:"Option 1"}),e.jsx(a.Item,{value:"2",children:"Option 2"})]})]})},d={args:{children:"Hello World"},render:t=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,id:"label-combobox",htmlFor:"combobox"}),e.jsxs(a.Combobox,{id:"combobox","aria-labelledby":"label-combobox",placeholder:"Select...",children:[e.jsx(a.Item,{value:"1",children:"Option 1"}),e.jsx(a.Item,{value:"2",children:"Option 2"})]})]})},m={args:{children:"Hello World"},render:t=>e.jsxs("div",{className:"tw-flex tw-gap-1.5",children:[e.jsx(D,{id:"input-checkbox","aria-labelledby":"label"}),e.jsx(n,{...t,id:"label",htmlFor:"input-checkbox"})]})},u={args:{required:!0},render:t=>{const o=r=>e.jsx(l,{...r});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1.5",children:[e.jsxs(n,{...t,htmlFor:"input-tooltip",children:["Hello World",e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx(z,{size:16})}),e.jsx(h.Content,{children:"Tooltip"})]})]}),e.jsx(o,{id:"input-tooltip",placeholder:"Enter your name"})]})}},x={args:{children:"Strong Label",variant:"strong"},render:t=>{const o=r=>e.jsx(l,{...r});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(n,{...t,htmlFor:"input-strong"}),e.jsx(o,{id:"input-strong",placeholder:"Enter your name"})]})}};var b,g,T;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(M=(q=x.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};const de=["Mandatory","WithTextInput","WithDisabledInput","WithSelect","WithCombobox","WithCheckbox","WithTooltip","Strong"];export{s as Mandatory,x as Strong,m as WithCheckbox,d as WithCombobox,i as WithDisabledInput,c as WithSelect,p as WithTextInput,u as WithTooltip,de as __namedExportsOrder,ce as default};
