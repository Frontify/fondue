import{j as t}from"./jsx-runtime-Nms4Y4qS.js";import{a as e}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{a as i,b as r,c as a,B as n}from"./Button-BBdFcQ_2.js";import{I as u}from"./IconCheckMark-ByVuQE55.js";import{I as d}from"./IconCross-CxP4FPDR.js";import{I as h}from"./IconPlus-DAQvlGZW.js";import{B as l}from"./ButtonGroup-IsRCKo5j.js";import"./index-BwDkhjyp.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CQkTLCs1.js";import"./useButton-B0CVDvll.js";import"./useFocusable-ClqOF1PM.js";import"./useFocusRing-Vzyl7-Lk.js";import"./SSRProvider-CYXx33DY.js";import"./chain-CSFqNvhK.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./IconPlus16-BeDPBK1Q.js";const D={title:"Components/Button Group",component:l,tags:["autodocs"],argTypes:{size:{options:Object.values(i),control:{type:"radio"}},style:{options:Object.values(r),control:{type:"radio"}},emphasis:{options:Object.values(a),control:{type:"radio"}}},args:{size:i.Medium,style:r.Default,emphasis:a.Default},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [Flex layout component](/docs/current_layout-flex--documentation) as a wrapper arount the `Button` component instead."}}}},s=({...o})=>t.jsxs(l,{size:o.size,children:[t.jsx(n,{style:o.style,emphasis:o.emphasis,icon:t.jsx(h,{}),onClick:e("onClick"),children:"Button Text"}),t.jsx(n,{style:o.style,emphasis:o.emphasis,icon:t.jsx(u,{}),onClick:e("onClick"),children:"The Second"}),t.jsx(n,{style:o.style,emphasis:o.emphasis,icon:t.jsx(d,{}),onClick:e("onClick"),children:"The Third"})]});s.__docgenInfo={description:"",methods:[],displayName:"ButtonGroup"};var p,c,m;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`({
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
