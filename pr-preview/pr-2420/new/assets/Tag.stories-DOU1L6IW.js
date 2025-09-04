import{j as e}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import{o as a}from"./fondue-icons351-B_bKa-IH.js";import{a as n}from"./index-B-lxVbXh.js";import{T as r}from"./Tag-CNUfxti2.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";const U={title:"Components/Tag",component:r,tags:["autodocs"],parameters:{status:{type:"released"}},args:{emphasis:"strong",variant:"default",size:"default",dismissable:!1,disabled:!1}},o={render:s=>e.jsx(r,{...s,children:"Text"})},t={args:{onClick:n("onClick")},render:s=>e.jsx(r,{...s,children:"Text"})},i={args:{dismissable:!0,onDismiss:n("onDismiss")},render:s=>e.jsx(r,{...s,children:"Text"})},c={args:{onClick:n("onClick"),dismissable:!0,onDismiss:n("onDismiss")},render:s=>e.jsx(r,{...s,children:"Text"})},d={render:s=>e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"}),"Text"]})},l={render:s=>e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"}),"Text",e.jsx(a,{size:"16"})]})},m={args:{onClick:n("onClick")},render:s=>e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]})},g={render:s=>e.jsxs(e.Fragment,{children:["before"," ",e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]})," ","after"]})},x={render:s=>e.jsxs("div",{className:"tw-flex tw-flex-nowrap tw-border tw-border-line tw-rounded tw-p-2 tw-gap-2",children:[e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]}),e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]}),e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]}),e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]}),e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]}),e.jsxs(r,{...s,children:[e.jsx(a,{size:"16"})," Text"]})]})};var T,p,u;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: args => <Tag {...args}>Text</Tag>
}`,...(u=(p=o.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var h,C,j;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => <Tag {...args}>Text</Tag>
}`,...(j=(C=t.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};var z,w,I;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    dismissable: true,
    onDismiss: action('onDismiss')
  },
  render: args => <Tag {...args}>Text</Tag>
}`,...(I=(w=i.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};var k,f,b;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick'),
    dismissable: true,
    onDismiss: action('onDismiss')
  },
  render: args => <Tag {...args}>Text</Tag>
}`,...(b=(f=c.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var D,F,W;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <Tag {...args}>
            <IconColorFan size="16" />
            Text
        </Tag>
}`,...(W=(F=d.parameters)==null?void 0:F.docs)==null?void 0:W.source}}};var O,S,v;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <Tag {...args}>
            <IconColorFan size="16" />
            Text
            <IconColorFan size="16" />
        </Tag>
}`,...(v=(S=l.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var A,B,E;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    onClick: action('onClick')
  },
  render: args => <Tag {...args}>
            <IconColorFan size="16" /> Text
        </Tag>
}`,...(E=(B=m.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};var y,R,L;g.parameters={...g.parameters,docs:{...(y=g.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <>
            before{' '}
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>{' '}
            after
        </>
}`,...(L=(R=g.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var M,N,_;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(_=(N=x.parameters)==null?void 0:N.docs)==null?void 0:_.source}}};const V=["LabelOnly","WithOnClick","WithDismiss","WithOnClickAndDismiss","WithIcon","WithIconOnBothSides","WithOnClickAndIcon","BetweenElements","MultipleTagsInRow"];export{g as BetweenElements,o as LabelOnly,x as MultipleTagsInRow,i as WithDismiss,d as WithIcon,l as WithIconOnBothSides,t as WithOnClick,c as WithOnClickAndDismiss,m as WithOnClickAndIcon,V as __namedExportsOrder,U as default};
