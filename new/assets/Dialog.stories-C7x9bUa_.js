import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as d}from"./index-BwDkhjyp.js";import{B as l}from"./Button-Bmc9bttI.js";import{F as St}from"./Flex-CwuMknTo.js";import{F as p}from"./Flyout-D04oR_be.js";import{T as Q}from"./TextInput-DrsOQVhD.js";import{T as D}from"./Tooltip-DvWejVSX.js";import{e as Ot}from"./fondue-icons324-_g5P3FDE.js";import{c as j}from"./index-DOnKqARA.js";import{u as ee,P as C,S as It}from"./index-Brw_kfkv.js";import{c as _t,a as Ht}from"./index-BWD2N0gV.js";import{u as X}from"./index-DduqEaLY.js";import{u as Et}from"./index-DGaPG0k3.js";import{D as Wt,P as Pt}from"./index-9q6yCIGA.js";import{R as At,h as Mt,u as Vt,F as Lt,a as $t,c as Ut}from"./usePreventDropdownOverflow-hl17Ppn0.js";import{P as te}from"./index-BwIM2_zL.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-BnElyh0X.js";import"./focusStyle-IgMhxCMT.js";import"./propsToCssVariables-BE5Q_-YS.js";import"./index-FKkhIU6G.js";import"./index-DxjWwZXO.js";import"./index-kUwV4muI.js";var oe="Dialog",[mt,Eo]=_t(oe),[kt,g]=mt(oe),pt=t=>{const{__scopeDialog:a,children:i,open:r,defaultOpen:s,onOpenChange:n,modal:u=!0}=t,c=d.useRef(null),m=d.useRef(null),[h=!1,v]=Et({prop:r,defaultProp:s,onChange:n});return e.jsx(kt,{scope:a,triggerRef:c,contentRef:m,contentId:X(),titleId:X(),descriptionId:X(),open:h,onOpenChange:v,onOpenToggle:d.useCallback(()=>v(Nt=>!Nt),[v]),modal:u,children:i})};pt.displayName=oe;var ht="DialogTrigger",ft=d.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,s=g(ht,i),n=ee(a,s.triggerRef);return e.jsx(C.button,{type:"button","aria-haspopup":"dialog","aria-expanded":s.open,"aria-controls":s.contentId,"data-state":ne(s.open),...r,ref:n,onClick:j(t.onClick,s.onOpenToggle)})});ft.displayName=ht;var ae="DialogPortal",[Gt,Dt]=mt(ae,{forceMount:void 0}),xt=t=>{const{__scopeDialog:a,forceMount:i,children:r,container:s}=t,n=g(ae,a);return e.jsx(Gt,{scope:a,forceMount:i,children:d.Children.map(r,u=>e.jsx(te,{present:i||n.open,children:e.jsx(Pt,{asChild:!0,container:s,children:u})}))})};xt.displayName=ae;var L="DialogOverlay",vt=d.forwardRef((t,a)=>{const i=Dt(L,t.__scopeDialog),{forceMount:r=i.forceMount,...s}=t,n=g(L,t.__scopeDialog);return n.modal?e.jsx(te,{present:r||n.open,children:e.jsx(Jt,{...s,ref:a})}):null});vt.displayName=L;var Jt=d.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,s=g(L,i);return e.jsx(At,{as:It,allowPinchZoom:!0,shards:[s.contentRef],children:e.jsx(C.div,{"data-state":ne(s.open),...r,ref:a,style:{pointerEvents:"auto",...r.style}})})}),f="DialogContent",jt=d.forwardRef((t,a)=>{const i=Dt(f,t.__scopeDialog),{forceMount:r=i.forceMount,...s}=t,n=g(f,t.__scopeDialog);return e.jsx(te,{present:r||n.open,children:n.modal?e.jsx(zt,{...s,ref:a}):e.jsx(Kt,{...s,ref:a})})});jt.displayName=f;var zt=d.forwardRef((t,a)=>{const i=g(f,t.__scopeDialog),r=d.useRef(null),s=ee(a,i.contentRef,r);return d.useEffect(()=>{const n=r.current;if(n)return Mt(n)},[]),e.jsx(Ct,{...t,ref:s,trapFocus:i.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:j(t.onCloseAutoFocus,n=>{var u;n.preventDefault(),(u=i.triggerRef.current)==null||u.focus()}),onPointerDownOutside:j(t.onPointerDownOutside,n=>{const u=n.detail.originalEvent,c=u.button===0&&u.ctrlKey===!0;(u.button===2||c)&&n.preventDefault()}),onFocusOutside:j(t.onFocusOutside,n=>n.preventDefault())})}),Kt=d.forwardRef((t,a)=>{const i=g(f,t.__scopeDialog),r=d.useRef(!1),s=d.useRef(!1);return e.jsx(Ct,{...t,ref:a,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:n=>{var u,c;(u=t.onCloseAutoFocus)==null||u.call(t,n),n.defaultPrevented||(r.current||(c=i.triggerRef.current)==null||c.focus(),n.preventDefault()),r.current=!1,s.current=!1},onInteractOutside:n=>{var m,h;(m=t.onInteractOutside)==null||m.call(t,n),n.defaultPrevented||(r.current=!0,n.detail.originalEvent.type==="pointerdown"&&(s.current=!0));const u=n.target;((h=i.triggerRef.current)==null?void 0:h.contains(u))&&n.preventDefault(),n.detail.originalEvent.type==="focusin"&&s.current&&n.preventDefault()}})}),Ct=d.forwardRef((t,a)=>{const{__scopeDialog:i,trapFocus:r,onOpenAutoFocus:s,onCloseAutoFocus:n,...u}=t,c=g(f,i),m=d.useRef(null),h=ee(a,m);return Vt(),e.jsxs(e.Fragment,{children:[e.jsx(Lt,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:s,onUnmountAutoFocus:n,children:e.jsx(Wt,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":ne(c.open),...u,ref:h,onDismiss:()=>c.onOpenChange(!1)})}),e.jsxs(e.Fragment,{children:[e.jsx(Yt,{titleId:c.titleId}),e.jsx(Qt,{contentRef:m,descriptionId:c.descriptionId})]})]})}),ie="DialogTitle",Tt=d.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,s=g(ie,i);return e.jsx(C.h2,{id:s.titleId,...r,ref:a})});Tt.displayName=ie;var yt="DialogDescription",bt=d.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,s=g(yt,i);return e.jsx(C.p,{id:s.descriptionId,...r,ref:a})});bt.displayName=yt;var qt="DialogClose",Rt=d.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,s=g(qt,i);return e.jsx(C.button,{type:"button",...r,ref:a,onClick:j(t.onClick,()=>s.onOpenChange(!1))})});Rt.displayName=qt;function ne(t){return t?"open":"closed"}var Bt="DialogTitleWarning",[Wo,wt]=Ht(Bt,{contentName:f,titleName:ie,docsSlug:"dialog"}),Yt=({titleId:t})=>{const a=wt(Bt),i=`\`${a.contentName}\` requires a \`${a.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${a.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${a.docsSlug}`;return d.useEffect(()=>{t&&(document.getElementById(t)||console.error(i))},[i,t]),null},Zt="DialogDescriptionWarning",Qt=({contentRef:t,descriptionId:a})=>{const r=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${wt(Zt).contentName}}.`;return d.useEffect(()=>{var n;const s=(n=t.current)==null?void 0:n.getAttribute("aria-describedby");a&&s&&(document.getElementById(a)||console.warn(r))},[r,t,a]),null},Xt=pt,eo=ft,to=xt,oo=vt,ao=jt,io=Tt,no=bt,Ft=Rt;const ro="_content_gej09_6",so="_header_gej09_50",lo="_footer_gej09_51",uo="_body_gej09_52",co="_underlay_gej09_77",go="_sideContent_gej09_86",x={content:ro,header:so,footer:lo,body:uo,underlay:co,sideContent:go},$=({children:t,...a})=>e.jsx(Xt,{...a,children:t});$.displayName="Dialog.Root";const U=({children:t,"data-test-id":a="fondue-dialog-trigger"},i)=>e.jsx(eo,{onMouseDown:$t,"data-auto-focus-visible":"true","data-auto-focus-trigger":!0,"data-test-id":a,asChild:!0,ref:i,children:t});U.displayName="Dialog.Trigger";const k=({maxWidth:t="800px",minWidth:a="400px",minHeight:i="200px",padding:r="compact",verticalAlign:s="center","data-test-id":n="fondue-dialog-content",showUnderlay:u=!1,children:c,rounded:m=!0,...h},v)=>e.jsx(to,{children:e.jsx(oo,{"data-visible":u,className:x.underlay,children:e.jsx(ao,{style:{"--dialog-max-width":t,"--dialog-min-width":a,"--dialog-min-height":i},ref:v,className:x.content,onFocus:Ut,"data-dialog-rounded":m,"data-dialog-spacing":r,"data-test-id":n,"data-dialog-vertical-align":s,...h,children:c})})});k.displayName="Dialog.Content";const G=({children:t,showCloseButton:a=!0,"data-test-id":i="fondue-dialog-header"},r)=>e.jsxs("div",{"data-test-id":i,ref:r,className:x.header,"data-dialog-layout-component":!0,children:[e.jsx("div",{children:t}),a&&e.jsx(Ft,{role:"button","data-test-id":`${i}-close`,className:"tw-cursor-pointer",children:e.jsx(Ot,{size:20})})]});G.displayName="Dialog.Header";const re=({children:t,"data-test-id":a="fondue-dialog-footer"},i)=>e.jsx("div",{"data-test-id":a,ref:i,className:x.footer,"data-dialog-layout-component":!0,children:t});re.displayName="Dialog.Footer";const J=({children:t,"data-test-id":a="fondue-dialog-body"},i)=>e.jsx("div",{"data-test-id":a,ref:i,className:x.body,"data-dialog-layout-component":!0,children:t});J.displayName="Dialog.Body";const z=({children:t,"data-test-id":a="fondue-dialog-side-content"},i)=>e.jsx("div",{"data-test-id":a,ref:i,className:x.sideContent,"data-dialog-layout-component":!0,children:t});z.displayName="Dialog.SideContent";const K=({children:t})=>e.jsx(Ft,{asChild:!0,children:t});K.displayName="Dialog.Close";const Y=({children:t,asChild:a})=>e.jsx(io,{asChild:a,children:t});Y.displayName="Dialog.Title";const Z=({children:t,asChild:a})=>e.jsx(no,{asChild:a,children:t});Z.displayName="Dialog.Description";const o={Root:$,Title:Y,Description:Z,Close:K,Trigger:d.forwardRef(U),Content:d.forwardRef(k),Header:d.forwardRef(G),Footer:d.forwardRef(re),Body:d.forwardRef(J),SideContent:d.forwardRef(z)};$.__docgenInfo={description:"",methods:[],displayName:"Dialog.Root",props:{modal:{required:!1,tsType:{name:"boolean"},description:`Disable interaction with the rest of the page
@default false`},open:{required:!1,tsType:{name:"boolean"},description:"The controlled `open` state of the dialog\n@default false"},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Event handler called when the `open` state changes"},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};U.__docgenInfo={description:"",methods:[],displayName:"Dialog.Trigger",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-trigger'",computed:!1}}}};k.__docgenInfo={description:"",methods:[],displayName:"Dialog.Content",props:{rounded:{required:!1,tsType:{name:"boolean"},description:`Add rounded corners to the dialog
@default true`,defaultValue:{value:"true",computed:!1}},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'tight' | 'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'tight'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:`Define the padding of the dialog
@default "compact"`,defaultValue:{value:"'compact'",computed:!1}},verticalAlign:{required:!1,tsType:{name:"union",raw:"'top' | 'center'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'center'"}]},description:`The vertical alignment of the divider
@default "center"`,defaultValue:{value:"'center'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:`Define a maximum width for the dialog
@default "800px"`,defaultValue:{value:"'800px'",computed:!1}},minWidth:{required:!1,tsType:{name:"string"},description:`Define a minimum width for the dialog
@default "400px"`,defaultValue:{value:"'400px'",computed:!1}},minHeight:{required:!1,tsType:{name:"string"},description:`Define a maximum height for the dialog
@default "200px"`,defaultValue:{value:"'200px'",computed:!1}},showUnderlay:{required:!1,tsType:{name:"boolean"},description:`Show a dark underlay behind the dialog
@default false`,defaultValue:{value:"false",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-content'",computed:!1}}}};G.__docgenInfo={description:"",methods:[],displayName:"Dialog.Header",props:{showCloseButton:{required:!1,tsType:{name:"boolean"},description:`Show a close button in the header
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-header'",computed:!1}}}};re.__docgenInfo={description:"",methods:[],displayName:"Dialog.Footer",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-footer'",computed:!1}}}};J.__docgenInfo={description:"",methods:[],displayName:"Dialog.Body",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-body'",computed:!1}}}};z.__docgenInfo={description:"",methods:[],displayName:"Dialog.SideContent",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-side-content'",computed:!1}}}};K.__docgenInfo={description:"",methods:[],displayName:"Dialog.Close",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""}}};Y.__docgenInfo={description:"",methods:[],displayName:"Dialog.Title",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};Z.__docgenInfo={description:"",methods:[],displayName:"Dialog.Description",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};const Po={component:k,subcomponents:{"Dialog.Root":$,"Dialog.Trigger":U,"Dialog.SideContent":z,"Dialog.Header":G,"Dialog.Body":J,"Dialog.Title":Y,"Dialog.Description":Z,"Dialog.Close":K},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-w-full"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},T={args:{children:"I am a dialog content"}},y={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},b={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{showCloseButton:!0,children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},q={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},R={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Body,{...t})]})]})},B={args:{children:"I am a dialog content",showUnderlay:!0},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},w={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},F={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(o.Close,{children:e.jsx(l,{emphasis:"default",children:"Cancel"})}),e.jsx(l,{children:"Submit"})]})]})]})},N={args:{children:"I am a dialog content"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Dialog Header"})}),e.jsx(o.Body,{children:e.jsx(o.Description,{children:t.children})}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},S={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(o.Body,{children:e.jsx(o.Description,{asChild:!0,children:e.jsx("p",{children:t.children})})}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},O={args:{children:"Hello World"},render:({...t})=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open flyout"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:"Header"}),e.jsxs(o.Body,{...t,children:[e.jsx(Q,{}),e.jsx(Q,{}),e.jsx(Q,{})]})]})]})},I={args:{padding:"none"}},_={args:{padding:"tight"}},H={args:{padding:"compact"}},E={args:{padding:"comfortable"}},W={args:{padding:"spacious"}},P={args:{verticalAlign:"top"}},A={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"}}},defaultViewport:"mobile"}},args:{children:"Hello World"}},M={args:{children:"I am a dialog content"},render:({...t})=>{const[a,i]=d.useState(!1);return e.jsxs(o.Root,{open:a,onOpenChange:r=>{i(r)},children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})}},V={render:({...t})=>{const a=d.forwardRef(({text:i,tooltipText:r},s)=>e.jsxs(D.Root,{children:[e.jsx(D.Trigger,{children:e.jsx("div",{children:e.jsx(p.Trigger,{children:e.jsx(l,{ref:s,children:i})})})}),e.jsx(D.Content,{side:"left",children:r})]}));return a.displayName="ButtonWithTooltip",e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,showUnderlay:!0,children:[e.jsx(o.Body,{children:e.jsxs(St,{direction:"column",gap:"8px",align:"flex-start",children:[e.jsxs(p.Root,{children:[e.jsx(p.Trigger,{children:e.jsx(l,{children:"Open flyout"})}),e.jsxs(p.Content,{children:[e.jsx(p.Header,{children:"Header"}),e.jsx(p.Body,{children:"I am a flyout"})]})]}),e.jsxs(D.Root,{children:[e.jsx(D.Trigger,{children:e.jsx(l,{children:"I am a tooltip, hover me"})}),e.jsx(D.Content,{side:"left",children:"Tooltip content"})]}),e.jsxs(p.Root,{children:[e.jsx(a,{text:"Open flyout (and I am a tooltip too)",tooltipText:"Tooltip text"}),e.jsxs(p.Content,{children:[e.jsx(p.Header,{children:"Header"}),e.jsx(p.Body,{children:"I am a flyout"})]})]})]})}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})}};var se,le,de;T.parameters={...T.parameters,docs:{...(se=T.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  }
}`,...(de=(le=T.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var ue,ce,ge;y.parameters={...y.parameters,docs:{...(ue=y.parameters)==null?void 0:ue.docs,source:{originalSource:`{
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
}`,...(ge=(ce=y.parameters)==null?void 0:ce.docs)==null?void 0:ge.source}}};var me,pe,he;b.parameters={...b.parameters,docs:{...(me=b.parameters)==null?void 0:me.docs,source:{originalSource:`{
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
}`,...(he=(pe=b.parameters)==null?void 0:pe.docs)==null?void 0:he.source}}};var fe,De,xe;q.parameters={...q.parameters,docs:{...(fe=q.parameters)==null?void 0:fe.docs,source:{originalSource:`{
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
}`,...(xe=(De=q.parameters)==null?void 0:De.docs)==null?void 0:xe.source}}};var ve,je,Ce;R.parameters={...R.parameters,docs:{...(ve=R.parameters)==null?void 0:ve.docs,source:{originalSource:`{
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
}`,...(Ce=(je=R.parameters)==null?void 0:je.docs)==null?void 0:Ce.source}}};var Te,ye,be;B.parameters={...B.parameters,docs:{...(Te=B.parameters)==null?void 0:Te.docs,source:{originalSource:`{
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
}`,...(be=(ye=B.parameters)==null?void 0:ye.docs)==null?void 0:be.source}}};var qe,Re,Be;w.parameters={...w.parameters,docs:{...(qe=w.parameters)==null?void 0:qe.docs,source:{originalSource:`{
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
}`,...(Be=(Re=w.parameters)==null?void 0:Re.docs)==null?void 0:Be.source}}};var we,Fe,Ne;F.parameters={...F.parameters,docs:{...(we=F.parameters)==null?void 0:we.docs,source:{originalSource:`{
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
}`,...(Ne=(Fe=F.parameters)==null?void 0:Fe.docs)==null?void 0:Ne.source}}};var Se,Oe,Ie;N.parameters={...N.parameters,docs:{...(Se=N.parameters)==null?void 0:Se.docs,source:{originalSource:`{
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
}`,...(Ie=(Oe=N.parameters)==null?void 0:Oe.docs)==null?void 0:Ie.source}}};var _e,He,Ee;S.parameters={...S.parameters,docs:{...(_e=S.parameters)==null?void 0:_e.docs,source:{originalSource:`{
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
}`,...(Ee=(He=S.parameters)==null?void 0:He.docs)==null?void 0:Ee.source}}};var We,Pe,Ae;O.parameters={...O.parameters,docs:{...(We=O.parameters)==null?void 0:We.docs,source:{originalSource:`{
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
}`,...(Ae=(Pe=O.parameters)==null?void 0:Pe.docs)==null?void 0:Ae.source}}};var Me,Ve,Le;I.parameters={...I.parameters,docs:{...(Me=I.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  args: {
    padding: 'none'
  }
}`,...(Le=(Ve=I.parameters)==null?void 0:Ve.docs)==null?void 0:Le.source}}};var $e,Ue,ke;_.parameters={..._.parameters,docs:{...($e=_.parameters)==null?void 0:$e.docs,source:{originalSource:`{
  args: {
    padding: 'tight'
  }
}`,...(ke=(Ue=_.parameters)==null?void 0:Ue.docs)==null?void 0:ke.source}}};var Ge,Je,ze;H.parameters={...H.parameters,docs:{...(Ge=H.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
  args: {
    padding: 'compact'
  }
}`,...(ze=(Je=H.parameters)==null?void 0:Je.docs)==null?void 0:ze.source}}};var Ke,Ye,Ze;E.parameters={...E.parameters,docs:{...(Ke=E.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  args: {
    padding: 'comfortable'
  }
}`,...(Ze=(Ye=E.parameters)==null?void 0:Ye.docs)==null?void 0:Ze.source}}};var Qe,Xe,et;W.parameters={...W.parameters,docs:{...(Qe=W.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
  args: {
    padding: 'spacious'
  }
}`,...(et=(Xe=W.parameters)==null?void 0:Xe.docs)==null?void 0:et.source}}};var tt,ot,at;P.parameters={...P.parameters,docs:{...(tt=P.parameters)==null?void 0:tt.docs,source:{originalSource:`{
  args: {
    verticalAlign: 'top'
  }
}`,...(at=(ot=P.parameters)==null?void 0:ot.docs)==null?void 0:at.source}}};var it,nt,rt;A.parameters={...A.parameters,docs:{...(it=A.parameters)==null?void 0:it.docs,source:{originalSource:`{
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
}`,...(rt=(nt=A.parameters)==null?void 0:nt.docs)==null?void 0:rt.source}}};var st,lt,dt;M.parameters={...M.parameters,docs:{...(st=M.parameters)==null?void 0:st.docs,source:{originalSource:`{
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
}`,...(dt=(lt=M.parameters)==null?void 0:lt.docs)==null?void 0:dt.source}}};var ut,ct,gt;V.parameters={...V.parameters,docs:{...(ut=V.parameters)==null?void 0:ut.docs,source:{originalSource:`{
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
}`,...(gt=(ct=V.parameters)==null?void 0:ct.docs)==null?void 0:gt.source}}};const Ao=["WithFullLayout","WithHeader","WithCloseButton","WithFooter","WithSideContent","WithUnderlay","WithLongText","WithCustomElementForClose","WithAnnouncedDescription","WithCustomElementAnnouncements","WithFocusableContent","WithNoPadding","WithTightPadding","WithCompactPadding","WithComfortablePadding","WithSpaciousPadding","TopAligned","MobileView","ControlledComponent","WithFlyoutAndTooltip"];export{M as ControlledComponent,A as MobileView,P as TopAligned,N as WithAnnouncedDescription,b as WithCloseButton,E as WithComfortablePadding,H as WithCompactPadding,S as WithCustomElementAnnouncements,F as WithCustomElementForClose,V as WithFlyoutAndTooltip,O as WithFocusableContent,q as WithFooter,T as WithFullLayout,y as WithHeader,w as WithLongText,I as WithNoPadding,R as WithSideContent,W as WithSpaciousPadding,_ as WithTightPadding,B as WithUnderlay,Ao as __namedExportsOrder,Po as default};
