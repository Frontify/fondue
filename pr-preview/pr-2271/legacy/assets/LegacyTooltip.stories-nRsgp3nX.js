import{j as e}from"./jsx-runtime-DH9XN8A8.js";import{$ as Ye}from"./useOverlayTriggerState-C3ap9Qkt.js";import{a as Ze}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{r as et}from"./index-v7USjxUg.js";import{c as tt,a as D,b as C}from"./Button-BfBJpGQT.js";import{D as rt}from"./Dropdown-Dao21ydm.js";import{M as k}from"./Modal-BY7QQalw.js";import{S as at}from"./ScrollWrapper-BQzUEppe.js";import{L as l,b as E,B as a,T as B,c as S}from"./LegacyTooltip-BReeJmjq.js";import{I as ot}from"./IconExclamationMarkTriangle-CTTfs2nR.js";import{I as n}from"./IconIcon-Czev5ZcQ.js";import{F as nt}from"./FormControl-DeLflFlr.js";import"./FocusScope-Drcq722v.js";import"./useFocusable-BRFkliNn.js";import"./useFocusRing-CP9UJNUw.js";import"./useEffectEvent-BaECT7_f.js";import"./chain-C8AhrK0W.js";import"./useControlledState-BSgwHaZM.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./useButton-B6orroTH.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./useMenuTrigger-dROe67R1.js";import"./useLabels-v-oj2KeZ.js";import"./useLocalizedStringFormatter-BEKlpfz7.js";import"./context-BFA77VTM.js";import"./VisuallyHidden-CBFC6H_6.js";import"./helper-B_Vetl89.js";import"./isScrollable-BSEN4xi5.js";import"./index-voQlCD4e.js";import"./SelectionManager-BD4p7d3N.js";import"./useField-Cf7VimOC.js";import"./useFormValidationState-BKAFCnHb.js";import"./usePopper-BO8FF5JQ.js";import"./index-DlnOb27V.js";import"./MenuItem-n3bavbk_.js";import"./IconCaretRight-bL6MdAvD.js";import"./IconCheckMark-CMS57PRn.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BSQayp2F.js";import"./Trigger-BvTVBjbf.js";import"./IconCaretDown-BxzyP7sS.js";import"./IconCaretDown16-DV8CvCws.js";import"./IconCross-LL1GOU_p.js";import"./IconTrashBin16-Db8fv2tm.js";import"./IconTrashBin24-Dz-kV-1n.js";import"./validation-CJXPAjNB.js";import"./EnablePortalWrapper-DzTSSIqA.js";import"./Portal-BMcVKwlx.js";import"./useMemoizedId-Cl5PI4eu.js";import"./useDialog-CD34IraE.js";import"./FrontifyPattern-BdWGRRCj.js";import"./motion-EixWmitH.js";import"./index-BYX5Ewl3.js";import"./useLink-C2PgwcjG.js";import"./IconExclamationMarkCircle24-CS86ZjBV.js";import"./IconExclamationMarkTriangle24-ZUoV6XtQ.js";import"./IconIcon16-KBXYRe7H.js";import"./IconIcon24-HjPMrfFS.js";import"./InputLabel-CAkTbk9Q.js";import"./TooltipIcon-DWdr_hgc.js";import"./IconQuestionMarkCircle-DT_LrHkX.js";const br={title:"Deprecated/LegacyTooltip",component:l,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Tooltip component](/docs/current_components-tooltip--documentation) instead."}}},args:{content:"Cupcake ipsum dolor sit amet ice cream. (https://Cupcakeipsumdolorsitameticecream.com)",heading:"",triggerElement:e.jsxs("button",{className:"tw-flex tw-justify-center tw-items-center",children:[e.jsx("span",{className:"tw-flex tw-leading-3",children:e.jsx(E,{})}),e.jsx("span",{children:"Tooltip trigger"})]})},argTypes:{triggerElement:{table:{disable:!0}},brightHeader:{options:["None","Information","Warning","Tip","Note"],mapping:{None:null,Information:a.Information,Warning:a.Warning,Tip:a.Tip,Note:a.Note},control:{type:"select"}},tooltipIcon:{options:["None","Icon"],mapping:{None:null,Icon:e.jsx(n,{})},control:{type:"select"}},headingIcon:{options:["None","Icon"],mapping:{None:null,Icon:e.jsx(n,{})},control:{type:"select"}},position:{options:Object.values(B),control:{type:"select"},defaultValue:B.Bottom},alignment:{options:Object.values(S),control:{type:"select"},defaultValue:S.Middle},withArrow:{control:{type:"boolean"},defaultValue:!1},withStrongBorder:{control:{type:"boolean"},defaultValue:!1},open:{control:{type:"boolean"},defaultValue:!1},linkUrl:{control:"text",defaultValue:!1},linkLabel:{control:"text",defaultValue:!1},disabled:{control:{type:"boolean"},defaultValue:!1},hidden:{control:{type:"boolean"},defaultValue:!1},flip:{control:{type:"boolean"},defaultValue:!0},hoverDelay:{control:{type:"number"},defaultValue:200},enterDelay:{control:{type:"number"},defaultValue:null},enablePortal:{control:{type:"boolean"},defaultValue:!1}}},t=r=>e.jsx("div",{className:"tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center",children:e.jsx(l,{...r})}),c=r=>e.jsxs("div",{className:"tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center",children:[e.jsx("p",{className:"tw-mr-2",children:"Label"}),e.jsx(l,{...r,triggerElement:e.jsx("button",{"aria-label":"Exclamation mark circle icon",className:"tw-mr-1",children:e.jsx(E,{})})}),e.jsx(l,{...r,content:"Second tooltip",triggerElement:e.jsx("button",{"aria-label":"Exclamation mark triangle icon",children:e.jsx(ot,{})}),brightHeader:a.Warning})]}),p=t.bind({});p.args={enablePortal:!0};const d=t.bind({});d.args={brightHeader:a.Information};const m=t.bind({});m.args={brightHeader:a.Warning};const u=t.bind({});u.args={brightHeader:a.Tip};const g=t.bind({});g.args={brightHeader:a.Note};const w=t.bind({});w.args={withStrongBorder:!0};const y=t.bind({});y.args={buttons:[{label:"Primary",action:()=>null}]};const h=t.bind({});h.args={buttons:[{label:"Primary",action:()=>null},{label:"Secondary",action:()=>null}]};const f=t.bind({});f.args={heading:"I'm a heading"};const b=t.bind({});b.args={heading:"I'm a heading",headingIcon:e.jsx(n,{})};const T=t.bind({});T.args={tooltipIcon:e.jsx(n,{})};const v=t.bind({});v.args={triggerElement:e.jsx(n,{})};const x=t.bind({});x.args={linkUrl:"#"};const j=t.bind({});j.args={linkUrl:"#",linkLabel:"Upgrade your plan"};const N=t.bind({});N.args={tooltipIcon:e.jsx(n,{}),heading:"I'm a heading",headingIcon:e.jsx(n,{}),linkUrl:"#",brightHeader:a.Warning,buttons:[{label:"Primary",action:()=>null},{label:"Secondary",action:()=>null}]};const L=t.bind({});L.args={withArrow:!0};const q=t.bind({});q.args={open:!0,withArrow:!0};const i=t.bind({});i.args={disabled:!0};i.decorators=[r=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-justify-start",children:[e.jsxs("p",{children:["The tooltip content will NOT be rendered when ",e.jsx("strong",{children:"disabled"})," is true. It disables the tooltip open/close feature."]}),e.jsx(r,{})]})];const s=t.bind({});s.args={hidden:!0};s.decorators=[r=>e.jsxs("div",{className:"tw-flex tw-flex-col tw-justify-start",children:[e.jsxs("p",{children:["The tooltip content will not be displayed, but still be rendered, when ",e.jsx("strong",{children:"hidden"})," is true."]}),e.jsx(r,{})]})];const it=r=>e.jsxs("div",{className:"tw-overflow-y-auto tw-shadow tw-h-[100px] tw-my-6",children:[e.jsx("p",{className:"tw-p2",children:"Title"}),e.jsx("p",{className:"tw-p2",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis iaculis eros. Curabitur quis tortor vestibulum lacus gravida ultrices eget sed velit. Donec id interdum nibh."}),e.jsx("div",{className:"tw-w-4",children:e.jsx(l,{...r,triggerElement:e.jsx("button",{"aria-label":"Exclamation mark circle icon",className:"tw-mr-1",children:e.jsx(E,{})})})}),e.jsx("p",{className:"tw-p2",children:"Duis orci sapien, gravida pellentesque cursus non, cursus vitae dolor. Etiam luctus aliquam sem, non maximus risus efficitur sit amet. Nulla diam urna"}),e.jsx("p",{className:"tw-p2",children:"Duis orci sapien, gravida pellentesque cursus non, cursus vitae dolor. Etiam luctus aliquam sem, non maximus risus efficitur sit amet. Nulla diam urna"})]}),I=it.bind({});I.args={withArrow:!0};const st=r=>{const o=Ye({});return e.jsxs(e.Fragment,{children:[e.jsx(tt,{onClick:()=>o.open(),children:"Open Modal"}),e.jsxs(k,{onClose:o.close,isOpen:o.isOpen,isDismissable:!0,children:[e.jsx(k.Header,{title:"Modal title",leadText:"Lead text"}),e.jsx(k.Body,{direction:at.Vertical,children:r.children}),e.jsx(k.Footer,{buttons:[{children:"Cancel",onClick:()=>{o.close()},style:D.Default,emphasis:C.Default},{children:"Confirm",onClick:()=>{Ze("click"),o.close()},style:D.Default,emphasis:C.Strong}]})]})]})},P=()=>{const[r,o]=et.useState();return e.jsx(rt,{menuBlocks:[{id:"block1",ariaLabel:"First section",menuItems:[{id:1,title:"Item 1"},{id:2,title:"Item 2"},{id:3,title:"Item 3"},{id:4,title:"Item 4"}]}],activeItemId:r,onChange:Xe=>o(Xe)})},lt=r=>e.jsx(st,{isOpen:!1,children:e.jsxs("div",{children:[e.jsxs("div",{className:"tw-flex",children:[e.jsx(P,{}),e.jsx(l,{...r,triggerElement:e.jsx("button",{"aria-label":"Exclamation mark circle icon",className:"tw-mr-1",children:e.jsx(E,{})})})]}),e.jsx(nt,{label:{children:"Input Label",required:!1,htmlFor:"dropdownId",tooltip:{content:"Tooltip Text"}},children:e.jsx(P,{})})]})}),W=lt.bind({});W.args={alignment:S.End,position:B.Top};t.__docgenInfo={description:"",methods:[],displayName:"TooltipComponent",props:{triggerElement:{required:!1,tsType:{name:"ReactElement"},description:""},content:{required:!0,tsType:{name:"ReactNode"},description:""},tooltipIcon:{required:!1,tsType:{name:"ReactElement"},description:""},heading:{required:!1,tsType:{name:"ReactNode"},description:""},headingIcon:{required:!1,tsType:{name:"ReactElement"},description:""},linkUrl:{required:!1,tsType:{name:"string"},description:""},linkLabel:{required:!1,tsType:{name:"string"},description:""},brightHeader:{required:!1,tsType:{name:"BrightHeaderStyle"},description:""},buttons:{required:!1,tsType:{name:"union",raw:"[TooltipButton, TooltipButton] | [TooltipButton]",elements:[{name:"tuple",raw:"[TooltipButton, TooltipButton]",elements:[{name:"signature",type:"object",raw:`{
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
}`,...(Se=(Be=N.parameters)==null?void 0:Be.docs)==null?void 0:Se.source}}};var De,Ce,Pe;L.parameters={...L.parameters,docs:{...(De=L.parameters)==null?void 0:De.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
  return <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <LegacyTooltip {...args} />
        </div>;
}`,...(Pe=(Ce=L.parameters)==null?void 0:Ce.docs)==null?void 0:Pe.source}}};var He,Me,Oe;q.parameters={...q.parameters,docs:{...(He=q.parameters)==null?void 0:He.docs,source:{originalSource:`(args: LegacyTooltipProps) => {
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
