import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as d}from"./index-BwDkhjyp.js";import{B as l}from"./Button-BD32N3dP.js";import{F as Bt}from"./Flex-CU151qQ-.js";import{F as m}from"./Flyout-UJYEiUbU.js";import{T as te}from"./TextInput-BYbZmo9E.js";import{T as h}from"./Tooltip-BV_thiUK.js";import{e as kt}from"./fondue-icons346-wUFpRcbj.js";import{c as j}from"./index-DOnKqARA.js";import{u as ae,P as T,S as Gt}from"./index-BtCsUTRM.js";import{c as Jt,a as zt}from"./index-BSNoMcJN.js";import{u as oe}from"./index-DduqEaLY.js";import{u as Kt}from"./index-DGaPG0k3.js";import{D as Yt,P as Zt}from"./index-CAR1Fn1S.js";import{R as Qt,h as Xt,u as eo,F as to}from"./Combination-_kzEJOyC.js";import{P as ie}from"./index-C1SWbrhG.js";import{a as oo,b as ao}from"./domUtilities-DGDVwu3_.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-CZDH020m.js";import"./focusStyle-IgMhxCMT.js";import"./propsToCssVariables-DuhnUZvM.js";import"./index-DzIefvJi.js";import"./index-CS4BWtGh.js";import"./index-BnOD_KYf.js";import"./index-kUwV4muI.js";var re="Dialog",[Rt,Qo]=Jt(re),[io,g]=Rt(re),qt=t=>{const{__scopeDialog:a,children:i,open:r,defaultOpen:n,onOpenChange:s,modal:u=!0}=t,c=d.useRef(null),p=d.useRef(null),[f=!1,v]=Kt({prop:r,defaultProp:n,onChange:s});return e.jsx(io,{scope:a,triggerRef:c,contentRef:p,contentId:oe(),titleId:oe(),descriptionId:oe(),open:f,onOpenChange:v,onOpenToggle:d.useCallback(()=>v(Ut=>!Ut),[v]),modal:u,children:i})};qt.displayName=re;var wt="DialogTrigger",Ft=d.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,n=g(wt,i),s=ae(a,n.triggerRef);return e.jsx(T.button,{type:"button","aria-haspopup":"dialog","aria-expanded":n.open,"aria-controls":n.contentId,"data-state":le(n.open),...r,ref:s,onClick:j(t.onClick,n.onOpenToggle)})});Ft.displayName=wt;var ne="DialogPortal",[ro,Nt]=Rt(ne,{forceMount:void 0}),St=t=>{const{__scopeDialog:a,forceMount:i,children:r,container:n}=t,s=g(ne,a);return e.jsx(ro,{scope:a,forceMount:i,children:d.Children.map(r,u=>e.jsx(ie,{present:i||s.open,children:e.jsx(Zt,{asChild:!0,container:n,children:u})}))})};St.displayName=ne;var k="DialogOverlay",It=d.forwardRef((t,a)=>{const i=Nt(k,t.__scopeDialog),{forceMount:r=i.forceMount,...n}=t,s=g(k,t.__scopeDialog);return s.modal?e.jsx(ie,{present:r||s.open,children:e.jsx(no,{...n,ref:a})}):null});It.displayName=k;var no=d.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,n=g(k,i);return e.jsx(Qt,{as:Gt,allowPinchZoom:!0,shards:[n.contentRef],children:e.jsx(T.div,{"data-state":le(n.open),...r,ref:a,style:{pointerEvents:"auto",...r.style}})})}),D="DialogContent",Ot=d.forwardRef((t,a)=>{const i=Nt(D,t.__scopeDialog),{forceMount:r=i.forceMount,...n}=t,s=g(D,t.__scopeDialog);return e.jsx(ie,{present:r||s.open,children:s.modal?e.jsx(so,{...n,ref:a}):e.jsx(lo,{...n,ref:a})})});Ot.displayName=D;var so=d.forwardRef((t,a)=>{const i=g(D,t.__scopeDialog),r=d.useRef(null),n=ae(a,i.contentRef,r);return d.useEffect(()=>{const s=r.current;if(s)return Xt(s)},[]),e.jsx(Ht,{...t,ref:n,trapFocus:i.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:j(t.onCloseAutoFocus,s=>{var u;s.preventDefault(),(u=i.triggerRef.current)==null||u.focus()}),onPointerDownOutside:j(t.onPointerDownOutside,s=>{const u=s.detail.originalEvent,c=u.button===0&&u.ctrlKey===!0;(u.button===2||c)&&s.preventDefault()}),onFocusOutside:j(t.onFocusOutside,s=>s.preventDefault())})}),lo=d.forwardRef((t,a)=>{const i=g(D,t.__scopeDialog),r=d.useRef(!1),n=d.useRef(!1);return e.jsx(Ht,{...t,ref:a,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:s=>{var u,c;(u=t.onCloseAutoFocus)==null||u.call(t,s),s.defaultPrevented||(r.current||(c=i.triggerRef.current)==null||c.focus(),s.preventDefault()),r.current=!1,n.current=!1},onInteractOutside:s=>{var p,f;(p=t.onInteractOutside)==null||p.call(t,s),s.defaultPrevented||(r.current=!0,s.detail.originalEvent.type==="pointerdown"&&(n.current=!0));const u=s.target;((f=i.triggerRef.current)==null?void 0:f.contains(u))&&s.preventDefault(),s.detail.originalEvent.type==="focusin"&&n.current&&s.preventDefault()}})}),Ht=d.forwardRef((t,a)=>{const{__scopeDialog:i,trapFocus:r,onOpenAutoFocus:n,onCloseAutoFocus:s,...u}=t,c=g(D,i),p=d.useRef(null),f=ae(a,p);return eo(),e.jsxs(e.Fragment,{children:[e.jsx(to,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:n,onUnmountAutoFocus:s,children:e.jsx(Yt,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":le(c.open),...u,ref:f,onDismiss:()=>c.onOpenChange(!1)})}),e.jsxs(e.Fragment,{children:[e.jsx(uo,{titleId:c.titleId}),e.jsx(go,{contentRef:p,descriptionId:c.descriptionId})]})]})}),se="DialogTitle",_t=d.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,n=g(se,i);return e.jsx(T.h2,{id:n.titleId,...r,ref:a})});_t.displayName=se;var Et="DialogDescription",Wt=d.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,n=g(Et,i);return e.jsx(T.p,{id:n.descriptionId,...r,ref:a})});Wt.displayName=Et;var Pt="DialogClose",At=d.forwardRef((t,a)=>{const{__scopeDialog:i,...r}=t,n=g(Pt,i);return e.jsx(T.button,{type:"button",...r,ref:a,onClick:j(t.onClick,()=>n.onOpenChange(!1))})});At.displayName=Pt;function le(t){return t?"open":"closed"}var Mt="DialogTitleWarning",[Xo,Vt]=zt(Mt,{contentName:D,titleName:se,docsSlug:"dialog"}),uo=({titleId:t})=>{const a=Vt(Mt),i=`\`${a.contentName}\` requires a \`${a.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${a.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${a.docsSlug}`;return d.useEffect(()=>{t&&(document.getElementById(t)||console.error(i))},[i,t]),null},co="DialogDescriptionWarning",go=({contentRef:t,descriptionId:a})=>{const r=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Vt(co).contentName}}.`;return d.useEffect(()=>{var s;const n=(s=t.current)==null?void 0:s.getAttribute("aria-describedby");a&&n&&(document.getElementById(a)||console.warn(r))},[r,t,a]),null},po=qt,mo=Ft,ho=St,fo=It,Do=Ot,xo=_t,vo=Wt,Lt=At;const jo="_content_1dnjb_6",To="_header_1dnjb_50",Co="_footer_1dnjb_51",yo="_body_1dnjb_52",bo="_underlay_1dnjb_77",Bo="_sideContent_1dnjb_90",x={content:jo,header:To,footer:Co,body:yo,underlay:bo,sideContent:Bo},$t=d.createContext({isModal:!1}),G=({children:t,...a})=>e.jsx($t.Provider,{value:{isModal:a.modal??!1},children:e.jsx(po,{...a,children:t})});G.displayName="Dialog.Root";const J=({asChild:t=!0,children:a,"data-test-id":i="fondue-dialog-trigger",...r},n)=>e.jsx(mo,{onMouseDown:oo,"data-auto-focus-visible":"true","data-auto-focus-trigger":!0,"data-test-id":i,asChild:t,ref:n,...r,children:a});J.displayName="Dialog.Trigger";const Ro=({children:t,showUnderlay:a})=>{const{isModal:i}=d.useContext($t);return i?e.jsx(fo,{"data-visible":a,className:x.underlay,children:t}):e.jsx("div",{className:x.underlay,"data-visible":a,children:t})},z=({maxWidth:t="800px",minWidth:a="400px",minHeight:i="200px",padding:r="compact",verticalAlign:n="center","data-test-id":s="fondue-dialog-content",showUnderlay:u=!1,children:c,rounded:p=!0,...f},v)=>e.jsx(ho,{children:e.jsx(Ro,{showUnderlay:u,children:e.jsx(Do,{style:{"--dialog-max-width":t,"--dialog-min-width":a,"--dialog-min-height":i},ref:v,className:x.content,onFocus:ao,"data-dialog-rounded":p,"data-dialog-spacing":r,"data-test-id":s,"data-dialog-vertical-align":n,...f,children:c})})});z.displayName="Dialog.Content";const K=({children:t,showBorder:a=!0,showCloseButton:i=!0,"data-test-id":r="fondue-dialog-header"},n)=>e.jsxs("div",{"data-test-id":r,ref:n,className:x.header,"data-show-border":a,"data-dialog-layout-component":!0,children:[e.jsx("div",{children:t}),i&&e.jsx(Lt,{role:"button","data-test-id":`${r}-close`,className:"tw-cursor-pointer",children:e.jsx(kt,{size:20})})]});K.displayName="Dialog.Header";const de=({showBorder:t=!0,children:a,"data-test-id":i="fondue-dialog-footer"},r)=>e.jsx("div",{"data-test-id":i,ref:r,className:x.footer,"data-show-border":t,"data-dialog-layout-component":!0,children:a});de.displayName="Dialog.Footer";const Y=({children:t,"data-test-id":a="fondue-dialog-body"},i)=>e.jsx("div",{"data-test-id":a,ref:i,className:x.body,"data-dialog-layout-component":!0,children:t});Y.displayName="Dialog.Body";const Z=({children:t,"data-test-id":a="fondue-dialog-side-content"},i)=>e.jsx("div",{"data-test-id":a,ref:i,className:x.sideContent,"data-dialog-layout-component":!0,children:t});Z.displayName="Dialog.SideContent";const Q=({children:t})=>e.jsx(Lt,{asChild:!0,children:t});Q.displayName="Dialog.Close";const X=({children:t,asChild:a})=>e.jsx(xo,{asChild:a,children:t});X.displayName="Dialog.Title";const ee=({children:t,asChild:a})=>e.jsx(vo,{asChild:a,children:t});ee.displayName="Dialog.Description";const o={Root:G,Title:X,Description:ee,Close:Q,Trigger:d.forwardRef(J),Content:d.forwardRef(z),Header:d.forwardRef(K),Footer:d.forwardRef(de),Body:d.forwardRef(Y),SideContent:d.forwardRef(Z)};G.__docgenInfo={description:"",methods:[],displayName:"Dialog.Root",props:{modal:{required:!1,tsType:{name:"boolean"},description:`Disable interaction with the rest of the page
@default false`},open:{required:!1,tsType:{name:"boolean"},description:"The controlled `open` state of the dialog\n@default false"},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Event handler called when the `open` state changes"},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};J.__docgenInfo={description:"",methods:[],displayName:"Dialog.Trigger",props:{asChild:{required:!1,tsType:{name:"boolean"},description:`Change the default rendered element for the one passed as a child, merging their props and behavior.
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-trigger'",computed:!1}}}};z.__docgenInfo={description:"",methods:[],displayName:"Dialog.Content",props:{rounded:{required:!1,tsType:{name:"boolean"},description:`Add rounded corners to the dialog
@default true`,defaultValue:{value:"true",computed:!1}},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'tight' | 'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'tight'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:`Define the padding of the dialog
@default "compact"`,defaultValue:{value:"'compact'",computed:!1}},verticalAlign:{required:!1,tsType:{name:"union",raw:"'top' | 'center'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'center'"}]},description:`The vertical alignment of the divider
@default "center"`,defaultValue:{value:"'center'",computed:!1}},maxWidth:{required:!1,tsType:{name:"string"},description:`Define a maximum width for the dialog
@default "800px"`,defaultValue:{value:"'800px'",computed:!1}},minWidth:{required:!1,tsType:{name:"string"},description:`Define a minimum width for the dialog
@default "400px"`,defaultValue:{value:"'400px'",computed:!1}},minHeight:{required:!1,tsType:{name:"string"},description:`Define a minimum height for the dialog
@default "200px"`,defaultValue:{value:"'200px'",computed:!1}},showUnderlay:{required:!1,tsType:{name:"boolean"},description:`Show a dark underlay behind the dialog
@default false`,defaultValue:{value:"false",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-content'",computed:!1}}}};K.__docgenInfo={description:"",methods:[],displayName:"Dialog.Header",props:{showBorder:{required:!1,tsType:{name:"boolean"},description:`Show a border at the bottom of the header
@default true`,defaultValue:{value:"true",computed:!1}},showCloseButton:{required:!1,tsType:{name:"boolean"},description:`Show a close button in the header
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-header'",computed:!1}}}};de.__docgenInfo={description:"",methods:[],displayName:"Dialog.Footer",props:{showBorder:{required:!1,tsType:{name:"boolean"},description:`Show a border at the top of the footer
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-footer'",computed:!1}}}};Y.__docgenInfo={description:"",methods:[],displayName:"Dialog.Body",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-body'",computed:!1}}}};Z.__docgenInfo={description:"",methods:[],displayName:"Dialog.SideContent",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-side-content'",computed:!1}}}};Q.__docgenInfo={description:"",methods:[],displayName:"Dialog.Close",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""}}};X.__docgenInfo={description:"",methods:[],displayName:"Dialog.Title",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};ee.__docgenInfo={description:"",methods:[],displayName:"Dialog.Description",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},asChild:{required:!1,tsType:{name:"boolean"},description:""}}};const ea={component:z,subcomponents:{"Dialog.Root":G,"Dialog.Trigger":J,"Dialog.SideContent":Z,"Dialog.Header":K,"Dialog.Body":Y,"Dialog.Title":X,"Dialog.Description":ee,"Dialog.Close":Q},tags:["autodocs"],parameters:{status:{type:"released"}},args:{},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-w-full"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},C={args:{children:"I am a dialog content"}},y={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},b={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{showCloseButton:!0,children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},B={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},R={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Body,{...t})]})]})},q={args:{children:"I am a dialog content",showUnderlay:!0},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})},w={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},F={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(o.Close,{children:e.jsx(l,{emphasis:"default",children:"Cancel"})}),e.jsx(l,{children:"Submit"})]})]})]})},N={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Dialog Header"})}),e.jsx(o.Body,{children:e.jsx(o.Description,{children:t.children})}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},S={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa tincidunt nunc pulvinar sapien et ligula. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Urna porttitor rhoncus dolor purus non enim. A iaculis at erat pellentesque adipiscing commodo. Tristique magna sit amet purus gravida quis. Magna ac placerat vestibulum lectus mauris ultrices eros. Libero volutpat sed cras ornare arcu dui. Imperdiet sed euismod nisi porta lorem mollis aliquam. Odio pellentesque diam volutpat commodo. Varius vel pharetra vel turpis nunc. Justo nec ultrices dui sapien eget mi proin sed. Consectetur adipiscing elit ut aliquam. Arcu dictum varius duis at consectetur lorem. Pharetra diam sit amet nisl. Odio ut sem nulla pharetra diam sit. Nam aliquam sem et tortor consequat id. Egestas maecenas pharetra convallis posuere morbi leo urna. Id volutpat lacus laoreet non curabitur. Sagittis purus sit amet volutpat consequat mauris nunc. Eu nisl nunc mi ipsum faucibus. Pretium viverra suspendisse potenti nullam ac. Enim neque volutpat ac tincidunt vitae semper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Maecenas accumsan lacus vel facilisis volutpat est. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Facilisis sed odio morbi quis commodo. Aliquam sem et tortor consequat id porta nibh venenatis cras. Adipiscing at in tellus integer feugiat scelerisque. Netus et malesuada fames ac turpis egestas sed tempus. Eget mauris pharetra et ultrices."},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.SideContent,{children:e.jsx("div",{className:"tw-bg-box-positive-strong tw-h-full tw-min-w-40"})}),e.jsx(o.Header,{children:e.jsx(o.Title,{asChild:!0,children:e.jsx("h2",{children:"Dialog Header"})})}),e.jsx(o.Body,{children:e.jsx(o.Description,{asChild:!0,children:e.jsx("p",{children:t.children})})}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},I={args:{children:"Hello World"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open flyout"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:"Header"}),e.jsxs(o.Body,{...t,children:[e.jsx(te,{}),e.jsx(te,{}),e.jsx(te,{})]})]})]})},O={args:{padding:"none"}},H={args:{padding:"tight"}},_={args:{padding:"compact"}},E={args:{padding:"comfortable"}},W={args:{padding:"spacious"}},P={args:{verticalAlign:"top"}},A={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"}}},defaultViewport:"mobile"}},args:{children:"Hello World"}},M={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{showBorder:!1,children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{showBorder:!1,children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},V={args:{children:"I am a dialog content"},render:t=>{const[a,i]=d.useState(!1);return e.jsxs(o.Root,{open:a,onOpenChange:r=>{i(r)},children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,children:[e.jsx(o.Header,{children:e.jsx(o.Title,{children:"Header"})}),e.jsx(o.Body,{...t})]})]})}},L={render:t=>{const a=d.forwardRef(({text:i,tooltipText:r},n)=>e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx("div",{children:e.jsx(m.Trigger,{children:e.jsx(l,{ref:n,children:i})})})}),e.jsx(h.Content,{side:"left",children:r})]}));return a.displayName="ButtonWithTooltip",e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{...t,showUnderlay:!0,children:[e.jsx(o.Body,{children:e.jsxs(Bt,{direction:"column",gap:"8px",align:"flex-start",children:[e.jsxs(m.Root,{children:[e.jsx(m.Trigger,{children:e.jsx(l,{children:"Open flyout"})}),e.jsxs(m.Content,{children:[e.jsx(m.Header,{children:"Header"}),e.jsx(m.Body,{children:"I am a flyout"})]})]}),e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx(l,{children:"I am a tooltip, hover me"})}),e.jsx(h.Content,{side:"left",children:"Tooltip content"})]}),e.jsxs(m.Root,{children:[e.jsx(a,{text:"Open flyout (and I am a tooltip too)",tooltipText:"Tooltip text"}),e.jsxs(m.Content,{children:[e.jsx(m.Header,{children:"Header"}),e.jsx(m.Body,{children:"I am a flyout"})]})]})]})}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})}},$={render:t=>e.jsxs(o.Root,{children:[e.jsx(o.Trigger,{children:e.jsx(l,{children:"Open dialog"})}),e.jsxs(o.Content,{children:[e.jsx(o.Header,{children:e.jsxs(Bt,{justify:"space-between",align:"center",width:"100%",pr:"1rem",children:[e.jsx(o.Title,{children:"Header"}),e.jsx(l,{emphasis:"default",onPress:()=>{alert("Button in the header clicked")},children:"Button in the header"})]})}),e.jsx(o.Body,{...t}),e.jsxs(o.Footer,{children:[e.jsx(l,{emphasis:"default",children:"Cancel"}),e.jsx(l,{children:"Submit"})]})]})]})},U={args:{children:"I am a dialog content"},render:t=>e.jsxs(o.Root,{children:[e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{asChild:!0,children:e.jsx(o.Trigger,{asChild:!0,children:e.jsx(l,{children:"Trigger"})})}),e.jsx(h.Content,{children:"Dropdown tooltip"})]}),e.jsx(o.Content,{children:e.jsx(o.Body,{...t})})]})};var ue,ce,ge;C.parameters={...C.parameters,docs:{...(ue=C.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    children: 'I am a dialog content'
  }
}`,...(ge=(ce=C.parameters)==null?void 0:ce.docs)==null?void 0:ge.source}}};var pe,me,he;y.parameters={...y.parameters,docs:{...(pe=y.parameters)==null?void 0:pe.docs,source:{originalSource:`{
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
}`,...(he=(me=y.parameters)==null?void 0:me.docs)==null?void 0:he.source}}};var fe,De,xe;b.parameters={...b.parameters,docs:{...(fe=b.parameters)==null?void 0:fe.docs,source:{originalSource:`{
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
}`,...(xe=(De=b.parameters)==null?void 0:De.docs)==null?void 0:xe.source}}};var ve,je,Te;B.parameters={...B.parameters,docs:{...(ve=B.parameters)==null?void 0:ve.docs,source:{originalSource:`{
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
}`,...(Te=(je=B.parameters)==null?void 0:je.docs)==null?void 0:Te.source}}};var Ce,ye,be;R.parameters={...R.parameters,docs:{...(Ce=R.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
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
}`,...(be=(ye=R.parameters)==null?void 0:ye.docs)==null?void 0:be.source}}};var Be,Re,qe;q.parameters={...q.parameters,docs:{...(Be=q.parameters)==null?void 0:Be.docs,source:{originalSource:`{
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
}`,...(qe=(Re=q.parameters)==null?void 0:Re.docs)==null?void 0:qe.source}}};var we,Fe,Ne;w.parameters={...w.parameters,docs:{...(we=w.parameters)==null?void 0:we.docs,source:{originalSource:`{
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
}`,...(Ne=(Fe=w.parameters)==null?void 0:Fe.docs)==null?void 0:Ne.source}}};var Se,Ie,Oe;F.parameters={...F.parameters,docs:{...(Se=F.parameters)==null?void 0:Se.docs,source:{originalSource:`{
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
}`,...(Oe=(Ie=F.parameters)==null?void 0:Ie.docs)==null?void 0:Oe.source}}};var He,_e,Ee;N.parameters={...N.parameters,docs:{...(He=N.parameters)==null?void 0:He.docs,source:{originalSource:`{
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
}`,...(Ee=(_e=N.parameters)==null?void 0:_e.docs)==null?void 0:Ee.source}}};var We,Pe,Ae;S.parameters={...S.parameters,docs:{...(We=S.parameters)==null?void 0:We.docs,source:{originalSource:`{
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
}`,...(Ae=(Pe=S.parameters)==null?void 0:Pe.docs)==null?void 0:Ae.source}}};var Me,Ve,Le;I.parameters={...I.parameters,docs:{...(Me=I.parameters)==null?void 0:Me.docs,source:{originalSource:`{
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
}`,...(Le=(Ve=I.parameters)==null?void 0:Ve.docs)==null?void 0:Le.source}}};var $e,Ue,ke;O.parameters={...O.parameters,docs:{...($e=O.parameters)==null?void 0:$e.docs,source:{originalSource:`{
  args: {
    padding: 'none'
  }
}`,...(ke=(Ue=O.parameters)==null?void 0:Ue.docs)==null?void 0:ke.source}}};var Ge,Je,ze;H.parameters={...H.parameters,docs:{...(Ge=H.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
  args: {
    padding: 'tight'
  }
}`,...(ze=(Je=H.parameters)==null?void 0:Je.docs)==null?void 0:ze.source}}};var Ke,Ye,Ze;_.parameters={..._.parameters,docs:{...(Ke=_.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  args: {
    padding: 'compact'
  }
}`,...(Ze=(Ye=_.parameters)==null?void 0:Ye.docs)==null?void 0:Ze.source}}};var Qe,Xe,et;E.parameters={...E.parameters,docs:{...(Qe=E.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
  args: {
    padding: 'comfortable'
  }
}`,...(et=(Xe=E.parameters)==null?void 0:Xe.docs)==null?void 0:et.source}}};var tt,ot,at;W.parameters={...W.parameters,docs:{...(tt=W.parameters)==null?void 0:tt.docs,source:{originalSource:`{
  args: {
    padding: 'spacious'
  }
}`,...(at=(ot=W.parameters)==null?void 0:ot.docs)==null?void 0:at.source}}};var it,rt,nt;P.parameters={...P.parameters,docs:{...(it=P.parameters)==null?void 0:it.docs,source:{originalSource:`{
  args: {
    verticalAlign: 'top'
  }
}`,...(nt=(rt=P.parameters)==null?void 0:rt.docs)==null?void 0:nt.source}}};var st,lt,dt;A.parameters={...A.parameters,docs:{...(st=A.parameters)==null?void 0:st.docs,source:{originalSource:`{
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
}`,...(dt=(lt=A.parameters)==null?void 0:lt.docs)==null?void 0:dt.source}}};var ut,ct,gt;M.parameters={...M.parameters,docs:{...(ut=M.parameters)==null?void 0:ut.docs,source:{originalSource:`{
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
}`,...(gt=(ct=M.parameters)==null?void 0:ct.docs)==null?void 0:gt.source}}};var pt,mt,ht;V.parameters={...V.parameters,docs:{...(pt=V.parameters)==null?void 0:pt.docs,source:{originalSource:`{
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
}`,...(ht=(mt=V.parameters)==null?void 0:mt.docs)==null?void 0:ht.source}}};var ft,Dt,xt;L.parameters={...L.parameters,docs:{...(ft=L.parameters)==null?void 0:ft.docs,source:{originalSource:`{
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
}`,...(xt=(Dt=L.parameters)==null?void 0:Dt.docs)==null?void 0:xt.source}}};var vt,jt,Tt;$.parameters={...$.parameters,docs:{...(vt=$.parameters)==null?void 0:vt.docs,source:{originalSource:`{
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
}`,...(Tt=(jt=$.parameters)==null?void 0:jt.docs)==null?void 0:Tt.source}}};var Ct,yt,bt;U.parameters={...U.parameters,docs:{...(Ct=U.parameters)==null?void 0:Ct.docs,source:{originalSource:`{
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
}`,...(bt=(yt=U.parameters)==null?void 0:yt.docs)==null?void 0:bt.source}}};const ta=["WithFullLayout","WithHeader","WithCloseButton","WithFooter","WithSideContent","WithUnderlay","WithLongText","WithCustomElementForClose","WithAnnouncedDescription","WithCustomElementAnnouncements","WithFocusableContent","WithNoPadding","WithTightPadding","WithCompactPadding","WithComfortablePadding","WithSpaciousPadding","TopAligned","MobileView","WithoutBorders","ControlledComponent","WithFlyoutAndTooltip","WithButtonInTheHeader","WithTooltip"];export{V as ControlledComponent,A as MobileView,P as TopAligned,N as WithAnnouncedDescription,$ as WithButtonInTheHeader,b as WithCloseButton,E as WithComfortablePadding,_ as WithCompactPadding,S as WithCustomElementAnnouncements,F as WithCustomElementForClose,L as WithFlyoutAndTooltip,I as WithFocusableContent,B as WithFooter,C as WithFullLayout,y as WithHeader,w as WithLongText,O as WithNoPadding,R as WithSideContent,W as WithSpaciousPadding,H as WithTightPadding,U as WithTooltip,q as WithUnderlay,M as WithoutBorders,ta as __namedExportsOrder,ea as default};
