import{j as e}from"./jsx-runtime-BvI67ttx.js";import{r as d}from"./index-BEEaWAwe.js";import{B as i}from"./Button-BQLfsgmA.js";import{F as j}from"./Flex-Ci-9K4oj.js";import{F as m}from"./Flyout-DrUCGStj.js";import{T as oe}from"./TextInput-CjNhCwEN.js";import{T as h}from"./Tooltip-YpI-iIaM.js";import{e as Ut}from"./fondue-icons348-B-f5GiGz.js";import{c as v}from"./index-0ATwCc6h.js";import{u as ie,P as C,S as Gt}from"./index-MJItr2zu.js";import{c as Jt,a as zt}from"./index-C-sPhGY9.js";import{u as ae}from"./index-CiGoKWYq.js";import{u as Kt}from"./index-COt05XGC.js";import{D as Yt,P as Zt}from"./index-k5I1OPLU.js";import{R as Qt,h as Xt,u as eo,F as to}from"./Combination-BW6ghCKU.js";import{P as re}from"./index-Dmgi06lZ.js";import{a as oo,b as ao}from"./domUtilities-DGDVwu3_.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-B-n3-6Ow.js";import"./focusStyle-IgMhxCMT.js";import"./propsToCssVariables-DVyyXmoh.js";import"./index-Ce4nYEhZ.js";import"./index-CJX6plO5.js";import"./index-inNNsB9i.js";import"./index-C0eIB1ad.js";var ne="Dialog",[Rt,Qo]=Jt(ne),[io,g]=Rt(ne),wt=o=>{const{__scopeDialog:a,children:r,open:n,defaultOpen:s,onOpenChange:l,modal:u=!0}=o,c=d.useRef(null),p=d.useRef(null),[f=!1,T]=Kt({prop:n,defaultProp:s,onChange:l});return e.jsx(io,{scope:a,triggerRef:c,contentRef:p,contentId:ae(),titleId:ae(),descriptionId:ae(),open:f,onOpenChange:T,onOpenToggle:d.useCallback(()=>T($t=>!$t),[T]),modal:u,children:r})};wt.displayName=ne;var qt="DialogTrigger",Ft=d.forwardRef((o,a)=>{const{__scopeDialog:r,...n}=o,s=g(qt,r),l=ie(a,s.triggerRef);return e.jsx(C.button,{type:"button","aria-haspopup":"dialog","aria-expanded":s.open,"aria-controls":s.contentId,"data-state":de(s.open),...n,ref:l,onClick:v(o.onClick,s.onOpenToggle)})});Ft.displayName=qt;var se="DialogPortal",[ro,Ht]=Rt(se,{forceMount:void 0}),St=o=>{const{__scopeDialog:a,forceMount:r,children:n,container:s}=o,l=g(se,a);return e.jsx(ro,{scope:a,forceMount:r,children:d.Children.map(n,u=>e.jsx(re,{present:r||l.open,children:e.jsx(Zt,{asChild:!0,container:s,children:u})}))})};St.displayName=se;var G="DialogOverlay",Nt=d.forwardRef((o,a)=>{const r=Ht(G,o.__scopeDialog),{forceMount:n=r.forceMount,...s}=o,l=g(G,o.__scopeDialog);return l.modal?e.jsx(re,{present:n||l.open,children:e.jsx(no,{...s,ref:a})}):null});Nt.displayName=G;var no=d.forwardRef((o,a)=>{const{__scopeDialog:r,...n}=o,s=g(G,r);return e.jsx(Qt,{as:Gt,allowPinchZoom:!0,shards:[s.contentRef],children:e.jsx(C.div,{"data-state":de(s.open),...n,ref:a,style:{pointerEvents:"auto",...n.style}})})}),D="DialogContent",Ot=d.forwardRef((o,a)=>{const r=Ht(D,o.__scopeDialog),{forceMount:n=r.forceMount,...s}=o,l=g(D,o.__scopeDialog);return e.jsx(re,{present:n||l.open,children:l.modal?e.jsx(so,{...s,ref:a}):e.jsx(lo,{...s,ref:a})})});Ot.displayName=D;var so=d.forwardRef((o,a)=>{const r=g(D,o.__scopeDialog),n=d.useRef(null),s=ie(a,r.contentRef,n);return d.useEffect(()=>{const l=n.current;if(l)return Xt(l)},[]),e.jsx(It,{...o,ref:s,trapFocus:r.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:v(o.onCloseAutoFocus,l=>{var u;l.preventDefault(),(u=r.triggerRef.current)==null||u.focus()}),onPointerDownOutside:v(o.onPointerDownOutside,l=>{const u=l.detail.originalEvent,c=u.button===0&&u.ctrlKey===!0;(u.button===2||c)&&l.preventDefault()}),onFocusOutside:v(o.onFocusOutside,l=>l.preventDefault())})}),lo=d.forwardRef((o,a)=>{const r=g(D,o.__scopeDialog),n=d.useRef(!1),s=d.useRef(!1);return e.jsx(It,{...o,ref:a,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:l=>{var u,c;(u=o.onCloseAutoFocus)==null||u.call(o,l),l.defaultPrevented||(n.current||(c=r.triggerRef.current)==null||c.focus(),l.preventDefault()),n.current=!1,s.current=!1},onInteractOutside:l=>{var p,f;(p=o.onInteractOutside)==null||p.call(o,l),l.defaultPrevented||(n.current=!0,l.detail.originalEvent.type==="pointerdown"&&(s.current=!0));const u=l.target;((f=r.triggerRef.current)==null?void 0:f.contains(u))&&l.preventDefault(),l.detail.originalEvent.type==="focusin"&&s.current&&l.preventDefault()}})}),It=d.forwardRef((o,a)=>{const{__scopeDialog:r,trapFocus:n,onOpenAutoFocus:s,onCloseAutoFocus:l,...u}=o,c=g(D,r),p=d.useRef(null),f=ie(a,p);return eo(),e.jsxs(e.Fragment,{children:[e.jsx(to,{asChild:!0,loop:!0,trapped:n,onMountAutoFocus:s,onUnmountAutoFocus:l,children:e.jsx(Yt,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":de(c.open),...u,ref:f,onDismiss:()=>c.onOpenChange(!1)})}),e.jsxs(e.Fragment,{children:[e.jsx(uo,{titleId:c.titleId}),e.jsx(go,{contentRef:p,descriptionId:c.descriptionId})]})]})}),le="DialogTitle",_t=d.forwardRef((o,a)=>{const{__scopeDialog:r,...n}=o,s=g(le,r);return e.jsx(C.h2,{id:s.titleId,...n,ref:a})});_t.displayName=le;var Pt="DialogDescription",Et=d.forwardRef((o,a)=>{const{__scopeDialog:r,...n}=o,s=g(Pt,r);return e.jsx(C.p,{id:s.descriptionId,...n,ref:a})});Et.displayName=Pt;var Wt="DialogClose",At=d.forwardRef((o,a)=>{const{__scopeDialog:r,...n}=o,s=g(Wt,r);return e.jsx(C.button,{type:"button",...n,ref:a,onClick:v(o.onClick,()=>s.onOpenChange(!1))})});At.displayName=Wt;function de(o){return o?"open":"closed"}var Mt="DialogTitleWarning",[Xo,Vt]=zt(Mt,{contentName:D,titleName:le,docsSlug:"dialog"}),uo=({titleId:o})=>{const a=Vt(Mt),r=`\`${a.contentName}\` requires a \`${a.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${a.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${a.docsSlug}`;return d.useEffect(()=>{o&&(document.getElementById(o)||console.error(r))},[r,o]),null},co="DialogDescriptionWarning",go=({contentRef:o,descriptionId:a})=>{const n=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Vt(co).contentName}}.`;return d.useEffect(()=>{var l;const s=(l=o.current)==null?void 0:l.getAttribute("aria-describedby");a&&s&&(document.getElementById(a)||console.warn(n))},[n,o,a]),null},po=wt,mo=Ft,ho=St,fo=Nt,Do=Ot,xo=_t,jo=Et,kt=At;const To="_content_lmry4_6",vo="_header_lmry4_50",Co="_footer_lmry4_51",yo="_body_lmry4_52",Bo="_underlay_lmry4_176",bo="_sideContent_lmry4_189",x={content:To,header:vo,footer:Co,body:yo,underlay:Bo,sideContent:bo},Lt=d.createContext({isModal:!1}),J=({children:o,...a})=>e.jsx(Lt.Provider,{value:{isModal:a.modal??!1},children:e.jsx(po,{...a,children:o})});J.displayName="Dialog.Root";const z=({asChild:o=!0,children:a,"data-test-id":r="fondue-dialog-trigger",...n},s)=>e.jsx(mo,{onMouseDown:oo,"data-auto-focus-visible":"true","data-auto-focus-trigger":!0,"data-test-id":r,asChild:o,ref:s,...n,children:a});z.displayName="Dialog.Trigger";const Ro=({children:o,showUnderlay:a})=>{const{isModal:r}=d.useContext(Lt);return r?e.jsx(fo,{"data-visible":a,className:x.underlay,children:o}):e.jsx("div",{className:x.underlay,"data-visible":a,children:o})},K=({maxWidth:o="800px",minWidth:a="400px",minHeight:r="200px",padding:n="compact",verticalAlign:s="center","data-test-id":l="fondue-dialog-content",showUnderlay:u=!1,rounded:c=!0,children:p,...f},T)=>e.jsx(ho,{children:e.jsx(Ro,{showUnderlay:u,children:e.jsx(Do,{style:{"--dialog-max-width":o,"--dialog-min-width":a,"--dialog-min-height":r},ref:T,className:x.content,onFocus:ao,"data-dialog-padding":n,"data-dialog-rounded":c,"data-test-id":l,"data-dialog-vertical-align":s,...f,children:p})})});K.displayName="Dialog.Content";const Y=({padding:o,showBorder:a=!0,showCloseButton:r=!0,children:n,"data-test-id":s="fondue-dialog-header"},l)=>e.jsxs("div",{"data-test-id":s,ref:l,className:x.header,"data-dialog-header-padding":o,"data-show-border":a,"data-dialog-layout-component":!0,children:[e.jsx("div",{children:n}),r&&e.jsx(kt,{role:"button","data-test-id":`${s}-close`,className:"tw-cursor-pointer",children:e.jsx(Ut,{size:20})})]});Y.displayName="Dialog.Header";const ue=({padding:o,showBorder:a=!0,children:r,"data-test-id":n="fondue-dialog-footer"},s)=>e.jsx("div",{"data-test-id":n,ref:s,className:x.footer,"data-dialog-footer-padding":o,"data-show-border":a,"data-dialog-layout-component":!0,children:r});ue.displayName="Dialog.Footer";const Z=({padding:o,children:a,"data-test-id":r="fondue-dialog-body"},n)=>e.jsx("div",{"data-test-id":r,ref:n,className:x.body,"data-dialog-body-padding":o,"data-dialog-layout-component":!0,children:a});Z.displayName="Dialog.Body";const Q=({children:o,"data-test-id":a="fondue-dialog-side-content"},r)=>e.jsx("div",{"data-test-id":a,ref:r,className:x.sideContent,"data-dialog-layout-component":!0,children:o});Q.displayName="Dialog.SideContent";const X=({children:o})=>e.jsx(kt,{asChild:!0,children:o});X.displayName="Dialog.Close";const ee=({children:o,asChild:a})=>e.jsx(xo,{asChild:a,children:o});ee.displayName="Dialog.Title";const te=({children:o,asChild:a})=>e.jsx(jo,{asChild:a,children:o});te.displayName="Dialog.Description";const t={Root:J,Title:ee,Description:te,Close:X,Trigger:d.forwardRef(z),Content:d.forwardRef(K),Header:d.forwardRef(Y),Footer:d.forwardRef(ue),Body:d.forwardRef(Z),SideContent:d.forwardRef(Q)};J.__docgenInfo={description:"",methods:[],displayName:"Dialog.Root",props:{modal:{required:!1,tsType:{name:"boolean"},description:`Disable interaction with the rest of the page
@default false`},open:{required:!1,tsType:{name:"boolean"},description:"The controlled `open` state of the dialog\n@default false"},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Event handler called when the `open` state changes"},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};z.__docgenInfo={description:"",methods:[],displayName:"Dialog.Trigger",props:{asChild:{required:!1,tsType:{name:"boolean"},description:`Change the default rendered element for the one passed as a child, merging their props and behavior.
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-trigger'",computed:!1}}}};K.__docgenInfo={description:"",methods:[],displayName:"Dialog.Content",props:{rounded:{required:!1,tsType:{name:"boolean"},description:`Add rounded corners to the dialog
@default true`,defaultValue:{value:"true",computed:!1}},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'tight' | 'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'tight'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:`Define the padding of the dialog
@default "compact"`,defaultValue:{value:"'compact'",computed:!1}},verticalAlign:{required:!1,tsType:{name:"union",raw:"'top' | 'center'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'center'"}]},description:`The vertical alignment of the divider
@default "center"`,defaultValue:{value:"'center'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:`Define a maximum width for the dialog
@default "800px"`,defaultValue:{value:"'800px'",computed:!1}},minWidth:{required:!1,tsType:{name:"string"},description:`Define a minimum width for the dialog
@default "400px"`,defaultValue:{value:"'400px'",computed:!1}},minHeight:{required:!1,tsType:{name:"string"},description:`Define a minimum height for the dialog
@default "200px"`,defaultValue:{value:"'200px'",computed:!1}},showUnderlay:{required:!1,tsType:{name:"boolean"},description:`Show a dark underlay behind the dialog
@default false`,defaultValue:{value:"false",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-content'",computed:!1}}}};Y.__docgenInfo={description:"",methods:[],displayName:"Dialog.Header",props:{padding:{required:!1,tsType:{name:"union",raw:"'none' | 'tight' | 'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'tight'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:"Define the padding for the dialog header"},showBorder:{required:!1,tsType:{name:"boolean"},description:`Show a border at the bottom of the header
@default true`,defaultValue:{value:"true",computed:!1}},showCloseButton:{required:!1,tsType:{name:"boolean"},description:`Show a close button in the header
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-header'",computed:!1}}}};ue.__docgenInfo={description:"",methods:[],displayName:"Dialog.Footer",props:{padding:{required:!1,tsType:{name:"union",raw:"'none' | 'tight' | 'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'tight'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:"Define the padding for the dialog footer"},showBorder:{required:!1,tsType:{name:"boolean"},description:`Show a border at the top of the footer
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-footer'",computed:!1}}}};Z.__docgenInfo={description:"",methods:[],displayName:"Dialog.Body",props:{padding:{required:!1,tsType:{name:"union",raw:"'none' | 'tight' | 'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'tight'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:"Define the padding for the dialog body"},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-body'",computed:!1}}}};Q.__docgenInfo={description:"",methods:[],displayName:"Dialog.SideContent",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-side-content'",computed:!1}}}};X.__docgenInfo={description:"",methods:[],displayName:"Dialog.Close",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""}}};ee.__docgenInfo={description:"",methods:[],displayName:"Dialog.Title",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};te.__docgenInfo={description:"",methods:[],displayName:"Dialog.Description",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};const ea={component:K,subcomponents:{"Dialog.Root":J,"Dialog.Trigger":z,"Dialog.SideContent":Q,"Dialog.Header":Y,"Dialog.Body":Z,"Dialog.Title":ee,"Dialog.Description":te,"Dialog.Close":X},tags:["autodocs"],parameters:{status:{type:"released"}},args:{},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-w-full"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...o}),e.jsxs(t.Footer,{children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},y={args:{children:"I am a dialog content"}},B={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...o})]})]})},b={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{showCloseButton:!0,children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...o})]})]})},R={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Body,{...o}),e.jsxs(t.Footer,{children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},w={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Body,{...o})]})]})},q={args:{children:"I am a dialog content",showUnderlay:!0},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...o})]})]})},F={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...o}),e.jsxs(t.Footer,{children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},H={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(t.Body,{...o}),e.jsxs(t.Footer,{children:[e.jsx(t.Close,{children:e.jsx(i,{emphasis:"default",children:"Cancel"})}),e.jsx(i,{children:"Submit"})]})]})]})},S={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Dialog Header"})}),e.jsx(t.Body,{children:e.jsx(t.Description,{children:o.children})}),e.jsxs(t.Footer,{children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},N={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(t.Body,{children:e.jsx(t.Description,{asChild:!0,children:e.jsx("p",{children:o.children})})}),e.jsxs(t.Footer,{children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},O={args:{children:"Hello World"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open flyout"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{children:"Header"}),e.jsxs(t.Body,{...o,children:[e.jsx(oe,{}),e.jsx(oe,{}),e.jsx(oe,{})]})]})]})},I={render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{padding:"none",children:e.jsxs(j,{justify:"space-between",align:"center",width:"100%",pr:"1rem",children:[e.jsx(t.Title,{children:"Header"}),e.jsx(i,{emphasis:"default",onPress:()=>{alert("Button in the header clicked")},children:"Button in the header"})]})}),e.jsx(t.Body,{padding:"none",children:"None"}),e.jsxs(t.Footer,{padding:"none",children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},_={render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{padding:"tight",children:e.jsxs(j,{justify:"space-between",align:"center",width:"100%",pr:"1rem",children:[e.jsx(t.Title,{children:"Header"}),e.jsx(i,{emphasis:"default",onPress:()=>{alert("Button in the header clicked")},children:"Button in the header"})]})}),e.jsx(t.Body,{padding:"tight",children:"Tight"}),e.jsxs(t.Footer,{padding:"tight",children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},P={render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{padding:"compact",children:e.jsxs(j,{justify:"space-between",align:"center",width:"100%",pr:"1rem",children:[e.jsx(t.Title,{children:"Header"}),e.jsx(i,{emphasis:"default",onPress:()=>{alert("Button in the header clicked")},children:"Button in the header"})]})}),e.jsx(t.Body,{padding:"compact",children:"Compact"}),e.jsxs(t.Footer,{padding:"compact",children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},E={render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{padding:"comfortable",children:e.jsxs(j,{justify:"space-between",align:"center",width:"100%",pr:"1rem",children:[e.jsx(t.Title,{children:"Header"}),e.jsx(i,{emphasis:"default",onPress:()=>{alert("Button in the header clicked")},children:"Button in the header"})]})}),e.jsx(t.Body,{padding:"comfortable",children:"Confortable"}),e.jsxs(t.Footer,{padding:"comfortable",children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},W={render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{padding:"spacious",children:e.jsxs(j,{justify:"space-between",align:"center",width:"100%",pr:"1rem",children:[e.jsx(t.Title,{children:"Header"}),e.jsx(i,{emphasis:"default",onPress:()=>{alert("Button in the header clicked")},children:"Button in the header"})]})}),e.jsx(t.Body,{padding:"spacious",children:"Spacious"}),e.jsxs(t.Footer,{padding:"spacious",children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},A={args:{verticalAlign:"top"}},M={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"}}},defaultViewport:"mobile"}},args:{children:"Hello World"}},V={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{showBorder:!1,children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...o}),e.jsxs(t.Footer,{showBorder:!1,children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},k={args:{children:"I am a dialog content"},render:o=>{const[a,r]=d.useState(!1);return e.jsxs(t.Root,{open:a,onOpenChange:n=>{r(n)},children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...o})]})]})}},L={render:o=>{const a=d.forwardRef(({text:r,tooltipText:n},s)=>e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx("div",{children:e.jsx(m.Trigger,{children:e.jsx(i,{ref:s,children:r})})})}),e.jsx(h.Content,{side:"left",children:n})]}));return a.displayName="ButtonWithTooltip",e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,showUnderlay:!0,children:[e.jsx(t.Body,{children:e.jsxs(j,{direction:"column",gap:"8px",align:"flex-start",children:[e.jsxs(m.Root,{children:[e.jsx(m.Trigger,{children:e.jsx(i,{children:"Open flyout"})}),e.jsxs(m.Content,{children:[e.jsx(m.Header,{children:"Header"}),e.jsx(m.Body,{children:"I am a flyout"})]})]}),e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx(i,{children:"I am a tooltip, hover me"})}),e.jsx(h.Content,{side:"left",children:"Tooltip content"})]}),e.jsxs(m.Root,{children:[e.jsx(a,{text:"Open flyout (and I am a tooltip too)",tooltipText:"Tooltip text"}),e.jsxs(m.Content,{children:[e.jsx(m.Header,{children:"Header"}),e.jsx(m.Body,{children:"I am a flyout"})]})]})]})}),e.jsxs(t.Footer,{children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})}},$={render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{children:[e.jsx(t.Header,{children:e.jsxs(j,{justify:"space-between",align:"center",width:"100%",pr:"1rem",children:[e.jsx(t.Title,{children:"Header"}),e.jsx(i,{emphasis:"default",onPress:()=>{alert("Button in the header clicked")},children:"Button in the header"})]})}),e.jsx(t.Body,{...o}),e.jsxs(t.Footer,{children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},U={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{asChild:!0,children:e.jsx(t.Trigger,{asChild:!0,children:e.jsx(i,{children:"Trigger"})})}),e.jsx(h.Content,{children:"Dropdown tooltip"})]}),e.jsx(t.Content,{children:e.jsx(t.Body,{...o})})]})};var ce,ge,pe;y.parameters={...y.parameters,docs:{...(ce=y.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  }
}`,...(pe=(ge=y.parameters)==null?void 0:ge.docs)==null?void 0:pe.source}}};var me,he,fe;B.parameters={...B.parameters,docs:{...(me=B.parameters)==null?void 0:me.docs,source:{originalSource:`{
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
}`,...(fe=(he=B.parameters)==null?void 0:he.docs)==null?void 0:fe.source}}};var De,xe,je;b.parameters={...b.parameters,docs:{...(De=b.parameters)==null?void 0:De.docs,source:{originalSource:`{
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
}`,...(je=(xe=b.parameters)==null?void 0:xe.docs)==null?void 0:je.source}}};var Te,ve,Ce;R.parameters={...R.parameters,docs:{...(Te=R.parameters)==null?void 0:Te.docs,source:{originalSource:`{
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
}`,...(Ce=(ve=R.parameters)==null?void 0:ve.docs)==null?void 0:Ce.source}}};var ye,Be,be;w.parameters={...w.parameters,docs:{...(ye=w.parameters)==null?void 0:ye.docs,source:{originalSource:`{
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
}`,...(be=(Be=w.parameters)==null?void 0:Be.docs)==null?void 0:be.source}}};var Re,we,qe;q.parameters={...q.parameters,docs:{...(Re=q.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(qe=(we=q.parameters)==null?void 0:we.docs)==null?void 0:qe.source}}};var Fe,He,Se;F.parameters={...F.parameters,docs:{...(Fe=F.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
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
}`,...(Se=(He=F.parameters)==null?void 0:He.docs)==null?void 0:Se.source}}};var Ne,Oe,Ie;H.parameters={...H.parameters,docs:{...(Ne=H.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
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
}`,...(Ie=(Oe=H.parameters)==null?void 0:Oe.docs)==null?void 0:Ie.source}}};var _e,Pe,Ee;S.parameters={...S.parameters,docs:{...(_e=S.parameters)==null?void 0:_e.docs,source:{originalSource:`{
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
}`,...(Ee=(Pe=S.parameters)==null?void 0:Pe.docs)==null?void 0:Ee.source}}};var We,Ae,Me;N.parameters={...N.parameters,docs:{...(We=N.parameters)==null?void 0:We.docs,source:{originalSource:`{
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
}`,...(Me=(Ae=N.parameters)==null?void 0:Ae.docs)==null?void 0:Me.source}}};var Ve,ke,Le;O.parameters={...O.parameters,docs:{...(Ve=O.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
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
}`,...(Le=(ke=O.parameters)==null?void 0:ke.docs)==null?void 0:Le.source}}};var $e,Ue,Ge;I.parameters={...I.parameters,docs:{...($e=I.parameters)==null?void 0:$e.docs,source:{originalSource:`{
  render: args => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header padding="none">
                        <Flex justify="space-between" align="center" width="100%" pr="1rem">
                            <Dialog.Title>Header</Dialog.Title>
                            <Button emphasis="default" onPress={() => {
              alert('Button in the header clicked');
            }}>
                                Button in the header
                            </Button>
                        </Flex>
                    </Dialog.Header>
                    <Dialog.Body padding="none">None</Dialog.Body>
                    <Dialog.Footer padding="none">
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(Ge=(Ue=I.parameters)==null?void 0:Ue.docs)==null?void 0:Ge.source}}};var Je,ze,Ke;_.parameters={..._.parameters,docs:{...(Je=_.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  render: args => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header padding="tight">
                        <Flex justify="space-between" align="center" width="100%" pr="1rem">
                            <Dialog.Title>Header</Dialog.Title>
                            <Button emphasis="default" onPress={() => {
              alert('Button in the header clicked');
            }}>
                                Button in the header
                            </Button>
                        </Flex>
                    </Dialog.Header>
                    <Dialog.Body padding="tight">Tight</Dialog.Body>
                    <Dialog.Footer padding="tight">
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(Ke=(ze=_.parameters)==null?void 0:ze.docs)==null?void 0:Ke.source}}};var Ye,Ze,Qe;P.parameters={...P.parameters,docs:{...(Ye=P.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
  render: args => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header padding="compact">
                        <Flex justify="space-between" align="center" width="100%" pr="1rem">
                            <Dialog.Title>Header</Dialog.Title>
                            <Button emphasis="default" onPress={() => {
              alert('Button in the header clicked');
            }}>
                                Button in the header
                            </Button>
                        </Flex>
                    </Dialog.Header>
                    <Dialog.Body padding="compact">Compact</Dialog.Body>
                    <Dialog.Footer padding="compact">
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(Qe=(Ze=P.parameters)==null?void 0:Ze.docs)==null?void 0:Qe.source}}};var Xe,et,tt;E.parameters={...E.parameters,docs:{...(Xe=E.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  render: args => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header padding="comfortable">
                        <Flex justify="space-between" align="center" width="100%" pr="1rem">
                            <Dialog.Title>Header</Dialog.Title>
                            <Button emphasis="default" onPress={() => {
              alert('Button in the header clicked');
            }}>
                                Button in the header
                            </Button>
                        </Flex>
                    </Dialog.Header>
                    <Dialog.Body padding="comfortable">Confortable</Dialog.Body>
                    <Dialog.Footer padding="comfortable">
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(tt=(et=E.parameters)==null?void 0:et.docs)==null?void 0:tt.source}}};var ot,at,it;W.parameters={...W.parameters,docs:{...(ot=W.parameters)==null?void 0:ot.docs,source:{originalSource:`{
  render: args => {
    return <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Open dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content {...args}>
                    <Dialog.Header padding="spacious">
                        <Flex justify="space-between" align="center" width="100%" pr="1rem">
                            <Dialog.Title>Header</Dialog.Title>
                            <Button emphasis="default" onPress={() => {
              alert('Button in the header clicked');
            }}>
                                Button in the header
                            </Button>
                        </Flex>
                    </Dialog.Header>
                    <Dialog.Body padding="spacious">Spacious</Dialog.Body>
                    <Dialog.Footer padding="spacious">
                        <Button emphasis="default">Cancel</Button>
                        <Button>Submit</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>;
  }
}`,...(it=(at=W.parameters)==null?void 0:at.docs)==null?void 0:it.source}}};var rt,nt,st;A.parameters={...A.parameters,docs:{...(rt=A.parameters)==null?void 0:rt.docs,source:{originalSource:`{
  args: {
    verticalAlign: 'top'
  }
}`,...(st=(nt=A.parameters)==null?void 0:nt.docs)==null?void 0:st.source}}};var lt,dt,ut;M.parameters={...M.parameters,docs:{...(lt=M.parameters)==null?void 0:lt.docs,source:{originalSource:`{
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
}`,...(ut=(dt=M.parameters)==null?void 0:dt.docs)==null?void 0:ut.source}}};var ct,gt,pt;V.parameters={...V.parameters,docs:{...(ct=V.parameters)==null?void 0:ct.docs,source:{originalSource:`{
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
}`,...(pt=(gt=V.parameters)==null?void 0:gt.docs)==null?void 0:pt.source}}};var mt,ht,ft;k.parameters={...k.parameters,docs:{...(mt=k.parameters)==null?void 0:mt.docs,source:{originalSource:`{
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
}`,...(ft=(ht=k.parameters)==null?void 0:ht.docs)==null?void 0:ft.source}}};var Dt,xt,jt;L.parameters={...L.parameters,docs:{...(Dt=L.parameters)==null?void 0:Dt.docs,source:{originalSource:`{
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
}`,...(jt=(xt=L.parameters)==null?void 0:xt.docs)==null?void 0:jt.source}}};var Tt,vt,Ct;$.parameters={...$.parameters,docs:{...(Tt=$.parameters)==null?void 0:Tt.docs,source:{originalSource:`{
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
}`,...(Ct=(vt=$.parameters)==null?void 0:vt.docs)==null?void 0:Ct.source}}};var yt,Bt,bt;U.parameters={...U.parameters,docs:{...(yt=U.parameters)==null?void 0:yt.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  },
  render: args => <Dialog.Root>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <Dialog.Trigger asChild>
                        <Button>Trigger</Button>
                    </Dialog.Trigger>
                </Tooltip.Trigger>
                <Tooltip.Content>Dropdown tooltip</Tooltip.Content>
            </Tooltip.Root>
            <Dialog.Content>
                <Dialog.Body {...args} />
            </Dialog.Content>
        </Dialog.Root>
}`,...(bt=(Bt=U.parameters)==null?void 0:Bt.docs)==null?void 0:bt.source}}};const ta=["WithFullLayout","WithHeader","WithCloseButton","WithFooter","WithSideContent","WithUnderlay","WithLongText","WithCustomElementForClose","WithAnnouncedDescription","WithCustomElementAnnouncements","WithFocusableContent","WithNoPadding","WithTightPadding","WithCompactPadding","WithComfortablePadding","WithSpaciousPadding","TopAligned","MobileView","WithoutBorders","ControlledComponent","WithFlyoutAndTooltip","WithButtonInTheHeader","WithTooltip"];export{k as ControlledComponent,M as MobileView,A as TopAligned,S as WithAnnouncedDescription,$ as WithButtonInTheHeader,b as WithCloseButton,E as WithComfortablePadding,P as WithCompactPadding,N as WithCustomElementAnnouncements,H as WithCustomElementForClose,L as WithFlyoutAndTooltip,O as WithFocusableContent,R as WithFooter,y as WithFullLayout,B as WithHeader,F as WithLongText,I as WithNoPadding,w as WithSideContent,W as WithSpaciousPadding,_ as WithTightPadding,U as WithTooltip,q as WithUnderlay,V as WithoutBorders,ta as __namedExportsOrder,ea as default};
