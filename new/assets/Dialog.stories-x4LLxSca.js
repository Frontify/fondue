import{j as e}from"./jsx-runtime-DBEcOq3S.js";import{r as l}from"./index-DtJulBIN.js";import{B as d}from"./Button-DUGArIHC.js";import{F as Rt}from"./Flex-01brZM-J.js";import{F as p}from"./Flyout-B2H_Eq8M.js";import{T as D}from"./Tooltip-L7D_uwmM.js";import{e as Bt}from"./fondue-icons324-Bw2AQYl8.js";import{c as j,u as wt}from"./index-BHYJtXto.js";import{u as Q,P as C,S as Nt}from"./index-Dhc4yksV.js";import{c as Ft,a as St}from"./index-P-l_ls5c.js";import{u as Z}from"./index-Bw4vj2Av.js";import{D as _t,P as Ot}from"./index-xqgHIrVP.js";import{R as It,h as Ht,u as Et,F as Pt}from"./usePreventDropdownOverflow-C4c1BL1y.js";import{P as X}from"./index-D21DJKX5.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-BnElyh0X.js";import"./focusStyle-IgMhxCMT.js";import"./propsToCssVariables-BE5Q_-YS.js";import"./index-BaMjp9_F.js";import"./index-BqTDQIm7.js";import"./index-CvTA8V3i.js";var ee="Dialog",[lt,Bo]=Ft(ee),[At,g]=lt(ee),dt=t=>{const{__scopeDialog:a,children:i,open:r,defaultOpen:s,onOpenChange:n,modal:u=!0}=t,c=l.useRef(null),m=l.useRef(null),[h=!1,v]=wt({prop:r,defaultProp:s,onChange:n});return e.jsx(At,{scope:a,triggerRef:c,contentRef:m,contentId:Z(),titleId:Z(),descriptionId:Z(),open:h,onOpenChange:v,onOpenToggle:l.useCallback(()=>v(qt=>!qt),[v]),modal:u,children:i})};dt.displayName=ee;var ut="DialogTrigger",ct=l.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,s=g(ut,i),n=Q(a,s.triggerRef);return e.jsx(C.button,{type:"button","aria-haspopup":"dialog","aria-expanded":s.open,"aria-controls":s.contentId,"data-state":ae(s.open),...r,ref:n,onClick:j(t.onClick,s.onOpenToggle)})});ct.displayName=ut;var te="DialogPortal",[Wt,gt]=lt(te,{forceMount:void 0}),mt=t=>{const{__scopeDialog:a,forceMount:i,children:r,container:s}=t,n=g(te,a);return e.jsx(Wt,{scope:a,forceMount:i,children:l.Children.map(r,u=>e.jsx(X,{present:i||n.open,children:e.jsx(Ot,{asChild:!0,container:s,children:u})}))})};mt.displayName=te;var V="DialogOverlay",pt=l.forwardRef((t,a)=>{const i=gt(V,t.__scopeDialog),{forceMount:r=i.forceMount,...s}=t,n=g(V,t.__scopeDialog);return n.modal?e.jsx(X,{present:r||n.open,children:e.jsx(Mt,{...s,ref:a})}):null});pt.displayName=V;var Mt=l.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,s=g(V,i);return e.jsx(It,{as:Nt,allowPinchZoom:!0,shards:[s.contentRef],children:e.jsx(C.div,{"data-state":ae(s.open),...r,ref:a,style:{pointerEvents:"auto",...r.style}})})}),f="DialogContent",ht=l.forwardRef((t,a)=>{const i=gt(f,t.__scopeDialog),{forceMount:r=i.forceMount,...s}=t,n=g(f,t.__scopeDialog);return e.jsx(X,{present:r||n.open,children:n.modal?e.jsx(Vt,{...s,ref:a}):e.jsx(Lt,{...s,ref:a})})});ht.displayName=f;var Vt=l.forwardRef((t,a)=>{const i=g(f,t.__scopeDialog),r=l.useRef(null),s=Q(a,i.contentRef,r);return l.useEffect(()=>{const n=r.current;if(n)return Ht(n)},[]),e.jsx(ft,{...t,ref:s,trapFocus:i.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:j(t.onCloseAutoFocus,n=>{var u;n.preventDefault(),(u=i.triggerRef.current)==null||u.focus()}),onPointerDownOutside:j(t.onPointerDownOutside,n=>{const u=n.detail.originalEvent,c=u.button===0&&u.ctrlKey===!0;(u.button===2||c)&&n.preventDefault()}),onFocusOutside:j(t.onFocusOutside,n=>n.preventDefault())})}),Lt=l.forwardRef((t,a)=>{const i=g(f,t.__scopeDialog),r=l.useRef(!1),s=l.useRef(!1);return e.jsx(ft,{...t,ref:a,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:n=>{var u,c;(u=t.onCloseAutoFocus)==null||u.call(t,n),n.defaultPrevented||(r.current||(c=i.triggerRef.current)==null||c.focus(),n.preventDefault()),r.current=!1,s.current=!1},onInteractOutside:n=>{var m,h;(m=t.onInteractOutside)==null||m.call(t,n),n.defaultPrevented||(r.current=!0,n.detail.originalEvent.type==="pointerdown"&&(s.current=!0));const u=n.target;((h=i.triggerRef.current)==null?void 0:h.contains(u))&&n.preventDefault(),n.detail.originalEvent.type==="focusin"&&s.current&&n.preventDefault()}})}),ft=l.forwardRef((t,a)=>{const{__scopeDialog:i,trapFocus:r,onOpenAutoFocus:s,onCloseAutoFocus:n,...u}=t,c=g(f,i),m=l.useRef(null),h=Q(a,m);return Et(),e.jsxs(e.Fragment,{children:[e.jsx(Pt,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:s,onUnmountAutoFocus:n,children:e.jsx(_t,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":ae(c.open),...u,ref:h,onDismiss:()=>c.onOpenChange(!1)})}),e.jsxs(e.Fragment,{children:[e.jsx($t,{titleId:c.titleId}),e.jsx(kt,{contentRef:m,descriptionId:c.descriptionId})]})]})}),oe="DialogTitle",Dt=l.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,s=g(oe,i);return e.jsx(C.h2,{id:s.titleId,...r,ref:a})});Dt.displayName=oe;var xt="DialogDescription",vt=l.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,s=g(xt,i);return e.jsx(C.p,{id:s.descriptionId,...r,ref:a})});vt.displayName=xt;var jt="DialogClose",Ct=l.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,s=g(jt,i);return e.jsx(C.button,{type:"button",...r,ref:a,onClick:j(t.onClick,()=>s.onOpenChange(!1))})});Ct.displayName=jt;function ae(t){return t?"open":"closed"}var yt="DialogTitleWarning",[wo,Tt]=St(yt,{contentName:f,titleName:oe,docsSlug:"dialog"}),$t=({titleId:t})=>{const a=Tt(yt),i=`\`${a.contentName}\` requires a \`${a.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${a.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${a.docsSlug}`;return l.useEffect(()=>{t&&(document.getElementById(t)||console.error(i))},[i,t]),null},Ut="DialogDescriptionWarning",kt=({contentRef:t,descriptionId:a})=>{const r=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Tt(Ut).contentName}}.`;return l.useEffect(()=>{var n;const s=(n=t.current)==null?void 0:n.getAttribute("aria-describedby");a&&s&&(document.getElementById(a)||console.warn(r))},[r,t,a]),null},Gt=dt,Jt=ct,zt=mt,Kt=pt,Yt=ht,Zt=Dt,Qt=vt,bt=Ct;const Xt="_content_gej09_6",eo="_header_gej09_50",to="_footer_gej09_51",oo="_body_gej09_52",ao="_underlay_gej09_77",io="_sideContent_gej09_86",x={content:Xt,header:eo,footer:to,body:oo,underlay:ao,sideContent:io},L=({children:t,...a})=>e.jsx(Gt,{...a,children:t});L.displayName="Dialog.Root";const $=({children:t,"data-test-id":a="fondue-dialog-trigger"},i)=>e.jsx(Jt,{"data-test-id":a,asChild:!0,ref:i,children:t});$.displayName="Dialog.Trigger";const U=({maxWidth:t="800px",minWidth:a="400px",minHeight:i="200px",padding:r="compact",verticalAlign:s="center","data-test-id":n="fondue-dialog-content",showUnderlay:u=!1,children:c,rounded:m=!0,...h},v)=>e.jsx(zt,{children:e.jsx(Kt,{"data-visible":u,className:x.underlay,children:e.jsx(Yt,{style:{"--dialog-max-width":t,"--dialog-min-width":a,"--dialog-min-height":i},ref:v,className:x.content,"data-dialog-rounded":m,"data-dialog-spacing":r,"data-test-id":n,"data-dialog-vertical-align":s,...h,children:c})})});U.displayName="Dialog.Content";const k=({children:t,showCloseButton:a=!0,"data-test-id":i="fondue-dialog-header"},r)=>e.jsxs("div",{"data-test-id":i,ref:r,className:x.header,"data-dialog-layout-component":!0,children:[e.jsx("div",{children:t}),a&&e.jsx(bt,{role:"button","data-test-id":`${i}-close`,className:"tw-cursor-pointer",children:e.jsx(Bt,{size:20})})]});k.displayName="Dialog.Header";const ie=({children:t,"data-test-id":a="fondue-dialog-footer"},i)=>e.jsx("div",{"data-test-id":a,ref:i,className:x.footer,"data-dialog-layout-component":!0,children:t});ie.displayName="Dialog.Footer";const G=({children:t,"data-test-id":a="fondue-dialog-body"},i)=>e.jsx("div",{"data-test-id":a,ref:i,className:x.body,"data-dialog-layout-component":!0,children:t});G.displayName="Dialog.Body";const J=({children:t,"data-test-id":a="fondue-dialog-side-content"},i)=>e.jsx("div",{"data-test-id":a,ref:i,className:x.sideContent,"data-dialog-layout-component":!0,children:t});J.displayName="Dialog.SideContent";const z=({children:t})=>e.jsx(bt,{asChild:!0,children:t});z.displayName="Dialog.Close";const K=({children:t,asChild:a})=>e.jsx(Zt,{asChild:a,children:t});K.displayName="Dialog.Title";const Y=({children:t,asChild:a})=>e.jsx(Qt,{asChild:a,children:t});Y.displayName="Dialog.Description";const o={Root:L,Title:K,Description:Y,Close:z,Trigger:l.forwardRef($),Content:l.forwardRef(U),Header:l.forwardRef(k),Footer:l.forwardRef(ie),Body:l.forwardRef(G),SideContent:l.forwardRef(J)};L.__docgenInfo={description:"",methods:[],displayName:"Dialog.Root",props:{modal:{required:!1,tsType:{name:"boolean"},description:`Disable interaction with the rest of the page
@default false`},open:{required:!1,tsType:{name:"boolean"},description:"The controlled `open` state of the dialog\n@default false"},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Event handler called when the `open` state changes"},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};$.__docgenInfo={description:"",methods:[],displayName:"Dialog.Trigger",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-trigger'",computed:!1}}}};U.__docgenInfo={description:"",methods:[],displayName:"Dialog.Content",props:{rounded:{required:!1,tsType:{name:"boolean"},description:`Add rounded corners to the dialog
@default true`,defaultValue:{value:"true",computed:!1}},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'tight' | 'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'tight'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:`Define the padding of the dialog
@default "compact"`,defaultValue:{value:"'compact'",computed:!1}},verticalAlign:{required:!1,tsType:{name:"union",raw:"'top' | 'center'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'center'"}]},description:`The vertical alignment of the divider
@default "center"`,defaultValue:{value:"'center'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:`Define a maximum width for the dialog
@default "800px"`,defaultValue:{value:"'800px'",computed:!1}},minWidth:{required:!1,tsType:{name:"string"},description:`Define a minimum width for the dialog
@default "400px"`,defaultValue:{value:"'400px'",computed:!1}},minHeight:{required:!1,tsType:{name:"string"},description:`Define a maximum height for the dialog
@default "200px"`,defaultValue:{value:"'200px'",computed:!1}},showUnderlay:{required:!1,tsType:{name:"boolean"},description:`Show a dark underlay behind the dialog
@default false`,defaultValue:{value:"false",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-content'",computed:!1}}}};k.__docgenInfo={description:"",methods:[],displayName:"Dialog.Header",props:{showCloseButton:{required:!1,tsType:{name:"boolean"},description:`Show a close button in the header
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-header'",computed:!1}}}};ie.__docgenInfo={description:"",methods:[],displayName:"Dialog.Footer",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-footer'",computed:!1}}}};G.__docgenInfo={description:"",methods:[],displayName:"Dialog.Body",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-body'",computed:!1}}}};J.__docgenInfo={description:"",methods:[],displayName:"Dialog.SideContent",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-side-content'",computed:!1}}}};z.__docgenInfo={description:"",methods:[],displayName:"Dialog.Close",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""}}};K.__docgenInfo={description:"",methods:[],displayName:"Dialog.Title",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};Y.__docgenInfo={description:"",methods:[],displayName:"Dialog.Description",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};const No={component:U,subcomponents:{"Dialog.Root":L,"Dialog.Trigger":$,"Dialog.SideContent":J,"Dialog.Header":k,"Dialog.Body":G,"Dialog.Title":K,"Dialog.Description":Y,"Dialog.Close":z},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-w-full"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(d,{emphasis:"default",children:"Cancel"}),e.jsx(d,{children:"Submit"})]})]})]})},y={args:{children:"I am a dialog content"}},T={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},b={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{showCloseButton:!0,children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},q={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(d,{emphasis:"default",children:"Cancel"}),e.jsx(d,{children:"Submit"})]})]})]})},R={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Body,{...t})]})]})},B={args:{children:"I am a dialog content",showUnderlay:!0},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},w={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(d,{emphasis:"default",children:"Cancel"}),e.jsx(d,{children:"Submit"})]})]})]})},N={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(o.Close,{children:e.jsx(d,{emphasis:"default",children:"Cancel"})}),e.jsx(d,{children:"Submit"})]})]})]})},F={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Dialog Header"})}),e.jsx(o.Body,{children:e.jsx(o.Description,{children:t.children})}),e.jsxs(o.Footer,{children:[e.jsx(d,{emphasis:"default",children:"Cancel"}),e.jsx(d,{children:"Submit"})]})]})]})},S={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(o.Body,{children:e.jsx(o.Description,{asChild:!0,children:e.jsx("p",{children:t.children})})}),e.jsxs(o.Footer,{children:[e.jsx(d,{emphasis:"default",children:"Cancel"}),e.jsx(d,{children:"Submit"})]})]})]})},_={args:{padding:"none"}},O={args:{padding:"tight"}},I={args:{padding:"compact"}},H={args:{padding:"comfortable"}},E={args:{padding:"spacious"}},P={args:{verticalAlign:"top"}},A={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"}}},defaultViewport:"mobile"}},args:{children:"Hello World"}},W={args:{children:"I am a dialog content"},render:({...t})=>{const[a,i]=l.useState(!1);return e.jsxs(o.Root,{open:a,onOpenChange:r=>{i(r)},children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})}},M={render:({...t})=>{const a=l.forwardRef(({text:i,tooltipText:r},s)=>e.jsxs(D.Root,{children:[e.jsx(D.Trigger,{children:e.jsx("div",{children:e.jsx(p.Trigger,{children:e.jsx(d,{ref:s,children:i})})})}),e.jsx(D.Content,{side:"left",children:r})]}));return a.displayName="ButtonWithTooltip",e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(d,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,showUnderlay:!0,children:[e.jsx(o.Body,{children:e.jsxs(Rt,{direction:"column",gap:"8px",align:"flex-start",children:[e.jsxs(p.Root,{children:[e.jsx(p.Trigger,{children:e.jsx(d,{children:"Open flyout"})}),e.jsxs(p.Content,{children:[e.jsx(p.Header,{children:"Header"}),e.jsx(p.Body,{children:"I am a flyout"})]})]}),e.jsxs(D.Root,{children:[e.jsx(D.Trigger,{children:e.jsx(d,{children:"I am a tooltip, hover me"})}),e.jsx(D.Content,{side:"left",children:"Tooltip content"})]}),e.jsxs(p.Root,{children:[e.jsx(a,{text:"Open flyout (and I am a tooltip too)",tooltipText:"Tooltip text"}),e.jsxs(p.Content,{children:[e.jsx(p.Header,{children:"Header"}),e.jsx(p.Body,{children:"I am a flyout"})]})]})]})}),e.jsxs(o.Footer,{children:[e.jsx(d,{emphasis:"default",children:"Cancel"}),e.jsx(d,{children:"Submit"})]})]})]})}};var ne,re,se;y.parameters={...y.parameters,docs:{...(ne=y.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  }
}`,...(se=(re=y.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var le,de,ue;T.parameters={...T.parameters,docs:{...(le=T.parameters)==null?void 0:le.docs,source:{originalSource:`{
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
}`,...(ue=(de=T.parameters)==null?void 0:de.docs)==null?void 0:ue.source}}};var ce,ge,me;b.parameters={...b.parameters,docs:{...(ce=b.parameters)==null?void 0:ce.docs,source:{originalSource:`{
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
}`,...(me=(ge=b.parameters)==null?void 0:ge.docs)==null?void 0:me.source}}};var pe,he,fe;q.parameters={...q.parameters,docs:{...(pe=q.parameters)==null?void 0:pe.docs,source:{originalSource:`{
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
}`,...(fe=(he=q.parameters)==null?void 0:he.docs)==null?void 0:fe.source}}};var De,xe,ve;R.parameters={...R.parameters,docs:{...(De=R.parameters)==null?void 0:De.docs,source:{originalSource:`{
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
}`,...(ve=(xe=R.parameters)==null?void 0:xe.docs)==null?void 0:ve.source}}};var je,Ce,ye;B.parameters={...B.parameters,docs:{...(je=B.parameters)==null?void 0:je.docs,source:{originalSource:`{
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
}`,...(ye=(Ce=B.parameters)==null?void 0:Ce.docs)==null?void 0:ye.source}}};var Te,be,qe;w.parameters={...w.parameters,docs:{...(Te=w.parameters)==null?void 0:Te.docs,source:{originalSource:`{
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
}`,...(qe=(be=w.parameters)==null?void 0:be.docs)==null?void 0:qe.source}}};var Re,Be,we;N.parameters={...N.parameters,docs:{...(Re=N.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(we=(Be=N.parameters)==null?void 0:Be.docs)==null?void 0:we.source}}};var Ne,Fe,Se;F.parameters={...F.parameters,docs:{...(Ne=F.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
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
}`,...(Se=(Fe=F.parameters)==null?void 0:Fe.docs)==null?void 0:Se.source}}};var _e,Oe,Ie;S.parameters={...S.parameters,docs:{...(_e=S.parameters)==null?void 0:_e.docs,source:{originalSource:`{
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
}`,...(Ie=(Oe=S.parameters)==null?void 0:Oe.docs)==null?void 0:Ie.source}}};var He,Ee,Pe;_.parameters={..._.parameters,docs:{...(He=_.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    padding: 'none'
  }
}`,...(Pe=(Ee=_.parameters)==null?void 0:Ee.docs)==null?void 0:Pe.source}}};var Ae,We,Me;O.parameters={...O.parameters,docs:{...(Ae=O.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  args: {
    padding: 'tight'
  }
}`,...(Me=(We=O.parameters)==null?void 0:We.docs)==null?void 0:Me.source}}};var Ve,Le,$e;I.parameters={...I.parameters,docs:{...(Ve=I.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  args: {
    padding: 'compact'
  }
}`,...($e=(Le=I.parameters)==null?void 0:Le.docs)==null?void 0:$e.source}}};var Ue,ke,Ge;H.parameters={...H.parameters,docs:{...(Ue=H.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  args: {
    padding: 'comfortable'
  }
}`,...(Ge=(ke=H.parameters)==null?void 0:ke.docs)==null?void 0:Ge.source}}};var Je,ze,Ke;E.parameters={...E.parameters,docs:{...(Je=E.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  args: {
    padding: 'spacious'
  }
}`,...(Ke=(ze=E.parameters)==null?void 0:ze.docs)==null?void 0:Ke.source}}};var Ye,Ze,Qe;P.parameters={...P.parameters,docs:{...(Ye=P.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
  args: {
    verticalAlign: 'top'
  }
}`,...(Qe=(Ze=P.parameters)==null?void 0:Ze.docs)==null?void 0:Qe.source}}};var Xe,et,tt;A.parameters={...A.parameters,docs:{...(Xe=A.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
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
}`,...(tt=(et=A.parameters)==null?void 0:et.docs)==null?void 0:tt.source}}};var ot,at,it;W.parameters={...W.parameters,docs:{...(ot=W.parameters)==null?void 0:ot.docs,source:{originalSource:`{
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
}`,...(it=(at=W.parameters)==null?void 0:at.docs)==null?void 0:it.source}}};var nt,rt,st;M.parameters={...M.parameters,docs:{...(nt=M.parameters)==null?void 0:nt.docs,source:{originalSource:`{
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
}`,...(st=(rt=M.parameters)==null?void 0:rt.docs)==null?void 0:st.source}}};const Fo=["WithFullLayout","WithHeader","WithCloseButton","WithFooter","WithSideContent","WithUnderlay","WithLongText","WithCustomElementForClose","WithAnnouncedDescription","WithCustomElementAnnouncements","WithNoPadding","WithTightPadding","WithCompactPadding","WithComfortablePadding","WithSpaciousPadding","TopAligned","MobileView","ControlledComponent","WithFlyoutAndTooltip"];export{W as ControlledComponent,A as MobileView,P as TopAligned,F as WithAnnouncedDescription,b as WithCloseButton,H as WithComfortablePadding,I as WithCompactPadding,S as WithCustomElementAnnouncements,N as WithCustomElementForClose,M as WithFlyoutAndTooltip,q as WithFooter,y as WithFullLayout,T as WithHeader,w as WithLongText,_ as WithNoPadding,R as WithSideContent,E as WithSpaciousPadding,O as WithTightPadding,B as WithUnderlay,Fo as __namedExportsOrder,No as default};
