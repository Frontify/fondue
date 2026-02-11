import{j as e}from"./iframe-Daulk9LM.js";import{o as n}from"./fondue-icons372-BWvkyUkX.js";import{B as a}from"./Badge-BSZAcQ7p.js";import"./preload-helper-DI-8CSFo.js";import"./useTranslation-NqToP_WS.js";const{action:f}=__STORYBOOK_MODULE_ACTIONS__,Me={title:"Components/Badge",component:a,tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["The badge component is a small indicator used to highlight status, count, or contextual information.","","It helps convey concise data at a glance, enhancing clarity without overwhelming the interface.","","Badges follow a simple, flexible structure. At their core, they include a label, with optional elements that enhance their meaning or interactivity. Each part plays a role in making the badge more informative, functional, or visually distinct depending on your use case.","","**Emphasis:** Use emphasis to control visual hierarchy and draw attention appropriately. Badges can appear with either a `strong` or `weak` emphasis, depending on the level of visibility needed. Use `strong` for primary, high-priority information, and `weak` for more subtle or secondary content.","","**Variant:** Variants help convey the context or meaning behind a badge at a glance. Choose the variant based on the message you want to communicate — whether it's neutral, positive, attention-grabbing, cautionary, or critical.","","**Size:** Badges come in two sizes to support different layout needs. Use the smaller size when space is limited or when the badge plays a secondary role in the interface. Always consider visual hierarchy and surrounding elements when selecting a size.","","**Status:** Use the status dot to reflect live states, activity, or system indicators. Only use it when status context is meaningful to the user.","","**Icon:** Use a leading icon to add visual context or reinforce meaning. Add this when the badge needs an extra visual cue.","","**Dismissible:** Use dismissible badges when they represent content that users can remove on their own. They're especially useful in contexts like filters or selections."].join(`
`)}}},args:{emphasis:"strong",variant:"default",size:"default",disabled:!1,status:void 0}},t={render:s=>e.jsx(a,{...s,children:"Text"})},r={args:{onClick:f("onClick")},render:s=>e.jsx(a,{...s,children:"Text"})},o={args:{onDismiss:f("onDismiss")},render:s=>e.jsx(a,{...s,children:"Text"})},i={args:{onClick:f("onClick"),onDismiss:f("onDismiss")},render:s=>e.jsx(a,{...s,children:"Text"})},d={args:{status:"positive"},render:s=>e.jsx(a,{...s,children:"Text"})},c={args:{status:{red:40,green:200,blue:100,alpha:1}},render:s=>e.jsx(a,{...s,children:"Text"})},l={args:{status:"#f14394"},render:s=>e.jsx(a,{...s,children:"Text"})},u={render:s=>e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]})},m={args:{onClick:f("onClick")},render:s=>e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]})},g={args:{status:"positive"},render:s=>e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]})},p={args:{status:"positive"},render:s=>e.jsxs(e.Fragment,{children:["before"," ",e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]})," ","after"]})},h={args:{status:"positive"},render:s=>e.jsxs("div",{className:"tw-flex tw-flex-nowrap tw-border tw-border-line-mid tw-rounded-medium tw-p-2 tw-gap-2",children:[e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]}),e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]}),e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]}),e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]}),e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]}),e.jsxs(a,{...s,children:[e.jsx(n,{size:"16"})," Text"]})]})};var x,B,C;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{code:`const LabelOnly = () => (
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
`,...(C=(B=t.parameters)==null?void 0:B.docs)==null?void 0:C.source}}};var v,T,z;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{code:`const WithOnClick = () => (
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
`,...(z=(T=r.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};var b,w,I;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{code:`const WithDismiss = () => (
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
`,...(I=(w=o.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};var j,k,y;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{code:`const WithOnClickAndDismiss = () => (
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
`,...(y=(k=i.parameters)==null?void 0:k.docs)==null?void 0:y.source}}};var S,W,F;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{code:`const WithStatus = () => (
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
`,...(F=(W=d.parameters)==null?void 0:W.docs)==null?void 0:F.source}}};var D,O,A;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{code:`const WithCustomStatusColor = () => (
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
`,...(A=(O=c.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var E,_,U;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{code:`const WithCustomStatusString = () => (
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
`,...(U=(_=l.parameters)==null?void 0:_.docs)==null?void 0:U.source}}};var R,L,M;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{code:`const WithIcon = () => (
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
`,...(M=(L=u.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};var N,V,K;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{code:`const WithOnClickAndIcon = () => (
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
`,...(K=(V=m.parameters)==null?void 0:V.docs)==null?void 0:K.source}}};var Y,q,G;g.parameters={...g.parameters,docs:{...(Y=g.parameters)==null?void 0:Y.docs,source:{code:`const WithStatusAndIcon = () => (
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
`,...(G=(q=g.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};var H,J,P;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{code:`const BetweenElements = () => (
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
`,...(P=(J=p.parameters)==null?void 0:J.docs)==null?void 0:P.source}}};var Q,X,Z;h.parameters={...h.parameters,docs:{...(Q=h.parameters)==null?void 0:Q.docs,source:{code:`const MultipleBadgesInRow = () => (
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
`,...(Z=(X=h.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,ee,se;t.parameters={...t.parameters,docs:{...($=t.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: args => <Badge {...args}>Text</Badge>
}`,...(se=(ee=t.parameters)==null?void 0:ee.docs)==null?void 0:se.source}}};var ae,ne,te;r.parameters={...r.parameters,docs:{...(ae=r.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => <Badge {...args}>Text</Badge>
}`,...(te=(ne=r.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};var re,oe,ie;o.parameters={...o.parameters,docs:{...(re=o.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(ge=(me=d.parameters)==null?void 0:me.docs)==null?void 0:ge.source}}};var pe,he,fe;c.parameters={...c.parameters,docs:{...(pe=c.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    status: {
      red: 40,
      green: 200,
      blue: 100,
      alpha: 1
    }
  },
  render: args => <Badge {...args}>Text</Badge>
}`,...(fe=(he=c.parameters)==null?void 0:he.docs)==null?void 0:fe.source}}};var xe,Be,Ce;l.parameters={...l.parameters,docs:{...(xe=l.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    status: '#f14394'
  },
  render: args => <Badge {...args}>Text</Badge>
}`,...(Ce=(Be=l.parameters)==null?void 0:Be.docs)==null?void 0:Ce.source}}};var ve,Te,ze;u.parameters={...u.parameters,docs:{...(ve=u.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  render: args => <Badge {...args}>
            <IconColorFan size="16" /> Text
        </Badge>
}`,...(ze=(Te=u.parameters)==null?void 0:Te.docs)==null?void 0:ze.source}}};var be,we,Ie;m.parameters={...m.parameters,docs:{...(be=m.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => <Badge {...args}>
            <IconColorFan size="16" /> Text
        </Badge>
}`,...(Ie=(we=m.parameters)==null?void 0:we.docs)==null?void 0:Ie.source}}};var je,ke,ye;g.parameters={...g.parameters,docs:{...(je=g.parameters)==null?void 0:je.docs,source:{originalSource:`{
  args: {
    status: 'positive'
  },
  render: args => <Badge {...args}>
            <IconColorFan size="16" /> Text
        </Badge>
}`,...(ye=(ke=g.parameters)==null?void 0:ke.docs)==null?void 0:ye.source}}};var Se,We,Fe;p.parameters={...p.parameters,docs:{...(Se=p.parameters)==null?void 0:Se.docs,source:{originalSource:`{
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
}`,...(Fe=(We=p.parameters)==null?void 0:We.docs)==null?void 0:Fe.source}}};var De,Oe,Ae;h.parameters={...h.parameters,docs:{...(De=h.parameters)==null?void 0:De.docs,source:{originalSource:`{
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
}`,...(Ae=(Oe=h.parameters)==null?void 0:Oe.docs)==null?void 0:Ae.source}}};const Ne=["LabelOnly","WithOnClick","WithDismiss","WithOnClickAndDismiss","WithStatus","WithCustomStatusColor","WithCustomStatusString","WithIcon","WithOnClickAndIcon","WithStatusAndIcon","BetweenElements","MultipleBadgesInRow"];export{p as BetweenElements,t as LabelOnly,h as MultipleBadgesInRow,c as WithCustomStatusColor,l as WithCustomStatusString,o as WithDismiss,u as WithIcon,r as WithOnClick,i as WithOnClickAndDismiss,m as WithOnClickAndIcon,d as WithStatus,g as WithStatusAndIcon,Ne as __namedExportsOrder,Me as default};
