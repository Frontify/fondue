import{j as o}from"./jsx-runtime-Nms4Y4qS.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{T as i}from"./Tooltip-CP_K22RC.js";import{I as c}from"./IconIcon24-C-aalyCY.js";import"./index-BwDkhjyp.js";import"./_commonjsHelpers-BosuxZz1.js";import"./useClickOutside-CKV3CrvD.js";import"./usePopper-DPXU-o95.js";import"./index-DxjWwZXO.js";import"./index-CfyPTyT-.js";import"./EnablePortalWrapper-DvpkRq0I.js";import"./Portal-0C9N3MSP.js";import"./merge-DI-veSMP.js";import"./elements-BOYmskOL.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./dialog-Dre1eVQK.js";import"./focusStyle-CBFElZiz.js";const F={title:"Components/Tooltip",component:i,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Tooltip component](/docs/current_components-tooltip--documentation) instead."}}},args:{placement:"bottom-start",offset:[0,8],flip:!0,content:"Your text here",withArrow:!0,size:"spacious",openOnMount:!1,enablePortal:!0,maxWidth:200,maxHeight:"auto","data-test-id":"fondue-tooltip",disabled:!1,enterDelay:0,leaveDelay:200},argTypes:{...S,anchor:{table:{disable:!0}},size:{options:["spacious","compact"],control:{type:"select"}},withArrow:{control:{type:"boolean"}},openOnMount:{control:{type:"boolean"}},disabled:{control:{type:"boolean"}}}},p=a=>o.jsx(i,{...a,children:o.jsx(c,{})}),w=a=>o.jsxs("div",{children:[o.jsx(i,{...a,children:o.jsx(c,{})}),o.jsx(i,{...a,children:o.jsx(c,{})})]}),e=p.bind({});e.args={leaveDelay:0};const t=p.bind({});t.args={openOnMount:!0};const r=p.bind({});r.args={content:`This is a<br>sample text<br />with line breaks
in it`};const s=p.bind({});s.args={disabled:!0};const n=w.bind({});var l,m,d;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`args => <Tooltip {...args}>
        <IconIcon24 />
    </Tooltip>`,...(d=(m=e.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var u,T,b;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => <Tooltip {...args}>
        <IconIcon24 />
    </Tooltip>`,...(b=(T=t.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};var g,h,f;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`args => <Tooltip {...args}>
        <IconIcon24 />
    </Tooltip>`,...(f=(h=r.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var x,I,D;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => <Tooltip {...args}>
        <IconIcon24 />
    </Tooltip>`,...(D=(I=s.parameters)==null?void 0:I.docs)==null?void 0:D.source}}};var y,j,O;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`args => <div>
        <Tooltip {...args}>
            <IconIcon24 />
        </Tooltip>

        <Tooltip {...args}>
            <IconIcon24 />
        </Tooltip>
    </div>`,...(O=(j=n.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};const J=["Default","OpenByDefault","WithLineBreak","Disabled","DoubleTooltip"];export{e as Default,s as Disabled,n as DoubleTooltip,t as OpenByDefault,r as WithLineBreak,J as __namedExportsOrder,F as default};