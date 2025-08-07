import{j as t}from"./jsx-runtime-BYYWji4R.js";import{a as e}from"./index-B-lxVbXh.js";import{B as i,a as r,b as a,c as n}from"./Button-BkcxChke.js";import{I as u}from"./IconCheckMark-DDrIoLdu.js";import{I as d}from"./IconCross-BVasaH61.js";import{I as h}from"./IconPlus-CTHqG6wY.js";import{B as l}from"./ButtonGroup-B7W5xRbZ.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";import"./useButton-CmN_Qqm3.js";import"./useFocusable-NpJIjJzn.js";import"./useFocusRing-CqhiwHAH.js";import"./useEffectEvent-23OTMzEQ.js";import"./chain-zZtnTS2i.js";import"./index-Cho7bklK.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-BtNTXUM4.js";import"./merge-DI-veSMP.js";import"./IconPlus16-UshTJ08A.js";const P={title:"Components/Button Group",component:l,tags:["autodocs"],argTypes:{size:{options:Object.values(i),control:{type:"radio"}},style:{options:Object.values(a),control:{type:"radio"}},emphasis:{options:Object.values(r),control:{type:"radio"}}},args:{size:i.Medium,style:a.Default,emphasis:r.Default},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [Flex layout component](/docs/current_layout-flex--documentation) as a wrapper arount the `Button` component instead."}}}},s=({...o})=>t.jsxs(l,{size:o.size,children:[t.jsx(n,{style:o.style,emphasis:o.emphasis,icon:t.jsx(h,{}),onClick:e("onClick"),children:"Button Text"}),t.jsx(n,{style:o.style,emphasis:o.emphasis,icon:t.jsx(u,{}),onClick:e("onClick"),children:"The Second"}),t.jsx(n,{style:o.style,emphasis:o.emphasis,icon:t.jsx(d,{}),onClick:e("onClick"),children:"The Third"})]});s.__docgenInfo={description:"",methods:[],displayName:"ButtonGroup"};var p,c,m;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`({
  ...args
}) => <ButtonGroupComponent size={args.size}>
        <Button style={args.style} emphasis={args.emphasis} icon={<IconPlus />} onClick={action('onClick')}>
            Button Text
        </Button>
        <Button style={args.style} emphasis={args.emphasis} icon={<IconCheckMark />} onClick={action('onClick')}>
            The Second
        </Button>
        <Button style={args.style} emphasis={args.emphasis} icon={<IconCross />} onClick={action('onClick')}>
            The Third
        </Button>
    </ButtonGroupComponent>`,...(m=(c=s.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const w=["ButtonGroup"];export{s as ButtonGroup,w as __namedExportsOrder,P as default};
