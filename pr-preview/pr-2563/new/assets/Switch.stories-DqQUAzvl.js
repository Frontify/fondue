import{j as e,r as B}from"./iframe-Csijk7By.js";import{a as G}from"./fondue-icons369-B-oeZb6k.js";import{L as u}from"./Label-CwWT5QyY.js";import{T as m}from"./Tooltip-DV1q_qsQ.js";import{S as t}from"./Switch-Dp0pvHv5.js";import"./preload-helper-FR9eS4WJ.js";import"./index-Cr_8eVub.js";import"./styleUtilities-A7Ia-tuh.js";import"./index-DFlOmsp4.js";import"./index-I7SVX4iN.js";import"./index-Bfb9OR7P.js";import"./index-BT7gJLBh.js";import"./index-BjY9t2TX.js";import"./index--g2P9NOI.js";import"./useTranslation-DTFND7J_.js";const oe={title:"Components/Switch",component:t,tags:["autodocs"],parameters:{status:{type:"released"}},argTypes:{size:{control:{type:"select",options:["small","medium","large"]}}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"},decorators:[a=>e.jsx("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:e.jsx(a,{})})]},s={args:{defaultValue:!0}},r={args:{defaultValue:!1}},l={args:{defaultValue:!1,disabled:!0}},i={args:{defaultValue:!1,required:!0}},n={render:a=>e.jsxs(e.Fragment,{children:[e.jsx(u,{id:"label",htmlFor:"switch",children:"Switch"}),e.jsx(t,{...a,id:"switch","aria-labelledby":"label"})]})},o={render:a=>e.jsxs(e.Fragment,{children:[e.jsxs(u,{id:"label",htmlFor:"switch",children:["Switch",e.jsxs(m.Root,{children:[e.jsx(m.Trigger,{children:e.jsx(G,{size:"16"})}),e.jsx(m.Content,{children:"Tooltip"})]})]}),e.jsx(t,{...a,id:"switch","aria-labelledby":"label"})]})},c={render:a=>{const[_,M]=B.useState(!1),O=Q=>{M(Q)};return e.jsx(t,{value:_,onChange:O,...a})}},d={render:a=>e.jsxs(e.Fragment,{children:[e.jsx(t,{...a,size:"small"}),e.jsx(t,{...a,size:"medium"}),e.jsx(t,{...a,size:"large"})]})},h={render:a=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"tw-mb-2",children:"hugWidth: true (default) - Use flex with gap"}),e.jsxs("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:[e.jsx(u,{id:"label-hug-true",htmlFor:"switch-hug-true",children:"Label"}),e.jsx(t,{...a,id:"switch-hug-true","aria-labelledby":"label-hug-true"})]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"tw-mb-2",children:"hugWidth: false - Use flex with justify-between and full width"}),e.jsxs("div",{className:"tw-flex tw-justify-between tw-items-center tw-w-full",children:[e.jsx(u,{id:"label-hug-false",htmlFor:"switch-hug-false",children:"Label"}),e.jsx(t,{...a,id:"switch-hug-false","aria-labelledby":"label-hug-false"})]})]})]}),decorators:[],parameters:{docs:{description:{story:"The Switch component does not have a `hugWidth` prop. Instead, control the layout using flex container styles. When `hugWidth: true`, use a flex container with a small gap. When `hugWidth: false`, use a flex container with `justify-between` and full width."}}}};var p,g,w;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    defaultValue: true
  }
}`,...(w=(g=s.parameters)==null?void 0:g.docs)==null?void 0:w.source}}};var f,b,x;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    defaultValue: false
  }
}`,...(x=(b=r.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var j,S,v;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    disabled: true
  }
}`,...(v=(S=l.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var y,W,T;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    required: true
  }
}`,...(T=(W=i.parameters)==null?void 0:W.docs)==null?void 0:T.source}}};var L,C,k;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <>
            <Label id="label" htmlFor="switch">
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
}`,...(k=(C=n.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var z,F,N;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => <>
            <Label id="label" htmlFor="switch">
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
}`,...(N=(F=o.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var V,R,U;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(false);
    const onChange = (checked: boolean) => {
      setChecked(checked);
    };
    return <Switch value={checked} onChange={onChange} {...args} />;
  }
}`,...(U=(R=c.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var E,q,I;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <>
            <Switch {...args} size="small" />
            <Switch {...args} size="medium" />
            <Switch {...args} size="large" />
        </>
}`,...(I=(q=d.parameters)==null?void 0:q.docs)==null?void 0:I.source}}};var A,D,H;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(H=(D=h.parameters)==null?void 0:D.docs)==null?void 0:H.source}}};const ce=["Checked","Unchecked","Disabled","Required","WithLabel","WithLabelAndTooltip","ExternallyControlled","Size","HugWidth"];export{s as Checked,l as Disabled,c as ExternallyControlled,h as HugWidth,i as Required,d as Size,r as Unchecked,n as WithLabel,o as WithLabelAndTooltip,ce as __namedExportsOrder,oe as default};
