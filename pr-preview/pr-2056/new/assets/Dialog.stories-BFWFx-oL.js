import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as d}from"./index-BwDkhjyp.js";import{B as l}from"./Button-Bmc9bttI.js";import{F as Dt}from"./Flex-CwuMknTo.js";import{F as p}from"./Flyout-C0nz9HrT.js";import{T as X}from"./TextInput-C-R8WnJ7.js";import{T as x}from"./Tooltip-DXuVfqFj.js";import{e as Pt}from"./fondue-icons324-BNeIOJuO.js";import{c as j}from"./index-DOnKqARA.js";import{u as te,P as C,S as Wt}from"./index-Brw_kfkv.js";import{c as At,a as Mt}from"./index-BWD2N0gV.js";import{u as ee}from"./index-DduqEaLY.js";import{u as Vt}from"./index-DGaPG0k3.js";import{D as Lt,P as $t}from"./index-9q6yCIGA.js";import{R as Ut,h as kt,u as Gt,F as Jt,a as zt,c as Kt}from"./usePreventDropdownOverflow-hl17Ppn0.js";import{P as oe}from"./index-BwIM2_zL.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-BnElyh0X.js";import"./focusStyle-IgMhxCMT.js";import"./propsToCssVariables-BE5Q_-YS.js";import"./index-FKkhIU6G.js";import"./index-DxjWwZXO.js";import"./index-kUwV4muI.js";var ae="Dialog",[xt,Lo]=At(ae),[Yt,g]=xt(ae),vt=t=>{const{__scopeDialog:a,children:i,open:n,defaultOpen:s,onOpenChange:r,modal:u=!0}=t,c=d.useRef(null),m=d.useRef(null),[h=!1,v]=Vt({prop:n,defaultProp:s,onChange:r});return e.jsx(Yt,{scope:a,triggerRef:c,contentRef:m,contentId:ee(),titleId:ee(),descriptionId:ee(),open:h,onOpenChange:v,onOpenToggle:d.useCallback(()=>v(Et=>!Et),[v]),modal:u,children:i})};vt.displayName=ae;var jt="DialogTrigger",Ct=d.forwardRef((t,a)=>{const{__scopeDialog:i,...n}=t,s=g(jt,i),r=te(a,s.triggerRef);return e.jsx(C.button,{type:"button","aria-haspopup":"dialog","aria-expanded":s.open,"aria-controls":s.contentId,"data-state":ne(s.open),...n,ref:r,onClick:j(t.onClick,s.onOpenToggle)})});Ct.displayName=jt;var ie="DialogPortal",[Zt,Tt]=xt(ie,{forceMount:void 0}),yt=t=>{const{__scopeDialog:a,forceMount:i,children:n,container:s}=t,r=g(ie,a);return e.jsx(Zt,{scope:a,forceMount:i,children:d.Children.map(n,u=>e.jsx(oe,{present:i||r.open,children:e.jsx($t,{asChild:!0,container:s,children:u})}))})};yt.displayName=ie;var $="DialogOverlay",bt=d.forwardRef((t,a)=>{const i=Tt($,t.__scopeDialog),{forceMount:n=i.forceMount,...s}=t,r=g($,t.__scopeDialog);return r.modal?e.jsx(oe,{present:n||r.open,children:e.jsx(Qt,{...s,ref:a})}):null});bt.displayName=$;var Qt=d.forwardRef((t,a)=>{const{__scopeDialog:i,...n}=t,s=g($,i);return e.jsx(Ut,{as:Wt,allowPinchZoom:!0,shards:[s.contentRef],children:e.jsx(C.div,{"data-state":ne(s.open),...n,ref:a,style:{pointerEvents:"auto",...n.style}})})}),f="DialogContent",Bt=d.forwardRef((t,a)=>{const i=Tt(f,t.__scopeDialog),{forceMount:n=i.forceMount,...s}=t,r=g(f,t.__scopeDialog);return e.jsx(oe,{present:n||r.open,children:r.modal?e.jsx(Xt,{...s,ref:a}):e.jsx(eo,{...s,ref:a})})});Bt.displayName=f;var Xt=d.forwardRef((t,a)=>{const i=g(f,t.__scopeDialog),n=d.useRef(null),s=te(a,i.contentRef,n);return d.useEffect(()=>{const r=n.current;if(r)return kt(r)},[]),e.jsx(qt,{...t,ref:s,trapFocus:i.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:j(t.onCloseAutoFocus,r=>{var u;r.preventDefault(),(u=i.triggerRef.current)==null||u.focus()}),onPointerDownOutside:j(t.onPointerDownOutside,r=>{const u=r.detail.originalEvent,c=u.button===0&&u.ctrlKey===!0;(u.button===2||c)&&r.preventDefault()}),onFocusOutside:j(t.onFocusOutside,r=>r.preventDefault())})}),eo=d.forwardRef((t,a)=>{const i=g(f,t.__scopeDialog),n=d.useRef(!1),s=d.useRef(!1);return e.jsx(qt,{...t,ref:a,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:r=>{var u,c;(u=t.onCloseAutoFocus)==null||u.call(t,r),r.defaultPrevented||(n.current||(c=i.triggerRef.current)==null||c.focus(),r.preventDefault()),n.current=!1,s.current=!1},onInteractOutside:r=>{var m,h;(m=t.onInteractOutside)==null||m.call(t,r),r.defaultPrevented||(n.current=!0,r.detail.originalEvent.type==="pointerdown"&&(s.current=!0));const u=r.target;((h=i.triggerRef.current)==null?void 0:h.contains(u))&&r.preventDefault(),r.detail.originalEvent.type==="focusin"&&s.current&&r.preventDefault()}})}),qt=d.forwardRef((t,a)=>{const{__scopeDialog:i,trapFocus:n,onOpenAutoFocus:s,onCloseAutoFocus:r,...u}=t,c=g(f,i),m=d.useRef(null),h=te(a,m);return Gt(),e.jsxs(e.Fragment,{children:[e.jsx(Jt,{asChild:!0,loop:!0,trapped:n,onMountAutoFocus:s,onUnmountAutoFocus:r,children:e.jsx(Lt,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":ne(c.open),...u,ref:h,onDismiss:()=>c.onOpenChange(!1)})}),e.jsxs(e.Fragment,{children:[e.jsx(to,{titleId:c.titleId}),e.jsx(ao,{contentRef:m,descriptionId:c.descriptionId})]})]})}),re="DialogTitle",Rt=d.forwardRef((t,a)=>{const{__scopeDialog:i,...n}=t,s=g(re,i);return e.jsx(C.h2,{id:s.titleId,...n,ref:a})});Rt.displayName=re;var wt="DialogDescription",Ft=d.forwardRef((t,a)=>{const{__scopeDialog:i,...n}=t,s=g(wt,i);return e.jsx(C.p,{id:s.descriptionId,...n,ref:a})});Ft.displayName=wt;var Nt="DialogClose",St=d.forwardRef((t,a)=>{const{__scopeDialog:i,...n}=t,s=g(Nt,i);return e.jsx(C.button,{type:"button",...n,ref:a,onClick:j(t.onClick,()=>s.onOpenChange(!1))})});St.displayName=Nt;function ne(t){return t?"open":"closed"}var Ot="DialogTitleWarning",[$o,It]=Mt(Ot,{contentName:f,titleName:re,docsSlug:"dialog"}),to=({titleId:t})=>{const a=It(Ot),i=`\`${a.contentName}\` requires a \`${a.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${a.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${a.docsSlug}`;return d.useEffect(()=>{t&&(document.getElementById(t)||console.error(i))},[i,t]),null},oo="DialogDescriptionWarning",ao=({contentRef:t,descriptionId:a})=>{const n=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${It(oo).contentName}}.`;return d.useEffect(()=>{var r;const s=(r=t.current)==null?void 0:r.getAttribute("aria-describedby");a&&s&&(document.getElementById(a)||console.warn(n))},[n,t,a]),null},io=vt,ro=Ct,no=yt,so=bt,lo=Bt,uo=Rt,co=Ft,_t=St;const go="_content_mv8pd_6",mo="_header_mv8pd_50",po="_footer_mv8pd_51",ho="_body_mv8pd_52",fo="_underlay_mv8pd_77",Do="_sideContent_mv8pd_90",D={content:go,header:mo,footer:po,body:ho,underlay:fo,sideContent:Do},Ht=d.createContext({isModal:!1}),U=({children:t,...a})=>e.jsx(Ht.Provider,{value:{isModal:a.modal??!1},children:e.jsx(io,{...a,children:t})});U.displayName="Dialog.Root";const k=({children:t,"data-test-id":a="fondue-dialog-trigger"},i)=>e.jsx(ro,{onMouseDown:zt,"data-auto-focus-visible":"true","data-auto-focus-trigger":!0,"data-test-id":a,asChild:!0,ref:i,children:t});k.displayName="Dialog.Trigger";const xo=({children:t,showUnderlay:a})=>{const{isModal:i}=d.useContext(Ht);return i?e.jsx(so,{"data-visible":a,className:D.underlay,children:t}):e.jsx("div",{className:D.underlay,"data-visible":a,children:t})},G=({maxWidth:t="800px",minWidth:a="400px",minHeight:i="200px",padding:n="compact",verticalAlign:s="center","data-test-id":r="fondue-dialog-content",showUnderlay:u=!1,children:c,rounded:m=!0,...h},v)=>e.jsx(no,{children:e.jsx(xo,{showUnderlay:u,children:e.jsx(lo,{style:{"--dialog-max-width":t,"--dialog-min-width":a,"--dialog-min-height":i},ref:v,className:D.content,onFocus:Kt,"data-dialog-rounded":m,"data-dialog-spacing":n,"data-test-id":r,"data-dialog-vertical-align":s,...h,children:c})})});G.displayName="Dialog.Content";const J=({children:t,showCloseButton:a=!0,"data-test-id":i="fondue-dialog-header"},n)=>e.jsxs("div",{"data-test-id":i,ref:n,className:D.header,"data-dialog-layout-component":!0,children:[e.jsx("div",{children:t}),a&&e.jsx(_t,{role:"button","data-test-id":`${i}-close`,className:"tw-cursor-pointer",children:e.jsx(Pt,{size:20})})]});J.displayName="Dialog.Header";const se=({children:t,"data-test-id":a="fondue-dialog-footer"},i)=>e.jsx("div",{"data-test-id":a,ref:i,className:D.footer,"data-dialog-layout-component":!0,children:t});se.displayName="Dialog.Footer";const z=({children:t,"data-test-id":a="fondue-dialog-body"},i)=>e.jsx("div",{"data-test-id":a,ref:i,className:D.body,"data-dialog-layout-component":!0,children:t});z.displayName="Dialog.Body";const K=({children:t,"data-test-id":a="fondue-dialog-side-content"},i)=>e.jsx("div",{"data-test-id":a,ref:i,className:D.sideContent,"data-dialog-layout-component":!0,children:t});K.displayName="Dialog.SideContent";const Y=({children:t})=>e.jsx(_t,{asChild:!0,children:t});Y.displayName="Dialog.Close";const Z=({children:t,asChild:a})=>e.jsx(uo,{asChild:a,children:t});Z.displayName="Dialog.Title";const Q=({children:t,asChild:a})=>e.jsx(co,{asChild:a,children:t});Q.displayName="Dialog.Description";const o={Root:U,Title:Z,Description:Q,Close:Y,Trigger:d.forwardRef(k),Content:d.forwardRef(G),Header:d.forwardRef(J),Footer:d.forwardRef(se),Body:d.forwardRef(z),SideContent:d.forwardRef(K)};U.__docgenInfo={description:"",methods:[],displayName:"Dialog.Root",props:{modal:{required:!1,tsType:{name:"boolean"},description:`Disable interaction with the rest of the page
@default false`},open:{required:!1,tsType:{name:"boolean"},description:"The controlled `open` state of the dialog\n@default false"},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Event handler called when the `open` state changes"},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};k.__docgenInfo={description:"",methods:[],displayName:"Dialog.Trigger",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-trigger'",computed:!1}}}};G.__docgenInfo={description:"",methods:[],displayName:"Dialog.Content",props:{rounded:{required:!1,tsType:{name:"boolean"},description:`Add rounded corners to the dialog
@default true`,defaultValue:{value:"true",computed:!1}},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'tight' | 'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'tight'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:`Define the padding of the dialog
@default "compact"`,defaultValue:{value:"'compact'",computed:!1}},verticalAlign:{required:!1,tsType:{name:"union",raw:"'top' | 'center'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'center'"}]},description:`The vertical alignment of the divider
@default "center"`,defaultValue:{value:"'center'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:`Define a maximum width for the dialog
@default "800px"`,defaultValue:{value:"'800px'",computed:!1}},minWidth:{required:!1,tsType:{name:"string"},description:`Define a minimum width for the dialog
@default "400px"`,defaultValue:{value:"'400px'",computed:!1}},minHeight:{required:!1,tsType:{name:"string"},description:`Define a minimum height for the dialog
@default "200px"`,defaultValue:{value:"'200px'",computed:!1}},showUnderlay:{required:!1,tsType:{name:"boolean"},description:`Show a dark underlay behind the dialog
@default false`,defaultValue:{value:"false",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-content'",computed:!1}}}};J.__docgenInfo={description:"",methods:[],displayName:"Dialog.Header",props:{showCloseButton:{required:!1,tsType:{name:"boolean"},description:`Show a close button in the header
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-header'",computed:!1}}}};se.__docgenInfo={description:"",methods:[],displayName:"Dialog.Footer",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-footer'",computed:!1}}}};z.__docgenInfo={description:"",methods:[],displayName:"Dialog.Body",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-body'",computed:!1}}}};K.__docgenInfo={description:"",methods:[],displayName:"Dialog.SideContent",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-side-content'",computed:!1}}}};Y.__docgenInfo={description:"",methods:[],displayName:"Dialog.Close",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""}}};Z.__docgenInfo={description:"",methods:[],displayName:"Dialog.Title",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};Q.__docgenInfo={description:"",methods:[],displayName:"Dialog.Description",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};const Uo={component:G,subcomponents:{"Dialog.Root":U,"Dialog.Trigger":k,"Dialog.SideContent":K,"Dialog.Header":J,"Dialog.Body":z,"Dialog.Title":Z,"Dialog.Description":Q,"Dialog.Close":Y},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-w-full"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},T={args:{children:"I am a dialog content"}},y={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},b={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{showCloseButton:!0,children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},B={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},q={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Body,{...t})]})]})},R={args:{children:"I am a dialog content",showUnderlay:!0},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},w={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},F={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(o.Close,{children:e.jsx(l,{emphasis:"default",children:"Cancel"})}),e.jsx(l,{children:"Submit"})]})]})]})},N={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Dialog Header"})}),e.jsx(o.Body,{children:e.jsx(o.Description,{children:t.children})}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},S={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(o.Body,{children:e.jsx(o.Description,{asChild:!0,children:e.jsx("p",{children:t.children})})}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},O={args:{children:"Hello World"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open flyout"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:"Header"}),e.jsxs(o.Body,{...t,children:[e.jsx(X,{}),e.jsx(X,{}),e.jsx(X,{})]})]})]})},I={args:{padding:"none"}},_={args:{padding:"tight"}},H={args:{padding:"compact"}},E={args:{padding:"comfortable"}},P={args:{padding:"spacious"}},W={args:{verticalAlign:"top"}},A={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"}}},defaultViewport:"mobile"}},args:{children:"Hello World"}},M={args:{children:"I am a dialog content"},render:t=>{const[a,i]=d.useState(!1);return e.jsxs(o.Root,{open:a,onOpenChange:n=>{i(n)},children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})}},V={render:t=>{const a=d.forwardRef(({text:i,tooltipText:n},s)=>e.jsxs(x.Root,{children:[e.jsx(x.Trigger,{children:e.jsx("div",{children:e.jsx(p.Trigger,{children:e.jsx(l,{ref:s,children:i})})})}),e.jsx(x.Content,{side:"left",children:n})]}));return a.displayName="ButtonWithTooltip",e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,showUnderlay:!0,children:[e.jsx(o.Body,{children:e.jsxs(Dt,{direction:"column",gap:"8px",align:"flex-start",children:[e.jsxs(p.Root,{children:[e.jsx(p.Trigger,{children:e.jsx(l,{children:"Open flyout"})}),e.jsxs(p.Content,{children:[e.jsx(p.Header,{children:"Header"}),e.jsx(p.Body,{children:"I am a flyout"})]})]}),e.jsxs(x.Root,{children:[e.jsx(x.Trigger,{children:e.jsx(l,{children:"I am a tooltip, hover me"})}),e.jsx(x.Content,{side:"left",children:"Tooltip content"})]}),e.jsxs(p.Root,{children:[e.jsx(a,{text:"Open flyout (and I am a tooltip too)",tooltipText:"Tooltip text"}),e.jsxs(p.Content,{children:[e.jsx(p.Header,{children:"Header"}),e.jsx(p.Body,{children:"I am a flyout"})]})]})]})}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})}},L={render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{children:[e.jsx(o.Header,{children:e.jsxs(Dt,{justify:"space-between",align:"center",width:"100%",pr:"1rem",children:[e.jsx(o.Title,{children:"Header"}),e.jsx(l,{emphasis:"default",onPress:()=>{alert("Button in the header clicked")},children:"Button in the header"})]})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})};var le,de,ue;T.parameters={...T.parameters,docs:{...(le=T.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  }
}`,...(ue=(de=T.parameters)==null?void 0:de.docs)==null?void 0:ue.source}}};var ce,ge,me;y.parameters={...y.parameters,docs:{...(ce=y.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: args => {
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
}`,...(me=(ge=y.parameters)==null?void 0:ge.docs)==null?void 0:me.source}}};var pe,he,fe;b.parameters={...b.parameters,docs:{...(pe=b.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: args => {
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
}`,...(fe=(he=b.parameters)==null?void 0:he.docs)==null?void 0:fe.source}}};var De,xe,ve;B.parameters={...B.parameters,docs:{...(De=B.parameters)==null?void 0:De.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: args => {
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
}`,...(ve=(xe=B.parameters)==null?void 0:xe.docs)==null?void 0:ve.source}}};var je,Ce,Te;q.parameters={...q.parameters,docs:{...(je=q.parameters)==null?void 0:je.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: args => {
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
}`,...(Te=(Ce=q.parameters)==null?void 0:Ce.docs)==null?void 0:Te.source}}};var ye,be,Be;R.parameters={...R.parameters,docs:{...(ye=R.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content',
    showUnderlay: true
  },
  render: args => {
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
}`,...(Be=(be=R.parameters)==null?void 0:be.docs)==null?void 0:Be.source}}};var qe,Re,we;w.parameters={...w.parameters,docs:{...(qe=w.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices.'
  },
  render: args => {
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
}`,...(we=(Re=w.parameters)==null?void 0:Re.docs)==null?void 0:we.source}}};var Fe,Ne,Se;F.parameters={...F.parameters,docs:{...(Fe=F.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: args => {
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
}`,...(Se=(Ne=F.parameters)==null?void 0:Ne.docs)==null?void 0:Se.source}}};var Oe,Ie,_e;N.parameters={...N.parameters,docs:{...(Oe=N.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: args => {
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
}`,...(_e=(Ie=N.parameters)==null?void 0:Ie.docs)==null?void 0:_e.source}}};var He,Ee,Pe;S.parameters={...S.parameters,docs:{...(He=S.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices.'
  },
  render: args => {
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
}`,...(Pe=(Ee=S.parameters)==null?void 0:Ee.docs)==null?void 0:Pe.source}}};var We,Ae,Me;O.parameters={...O.parameters,docs:{...(We=O.parameters)==null?void 0:We.docs,source:{originalSource:`{
  args: {
    children: 'Hello World'
  },
  render: args => {
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
}`,...(Me=(Ae=O.parameters)==null?void 0:Ae.docs)==null?void 0:Me.source}}};var Ve,Le,$e;I.parameters={...I.parameters,docs:{...(Ve=I.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  args: {
    padding: 'none'
  }
}`,...($e=(Le=I.parameters)==null?void 0:Le.docs)==null?void 0:$e.source}}};var Ue,ke,Ge;_.parameters={..._.parameters,docs:{...(Ue=_.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  args: {
    padding: 'tight'
  }
}`,...(Ge=(ke=_.parameters)==null?void 0:ke.docs)==null?void 0:Ge.source}}};var Je,ze,Ke;H.parameters={...H.parameters,docs:{...(Je=H.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  args: {
    padding: 'compact'
  }
}`,...(Ke=(ze=H.parameters)==null?void 0:ze.docs)==null?void 0:Ke.source}}};var Ye,Ze,Qe;E.parameters={...E.parameters,docs:{...(Ye=E.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
  args: {
    padding: 'comfortable'
  }
}`,...(Qe=(Ze=E.parameters)==null?void 0:Ze.docs)==null?void 0:Qe.source}}};var Xe,et,tt;P.parameters={...P.parameters,docs:{...(Xe=P.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  args: {
    padding: 'spacious'
  }
}`,...(tt=(et=P.parameters)==null?void 0:et.docs)==null?void 0:tt.source}}};var ot,at,it;W.parameters={...W.parameters,docs:{...(ot=W.parameters)==null?void 0:ot.docs,source:{originalSource:`{
  args: {
    verticalAlign: 'top'
  }
}`,...(it=(at=W.parameters)==null?void 0:at.docs)==null?void 0:it.source}}};var rt,nt,st;A.parameters={...A.parameters,docs:{...(rt=A.parameters)==null?void 0:rt.docs,source:{originalSource:`{
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
}`,...(st=(nt=A.parameters)==null?void 0:nt.docs)==null?void 0:st.source}}};var lt,dt,ut;M.parameters={...M.parameters,docs:{...(lt=M.parameters)==null?void 0:lt.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: args => {
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
}`,...(ut=(dt=M.parameters)==null?void 0:dt.docs)==null?void 0:ut.source}}};var ct,gt,mt;V.parameters={...V.parameters,docs:{...(ct=V.parameters)==null?void 0:ct.docs,source:{originalSource:`{
  render: args => {
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
}`,...(mt=(gt=V.parameters)==null?void 0:gt.docs)==null?void 0:mt.source}}};var pt,ht,ft;L.parameters={...L.parameters,docs:{...(pt=L.parameters)==null?void 0:pt.docs,source:{originalSource:`{
  render: args => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content>
                    <Dialog.Header>
                        <Flex justify="space-between" align="center" width="100%" pr="1rem">
                            <Dialog.Title>Header</Dialog.Title>
                            <Button emphasis="default" onPress={() => {
              alert('Button in the header clicked');
            }}>
                                Button in the header
                            </Button>
                        </Flex>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                    <Dialog.Footer>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(ft=(ht=L.parameters)==null?void 0:ht.docs)==null?void 0:ft.source}}};const ko=["WithFullLayout","WithHeader","WithCloseButton","WithFooter","WithSideContent","WithUnderlay","WithLongText","WithCustomElementForClose","WithAnnouncedDescription","WithCustomElementAnnouncements","WithFocusableContent","WithNoPadding","WithTightPadding","WithCompactPadding","WithComfortablePadding","WithSpaciousPadding","TopAligned","MobileView","ControlledComponent","WithFlyoutAndTooltip","WithButtonInTheHeader"];export{M as ControlledComponent,A as MobileView,W as TopAligned,N as WithAnnouncedDescription,L as WithButtonInTheHeader,b as WithCloseButton,E as WithComfortablePadding,H as WithCompactPadding,S as WithCustomElementAnnouncements,F as WithCustomElementForClose,V as WithFlyoutAndTooltip,O as WithFocusableContent,B as WithFooter,T as WithFullLayout,y as WithHeader,w as WithLongText,I as WithNoPadding,q as WithSideContent,P as WithSpaciousPadding,_ as WithTightPadding,R as WithUnderlay,ko as __namedExportsOrder,Uo as default};
