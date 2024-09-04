import{j as e}from"./jsx-runtime-DBEcOq3S.js";import{r as l}from"./index-DtJulBIN.js";import{B as d}from"./Button-DUGArIHC.js";import{F as rt}from"./Flex-01brZM-J.js";import{F as p}from"./Flyout-n7p_WPiJ.js";import{T as D}from"./Tooltip-L7D_uwmM.js";import{e as st}from"./fondue-icons324-Bw2AQYl8.js";import{c as y,u as lt}from"./index-BHYJtXto.js";import{u as J,P as C,S as dt}from"./index-Dhc4yksV.js";import{c as ut,a as ct}from"./index-P-l_ls5c.js";import{u as z}from"./index-Bw4vj2Av.js";import{D as gt,P as mt}from"./index-xqgHIrVP.js";import{R as pt,h as ht,u as ft,F as Dt}from"./usePreventDropdownOverflow-C4c1BL1y.js";import{P as K}from"./index-D21DJKX5.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-BnElyh0X.js";import"./focusStyle-IgMhxCMT.js";import"./propsToCssVariables-BE5Q_-YS.js";import"./index-BaMjp9_F.js";import"./index-BqTDQIm7.js";import"./index-CvTA8V3i.js";var Y="Dialog",[$e,ro]=ut(Y),[xt,g]=$e(Y),Ue=t=>{const{__scopeDialog:i,children:a,open:r,defaultOpen:s,onOpenChange:n,modal:u=!0}=t,c=l.useRef(null),m=l.useRef(null),[h=!1,v]=lt({prop:r,defaultProp:s,onChange:n});return e.jsx(xt,{scope:i,triggerRef:c,contentRef:m,contentId:z(),titleId:z(),descriptionId:z(),open:h,onOpenChange:v,onOpenToggle:l.useCallback(()=>v(G=>!G),[v]),modal:u,children:a})};Ue.displayName=Y;var ke="DialogTrigger",Ge=l.forwardRef((t,i)=>{const{__scopeDialog:a,...r}=t,s=g(ke,a),n=J(i,s.triggerRef);return e.jsx(C.button,{type:"button","aria-haspopup":"dialog","aria-expanded":s.open,"aria-controls":s.contentId,"data-state":X(s.open),...r,ref:n,onClick:y(t.onClick,s.onOpenToggle)})});Ge.displayName=ke;var Z="DialogPortal",[vt,ze]=$e(Z,{forceMount:void 0}),Je=t=>{const{__scopeDialog:i,forceMount:a,children:r,container:s}=t,n=g(Z,i);return e.jsx(vt,{scope:i,forceMount:a,children:l.Children.map(r,u=>e.jsx(K,{present:a||n.open,children:e.jsx(mt,{asChild:!0,container:s,children:u})}))})};Je.displayName=Z;var E="DialogOverlay",Ke=l.forwardRef((t,i)=>{const a=ze(E,t.__scopeDialog),{forceMount:r=a.forceMount,...s}=t,n=g(E,t.__scopeDialog);return n.modal?e.jsx(K,{present:r||n.open,children:e.jsx(yt,{...s,ref:i})}):null});Ke.displayName=E;var yt=l.forwardRef((t,i)=>{const{__scopeDialog:a,...r}=t,s=g(E,a);return e.jsx(pt,{as:dt,allowPinchZoom:!0,shards:[s.contentRef],children:e.jsx(C.div,{"data-state":X(s.open),...r,ref:i,style:{pointerEvents:"auto",...r.style}})})}),f="DialogContent",Ye=l.forwardRef((t,i)=>{const a=ze(f,t.__scopeDialog),{forceMount:r=a.forceMount,...s}=t,n=g(f,t.__scopeDialog);return e.jsx(K,{present:r||n.open,children:n.modal?e.jsx(Ct,{...s,ref:i}):e.jsx(Tt,{...s,ref:i})})});Ye.displayName=f;var Ct=l.forwardRef((t,i)=>{const a=g(f,t.__scopeDialog),r=l.useRef(null),s=J(i,a.contentRef,r);return l.useEffect(()=>{const n=r.current;if(n)return ht(n)},[]),e.jsx(Ze,{...t,ref:s,trapFocus:a.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:y(t.onCloseAutoFocus,n=>{var u;n.preventDefault(),(u=a.triggerRef.current)==null||u.focus()}),onPointerDownOutside:y(t.onPointerDownOutside,n=>{const u=n.detail.originalEvent,c=u.button===0&&u.ctrlKey===!0;(u.button===2||c)&&n.preventDefault()}),onFocusOutside:y(t.onFocusOutside,n=>n.preventDefault())})}),Tt=l.forwardRef((t,i)=>{const a=g(f,t.__scopeDialog),r=l.useRef(!1),s=l.useRef(!1);return e.jsx(Ze,{...t,ref:i,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:n=>{var u,c;(u=t.onCloseAutoFocus)==null||u.call(t,n),n.defaultPrevented||(r.current||(c=a.triggerRef.current)==null||c.focus(),n.preventDefault()),r.current=!1,s.current=!1},onInteractOutside:n=>{var m,h;(m=t.onInteractOutside)==null||m.call(t,n),n.defaultPrevented||(r.current=!0,n.detail.originalEvent.type==="pointerdown"&&(s.current=!0));const u=n.target;((h=a.triggerRef.current)==null?void 0:h.contains(u))&&n.preventDefault(),n.detail.originalEvent.type==="focusin"&&s.current&&n.preventDefault()}})}),Ze=l.forwardRef((t,i)=>{const{__scopeDialog:a,trapFocus:r,onOpenAutoFocus:s,onCloseAutoFocus:n,...u}=t,c=g(f,a),m=l.useRef(null),h=J(i,m);return ft(),e.jsxs(e.Fragment,{children:[e.jsx(Dt,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:s,onUnmountAutoFocus:n,children:e.jsx(gt,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":X(c.open),...u,ref:h,onDismiss:()=>c.onOpenChange(!1)})}),e.jsxs(e.Fragment,{children:[e.jsx(jt,{titleId:c.titleId}),e.jsx(qt,{contentRef:m,descriptionId:c.descriptionId})]})]})}),Q="DialogTitle",Qe=l.forwardRef((t,i)=>{const{__scopeDialog:a,...r}=t,s=g(Q,a);return e.jsx(C.h2,{id:s.titleId,...r,ref:i})});Qe.displayName=Q;var Xe="DialogDescription",et=l.forwardRef((t,i)=>{const{__scopeDialog:a,...r}=t,s=g(Xe,a);return e.jsx(C.p,{id:s.descriptionId,...r,ref:i})});et.displayName=Xe;var tt="DialogClose",ot=l.forwardRef((t,i)=>{const{__scopeDialog:a,...r}=t,s=g(tt,a);return e.jsx(C.button,{type:"button",...r,ref:i,onClick:y(t.onClick,()=>s.onOpenChange(!1))})});ot.displayName=tt;function X(t){return t?"open":"closed"}var it="DialogTitleWarning",[so,at]=ct(it,{contentName:f,titleName:Q,docsSlug:"dialog"}),jt=({titleId:t})=>{const i=at(it),a=`\`${i.contentName}\` requires a \`${i.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${i.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${i.docsSlug}`;return l.useEffect(()=>{t&&(document.getElementById(t)||console.error(a))},[a,t]),null},bt="DialogDescriptionWarning",qt=({contentRef:t,descriptionId:i})=>{const r=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${at(bt).contentName}}.`;return l.useEffect(()=>{var n;const s=(n=t.current)==null?void 0:n.getAttribute("aria-describedby");i&&s&&(document.getElementById(i)||console.warn(r))},[r,t,i]),null},Rt=Ue,wt=Ge,Bt=Je,Nt=Ke,Ft=Ye,Ot=Qe,_t=et,nt=ot;const It="_content_wzhb3_6",St="_header_wzhb3_50",Ht="_footer_wzhb3_51",Et="_body_wzhb3_54",At="_underlay_wzhb3_65",Pt="_sideContent_wzhb3_74",x={content:It,header:St,footer:Ht,body:Et,underlay:At,sideContent:Pt},A=({children:t,...i})=>e.jsx(Rt,{...i,children:t});A.displayName="Dialog.Root";const P=({children:t,"data-test-id":i="fondue-dialog-trigger"},a)=>e.jsx(wt,{"data-test-id":i,asChild:!0,ref:a,children:t});P.displayName="Dialog.Trigger";const W=({maxWidth:t="800px",minWidth:i="400px",minHeight:a="200px",padding:r="compact",verticalAlign:s="center","data-test-id":n="fondue-dialog-content",showUnderlay:u=!1,children:c,rounded:m=!0,...h},v)=>e.jsx(Bt,{children:e.jsx(Nt,{"data-visible":u,className:x.underlay,children:e.jsx(Ft,{style:{"--dialog-max-width":t,"--dialog-min-width":i,"--dialog-min-height":a},ref:v,className:x.content,"data-dialog-rounded":m,"data-dialog-spacing":r,"data-test-id":n,"data-dialog-vertical-align":s,onOpenAutoFocus:G=>{G.preventDefault()},...h,children:c})})});W.displayName="Dialog.Content";const M=({children:t,showCloseButton:i=!0,"data-test-id":a="fondue-dialog-header"},r)=>e.jsxs("div",{"data-test-id":a,ref:r,className:x.header,"data-dialog-layout-component":!0,children:[e.jsx("div",{children:t}),i&&e.jsx(nt,{role:"button","data-test-id":`${a}-close`,className:"tw-cursor-pointer",children:e.jsx(st,{size:20})})]});M.displayName="Dialog.Header";const ee=({children:t,"data-test-id":i="fondue-dialog-footer"},a)=>e.jsx("div",{"data-test-id":i,ref:a,className:x.footer,"data-dialog-layout-component":!0,children:t});ee.displayName="Dialog.Footer";const V=({children:t,"data-test-id":i="fondue-dialog-body"},a)=>e.jsx("div",{"data-test-id":i,ref:a,className:x.body,"data-dialog-layout-component":!0,children:t});V.displayName="Dialog.Body";const L=({children:t,"data-test-id":i="fondue-dialog-side-content"},a)=>e.jsx("div",{"data-test-id":i,ref:a,className:x.sideContent,"data-dialog-layout-component":!0,children:t});L.displayName="Dialog.SideContent";const $=({children:t})=>e.jsx(nt,{asChild:!0,children:t});$.displayName="Dialog.Close";const U=({children:t,asChild:i})=>e.jsx(Ot,{asChild:i,children:t});U.displayName="Dialog.Title";const k=({children:t,asChild:i})=>e.jsx(_t,{asChild:i,children:t});k.displayName="Dialog.Description";const o={Root:A,Title:U,Description:k,Close:$,Trigger:l.forwardRef(P),Content:l.forwardRef(W),Header:l.forwardRef(M),Footer:l.forwardRef(ee),Body:l.forwardRef(V),SideContent:l.forwardRef(L)};A.__docgenInfo={description:"",methods:[],displayName:"Dialog.Root",props:{modal:{required:!1,tsType:{name:"boolean"},description:`Disable interaction with the rest of the page
@default false`},open:{required:!1,tsType:{name:"boolean"},description:"The controlled `open` state of the dialog\n@default false"},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Event handler called when the `open` state changes"},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};P.__docgenInfo={description:"",methods:[],displayName:"Dialog.Trigger",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-trigger'",computed:!1}}}};W.__docgenInfo={description:"",methods:[],displayName:"Dialog.Content",props:{rounded:{required:!1,tsType:{name:"boolean"},description:`Add rounded corners to the dialog
@default true`,defaultValue:{value:"true",computed:!1}},padding:{required:!1,tsType:{name:"union",raw:"'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:`Define the padding of the dialog
@default "compact"`,defaultValue:{value:"'compact'",computed:!1}},verticalAlign:{required:!1,tsType:{name:"union",raw:"'top' | 'center'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'center'"}]},description:`The vertical alignment of the divider
@default "center"`,defaultValue:{value:"'center'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:`Define a maximum width for the dialog
@default "800px"`,defaultValue:{value:"'800px'",computed:!1}},minWidth:{required:!1,tsType:{name:"string"},description:`Define a minimum width for the dialog
@default "400px"`,defaultValue:{value:"'400px'",computed:!1}},minHeight:{required:!1,tsType:{name:"string"},description:`Define a maximum height for the dialog
@default "200px"`,defaultValue:{value:"'200px'",computed:!1}},showUnderlay:{required:!1,tsType:{name:"boolean"},description:`Show a dark underlay behind the dialog
@default false`,defaultValue:{value:"false",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-content'",computed:!1}}}};M.__docgenInfo={description:"",methods:[],displayName:"Dialog.Header",props:{showCloseButton:{required:!1,tsType:{name:"boolean"},description:`Show a close button in the header
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-header'",computed:!1}}}};ee.__docgenInfo={description:"",methods:[],displayName:"Dialog.Footer",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-footer'",computed:!1}}}};V.__docgenInfo={description:"",methods:[],displayName:"Dialog.Body",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-body'",computed:!1}}}};L.__docgenInfo={description:"",methods:[],displayName:"Dialog.SideContent",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-side-content'",computed:!1}}}};$.__docgenInfo={description:"",methods:[],displayName:"Dialog.Close",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""}}};U.__docgenInfo={description:"",methods:[],displayName:"Dialog.Title",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};k.__docgenInfo={description:"",methods:[],displayName:"Dialog.Description",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};const lo={component:W,subcomponents:{"Dialog.Root":A,"Dialog.Trigger":P,"Dialog.SideContent":L,"Dialog.Header":M,"Dialog.Body":V,"Dialog.Title":U,"Dialog.Description":k,"Dialog.Close":$},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-w-full"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(d,{emphasis:"default",children:"Cancel"}),e.jsx(d,{children:"Submit"})]})]})]})},T={args:{children:"I am a dialog content"}},j={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},b={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{showCloseButton:!0,children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},q={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(d,{emphasis:"default",children:"Cancel"}),e.jsx(d,{children:"Submit"})]})]})]})},R={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Body,{...t})]})]})},w={args:{children:"I am a dialog content",showUnderlay:!0},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},B={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(d,{emphasis:"default",children:"Cancel"}),e.jsx(d,{children:"Submit"})]})]})]})},N={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(o.Close,{children:e.jsx(d,{emphasis:"default",children:"Cancel"})}),e.jsx(d,{children:"Submit"})]})]})]})},F={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Dialog Header"})}),e.jsx(o.Body,{children:e.jsx(o.Description,{children:t.children})}),e.jsxs(o.Footer,{children:[e.jsx(d,{emphasis:"default",children:"Cancel"}),e.jsx(d,{children:"Submit"})]})]})]})},O={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(o.Body,{children:e.jsx(o.Description,{asChild:!0,children:e.jsx("p",{children:t.children})})}),e.jsxs(o.Footer,{children:[e.jsx(d,{emphasis:"default",children:"Cancel"}),e.jsx(d,{children:"Submit"})]})]})]})},_={args:{verticalAlign:"top"}},I={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"}}},defaultViewport:"mobile"}},args:{children:"Hello World"}},S={args:{children:"I am a dialog content"},render:({...t})=>{const[i,a]=l.useState(!1);return e.jsxs(o.Root,{open:i,onOpenChange:r=>{a(r)},children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})}},H={render:({...t})=>{const i=l.forwardRef(({text:a,tooltipText:r},s)=>e.jsxs(D.Root,{children:[e.jsx(D.Trigger,{children:e.jsx("div",{children:e.jsx(p.Trigger,{children:e.jsx(d,{ref:s,children:a})})})}),e.jsx(D.Content,{side:"left",children:r})]}));return i.displayName="ButtonWithTooltip",e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,showUnderlay:!0,children:[e.jsx(o.Body,{children:e.jsxs(rt,{direction:"column",gap:"8px",align:"flex-start",children:[e.jsxs(p.Root,{children:[e.jsx(p.Trigger,{children:e.jsx(d,{children:"Open flyout"})}),e.jsxs(p.Content,{children:[e.jsx(p.Header,{children:"Header"}),e.jsx(p.Body,{children:"I am a flyout"})]})]}),e.jsxs(D.Root,{children:[e.jsx(D.Trigger,{children:e.jsx(d,{children:"I am a tooltip, hover me"})}),e.jsx(D.Content,{side:"left",children:"Tooltip content"})]}),e.jsxs(p.Root,{children:[e.jsx(i,{text:"Open flyout (and I am a tooltip too)",tooltipText:"Tooltip text"}),e.jsxs(p.Content,{children:[e.jsx(p.Header,{children:"Header"}),e.jsx(p.Body,{children:"I am a flyout"})]})]})]})}),e.jsxs(o.Footer,{children:[e.jsx(d,{emphasis:"default",children:"Cancel"}),e.jsx(d,{children:"Submit"})]})]})]})}};var te,oe,ie;T.parameters={...T.parameters,docs:{...(te=T.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  }
}`,...(ie=(oe=T.parameters)==null?void 0:oe.docs)==null?void 0:ie.source}}};var ae,ne,re;j.parameters={...j.parameters,docs:{...(ae=j.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
}`,...(re=(ne=j.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};var se,le,de;b.parameters={...b.parameters,docs:{...(se=b.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
}`,...(de=(le=b.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var ue,ce,ge;q.parameters={...q.parameters,docs:{...(ue=q.parameters)==null?void 0:ue.docs,source:{originalSource:`{
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
}`,...(ge=(ce=q.parameters)==null?void 0:ce.docs)==null?void 0:ge.source}}};var me,pe,he;R.parameters={...R.parameters,docs:{...(me=R.parameters)==null?void 0:me.docs,source:{originalSource:`{
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
}`,...(he=(pe=R.parameters)==null?void 0:pe.docs)==null?void 0:he.source}}};var fe,De,xe;w.parameters={...w.parameters,docs:{...(fe=w.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content',
    showUnderlay: true
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
}`,...(xe=(De=w.parameters)==null?void 0:De.docs)==null?void 0:xe.source}}};var ve,ye,Ce;B.parameters={...B.parameters,docs:{...(ve=B.parameters)==null?void 0:ve.docs,source:{originalSource:`{
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
}`,...(Ce=(ye=B.parameters)==null?void 0:ye.docs)==null?void 0:Ce.source}}};var Te,je,be;N.parameters={...N.parameters,docs:{...(Te=N.parameters)==null?void 0:Te.docs,source:{originalSource:`{
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
}`,...(be=(je=N.parameters)==null?void 0:je.docs)==null?void 0:be.source}}};var qe,Re,we;F.parameters={...F.parameters,docs:{...(qe=F.parameters)==null?void 0:qe.docs,source:{originalSource:`{
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
}`,...(we=(Re=F.parameters)==null?void 0:Re.docs)==null?void 0:we.source}}};var Be,Ne,Fe;O.parameters={...O.parameters,docs:{...(Be=O.parameters)==null?void 0:Be.docs,source:{originalSource:`{
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
}`,...(Fe=(Ne=O.parameters)==null?void 0:Ne.docs)==null?void 0:Fe.source}}};var Oe,_e,Ie;_.parameters={..._.parameters,docs:{...(Oe=_.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  args: {
    verticalAlign: 'top'
  }
}`,...(Ie=(_e=_.parameters)==null?void 0:_e.docs)==null?void 0:Ie.source}}};var Se,He,Ee;I.parameters={...I.parameters,docs:{...(Se=I.parameters)==null?void 0:Se.docs,source:{originalSource:`{
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
}`,...(Ee=(He=I.parameters)==null?void 0:He.docs)==null?void 0:Ee.source}}};var Ae,Pe,We;S.parameters={...S.parameters,docs:{...(Ae=S.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
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
}`,...(We=(Pe=S.parameters)==null?void 0:Pe.docs)==null?void 0:We.source}}};var Me,Ve,Le;H.parameters={...H.parameters,docs:{...(Me=H.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    const ButtonWithTooltip = forwardRef<HTMLButtonElement | null, {
      text: string;
      tooltipText: string;
    }>(({
      text,
      tooltipText
    }, ref) => {
      return <Tooltip.Root>
                        <Tooltip.Trigger>
                            <div>
                                <Flyout.Trigger>
                                    <Button ref={ref}>{text}</Button>
                                </Flyout.Trigger>
                            </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content side="left">{tooltipText}</Tooltip.Content>
                    </Tooltip.Root>;
    });
    ButtonWithTooltip.displayName = 'ButtonWithTooltip';
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args} showUnderlay>
                    <Dialog.Body>
                        <Flex direction="column" gap="8px" align="flex-start">
                            <Flyout.Root>
                                <Flyout.Trigger>
                                    <Button>Open flyout</Button>
                                </Flyout.Trigger>
                                <Flyout.Content>
                                    <Flyout.Header>Header</Flyout.Header>
                                    <Flyout.Body>I am a flyout</Flyout.Body>
                                </Flyout.Content>
                            </Flyout.Root>

                            <Tooltip.Root>
                                <Tooltip.Trigger>
                                    <Button>I am a tooltip, hover me</Button>
                                </Tooltip.Trigger>
                                <Tooltip.Content side="left">Tooltip content</Tooltip.Content>
                            </Tooltip.Root>

                            <Flyout.Root>
                                <ButtonWithTooltip text="Open flyout (and I am a tooltip too)" tooltipText="Tooltip text" />
                                <Flyout.Content>
                                    <Flyout.Header>Header</Flyout.Header>
                                    <Flyout.Body>I am a flyout</Flyout.Body>
                                </Flyout.Content>
                            </Flyout.Root>
                        </Flex>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(Le=(Ve=H.parameters)==null?void 0:Ve.docs)==null?void 0:Le.source}}};const uo=["WithFullLayout","WithHeader","WithCloseButton","WithFooter","WithSideContent","WithUnderlay","WithLongText","WithCustomElementForClose","WithAnnouncedDescription","WithCustomElementAnnouncements","TopAligned","MobileView","ControlledComponent","WithFlyoutAndTooltip"];export{S as ControlledComponent,I as MobileView,_ as TopAligned,F as WithAnnouncedDescription,b as WithCloseButton,O as WithCustomElementAnnouncements,N as WithCustomElementForClose,H as WithFlyoutAndTooltip,q as WithFooter,T as WithFullLayout,j as WithHeader,B as WithLongText,R as WithSideContent,w as WithUnderlay,uo as __namedExportsOrder,lo as default};
