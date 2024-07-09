import{r as i}from"./index-BwDkhjyp.js";import{u as B,c as p}from"./index-CtQTvCEI.js";import{u as C,P as D,S as H}from"./index-bQ6N_mn_.js";import{c as V,a as q}from"./index-BWD2N0gV.js";import{u as x}from"./index-KKNPlsPu.js";import{P as z,D as K}from"./index-DqZMU0In.js";import{R as U,h as Y,u as Z,F as J}from"./index-Dnvi1HwD.js";import{P as R}from"./index-CXfIVGy4.js";import{j as s}from"./jsx-runtime-Nms4Y4qS.js";var _="Dialog",[M,Q]=V(_),[X,u]=M(_),h=e=>{const{__scopeDialog:o,children:r,open:a,defaultOpen:n,onOpenChange:t,modal:c=!0}=e,l=i.useRef(null),d=i.useRef(null),[g=!1,v]=B({prop:a,defaultProp:n,onChange:t});return s.jsx(X,{scope:o,triggerRef:l,contentRef:d,contentId:x(),titleId:x(),descriptionId:x(),open:g,onOpenChange:v,onOpenToggle:i.useCallback(()=>v($=>!$),[v]),modal:c,children:r})};h.displayName=_;var F="DialogTrigger",E=i.forwardRef((e,o)=>{const{__scopeDialog:r,...a}=e,n=u(F,r),t=C(o,n.triggerRef);return s.jsx(D.button,{type:"button","aria-haspopup":"dialog","aria-expanded":n.open,"aria-controls":n.contentId,"data-state":A(n.open),...a,ref:t,onClick:p(e.onClick,n.onOpenToggle)})});E.displayName=F;var P="DialogPortal",[ee,S]=M(P,{forceMount:void 0}),y=e=>{const{__scopeDialog:o,forceMount:r,children:a,container:n}=e,t=u(P,o);return s.jsx(ee,{scope:o,forceMount:r,children:i.Children.map(a,c=>s.jsx(R,{present:r||t.open,children:s.jsx(z,{asChild:!0,container:n,children:c})}))})};y.displayName=P;var m="DialogOverlay",O=i.forwardRef((e,o)=>{const r=S(m,e.__scopeDialog),{forceMount:a=r.forceMount,...n}=e,t=u(m,e.__scopeDialog);return t.modal?s.jsx(R,{present:a||t.open,children:s.jsx(te,{...n,ref:o})}):null});O.displayName=m;var te=i.forwardRef((e,o)=>{const{__scopeDialog:r,...a}=e,n=u(m,r);return s.jsx(U,{as:H,allowPinchZoom:!0,shards:[n.contentRef],children:s.jsx(D.div,{"data-state":A(n.open),...a,ref:o,style:{pointerEvents:"auto",...a.style}})})}),f="DialogContent",N=i.forwardRef((e,o)=>{const r=S(f,e.__scopeDialog),{forceMount:a=r.forceMount,...n}=e,t=u(f,e.__scopeDialog);return s.jsx(R,{present:a||t.open,children:t.modal?s.jsx(oe,{...n,ref:o}):s.jsx(ne,{...n,ref:o})})});N.displayName=f;var oe=i.forwardRef((e,o)=>{const r=u(f,e.__scopeDialog),a=i.useRef(null),n=C(o,r.contentRef,a);return i.useEffect(()=>{const t=a.current;if(t)return Y(t)},[]),s.jsx(w,{...e,ref:n,trapFocus:r.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:p(e.onCloseAutoFocus,t=>{var c;t.preventDefault(),(c=r.triggerRef.current)==null||c.focus()}),onPointerDownOutside:p(e.onPointerDownOutside,t=>{const c=t.detail.originalEvent,l=c.button===0&&c.ctrlKey===!0;(c.button===2||l)&&t.preventDefault()}),onFocusOutside:p(e.onFocusOutside,t=>t.preventDefault())})}),ne=i.forwardRef((e,o)=>{const r=u(f,e.__scopeDialog),a=i.useRef(!1),n=i.useRef(!1);return s.jsx(w,{...e,ref:o,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{var c,l;(c=e.onCloseAutoFocus)==null||c.call(e,t),t.defaultPrevented||(a.current||(l=r.triggerRef.current)==null||l.focus(),t.preventDefault()),a.current=!1,n.current=!1},onInteractOutside:t=>{var d,g;(d=e.onInteractOutside)==null||d.call(e,t),t.defaultPrevented||(a.current=!0,t.detail.originalEvent.type==="pointerdown"&&(n.current=!0));const c=t.target;((g=r.triggerRef.current)==null?void 0:g.contains(c))&&t.preventDefault(),t.detail.originalEvent.type==="focusin"&&n.current&&t.preventDefault()}})}),w=i.forwardRef((e,o)=>{const{__scopeDialog:r,trapFocus:a,onOpenAutoFocus:n,onCloseAutoFocus:t,...c}=e,l=u(f,r),d=i.useRef(null),g=C(o,d);return Z(),s.jsxs(s.Fragment,{children:[s.jsx(J,{asChild:!0,loop:!0,trapped:a,onMountAutoFocus:n,onUnmountAutoFocus:t,children:s.jsx(K,{role:"dialog",id:l.contentId,"aria-describedby":l.descriptionId,"aria-labelledby":l.titleId,"data-state":A(l.open),...c,ref:g,onDismiss:()=>l.onOpenChange(!1)})}),s.jsxs(s.Fragment,{children:[s.jsx(ae,{titleId:l.titleId}),s.jsx(ie,{contentRef:d,descriptionId:l.descriptionId})]})]})}),I="DialogTitle",b=i.forwardRef((e,o)=>{const{__scopeDialog:r,...a}=e,n=u(I,r);return s.jsx(D.h2,{id:n.titleId,...a,ref:o})});b.displayName=I;var W="DialogDescription",j=i.forwardRef((e,o)=>{const{__scopeDialog:r,...a}=e,n=u(W,r);return s.jsx(D.p,{id:n.descriptionId,...a,ref:o})});j.displayName=W;var k="DialogClose",T=i.forwardRef((e,o)=>{const{__scopeDialog:r,...a}=e,n=u(k,r);return s.jsx(D.button,{type:"button",...a,ref:o,onClick:p(e.onClick,()=>n.onOpenChange(!1))})});T.displayName=k;function A(e){return e?"open":"closed"}var G="DialogTitleWarning",[re,L]=q(G,{contentName:f,titleName:I,docsSlug:"dialog"}),ae=({titleId:e})=>{const o=L(G),r=`\`${o.contentName}\` requires a \`${o.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${o.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${o.docsSlug}`;return i.useEffect(()=>{e&&(document.getElementById(e)||console.error(r))},[r,e]),null},se="DialogDescriptionWarning",ie=({contentRef:e,descriptionId:o})=>{const a=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${L(se).contentName}}.`;return i.useEffect(()=>{var t;const n=(t=e.current)==null?void 0:t.getAttribute("aria-describedby");o&&n&&(document.getElementById(o)||console.warn(a))},[a,e,o]),null},ce=h,le=E,ue=y,de=O,fe=N,ge=b,pe=j,De=T;const ye=Object.freeze(Object.defineProperty({__proto__:null,Close:De,Content:fe,Description:pe,Dialog:h,DialogClose:T,DialogContent:N,DialogDescription:j,DialogOverlay:O,DialogPortal:y,DialogTitle:b,DialogTrigger:E,Overlay:de,Portal:ue,Root:ce,Title:ge,Trigger:le,WarningProvider:re,createDialogScope:Q},Symbol.toStringTag,{value:"Module"}));export{fe as C,pe as D,de as O,ue as P,ce as R,le as T,De as a,ge as b,ye as c};