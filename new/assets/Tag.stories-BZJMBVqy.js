import{j as e}from"./iframe-BP0PRtYc.js";import{o as s,m as an}from"./fondue-icons372-Ci6BWFoG.js";import{T as sn,a as rn,b as a}from"./Tag-BceHhNXO.js";import"./preload-helper-C1FmrZbK.js";const{action:h}=__STORYBOOK_MODULE_ACTIONS__,ln={title:"Components/Tag",component:a,subcomponents:{"Tag.HoverContent":rn,"Tag.SecondaryContent":sn},tags:["autodocs"],parameters:{status:{type:"released"}},args:{emphasis:"strong",variant:"default",size:"default",disabled:!1}},r={render:n=>e.jsx(a,{...n,children:"Text"})},o={render:n=>e.jsxs(a,{...n,children:["Text",e.jsx(a.SecondaryContent,{children:"Secondary"})]})},t={args:{onClick:h("onClick")},render:n=>e.jsx(a,{...n,children:"Text"})},c={args:{onDismiss:h("onDismiss")},render:n=>e.jsx(a,{...n,children:"Text"})},i={args:{onAddClick:h("onAddClick")},render:n=>e.jsx(a,{...n,children:"Text"})},d={args:{onClick:h("onClick"),onDismiss:h("onDismiss")},render:n=>e.jsx(a,{...n,children:"Text"})},l={render:n=>e.jsxs(a,{...n,children:[e.jsx(s,{size:"16"}),"Text"]})},g={render:n=>e.jsxs(a,{...n,children:[e.jsx(s,{size:"16"}),"Text",e.jsx(s,{size:"16"})]})},m={args:{onClick:h("onClick")},render:n=>e.jsxs(a,{...n,children:[e.jsx(s,{size:"16"})," Text"]})},T={render:n=>e.jsxs(e.Fragment,{children:["before"," ",e.jsxs(a,{...n,children:[e.jsx(s,{size:"16"})," Text"]})," ","after"]})},p={args:{onClick:h("onClick")},render:n=>e.jsxs(a,{...n,children:["This is a tag!",e.jsx(a.HoverContent,{children:e.jsx("div",{className:"tw-flex tw-w-full tw-justify-center",children:e.jsx(an,{})})})]})},u={render:n=>e.jsxs(a,{...n,children:[e.jsx(a.SecondaryContent,{children:"Before"}),"Main content"]})},C={render:n=>e.jsxs(a,{...n,children:[e.jsx(a.SecondaryContent,{children:"First"}),"Main content",e.jsx(a.SecondaryContent,{children:"Second"})]})},x={args:{onClick:h("onClick")},render:n=>e.jsxs(a,{...n,children:[e.jsx(a.SecondaryContent,{children:"Prefix"}),"Main content",e.jsx(a.HoverContent,{children:e.jsx(an,{})}),e.jsx(a.SecondaryContent,{children:"Suffix"})]})},f={render:n=>e.jsxs("div",{className:"tw-flex tw-flex-nowrap tw-border tw-border-line-mid tw-rounded-medium tw-p-2 tw-gap-2",children:[e.jsxs(a,{...n,children:[e.jsx(s,{size:"16"})," Text"]}),e.jsxs(a,{...n,children:[e.jsx(s,{size:"16"})," Text"]}),e.jsxs(a,{...n,children:[e.jsx(s,{size:"16"})," Text"]}),e.jsxs(a,{...n,children:[e.jsx(s,{size:"16"})," Text"]}),e.jsxs(a,{...n,children:[e.jsx(s,{size:"16"})," Text"]}),e.jsxs(a,{...n,children:[e.jsx(s,{size:"16"})," Text"]})]})};var S,z,y;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{code:`const LabelOnly = () => (
  <Tag emphasis="strong" variant="default" size="default" disabled={false}>
    Text
  </Tag>
);
`,...(y=(z=r.parameters)==null?void 0:z.docs)==null?void 0:y.source}}};var j,v,k;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{code:`const WithSecondaryContent = () => (
  <Tag emphasis="strong" variant="default" size="default" disabled={false}>
    Text
    <Tag.SecondaryContent>Secondary</Tag.SecondaryContent>
  </Tag>
);
`,...(k=(v=o.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};var w,I,b;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{code:`const WithOnClick = () => (
  <Tag
    emphasis="strong"
    variant="default"
    size="default"
    disabled={false}
    onClick={action("onClick")}
  >
    Text
  </Tag>
);
`,...(b=(I=t.parameters)==null?void 0:I.docs)==null?void 0:b.source}}};var W,F,D;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{code:`const WithDismiss = () => (
  <Tag
    emphasis="strong"
    variant="default"
    size="default"
    disabled={false}
    onDismiss={action("onDismiss")}
  >
    Text
  </Tag>
);
`,...(D=(F=c.parameters)==null?void 0:F.docs)==null?void 0:D.source}}};var O,H,A;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{code:`const WithAddable = () => (
  <Tag
    emphasis="strong"
    variant="default"
    size="default"
    disabled={false}
    onAddClick={action("onAddClick")}
  >
    Text
  </Tag>
);
`,...(A=(H=i.parameters)==null?void 0:H.docs)==null?void 0:A.source}}};var B,M,_;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{code:`const WithOnClickAndDismiss = () => (
  <Tag
    emphasis="strong"
    variant="default"
    size="default"
    disabled={false}
    onClick={action("onClick")}
    onDismiss={action("onDismiss")}
  >
    Text
  </Tag>
);
`,...(_=(M=d.parameters)==null?void 0:M.docs)==null?void 0:_.source}}};var N,E,R;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{code:`const WithIcon = () => (
  <Tag emphasis="strong" variant="default" size="default" disabled={false}>
    <IconColorFan size="16" />
    Text
  </Tag>
);
`,...(R=(E=l.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var L,P,K;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{code:`const WithIconOnBothSides = () => (
  <Tag emphasis="strong" variant="default" size="default" disabled={false}>
    <IconColorFan size="16" />
    Text
    <IconColorFan size="16" />
  </Tag>
);
`,...(K=(P=g.parameters)==null?void 0:P.docs)==null?void 0:K.source}}};var U,Y,q;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{code:`const WithOnClickAndIcon = () => (
  <Tag
    emphasis="strong"
    variant="default"
    size="default"
    disabled={false}
    onClick={action("onClick")}
  >
    <IconColorFan size="16" />
    Text
  </Tag>
);
`,...(q=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:q.source}}};var G,J,Q;T.parameters={...T.parameters,docs:{...(G=T.parameters)==null?void 0:G.docs,source:{code:`const BetweenElements = () => (
  <>
    before{" "}
    <Tag emphasis="strong" variant="default" size="default" disabled={false}>
      <IconColorFan size="16" />
      Text
    </Tag>{" "}
    after
  </>
);
`,...(Q=(J=T.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var V,X,Z;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{code:`const WithHoverContent = () => {
  return (
    <Tag
      emphasis="strong"
      variant="default"
      size="default"
      disabled={false}
      onClick={action("onClick")}
    >
      This is a tag!
      <Tag.HoverContent>
        <div className="tw-flex tw-w-full tw-justify-center">
          <IconDotsHorizontal />
        </div>
      </Tag.HoverContent>
    </Tag>
  );
};
`,...(Z=(X=p.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,ee,ne;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{code:`const WithSecondaryContentBefore = () => {
  return (
    <Tag emphasis="strong" variant="default" size="default" disabled={false}>
      <Tag.SecondaryContent>Before</Tag.SecondaryContent>Main content
    </Tag>
  );
};
`,...(ne=(ee=u.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var ae,se,re;C.parameters={...C.parameters,docs:{...(ae=C.parameters)==null?void 0:ae.docs,source:{code:`const WithMultipleSecondaryContent = () => {
  return (
    <Tag emphasis="strong" variant="default" size="default" disabled={false}>
      <Tag.SecondaryContent>First</Tag.SecondaryContent>Main content
      <Tag.SecondaryContent>Second</Tag.SecondaryContent>
    </Tag>
  );
};
`,...(re=(se=C.parameters)==null?void 0:se.docs)==null?void 0:re.source}}};var oe,te,ce;x.parameters={...x.parameters,docs:{...(oe=x.parameters)==null?void 0:oe.docs,source:{code:`const WithBothSlotTypes = () => {
  return (
    <Tag
      emphasis="strong"
      variant="default"
      size="default"
      disabled={false}
      onClick={action("onClick")}
    >
      <Tag.SecondaryContent>Prefix</Tag.SecondaryContent>Main content
      <Tag.HoverContent>
        <IconDotsHorizontal />
      </Tag.HoverContent>
      <Tag.SecondaryContent>Suffix</Tag.SecondaryContent>
    </Tag>
  );
};
`,...(ce=(te=x.parameters)==null?void 0:te.docs)==null?void 0:ce.source}}};var ie,de,le;f.parameters={...f.parameters,docs:{...(ie=f.parameters)==null?void 0:ie.docs,source:{code:`const MultipleTagsInRow = () => (
  <div className="tw-flex tw-flex-nowrap tw-border tw-border-line-mid tw-rounded-medium tw-p-2 tw-gap-2">
    <Tag emphasis="strong" variant="default" size="default" disabled={false}>
      <IconColorFan size="16" />
      Text
    </Tag>
    <Tag emphasis="strong" variant="default" size="default" disabled={false}>
      <IconColorFan size="16" />
      Text
    </Tag>
    <Tag emphasis="strong" variant="default" size="default" disabled={false}>
      <IconColorFan size="16" />
      Text
    </Tag>
    <Tag emphasis="strong" variant="default" size="default" disabled={false}>
      <IconColorFan size="16" />
      Text
    </Tag>
    <Tag emphasis="strong" variant="default" size="default" disabled={false}>
      <IconColorFan size="16" />
      Text
    </Tag>
    <Tag emphasis="strong" variant="default" size="default" disabled={false}>
      <IconColorFan size="16" />
      Text
    </Tag>
  </div>
);
`,...(le=(de=f.parameters)==null?void 0:de.docs)==null?void 0:le.source}}};var ge,me,Te;r.parameters={...r.parameters,docs:{...(ge=r.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: args => <Tag {...args}>Text</Tag>
}`,...(Te=(me=r.parameters)==null?void 0:me.docs)==null?void 0:Te.source}}};var pe,ue,Ce;o.parameters={...o.parameters,docs:{...(pe=o.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: args => <Tag {...args}>
            Text
            <Tag.SecondaryContent>Secondary</Tag.SecondaryContent>
        </Tag>
}`,...(Ce=(ue=o.parameters)==null?void 0:ue.docs)==null?void 0:Ce.source}}};var xe,fe,he;t.parameters={...t.parameters,docs:{...(xe=t.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => <Tag {...args}>Text</Tag>
}`,...(he=(fe=t.parameters)==null?void 0:fe.docs)==null?void 0:he.source}}};var Se,ze,ye;c.parameters={...c.parameters,docs:{...(Se=c.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    onDismiss: action('onDismiss')
  },
  render: args => <Tag {...args}>Text</Tag>
}`,...(ye=(ze=c.parameters)==null?void 0:ze.docs)==null?void 0:ye.source}}};var je,ve,ke;i.parameters={...i.parameters,docs:{...(je=i.parameters)==null?void 0:je.docs,source:{originalSource:`{
  args: {
    onAddClick: action('onAddClick')
  },
  render: args => <Tag {...args}>Text</Tag>
}`,...(ke=(ve=i.parameters)==null?void 0:ve.docs)==null?void 0:ke.source}}};var we,Ie,be;d.parameters={...d.parameters,docs:{...(we=d.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick'),
    onDismiss: action('onDismiss')
  },
  render: args => <Tag {...args}>Text</Tag>
}`,...(be=(Ie=d.parameters)==null?void 0:Ie.docs)==null?void 0:be.source}}};var We,Fe,De;l.parameters={...l.parameters,docs:{...(We=l.parameters)==null?void 0:We.docs,source:{originalSource:`{
  render: args => <Tag {...args}>
            <IconColorFan size="16" />
            Text
        </Tag>
}`,...(De=(Fe=l.parameters)==null?void 0:Fe.docs)==null?void 0:De.source}}};var Oe,He,Ae;g.parameters={...g.parameters,docs:{...(Oe=g.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  render: args => <Tag {...args}>
            <IconColorFan size="16" />
            Text
            <IconColorFan size="16" />
        </Tag>
}`,...(Ae=(He=g.parameters)==null?void 0:He.docs)==null?void 0:Ae.source}}};var Be,Me,_e;m.parameters={...m.parameters,docs:{...(Be=m.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => <Tag {...args}>
            <IconColorFan size="16" /> Text
        </Tag>
}`,...(_e=(Me=m.parameters)==null?void 0:Me.docs)==null?void 0:_e.source}}};var Ne,Ee,Re;T.parameters={...T.parameters,docs:{...(Ne=T.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  render: args => <>
            before{' '}
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>{' '}
            after
        </>
}`,...(Re=(Ee=T.parameters)==null?void 0:Ee.docs)==null?void 0:Re.source}}};var Le,Pe,Ke;p.parameters={...p.parameters,docs:{...(Le=p.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => {
    return <Tag {...args}>
                This is a tag!
                <Tag.HoverContent>
                    <div className="tw-flex tw-w-full tw-justify-center">
                        <IconDotsHorizontal />
                    </div>
                </Tag.HoverContent>
            </Tag>;
  }
}`,...(Ke=(Pe=p.parameters)==null?void 0:Pe.docs)==null?void 0:Ke.source}}};var Ue,Ye,qe;u.parameters={...u.parameters,docs:{...(Ue=u.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  render: args => {
    return <Tag {...args}>
                <Tag.SecondaryContent>Before</Tag.SecondaryContent>
                Main content
            </Tag>;
  }
}`,...(qe=(Ye=u.parameters)==null?void 0:Ye.docs)==null?void 0:qe.source}}};var Ge,Je,Qe;C.parameters={...C.parameters,docs:{...(Ge=C.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
  render: args => {
    return <Tag {...args}>
                <Tag.SecondaryContent>First</Tag.SecondaryContent>
                Main content
                <Tag.SecondaryContent>Second</Tag.SecondaryContent>
            </Tag>;
  }
}`,...(Qe=(Je=C.parameters)==null?void 0:Je.docs)==null?void 0:Qe.source}}};var Ve,Xe,Ze;x.parameters={...x.parameters,docs:{...(Ve=x.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => {
    return <Tag {...args}>
                <Tag.SecondaryContent>Prefix</Tag.SecondaryContent>
                Main content
                <Tag.HoverContent>
                    <IconDotsHorizontal />
                </Tag.HoverContent>
                <Tag.SecondaryContent>Suffix</Tag.SecondaryContent>
            </Tag>;
  }
}`,...(Ze=(Xe=x.parameters)==null?void 0:Xe.docs)==null?void 0:Ze.source}}};var $e,en,nn;f.parameters={...f.parameters,docs:{...($e=f.parameters)==null?void 0:$e.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-flex-nowrap tw-border tw-border-line-mid tw-rounded-medium tw-p-2 tw-gap-2">
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>
        </div>
}`,...(nn=(en=f.parameters)==null?void 0:en.docs)==null?void 0:nn.source}}};const gn=["LabelOnly","WithSecondaryContent","WithOnClick","WithDismiss","WithAddable","WithOnClickAndDismiss","WithIcon","WithIconOnBothSides","WithOnClickAndIcon","BetweenElements","WithHoverContent","WithSecondaryContentBefore","WithMultipleSecondaryContent","WithBothSlotTypes","MultipleTagsInRow"];export{T as BetweenElements,r as LabelOnly,f as MultipleTagsInRow,i as WithAddable,x as WithBothSlotTypes,c as WithDismiss,p as WithHoverContent,l as WithIcon,g as WithIconOnBothSides,C as WithMultipleSecondaryContent,t as WithOnClick,d as WithOnClickAndDismiss,m as WithOnClickAndIcon,o as WithSecondaryContent,u as WithSecondaryContentBefore,gn as __namedExportsOrder,ln as default};
