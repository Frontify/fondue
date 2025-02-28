import{j as t}from"./jsx-runtime-DH9XN8A8.js";import{a as e}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{B as i,a as r,b as a,c as n}from"./Button-BfBJpGQT.js";import{I as u}from"./IconCheckMark-CMS57PRn.js";import{I as d}from"./IconCross-LL1GOU_p.js";import{I as h}from"./IconPlus-C0FgY_tz.js";import{B as l}from"./ButtonGroup-BOflEHz1.js";import"./index-v7USjxUg.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";import"./useButton-B6orroTH.js";import"./useFocusable-BRFkliNn.js";import"./useFocusRing-CP9UJNUw.js";import"./useEffectEvent-BaECT7_f.js";import"./chain-C8AhrK0W.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./IconPlus16-C4i4a16H.js";const D={title:"Components/Button Group",component:l,tags:["autodocs"],argTypes:{size:{options:Object.values(i),control:{type:"radio"}},style:{options:Object.values(r),control:{type:"radio"}},emphasis:{options:Object.values(a),control:{type:"radio"}}},args:{size:i.Medium,style:r.Default,emphasis:a.Default},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [Flex layout component](/docs/current_layout-flex--documentation) as a wrapper arount the `Button` component instead."}}}},s=({...o})=>t.jsxs(l,{size:o.size,children:[t.jsx(n,{style:o.style,emphasis:o.emphasis,icon:t.jsx(h,{}),onClick:e("onClick"),children:"Button Text"}),t.jsx(n,{style:o.style,emphasis:o.emphasis,icon:t.jsx(u,{}),onClick:e("onClick"),children:"The Second"}),t.jsx(n,{style:o.style,emphasis:o.emphasis,icon:t.jsx(d,{}),onClick:e("onClick"),children:"The Third"})]});s.__docgenInfo={description:"",methods:[],displayName:"ButtonGroup"};var p,c,m;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`({
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
    </ButtonGroupComponent>`,...(m=(c=s.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const P=["ButtonGroup"];export{s as ButtonGroup,P as __namedExportsOrder,D as default};
