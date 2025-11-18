import{j as t}from"./iframe-C_X0LXbg.js";import{e as i,a as r,b as a,B as e}from"./Button-B754AGQe.js";import{I as u}from"./IconCheckMark-BnM0QKU_.js";import{I as d}from"./IconCross-CWs_FIyp.js";import{I as h}from"./IconPlus-D1YCBvpZ.js";import{B as l}from"./ButtonGroup-DmmLnt3E.js";import"./preload-helper-CxFeC-BG.js";import"./useButton-DeuSuATS.js";import"./useFocusable-P2cNa7fe.js";import"./useFocusRing-B-vCA7C1.js";import"./useEffectEvent-C56Z2Ejq.js";import"./chain-CAXrBEkW.js";import"./index-BaX3WfTo.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./IconPlus16-DQqKuiDV.js";const{action:n}=__STORYBOOK_MODULE_ACTIONS__,M={title:"Components/Button Group",component:l,tags:["autodocs"],argTypes:{size:{options:Object.values(i),control:{type:"radio"}},style:{options:Object.values(a),control:{type:"radio"}},emphasis:{options:Object.values(r),control:{type:"radio"}}},args:{size:i.Medium,style:a.Default,emphasis:r.Default},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [Flex layout component](/docs/current_layout-flex--documentation) as a wrapper arount the `Button` component instead."}}}},s=({...o})=>t.jsxs(l,{size:o.size,children:[t.jsx(e,{style:o.style,emphasis:o.emphasis,icon:t.jsx(h,{}),onClick:n("onClick"),children:"Button Text"}),t.jsx(e,{style:o.style,emphasis:o.emphasis,icon:t.jsx(u,{}),onClick:n("onClick"),children:"The Second"}),t.jsx(e,{style:o.style,emphasis:o.emphasis,icon:t.jsx(d,{}),onClick:n("onClick"),children:"The Third"})]});s.__docgenInfo={description:"",methods:[],displayName:"ButtonGroup"};var p,c,m;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`({
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
    </ButtonGroupComponent>`,...(m=(c=s.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const v=["ButtonGroup"];export{s as ButtonGroup,v as __namedExportsOrder,M as default};
