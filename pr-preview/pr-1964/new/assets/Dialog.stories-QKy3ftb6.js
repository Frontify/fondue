import{j as e}from"./jsx-runtime-DBEcOq3S.js";import{r as l}from"./index-DtJulBIN.js";import{B as u}from"./Button-CnC-uSyE.js";import{e as Ye}from"./fondue-icons311-Cyz8yLVl.js";import{c as v,u as Ze}from"./index-DYI_kRwo.js";import{u as $,P as x,S as Qe}from"./index-B6WxdOXM.js";import{c as Xe,a as et}from"./index-P-l_ls5c.js";import{u as L}from"./index-DBH0Kh6a.js";import{D as tt,P as at}from"./index-Ddz0BVCY.js";import{R as it,h as ot,u as nt,F as rt}from"./index-HXHbcWZ0.js";import{P as k}from"./index-BK_vzMtd.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-T76WvCte.js";import"./focusStyle-IgMhxCMT.js";import"./index-DD2ZIxVL.js";var G="Dialog",[Se,$t]=Xe(G),[st,m]=Se(G),Ie=t=>{const{__scopeDialog:i,children:o,open:r,defaultOpen:s,onOpenChange:n,modal:d=!0}=t,c=l.useRef(null),g=l.useRef(null),[p=!1,D]=Ze({prop:r,defaultProp:s,onChange:n});return e.jsx(st,{scope:i,triggerRef:c,contentRef:g,contentId:L(),titleId:L(),descriptionId:L(),open:p,onOpenChange:D,onOpenToggle:l.useCallback(()=>D(Ke=>!Ke),[D]),modal:d,children:o})};Ie.displayName=G;var Ee="DialogTrigger",Fe=l.forwardRef((t,i)=>{const{__scopeDialog:o,...r}=t,s=m(Ee,o),n=$(i,s.triggerRef);return e.jsx(x.button,{type:"button","aria-haspopup":"dialog","aria-expanded":s.open,"aria-controls":s.contentId,"data-state":z(s.open),...r,ref:n,onClick:v(t.onClick,s.onOpenToggle)})});Fe.displayName=Ee;var U="DialogPortal",[lt,Ae]=Se(U,{forceMount:void 0}),He=t=>{const{__scopeDialog:i,forceMount:o,children:r,container:s}=t,n=m(U,i);return e.jsx(lt,{scope:i,forceMount:o,children:l.Children.map(r,d=>e.jsx(k,{present:o||n.open,children:e.jsx(at,{asChild:!0,container:s,children:d})}))})};He.displayName=U;var S="DialogOverlay",Pe=l.forwardRef((t,i)=>{const o=Ae(S,t.__scopeDialog),{forceMount:r=o.forceMount,...s}=t,n=m(S,t.__scopeDialog);return n.modal?e.jsx(k,{present:r||n.open,children:e.jsx(ut,{...s,ref:i})}):null});Pe.displayName=S;var ut=l.forwardRef((t,i)=>{const{__scopeDialog:o,...r}=t,s=m(S,o);return e.jsx(it,{as:Qe,allowPinchZoom:!0,shards:[s.contentRef],children:e.jsx(x.div,{"data-state":z(s.open),...r,ref:i,style:{pointerEvents:"auto",...r.style}})})}),h="DialogContent",Me=l.forwardRef((t,i)=>{const o=Ae(h,t.__scopeDialog),{forceMount:r=o.forceMount,...s}=t,n=m(h,t.__scopeDialog);return e.jsx(k,{present:r||n.open,children:n.modal?e.jsx(dt,{...s,ref:i}):e.jsx(ct,{...s,ref:i})})});Me.displayName=h;var dt=l.forwardRef((t,i)=>{const o=m(h,t.__scopeDialog),r=l.useRef(null),s=$(i,o.contentRef,r);return l.useEffect(()=>{const n=r.current;if(n)return ot(n)},[]),e.jsx(We,{...t,ref:s,trapFocus:o.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:v(t.onCloseAutoFocus,n=>{var d;n.preventDefault(),(d=o.triggerRef.current)==null||d.focus()}),onPointerDownOutside:v(t.onPointerDownOutside,n=>{const d=n.detail.originalEvent,c=d.button===0&&d.ctrlKey===!0;(d.button===2||c)&&n.preventDefault()}),onFocusOutside:v(t.onFocusOutside,n=>n.preventDefault())})}),ct=l.forwardRef((t,i)=>{const o=m(h,t.__scopeDialog),r=l.useRef(!1),s=l.useRef(!1);return e.jsx(We,{...t,ref:i,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:n=>{var d,c;(d=t.onCloseAutoFocus)==null||d.call(t,n),n.defaultPrevented||(r.current||(c=o.triggerRef.current)==null||c.focus(),n.preventDefault()),r.current=!1,s.current=!1},onInteractOutside:n=>{var g,p;(g=t.onInteractOutside)==null||g.call(t,n),n.defaultPrevented||(r.current=!0,n.detail.originalEvent.type==="pointerdown"&&(s.current=!0));const d=n.target;((p=o.triggerRef.current)==null?void 0:p.contains(d))&&n.preventDefault(),n.detail.originalEvent.type==="focusin"&&s.current&&n.preventDefault()}})}),We=l.forwardRef((t,i)=>{const{__scopeDialog:o,trapFocus:r,onOpenAutoFocus:s,onCloseAutoFocus:n,...d}=t,c=m(h,o),g=l.useRef(null),p=$(i,g);return nt(),e.jsxs(e.Fragment,{children:[e.jsx(rt,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:s,onUnmountAutoFocus:n,children:e.jsx(tt,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":z(c.open),...d,ref:p,onDismiss:()=>c.onOpenChange(!1)})}),e.jsxs(e.Fragment,{children:[e.jsx(mt,{titleId:c.titleId}),e.jsx(pt,{contentRef:g,descriptionId:c.descriptionId})]})]})}),J="DialogTitle",Ve=l.forwardRef((t,i)=>{const{__scopeDialog:o,...r}=t,s=m(J,o);return e.jsx(x.h2,{id:s.titleId,...r,ref:i})});Ve.displayName=J;var Le="DialogDescription",$e=l.forwardRef((t,i)=>{const{__scopeDialog:o,...r}=t,s=m(Le,o);return e.jsx(x.p,{id:s.descriptionId,...r,ref:i})});$e.displayName=Le;var ke="DialogClose",Ge=l.forwardRef((t,i)=>{const{__scopeDialog:o,...r}=t,s=m(ke,o);return e.jsx(x.button,{type:"button",...r,ref:i,onClick:v(t.onClick,()=>s.onOpenChange(!1))})});Ge.displayName=ke;function z(t){return t?"open":"closed"}var Ue="DialogTitleWarning",[kt,Je]=et(Ue,{contentName:h,titleName:J,docsSlug:"dialog"}),mt=({titleId:t})=>{const i=Je(Ue),o=`\`${i.contentName}\` requires a \`${i.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${i.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${i.docsSlug}`;return l.useEffect(()=>{t&&(document.getElementById(t)||console.error(o))},[o,t]),null},gt="DialogDescriptionWarning",pt=({contentRef:t,descriptionId:i})=>{const r=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Je(gt).contentName}}.`;return l.useEffect(()=>{var n;const s=(n=t.current)==null?void 0:n.getAttribute("aria-describedby");i&&s&&(document.getElementById(i)||console.warn(r))},[r,t,i]),null},ht=Ie,ft=Fe,Dt=He,vt=Pe,xt=Me,Ct=Ve,bt=$e,ze=Ge;const jt="_content_1tu78_5",yt="_header_1tu78_48",Tt="_footer_1tu78_49",qt="_body_1tu78_52",Rt="_underlay_1tu78_63",wt="_sideContent_1tu78_74",f={content:jt,header:yt,footer:Tt,body:qt,underlay:Rt,sideContent:wt},I=({children:t,...i})=>e.jsx(ht,{...i,children:t});I.displayName="Dialog.Root";const E=({children:t,"data-test-id":i="fondue-dialog-trigger"},o)=>e.jsx(ft,{"data-test-id":i,asChild:!0,ref:o,children:t});E.displayName="Dialog.Trigger";const F=({maxWidth:t="800px",minWidth:i="400px",minHeight:o="200px",padding:r="compact",verticalAlign:s="center","data-test-id":n="fondue-dialog-content",showUnderlay:d=!1,children:c,rounded:g=!0,...p},D)=>e.jsxs(Dt,{children:[e.jsx(vt,{"data-visible":d,className:f.underlay}),e.jsx(xt,{style:{"--dialog-max-width":t,"--dialog-min-width":i,"--dialog-min-height":o},ref:D,className:f.content,"data-dialog-rounded":g,"data-dialog-spacing":r,"data-test-id":n,"data-dialog-vertical-align":s,...p,children:c})]});F.displayName="Dialog.Content";const A=({children:t,showCloseButton:i=!0,"data-test-id":o="fondue-dialog-header"},r)=>e.jsxs("div",{"data-test-id":o,ref:r,className:f.header,"data-dialog-layout-component":!0,children:[e.jsx("div",{children:t}),i&&e.jsx(ze,{role:"button","data-test-id":`${o}-close`,className:"tw-cursor-pointer",children:e.jsx(Ye,{size:20})})]});A.displayName="Dialog.Header";const K=({children:t,"data-test-id":i="fondue-dialog-footer"},o)=>e.jsx("div",{"data-test-id":i,ref:o,className:f.footer,"data-dialog-layout-component":!0,children:t});K.displayName="Dialog.Footer";const H=({children:t,"data-test-id":i="fondue-dialog-body"},o)=>e.jsx("div",{"data-test-id":i,ref:o,className:f.body,"data-dialog-layout-component":!0,children:t});H.displayName="Dialog.Body";const P=({children:t,"data-test-id":i="fondue-dialog-side-content"},o)=>e.jsx("div",{"data-test-id":i,ref:o,className:f.sideContent,"data-dialog-layout-component":!0,children:t});P.displayName="Dialog.SideContent";const M=({children:t})=>e.jsx(ze,{asChild:!0,children:t});M.displayName="Dialog.Close";const W=({children:t,asChild:i})=>e.jsx(Ct,{asChild:i,children:t});W.displayName="Dialog.Title";const V=({children:t,asChild:i})=>e.jsx(bt,{asChild:i,children:t});V.displayName="Dialog.Description";const a={Root:I,Title:W,Description:V,Close:M,Trigger:l.forwardRef(E),Content:l.forwardRef(F),Header:l.forwardRef(A),Footer:l.forwardRef(K),Body:l.forwardRef(H),SideContent:l.forwardRef(P)};I.__docgenInfo={description:"",methods:[],displayName:"Dialog.Root",props:{modal:{required:!1,tsType:{name:"boolean"},description:`Disable interaction with the rest of the page
@default false`},open:{required:!1,tsType:{name:"boolean"},description:"The controlled `open` state of the dialog\n@default false"},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Event handler called when the `open` state changes"},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};E.__docgenInfo={description:"",methods:[],displayName:"Dialog.Trigger",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-trigger'",computed:!1}}}};F.__docgenInfo={description:"",methods:[],displayName:"Dialog.Content",props:{rounded:{required:!1,tsType:{name:"boolean"},description:`Add rounded corners to the dialog
@default true`,defaultValue:{value:"true",computed:!1}},padding:{required:!1,tsType:{name:"union",raw:"'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:`Define the padding of the dialog
@default "compact"`,defaultValue:{value:"'compact'",computed:!1}},verticalAlign:{required:!1,tsType:{name:"union",raw:"'top' | 'center'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'center'"}]},description:`The vertical alignment of the divider
@default "center"`,defaultValue:{value:"'center'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:`Define a maximum width for the dialog
@default "800px"`,defaultValue:{value:"'800px'",computed:!1}},minWidth:{required:!1,tsType:{name:"string"},description:`Define a minimum width for the dialog
@default "400px"`,defaultValue:{value:"'400px'",computed:!1}},minHeight:{required:!1,tsType:{name:"string"},description:`Define a maximum height for the dialog
@default "200px"`,defaultValue:{value:"'200px'",computed:!1}},showUnderlay:{required:!1,tsType:{name:"boolean"},description:`Show a dark underlay behind the dialog
@default false`,defaultValue:{value:"false",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-content'",computed:!1}}}};A.__docgenInfo={description:"",methods:[],displayName:"Dialog.Header",props:{showCloseButton:{required:!1,tsType:{name:"boolean"},description:`Show a close button in the header
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-header'",computed:!1}}}};K.__docgenInfo={description:"",methods:[],displayName:"Dialog.Footer",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-footer'",computed:!1}}}};H.__docgenInfo={description:"",methods:[],displayName:"Dialog.Body",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-body'",computed:!1}}}};P.__docgenInfo={description:"",methods:[],displayName:"Dialog.SideContent",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-side-content'",computed:!1}}}};M.__docgenInfo={description:"",methods:[],displayName:"Dialog.Close",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""}}};W.__docgenInfo={description:"",methods:[],displayName:"Dialog.Title",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};V.__docgenInfo={description:"",methods:[],displayName:"Dialog.Description",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};const Gt={component:F,subcomponents:{"Dialog.Root":I,"Dialog.Trigger":E,"Dialog.SideContent":P,"Dialog.Header":A,"Dialog.Body":H,"Dialog.Title":W,"Dialog.Description":V,"Dialog.Close":M},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{},render:({...t})=>e.jsxs(a.Root,{children:[e.jsx(a.Trigger,{children:e.jsx(u,{children:"Open dialog"})}),e.jsxs(a.Content,{...t,children:[e.jsx(a.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-w-full"})}),e.jsx(a.Header,{children:e.jsx(a.Title,{children:"Header"})}),e.jsx(a.Body,{...t}),e.jsxs(a.Footer,{children:[e.jsx(u,{emphasis:"default",children:"Cancel"}),e.jsx(u,{children:"Submit"})]})]})]})},C={args:{children:"I am a dialog content"}},b={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(a.Root,{children:[e.jsx(a.Trigger,{children:e.jsx(u,{children:"Open dialog"})}),e.jsxs(a.Content,{...t,children:[e.jsx(a.Header,{children:e.jsx(a.Title,{children:"Header"})}),e.jsx(a.Body,{...t})]})]})},j={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(a.Root,{children:[e.jsx(a.Trigger,{children:e.jsx(u,{children:"Open dialog"})}),e.jsxs(a.Content,{...t,children:[e.jsx(a.Header,{showCloseButton:!0,children:e.jsx(a.Title,{children:"Header"})}),e.jsx(a.Body,{...t})]})]})},y={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(a.Root,{children:[e.jsx(a.Trigger,{children:e.jsx(u,{children:"Open dialog"})}),e.jsxs(a.Content,{...t,children:[e.jsx(a.Body,{...t}),e.jsxs(a.Footer,{children:[e.jsx(u,{emphasis:"default",children:"Cancel"}),e.jsx(u,{children:"Submit"})]})]})]})},T={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(a.Root,{children:[e.jsx(a.Trigger,{children:e.jsx(u,{children:"Open dialog"})}),e.jsxs(a.Content,{...t,children:[e.jsx(a.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(a.Body,{...t})]})]})},q={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:({...t})=>e.jsxs(a.Root,{children:[e.jsx(a.Trigger,{children:e.jsx(u,{children:"Open dialog"})}),e.jsxs(a.Content,{...t,children:[e.jsx(a.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(a.Header,{children:e.jsx(a.Title,{children:"Header"})}),e.jsx(a.Body,{...t}),e.jsxs(a.Footer,{children:[e.jsx(u,{emphasis:"default",children:"Cancel"}),e.jsx(u,{children:"Submit"})]})]})]})},R={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(a.Root,{children:[e.jsx(a.Trigger,{children:e.jsx(u,{children:"Open dialog"})}),e.jsxs(a.Content,{...t,children:[e.jsx(a.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(a.Header,{children:e.jsx(a.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(a.Body,{...t}),e.jsxs(a.Footer,{children:[e.jsx(a.Close,{children:e.jsx(u,{emphasis:"default",children:"Cancel"})}),e.jsx(u,{children:"Submit"})]})]})]})},w={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(a.Root,{children:[e.jsx(a.Trigger,{children:e.jsx(u,{children:"Open dialog"})}),e.jsxs(a.Content,{...t,children:[e.jsx(a.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(a.Header,{children:e.jsx(a.Title,{children:"Dialog Header"})}),e.jsx(a.Body,{children:e.jsx(a.Description,{children:t.children})}),e.jsxs(a.Footer,{children:[e.jsx(u,{emphasis:"default",children:"Cancel"}),e.jsx(u,{children:"Submit"})]})]})]})},N={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:({...t})=>e.jsxs(a.Root,{children:[e.jsx(a.Trigger,{children:e.jsx(u,{children:"Open dialog"})}),e.jsxs(a.Content,{...t,children:[e.jsx(a.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(a.Header,{children:e.jsx(a.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(a.Body,{children:e.jsx(a.Description,{asChild:!0,children:e.jsx("p",{children:t.children})})}),e.jsxs(a.Footer,{children:[e.jsx(u,{emphasis:"default",children:"Cancel"}),e.jsx(u,{children:"Submit"})]})]})]})},_={args:{verticalAlign:"top"}},B={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"}}},defaultViewport:"mobile"}},args:{children:"Hello World"}},O={args:{children:"I am a dialog content"},render:({...t})=>{const[i,o]=l.useState(!1);return e.jsxs(a.Root,{open:i,onOpenChange:r=>{o(r)},children:[e.jsx(a.Trigger,{children:e.jsx(u,{children:"Open dialog"})}),e.jsxs(a.Content,{...t,children:[e.jsx(a.Header,{children:e.jsx(a.Title,{children:"Header"})}),e.jsx(a.Body,{...t})]})]})}};var Y,Z,Q;C.parameters={...C.parameters,docs:{...(Y=C.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  }
}`,...(Q=(Z=C.parameters)==null?void 0:Z.docs)==null?void 0:Q.source}}};var X,ee,te;b.parameters={...b.parameters,docs:{...(X=b.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header>
                        <Dialog.Title>Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(te=(ee=b.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ae,ie,oe;j.parameters={...j.parameters,docs:{...(ae=j.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header showCloseButton>
                        <Dialog.Title>Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(oe=(ie=j.parameters)==null?void 0:ie.docs)==null?void 0:oe.source}}};var ne,re,se;y.parameters={...y.parameters,docs:{...(ne=y.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Body {...args} />
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(se=(re=y.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var le,ue,de;T.parameters={...T.parameters,docs:{...(le=T.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-box-positive-strong tw-h-full tw-min-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Body {...args} />
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(de=(ue=T.parameters)==null?void 0:ue.docs)==null?void 0:de.source}}};var ce,me,ge;q.parameters={...q.parameters,docs:{...(ce=q.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices.'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-box-positive-strong tw-h-full tw-min-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Header>
                        <Dialog.Title>Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(ge=(me=q.parameters)==null?void 0:me.docs)==null?void 0:ge.source}}};var pe,he,fe;R.parameters={...R.parameters,docs:{...(pe=R.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-box-positive-strong tw-h-full tw-min-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Header>
                        <Dialog.Title asChild>
                            <h2>Dialog Header</h2>
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                    <Dialog.Footer>
                        <Dialog.Close>
                            <Button emphasis="default">Cancel</Button>
                        </Dialog.Close>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(fe=(he=R.parameters)==null?void 0:he.docs)==null?void 0:fe.source}}};var De,ve,xe;w.parameters={...w.parameters,docs:{...(De=w.parameters)==null?void 0:De.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-box-positive-strong tw-h-full tw-min-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Header>
                        <Dialog.Title>Dialog Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Dialog.Description>{args.children}</Dialog.Description>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(xe=(ve=w.parameters)==null?void 0:ve.docs)==null?void 0:xe.source}}};var Ce,be,je;N.parameters={...N.parameters,docs:{...(Ce=N.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices.'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.SideContent>
                        <div className="tw-bg-box-positive-strong tw-h-full tw-min-w-40"></div>
                    </Dialog.SideContent>
                    <Dialog.Header>
                        <Dialog.Title asChild>
                            <h2>Dialog Header</h2>
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Dialog.Description asChild>
                            <p>{args.children}</p>
                        </Dialog.Description>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(je=(be=N.parameters)==null?void 0:be.docs)==null?void 0:je.source}}};var ye,Te,qe;_.parameters={..._.parameters,docs:{...(ye=_.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    verticalAlign: 'top'
  }
}`,...(qe=(Te=_.parameters)==null?void 0:Te.docs)==null?void 0:qe.source}}};var Re,we,Ne;B.parameters={...B.parameters,docs:{...(Re=B.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px'
          }
        }
      },
      defaultViewport: 'mobile'
    }
  },
  args: {
    children: 'Hello World'
  }
}`,...(Ne=(we=B.parameters)==null?void 0:we.docs)==null?void 0:Ne.source}}};var _e,Be,Oe;O.parameters={...O.parameters,docs:{...(_e=O.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: ({
    ...args
  }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return <Dialog.Root open={isDialogOpen} onOpenChange={state => {
      setIsDialogOpen(state);
    }}>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header>
                        <Dialog.Title>Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(Oe=(Be=O.parameters)==null?void 0:Be.docs)==null?void 0:Oe.source}}};const Ut=["WithFullLayout","WithHeader","WithCloseButton","WithFooter","WithSideContent","WithLongText","WithCustomElementForClose","WithAnnouncedDescription","WithCustomElementAnnouncements","TopAligned","MobileView","ControlledComponent"];export{O as ControlledComponent,B as MobileView,_ as TopAligned,w as WithAnnouncedDescription,j as WithCloseButton,N as WithCustomElementAnnouncements,R as WithCustomElementForClose,y as WithFooter,C as WithFullLayout,b as WithHeader,q as WithLongText,T as WithSideContent,Ut as __namedExportsOrder,Gt as default};
