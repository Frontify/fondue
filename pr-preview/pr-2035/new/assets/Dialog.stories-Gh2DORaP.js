import{j as e}from"./jsx-runtime-DBEcOq3S.js";import{r as d}from"./index-DtJulBIN.js";import{B as l}from"./Button-DUGArIHC.js";import{F as ct}from"./Flex-01brZM-J.js";import{F as p}from"./Flyout-K4mH04yi.js";import{T as z}from"./TextInput-BEZcqdCr.js";import{T as D}from"./Tooltip-L7D_uwmM.js";import{e as gt}from"./fondue-icons324-Bw2AQYl8.js";import{c as j,u as mt}from"./index-BHYJtXto.js";import{u as K,P as T,S as pt}from"./index-Dhc4yksV.js";import{c as ht,a as ft}from"./index-P-l_ls5c.js";import{u as J}from"./index-Bw4vj2Av.js";import{D as Dt,P as xt}from"./index-xqgHIrVP.js";import{R as vt,h as jt,u as Tt,F as yt,a as Ct,c as bt}from"./usePreventDropdownOverflow-BFI4TxJV.js";import{P as Y}from"./index-D21DJKX5.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-BnElyh0X.js";import"./focusStyle-IgMhxCMT.js";import"./propsToCssVariables-BE5Q_-YS.js";import"./index-FhQR-p0H.js";import"./index-BqTDQIm7.js";import"./index-CvTA8V3i.js";var Z="Dialog",[ze,ho]=ht(Z),[qt,g]=ze(Z),Je=t=>{const{__scopeDialog:i,children:a,open:r,defaultOpen:s,onOpenChange:n,modal:u=!0}=t,c=d.useRef(null),m=d.useRef(null),[h=!1,v]=mt({prop:r,defaultProp:s,onChange:n});return e.jsx(qt,{scope:i,triggerRef:c,contentRef:m,contentId:J(),titleId:J(),descriptionId:J(),open:h,onOpenChange:v,onOpenToggle:d.useCallback(()=>v(ut=>!ut),[v]),modal:u,children:a})};Je.displayName=Z;var Ke="DialogTrigger",Ye=d.forwardRef((t,i)=>{const{__scopeDialog:a,...r}=t,s=g(Ke,a),n=K(i,s.triggerRef);return e.jsx(T.button,{type:"button","aria-haspopup":"dialog","aria-expanded":s.open,"aria-controls":s.contentId,"data-state":ee(s.open),...r,ref:n,onClick:j(t.onClick,s.onOpenToggle)})});Ye.displayName=Ke;var Q="DialogPortal",[Rt,Ze]=ze(Q,{forceMount:void 0}),Qe=t=>{const{__scopeDialog:i,forceMount:a,children:r,container:s}=t,n=g(Q,i);return e.jsx(Rt,{scope:i,forceMount:a,children:d.Children.map(r,u=>e.jsx(Y,{present:a||n.open,children:e.jsx(xt,{asChild:!0,container:s,children:u})}))})};Qe.displayName=Q;var A="DialogOverlay",Xe=d.forwardRef((t,i)=>{const a=Ze(A,t.__scopeDialog),{forceMount:r=a.forceMount,...s}=t,n=g(A,t.__scopeDialog);return n.modal?e.jsx(Y,{present:r||n.open,children:e.jsx(Bt,{...s,ref:i})}):null});Xe.displayName=A;var Bt=d.forwardRef((t,i)=>{const{__scopeDialog:a,...r}=t,s=g(A,a);return e.jsx(vt,{as:pt,allowPinchZoom:!0,shards:[s.contentRef],children:e.jsx(T.div,{"data-state":ee(s.open),...r,ref:i,style:{pointerEvents:"auto",...r.style}})})}),f="DialogContent",et=d.forwardRef((t,i)=>{const a=Ze(f,t.__scopeDialog),{forceMount:r=a.forceMount,...s}=t,n=g(f,t.__scopeDialog);return e.jsx(Y,{present:r||n.open,children:n.modal?e.jsx(wt,{...s,ref:i}):e.jsx(Ft,{...s,ref:i})})});et.displayName=f;var wt=d.forwardRef((t,i)=>{const a=g(f,t.__scopeDialog),r=d.useRef(null),s=K(i,a.contentRef,r);return d.useEffect(()=>{const n=r.current;if(n)return jt(n)},[]),e.jsx(tt,{...t,ref:s,trapFocus:a.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:j(t.onCloseAutoFocus,n=>{var u;n.preventDefault(),(u=a.triggerRef.current)==null||u.focus()}),onPointerDownOutside:j(t.onPointerDownOutside,n=>{const u=n.detail.originalEvent,c=u.button===0&&u.ctrlKey===!0;(u.button===2||c)&&n.preventDefault()}),onFocusOutside:j(t.onFocusOutside,n=>n.preventDefault())})}),Ft=d.forwardRef((t,i)=>{const a=g(f,t.__scopeDialog),r=d.useRef(!1),s=d.useRef(!1);return e.jsx(tt,{...t,ref:i,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:n=>{var u,c;(u=t.onCloseAutoFocus)==null||u.call(t,n),n.defaultPrevented||(r.current||(c=a.triggerRef.current)==null||c.focus(),n.preventDefault()),r.current=!1,s.current=!1},onInteractOutside:n=>{var m,h;(m=t.onInteractOutside)==null||m.call(t,n),n.defaultPrevented||(r.current=!0,n.detail.originalEvent.type==="pointerdown"&&(s.current=!0));const u=n.target;((h=a.triggerRef.current)==null?void 0:h.contains(u))&&n.preventDefault(),n.detail.originalEvent.type==="focusin"&&s.current&&n.preventDefault()}})}),tt=d.forwardRef((t,i)=>{const{__scopeDialog:a,trapFocus:r,onOpenAutoFocus:s,onCloseAutoFocus:n,...u}=t,c=g(f,a),m=d.useRef(null),h=K(i,m);return Tt(),e.jsxs(e.Fragment,{children:[e.jsx(yt,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:s,onUnmountAutoFocus:n,children:e.jsx(Dt,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":ee(c.open),...u,ref:h,onDismiss:()=>c.onOpenChange(!1)})}),e.jsxs(e.Fragment,{children:[e.jsx(Nt,{titleId:c.titleId}),e.jsx(It,{contentRef:m,descriptionId:c.descriptionId})]})]})}),X="DialogTitle",ot=d.forwardRef((t,i)=>{const{__scopeDialog:a,...r}=t,s=g(X,a);return e.jsx(T.h2,{id:s.titleId,...r,ref:i})});ot.displayName=X;var it="DialogDescription",at=d.forwardRef((t,i)=>{const{__scopeDialog:a,...r}=t,s=g(it,a);return e.jsx(T.p,{id:s.descriptionId,...r,ref:i})});at.displayName=it;var nt="DialogClose",rt=d.forwardRef((t,i)=>{const{__scopeDialog:a,...r}=t,s=g(nt,a);return e.jsx(T.button,{type:"button",...r,ref:i,onClick:j(t.onClick,()=>s.onOpenChange(!1))})});rt.displayName=nt;function ee(t){return t?"open":"closed"}var st="DialogTitleWarning",[fo,lt]=ft(st,{contentName:f,titleName:X,docsSlug:"dialog"}),Nt=({titleId:t})=>{const i=lt(st),a=`\`${i.contentName}\` requires a \`${i.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${i.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${i.docsSlug}`;return d.useEffect(()=>{t&&(document.getElementById(t)||console.error(a))},[a,t]),null},Ot="DialogDescriptionWarning",It=({contentRef:t,descriptionId:i})=>{const r=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${lt(Ot).contentName}}.`;return d.useEffect(()=>{var n;const s=(n=t.current)==null?void 0:n.getAttribute("aria-describedby");i&&s&&(document.getElementById(i)||console.warn(r))},[r,t,i]),null},_t=Je,St=Ye,Ht=Qe,Et=Xe,At=et,Wt=ot,Pt=at,dt=rt;const Mt="_content_wzhb3_6",Vt="_header_wzhb3_50",Lt="_footer_wzhb3_51",$t="_body_wzhb3_54",Ut="_underlay_wzhb3_65",kt="_sideContent_wzhb3_74",x={content:Mt,header:Vt,footer:Lt,body:$t,underlay:Ut,sideContent:kt},W=({children:t,...i})=>e.jsx(_t,{...i,children:t});W.displayName="Dialog.Root";const P=({children:t,"data-test-id":i="fondue-dialog-trigger"},a)=>e.jsx(St,{onMouseDown:Ct,"data-auto-focus-visible":"true","data-auto-focus-trigger":!0,"data-test-id":i,asChild:!0,ref:a,children:t});P.displayName="Dialog.Trigger";const M=({maxWidth:t="800px",minWidth:i="400px",minHeight:a="200px",padding:r="compact",verticalAlign:s="center","data-test-id":n="fondue-dialog-content",showUnderlay:u=!1,children:c,rounded:m=!0,...h},v)=>e.jsx(Ht,{children:e.jsx(Et,{"data-visible":u,className:x.underlay,children:e.jsx(At,{style:{"--dialog-max-width":t,"--dialog-min-width":i,"--dialog-min-height":a},ref:v,className:x.content,onFocus:bt,"data-dialog-rounded":m,"data-dialog-spacing":r,"data-test-id":n,"data-dialog-vertical-align":s,...h,children:c})})});M.displayName="Dialog.Content";const V=({children:t,showCloseButton:i=!0,"data-test-id":a="fondue-dialog-header"},r)=>e.jsxs("div",{"data-test-id":a,ref:r,className:x.header,"data-dialog-layout-component":!0,children:[e.jsx("div",{children:t}),i&&e.jsx(dt,{role:"button","data-test-id":`${a}-close`,className:"tw-cursor-pointer",children:e.jsx(gt,{size:20})})]});V.displayName="Dialog.Header";const te=({children:t,"data-test-id":i="fondue-dialog-footer"},a)=>e.jsx("div",{"data-test-id":i,ref:a,className:x.footer,"data-dialog-layout-component":!0,children:t});te.displayName="Dialog.Footer";const L=({children:t,"data-test-id":i="fondue-dialog-body"},a)=>e.jsx("div",{"data-test-id":i,ref:a,className:x.body,"data-dialog-layout-component":!0,children:t});L.displayName="Dialog.Body";const $=({children:t,"data-test-id":i="fondue-dialog-side-content"},a)=>e.jsx("div",{"data-test-id":i,ref:a,className:x.sideContent,"data-dialog-layout-component":!0,children:t});$.displayName="Dialog.SideContent";const U=({children:t})=>e.jsx(dt,{asChild:!0,children:t});U.displayName="Dialog.Close";const k=({children:t,asChild:i})=>e.jsx(Wt,{asChild:i,children:t});k.displayName="Dialog.Title";const G=({children:t,asChild:i})=>e.jsx(Pt,{asChild:i,children:t});G.displayName="Dialog.Description";const o={Root:W,Title:k,Description:G,Close:U,Trigger:d.forwardRef(P),Content:d.forwardRef(M),Header:d.forwardRef(V),Footer:d.forwardRef(te),Body:d.forwardRef(L),SideContent:d.forwardRef($)};W.__docgenInfo={description:"",methods:[],displayName:"Dialog.Root",props:{modal:{required:!1,tsType:{name:"boolean"},description:`Disable interaction with the rest of the page
@default false`},open:{required:!1,tsType:{name:"boolean"},description:"The controlled `open` state of the dialog\n@default false"},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Event handler called when the `open` state changes"},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};P.__docgenInfo={description:"",methods:[],displayName:"Dialog.Trigger",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-trigger'",computed:!1}}}};M.__docgenInfo={description:"",methods:[],displayName:"Dialog.Content",props:{rounded:{required:!1,tsType:{name:"boolean"},description:`Add rounded corners to the dialog
@default true`,defaultValue:{value:"true",computed:!1}},padding:{required:!1,tsType:{name:"union",raw:"'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:`Define the padding of the dialog
@default "compact"`,defaultValue:{value:"'compact'",computed:!1}},verticalAlign:{required:!1,tsType:{name:"union",raw:"'top' | 'center'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'center'"}]},description:`The vertical alignment of the divider
@default "center"`,defaultValue:{value:"'center'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:`Define a maximum width for the dialog
@default "800px"`,defaultValue:{value:"'800px'",computed:!1}},minWidth:{required:!1,tsType:{name:"string"},description:`Define a minimum width for the dialog
@default "400px"`,defaultValue:{value:"'400px'",computed:!1}},minHeight:{required:!1,tsType:{name:"string"},description:`Define a maximum height for the dialog
@default "200px"`,defaultValue:{value:"'200px'",computed:!1}},showUnderlay:{required:!1,tsType:{name:"boolean"},description:`Show a dark underlay behind the dialog
@default false`,defaultValue:{value:"false",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-content'",computed:!1}}}};V.__docgenInfo={description:"",methods:[],displayName:"Dialog.Header",props:{showCloseButton:{required:!1,tsType:{name:"boolean"},description:`Show a close button in the header
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-header'",computed:!1}}}};te.__docgenInfo={description:"",methods:[],displayName:"Dialog.Footer",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-footer'",computed:!1}}}};L.__docgenInfo={description:"",methods:[],displayName:"Dialog.Body",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-body'",computed:!1}}}};$.__docgenInfo={description:"",methods:[],displayName:"Dialog.SideContent",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-side-content'",computed:!1}}}};U.__docgenInfo={description:"",methods:[],displayName:"Dialog.Close",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""}}};k.__docgenInfo={description:"",methods:[],displayName:"Dialog.Title",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};G.__docgenInfo={description:"",methods:[],displayName:"Dialog.Description",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};const Do={component:M,subcomponents:{"Dialog.Root":W,"Dialog.Trigger":P,"Dialog.SideContent":$,"Dialog.Header":V,"Dialog.Body":L,"Dialog.Title":k,"Dialog.Description":G,"Dialog.Close":U},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-w-full"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},y={args:{children:"I am a dialog content"}},C={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},b={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{showCloseButton:!0,children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},q={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},R={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Body,{...t})]})]})},B={args:{children:"I am a dialog content",showUnderlay:!0},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},w={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},F={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(o.Close,{children:e.jsx(l,{emphasis:"default",children:"Cancel"})}),e.jsx(l,{children:"Submit"})]})]})]})},N={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Dialog Header"})}),e.jsx(o.Body,{children:e.jsx(o.Description,{children:t.children})}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},O={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(o.Body,{children:e.jsx(o.Description,{asChild:!0,children:e.jsx("p",{children:t.children})})}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},I={args:{children:"Hello World"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open flyout"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:"Header"}),e.jsxs(o.Body,{...t,children:[e.jsx(z,{}),e.jsx(z,{}),e.jsx(z,{})]})]})]})},_={args:{verticalAlign:"top"}},S={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"}}},defaultViewport:"mobile"}},args:{children:"Hello World"}},H={args:{children:"I am a dialog content"},render:({...t})=>{const[i,a]=d.useState(!1);return e.jsxs(o.Root,{open:i,onOpenChange:r=>{a(r)},children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})}},E={render:({...t})=>{const i=d.forwardRef(({text:a,tooltipText:r},s)=>e.jsxs(D.Root,{children:[e.jsx(D.Trigger,{children:e.jsx("div",{children:e.jsx(p.Trigger,{children:e.jsx(l,{ref:s,children:a})})})}),e.jsx(D.Content,{side:"left",children:r})]}));return i.displayName="ButtonWithTooltip",e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,showUnderlay:!0,children:[e.jsx(o.Body,{children:e.jsxs(ct,{direction:"column",gap:"8px",align:"flex-start",children:[e.jsxs(p.Root,{children:[e.jsx(p.Trigger,{children:e.jsx(l,{children:"Open flyout"})}),e.jsxs(p.Content,{children:[e.jsx(p.Header,{children:"Header"}),e.jsx(p.Body,{children:"I am a flyout"})]})]}),e.jsxs(D.Root,{children:[e.jsx(D.Trigger,{children:e.jsx(l,{children:"I am a tooltip, hover me"})}),e.jsx(D.Content,{side:"left",children:"Tooltip content"})]}),e.jsxs(p.Root,{children:[e.jsx(i,{text:"Open flyout (and I am a tooltip too)",tooltipText:"Tooltip text"}),e.jsxs(p.Content,{children:[e.jsx(p.Header,{children:"Header"}),e.jsx(p.Body,{children:"I am a flyout"})]})]})]})}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})}};var oe,ie,ae;y.parameters={...y.parameters,docs:{...(oe=y.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  }
}`,...(ae=(ie=y.parameters)==null?void 0:ie.docs)==null?void 0:ae.source}}};var ne,re,se;C.parameters={...C.parameters,docs:{...(ne=C.parameters)==null?void 0:ne.docs,source:{originalSource:`{
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
}`,...(se=(re=C.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var le,de,ue;b.parameters={...b.parameters,docs:{...(le=b.parameters)==null?void 0:le.docs,source:{originalSource:`{
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
}`,...(ue=(de=b.parameters)==null?void 0:de.docs)==null?void 0:ue.source}}};var ce,ge,me;q.parameters={...q.parameters,docs:{...(ce=q.parameters)==null?void 0:ce.docs,source:{originalSource:`{
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
}`,...(me=(ge=q.parameters)==null?void 0:ge.docs)==null?void 0:me.source}}};var pe,he,fe;R.parameters={...R.parameters,docs:{...(pe=R.parameters)==null?void 0:pe.docs,source:{originalSource:`{
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
}`,...(fe=(he=R.parameters)==null?void 0:he.docs)==null?void 0:fe.source}}};var De,xe,ve;B.parameters={...B.parameters,docs:{...(De=B.parameters)==null?void 0:De.docs,source:{originalSource:`{
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
}`,...(ve=(xe=B.parameters)==null?void 0:xe.docs)==null?void 0:ve.source}}};var je,Te,ye;w.parameters={...w.parameters,docs:{...(je=w.parameters)==null?void 0:je.docs,source:{originalSource:`{
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
}`,...(ye=(Te=w.parameters)==null?void 0:Te.docs)==null?void 0:ye.source}}};var Ce,be,qe;F.parameters={...F.parameters,docs:{...(Ce=F.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
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
}`,...(qe=(be=F.parameters)==null?void 0:be.docs)==null?void 0:qe.source}}};var Re,Be,we;N.parameters={...N.parameters,docs:{...(Re=N.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(we=(Be=N.parameters)==null?void 0:Be.docs)==null?void 0:we.source}}};var Fe,Ne,Oe;O.parameters={...O.parameters,docs:{...(Fe=O.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
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
}`,...(Oe=(Ne=O.parameters)==null?void 0:Ne.docs)==null?void 0:Oe.source}}};var Ie,_e,Se;I.parameters={...I.parameters,docs:{...(Ie=I.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  args: {
    children: 'Hello World'
  },
  render: ({
    ...args
  }) => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open flyout</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header>Header</Dialog.Header>
                    <Dialog.Body {...args}>
                        <TextInput />
                        <TextInput />
                        <TextInput />
                    </Dialog.Body>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(Se=(_e=I.parameters)==null?void 0:_e.docs)==null?void 0:Se.source}}};var He,Ee,Ae;_.parameters={..._.parameters,docs:{...(He=_.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    verticalAlign: 'top'
  }
}`,...(Ae=(Ee=_.parameters)==null?void 0:Ee.docs)==null?void 0:Ae.source}}};var We,Pe,Me;S.parameters={...S.parameters,docs:{...(We=S.parameters)==null?void 0:We.docs,source:{originalSource:`{
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
}`,...(Me=(Pe=S.parameters)==null?void 0:Pe.docs)==null?void 0:Me.source}}};var Ve,Le,$e;H.parameters={...H.parameters,docs:{...(Ve=H.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
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
}`,...($e=(Le=H.parameters)==null?void 0:Le.docs)==null?void 0:$e.source}}};var Ue,ke,Ge;E.parameters={...E.parameters,docs:{...(Ue=E.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
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
}`,...(Ge=(ke=E.parameters)==null?void 0:ke.docs)==null?void 0:Ge.source}}};const xo=["WithFullLayout","WithHeader","WithCloseButton","WithFooter","WithSideContent","WithUnderlay","WithLongText","WithCustomElementForClose","WithAnnouncedDescription","WithCustomElementAnnouncements","WithFocusableContent","TopAligned","MobileView","ControlledComponent","WithFlyoutAndTooltip"];export{H as ControlledComponent,S as MobileView,_ as TopAligned,N as WithAnnouncedDescription,b as WithCloseButton,O as WithCustomElementAnnouncements,F as WithCustomElementForClose,E as WithFlyoutAndTooltip,I as WithFocusableContent,q as WithFooter,y as WithFullLayout,C as WithHeader,w as WithLongText,R as WithSideContent,B as WithUnderlay,xo as __namedExportsOrder,Do as default};
