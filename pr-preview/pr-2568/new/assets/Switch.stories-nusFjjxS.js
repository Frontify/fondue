import{j as e,r as P}from"./iframe-BoDpP8ur.js";import{a as X}from"./fondue-icons369-BluYeuTz.js";import{L as s}from"./Label-ubTtcjXB.js";import{T as p}from"./Tooltip-CArFBj0s.js";import{S as a}from"./Switch-B6CnpyB3.js";import"./preload-helper-D0PtTLEo.js";import"./index-C1Ld_K82.js";import"./styleUtilities-A7Ia-tuh.js";import"./index-CxBG3jdD.js";import"./index-6BFPF8gK.js";import"./index-C87r89eb.js";import"./index-CTsgGilG.js";import"./index-jjAWMjDX.js";import"./index-BhtBwz42.js";import"./useTranslation-KlP6gb7J.js";const ue={title:"Components/Switch",component:a,tags:["autodocs"],parameters:{status:{type:"released"}},argTypes:{size:{control:{type:"select",options:["small","medium","large"]}}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"},decorators:[r=>e.jsx("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:e.jsx(r,{})})]},t={args:{defaultValue:!0}},l={args:{defaultValue:!1}},i={args:{defaultValue:!1,disabled:!0}},n={args:{defaultValue:!1,required:!0}},o={render:r=>e.jsxs(e.Fragment,{children:[e.jsx(s,{id:"label",htmlFor:"switch",required:r.required,children:"Switch"}),e.jsx(a,{...r,id:"switch","aria-labelledby":"label"})]})},d={args:{required:!0},render:r=>e.jsxs(e.Fragment,{children:[e.jsx(s,{id:"label",htmlFor:"switch",required:r.required,children:"Switch"}),e.jsx(a,{...r,id:"switch","aria-labelledby":"label"})]})},c={render:r=>e.jsxs(e.Fragment,{children:[e.jsxs(s,{id:"label",htmlFor:"switch",required:r.required,children:["Switch",e.jsxs(p.Root,{children:[e.jsx(p.Trigger,{children:e.jsx(X,{size:"16"})}),e.jsx(p.Content,{children:"Tooltip"})]})]}),e.jsx(a,{...r,id:"switch","aria-labelledby":"label"})]})},h={render:r=>{const[B,G]=P.useState(!1),J=K=>{G(K)};return e.jsx(a,{value:B,onChange:J,...r})}},u={render:r=>e.jsxs(e.Fragment,{children:[e.jsx(a,{...r,size:"small"}),e.jsx(a,{...r,size:"medium"}),e.jsx(a,{...r,size:"large"})]})},m={render:r=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"tw-mb-2",children:"hugWidth: true (default) - Use flex with gap"}),e.jsxs("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:[e.jsx(s,{id:"label-hug-true",htmlFor:"switch-hug-true",children:"Label"}),e.jsx(a,{...r,id:"switch-hug-true","aria-labelledby":"label-hug-true"})]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"tw-mb-2",children:"hugWidth: false - Use flex with justify-between and full width"}),e.jsxs("div",{className:"tw-flex tw-justify-between tw-items-center tw-w-full",children:[e.jsx(s,{id:"label-hug-false",htmlFor:"switch-hug-false",children:"Label"}),e.jsx(a,{...r,id:"switch-hug-false","aria-labelledby":"label-hug-false"})]})]})]}),decorators:[],parameters:{docs:{description:{story:"The Switch component does not have a `hugWidth` prop. Instead, control the layout using flex container styles. When `hugWidth: true`, use a flex container with a small gap. When `hugWidth: false`, use a flex container with `justify-between` and full width."}}}};var g,w,b;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    defaultValue: true
  }
}`,...(b=(w=t.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};var f,x,j;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    defaultValue: false
  }
}`,...(j=(x=l.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var S,y,v;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    disabled: true
  }
}`,...(v=(y=i.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var L,W,q;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    required: true
  }
}`,...(q=(W=n.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var T,C,F;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: args => <>
            <Label id="label" htmlFor="switch" required={args.required}>
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
}`,...(F=(C=o.parameters)==null?void 0:C.docs)==null?void 0:F.source}}};var k,z,N;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    required: true
  },
  render: args => <>
            <Label id="label" htmlFor="switch" required={args.required}>
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
}`,...(N=(z=d.parameters)==null?void 0:z.docs)==null?void 0:N.source}}};var R,V,U;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: args => <>
            <Label id="label" htmlFor="switch" required={args.required}>
                Switch
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <IconQuestionMarkCircle size="16" />
                    </Tooltip.Trigger>
                    <Tooltip.Content>Tooltip</Tooltip.Content>
                </Tooltip.Root>
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
}`,...(U=(V=c.parameters)==null?void 0:V.docs)==null?void 0:U.source}}};var E,I,A;h.parameters={...h.parameters,docs:{...(E=h.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(false);
    const onChange = (checked: boolean) => {
      setChecked(checked);
    };
    return <Switch value={checked} onChange={onChange} {...args} />;
  }
}`,...(A=(I=h.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};var D,H,_;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <>
            <Switch {...args} size="small" />
            <Switch {...args} size="medium" />
            <Switch {...args} size="large" />
        </>
}`,...(_=(H=u.parameters)==null?void 0:H.docs)==null?void 0:_.source}}};var M,O,Q;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-flex-col tw-gap-4">
            <div>
                <div className="tw-mb-2">hugWidth: true (default) - Use flex with gap</div>
                <div className="tw-flex tw-gap-1.5 tw-items-center">
                    <Label id="label-hug-true" htmlFor="switch-hug-true">
                        Label
                    </Label>
                    <Switch {...args} id="switch-hug-true" aria-labelledby="label-hug-true" />
                </div>
            </div>
            <div>
                <div className="tw-mb-2">hugWidth: false - Use flex with justify-between and full width</div>
                <div className="tw-flex tw-justify-between tw-items-center tw-w-full">
                    <Label id="label-hug-false" htmlFor="switch-hug-false">
                        Label
                    </Label>
                    <Switch {...args} id="switch-hug-false" aria-labelledby="label-hug-false" />
                </div>
            </div>
        </div>,
  decorators: [],
  parameters: {
    docs: {
      description: {
        story: 'The Switch component does not have a \`hugWidth\` prop. Instead, control the layout using flex container styles. When \`hugWidth: true\`, use a flex container with a small gap. When \`hugWidth: false\`, use a flex container with \`justify-between\` and full width.'
      }
    }
  }
}`,...(Q=(O=m.parameters)==null?void 0:O.docs)==null?void 0:Q.source}}};const me=["Checked","Unchecked","Disabled","Required","WithLabel","WithLabelRequired","WithLabelAndTooltip","ExternallyControlled","Size","HugWidth"];export{t as Checked,i as Disabled,h as ExternallyControlled,m as HugWidth,n as Required,u as Size,l as Unchecked,o as WithLabel,c as WithLabelAndTooltip,d as WithLabelRequired,me as __namedExportsOrder,ue as default};
