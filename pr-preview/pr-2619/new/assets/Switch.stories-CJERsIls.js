import{j as e,r as ye}from"./iframe-CX7tcpdI.js";import{a as qe}from"./fondue-icons372-e6cpwyN1.js";import{L as m}from"./Label-CkgL-Vqr.js";import{T as p}from"./Tooltip-bqae1fCx.js";import{S as r}from"./Switch-C87iXq-b.js";import"./preload-helper-CZVL1Juu.js";import"./index-DiImnGHp.js";import"./index-ChHnDU6H.js";import"./index-BZ7LIGok.js";import"./index-CLUDQUPv.js";import"./index-DLW95kC-.js";import"./index-B34Kh4P_.js";import"./useTranslation-DvRi5aXr.js";const He={title:"Components/Switch",component:r,tags:["autodocs"],parameters:{status:{type:"released"}},argTypes:{size:{control:{type:"select",options:["small","medium","large"]}}},args:{id:"airplane-mode","aria-label":"Toggle airplane mode"},decorators:[a=>e.jsx("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:e.jsx(a,{})})]},s={args:{defaultValue:!0}},t={args:{defaultValue:!1}},l={args:{defaultValue:!1,disabled:!0}},n={args:{defaultValue:!1,required:!0}},i={render:a=>e.jsxs(e.Fragment,{children:[e.jsx(m,{id:"label",htmlFor:"switch",required:a.required,children:"Switch"}),e.jsx(r,{...a,id:"switch","aria-labelledby":"label"})]})},o={args:{required:!0},render:a=>e.jsxs(e.Fragment,{children:[e.jsx(m,{id:"label",htmlFor:"switch",required:a.required,children:"Switch"}),e.jsx(r,{...a,id:"switch","aria-labelledby":"label"})]})},d={render:a=>e.jsxs(e.Fragment,{children:[e.jsxs(m,{id:"label",htmlFor:"switch",required:a.required,children:["Switch",e.jsxs(p.Root,{children:[e.jsx(p.Trigger,{children:e.jsx(qe,{size:"16"})}),e.jsx(p.Content,{children:"Tooltip"})]})]}),e.jsx(r,{...a,id:"switch","aria-labelledby":"label"})]})},c={render:a=>{const[Te,je]=ye.useState(!1),ve=Le=>{je(Le)};return e.jsx(r,{value:Te,onChange:ve,...a})}},u={render:a=>e.jsxs(e.Fragment,{children:[e.jsx(r,{...a,size:"small"}),e.jsx(r,{...a,size:"medium"}),e.jsx(r,{...a,size:"large"})]})},h={render:a=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"tw-mb-2",children:"hugWidth: true (default) - Use flex with gap"}),e.jsxs("div",{className:"tw-flex tw-gap-1.5 tw-items-center",children:[e.jsx(m,{id:"label-hug-true",htmlFor:"switch-hug-true",children:"Label"}),e.jsx(r,{...a,id:"switch-hug-true","aria-labelledby":"label-hug-true"})]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"tw-mb-2",children:"hugWidth: false - Use flex with justify-between and full width"}),e.jsxs("div",{className:"tw-flex tw-justify-between tw-items-center tw-w-full",children:[e.jsx(m,{id:"label-hug-false",htmlFor:"switch-hug-false",children:"Label"}),e.jsx(r,{...a,id:"switch-hug-false","aria-labelledby":"label-hug-false"})]})]})]}),decorators:[],parameters:{docs:{description:{story:"The Switch component does not have a `hugWidth` prop. Instead, control the layout using flex container styles. When `hugWidth: true`, use a flex container with a small gap. When `hugWidth: false`, use a flex container with `justify-between` and full width."}}}};var g,b,w;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{code:`const Checked = () => (
  <Switch id="airplane-mode" aria-label="Toggle airplane mode" defaultValue />
);
`,...(w=(b=s.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var f,x,S;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{code:`const Unchecked = () => (
  <Switch
    id="airplane-mode"
    aria-label="Toggle airplane mode"
    defaultValue={false}
  />
);
`,...(S=(x=t.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var T,j,v;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{code:`const Disabled = () => (
  <Switch
    id="airplane-mode"
    aria-label="Toggle airplane mode"
    defaultValue={false}
    disabled
  />
);
`,...(v=(j=l.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var L,y,q;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{code:`const Required = () => (
  <Switch
    id="airplane-mode"
    aria-label="Toggle airplane mode"
    defaultValue={false}
    required
  />
);
`,...(q=(y=n.parameters)==null?void 0:y.docs)==null?void 0:q.source}}};var W,C,k;i.parameters={...i.parameters,docs:{...(W=i.parameters)==null?void 0:W.docs,source:{code:`const WithLabel = () => (
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
`,...(U=(V=d.parameters)==null?void 0:V.docs)==null?void 0:U.source}}};var E,I,A;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{code:`const ExternallyControlled = () => {
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
`,...(A=(I=c.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};var D,H,M;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{code:`const Size = () => (
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
`,...(M=(H=u.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var Q,_,O;h.parameters={...h.parameters,docs:{...(Q=h.parameters)==null?void 0:Q.docs,source:{code:`const HugWidth = () => (
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
`,...(O=(_=h.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};var B,G,J;s.parameters={...s.parameters,docs:{...(B=s.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    defaultValue: true
  }
}`,...(J=(G=s.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,P,X;t.parameters={...t.parameters,docs:{...(K=t.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    defaultValue: false
  }
}`,...(X=(P=t.parameters)==null?void 0:P.docs)==null?void 0:X.source}}};var Y,Z,$;l.parameters={...l.parameters,docs:{...(Y=l.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    disabled: true
  }
}`,...($=(Z=l.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,ae,re;n.parameters={...n.parameters,docs:{...(ee=n.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    defaultValue: false,
    required: true
  }
}`,...(re=(ae=n.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var se,te,le;i.parameters={...i.parameters,docs:{...(se=i.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: args => <>
            <Label id="label" htmlFor="switch" required={args.required}>
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
}`,...(le=(te=i.parameters)==null?void 0:te.docs)==null?void 0:le.source}}};var ne,ie,oe;o.parameters={...o.parameters,docs:{...(ne=o.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    required: true
  },
  render: args => <>
            <Label id="label" htmlFor="switch" required={args.required}>
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
}`,...(oe=(ie=o.parameters)==null?void 0:ie.docs)==null?void 0:oe.source}}};var de,ce,ue;d.parameters={...d.parameters,docs:{...(de=d.parameters)==null?void 0:de.docs,source:{originalSource:`{
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
}`,...(ue=(ce=d.parameters)==null?void 0:ce.docs)==null?void 0:ue.source}}};var he,me,pe;c.parameters={...c.parameters,docs:{...(he=c.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: args => {
    const [checked, setChecked] = useState(false);
    const onChange = (checked: boolean) => {
      setChecked(checked);
    };
    return <Switch value={checked} onChange={onChange} {...args} />;
  }
}`,...(pe=(me=c.parameters)==null?void 0:me.docs)==null?void 0:pe.source}}};var ge,be,we;u.parameters={...u.parameters,docs:{...(ge=u.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: args => <>
            <Switch {...args} size="small" />
            <Switch {...args} size="medium" />
            <Switch {...args} size="large" />
        </>
}`,...(we=(be=u.parameters)==null?void 0:be.docs)==null?void 0:we.source}}};var fe,xe,Se;h.parameters={...h.parameters,docs:{...(fe=h.parameters)==null?void 0:fe.docs,source:{originalSource:`{
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
}`,...(Se=(xe=h.parameters)==null?void 0:xe.docs)==null?void 0:Se.source}}};const Me=["Checked","Unchecked","Disabled","Required","WithLabel","WithLabelRequired","WithLabelAndTooltip","ExternallyControlled","Size","HugWidth"];export{s as Checked,l as Disabled,c as ExternallyControlled,h as HugWidth,n as Required,u as Size,t as Unchecked,i as WithLabel,d as WithLabelAndTooltip,o as WithLabelRequired,Me as __namedExportsOrder,He as default};
