import{j as e,r as Xe}from"./iframe-Byq4RgVa.js";import{$ as Ze}from"./useOverlayTriggerState-BymXy-Wj.js";import{B as et,a as D,b as P}from"./Button-BIzAMqFG.js";import{D as tt}from"./Dropdown-BRv1tjb0.js";import{M as k}from"./Modal-DpbK2Uab.js";import{a as rt}from"./ScrollWrapper-Cvc0d_W_.js";import{b as B,T as S,B as a,L as l,c as E}from"./LegacyTooltip-BPixO4E9.js";import{a as at}from"./IconExclamationMarkTriangle-D_-jLFh-.js";import{I as n}from"./IconIcon-B7eOr2IJ.js";import{F as ot}from"./FormControl-Giah9BCH.js";import"./preload-helper-DXpIkoC8.js";import"./FocusScope-D6_i73Ru.js";import"./useFocusRing-1VzCYPXM.js";import"./useEffectEvent-CQqcouob.js";import"./useFocusable-CEz2cnMa.js";import"./chain-NL_CYzOj.js";import"./index-CTq3ycsr.js";import"./useControlledState-BlIu1hRZ.js";import"./useButton-CTv9pbma.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./useMenuTrigger-BKOUUf6b.js";import"./useLabels-DRqlZfaz.js";import"./useLocalizedStringFormatter-Bah__fiG.js";import"./context-BYh6xh12.js";import"./VisuallyHidden-C8SvXEY7.js";import"./helper-dwWGY4QT.js";import"./keyboard-BVhd7sXS.js";import"./SelectionManager-C6qJQ_SX.js";import"./useField-DWjWs7-b.js";import"./useFormValidationState-Dv2uWviW.js";import"./usePopper-UMr1qiz5.js";import"./index-DZVnwIzI.js";import"./MenuItem-K__Xj9j7.js";import"./IconCaretRight-DarsI4uH.js";import"./IconCheckMark-BTbz00I9.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-C279Nnsi.js";import"./Trigger-CD-G7ibB.js";import"./IconCaretDown-CKbnQi9o.js";import"./IconCaretDown16-CoFRUHD1.js";import"./IconCross-D0b98GpB.js";import"./IconTrashBin16-K6QVNvdl.js";import"./IconTrashBin24-BzOljLcA.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DXU3Bq8F.js";import"./Portal-Cs3GVWse.js";import"./useMemoizedId-DwOUk7Ve.js";import"./useDialog-CgB5ClVI.js";import"./FrontifyPattern-B5KvUgnw.js";import"./index-YjaOxHuc.js";import"./proxy-DI04fTzG.js";import"./useLink-CB5zyTe8.js";import"./IconExclamationMarkCircle24-ffcPYjGw.js";import"./IconExclamationMarkTriangle24-D32Lmmh1.js";import"./IconIcon16-DVhiMCPv.js";import"./IconIcon24-CUNoBgQc.js";import"./InputLabel-CrIA_ZUr.js";import"./TooltipIcon-CqfIsxQ1.js";import"./IconQuestionMarkCircle-BUN0gvmv.js";const{action:nt}=__STORYBOOK_MODULE_ACTIONS__,yr={title:"Deprecated/LegacyTooltip",component:l,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Tooltip component](/docs/current_components-tooltip--documentation) instead."}}},args:{content:"Cupcake ipsum dolor sit amet ice cream. (https://Cupcakeipsumdolorsitameticecream.com)",heading:"",triggerElement:e.jsxs("button",{type:"button",className:"tw-flex tw-justify-center tw-items-center",children:[e.jsx("span",{className:"tw-flex tw-leading-3",children:e.jsx(E,{})}),e.jsx("span",{children:"Tooltip trigger"})]})},argTypes:{triggerElement:{table:{disable:!0}},brightHeader:{options:["None","Information","Warning","Tip","Note"],mapping:{None:null,Information:a.Information,Warning:a.Warning,Tip:a.Tip,Note:a.Note},control:{type:"select"}},tooltipIcon:{options:["None","Icon"],mapping:{None:null,Icon:e.jsx(n,{})},control:{type:"select"}},headingIcon:{options:["None","Icon"],mapping:{None:null,Icon:e.jsx(n,{})},control:{type:"select"}},position:{options:Object.values(S),control:{type:"select"},defaultValue:S.Bottom},alignment:{options:Object.values(B),control:{type:"select"},defaultValue:B.Middle},withArrow:{control:{type:"boolean"},defaultValue:!1},withStrongBorder:{control:{type:"boolean"},defaultValue:!1},open:{control:{type:"boolean"},defaultValue:!1},linkUrl:{control:"text",defaultValue:!1},linkLabel:{control:"text",defaultValue:!1},disabled:{control:{type:"boolean"},defaultValue:!1},hidden:{control:{type:"boolean"},defaultValue:!1},flip:{control:{type:"boolean"},defaultValue:!0},hoverDelay:{control:{type:"number"},defaultValue:200},enterDelay:{control:{type:"number"},defaultValue:null},enablePortal:{control:{type:"boolean"},defaultValue:!1}}},t=r=>e.jsx("div",{className:"tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center",children:e.jsx(l,{...r})}),c=r=>e.jsxs("div",{className:"tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center",children:[e.jsx("p",{className:"tw-mr-2",children:"Label"}),e.jsx(l,{...r,triggerElement:e.jsx("button",{type:"button","aria-label":"Exclamation mark circle icon",className:"tw-mr-1",children:e.jsx(E,{})})}),e.jsx(l,{...r,content:"Second tooltip",triggerElement:e.jsx("button",{type:"button","aria-label":"Exclamation mark triangle icon",children:e.jsx(at,{})}),brightHeader:a.Warning})]}),p=t.bind({});p.args={enablePortal:!0};const d=t.bind({});d.args={brightHeader:a.Information};const m=t.bind({});m.args={brightHeader:a.Warning};const u=t.bind({});u.args={brightHeader:a.Tip};const g=t.bind({});g.args={brightHeader:a.Note};const w=t.bind({});w.args={withStrongBorder:!0};const y=t.bind({});y.args={buttons:[{label:"Primary",action:()=>null}]};const h=t.bind({});h.args={buttons:[{label:"Primary",action:()=>null},{label:"Secondary",action:()=>null}]};const f=t.bind({});f.args={heading:"I'm a heading"};const b=t.bind({});b.args={heading:"I'm a heading",headingIcon:e.jsx(n,{})};const T=t.bind({});T.args={tooltipIcon:e.jsx(n,{})};const v=t.bind({});v.args={triggerElement:e.jsx(n,{})};const x=t.bind({});x.args={linkUrl:"#"};const j=t.bind({});j.args={linkUrl:"#",linkLabel:"Upgrade your plan"};const N=t.bind({});N.args={tooltipIcon:e.jsx(n,{}),heading:"I'm a heading",headingIcon:e.jsx(n,{}),linkUrl:"#",brightHeader:a.Warning,buttons:[{label:"Primary",action:()=>null},{label:"Secondary",action:()=>null}]};const L=t.bind({});L.args={withArrow:!0};const q=t.bind({});q.args={open:!0,withArrow:!0};const i=t.bind({});i.args={disabled:!0};i.decorators=[r=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-justify-start",children:[e.jsxs("p",{children:["The tooltip content will NOT be rendered when ",e.jsx("strong",{children:"disabled"})," is true. It disables the tooltip open/close feature."]}),e.jsx(r,{})]})];const s=t.bind({});s.args={hidden:!0};s.decorators=[r=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-justify-start",children:[e.jsxs("p",{children:["The tooltip content will not be displayed, but still be rendered, when ",e.jsx("strong",{children:"hidden"})," is true."]}),e.jsx(r,{})]})];const it=r=>e.jsxs("div",{className:"tw-overflow-y-auto tw-shadow tw-h-[100px] tw-my-6",children:[e.jsx("p",{className:"tw-p2",children:"Title"}),e.jsx("p",{className:"tw-p2",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis iaculis eros. Curabitur quis tortor vestibulum lacus gravida ultrices eget sed velit. Donec id interdum nibh."}),e.jsx("div",{className:"tw-w-4",children:e.jsx(l,{...r,triggerElement:e.jsx("button",{type:"button","aria-label":"Exclamation mark circle icon",className:"tw-mr-1",children:e.jsx(E,{})})})}),e.jsx("p",{className:"tw-p2",children:"Duis orci sapien, gravida pellentesque cursus non, cursus vitae dolor. Etiam luctus aliquam sem, non maximus risus efficitur sit amet. Nulla diam urna"}),e.jsx("p",{className:"tw-p2",children:"Duis orci sapien, gravida pellentesque cursus non, cursus vitae dolor. Etiam luctus aliquam sem, non maximus risus efficitur sit amet. Nulla diam urna"})]}),I=it.bind({});I.args={withArrow:!0};const st=r=>{const o=Ze({});return e.jsxs(e.Fragment,{children:[e.jsx(et,{onClick:()=>o.open(),children:"Open Modal"}),e.jsxs(k,{onClose:o.close,isOpen:o.isOpen,isDismissable:!0,children:[e.jsx(k.Header,{title:"Modal title",leadText:"Lead text"}),e.jsx(k.Body,{direction:rt.Vertical,children:r.children}),e.jsx(k.Footer,{buttons:[{children:"Cancel",onClick:()=>{o.close()},style:P.Default,emphasis:D.Default},{children:"Confirm",onClick:()=>{nt("click"),o.close()},style:P.Default,emphasis:D.Strong}]})]})]})},C=()=>{const[r,o]=Xe.useState();return e.jsx(tt,{menuBlocks:[{id:"block1",ariaLabel:"First section",menuItems:[{id:1,title:"Item 1"},{id:2,title:"Item 2"},{id:3,title:"Item 3"},{id:4,title:"Item 4"}]}],activeItemId:r,onChange:Qe=>o(Qe)})},lt=r=>e.jsx(st,{isOpen:!1,children:e.jsxs("div",{children:[e.jsxs("div",{className:"tw-flex",children:[e.jsx(C,{}),e.jsx(l,{...r,triggerElement:e.jsx("button",{type:"button","aria-label":"Exclamation mark circle icon",className:"tw-mr-1",children:e.jsx(E,{})})})]}),e.jsx(ot,{label:{children:"Input Label",required:!1,htmlFor:"dropdownId",tooltip:{content:"Tooltip Text"}},children:e.jsx(C,{})})]})}),W=lt.bind({});W.args={alignment:B.End,position:S.Top};t.__docgenInfo={description:"",methods:[],displayName:"TooltipComponent",props:{triggerElement:{required:!1,tsType:{name:"ReactElement"},description:""},content:{required:!0,tsType:{name:"ReactNode"},description:""},tooltipIcon:{required:!1,tsType:{name:"ReactElement"},description:""},heading:{required:!1,tsType:{name:"ReactNode"},description:""},headingIcon:{required:!1,tsType:{name:"ReactElement"},description:""},linkUrl:{required:!1,tsType:{name:"string"},description:""},linkLabel:{required:!1,tsType:{name:"string"},description:""},brightHeader:{required:!1,tsType:{name:"BrightHeaderStyle"},description:""},buttons:{required:!1,tsType:{name:"union",raw:"[TooltipButton, TooltipButton] | [TooltipButton]",elements:[{name:"tuple",raw:"[TooltipButton, TooltipButton]",elements:[{name:"signature",type:"object",raw:`{
    label: string;
    action: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}},{name:"signature",type:"object",raw:`{
    label: string;
    action: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]},{name:"tuple",raw:"[TooltipButton]",elements:[{name:"signature",type:"object",raw:`{
    label: string;
    action: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]}]},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},position:{required:!1,tsType:{name:"union",raw:"TooltipPosition | 'top' | 'bottom' | 'left' | 'right'",elements:[{name:"TooltipPosition"},{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:""},alignment:{required:!1,tsType:{name:"TooltipAlignment"},description:""},flip:{required:!1,tsType:{name:"boolean"},description:""},withArrow:{required:!1,tsType:{name:"boolean"},description:""},withStrongBorder:{required:!1,tsType:{name:"boolean"},description:""},hoverDelay:{required:!1,tsType:{name:"number"},description:""},enterDelay:{required:!1,tsType:{name:"number"},description:""},open:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},hidden:{required:!1,tsType:{name:"boolean"},description:"@deprecated use disabled since the tooltip is always present in the DOM now so hidden has no effect anymore"},enablePortal:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};c.__docgenInfo={description:"",methods:[],displayName:"MultipleTooltipsComponent",props:{triggerElement:{required:!1,tsType:{name:"ReactElement"},description:""},content:{required:!0,tsType:{name:"ReactNode"},description:""},tooltipIcon:{required:!1,tsType:{name:"ReactElement"},description:""},heading:{required:!1,tsType:{name:"ReactNode"},description:""},headingIcon:{required:!1,tsType:{name:"ReactElement"},description:""},linkUrl:{required:!1,tsType:{name:"string"},description:""},linkLabel:{required:!1,tsType:{name:"string"},description:""},brightHeader:{required:!1,tsType:{name:"BrightHeaderStyle"},description:""},buttons:{required:!1,tsType:{name:"union",raw:"[TooltipButton, TooltipButton] | [TooltipButton]",elements:[{name:"tuple",raw:"[TooltipButton, TooltipButton]",elements:[{name:"signature",type:"object",raw:`{
    label: string;
    action: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}},{name:"signature",type:"object",raw:`{
    label: string;
    action: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]},{name:"tuple",raw:"[TooltipButton]",elements:[{name:"signature",type:"object",raw:`{
    label: string;
    action: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]}]},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},position:{required:!1,tsType:{name:"union",raw:"TooltipPosition | 'top' | 'bottom' | 'left' | 'right'",elements:[{name:"TooltipPosition"},{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:""},alignment:{required:!1,tsType:{name:"TooltipAlignment"},description:""},flip:{required:!1,tsType:{name:"boolean"},description:""},withArrow:{required:!1,tsType:{name:"boolean"},description:""},withStrongBorder:{required:!1,tsType:{name:"boolean"},description:""},hoverDelay:{required:!1,tsType:{name:"number"},description:""},enterDelay:{required:!1,tsType:{name:"number"},description:""},open:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},hidden:{required:!1,tsType:{name:"boolean"},description:"@deprecated use disabled since the tooltip is always present in the DOM now so hidden has no effect anymore"},enablePortal:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};var H,M,O;t.parameters={...t.parameters,docs:{...(H=t.parameters)==null?void 0:H.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(O=(M=t.parameters)==null?void 0:M.docs)==null?void 0:O.source}}};var A,R,V;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <p className="tw-mr-2">Label</p>
            <LegacyTooltip {...args} triggerElement={<button type="button" aria-label="Exclamation mark circle icon" className="tw-mr-1">
                        <IconExclamationMarkCircle16Filled />
                    </button>} />
            <LegacyTooltip {...args} content="Second tooltip" triggerElement={<button type="button" aria-label="Exclamation mark triangle icon">
                        <IconExclamationMarkTriangle16 />
                    </button>} brightHeader={BrightHeaderStyle.Warning} />
        </div>;
}`,...(V=(R=c.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var _,F,U;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(U=(F=p.parameters)==null?void 0:F.docs)==null?void 0:U.source}}};var $,K,Y;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(Y=(K=d.parameters)==null?void 0:K.docs)==null?void 0:Y.source}}};var z,G,J;m.parameters={...m.parameters,docs:{...(z=m.parameters)==null?void 0:z.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(J=(G=m.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var Q,X,Z;u.parameters={...u.parameters,docs:{...(Q=u.parameters)==null?void 0:Q.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(Z=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,te,re;g.parameters={...g.parameters,docs:{...(ee=g.parameters)==null?void 0:ee.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(re=(te=g.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};var ae,oe,ne;w.parameters={...w.parameters,docs:{...(ae=w.parameters)==null?void 0:ae.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(ne=(oe=w.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};var ie,se,le;y.parameters={...y.parameters,docs:{...(ie=y.parameters)==null?void 0:ie.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(le=(se=y.parameters)==null?void 0:se.docs)==null?void 0:le.source}}};var ce,pe,de;h.parameters={...h.parameters,docs:{...(ce=h.parameters)==null?void 0:ce.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(de=(pe=h.parameters)==null?void 0:pe.docs)==null?void 0:de.source}}};var me,ue,ge;f.parameters={...f.parameters,docs:{...(me=f.parameters)==null?void 0:me.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(ge=(ue=f.parameters)==null?void 0:ue.docs)==null?void 0:ge.source}}};var we,ye,he;b.parameters={...b.parameters,docs:{...(we=b.parameters)==null?void 0:we.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(he=(ye=b.parameters)==null?void 0:ye.docs)==null?void 0:he.source}}};var fe,be,Te;T.parameters={...T.parameters,docs:{...(fe=T.parameters)==null?void 0:fe.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(Te=(be=T.parameters)==null?void 0:be.docs)==null?void 0:Te.source}}};var ve,xe,je;v.parameters={...v.parameters,docs:{...(ve=v.parameters)==null?void 0:ve.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(je=(xe=v.parameters)==null?void 0:xe.docs)==null?void 0:je.source}}};var Ne,Le,qe;x.parameters={...x.parameters,docs:{...(Ne=x.parameters)==null?void 0:Ne.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(qe=(Le=x.parameters)==null?void 0:Le.docs)==null?void 0:qe.source}}};var Ie,We,ke;j.parameters={...j.parameters,docs:{...(Ie=j.parameters)==null?void 0:Ie.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(ke=(We=j.parameters)==null?void 0:We.docs)==null?void 0:ke.source}}};var Ee,Be,Se;N.parameters={...N.parameters,docs:{...(Ee=N.parameters)==null?void 0:Ee.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(Se=(Be=N.parameters)==null?void 0:Be.docs)==null?void 0:Se.source}}};var De,Pe,Ce;L.parameters={...L.parameters,docs:{...(De=L.parameters)==null?void 0:De.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(Ce=(Pe=L.parameters)==null?void 0:Pe.docs)==null?void 0:Ce.source}}};var He,Me,Oe;q.parameters={...q.parameters,docs:{...(He=q.parameters)==null?void 0:He.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(Oe=(Me=q.parameters)==null?void 0:Me.docs)==null?void 0:Oe.source}}};var Ae,Re,Ve;i.parameters={...i.parameters,docs:{...(Ae=i.parameters)==null?void 0:Ae.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(Ve=(Re=i.parameters)==null?void 0:Re.docs)==null?void 0:Ve.source}}};var _e,Fe,Ue;s.parameters={...s.parameters,docs:{...(_e=s.parameters)==null?void 0:_e.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(Ue=(Fe=s.parameters)==null?void 0:Fe.docs)==null?void 0:Ue.source}}};var $e,Ke,Ye;I.parameters={...I.parameters,docs:{...($e=I.parameters)==null?void 0:$e.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-overflow-y-auto tw-shadow tw-h-[100px] tw-my-6">
            <p className="tw-p2">Title</p>
            <p className="tw-p2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis iaculis eros. Curabitur quis tortor
                vestibulum lacus gravida ultrices eget sed velit. Donec id interdum nibh.
            </p>
            <div className="tw-w-4">
                <LegacyTooltip {...args} triggerElement={<button type="button" aria-label="Exclamation mark circle icon" className="tw-mr-1">
                            <IconExclamationMarkCircle16Filled />
                        </button>} />
            </div>
            <p className="tw-p2">
                Duis orci sapien, gravida pellentesque cursus non, cursus vitae dolor. Etiam luctus aliquam sem, non
                maximus risus efficitur sit amet. Nulla diam urna
            </p>
            <p className="tw-p2">
                Duis orci sapien, gravida pellentesque cursus non, cursus vitae dolor. Etiam luctus aliquam sem, non
                maximus risus efficitur sit amet. Nulla diam urna
            </p>
        </div>;
}`,...(Ye=(Ke=I.parameters)==null?void 0:Ke.docs)==null?void 0:Ye.source}}};var ze,Ge,Je;W.parameters={...W.parameters,docs:{...(ze=W.parameters)==null?void 0:ze.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <ModalComponent isOpen={false}>
            <div>
                <div className="tw-flex">
                    <DropdownComponent />
                    <LegacyTooltip {...args} triggerElement={<button type="button" aria-label="Exclamation mark circle icon" className="tw-mr-1">
                                <IconExclamationMarkCircle16Filled />
                            </button>} />
                </div>
                <FormControl label={{
        children: 'Input Label',
        required: false,
        htmlFor: 'dropdownId',
        tooltip: {
          content: 'Tooltip Text'
        }
      }}>
                    <DropdownComponent />
                </FormControl>
            </div>
        </ModalComponent>;
}`,...(Je=(Ge=W.parameters)==null?void 0:Ge.docs)==null?void 0:Je.source}}};const hr=["TooltipComponent","MultipleTooltipsComponent","WithPortal","WithInfoBrightHeader","WithWarningBrightHeader","WithTipBrightHeader","WithNoteBrightHeader","WithStrongBorder","WithOneButton","WithTwoButtons","WithHeading","WithHeadingAndIcon","TooltipWithIcon","TooltipWithIconAsTriggerElement","WithLinkWithDefaultLabel","WithLinkWithCustomLabel","WithEverythingDisplayed","WithArrow","OpenByDefault","DisabledTooltip","HiddenTooltip","WithOverflownContainer","InsideModalWithDropdown"];export{i as DisabledTooltip,s as HiddenTooltip,W as InsideModalWithDropdown,c as MultipleTooltipsComponent,q as OpenByDefault,t as TooltipComponent,T as TooltipWithIcon,v as TooltipWithIconAsTriggerElement,L as WithArrow,N as WithEverythingDisplayed,f as WithHeading,b as WithHeadingAndIcon,d as WithInfoBrightHeader,j as WithLinkWithCustomLabel,x as WithLinkWithDefaultLabel,g as WithNoteBrightHeader,y as WithOneButton,I as WithOverflownContainer,p as WithPortal,w as WithStrongBorder,u as WithTipBrightHeader,h as WithTwoButtons,m as WithWarningBrightHeader,hr as __namedExportsOrder,yr as default};
