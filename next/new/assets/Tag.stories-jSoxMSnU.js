import{j as e}from"./iframe-DO8Sp0Kx.js";import{o as s,m as le}from"./fondue-icons369-D-31d5yw.js";import{T as Te,a as me,b as n}from"./Tag-B-Zz7Dq5.js";import"./preload-helper-mNEUNaaY.js";const{action:a}=__STORYBOOK_MODULE_ACTIONS__,he={title:"Components/Tag",component:n,subcomponents:{"Tag.HoverContent":me,"Tag.SecondaryContent":Te},tags:["autodocs"],parameters:{status:{type:"released"}},args:{emphasis:"strong",variant:"default",size:"default",disabled:!1}},o={render:r=>e.jsx(n,{...r,children:"Text"})},t={render:r=>e.jsxs(n,{...r,children:["Text",e.jsx(n.SecondaryContent,{children:"Secondary"})]})},c={args:{onClick:a("onClick")},render:r=>e.jsx(n,{...r,children:"Text"})},i={args:{onDismiss:a("onDismiss")},render:r=>e.jsx(n,{...r,children:"Text"})},d={args:{onAddClick:a("onAddClick")},render:r=>e.jsx(n,{...r,children:"Text"})},g={args:{onClick:a("onClick"),onDismiss:a("onDismiss")},render:r=>e.jsx(n,{...r,children:"Text"})},l={render:r=>e.jsxs(n,{...r,children:[e.jsx(s,{size:"16"}),"Text"]})},T={render:r=>e.jsxs(n,{...r,children:[e.jsx(s,{size:"16"}),"Text",e.jsx(s,{size:"16"})]})},m={args:{onClick:a("onClick")},render:r=>e.jsxs(n,{...r,children:[e.jsx(s,{size:"16"})," Text"]})},x={render:r=>e.jsxs(e.Fragment,{children:["before"," ",e.jsxs(n,{...r,children:[e.jsx(s,{size:"16"})," Text"]})," ","after"]})},p={args:{onClick:a("onClick")},render:r=>e.jsxs(n,{...r,children:["This is a tag!",e.jsx(n.HoverContent,{children:e.jsx("div",{className:"tw-flex tw-w-full tw-justify-center",children:e.jsx(le,{})})})]})},C={render:r=>e.jsxs(n,{...r,children:[e.jsx(n.SecondaryContent,{children:"Before"}),"Main content"]})},u={render:r=>e.jsxs(n,{...r,children:[e.jsx(n.SecondaryContent,{children:"First"}),"Main content",e.jsx(n.SecondaryContent,{children:"Second"})]})},h={args:{onClick:a("onClick")},render:r=>e.jsxs(n,{...r,children:[e.jsx(n.SecondaryContent,{children:"Prefix"}),"Main content",e.jsx(n.HoverContent,{children:e.jsx(le,{})}),e.jsx(n.SecondaryContent,{children:"Suffix"})]})},S={render:r=>e.jsxs("div",{className:"tw-flex tw-flex-nowrap tw-border tw-border-line-mid tw-rounded-medium tw-p-2 tw-gap-2",children:[e.jsxs(n,{...r,children:[e.jsx(s,{size:"16"})," Text"]}),e.jsxs(n,{...r,children:[e.jsx(s,{size:"16"})," Text"]}),e.jsxs(n,{...r,children:[e.jsx(s,{size:"16"})," Text"]}),e.jsxs(n,{...r,children:[e.jsx(s,{size:"16"})," Text"]}),e.jsxs(n,{...r,children:[e.jsx(s,{size:"16"})," Text"]}),e.jsxs(n,{...r,children:[e.jsx(s,{size:"16"})," Text"]})]})};var j,y,f;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => <Tag {...args}>Text</Tag>
}`,...(f=(y=o.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var k,w,z;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <Tag {...args}>
            Text
            <Tag.SecondaryContent>Secondary</Tag.SecondaryContent>
        </Tag>
}`,...(z=(w=t.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var W,I,v;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => <Tag {...args}>Text</Tag>
}`,...(v=(I=c.parameters)==null?void 0:I.docs)==null?void 0:v.source}}};var O,D,F;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    onDismiss: action('onDismiss')
  },
  render: args => <Tag {...args}>Text</Tag>
}`,...(F=(D=i.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var b,H,A;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    onAddClick: action('onAddClick')
  },
  render: args => <Tag {...args}>Text</Tag>
}`,...(A=(H=d.parameters)==null?void 0:H.docs)==null?void 0:A.source}}};var B,M,_;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick'),
    onDismiss: action('onDismiss')
  },
  render: args => <Tag {...args}>Text</Tag>
}`,...(_=(M=g.parameters)==null?void 0:M.docs)==null?void 0:_.source}}};var E,N,R;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <Tag {...args}>
            <IconColorFan size="16" />
            Text
        </Tag>
}`,...(R=(N=l.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var L,P,K;T.parameters={...T.parameters,docs:{...(L=T.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <Tag {...args}>
            <IconColorFan size="16" />
            Text
            <IconColorFan size="16" />
        </Tag>
}`,...(K=(P=T.parameters)==null?void 0:P.docs)==null?void 0:K.source}}};var U,Y,q;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => <Tag {...args}>
            <IconColorFan size="16" /> Text
        </Tag>
}`,...(q=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:q.source}}};var G,J,Q;x.parameters={...x.parameters,docs:{...(G=x.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: args => <>
            before{' '}
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>{' '}
            after
        </>
}`,...(Q=(J=x.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var V,X,Z;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(Z=(X=p.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,ee,re;C.parameters={...C.parameters,docs:{...($=C.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: args => {
    return <Tag {...args}>
                <Tag.SecondaryContent>Before</Tag.SecondaryContent>
                Main content
            </Tag>;
  }
}`,...(re=(ee=C.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var ne,se,ae;u.parameters={...u.parameters,docs:{...(ne=u.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: args => {
    return <Tag {...args}>
                <Tag.SecondaryContent>First</Tag.SecondaryContent>
                Main content
                <Tag.SecondaryContent>Second</Tag.SecondaryContent>
            </Tag>;
  }
}`,...(ae=(se=u.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};var oe,te,ce;h.parameters={...h.parameters,docs:{...(oe=h.parameters)==null?void 0:oe.docs,source:{originalSource:`{
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
}`,...(ce=(te=h.parameters)==null?void 0:te.docs)==null?void 0:ce.source}}};var ie,de,ge;S.parameters={...S.parameters,docs:{...(ie=S.parameters)==null?void 0:ie.docs,source:{originalSource:`{
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
}`,...(ge=(de=S.parameters)==null?void 0:de.docs)==null?void 0:ge.source}}};const Se=["LabelOnly","WithSecondaryContent","WithOnClick","WithDismiss","WithAddable","WithOnClickAndDismiss","WithIcon","WithIconOnBothSides","WithOnClickAndIcon","BetweenElements","WithHoverContent","WithSecondaryContentBefore","WithMultipleSecondaryContent","WithBothSlotTypes","MultipleTagsInRow"];export{x as BetweenElements,o as LabelOnly,S as MultipleTagsInRow,d as WithAddable,h as WithBothSlotTypes,i as WithDismiss,p as WithHoverContent,l as WithIcon,T as WithIconOnBothSides,u as WithMultipleSecondaryContent,c as WithOnClick,g as WithOnClickAndDismiss,m as WithOnClickAndIcon,t as WithSecondaryContent,C as WithSecondaryContentBefore,Se as __namedExportsOrder,he as default};
