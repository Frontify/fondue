import{j as e,r as Le}from"./iframe-BFXen_90.js";import{a as qe}from"./fondue-icons372-T7pat355.js";import{L as m}from"./Label-BlKKA5da.js";import{T as p}from"./Tooltip-DEOMjaja.js";import{S as r}from"./Switch-BHnLoMuT.js";import"./preload-helper-zta_rV5C.js";import"./index-CwYAFCvv.js";import"./index-Svl1cd0K.js";import"./index-D2WKvZJx.js";import"./index-DyHle8MK.js";import"./index-qQ-IYaEI.js";import"./index-CqyUdOCB.js";import"./useTranslation-yxPdHx5u.js";const He={title:"Components/Switch",component:r,tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["A toggle control for binary on/off settings. Applies the change immediately without requiring a form submission.","",'**When to use:** For instant-effect settings like "Enable notifications" or "Dark mode." For choices that require confirmation, use a Checkbox with a submit button instead.',"","**Label:** Always pair with a `<Label>` for accessibility. Place the label to the left of the switch."].join(`
`)}}},argTypes:{size:{control:{type:"select",options:["small","medium","large"]}}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"},decorators:[a=>e.jsx("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:e.jsx(a,{})})]},t={args:{defaultValue:!0}},s={args:{defaultValue:!1}},l={args:{defaultValue:!1,disabled:!0}},n={args:{defaultValue:!1,required:!0}},i={render:a=>e.jsxs(e.Fragment,{children:[e.jsx(m,{id:"label",htmlFor:"switch",required:a.required,children:"Switch"}),e.jsx(r,{...a,id:"switch","aria-labelledby":"label"})]})},o={args:{required:!0},render:a=>e.jsxs(e.Fragment,{children:[e.jsx(m,{id:"label",htmlFor:"switch",required:a.required,children:"Switch"}),e.jsx(r,{...a,id:"switch","aria-labelledby":"label"})]})},d={render:a=>e.jsxs(e.Fragment,{children:[e.jsxs(m,{id:"label",htmlFor:"switch",required:a.required,children:["Switch",e.jsxs(p.Root,{children:[e.jsx(p.Trigger,{children:e.jsx(qe,{size:"16"})}),e.jsx(p.Content,{children:"Tooltip"})]})]}),e.jsx(r,{...a,id:"switch","aria-labelledby":"label"})]})},c={render:a=>{const[je,Te]=Le.useState(!1),ve=ye=>{Te(ye)};return e.jsx(r,{value:je,onChange:ve,...a})}},h={render:a=>e.jsxs(e.Fragment,{children:[e.jsx(r,{...a,size:"small"}),e.jsx(r,{...a,size:"medium"}),e.jsx(r,{...a,size:"large"})]})},u={render:a=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"tw-mb-2",children:"hugWidth: true (default) - Use flex with gap"}),e.jsxs("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:[e.jsx(m,{id:"label-hug-true",htmlFor:"switch-hug-true",children:"Label"}),e.jsx(r,{...a,id:"switch-hug-true","aria-labelledby":"label-hug-true"})]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"tw-mb-2",children:"hugWidth: false - Use flex with justify-between and full width"}),e.jsxs("div",{className:"tw-flex tw-justify-between tw-items-center tw-w-full",children:[e.jsx(m,{id:"label-hug-false",htmlFor:"switch-hug-false",children:"Label"}),e.jsx(r,{...a,id:"switch-hug-false","aria-labelledby":"label-hug-false"})]})]})]}),decorators:[],parameters:{docs:{description:{story:"The Switch component does not have a `hugWidth` prop. Instead, control the layout using flex container styles. When `hugWidth: true`, use a flex container with a small gap. When `hugWidth: false`, use a flex container with `justify-between` and full width."}}}};var g,b,w;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{code:`const Checked = () => (
  <Switch id="airplane-mode" aria-label="Toggle airplane mode" defaultValue />
);
`,...(w=(b=t.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var f,x,S;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{code:`const Unchecked = () => (
  <Switch
    id="airplane-mode"
    aria-label="Toggle airplane mode"
    defaultValue={false}
  />
);
`,...(S=(x=s.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var j,T,v;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{code:`const Disabled = () => (
  <Switch
    id="airplane-mode"
    aria-label="Toggle airplane mode"
    defaultValue={false}
    disabled
  />
);
`,...(v=(T=l.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var y,L,q;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{code:`const Required = () => (
  <Switch
    id="airplane-mode"
    aria-label="Toggle airplane mode"
    defaultValue={false}
    required
  />
);
`,...(q=(L=n.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};var W,C,k;i.parameters={...i.parameters,docs:{...(W=i.parameters)==null?void 0:W.docs,source:{code:`const WithLabel = () => (
  <>
    <Label id="label" htmlFor="switch" required={args.required}>
      Switch
    </Label>
    <Switch
      aria-label="Toggle airplane mode"
      id="switch"
      aria-labelledby="label"
    />
  </>
);
`,...(k=(C=i.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var F,z,N;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{code:`const WithLabelRequired = () => (
  <>
    <Label id="label" htmlFor="switch" required>
      Switch
    </Label>
    <Switch
      aria-label="Toggle airplane mode"
      required
      id="switch"
      aria-labelledby="label"
    />
  </>
);
`,...(N=(z=o.parameters)==null?void 0:z.docs)==null?void 0:N.source}}};var R,V,U;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{code:`const WithLabelAndTooltip = () => (
  <>
    <Label id="label" htmlFor="switch" required={args.required}>
      Switch
      <Tooltip.Root>
        <Tooltip.Trigger>
          <IconQuestionMarkCircle size="16" />
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Label>
    <Switch
      aria-label="Toggle airplane mode"
      id="switch"
      aria-labelledby="label"
    />
  </>
);
`,...(U=(V=d.parameters)==null?void 0:V.docs)==null?void 0:U.source}}};var E,A,D;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{code:`const ExternallyControlled = () => {
  const [checked, setChecked] = useState(false);

  const onChange = (checked: boolean) => {
    setChecked(checked);
  };

  return (
    <Switch
      value={checked}
      onChange={onChange}
      id="airplane-mode"
      aria-label="Toggle airplane mode"
    />
  );
};
`,...(D=(A=c.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var I,H,M;h.parameters={...h.parameters,docs:{...(I=h.parameters)==null?void 0:I.docs,source:{code:`const Size = () => (
  <>
    <Switch id="airplane-mode" aria-label="Toggle airplane mode" size="small" />
    <Switch
      id="airplane-mode"
      aria-label="Toggle airplane mode"
      size="medium"
    />
    <Switch id="airplane-mode" aria-label="Toggle airplane mode" size="large" />
  </>
);
`,...(M=(H=h.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var Q,_,O;u.parameters={...u.parameters,docs:{...(Q=u.parameters)==null?void 0:Q.docs,source:{code:`const HugWidth = () => (
  <div className="tw-flex tw-flex-col tw-gap-4">
    <div>
      <div className="tw-mb-2">
        hugWidth: true (default) - Use flex with gap
      </div>
      <div className="tw-flex tw-gap-1.5 tw-items-center">
        <Label id="label-hug-true" htmlFor="switch-hug-true">
          Label
        </Label>
        <Switch
          aria-label="Toggle airplane mode"
          id="switch-hug-true"
          aria-labelledby="label-hug-true"
        />
      </div>
    </div>
    <div>
      <div className="tw-mb-2">
        hugWidth: false - Use flex with justify-between and full width
      </div>
      <div className="tw-flex tw-justify-between tw-items-center tw-w-full">
        <Label id="label-hug-false" htmlFor="switch-hug-false">
          Label
        </Label>
        <Switch
          aria-label="Toggle airplane mode"
          id="switch-hug-false"
          aria-labelledby="label-hug-false"
        />
      </div>
    </div>
  </div>
);
`,...(O=(_=u.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};var P,B,G;t.parameters={...t.parameters,docs:{...(P=t.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    defaultValue: true
  }
}`,...(G=(B=t.parameters)==null?void 0:B.docs)==null?void 0:G.source}}};var J,K,X;s.parameters={...s.parameters,docs:{...(J=s.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    defaultValue: false
  }
}`,...(X=(K=s.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};var Y,Z,$;l.parameters={...l.parameters,docs:{...(Y=l.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    disabled: true
  }
}`,...($=(Z=l.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,ae,re;n.parameters={...n.parameters,docs:{...(ee=n.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    required: true
  }
}`,...(re=(ae=n.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var te,se,le;i.parameters={...i.parameters,docs:{...(te=i.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: args => <>
            <Label id="label" htmlFor="switch" required={args.required}>
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
}`,...(le=(se=i.parameters)==null?void 0:se.docs)==null?void 0:le.source}}};var ne,ie,oe;o.parameters={...o.parameters,docs:{...(ne=o.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    required: true
  },
  render: args => <>
            <Label id="label" htmlFor="switch" required={args.required}>
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
}`,...(oe=(ie=o.parameters)==null?void 0:ie.docs)==null?void 0:oe.source}}};var de,ce,he;d.parameters={...d.parameters,docs:{...(de=d.parameters)==null?void 0:de.docs,source:{originalSource:`{
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
}`,...(he=(ce=d.parameters)==null?void 0:ce.docs)==null?void 0:he.source}}};var ue,me,pe;c.parameters={...c.parameters,docs:{...(ue=c.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(false);
    const onChange = (checked: boolean) => {
      setChecked(checked);
    };
    return <Switch value={checked} onChange={onChange} {...args} />;
  }
}`,...(pe=(me=c.parameters)==null?void 0:me.docs)==null?void 0:pe.source}}};var ge,be,we;h.parameters={...h.parameters,docs:{...(ge=h.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: args => <>
            <Switch {...args} size="small" />
            <Switch {...args} size="medium" />
            <Switch {...args} size="large" />
        </>
}`,...(we=(be=h.parameters)==null?void 0:be.docs)==null?void 0:we.source}}};var fe,xe,Se;u.parameters={...u.parameters,docs:{...(fe=u.parameters)==null?void 0:fe.docs,source:{originalSource:`{
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
}`,...(Se=(xe=u.parameters)==null?void 0:xe.docs)==null?void 0:Se.source}}};const Me=["Checked","Unchecked","Disabled","Required","WithLabel","WithLabelRequired","WithLabelAndTooltip","ExternallyControlled","Size","HugWidth"];export{t as Checked,l as Disabled,c as ExternallyControlled,u as HugWidth,n as Required,h as Size,s as Unchecked,i as WithLabel,d as WithLabelAndTooltip,o as WithLabelRequired,Me as __namedExportsOrder,He as default};
