import{j as e}from"./jsx-runtime-BSxFkHFN.js";import{r as d}from"./index-i66itsuO.js";import{B as i}from"./Button-CAsOq3iN.js";import{F as j}from"./Flex-qurznK3Z.js";import{F as m}from"./Flyout-CvSrW8aF.js";import{T as re}from"./TextInput-DVb6zBct.js";import{T as h}from"./Tooltip-DJM_t4lA.js";import{e as Zt}from"./fondue-icons348-DbatLcWa.js";import{c as v}from"./index-BNYVQE02.js";import{u as se,P as C,S as Qt}from"./index-C7Xses_O.js";import{c as Xt,a as eo}from"./index-BwxsjnLo.js";import{u as ne}from"./index-CIFYclHn.js";import{u as to}from"./index-P4w4wmP2.js";import{D as oo,P as ao}from"./index-C9TK974O.js";import{R as io,h as ro,u as no,F as so}from"./Combination-BQ0A-8sA.js";import{P as le}from"./index-cPkRJAzz.js";import{u as lo}from"./useSyncRefs-DKJtHqhc.js";import{a as uo,b as co}from"./domUtilities-DGDVwu3_.js";import{u as go,T as po}from"./ThemeProvider-nZnSZuXa.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./styleUtilities-rhQWLmVU.js";import"./focusStyle-IgMhxCMT.js";import"./propsToCssVariables-DVyyXmoh.js";import"./index-Nz8TJpHF.js";import"./index-BQPO3JLn.js";import"./index-BVL3yOfb.js";var de="Dialog",[St,la]=Xt(de),[mo,g]=St(de),Ot=o=>{const{__scopeDialog:a,children:r,open:n,defaultOpen:s,onOpenChange:l,modal:u=!0}=o,c=d.useRef(null),p=d.useRef(null),[f=!1,T]=to({prop:n,defaultProp:s,onChange:l});return e.jsx(mo,{scope:a,triggerRef:c,contentRef:p,contentId:ne(),titleId:ne(),descriptionId:ne(),open:f,onOpenChange:T,onOpenToggle:d.useCallback(()=>T(oe=>!oe),[T]),modal:u,children:r})};Ot.displayName=de;var Nt="DialogTrigger",It=d.forwardRef((o,a)=>{const{__scopeDialog:r,...n}=o,s=g(Nt,r),l=se(a,s.triggerRef);return e.jsx(C.button,{type:"button","aria-haspopup":"dialog","aria-expanded":s.open,"aria-controls":s.contentId,"data-state":ge(s.open),...n,ref:l,onClick:v(o.onClick,s.onOpenToggle)})});It.displayName=Nt;var ue="DialogPortal",[ho,_t]=St(ue,{forceMount:void 0}),Pt=o=>{const{__scopeDialog:a,forceMount:r,children:n,container:s}=o,l=g(ue,a);return e.jsx(ho,{scope:a,forceMount:r,children:d.Children.map(n,u=>e.jsx(le,{present:r||l.open,children:e.jsx(ao,{asChild:!0,container:s,children:u})}))})};Pt.displayName=ue;var G="DialogOverlay",Et=d.forwardRef((o,a)=>{const r=_t(G,o.__scopeDialog),{forceMount:n=r.forceMount,...s}=o,l=g(G,o.__scopeDialog);return l.modal?e.jsx(le,{present:n||l.open,children:e.jsx(fo,{...s,ref:a})}):null});Et.displayName=G;var fo=d.forwardRef((o,a)=>{const{__scopeDialog:r,...n}=o,s=g(G,r);return e.jsx(io,{as:Qt,allowPinchZoom:!0,shards:[s.contentRef],children:e.jsx(C.div,{"data-state":ge(s.open),...n,ref:a,style:{pointerEvents:"auto",...n.style}})})}),D="DialogContent",Wt=d.forwardRef((o,a)=>{const r=_t(D,o.__scopeDialog),{forceMount:n=r.forceMount,...s}=o,l=g(D,o.__scopeDialog);return e.jsx(le,{present:n||l.open,children:l.modal?e.jsx(Do,{...s,ref:a}):e.jsx(xo,{...s,ref:a})})});Wt.displayName=D;var Do=d.forwardRef((o,a)=>{const r=g(D,o.__scopeDialog),n=d.useRef(null),s=se(a,r.contentRef,n);return d.useEffect(()=>{const l=n.current;if(l)return ro(l)},[]),e.jsx(At,{...o,ref:s,trapFocus:r.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:v(o.onCloseAutoFocus,l=>{var u;l.preventDefault(),(u=r.triggerRef.current)==null||u.focus()}),onPointerDownOutside:v(o.onPointerDownOutside,l=>{const u=l.detail.originalEvent,c=u.button===0&&u.ctrlKey===!0;(u.button===2||c)&&l.preventDefault()}),onFocusOutside:v(o.onFocusOutside,l=>l.preventDefault())})}),xo=d.forwardRef((o,a)=>{const r=g(D,o.__scopeDialog),n=d.useRef(!1),s=d.useRef(!1);return e.jsx(At,{...o,ref:a,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:l=>{var u,c;(u=o.onCloseAutoFocus)==null||u.call(o,l),l.defaultPrevented||(n.current||(c=r.triggerRef.current)==null||c.focus(),l.preventDefault()),n.current=!1,s.current=!1},onInteractOutside:l=>{var p,f;(p=o.onInteractOutside)==null||p.call(o,l),l.defaultPrevented||(n.current=!0,l.detail.originalEvent.type==="pointerdown"&&(s.current=!0));const u=l.target;((f=r.triggerRef.current)==null?void 0:f.contains(u))&&l.preventDefault(),l.detail.originalEvent.type==="focusin"&&s.current&&l.preventDefault()}})}),At=d.forwardRef((o,a)=>{const{__scopeDialog:r,trapFocus:n,onOpenAutoFocus:s,onCloseAutoFocus:l,...u}=o,c=g(D,r),p=d.useRef(null),f=se(a,p);return no(),e.jsxs(e.Fragment,{children:[e.jsx(so,{asChild:!0,loop:!0,trapped:n,onMountAutoFocus:s,onUnmountAutoFocus:l,children:e.jsx(oo,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":ge(c.open),...u,ref:f,onDismiss:()=>c.onOpenChange(!1)})}),e.jsxs(e.Fragment,{children:[e.jsx(jo,{titleId:c.titleId}),e.jsx(vo,{contentRef:p,descriptionId:c.descriptionId})]})]})}),ce="DialogTitle",Mt=d.forwardRef((o,a)=>{const{__scopeDialog:r,...n}=o,s=g(ce,r);return e.jsx(C.h2,{id:s.titleId,...n,ref:a})});Mt.displayName=ce;var Vt="DialogDescription",Lt=d.forwardRef((o,a)=>{const{__scopeDialog:r,...n}=o,s=g(Vt,r);return e.jsx(C.p,{id:s.descriptionId,...n,ref:a})});Lt.displayName=Vt;var kt="DialogClose",$t=d.forwardRef((o,a)=>{const{__scopeDialog:r,...n}=o,s=g(kt,r);return e.jsx(C.button,{type:"button",...n,ref:a,onClick:v(o.onClick,()=>s.onOpenChange(!1))})});$t.displayName=kt;function ge(o){return o?"open":"closed"}var Ut="DialogTitleWarning",[da,Gt]=eo(Ut,{contentName:D,titleName:ce,docsSlug:"dialog"}),jo=({titleId:o})=>{const a=Gt(Ut),r=`\`${a.contentName}\` requires a \`${a.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${a.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${a.docsSlug}`;return d.useEffect(()=>{o&&(document.getElementById(o)||console.error(r))},[r,o]),null},To="DialogDescriptionWarning",vo=({contentRef:o,descriptionId:a})=>{const n=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Gt(To).contentName}}.`;return d.useEffect(()=>{var l;const s=(l=o.current)==null?void 0:l.getAttribute("aria-describedby");a&&s&&(document.getElementById(a)||console.warn(n))},[n,o,a]),null},Co=Ot,yo=It,bo=Pt,Bo=Et,Ro=Wt,wo=Mt,qo=Lt,Jt=$t;const Fo="_content_2dhca_6",Ho="_header_2dhca_51",So="_footer_2dhca_52",Oo="_body_2dhca_53",No="_underlay_2dhca_177",Io="_sideContent_2dhca_190",x={content:Fo,header:Ho,footer:So,body:Oo,underlay:No,sideContent:Io},zt=d.createContext({isModal:!1}),J=({children:o,...a})=>e.jsx(zt.Provider,{value:{isModal:a.modal??!1},children:e.jsx(Co,{...a,children:o})});J.displayName="Dialog.Root";const z=({asChild:o=!0,children:a,"data-test-id":r="fondue-dialog-trigger",...n},s)=>e.jsx(yo,{onMouseDown:uo,"data-auto-focus-visible":"true","data-auto-focus-trigger":!0,"data-test-id":r,asChild:o,ref:s,...n,children:a});z.displayName="Dialog.Trigger";const _o=({children:o,showUnderlay:a})=>{const{isModal:r}=d.useContext(zt);return r?e.jsx(Bo,{"data-visible":a,className:x.underlay,children:o}):e.jsx("div",{className:x.underlay,"data-visible":a,children:o})},K=({maxWidth:o="800px",minWidth:a="400px",minHeight:r="200px",padding:n="compact",verticalAlign:s="center","data-test-id":l="fondue-dialog-content",showUnderlay:u=!1,rounded:c=!0,children:p,...f},T)=>{const oe=go(),ae=d.useRef(null);lo(ae,T);const Kt=Yt=>{var he;Yt.preventDefault();const ie=(he=ae.current)==null?void 0:he.querySelector('[data-dialog-layout-component="body"]'),me=ie==null?void 0:ie.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');me instanceof HTMLElement&&me.focus()};return e.jsx(bo,{children:e.jsx(po,{theme:oe,children:e.jsx(_o,{showUnderlay:u,children:e.jsx(Ro,{style:{"--dialog-max-width":o,"--dialog-min-width":a,"--dialog-min-height":r},ref:ae,className:x.content,onFocus:co,onOpenAutoFocus:Kt,"data-dialog-padding":n,"data-dialog-rounded":c,"data-test-id":l,"data-dialog-vertical-align":s,...f,children:p})})})})};K.displayName="Dialog.Content";const Y=({padding:o,showBorder:a=!0,showCloseButton:r=!0,children:n,"data-test-id":s="fondue-dialog-header"},l)=>e.jsxs("div",{"data-test-id":s,ref:l,className:x.header,"data-dialog-header-padding":o,"data-show-border":a,"data-dialog-layout-component":"header",children:[e.jsx("div",{children:n}),r&&e.jsx(Jt,{role:"button","data-test-id":`${s}-close`,className:"tw-cursor-pointer",children:e.jsx(Zt,{size:20})})]});Y.displayName="Dialog.Header";const pe=({padding:o,showBorder:a=!0,children:r,"data-test-id":n="fondue-dialog-footer"},s)=>e.jsx("div",{"data-test-id":n,ref:s,className:x.footer,"data-dialog-footer-padding":o,"data-show-border":a,"data-dialog-layout-component":"footer",children:r});pe.displayName="Dialog.Footer";const Z=({padding:o,children:a,"data-test-id":r="fondue-dialog-body"},n)=>e.jsx("div",{"data-test-id":r,ref:n,className:x.body,"data-dialog-body-padding":o,"data-dialog-layout-component":"body",children:a});Z.displayName="Dialog.Body";const Q=({children:o,"data-test-id":a="fondue-dialog-side-content"},r)=>e.jsx("div",{"data-test-id":a,ref:r,className:x.sideContent,"data-dialog-layout-component":!0,children:o});Q.displayName="Dialog.SideContent";const X=({children:o})=>e.jsx(Jt,{asChild:!0,children:o});X.displayName="Dialog.Close";const ee=({children:o,asChild:a})=>e.jsx(wo,{asChild:a,children:o});ee.displayName="Dialog.Title";const te=({children:o,asChild:a})=>e.jsx(qo,{asChild:a,children:o});te.displayName="Dialog.Description";const t={Root:J,Title:ee,Description:te,Close:X,Trigger:d.forwardRef(z),Content:d.forwardRef(K),Header:d.forwardRef(Y),Footer:d.forwardRef(pe),Body:d.forwardRef(Z),SideContent:d.forwardRef(Q)};J.__docgenInfo={description:"",methods:[],displayName:"Dialog.Root",props:{modal:{required:!1,tsType:{name:"boolean"},description:`Disable interaction with the rest of the page
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
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-header'",computed:!1}}}};pe.__docgenInfo={description:"",methods:[],displayName:"Dialog.Footer",props:{padding:{required:!1,tsType:{name:"union",raw:"'none' | 'tight' | 'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'tight'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:"Define the padding for the dialog footer"},showBorder:{required:!1,tsType:{name:"boolean"},description:`Show a border at the top of the footer
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-footer'",computed:!1}}}};Z.__docgenInfo={description:"",methods:[],displayName:"Dialog.Body",props:{padding:{required:!1,tsType:{name:"union",raw:"'none' | 'tight' | 'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'tight'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:"Define the padding for the dialog body"},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-body'",computed:!1}}}};Q.__docgenInfo={description:"",methods:[],displayName:"Dialog.SideContent",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-side-content'",computed:!1}}}};X.__docgenInfo={description:"",methods:[],displayName:"Dialog.Close",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""}}};ee.__docgenInfo={description:"",methods:[],displayName:"Dialog.Title",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};te.__docgenInfo={description:"",methods:[],displayName:"Dialog.Description",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};const ua={component:K,subcomponents:{"Dialog.Root":J,"Dialog.Trigger":z,"Dialog.SideContent":Q,"Dialog.Header":Y,"Dialog.Body":Z,"Dialog.Title":ee,"Dialog.Description":te,"Dialog.Close":X},tags:["autodocs"],parameters:{status:{type:"released"}},args:{},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-w-full"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...o}),e.jsxs(t.Footer,{children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},y={args:{children:"I am a dialog content"}},b={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...o})]})]})},B={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{showCloseButton:!0,children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...o})]})]})},R={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Body,{...o}),e.jsxs(t.Footer,{children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},w={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Body,{...o})]})]})},q={args:{children:"I am a dialog content",showUnderlay:!0},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...o})]})]})},F={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...o}),e.jsxs(t.Footer,{children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},H={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(t.Body,{...o}),e.jsxs(t.Footer,{children:[e.jsx(t.Close,{children:e.jsx(i,{emphasis:"default",children:"Cancel"})}),e.jsx(i,{children:"Submit"})]})]})]})},S={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Dialog Header"})}),e.jsx(t.Body,{children:e.jsx(t.Description,{children:o.children})}),e.jsxs(t.Footer,{children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},O={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(t.Header,{children:e.jsx(t.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(t.Body,{children:e.jsx(t.Description,{asChild:!0,children:e.jsx("p",{children:o.children})})}),e.jsxs(t.Footer,{children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},N={args:{children:"Hello World"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open flyout"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{children:"Header"}),e.jsxs(t.Body,{...o,children:[e.jsx(re,{}),e.jsx(re,{}),e.jsx(re,{})]})]})]})},I={render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{padding:"none",children:e.jsxs(j,{justify:"space-between",align:"center",width:"100%",pr:"1rem",children:[e.jsx(t.Title,{children:"Header"}),e.jsx(i,{emphasis:"default",onPress:()=>{alert("Button in the header clicked")},children:"Button in the header"})]})}),e.jsx(t.Body,{padding:"none",children:"None"}),e.jsxs(t.Footer,{padding:"none",children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},_={render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{padding:"tight",children:e.jsxs(j,{justify:"space-between",align:"center",width:"100%",pr:"1rem",children:[e.jsx(t.Title,{children:"Header"}),e.jsx(i,{emphasis:"default",onPress:()=>{alert("Button in the header clicked")},children:"Button in the header"})]})}),e.jsx(t.Body,{padding:"tight",children:"Tight"}),e.jsxs(t.Footer,{padding:"tight",children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},P={render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{padding:"compact",children:e.jsxs(j,{justify:"space-between",align:"center",width:"100%",pr:"1rem",children:[e.jsx(t.Title,{children:"Header"}),e.jsx(i,{emphasis:"default",onPress:()=>{alert("Button in the header clicked")},children:"Button in the header"})]})}),e.jsx(t.Body,{padding:"compact",children:"Compact"}),e.jsxs(t.Footer,{padding:"compact",children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},E={render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{padding:"comfortable",children:e.jsxs(j,{justify:"space-between",align:"center",width:"100%",pr:"1rem",children:[e.jsx(t.Title,{children:"Header"}),e.jsx(i,{emphasis:"default",onPress:()=>{alert("Button in the header clicked")},children:"Button in the header"})]})}),e.jsx(t.Body,{padding:"comfortable",children:"Confortable"}),e.jsxs(t.Footer,{padding:"comfortable",children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},W={render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{padding:"spacious",children:e.jsxs(j,{justify:"space-between",align:"center",width:"100%",pr:"1rem",children:[e.jsx(t.Title,{children:"Header"}),e.jsx(i,{emphasis:"default",onPress:()=>{alert("Button in the header clicked")},children:"Button in the header"})]})}),e.jsx(t.Body,{padding:"spacious",children:"Spacious"}),e.jsxs(t.Footer,{padding:"spacious",children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},A={args:{verticalAlign:"top"}},M={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"}}},defaultViewport:"mobile"}},args:{children:"Hello World"}},V={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{showBorder:!1,children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...o}),e.jsxs(t.Footer,{showBorder:!1,children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},L={args:{children:"I am a dialog content"},render:o=>{const[a,r]=d.useState(!1);return e.jsxs(t.Root,{open:a,onOpenChange:n=>{r(n)},children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,children:[e.jsx(t.Header,{children:e.jsx(t.Title,{children:"Header"})}),e.jsx(t.Body,{...o})]})]})}},k={render:o=>{const a=d.forwardRef(({text:r,tooltipText:n},s)=>e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx("div",{children:e.jsx(m.Trigger,{children:e.jsx(i,{ref:s,children:r})})})}),e.jsx(h.Content,{side:"left",children:n})]}));return a.displayName="ButtonWithTooltip",e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{...o,showUnderlay:!0,children:[e.jsx(t.Body,{children:e.jsxs(j,{direction:"column",gap:"8px",align:"flex-start",children:[e.jsxs(m.Root,{children:[e.jsx(m.Trigger,{children:e.jsx(i,{children:"Open flyout"})}),e.jsxs(m.Content,{children:[e.jsx(m.Header,{children:"Header"}),e.jsx(m.Body,{children:"I am a flyout"})]})]}),e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx(i,{children:"I am a tooltip, hover me"})}),e.jsx(h.Content,{side:"left",children:"Tooltip content"})]}),e.jsxs(m.Root,{children:[e.jsx(a,{text:"Open flyout (and I am a tooltip too)",tooltipText:"Tooltip text"}),e.jsxs(m.Content,{children:[e.jsx(m.Header,{children:"Header"}),e.jsx(m.Body,{children:"I am a flyout"})]})]})]})}),e.jsxs(t.Footer,{children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})}},$={render:o=>e.jsxs(t.Root,{children:[e.jsx(t.Trigger,{children:e.jsx(i,{children:"Open dialog"})}),e.jsxs(t.Content,{children:[e.jsx(t.Header,{children:e.jsxs(j,{justify:"space-between",align:"center",width:"100%",pr:"1rem",children:[e.jsx(t.Title,{children:"Header"}),e.jsx(i,{emphasis:"default",onPress:()=>{alert("Button in the header clicked")},children:"Button in the header"})]})}),e.jsx(t.Body,{...o}),e.jsxs(t.Footer,{children:[e.jsx(i,{emphasis:"default",children:"Cancel"}),e.jsx(i,{children:"Submit"})]})]})]})},U={args:{children:"I am a dialog content"},render:o=>e.jsxs(t.Root,{children:[e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{asChild:!0,children:e.jsx(t.Trigger,{asChild:!0,children:e.jsx(i,{children:"Trigger"})})}),e.jsx(h.Content,{children:"Dropdown tooltip"})]}),e.jsx(t.Content,{children:e.jsx(t.Body,{...o})})]})};var fe,De,xe;y.parameters={...y.parameters,docs:{...(fe=y.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  }
}`,...(xe=(De=y.parameters)==null?void 0:De.docs)==null?void 0:xe.source}}};var je,Te,ve;b.parameters={...b.parameters,docs:{...(je=b.parameters)==null?void 0:je.docs,source:{originalSource:`{
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
}`,...(ve=(Te=b.parameters)==null?void 0:Te.docs)==null?void 0:ve.source}}};var Ce,ye,be;B.parameters={...B.parameters,docs:{...(Ce=B.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
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
}`,...(be=(ye=B.parameters)==null?void 0:ye.docs)==null?void 0:be.source}}};var Be,Re,we;R.parameters={...R.parameters,docs:{...(Be=R.parameters)==null?void 0:Be.docs,source:{originalSource:`{
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
}`,...(we=(Re=R.parameters)==null?void 0:Re.docs)==null?void 0:we.source}}};var qe,Fe,He;w.parameters={...w.parameters,docs:{...(qe=w.parameters)==null?void 0:qe.docs,source:{originalSource:`{
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
}`,...(He=(Fe=w.parameters)==null?void 0:Fe.docs)==null?void 0:He.source}}};var Se,Oe,Ne;q.parameters={...q.parameters,docs:{...(Se=q.parameters)==null?void 0:Se.docs,source:{originalSource:`{
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
}`,...(Ne=(Oe=q.parameters)==null?void 0:Oe.docs)==null?void 0:Ne.source}}};var Ie,_e,Pe;F.parameters={...F.parameters,docs:{...(Ie=F.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
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
}`,...(Pe=(_e=F.parameters)==null?void 0:_e.docs)==null?void 0:Pe.source}}};var Ee,We,Ae;H.parameters={...H.parameters,docs:{...(Ee=H.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
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
}`,...(Ae=(We=H.parameters)==null?void 0:We.docs)==null?void 0:Ae.source}}};var Me,Ve,Le;S.parameters={...S.parameters,docs:{...(Me=S.parameters)==null?void 0:Me.docs,source:{originalSource:`{
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
}`,...(Le=(Ve=S.parameters)==null?void 0:Ve.docs)==null?void 0:Le.source}}};var ke,$e,Ue;O.parameters={...O.parameters,docs:{...(ke=O.parameters)==null?void 0:ke.docs,source:{originalSource:`{
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
}`,...(Ue=($e=O.parameters)==null?void 0:$e.docs)==null?void 0:Ue.source}}};var Ge,Je,ze;N.parameters={...N.parameters,docs:{...(Ge=N.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
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
}`,...(ze=(Je=N.parameters)==null?void 0:Je.docs)==null?void 0:ze.source}}};var Ke,Ye,Ze;I.parameters={...I.parameters,docs:{...(Ke=I.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
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
}`,...(Ze=(Ye=I.parameters)==null?void 0:Ye.docs)==null?void 0:Ze.source}}};var Qe,Xe,et;_.parameters={..._.parameters,docs:{...(Qe=_.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
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
}`,...(et=(Xe=_.parameters)==null?void 0:Xe.docs)==null?void 0:et.source}}};var tt,ot,at;P.parameters={...P.parameters,docs:{...(tt=P.parameters)==null?void 0:tt.docs,source:{originalSource:`{
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
}`,...(at=(ot=P.parameters)==null?void 0:ot.docs)==null?void 0:at.source}}};var it,rt,nt;E.parameters={...E.parameters,docs:{...(it=E.parameters)==null?void 0:it.docs,source:{originalSource:`{
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
}`,...(nt=(rt=E.parameters)==null?void 0:rt.docs)==null?void 0:nt.source}}};var st,lt,dt;W.parameters={...W.parameters,docs:{...(st=W.parameters)==null?void 0:st.docs,source:{originalSource:`{
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
}`,...(dt=(lt=W.parameters)==null?void 0:lt.docs)==null?void 0:dt.source}}};var ut,ct,gt;A.parameters={...A.parameters,docs:{...(ut=A.parameters)==null?void 0:ut.docs,source:{originalSource:`{
  args: {
    verticalAlign: 'top'
  }
}`,...(gt=(ct=A.parameters)==null?void 0:ct.docs)==null?void 0:gt.source}}};var pt,mt,ht;M.parameters={...M.parameters,docs:{...(pt=M.parameters)==null?void 0:pt.docs,source:{originalSource:`{
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
}`,...(ht=(mt=M.parameters)==null?void 0:mt.docs)==null?void 0:ht.source}}};var ft,Dt,xt;V.parameters={...V.parameters,docs:{...(ft=V.parameters)==null?void 0:ft.docs,source:{originalSource:`{
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
}`,...(xt=(Dt=V.parameters)==null?void 0:Dt.docs)==null?void 0:xt.source}}};var jt,Tt,vt;L.parameters={...L.parameters,docs:{...(jt=L.parameters)==null?void 0:jt.docs,source:{originalSource:`{
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
}`,...(vt=(Tt=L.parameters)==null?void 0:Tt.docs)==null?void 0:vt.source}}};var Ct,yt,bt;k.parameters={...k.parameters,docs:{...(Ct=k.parameters)==null?void 0:Ct.docs,source:{originalSource:`{
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
}`,...(bt=(yt=k.parameters)==null?void 0:yt.docs)==null?void 0:bt.source}}};var Bt,Rt,wt;$.parameters={...$.parameters,docs:{...(Bt=$.parameters)==null?void 0:Bt.docs,source:{originalSource:`{
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
}`,...(wt=(Rt=$.parameters)==null?void 0:Rt.docs)==null?void 0:wt.source}}};var qt,Ft,Ht;U.parameters={...U.parameters,docs:{...(qt=U.parameters)==null?void 0:qt.docs,source:{originalSource:`{
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
}`,...(Ht=(Ft=U.parameters)==null?void 0:Ft.docs)==null?void 0:Ht.source}}};const ca=["WithFullLayout","WithHeader","WithCloseButton","WithFooter","WithSideContent","WithUnderlay","WithLongText","WithCustomElementForClose","WithAnnouncedDescription","WithCustomElementAnnouncements","WithFocusableContent","WithNoPadding","WithTightPadding","WithCompactPadding","WithComfortablePadding","WithSpaciousPadding","TopAligned","MobileView","WithoutBorders","ControlledComponent","WithFlyoutAndTooltip","WithButtonInTheHeader","WithTooltip"];export{L as ControlledComponent,M as MobileView,A as TopAligned,S as WithAnnouncedDescription,$ as WithButtonInTheHeader,B as WithCloseButton,E as WithComfortablePadding,P as WithCompactPadding,O as WithCustomElementAnnouncements,H as WithCustomElementForClose,k as WithFlyoutAndTooltip,N as WithFocusableContent,R as WithFooter,y as WithFullLayout,b as WithHeader,F as WithLongText,I as WithNoPadding,w as WithSideContent,W as WithSpaciousPadding,_ as WithTightPadding,U as WithTooltip,q as WithUnderlay,V as WithoutBorders,ca as __namedExportsOrder,ua as default};
