import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as d}from"./index-BwDkhjyp.js";import{B as l}from"./Button-B0cJfyV2.js";import{F as Tt}from"./Flex-DCHQJD5L.js";import{F as p}from"./Flyout-ClTXCq_Z.js";import{T as ee}from"./TextInput-DKLtDtKS.js";import{T as x}from"./Tooltip-DbEjBRDc.js";import{e as Vt}from"./fondue-icons331-DLB-AwW3.js";import{c as j}from"./index-DOnKqARA.js";import{u as oe,P as T,S as Lt}from"./index-BtCsUTRM.js";import{c as $t,a as Ut}from"./index-BSNoMcJN.js";import{u as te}from"./index-DduqEaLY.js";import{u as kt}from"./index-DGaPG0k3.js";import{D as Gt,P as Jt}from"./index-BwiyQMMR.js";import{R as zt,h as Kt,u as Yt,F as Zt,a as Qt,c as Xt}from"./usePreventDropdownOverflow-BpYnfuhc.js";import{P as ae}from"./index-C1SWbrhG.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-CZDH020m.js";import"./focusStyle-IgMhxCMT.js";import"./propsToCssVariables-BE5Q_-YS.js";import"./index--XW6E94q.js";import"./index-CS4BWtGh.js";import"./index-BnOD_KYf.js";import"./index-kUwV4muI.js";var ie="Dialog",[Ct,Jo]=$t(ie),[eo,g]=Ct(ie),yt=t=>{const{__scopeDialog:a,children:i,open:r,defaultOpen:s,onOpenChange:n,modal:u=!0}=t,c=d.useRef(null),m=d.useRef(null),[h=!1,v]=kt({prop:r,defaultProp:s,onChange:n});return e.jsx(eo,{scope:a,triggerRef:c,contentRef:m,contentId:te(),titleId:te(),descriptionId:te(),open:h,onOpenChange:v,onOpenToggle:d.useCallback(()=>v(Mt=>!Mt),[v]),modal:u,children:i})};yt.displayName=ie;var bt="DialogTrigger",Bt=d.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,s=g(bt,i),n=oe(a,s.triggerRef);return e.jsx(T.button,{type:"button","aria-haspopup":"dialog","aria-expanded":s.open,"aria-controls":s.contentId,"data-state":se(s.open),...r,ref:n,onClick:j(t.onClick,s.onOpenToggle)})});Bt.displayName=bt;var re="DialogPortal",[to,qt]=Ct(re,{forceMount:void 0}),Rt=t=>{const{__scopeDialog:a,forceMount:i,children:r,container:s}=t,n=g(re,a);return e.jsx(to,{scope:a,forceMount:i,children:d.Children.map(r,u=>e.jsx(ae,{present:i||n.open,children:e.jsx(Jt,{asChild:!0,container:s,children:u})}))})};Rt.displayName=re;var U="DialogOverlay",wt=d.forwardRef((t,a)=>{const i=qt(U,t.__scopeDialog),{forceMount:r=i.forceMount,...s}=t,n=g(U,t.__scopeDialog);return n.modal?e.jsx(ae,{present:r||n.open,children:e.jsx(oo,{...s,ref:a})}):null});wt.displayName=U;var oo=d.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,s=g(U,i);return e.jsx(zt,{as:Lt,allowPinchZoom:!0,shards:[s.contentRef],children:e.jsx(T.div,{"data-state":se(s.open),...r,ref:a,style:{pointerEvents:"auto",...r.style}})})}),f="DialogContent",Ft=d.forwardRef((t,a)=>{const i=qt(f,t.__scopeDialog),{forceMount:r=i.forceMount,...s}=t,n=g(f,t.__scopeDialog);return e.jsx(ae,{present:r||n.open,children:n.modal?e.jsx(ao,{...s,ref:a}):e.jsx(io,{...s,ref:a})})});Ft.displayName=f;var ao=d.forwardRef((t,a)=>{const i=g(f,t.__scopeDialog),r=d.useRef(null),s=oe(a,i.contentRef,r);return d.useEffect(()=>{const n=r.current;if(n)return Kt(n)},[]),e.jsx(Nt,{...t,ref:s,trapFocus:i.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:j(t.onCloseAutoFocus,n=>{var u;n.preventDefault(),(u=i.triggerRef.current)==null||u.focus()}),onPointerDownOutside:j(t.onPointerDownOutside,n=>{const u=n.detail.originalEvent,c=u.button===0&&u.ctrlKey===!0;(u.button===2||c)&&n.preventDefault()}),onFocusOutside:j(t.onFocusOutside,n=>n.preventDefault())})}),io=d.forwardRef((t,a)=>{const i=g(f,t.__scopeDialog),r=d.useRef(!1),s=d.useRef(!1);return e.jsx(Nt,{...t,ref:a,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:n=>{var u,c;(u=t.onCloseAutoFocus)==null||u.call(t,n),n.defaultPrevented||(r.current||(c=i.triggerRef.current)==null||c.focus(),n.preventDefault()),r.current=!1,s.current=!1},onInteractOutside:n=>{var m,h;(m=t.onInteractOutside)==null||m.call(t,n),n.defaultPrevented||(r.current=!0,n.detail.originalEvent.type==="pointerdown"&&(s.current=!0));const u=n.target;((h=i.triggerRef.current)==null?void 0:h.contains(u))&&n.preventDefault(),n.detail.originalEvent.type==="focusin"&&s.current&&n.preventDefault()}})}),Nt=d.forwardRef((t,a)=>{const{__scopeDialog:i,trapFocus:r,onOpenAutoFocus:s,onCloseAutoFocus:n,...u}=t,c=g(f,i),m=d.useRef(null),h=oe(a,m);return Yt(),e.jsxs(e.Fragment,{children:[e.jsx(Zt,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:s,onUnmountAutoFocus:n,children:e.jsx(Gt,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":se(c.open),...u,ref:h,onDismiss:()=>c.onOpenChange(!1)})}),e.jsxs(e.Fragment,{children:[e.jsx(ro,{titleId:c.titleId}),e.jsx(so,{contentRef:m,descriptionId:c.descriptionId})]})]})}),ne="DialogTitle",St=d.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,s=g(ne,i);return e.jsx(T.h2,{id:s.titleId,...r,ref:a})});St.displayName=ne;var Ot="DialogDescription",It=d.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,s=g(Ot,i);return e.jsx(T.p,{id:s.descriptionId,...r,ref:a})});It.displayName=Ot;var Ht="DialogClose",_t=d.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,s=g(Ht,i);return e.jsx(T.button,{type:"button",...r,ref:a,onClick:j(t.onClick,()=>s.onOpenChange(!1))})});_t.displayName=Ht;function se(t){return t?"open":"closed"}var Et="DialogTitleWarning",[zo,Wt]=Ut(Et,{contentName:f,titleName:ne,docsSlug:"dialog"}),ro=({titleId:t})=>{const a=Wt(Et),i=`\`${a.contentName}\` requires a \`${a.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${a.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${a.docsSlug}`;return d.useEffect(()=>{t&&(document.getElementById(t)||console.error(i))},[i,t]),null},no="DialogDescriptionWarning",so=({contentRef:t,descriptionId:a})=>{const r=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Wt(no).contentName}}.`;return d.useEffect(()=>{var n;const s=(n=t.current)==null?void 0:n.getAttribute("aria-describedby");a&&s&&(document.getElementById(a)||console.warn(r))},[r,t,a]),null},lo=yt,uo=Bt,co=Rt,go=wt,mo=Ft,po=St,ho=It,Pt=_t;const fo="_content_1dnjb_6",Do="_header_1dnjb_50",xo="_footer_1dnjb_51",vo="_body_1dnjb_52",jo="_underlay_1dnjb_77",To="_sideContent_1dnjb_90",D={content:fo,header:Do,footer:xo,body:vo,underlay:jo,sideContent:To},At=d.createContext({isModal:!1}),k=({children:t,...a})=>e.jsx(At.Provider,{value:{isModal:a.modal??!1},children:e.jsx(lo,{...a,children:t})});k.displayName="Dialog.Root";const G=({asChild:t=!0,children:a,"data-test-id":i="fondue-dialog-trigger"},r)=>e.jsx(uo,{onMouseDown:Qt,"data-auto-focus-visible":"true","data-auto-focus-trigger":!0,"data-test-id":i,asChild:t,ref:r,children:a});G.displayName="Dialog.Trigger";const Co=({children:t,showUnderlay:a})=>{const{isModal:i}=d.useContext(At);return i?e.jsx(go,{"data-visible":a,className:D.underlay,children:t}):e.jsx("div",{className:D.underlay,"data-visible":a,children:t})},J=({maxWidth:t="800px",minWidth:a="400px",minHeight:i="200px",padding:r="compact",verticalAlign:s="center","data-test-id":n="fondue-dialog-content",showUnderlay:u=!1,children:c,rounded:m=!0,...h},v)=>e.jsx(co,{children:e.jsx(Co,{showUnderlay:u,children:e.jsx(mo,{style:{"--dialog-max-width":t,"--dialog-min-width":a,"--dialog-min-height":i},ref:v,className:D.content,onFocus:Xt,"data-dialog-rounded":m,"data-dialog-spacing":r,"data-test-id":n,"data-dialog-vertical-align":s,...h,children:c})})});J.displayName="Dialog.Content";const z=({children:t,showBorder:a=!0,showCloseButton:i=!0,"data-test-id":r="fondue-dialog-header"},s)=>e.jsxs("div",{"data-test-id":r,ref:s,className:D.header,"data-show-border":a,"data-dialog-layout-component":!0,children:[e.jsx("div",{children:t}),i&&e.jsx(Pt,{role:"button","data-test-id":`${r}-close`,className:"tw-cursor-pointer",children:e.jsx(Vt,{size:20})})]});z.displayName="Dialog.Header";const le=({showBorder:t=!0,children:a,"data-test-id":i="fondue-dialog-footer"},r)=>e.jsx("div",{"data-test-id":i,ref:r,className:D.footer,"data-show-border":t,"data-dialog-layout-component":!0,children:a});le.displayName="Dialog.Footer";const K=({children:t,"data-test-id":a="fondue-dialog-body"},i)=>e.jsx("div",{"data-test-id":a,ref:i,className:D.body,"data-dialog-layout-component":!0,children:t});K.displayName="Dialog.Body";const Y=({children:t,"data-test-id":a="fondue-dialog-side-content"},i)=>e.jsx("div",{"data-test-id":a,ref:i,className:D.sideContent,"data-dialog-layout-component":!0,children:t});Y.displayName="Dialog.SideContent";const Z=({children:t})=>e.jsx(Pt,{asChild:!0,children:t});Z.displayName="Dialog.Close";const Q=({children:t,asChild:a})=>e.jsx(po,{asChild:a,children:t});Q.displayName="Dialog.Title";const X=({children:t,asChild:a})=>e.jsx(ho,{asChild:a,children:t});X.displayName="Dialog.Description";const o={Root:k,Title:Q,Description:X,Close:Z,Trigger:d.forwardRef(G),Content:d.forwardRef(J),Header:d.forwardRef(z),Footer:d.forwardRef(le),Body:d.forwardRef(K),SideContent:d.forwardRef(Y)};k.__docgenInfo={description:"",methods:[],displayName:"Dialog.Root",props:{modal:{required:!1,tsType:{name:"boolean"},description:`Disable interaction with the rest of the page
@default false`},open:{required:!1,tsType:{name:"boolean"},description:"The controlled `open` state of the dialog\n@default false"},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Event handler called when the `open` state changes"},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};G.__docgenInfo={description:"",methods:[],displayName:"Dialog.Trigger",props:{asChild:{required:!1,tsType:{name:"boolean"},description:`Change the default rendered element for the one passed as a child, merging their props and behavior.
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-trigger'",computed:!1}}}};J.__docgenInfo={description:"",methods:[],displayName:"Dialog.Content",props:{rounded:{required:!1,tsType:{name:"boolean"},description:`Add rounded corners to the dialog
@default true`,defaultValue:{value:"true",computed:!1}},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'tight' | 'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'tight'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:`Define the padding of the dialog
@default "compact"`,defaultValue:{value:"'compact'",computed:!1}},verticalAlign:{required:!1,tsType:{name:"union",raw:"'top' | 'center'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'center'"}]},description:`The vertical alignment of the divider
@default "center"`,defaultValue:{value:"'center'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:`Define a maximum width for the dialog
@default "800px"`,defaultValue:{value:"'800px'",computed:!1}},minWidth:{required:!1,tsType:{name:"string"},description:`Define a minimum width for the dialog
@default "400px"`,defaultValue:{value:"'400px'",computed:!1}},minHeight:{required:!1,tsType:{name:"string"},description:`Define a minimum height for the dialog
@default "200px"`,defaultValue:{value:"'200px'",computed:!1}},showUnderlay:{required:!1,tsType:{name:"boolean"},description:`Show a dark underlay behind the dialog
@default false`,defaultValue:{value:"false",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-content'",computed:!1}}}};z.__docgenInfo={description:"",methods:[],displayName:"Dialog.Header",props:{showBorder:{required:!1,tsType:{name:"boolean"},description:`Show a border at the bottom of the header
@default true`,defaultValue:{value:"true",computed:!1}},showCloseButton:{required:!1,tsType:{name:"boolean"},description:`Show a close button in the header
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-header'",computed:!1}}}};le.__docgenInfo={description:"",methods:[],displayName:"Dialog.Footer",props:{showBorder:{required:!1,tsType:{name:"boolean"},description:`Show a border at the top of the footer
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-footer'",computed:!1}}}};K.__docgenInfo={description:"",methods:[],displayName:"Dialog.Body",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-body'",computed:!1}}}};Y.__docgenInfo={description:"",methods:[],displayName:"Dialog.SideContent",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-side-content'",computed:!1}}}};Z.__docgenInfo={description:"",methods:[],displayName:"Dialog.Close",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""}}};Q.__docgenInfo={description:"",methods:[],displayName:"Dialog.Title",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};X.__docgenInfo={description:"",methods:[],displayName:"Dialog.Description",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};const Ko={component:J,subcomponents:{"Dialog.Root":k,"Dialog.Trigger":G,"Dialog.SideContent":Y,"Dialog.Header":z,"Dialog.Body":K,"Dialog.Title":Q,"Dialog.Description":X,"Dialog.Close":Z},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-w-full"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},C={args:{children:"I am a dialog content"}},y={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},b={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{showCloseButton:!0,children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},B={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},q={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Body,{...t})]})]})},R={args:{children:"I am a dialog content",showUnderlay:!0},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},w={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},F={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(o.Close,{children:e.jsx(l,{emphasis:"default",children:"Cancel"})}),e.jsx(l,{children:"Submit"})]})]})]})},N={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Dialog Header"})}),e.jsx(o.Body,{children:e.jsx(o.Description,{children:t.children})}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},S={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(o.Body,{children:e.jsx(o.Description,{asChild:!0,children:e.jsx("p",{children:t.children})})}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},O={args:{children:"Hello World"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open flyout"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:"Header"}),e.jsxs(o.Body,{...t,children:[e.jsx(ee,{}),e.jsx(ee,{}),e.jsx(ee,{})]})]})]})},I={args:{padding:"none"}},H={args:{padding:"tight"}},_={args:{padding:"compact"}},E={args:{padding:"comfortable"}},W={args:{padding:"spacious"}},P={args:{verticalAlign:"top"}},A={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"}}},defaultViewport:"mobile"}},args:{children:"Hello World"}},M={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{showBorder:!1,children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{showBorder:!1,children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},V={args:{children:"I am a dialog content"},render:t=>{const[a,i]=d.useState(!1);return e.jsxs(o.Root,{open:a,onOpenChange:r=>{i(r)},children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})}},L={render:t=>{const a=d.forwardRef(({text:i,tooltipText:r},s)=>e.jsxs(x.Root,{children:[e.jsx(x.Trigger,{children:e.jsx("div",{children:e.jsx(p.Trigger,{children:e.jsx(l,{ref:s,children:i})})})}),e.jsx(x.Content,{side:"left",children:r})]}));return a.displayName="ButtonWithTooltip",e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,showUnderlay:!0,children:[e.jsx(o.Body,{children:e.jsxs(Tt,{direction:"column",gap:"8px",align:"flex-start",children:[e.jsxs(p.Root,{children:[e.jsx(p.Trigger,{children:e.jsx(l,{children:"Open flyout"})}),e.jsxs(p.Content,{children:[e.jsx(p.Header,{children:"Header"}),e.jsx(p.Body,{children:"I am a flyout"})]})]}),e.jsxs(x.Root,{children:[e.jsx(x.Trigger,{children:e.jsx(l,{children:"I am a tooltip, hover me"})}),e.jsx(x.Content,{side:"left",children:"Tooltip content"})]}),e.jsxs(p.Root,{children:[e.jsx(a,{text:"Open flyout (and I am a tooltip too)",tooltipText:"Tooltip text"}),e.jsxs(p.Content,{children:[e.jsx(p.Header,{children:"Header"}),e.jsx(p.Body,{children:"I am a flyout"})]})]})]})}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})}},$={render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{children:[e.jsx(o.Header,{children:e.jsxs(Tt,{justify:"space-between",align:"center",width:"100%",pr:"1rem",children:[e.jsx(o.Title,{children:"Header"}),e.jsx(l,{emphasis:"default",onPress:()=>{alert("Button in the header clicked")},children:"Button in the header"})]})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})};var de,ue,ce;C.parameters={...C.parameters,docs:{...(de=C.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  }
}`,...(ce=(ue=C.parameters)==null?void 0:ue.docs)==null?void 0:ce.source}}};var ge,me,pe;y.parameters={...y.parameters,docs:{...(ge=y.parameters)==null?void 0:ge.docs,source:{originalSource:`{
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
}`,...(pe=(me=y.parameters)==null?void 0:me.docs)==null?void 0:pe.source}}};var he,fe,De;b.parameters={...b.parameters,docs:{...(he=b.parameters)==null?void 0:he.docs,source:{originalSource:`{
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
}`,...(De=(fe=b.parameters)==null?void 0:fe.docs)==null?void 0:De.source}}};var xe,ve,je;B.parameters={...B.parameters,docs:{...(xe=B.parameters)==null?void 0:xe.docs,source:{originalSource:`{
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
}`,...(je=(ve=B.parameters)==null?void 0:ve.docs)==null?void 0:je.source}}};var Te,Ce,ye;q.parameters={...q.parameters,docs:{...(Te=q.parameters)==null?void 0:Te.docs,source:{originalSource:`{
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
}`,...(ye=(Ce=q.parameters)==null?void 0:Ce.docs)==null?void 0:ye.source}}};var be,Be,qe;R.parameters={...R.parameters,docs:{...(be=R.parameters)==null?void 0:be.docs,source:{originalSource:`{
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
}`,...(qe=(Be=R.parameters)==null?void 0:Be.docs)==null?void 0:qe.source}}};var Re,we,Fe;w.parameters={...w.parameters,docs:{...(Re=w.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(Fe=(we=w.parameters)==null?void 0:we.docs)==null?void 0:Fe.source}}};var Ne,Se,Oe;F.parameters={...F.parameters,docs:{...(Ne=F.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
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
}`,...(Oe=(Se=F.parameters)==null?void 0:Se.docs)==null?void 0:Oe.source}}};var Ie,He,_e;N.parameters={...N.parameters,docs:{...(Ie=N.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
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
}`,...(_e=(He=N.parameters)==null?void 0:He.docs)==null?void 0:_e.source}}};var Ee,We,Pe;S.parameters={...S.parameters,docs:{...(Ee=S.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
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
}`,...(Pe=(We=S.parameters)==null?void 0:We.docs)==null?void 0:Pe.source}}};var Ae,Me,Ve;O.parameters={...O.parameters,docs:{...(Ae=O.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
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
}`,...(Ve=(Me=O.parameters)==null?void 0:Me.docs)==null?void 0:Ve.source}}};var Le,$e,Ue;I.parameters={...I.parameters,docs:{...(Le=I.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  args: {
    padding: 'none'
  }
}`,...(Ue=($e=I.parameters)==null?void 0:$e.docs)==null?void 0:Ue.source}}};var ke,Ge,Je;H.parameters={...H.parameters,docs:{...(ke=H.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  args: {
    padding: 'tight'
  }
}`,...(Je=(Ge=H.parameters)==null?void 0:Ge.docs)==null?void 0:Je.source}}};var ze,Ke,Ye;_.parameters={..._.parameters,docs:{...(ze=_.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  args: {
    padding: 'compact'
  }
}`,...(Ye=(Ke=_.parameters)==null?void 0:Ke.docs)==null?void 0:Ye.source}}};var Ze,Qe,Xe;E.parameters={...E.parameters,docs:{...(Ze=E.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
  args: {
    padding: 'comfortable'
  }
}`,...(Xe=(Qe=E.parameters)==null?void 0:Qe.docs)==null?void 0:Xe.source}}};var et,tt,ot;W.parameters={...W.parameters,docs:{...(et=W.parameters)==null?void 0:et.docs,source:{originalSource:`{
  args: {
    padding: 'spacious'
  }
}`,...(ot=(tt=W.parameters)==null?void 0:tt.docs)==null?void 0:ot.source}}};var at,it,rt;P.parameters={...P.parameters,docs:{...(at=P.parameters)==null?void 0:at.docs,source:{originalSource:`{
  args: {
    verticalAlign: 'top'
  }
}`,...(rt=(it=P.parameters)==null?void 0:it.docs)==null?void 0:rt.source}}};var nt,st,lt;A.parameters={...A.parameters,docs:{...(nt=A.parameters)==null?void 0:nt.docs,source:{originalSource:`{
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
}`,...(lt=(st=A.parameters)==null?void 0:st.docs)==null?void 0:lt.source}}};var dt,ut,ct;M.parameters={...M.parameters,docs:{...(dt=M.parameters)==null?void 0:dt.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: args => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header showBorder={false}>
                        <Dialog.Title>Header</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body {...args} />
                    <Dialog.Footer showBorder={false}>
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(ct=(ut=M.parameters)==null?void 0:ut.docs)==null?void 0:ct.source}}};var gt,mt,pt;V.parameters={...V.parameters,docs:{...(gt=V.parameters)==null?void 0:gt.docs,source:{originalSource:`{
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
}`,...(pt=(mt=V.parameters)==null?void 0:mt.docs)==null?void 0:pt.source}}};var ht,ft,Dt;L.parameters={...L.parameters,docs:{...(ht=L.parameters)==null?void 0:ht.docs,source:{originalSource:`{
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
}`,...(Dt=(ft=L.parameters)==null?void 0:ft.docs)==null?void 0:Dt.source}}};var xt,vt,jt;$.parameters={...$.parameters,docs:{...(xt=$.parameters)==null?void 0:xt.docs,source:{originalSource:`{
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
}`,...(jt=(vt=$.parameters)==null?void 0:vt.docs)==null?void 0:jt.source}}};const Yo=["WithFullLayout","WithHeader","WithCloseButton","WithFooter","WithSideContent","WithUnderlay","WithLongText","WithCustomElementForClose","WithAnnouncedDescription","WithCustomElementAnnouncements","WithFocusableContent","WithNoPadding","WithTightPadding","WithCompactPadding","WithComfortablePadding","WithSpaciousPadding","TopAligned","MobileView","WithoutBorders","ControlledComponent","WithFlyoutAndTooltip","WithButtonInTheHeader"];export{V as ControlledComponent,A as MobileView,P as TopAligned,N as WithAnnouncedDescription,$ as WithButtonInTheHeader,b as WithCloseButton,E as WithComfortablePadding,_ as WithCompactPadding,S as WithCustomElementAnnouncements,F as WithCustomElementForClose,L as WithFlyoutAndTooltip,O as WithFocusableContent,B as WithFooter,C as WithFullLayout,y as WithHeader,w as WithLongText,I as WithNoPadding,q as WithSideContent,W as WithSpaciousPadding,H as WithTightPadding,R as WithUnderlay,M as WithoutBorders,Yo as __namedExportsOrder,Ko as default};
