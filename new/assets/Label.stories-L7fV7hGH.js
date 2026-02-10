import{j as e}from"./iframe-7Vp90Q64.js";import{a as ie}from"./fondue-icons372-POAVWW0X.js";import{a as de}from"./Checkbox-COTP0BzJ.js";import{S as u}from"./index-CUd9mNfL.js";import{T as x}from"./TextInput-CUVNY8Ce.js";import{T as b}from"./Tooltip-B-IfeDVX.js";import{a as me,L as m}from"./Label-Dj8sPCZK.js";import"./preload-helper-C1FmrZbK.js";import"./index-CKZNW8I5.js";import"./index-DuUpH-yH.js";import"./index-BesNjdav.js";import"./index-CaSelV5N.js";import"./index-C2QNke-2.js";import"./index-DXVVoL9W.js";import"./Combination-DWQD4C_F.js";import"./LoadingCircle-Dy-yCqGk.js";import"./useTranslation-CGINz5YD.js";import"./Button-CnqO6I3L.js";import"./Badge-CLpGeneT.js";import"./index-L8sZnSo1.js";const Re={title:"Components/Label",component:me,tags:["autodocs"],parameters:{status:{type:"released"}},args:{children:"Label"}},r={args:{required:!0},render:t=>{const o=n=>e.jsx(x,{...n});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(m,{...t,htmlFor:"input-mandatory"}),e.jsx(o,{id:"input-mandatory",placeholder:"Enter your name"})]})}},a={args:{children:"Hello World"},render:t=>{const o=n=>e.jsx(x,{...n});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(m,{...t,htmlFor:"input-text"}),e.jsx(o,{id:"input-text",placeholder:"Enter your name"})]})}},l={args:{children:"Hello World"},render:t=>{const o=n=>e.jsx(x,{...n});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(m,{...t,htmlFor:"input-disabled"}),e.jsx(o,{id:"input-disabled",placeholder:"Enter your name",disabled:!0})]})}},s={args:{children:"Hello World"},render:t=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(m,{...t,id:"label-select",htmlFor:"select"}),e.jsxs(u,{id:"select","aria-labelledby":"label-select",placeholder:"Select...",children:[e.jsx(u.Item,{value:"1",children:"Option 1"}),e.jsx(u.Item,{value:"2",children:"Option 2"})]})]})},p={args:{children:"Hello World"},render:t=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(m,{...t,id:"label-combobox",htmlFor:"combobox"}),e.jsxs(u.Combobox,{id:"combobox","aria-labelledby":"label-combobox",placeholder:"Select...",children:[e.jsx(u.Item,{value:"1",children:"Option 1"}),e.jsx(u.Item,{value:"2",children:"Option 2"})]})]})},c={args:{children:"Hello World"},render:t=>e.jsxs("div",{className:"tw-flex tw-gap-1.5",children:[e.jsx(de,{id:"input-checkbox","aria-labelledby":"label"}),e.jsx(m,{...t,id:"label",htmlFor:"input-checkbox"})]})},i={args:{required:!0},render:t=>{const o=n=>e.jsx(x,{...n});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1.5",children:[e.jsxs(m,{...t,htmlFor:"input-tooltip",children:["Hello World",e.jsxs(b.Root,{children:[e.jsx(b.Trigger,{children:e.jsx(ie,{size:16})}),e.jsx(b.Content,{children:"Tooltip"})]})]}),e.jsx(o,{id:"input-tooltip",placeholder:"Enter your name"})]})}},d={args:{children:"Strong Label",variant:"strong"},render:t=>{const o=n=>e.jsx(x,{...n});return o.displayName="TextInput",e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[e.jsx(m,{...t,htmlFor:"input-strong"}),e.jsx(o,{id:"input-strong",placeholder:"Enter your name"})]})}};var h,T,I;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{code:`const Mandatory = () => {
  // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
  const STextInput = (props: ComponentProps<typeof TextInput>) => (
    <TextInput {...props} />
  );
  STextInput.displayName = "TextInput";

  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <Label required htmlFor="input-mandatory">
        Label
      </Label>
      <STextInput id="input-mandatory" placeholder="Enter your name" />
    </div>
  );
};
`,...(I=(T=r.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var g,S,f;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{code:`const WithTextInput = () => {
  // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
  const STextInput = (props: ComponentProps<typeof TextInput>) => (
    <TextInput {...props} />
  );
  STextInput.displayName = "TextInput";

  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <Label htmlFor="input-text">Hello World</Label>
      <STextInput id="input-text" placeholder="Enter your name" />
    </div>
  );
};
`,...(f=(S=a.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var y,w,v;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{code:`const WithDisabledInput = () => {
  // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
  const STextInput = (props: ComponentProps<typeof TextInput>) => (
    <TextInput {...props} />
  );
  STextInput.displayName = "TextInput";

  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <Label htmlFor="input-disabled">Hello World</Label>
      <STextInput id="input-disabled" placeholder="Enter your name" disabled />
    </div>
  );
};
`,...(v=(w=l.parameters)==null?void 0:w.docs)==null?void 0:v.source}}};var N,j,W;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{code:`const WithSelect = () => {
  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <Label id="label-select" htmlFor="select">
        Hello World
      </Label>
      <Select
        id="select"
        aria-labelledby="label-select"
        placeholder="Select..."
      >
        <Select.Item value="1">Option 1</Select.Item>
        <Select.Item value="2">Option 2</Select.Item>
      </Select>
    </div>
  );
};
`,...(W=(j=s.parameters)==null?void 0:j.docs)==null?void 0:W.source}}};var C,L,k;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{code:`const WithCombobox = () => {
  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <Label id="label-combobox" htmlFor="combobox">
        Hello World
      </Label>
      <Select.Combobox
        id="combobox"
        aria-labelledby="label-combobox"
        placeholder="Select..."
      >
        <Select.Item value="1">Option 1</Select.Item>
        <Select.Item value="2">Option 2</Select.Item>
      </Select.Combobox>
    </div>
  );
};
`,...(k=(L=p.parameters)==null?void 0:L.docs)==null?void 0:k.source}}};var F,H,R;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{code:`const WithCheckbox = () => {
  // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
  const STextInput = (props: ComponentProps<typeof TextInput>) => (
    <TextInput {...props} />
  );
  STextInput.displayName = "TextInput";

  return (
    <div className="tw-flex tw-gap-1.5">
      <Checkbox id="input-checkbox" aria-labelledby="label" />
      <Label id="label" htmlFor="input-checkbox">
        Hello World
      </Label>
    </div>
  );
};
`,...(R=(H=c.parameters)==null?void 0:H.docs)==null?void 0:R.source}}};var E,O,P;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{code:`const WithTooltip = () => {
  // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
  const STextInput = (props: ComponentProps<typeof TextInput>) => (
    <TextInput {...props} />
  );
  STextInput.displayName = "TextInput";

  return (
    <div className="tw-flex tw-flex-col tw-gap-1.5">
      <Label required htmlFor="input-tooltip">
        Hello World
        <Tooltip.Root>
          <Tooltip.Trigger>
            <IconQuestionMarkCircle size={16} />
          </Tooltip.Trigger>
          <Tooltip.Content>Tooltip</Tooltip.Content>
        </Tooltip.Root>
      </Label>
      <STextInput id="input-tooltip" placeholder="Enter your name" />
    </div>
  );
};
`,...(P=(O=i.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var U,q,M;d.parameters={...d.parameters,docs:{...(U=d.parameters)==null?void 0:U.docs,source:{code:`const Strong = () => {
  // Used to get the correct component name in the Storybook of the \`TextInput\` (instead of \`TextInput.Root\`)
  const STextInput = (props: ComponentProps<typeof TextInput>) => (
    <TextInput {...props} />
  );
  STextInput.displayName = "TextInput";

  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <Label variant="strong" htmlFor="input-strong">
        Strong Label
      </Label>
      <STextInput id="input-strong" placeholder="Enter your name" />
    </div>
  );
};
`,...(M=(q=d.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};var z,D,Q;r.parameters={...r.parameters,docs:{...(z=r.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(Q=(D=r.parameters)==null?void 0:D.docs)==null?void 0:Q.source}}};var _,A,B;a.parameters={...a.parameters,docs:{...(_=a.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(B=(A=a.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var G,J,K;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(K=(J=l.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var V,X,Y;s.parameters={...s.parameters,docs:{...(V=s.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(Y=(X=s.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,ee;p.parameters={...p.parameters,docs:{...(Z=p.parameters)==null?void 0:Z.docs,source:{originalSource:`{
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
}`,...(ee=($=p.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var te,oe,ne;c.parameters={...c.parameters,docs:{...(te=c.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
}`,...(ne=(oe=c.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};var re,ae,le;i.parameters={...i.parameters,docs:{...(re=i.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(le=(ae=i.parameters)==null?void 0:ae.docs)==null?void 0:le.source}}};var se,pe,ce;d.parameters={...d.parameters,docs:{...(se=d.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
}`,...(ce=(pe=d.parameters)==null?void 0:pe.docs)==null?void 0:ce.source}}};const Ee=["Mandatory","WithTextInput","WithDisabledInput","WithSelect","WithCombobox","WithCheckbox","WithTooltip","Strong"];export{r as Mandatory,d as Strong,c as WithCheckbox,p as WithCombobox,l as WithDisabledInput,s as WithSelect,a as WithTextInput,i as WithTooltip,Ee as __namedExportsOrder,Re as default};
