import{j as e}from"./iframe-DvdOIpuR.js";import{o as n}from"./fondue-icons372-BHS9zo7M.js";import{B as a}from"./Badge-CupaYiO2.js";import"./preload-helper-DI-8CSFo.js";import"./useTranslation-DfLWmo5b.js";const{action:f}=__STORYBOOK_MODULE_ACTIONS__,Ne={title:"Components/Badge",component:a,tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["A small indicator used to highlight status, count, or category. Conveys concise data at a glance without overwhelming the interface.","","**When to use:** To surface metadata, counts, or status alongside other content — such as labels in a list, filter tags, or notification counts.","","**Icon:** Pass an icon as a child alongside the label to add visual context or reinforce meaning."].join(`
`)}}},args:{emphasis:"strong",variant:"default",size:"default",disabled:!1,status:void 0}},r={render:s=>e.jsx(a,{...s,children:"Text"})},t={args:{onClick:f("onClick")},render:s=>e.jsx(a,{...s,children:"Text"})},o={args:{onDismiss:f("onDismiss")},render:s=>e.jsx(a,{...s,children:"Text"})},i={args:{onClick:f("onClick"),onDismiss:f("onDismiss")},render:s=>e.jsx(a,{...s,children:"Text"})},d={args:{status:"positive"},render:s=>e.jsx(a,{...s,children:"Text"})},c={args:{status:{red:40,green:200,blue:100,alpha:1}},render:s=>e.jsx(a,{...s,children:"Text"})},l={args:{status:"#f14394"},render:s=>e.jsx(a,{...s,children:"Text"})},u={render:s=>e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]})},m={args:{onClick:f("onClick")},render:s=>e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]})},g={args:{status:"positive"},render:s=>e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]})},p={args:{status:"positive"},render:s=>e.jsxs(e.Fragment,{children:["before"," ",e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]})," ","after"]})},x={args:{status:"positive"},render:s=>e.jsxs("div",{className:"tw-flex tw-flex-nowrap tw-border tw-border-line-mid tw-rounded-medium tw-p-2 tw-gap-2",children:[e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]}),e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]}),e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]}),e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]}),e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]}),e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]})]})};var h,B,C;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{code:`const LabelOnly = () => (
  <Badge
    emphasis="strong"
    variant="default"
    size="default"
    disabled={false}
    status={undefined}
  >
    Text
  </Badge>
);
`,...(C=(B=r.parameters)==null?void 0:B.docs)==null?void 0:C.source}}};var T,z,v;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{code:`const WithOnClick = () => (
  <Badge
    emphasis="strong"
    variant="default"
    size="default"
    disabled={false}
    status={undefined}
    onClick={action("onClick")}
  >
    Text
  </Badge>
);
`,...(v=(z=t.parameters)==null?void 0:z.docs)==null?void 0:v.source}}};var b,I,j;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{code:`const WithDismiss = () => (
  <Badge
    emphasis="strong"
    variant="default"
    size="default"
    disabled={false}
    status={undefined}
    onDismiss={action("onDismiss")}
  >
    Text
  </Badge>
);
`,...(j=(I=o.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};var w,S,W;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{code:`const WithOnClickAndDismiss = () => (
  <Badge
    emphasis="strong"
    variant="default"
    size="default"
    disabled={false}
    status={undefined}
    onClick={action("onClick")}
    onDismiss={action("onDismiss")}
  >
    Text
  </Badge>
);
`,...(W=(S=i.parameters)==null?void 0:S.docs)==null?void 0:W.source}}};var k,F,D;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{code:`const WithStatus = () => (
  <Badge
    emphasis="strong"
    variant="default"
    size="default"
    disabled={false}
    status="positive"
  >
    Text
  </Badge>
);
`,...(D=(F=d.parameters)==null?void 0:F.docs)==null?void 0:D.source}}};var O,A,_;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{code:`const WithCustomStatusColor = () => (
  <Badge
    emphasis="strong"
    variant="default"
    size="default"
    disabled={false}
    status={{ red: 40, green: 200, blue: 100, alpha: 1 }}
  >
    Text
  </Badge>
);
`,...(_=(A=c.parameters)==null?void 0:A.docs)==null?void 0:_.source}}};var y,E,R;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{code:`const WithCustomStatusString = () => (
  <Badge
    emphasis="strong"
    variant="default"
    size="default"
    disabled={false}
    status="#f14394"
  >
    Text
  </Badge>
);
`,...(R=(E=l.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var L,M,N;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{code:`const WithIcon = () => (
  <Badge
    emphasis="strong"
    variant="default"
    size="default"
    disabled={false}
    status={undefined}
  >
    <IconColorFan size="16" />
    Text
  </Badge>
);
`,...(N=(M=u.parameters)==null?void 0:M.docs)==null?void 0:N.source}}};var K,P,U;m.parameters={...m.parameters,docs:{...(K=m.parameters)==null?void 0:K.docs,source:{code:`const WithOnClickAndIcon = () => (
  <Badge
    emphasis="strong"
    variant="default"
    size="default"
    disabled={false}
    status={undefined}
    onClick={action("onClick")}
  >
    <IconColorFan size="16" />
    Text
  </Badge>
);
`,...(U=(P=m.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};var Y,q,G;g.parameters={...g.parameters,docs:{...(Y=g.parameters)==null?void 0:Y.docs,source:{code:`const WithStatusAndIcon = () => (
  <Badge
    emphasis="strong"
    variant="default"
    size="default"
    disabled={false}
    status="positive"
  >
    <IconColorFan size="16" />
    Text
  </Badge>
);
`,...(G=(q=g.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};var H,J,Q;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{code:`const BetweenElements = () => (
  <>
    before{" "}
    <Badge
      emphasis="strong"
      variant="default"
      size="default"
      disabled={false}
      status="positive"
    >
      <IconColorFan size="16" />
      Text
    </Badge>{" "}
    after
  </>
);
`,...(Q=(J=p.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var V,X,Z;x.parameters={...x.parameters,docs:{...(V=x.parameters)==null?void 0:V.docs,source:{code:`const MultipleBadgesInRow = () => (
  <div className="tw-flex tw-flex-nowrap tw-border tw-border-line-mid tw-rounded-medium tw-p-2 tw-gap-2">
    <Badge
      emphasis="strong"
      variant="default"
      size="default"
      disabled={false}
      status="positive"
    >
      <IconColorFan size="16" />
      Text
    </Badge>
    <Badge
      emphasis="strong"
      variant="default"
      size="default"
      disabled={false}
      status="positive"
    >
      <IconColorFan size="16" />
      Text
    </Badge>
    <Badge
      emphasis="strong"
      variant="default"
      size="default"
      disabled={false}
      status="positive"
    >
      <IconColorFan size="16" />
      Text
    </Badge>
    <Badge
      emphasis="strong"
      variant="default"
      size="default"
      disabled={false}
      status="positive"
    >
      <IconColorFan size="16" />
      Text
    </Badge>
    <Badge
      emphasis="strong"
      variant="default"
      size="default"
      disabled={false}
      status="positive"
    >
      <IconColorFan size="16" />
      Text
    </Badge>
    <Badge
      emphasis="strong"
      variant="default"
      size="default"
      disabled={false}
      status="positive"
    >
      <IconColorFan size="16" />
      Text
    </Badge>
  </div>
);
`,...(Z=(X=x.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,ee,se;r.parameters={...r.parameters,docs:{...($=r.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: args => <Badge {...args}>Text</Badge>
}`,...(se=(ee=r.parameters)==null?void 0:ee.docs)==null?void 0:se.source}}};var ae,ne,re;t.parameters={...t.parameters,docs:{...(ae=t.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => <Badge {...args}>Text</Badge>
}`,...(re=(ne=t.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};var te,oe,ie;o.parameters={...o.parameters,docs:{...(te=o.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    onDismiss: action('onDismiss')
  },
  render: args => <Badge {...args}>Text</Badge>
}`,...(ie=(oe=o.parameters)==null?void 0:oe.docs)==null?void 0:ie.source}}};var de,ce,le;i.parameters={...i.parameters,docs:{...(de=i.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick'),
    onDismiss: action('onDismiss')
  },
  render: args => <Badge {...args}>Text</Badge>
}`,...(le=(ce=i.parameters)==null?void 0:ce.docs)==null?void 0:le.source}}};var ue,me,ge;d.parameters={...d.parameters,docs:{...(ue=d.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    status: 'positive'
  },
  render: args => <Badge {...args}>Text</Badge>
}`,...(ge=(me=d.parameters)==null?void 0:me.docs)==null?void 0:ge.source}}};var pe,xe,fe;c.parameters={...c.parameters,docs:{...(pe=c.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    status: {
      red: 40,
      green: 200,
      blue: 100,
      alpha: 1
    }
  },
  render: args => <Badge {...args}>Text</Badge>
}`,...(fe=(xe=c.parameters)==null?void 0:xe.docs)==null?void 0:fe.source}}};var he,Be,Ce;l.parameters={...l.parameters,docs:{...(he=l.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    status: '#f14394'
  },
  render: args => <Badge {...args}>Text</Badge>
}`,...(Ce=(Be=l.parameters)==null?void 0:Be.docs)==null?void 0:Ce.source}}};var Te,ze,ve;u.parameters={...u.parameters,docs:{...(Te=u.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  render: args => <Badge {...args}>
            <IconColorFan size="16" /> Text
        </Badge>
}`,...(ve=(ze=u.parameters)==null?void 0:ze.docs)==null?void 0:ve.source}}};var be,Ie,je;m.parameters={...m.parameters,docs:{...(be=m.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => <Badge {...args}>
            <IconColorFan size="16" /> Text
        </Badge>
}`,...(je=(Ie=m.parameters)==null?void 0:Ie.docs)==null?void 0:je.source}}};var we,Se,We;g.parameters={...g.parameters,docs:{...(we=g.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    status: 'positive'
  },
  render: args => <Badge {...args}>
            <IconColorFan size="16" /> Text
        </Badge>
}`,...(We=(Se=g.parameters)==null?void 0:Se.docs)==null?void 0:We.source}}};var ke,Fe,De;p.parameters={...p.parameters,docs:{...(ke=p.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  args: {
    status: 'positive'
  },
  render: args => <>
            before{' '}
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>{' '}
            after
        </>
}`,...(De=(Fe=p.parameters)==null?void 0:Fe.docs)==null?void 0:De.source}}};var Oe,Ae,_e;x.parameters={...x.parameters,docs:{...(Oe=x.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  args: {
    status: 'positive'
  },
  render: args => <div className="tw-flex tw-flex-nowrap tw-border tw-border-line-mid tw-rounded-medium tw-p-2 tw-gap-2">
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
        </div>
}`,...(_e=(Ae=x.parameters)==null?void 0:Ae.docs)==null?void 0:_e.source}}};const Ke=["LabelOnly","WithOnClick","WithDismiss","WithOnClickAndDismiss","WithStatus","WithCustomStatusColor","WithCustomStatusString","WithIcon","WithOnClickAndIcon","WithStatusAndIcon","BetweenElements","MultipleBadgesInRow"];export{p as BetweenElements,r as LabelOnly,x as MultipleBadgesInRow,c as WithCustomStatusColor,l as WithCustomStatusString,o as WithDismiss,u as WithIcon,t as WithOnClick,i as WithOnClickAndDismiss,m as WithOnClickAndIcon,d as WithStatus,g as WithStatusAndIcon,Ke as __namedExportsOrder,Ne as default};
