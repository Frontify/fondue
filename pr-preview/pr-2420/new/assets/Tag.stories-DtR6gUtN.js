import{j as e}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import{o as a,e as V}from"./fondue-icons351-BwRByKtE.js";import{a as n}from"./index-B-lxVbXh.js";import{T as r}from"./Tag-BITIRcxH.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";const ae={title:"Components/Tag",component:r,tags:["autodocs"],parameters:{status:{type:"released"}},args:{emphasis:"strong",variant:"default",size:"default",dismissable:!1,addable:!1,disabled:!1}},o={render:s=>e.jsx(r,{...s,children:"Text"})},t={args:{onClick:n("onClick")},render:s=>e.jsx(r,{...s,children:"Text"})},i={args:{dismissable:!0,onDismiss:n("onDismiss")},render:s=>e.jsx(r,{...s,children:"Text"})},c={args:{addable:!0,onAddClick:n("onAddClick")},render:s=>e.jsx(r,{...s,children:"Text"})},d={args:{onClick:n("onClick"),dismissable:!0,onDismiss:n("onDismiss")},render:s=>e.jsx(r,{...s,children:"Text"})},l={render:s=>e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"}),"Text"]})},g={render:s=>e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"}),"Text",e.jsx(a,{size:"16"})]})},m={args:{onClick:n("onClick")},render:s=>e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]})},x={render:s=>e.jsxs(e.Fragment,{children:["before"," ",e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]})," ","after"]})},T={args:{onClick:n("onClick"),hoverContent:e.jsx("div",{className:"tw-flex tw-w-full tw-justify-center",children:e.jsx(V,{})})},render:s=>e.jsx(r,{...s,children:"This is a tag!"})},p={render:s=>e.jsxs("div",{className:"tw-flex tw-flex-nowrap tw-border tw-border-line tw-rounded tw-p-2 tw-gap-2",children:[e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]}),e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]}),e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]}),e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]}),e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]}),e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]})]})};var u,h,C;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => <Tag {...args}>Text</Tag>
}`,...(C=(h=o.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};var j,w,k;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => <Tag {...args}>Text</Tag>
}`,...(k=(w=t.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};var f,z,I;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    dismissable: true,
    onDismiss: action('onDismiss')
  },
  render: args => <Tag {...args}>Text</Tag>
}`,...(I=(z=i.parameters)==null?void 0:z.docs)==null?void 0:I.source}}};var b,W,D;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    addable: true,
    onAddClick: action('onAddClick')
  },
  render: args => <Tag {...args}>Text</Tag>
}`,...(D=(W=c.parameters)==null?void 0:W.docs)==null?void 0:D.source}}};var S,F,v;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick'),
    dismissable: true,
    onDismiss: action('onDismiss')
  },
  render: args => <Tag {...args}>Text</Tag>
}`,...(v=(F=d.parameters)==null?void 0:F.docs)==null?void 0:v.source}}};var O,A,y;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <Tag {...args}>
            <IconColorFan size="16" />
            Text
        </Tag>
}`,...(y=(A=l.parameters)==null?void 0:A.docs)==null?void 0:y.source}}};var B,E,N;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => <Tag {...args}>
            <IconColorFan size="16" />
            Text
            <IconColorFan size="16" />
        </Tag>
}`,...(N=(E=g.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};var H,R,L;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => <Tag {...args}>
            <IconColorFan size="16" /> Text
        </Tag>
}`,...(L=(R=m.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var M,_,q;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: args => <>
            before{' '}
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>{' '}
            after
        </>
}`,...(q=(_=x.parameters)==null?void 0:_.docs)==null?void 0:q.source}}};var G,J,K;T.parameters={...T.parameters,docs:{...(G=T.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick'),
    hoverContent: <div className="tw-flex tw-w-full tw-justify-center">
                <IconDotsHorizontal />
            </div>
  },
  render: args => {
    return <Tag {...args}>This is a tag!</Tag>;
  }
}`,...(K=(J=T.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var P,Q,U;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-flex-nowrap tw-border tw-border-line tw-rounded tw-p-2 tw-gap-2">
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
}`,...(U=(Q=p.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};const ne=["LabelOnly","WithOnClick","WithDismiss","WithAddable","WithOnClickAndDismiss","WithIcon","WithIconOnBothSides","WithOnClickAndIcon","BetweenElements","WithHoverContent","MultipleTagsInRow"];export{x as BetweenElements,o as LabelOnly,p as MultipleTagsInRow,c as WithAddable,i as WithDismiss,T as WithHoverContent,l as WithIcon,g as WithIconOnBothSides,t as WithOnClick,d as WithOnClickAndDismiss,m as WithOnClickAndIcon,ne as __namedExportsOrder,ae as default};
