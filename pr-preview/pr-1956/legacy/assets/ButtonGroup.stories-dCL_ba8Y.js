import{j as t}from"./jsx-runtime-Nms4Y4qS.js";import{a as e}from"./chunk-454WOBUV-CM0pFb8Z.js";import{a as i,b as r,c as p,B as n}from"./Button-CYWlMQhW.js";import{I as u}from"./IconCheckMark-CLvJH1sB.js";import{I as h}from"./IconCross-Bt-I3opn.js";import{I as d}from"./IconPlus-Dy9edG7f.js";import{B as l}from"./ButtonGroup-BLPM7OSi.js";import"./index-BwDkhjyp.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CQkTLCs1.js";import"./useButton-DofEV6SJ.js";import"./useFocusable-CAGu0lKI.js";import"./useFocusRing-4Vnvtzpc.js";import"./SSRProvider-CYXx33DY.js";import"./chain-D5h1pgIF.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./IconPlus16-DMEnDMzI.js";const D={title:"Components/Button Group",component:l,tags:["autodocs"],argTypes:{size:{options:Object.values(i),control:{type:"radio"}},style:{options:Object.values(r),control:{type:"radio"}},emphasis:{options:Object.values(p),control:{type:"radio"}}},args:{size:i.Medium,style:r.Default,emphasis:p.Default}},s=({...o})=>t.jsxs(l,{size:o.size,children:[t.jsx(n,{style:o.style,emphasis:o.emphasis,icon:t.jsx(d,{}),onClick:e("onClick"),children:"Button Text"}),t.jsx(n,{style:o.style,emphasis:o.emphasis,icon:t.jsx(u,{}),onClick:e("onClick"),children:"The Second"}),t.jsx(n,{style:o.style,emphasis:o.emphasis,icon:t.jsx(h,{}),onClick:e("onClick"),children:"The Third"})]});s.__docgenInfo={description:"",methods:[],displayName:"ButtonGroup"};var a,c,m;s.parameters={...s.parameters,docs:{...(a=s.parameters)==null?void 0:a.docs,source:{originalSource:`({
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