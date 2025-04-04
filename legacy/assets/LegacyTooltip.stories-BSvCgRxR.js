import{j as e}from"./jsx-runtime-BYYWji4R.js";import{$ as Ye}from"./useOverlayTriggerState-Do1lhetf.js";import{a as Ze}from"./index-B-lxVbXh.js";import{r as et}from"./index-ClcD9ViR.js";import{c as tt,a as C,b as D}from"./Button-CacleqQO.js";import{c as rt}from"./Dropdown-DNd1p4TV.js";import{M as k}from"./Modal-CnELJqNY.js";import{S as at}from"./ScrollWrapper-DB7P7F1Z.js";import{b as B,T as S,B as a,L as l,c as E}from"./LegacyTooltip-CmyMM9dF.js";import{I as ot}from"./IconExclamationMarkTriangle-DOh84ahI.js";import{I as n}from"./IconIcon-BWl0U0xY.js";import{F as nt}from"./FormControl--ehuic3I.js";import"./FocusScope-BbG7qqtO.js";import"./useFocusRing-CqhiwHAH.js";import"./useEffectEvent-23OTMzEQ.js";import"./useFocusable-NpJIjJzn.js";import"./chain-zZtnTS2i.js";import"./index-Cho7bklK.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./useControlledState-CbyHarIm.js";import"./v4-CtRu48qb.js";import"./useButton-CmN_Qqm3.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./useMenuTrigger-WEg3SWYq.js";import"./useLabels-B-KZ60t7.js";import"./useLocalizedStringFormatter-DuHRzRSj.js";import"./context-dZDq9eSh.js";import"./VisuallyHidden-BJ4JcGHV.js";import"./helper-kX8HYG1i.js";import"./isScrollable-BSEN4xi5.js";import"./SelectionManager-C5uJtM9S.js";import"./useField-DK1vwUqC.js";import"./useFormValidationState-CY2oi0R5.js";import"./usePopper-BHXQC2xD.js";import"./index-DlnOb27V.js";import"./MenuItem-CSK1Q0qS.js";import"./IconCaretRight-CAeLeSzU.js";import"./IconCheckMark-DDrIoLdu.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-N4gckcbl.js";import"./Trigger-DPfUCRqP.js";import"./IconCaretDown-BLgqrlDL.js";import"./IconCaretDown16-Df8Xsbqc.js";import"./IconCross-BVasaH61.js";import"./IconTrashBin16-DOiZQ5Am.js";import"./IconTrashBin24-10Yg3nt7.js";import"./validation-CJXPAjNB.js";import"./EnablePortalWrapper-DHpdIRHB.js";import"./Portal-B3A1C5qZ.js";import"./useMemoizedId-DU5NJZZj.js";import"./useDialog-DNMX-qOU.js";import"./FrontifyPattern-WpjcW4FF.js";import"./index-dpLYmkX3.js";import"./motion-DqKuqH19.js";import"./useLink-DLd-zCvm.js";import"./IconExclamationMarkCircle24-4UiwpX0o.js";import"./IconExclamationMarkTriangle24-BCoex7hw.js";import"./IconIcon16-C2dL_dFK.js";import"./IconIcon24-CwdP1Xwm.js";import"./InputLabel-CAP8jsDr.js";import"./TooltipIcon-C9vG9kLd.js";import"./IconQuestionMarkCircle-7EPrDyIp.js";const br={title:"Deprecated/LegacyTooltip",component:l,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Tooltip component](/docs/current_components-tooltip--documentation) instead."}}},args:{content:"Cupcake ipsum dolor sit amet ice cream. (https://Cupcakeipsumdolorsitameticecream.com)",heading:"",triggerElement:e.jsxs("button",{className:"tw-flex tw-justify-center tw-items-center",children:[e.jsx("span",{className:"tw-flex tw-leading-3",children:e.jsx(E,{})}),e.jsx("span",{children:"Tooltip trigger"})]})},argTypes:{triggerElement:{table:{disable:!0}},brightHeader:{options:["None","Information","Warning","Tip","Note"],mapping:{None:null,Information:a.Information,Warning:a.Warning,Tip:a.Tip,Note:a.Note},control:{type:"select"}},tooltipIcon:{options:["None","Icon"],mapping:{None:null,Icon:e.jsx(n,{})},control:{type:"select"}},headingIcon:{options:["None","Icon"],mapping:{None:null,Icon:e.jsx(n,{})},control:{type:"select"}},position:{options:Object.values(S),control:{type:"select"},defaultValue:S.Bottom},alignment:{options:Object.values(B),control:{type:"select"},defaultValue:B.Middle},withArrow:{control:{type:"boolean"},defaultValue:!1},withStrongBorder:{control:{type:"boolean"},defaultValue:!1},open:{control:{type:"boolean"},defaultValue:!1},linkUrl:{control:"text",defaultValue:!1},linkLabel:{control:"text",defaultValue:!1},disabled:{control:{type:"boolean"},defaultValue:!1},hidden:{control:{type:"boolean"},defaultValue:!1},flip:{control:{type:"boolean"},defaultValue:!0},hoverDelay:{control:{type:"number"},defaultValue:200},enterDelay:{control:{type:"number"},defaultValue:null},enablePortal:{control:{type:"boolean"},defaultValue:!1}}},t=r=>e.jsx("div",{className:"tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center",children:e.jsx(l,{...r})}),c=r=>e.jsxs("div",{className:"tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center",children:[e.jsx("p",{className:"tw-mr-2",children:"Label"}),e.jsx(l,{...r,triggerElement:e.jsx("button",{"aria-label":"Exclamation mark circle icon",className:"tw-mr-1",children:e.jsx(E,{})})}),e.jsx(l,{...r,content:"Second tooltip",triggerElement:e.jsx("button",{"aria-label":"Exclamation mark triangle icon",children:e.jsx(ot,{})}),brightHeader:a.Warning})]}),p=t.bind({});p.args={enablePortal:!0};const d=t.bind({});d.args={brightHeader:a.Information};const m=t.bind({});m.args={brightHeader:a.Warning};const u=t.bind({});u.args={brightHeader:a.Tip};const g=t.bind({});g.args={brightHeader:a.Note};const w=t.bind({});w.args={withStrongBorder:!0};const y=t.bind({});y.args={buttons:[{label:"Primary",action:()=>null}]};const h=t.bind({});h.args={buttons:[{label:"Primary",action:()=>null},{label:"Secondary",action:()=>null}]};const f=t.bind({});f.args={heading:"I'm a heading"};const b=t.bind({});b.args={heading:"I'm a heading",headingIcon:e.jsx(n,{})};const T=t.bind({});T.args={tooltipIcon:e.jsx(n,{})};const v=t.bind({});v.args={triggerElement:e.jsx(n,{})};const x=t.bind({});x.args={linkUrl:"#"};const j=t.bind({});j.args={linkUrl:"#",linkLabel:"Upgrade your plan"};const N=t.bind({});N.args={tooltipIcon:e.jsx(n,{}),heading:"I'm a heading",headingIcon:e.jsx(n,{}),linkUrl:"#",brightHeader:a.Warning,buttons:[{label:"Primary",action:()=>null},{label:"Secondary",action:()=>null}]};const L=t.bind({});L.args={withArrow:!0};const q=t.bind({});q.args={open:!0,withArrow:!0};const i=t.bind({});i.args={disabled:!0};i.decorators=[r=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-justify-start",children:[e.jsxs("p",{children:["The tooltip content will NOT be rendered when ",e.jsx("strong",{children:"disabled"})," is true. It disables the tooltip open/close feature."]}),e.jsx(r,{})]})];const s=t.bind({});s.args={hidden:!0};s.decorators=[r=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-justify-start",children:[e.jsxs("p",{children:["The tooltip content will not be displayed, but still be rendered, when ",e.jsx("strong",{children:"hidden"})," is true."]}),e.jsx(r,{})]})];const it=r=>e.jsxs("div",{className:"tw-overflow-y-auto tw-shadow tw-h-[100px] tw-my-6",children:[e.jsx("p",{className:"tw-p2",children:"Title"}),e.jsx("p",{className:"tw-p2",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis iaculis eros. Curabitur quis tortor vestibulum lacus gravida ultrices eget sed velit. Donec id interdum nibh."}),e.jsx("div",{className:"tw-w-4",children:e.jsx(l,{...r,triggerElement:e.jsx("button",{"aria-label":"Exclamation mark circle icon",className:"tw-mr-1",children:e.jsx(E,{})})})}),e.jsx("p",{className:"tw-p2",children:"Duis orci sapien, gravida pellentesque cursus non, cursus vitae dolor. Etiam luctus aliquam sem, non maximus risus efficitur sit amet. Nulla diam urna"}),e.jsx("p",{className:"tw-p2",children:"Duis orci sapien, gravida pellentesque cursus non, cursus vitae dolor. Etiam luctus aliquam sem, non maximus risus efficitur sit amet. Nulla diam urna"})]}),I=it.bind({});I.args={withArrow:!0};const st=r=>{const o=Ye({});return e.jsxs(e.Fragment,{children:[e.jsx(tt,{onClick:()=>o.open(),children:"Open Modal"}),e.jsxs(k,{onClose:o.close,isOpen:o.isOpen,isDismissable:!0,children:[e.jsx(k.Header,{title:"Modal title",leadText:"Lead text"}),e.jsx(k.Body,{direction:at.Vertical,children:r.children}),e.jsx(k.Footer,{buttons:[{children:"Cancel",onClick:()=>{o.close()},style:D.Default,emphasis:C.Default},{children:"Confirm",onClick:()=>{Ze("click"),o.close()},style:D.Default,emphasis:C.Strong}]})]})]})},P=()=>{const[r,o]=et.useState();return e.jsx(rt,{menuBlocks:[{id:"block1",ariaLabel:"First section",menuItems:[{id:1,title:"Item 1"},{id:2,title:"Item 2"},{id:3,title:"Item 3"},{id:4,title:"Item 4"}]}],activeItemId:r,onChange:Xe=>o(Xe)})},lt=r=>e.jsx(st,{isOpen:!1,children:e.jsxs("div",{children:[e.jsxs("div",{className:"tw-flex",children:[e.jsx(P,{}),e.jsx(l,{...r,triggerElement:e.jsx("button",{"aria-label":"Exclamation mark circle icon",className:"tw-mr-1",children:e.jsx(E,{})})})]}),e.jsx(nt,{label:{children:"Input Label",required:!1,htmlFor:"dropdownId",tooltip:{content:"Tooltip Text"}},children:e.jsx(P,{})})]})}),W=lt.bind({});W.args={alignment:B.End,position:S.Top};t.__docgenInfo={description:"",methods:[],displayName:"TooltipComponent",props:{triggerElement:{required:!1,tsType:{name:"ReactElement"},description:""},content:{required:!0,tsType:{name:"ReactNode"},description:""},tooltipIcon:{required:!1,tsType:{name:"ReactElement"},description:""},heading:{required:!1,tsType:{name:"ReactNode"},description:""},headingIcon:{required:!1,tsType:{name:"ReactElement"},description:""},linkUrl:{required:!1,tsType:{name:"string"},description:""},linkLabel:{required:!1,tsType:{name:"string"},description:""},brightHeader:{required:!1,tsType:{name:"BrightHeaderStyle"},description:""},buttons:{required:!1,tsType:{name:"union",raw:"[TooltipButton, TooltipButton] | [TooltipButton]",elements:[{name:"tuple",raw:"[TooltipButton, TooltipButton]",elements:[{name:"signature",type:"object",raw:`{
    label: string;
    action: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}},{name:"signature",type:"object",raw:`{
    label: string;
    action: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]},{name:"tuple",raw:"[TooltipButton]",elements:[{name:"signature",type:"object",raw:`{
    label: string;
    action: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]}]},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},position:{required:!1,tsType:{name:"TooltipPosition"},description:""},alignment:{required:!1,tsType:{name:"TooltipAlignment"},description:""},flip:{required:!1,tsType:{name:"boolean"},description:""},withArrow:{required:!1,tsType:{name:"boolean"},description:""},withStrongBorder:{required:!1,tsType:{name:"boolean"},description:""},hoverDelay:{required:!1,tsType:{name:"number"},description:""},enterDelay:{required:!1,tsType:{name:"number"},description:""},open:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},hidden:{required:!1,tsType:{name:"boolean"},description:"@deprecated use disabled since the tooltip is always present in the DOM now so hidden has no effect anymore"},enablePortal:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};c.__docgenInfo={description:"",methods:[],displayName:"MultipleTooltipsComponent",props:{triggerElement:{required:!1,tsType:{name:"ReactElement"},description:""},content:{required:!0,tsType:{name:"ReactNode"},description:""},tooltipIcon:{required:!1,tsType:{name:"ReactElement"},description:""},heading:{required:!1,tsType:{name:"ReactNode"},description:""},headingIcon:{required:!1,tsType:{name:"ReactElement"},description:""},linkUrl:{required:!1,tsType:{name:"string"},description:""},linkLabel:{required:!1,tsType:{name:"string"},description:""},brightHeader:{required:!1,tsType:{name:"BrightHeaderStyle"},description:""},buttons:{required:!1,tsType:{name:"union",raw:"[TooltipButton, TooltipButton] | [TooltipButton]",elements:[{name:"tuple",raw:"[TooltipButton, TooltipButton]",elements:[{name:"signature",type:"object",raw:`{
    label: string;
    action: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}},{name:"signature",type:"object",raw:`{
    label: string;
    action: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]},{name:"tuple",raw:"[TooltipButton]",elements:[{name:"signature",type:"object",raw:`{
    label: string;
    action: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]}]},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},position:{required:!1,tsType:{name:"TooltipPosition"},description:""},alignment:{required:!1,tsType:{name:"TooltipAlignment"},description:""},flip:{required:!1,tsType:{name:"boolean"},description:""},withArrow:{required:!1,tsType:{name:"boolean"},description:""},withStrongBorder:{required:!1,tsType:{name:"boolean"},description:""},hoverDelay:{required:!1,tsType:{name:"number"},description:""},enterDelay:{required:!1,tsType:{name:"number"},description:""},open:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},hidden:{required:!1,tsType:{name:"boolean"},description:"@deprecated use disabled since the tooltip is always present in the DOM now so hidden has no effect anymore"},enablePortal:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};var H,M,O;t.parameters={...t.parameters,docs:{...(H=t.parameters)==null?void 0:H.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(O=(M=t.parameters)==null?void 0:M.docs)==null?void 0:O.source}}};var A,V,F;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <p className="tw-mr-2">Label</p>
            <LegacyTooltip {...args} triggerElement={<button aria-label="Exclamation mark circle icon" className="tw-mr-1">
                        <IconExclamationMarkCircle16Filled />
                    </button>} />
            <LegacyTooltip {...args} content="Second tooltip" triggerElement={<button aria-label="Exclamation mark triangle icon">
                        <IconExclamationMarkTriangle16 />
                    </button>} brightHeader={BrightHeaderStyle.Warning} />
        </div>;
}`,...(F=(V=c.parameters)==null?void 0:V.docs)==null?void 0:F.source}}};var R,U,_;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(_=(U=p.parameters)==null?void 0:U.docs)==null?void 0:_.source}}};var $,z,G;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(G=(z=d.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var J,K,Q;m.parameters={...m.parameters,docs:{...(J=m.parameters)==null?void 0:J.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(Q=(K=m.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var X,Y,Z;u.parameters={...u.parameters,docs:{...(X=u.parameters)==null?void 0:X.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(Z=(Y=u.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,te,re;g.parameters={...g.parameters,docs:{...(ee=g.parameters)==null?void 0:ee.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
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
}`,...(Se=(Be=N.parameters)==null?void 0:Be.docs)==null?void 0:Se.source}}};var Ce,De,Pe;L.parameters={...L.parameters,docs:{...(Ce=L.parameters)==null?void 0:Ce.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(Pe=(De=L.parameters)==null?void 0:De.docs)==null?void 0:Pe.source}}};var He,Me,Oe;q.parameters={...q.parameters,docs:{...(He=q.parameters)==null?void 0:He.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(Oe=(Me=q.parameters)==null?void 0:Me.docs)==null?void 0:Oe.source}}};var Ae,Ve,Fe;i.parameters={...i.parameters,docs:{...(Ae=i.parameters)==null?void 0:Ae.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(Fe=(Ve=i.parameters)==null?void 0:Ve.docs)==null?void 0:Fe.source}}};var Re,Ue,_e;s.parameters={...s.parameters,docs:{...(Re=s.parameters)==null?void 0:Re.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(_e=(Ue=s.parameters)==null?void 0:Ue.docs)==null?void 0:_e.source}}};var $e,ze,Ge;I.parameters={...I.parameters,docs:{...($e=I.parameters)==null?void 0:$e.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-overflow-y-auto tw-shadow tw-h-[100px] tw-my-6">
            <p className="tw-p2">Title</p>
            <p className="tw-p2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis iaculis eros. Curabitur quis tortor
                vestibulum lacus gravida ultrices eget sed velit. Donec id interdum nibh.
            </p>
            <div className="tw-w-4">
                <LegacyTooltip {...args} triggerElement={<button aria-label="Exclamation mark circle icon" className="tw-mr-1">
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
}`,...(Ge=(ze=I.parameters)==null?void 0:ze.docs)==null?void 0:Ge.source}}};var Je,Ke,Qe;W.parameters={...W.parameters,docs:{...(Je=W.parameters)==null?void 0:Je.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <ModalComponent isOpen={false}>
            <div>
                <div className="tw-flex">
                    <DropdownComponent />
                    <LegacyTooltip {...args} triggerElement={<button aria-label="Exclamation mark circle icon" className="tw-mr-1">
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
}`,...(Qe=(Ke=W.parameters)==null?void 0:Ke.docs)==null?void 0:Qe.source}}};const Tr=["TooltipComponent","MultipleTooltipsComponent","WithPortal","WithInfoBrightHeader","WithWarningBrightHeader","WithTipBrightHeader","WithNoteBrightHeader","WithStrongBorder","WithOneButton","WithTwoButtons","WithHeading","WithHeadingAndIcon","TooltipWithIcon","TooltipWithIconAsTriggerElement","WithLinkWithDefaultLabel","WithLinkWithCustomLabel","WithEverythingDisplayed","WithArrow","OpenByDefault","DisabledTooltip","HiddenTooltip","WithOverflownContainer","InsideModalWithDropdown"];export{i as DisabledTooltip,s as HiddenTooltip,W as InsideModalWithDropdown,c as MultipleTooltipsComponent,q as OpenByDefault,t as TooltipComponent,T as TooltipWithIcon,v as TooltipWithIconAsTriggerElement,L as WithArrow,N as WithEverythingDisplayed,f as WithHeading,b as WithHeadingAndIcon,d as WithInfoBrightHeader,j as WithLinkWithCustomLabel,x as WithLinkWithDefaultLabel,g as WithNoteBrightHeader,y as WithOneButton,I as WithOverflownContainer,p as WithPortal,w as WithStrongBorder,u as WithTipBrightHeader,h as WithTwoButtons,m as WithWarningBrightHeader,Tr as __namedExportsOrder,br as default};
