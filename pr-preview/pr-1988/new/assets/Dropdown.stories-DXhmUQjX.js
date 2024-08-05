import{j as e}from"./jsx-runtime-DBEcOq3S.js";import{r as a}from"./index-DtJulBIN.js";import{d as dn,c as G}from"./fondue-icons324-Bw2AQYl8.js";import{B as v}from"./Button-CeW1VRZi.js";import{c as g,b as ve,u as uo}from"./index-DYI_kRwo.js";import{u as K,P as O,c as po,S as an,d as cn}from"./index-Dhc4yksV.js";import{c as mo}from"./index-P-l_ls5c.js";import{c as ln,a as Io,R as un,I as pn,u as mn}from"./index-DiyasXNA.js";import{D as In,P as wn}from"./index-24aZOQX_.js";import{h as fn,u as gn,F as Dn,R as hn}from"./Combination-DuhGN8JR.js";import{u as re}from"./index-DBH0Kh6a.js";import{c as wo,A as xn,C as Sn,a as vn,R as fo}from"./index-BYh9UA9V.js";import{P as ae}from"./index-RzzeDlDa.js";import{u as Cn}from"./usePreventDialogOverflow-DIodThcc.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-T76WvCte.js";import"./focusStyle-IgMhxCMT.js";import"./index-BqTDQIm7.js";import"./index-CMjj8zSi.js";var Se=["Enter"," "],Mn=["ArrowDown","PageUp","Home"],go=["ArrowUp","PageDown","End"],jn=[...Mn,...go],Rn={ltr:[...Se,"ArrowRight"],rtl:[...Se,"ArrowLeft"]},_n={ltr:["ArrowLeft"],rtl:["ArrowRight"]},q="Menu",[L,Tn,bn]=ln(q),[y,Do]=mo(q,[bn,wo,Io]),V=wo(),ho=Io(),[xo,_]=y(q),[yn,U]=y(q),So=o=>{const{__scopeMenu:t,open:n=!1,children:s,dir:d,onOpenChange:c,modal:l=!0}=o,u=V(t),[I,f]=a.useState(null),m=a.useRef(!1),i=ve(c),w=mn(d);return a.useEffect(()=>{const h=()=>{m.current=!0,document.addEventListener("pointerdown",D,{capture:!0,once:!0}),document.addEventListener("pointermove",D,{capture:!0,once:!0})},D=()=>m.current=!1;return document.addEventListener("keydown",h,{capture:!0}),()=>{document.removeEventListener("keydown",h,{capture:!0}),document.removeEventListener("pointerdown",D,{capture:!0}),document.removeEventListener("pointermove",D,{capture:!0})}},[]),e.jsx(fo,{...u,children:e.jsx(xo,{scope:t,open:n,onOpenChange:i,content:I,onContentChange:f,children:e.jsx(yn,{scope:t,onClose:a.useCallback(()=>i(!1),[i]),isUsingKeyboardRef:m,dir:w,modal:l,children:s})})})};So.displayName=q;var En="MenuAnchor",Ce=a.forwardRef((o,t)=>{const{__scopeMenu:n,...s}=o,d=V(n);return e.jsx(xn,{...d,...s,ref:t})});Ce.displayName=En;var Me="MenuPortal",[Nn,vo]=y(Me,{forceMount:void 0}),Co=o=>{const{__scopeMenu:t,forceMount:n,children:s,container:d}=o,c=_(Me,t);return e.jsx(Nn,{scope:t,forceMount:n,children:e.jsx(ae,{present:n||c.open,children:e.jsx(wn,{asChild:!0,container:d,children:s})})})};Co.displayName=Me;var C="MenuContent",[Pn,je]=y(C),Mo=a.forwardRef((o,t)=>{const n=vo(C,o.__scopeMenu),{forceMount:s=n.forceMount,...d}=o,c=_(C,o.__scopeMenu),l=U(C,o.__scopeMenu);return e.jsx(L.Provider,{scope:o.__scopeMenu,children:e.jsx(ae,{present:s||c.open,children:e.jsx(L.Slot,{scope:o.__scopeMenu,children:l.modal?e.jsx(On,{...d,ref:t}):e.jsx(An,{...d,ref:t})})})})}),On=a.forwardRef((o,t)=>{const n=_(C,o.__scopeMenu),s=a.useRef(null),d=K(t,s);return a.useEffect(()=>{const c=s.current;if(c)return fn(c)},[]),e.jsx(Re,{...o,ref:d,trapFocus:n.open,disableOutsidePointerEvents:n.open,disableOutsideScroll:!0,onFocusOutside:g(o.onFocusOutside,c=>c.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>n.onOpenChange(!1)})}),An=a.forwardRef((o,t)=>{const n=_(C,o.__scopeMenu);return e.jsx(Re,{...o,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>n.onOpenChange(!1)})}),Re=a.forwardRef((o,t)=>{const{__scopeMenu:n,loop:s=!1,trapFocus:d,onOpenAutoFocus:c,onCloseAutoFocus:l,disableOutsidePointerEvents:u,onEntryFocus:I,onEscapeKeyDown:f,onPointerDownOutside:m,onFocusOutside:i,onInteractOutside:w,onDismiss:h,disableOutsideScroll:D,...T}=o,E=_(C,n),A=U(C,n),$=V(n),z=ho(n),Pe=Tn(n),[en,Oe]=a.useState(null),X=a.useRef(null),on=K(t,X,E.onContentChange),Y=a.useRef(0),H=a.useRef(""),nn=a.useRef(0),ge=a.useRef(null),Ae=a.useRef("right"),De=a.useRef(0),tn=D?hn:a.Fragment,rn=D?{as:an,allowPinchZoom:!0}:void 0,sn=p=>{var P,Ge;const S=H.current+p,M=Pe().filter(j=>!j.disabled),R=document.activeElement,he=(P=M.find(j=>j.ref.current===R))==null?void 0:P.textValue,xe=M.map(j=>j.textValue),ke=Xn(xe,S,he),k=(Ge=M.find(j=>j.textValue===ke))==null?void 0:Ge.ref.current;(function j(Fe){H.current=Fe,window.clearTimeout(Y.current),Fe!==""&&(Y.current=window.setTimeout(()=>j(""),1e3))})(S),k&&setTimeout(()=>k.focus())};a.useEffect(()=>()=>window.clearTimeout(Y.current),[]),gn();const N=a.useCallback(p=>{var M,R;return Ae.current===((M=ge.current)==null?void 0:M.side)&&Hn(p,(R=ge.current)==null?void 0:R.area)},[]);return e.jsx(Pn,{scope:n,searchRef:H,onItemEnter:a.useCallback(p=>{N(p)&&p.preventDefault()},[N]),onItemLeave:a.useCallback(p=>{var S;N(p)||((S=X.current)==null||S.focus(),Oe(null))},[N]),onTriggerLeave:a.useCallback(p=>{N(p)&&p.preventDefault()},[N]),pointerGraceTimerRef:nn,onPointerGraceIntentChange:a.useCallback(p=>{ge.current=p},[]),children:e.jsx(tn,{...rn,children:e.jsx(Dn,{asChild:!0,trapped:d,onMountAutoFocus:g(c,p=>{var S;p.preventDefault(),(S=X.current)==null||S.focus({preventScroll:!0})}),onUnmountAutoFocus:l,children:e.jsx(In,{asChild:!0,disableOutsidePointerEvents:u,onEscapeKeyDown:f,onPointerDownOutside:m,onFocusOutside:i,onInteractOutside:w,onDismiss:h,children:e.jsx(un,{asChild:!0,...z,dir:A.dir,orientation:"vertical",loop:s,currentTabStopId:en,onCurrentTabStopIdChange:Oe,onEntryFocus:g(I,p=>{A.isUsingKeyboardRef.current||p.preventDefault()}),preventScrollOnEntryFocus:!0,children:e.jsx(Sn,{role:"menu","aria-orientation":"vertical","data-state":Ko(E.open),"data-radix-menu-content":"",dir:A.dir,...$,...T,ref:on,style:{outline:"none",...T.style},onKeyDown:g(T.onKeyDown,p=>{const M=p.target.closest("[data-radix-menu-content]")===p.currentTarget,R=p.ctrlKey||p.altKey||p.metaKey,he=p.key.length===1;M&&(p.key==="Tab"&&p.preventDefault(),!R&&he&&sn(p.key));const xe=X.current;if(p.target!==xe||!jn.includes(p.key))return;p.preventDefault();const k=Pe().filter(P=>!P.disabled).map(P=>P.ref.current);go.includes(p.key)&&k.reverse(),$n(k)}),onBlur:g(o.onBlur,p=>{p.currentTarget.contains(p.target)||(window.clearTimeout(Y.current),H.current="")}),onPointerMove:g(o.onPointerMove,B(p=>{const S=p.target,M=De.current!==p.clientX;if(p.currentTarget.contains(S)&&M){const R=p.clientX>De.current?"right":"left";Ae.current=R,De.current=p.clientX}}))})})})})})})});Mo.displayName=C;var kn="MenuGroup",_e=a.forwardRef((o,t)=>{const{__scopeMenu:n,...s}=o;return e.jsx(O.div,{role:"group",...s,ref:t})});_e.displayName=kn;var Gn="MenuLabel",jo=a.forwardRef((o,t)=>{const{__scopeMenu:n,...s}=o;return e.jsx(O.div,{...s,ref:t})});jo.displayName=Gn;var se="MenuItem",Le="menu.itemSelect",ce=a.forwardRef((o,t)=>{const{disabled:n=!1,onSelect:s,...d}=o,c=a.useRef(null),l=U(se,o.__scopeMenu),u=je(se,o.__scopeMenu),I=K(t,c),f=a.useRef(!1),m=()=>{const i=c.current;if(!n&&i){const w=new CustomEvent(Le,{bubbles:!0,cancelable:!0});i.addEventListener(Le,h=>s==null?void 0:s(h),{once:!0}),cn(i,w),w.defaultPrevented?f.current=!1:l.onClose()}};return e.jsx(Ro,{...d,ref:I,disabled:n,onClick:g(o.onClick,m),onPointerDown:i=>{var w;(w=o.onPointerDown)==null||w.call(o,i),f.current=!0},onPointerUp:g(o.onPointerUp,i=>{var w;f.current||(w=i.currentTarget)==null||w.click()}),onKeyDown:g(o.onKeyDown,i=>{const w=u.searchRef.current!=="";n||w&&i.key===" "||Se.includes(i.key)&&(i.currentTarget.click(),i.preventDefault())})})});ce.displayName=se;var Ro=a.forwardRef((o,t)=>{const{__scopeMenu:n,disabled:s=!1,textValue:d,...c}=o,l=je(se,n),u=ho(n),I=a.useRef(null),f=K(t,I),[m,i]=a.useState(!1),[w,h]=a.useState("");return a.useEffect(()=>{const D=I.current;D&&h((D.textContent??"").trim())},[c.children]),e.jsx(L.ItemSlot,{scope:n,disabled:s,textValue:d??w,children:e.jsx(pn,{asChild:!0,...u,focusable:!s,children:e.jsx(O.div,{role:"menuitem","data-highlighted":m?"":void 0,"aria-disabled":s||void 0,"data-disabled":s?"":void 0,...c,ref:f,onPointerMove:g(o.onPointerMove,B(D=>{s?l.onItemLeave(D):(l.onItemEnter(D),D.defaultPrevented||D.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:g(o.onPointerLeave,B(D=>l.onItemLeave(D))),onFocus:g(o.onFocus,()=>i(!0)),onBlur:g(o.onBlur,()=>i(!1))})})})}),Fn="MenuCheckboxItem",_o=a.forwardRef((o,t)=>{const{checked:n=!1,onCheckedChange:s,...d}=o;return e.jsx(No,{scope:o.__scopeMenu,checked:n,children:e.jsx(ce,{role:"menuitemcheckbox","aria-checked":de(n)?"mixed":n,...d,ref:t,"data-state":ye(n),onSelect:g(d.onSelect,()=>s==null?void 0:s(de(n)?!0:!n),{checkForDefaultPrevented:!1})})})});_o.displayName=Fn;var To="MenuRadioGroup",[Ln,Bn]=y(To,{value:void 0,onValueChange:()=>{}}),bo=a.forwardRef((o,t)=>{const{value:n,onValueChange:s,...d}=o,c=ve(s);return e.jsx(Ln,{scope:o.__scopeMenu,value:n,onValueChange:c,children:e.jsx(_e,{...d,ref:t})})});bo.displayName=To;var yo="MenuRadioItem",Eo=a.forwardRef((o,t)=>{const{value:n,...s}=o,d=Bn(yo,o.__scopeMenu),c=n===d.value;return e.jsx(No,{scope:o.__scopeMenu,checked:c,children:e.jsx(ce,{role:"menuitemradio","aria-checked":c,...s,ref:t,"data-state":ye(c),onSelect:g(s.onSelect,()=>{var l;return(l=d.onValueChange)==null?void 0:l.call(d,n)},{checkForDefaultPrevented:!1})})})});Eo.displayName=yo;var Te="MenuItemIndicator",[No,Kn]=y(Te,{checked:!1}),Po=a.forwardRef((o,t)=>{const{__scopeMenu:n,forceMount:s,...d}=o,c=Kn(Te,n);return e.jsx(ae,{present:s||de(c.checked)||c.checked===!0,children:e.jsx(O.span,{...d,ref:t,"data-state":ye(c.checked)})})});Po.displayName=Te;var qn="MenuSeparator",Oo=a.forwardRef((o,t)=>{const{__scopeMenu:n,...s}=o;return e.jsx(O.div,{role:"separator","aria-orientation":"horizontal",...s,ref:t})});Oo.displayName=qn;var Vn="MenuArrow",Ao=a.forwardRef((o,t)=>{const{__scopeMenu:n,...s}=o,d=V(n);return e.jsx(vn,{...d,...s,ref:t})});Ao.displayName=Vn;var be="MenuSub",[Un,ko]=y(be),Go=o=>{const{__scopeMenu:t,children:n,open:s=!1,onOpenChange:d}=o,c=_(be,t),l=V(t),[u,I]=a.useState(null),[f,m]=a.useState(null),i=ve(d);return a.useEffect(()=>(c.open===!1&&i(!1),()=>i(!1)),[c.open,i]),e.jsx(fo,{...l,children:e.jsx(xo,{scope:t,open:s,onOpenChange:i,content:f,onContentChange:m,children:e.jsx(Un,{scope:t,contentId:re(),triggerId:re(),trigger:u,onTriggerChange:I,children:n})})})};Go.displayName=be;var F="MenuSubTrigger",Fo=a.forwardRef((o,t)=>{const n=_(F,o.__scopeMenu),s=U(F,o.__scopeMenu),d=ko(F,o.__scopeMenu),c=je(F,o.__scopeMenu),l=a.useRef(null),{pointerGraceTimerRef:u,onPointerGraceIntentChange:I}=c,f={__scopeMenu:o.__scopeMenu},m=a.useCallback(()=>{l.current&&window.clearTimeout(l.current),l.current=null},[]);return a.useEffect(()=>m,[m]),a.useEffect(()=>{const i=u.current;return()=>{window.clearTimeout(i),I(null)}},[u,I]),e.jsx(Ce,{asChild:!0,...f,children:e.jsx(Ro,{id:d.triggerId,"aria-haspopup":"menu","aria-expanded":n.open,"aria-controls":d.contentId,"data-state":Ko(n.open),...o,ref:po(t,d.onTriggerChange),onClick:i=>{var w;(w=o.onClick)==null||w.call(o,i),!(o.disabled||i.defaultPrevented)&&(i.currentTarget.focus(),n.open||n.onOpenChange(!0))},onPointerMove:g(o.onPointerMove,B(i=>{c.onItemEnter(i),!i.defaultPrevented&&!o.disabled&&!n.open&&!l.current&&(c.onPointerGraceIntentChange(null),l.current=window.setTimeout(()=>{n.onOpenChange(!0),m()},100))})),onPointerLeave:g(o.onPointerLeave,B(i=>{var h,D;m();const w=(h=n.content)==null?void 0:h.getBoundingClientRect();if(w){const T=(D=n.content)==null?void 0:D.dataset.side,E=T==="right",A=E?-5:5,$=w[E?"left":"right"],z=w[E?"right":"left"];c.onPointerGraceIntentChange({area:[{x:i.clientX+A,y:i.clientY},{x:$,y:w.top},{x:z,y:w.top},{x:z,y:w.bottom},{x:$,y:w.bottom}],side:T}),window.clearTimeout(u.current),u.current=window.setTimeout(()=>c.onPointerGraceIntentChange(null),300)}else{if(c.onTriggerLeave(i),i.defaultPrevented)return;c.onPointerGraceIntentChange(null)}})),onKeyDown:g(o.onKeyDown,i=>{var h;const w=c.searchRef.current!=="";o.disabled||w&&i.key===" "||Rn[s.dir].includes(i.key)&&(n.onOpenChange(!0),(h=n.content)==null||h.focus(),i.preventDefault())})})})});Fo.displayName=F;var Lo="MenuSubContent",Bo=a.forwardRef((o,t)=>{const n=vo(C,o.__scopeMenu),{forceMount:s=n.forceMount,...d}=o,c=_(C,o.__scopeMenu),l=U(C,o.__scopeMenu),u=ko(Lo,o.__scopeMenu),I=a.useRef(null),f=K(t,I);return e.jsx(L.Provider,{scope:o.__scopeMenu,children:e.jsx(ae,{present:s||c.open,children:e.jsx(L.Slot,{scope:o.__scopeMenu,children:e.jsx(Re,{id:u.contentId,"aria-labelledby":u.triggerId,...d,ref:f,align:"start",side:l.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:m=>{var i;l.isUsingKeyboardRef.current&&((i=I.current)==null||i.focus()),m.preventDefault()},onCloseAutoFocus:m=>m.preventDefault(),onFocusOutside:g(o.onFocusOutside,m=>{m.target!==u.trigger&&c.onOpenChange(!1)}),onEscapeKeyDown:g(o.onEscapeKeyDown,m=>{l.onClose(),m.preventDefault()}),onKeyDown:g(o.onKeyDown,m=>{var h;const i=m.currentTarget.contains(m.target),w=_n[l.dir].includes(m.key);i&&w&&(c.onOpenChange(!1),(h=u.trigger)==null||h.focus(),m.preventDefault())})})})})})});Bo.displayName=Lo;function Ko(o){return o?"open":"closed"}function de(o){return o==="indeterminate"}function ye(o){return de(o)?"indeterminate":o?"checked":"unchecked"}function $n(o){const t=document.activeElement;for(const n of o)if(n===t||(n.focus(),document.activeElement!==t))return}function zn(o,t){return o.map((n,s)=>o[(t+s)%o.length])}function Xn(o,t,n){const d=t.length>1&&Array.from(t).every(f=>f===t[0])?t[0]:t,c=n?o.indexOf(n):-1;let l=zn(o,Math.max(c,0));d.length===1&&(l=l.filter(f=>f!==n));const I=l.find(f=>f.toLowerCase().startsWith(d.toLowerCase()));return I!==n?I:void 0}function Yn(o,t){const{x:n,y:s}=o;let d=!1;for(let c=0,l=t.length-1;c<t.length;l=c++){const u=t[c].x,I=t[c].y,f=t[l].x,m=t[l].y;I>s!=m>s&&n<(f-u)*(s-I)/(m-I)+u&&(d=!d)}return d}function Hn(o,t){if(!t)return!1;const n={x:o.clientX,y:o.clientY};return Yn(n,t)}function B(o){return t=>t.pointerType==="mouse"?o(t):void 0}var Wn=So,Zn=Ce,Jn=Co,Qn=Mo,et=_e,ot=jo,nt=ce,tt=_o,rt=bo,st=Eo,dt=Po,at=Oo,ct=Ao,it=Go,lt=Fo,ut=Bo,Ee="DropdownMenu",[pt,Sr]=mo(Ee,[Do]),x=Do(),[mt,qo]=pt(Ee),Vo=o=>{const{__scopeDropdownMenu:t,children:n,dir:s,open:d,defaultOpen:c,onOpenChange:l,modal:u=!0}=o,I=x(t),f=a.useRef(null),[m=!1,i]=uo({prop:d,defaultProp:c,onChange:l});return e.jsx(mt,{scope:t,triggerId:re(),triggerRef:f,contentId:re(),open:m,onOpenChange:i,onOpenToggle:a.useCallback(()=>i(w=>!w),[i]),modal:u,children:e.jsx(Wn,{...I,open:m,onOpenChange:i,dir:s,modal:u,children:n})})};Vo.displayName=Ee;var Uo="DropdownMenuTrigger",$o=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,disabled:s=!1,...d}=o,c=qo(Uo,n),l=x(n);return e.jsx(Zn,{asChild:!0,...l,children:e.jsx(O.button,{type:"button",id:c.triggerId,"aria-haspopup":"menu","aria-expanded":c.open,"aria-controls":c.open?c.contentId:void 0,"data-state":c.open?"open":"closed","data-disabled":s?"":void 0,disabled:s,...d,ref:po(t,c.triggerRef),onPointerDown:g(o.onPointerDown,u=>{!s&&u.button===0&&u.ctrlKey===!1&&(c.onOpenToggle(),c.open||u.preventDefault())}),onKeyDown:g(o.onKeyDown,u=>{s||(["Enter"," "].includes(u.key)&&c.onOpenToggle(),u.key==="ArrowDown"&&c.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(u.key)&&u.preventDefault())})})})});$o.displayName=Uo;var It="DropdownMenuPortal",zo=o=>{const{__scopeDropdownMenu:t,...n}=o,s=x(t);return e.jsx(Jn,{...s,...n})};zo.displayName=It;var Xo="DropdownMenuContent",Yo=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=qo(Xo,n),c=x(n),l=a.useRef(!1);return e.jsx(Qn,{id:d.contentId,"aria-labelledby":d.triggerId,...c,...s,ref:t,onCloseAutoFocus:g(o.onCloseAutoFocus,u=>{var I;l.current||(I=d.triggerRef.current)==null||I.focus(),l.current=!1,u.preventDefault()}),onInteractOutside:g(o.onInteractOutside,u=>{const I=u.detail.originalEvent,f=I.button===0&&I.ctrlKey===!0,m=I.button===2||f;(!d.modal||m)&&(l.current=!0)}),style:{...o.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});Yo.displayName=Xo;var wt="DropdownMenuGroup",Ho=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(et,{...d,...s,ref:t})});Ho.displayName=wt;var ft="DropdownMenuLabel",gt=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(ot,{...d,...s,ref:t})});gt.displayName=ft;var Dt="DropdownMenuItem",Wo=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(nt,{...d,...s,ref:t})});Wo.displayName=Dt;var ht="DropdownMenuCheckboxItem",xt=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(tt,{...d,...s,ref:t})});xt.displayName=ht;var St="DropdownMenuRadioGroup",vt=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(rt,{...d,...s,ref:t})});vt.displayName=St;var Ct="DropdownMenuRadioItem",Mt=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(st,{...d,...s,ref:t})});Mt.displayName=Ct;var jt="DropdownMenuItemIndicator",Rt=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(dt,{...d,...s,ref:t})});Rt.displayName=jt;var _t="DropdownMenuSeparator",Tt=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(at,{...d,...s,ref:t})});Tt.displayName=_t;var bt="DropdownMenuArrow",yt=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(ct,{...d,...s,ref:t})});yt.displayName=bt;var Et=o=>{const{__scopeDropdownMenu:t,children:n,open:s,onOpenChange:d,defaultOpen:c}=o,l=x(t),[u=!1,I]=uo({prop:s,defaultProp:c,onChange:d});return e.jsx(it,{...l,open:u,onOpenChange:I,children:n})},Nt="DropdownMenuSubTrigger",Zo=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(lt,{...d,...s,ref:t})});Zo.displayName=Nt;var Pt="DropdownMenuSubContent",Jo=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(ut,{...d,...s,ref:t,style:{...o.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});Jo.displayName=Pt;var Ot=Vo,At=$o,Qo=zo,kt=Yo,Gt=Ho,Ft=Wo,Lt=Et,Bt=Zo,Kt=Jo;const qt="_content_nhom2_5",Vt="_subContent_nhom2_6",Ut="_item_nhom2_17",$t="_subTrigger_nhom2_18",zt="_subMenuIndicator_nhom2_54",Xt="_group_nhom2_68",Yt="_slot_nhom2_75",b={content:qt,subContent:Vt,item:Ut,subTrigger:$t,subMenuIndicator:zt,group:Xt,slot:Yt},ie=({children:o,open:t,onOpenChange:n,"data-test-id":s="fondue-dropdown"})=>e.jsx(Ot,{open:t,onOpenChange:n,"data-test-id":s,children:o});ie.displayName="Dropdown.Root";const le=({children:o,"data-test-id":t="fondue-dropdown-trigger"},n)=>e.jsx(At,{asChild:!0,"data-test-id":t,ref:n,children:o});le.displayName="Dropdown.Trigger";const ue=({children:o,"data-test-id":t="fondue-dropdown-content"},n)=>{const s=a.useRef(null),d=a.useRef(!1),{triggerMaxHeightDefinition:c}=Cn(s);return a.useLayoutEffect(()=>{n&&setTimeout(()=>{typeof n=="function"?n(s.current):n.current=s.current})}),e.jsx(Qo,{children:e.jsx(kt,{align:"start",collisionPadding:8,sideOffset:8,className:b.content,"data-test-id":t,ref:s,onFocus:()=>{d.current||(c(),d.current=!0)},onBlur:()=>{d.current=!1},children:o})})};ue.displayName="Dropdown.Content";const pe=({children:o,"data-test-id":t="fondue-dropdown-group"},n)=>e.jsx(Gt,{className:b.group,"data-test-id":t,ref:n,children:o});pe.displayName="Dropdown.Group";const me=({children:o,"data-test-id":t="fondue-dropdown-submenu"})=>e.jsx(Lt,{"data-test-id":t,children:o});me.displayName="Dropdown.SubMenu";const Ie=({children:o,"data-test-id":t="fondue-dropdown-subtrigger"},n)=>e.jsxs(Bt,{className:b.subTrigger,"data-test-id":t,ref:n,children:[o,e.jsx(dn,{className:b.subMenuIndicator,size:16})]});Ie.displayName="Dropdown.SubTrigger";const we=({children:o,"data-test-id":t="fondue-dropdown-subcontent"},n)=>e.jsx(Qo,{children:e.jsx(Kt,{className:b.subContent,"data-test-id":t,ref:n,children:o})});we.displayName="Dropdown.SubContent";const fe=({children:o,disabled:t,textValue:n,onSelect:s,"data-test-id":d="fondue-dropdown-subtrigger",...c},l)=>e.jsx(Ft,{onSelect:s,className:b.item,textValue:n,"data-test-id":d,ref:l,disabled:t,...c,children:o});fe.displayName="Dropdown.Item";const Ne=({children:o,name:t,"data-test-id":n="fondue-dropdown-slot"},s)=>e.jsx("div",{"data-name":t,className:b.slot,"data-test-id":n,ref:s,children:o});Ne.displayName="Dropdown.Slot";const Ht=a.forwardRef(le),Wt=a.forwardRef(ue),Zt=a.forwardRef(pe),Jt=a.forwardRef(Ie),Qt=a.forwardRef(we),er=a.forwardRef(fe),or=a.forwardRef(Ne),r={Root:ie,Trigger:Ht,Content:Wt,Group:Zt,SubMenu:me,SubTrigger:Jt,SubContent:Qt,Item:er,Slot:or};ie.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Root",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},open:{required:!1,tsType:{name:"boolean"},description:"Controls the open state of the dropdown."},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Callback that is called when the open state of the dropdown changes."},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown'",computed:!1}}}};le.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Trigger",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-trigger'",computed:!1}}}};ue.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Content",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-content'",computed:!1}}}};pe.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Group",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-group'",computed:!1}}}};me.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubMenu",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-submenu'",computed:!1}}}};Ie.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubTrigger",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subtrigger'",computed:!1}}}};we.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubContent",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subcontent'",computed:!1}}}};fe.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Item",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"Disables the item."},textValue:{required:!1,tsType:{name:"string"},description:"The text value of the item that is passed to the onSelect callback."},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(event: Event) => void",signature:{arguments:[{type:{name:"Event"},name:"event"}],return:{name:"void"}}},description:"Callback that is called when the item is selected."},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subtrigger'",computed:!1}}}};Ne.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Slot",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},name:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-slot'",computed:!1}}}};const vr={component:ie,subcomponents:{"Dropdown.Trigger":le,"Dropdown.Content":ue,"Dropdown.Item":fe,"Dropdown.Group":pe,"Dropdown.SubMenu":me,"Dropdown.SubTrigger":Ie,"Dropdown.SubContent":we},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{}},W={render:({...o})=>e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})},Z={render:({...o})=>e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},disabled:!0,children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})},J={render:({...o})=>e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsxs(r.Group,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4"})]}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"})]})]})},Q={render:({...o})=>e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsxs(r.SubMenu,{children:[e.jsx(r.SubTrigger,{children:"Item 4"}),e.jsxs(r.SubContent,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.3"})]})]}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"})]})]})},ee={render:({...o})=>e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{name:"left",children:e.jsx(G,{size:16})}),"Left decorator"]}),e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{name:"right",children:e.jsx(G,{size:16})}),"Right decorator"]}),e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{children:e.jsx(G,{size:16})}),"Implicit placement left"]}),e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{children:e.jsx(G,{size:16})}),e.jsx(r.Slot,{children:e.jsx(G,{size:16})}),"Implicit placement both"]}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"})]})]})},oe={render:({...o})=>e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:e.jsx("div",{className:"tw-bg-red-50",children:"test bla"})}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})},ne={decorators:[o=>e.jsx("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-w-fit",children:e.jsx(o,{})})],render:({...o})=>{const[t,n]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(v,{onPress:()=>n(!t),children:"External Toggle Dropdown"}),e.jsxs(r.Root,{...o,open:t,onOpenChange:n,children:[e.jsx(r.Trigger,{children:e.jsx(v,{variant:"loud",children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})]})}},te={decorators:[o=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:32},children:e.jsx(o,{})})],parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"300px",height:"272px"}}},defaultViewport:"mobile"}},render:({...o})=>e.jsxs(e.Fragment,{children:[e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{variant:"loud",children:"Trigger 1"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 7"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 8"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 9"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 10"})]})]}),e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{variant:"loud",children:"Trigger 2"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 7"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 8"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 9"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 10"})]})]}),e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{variant:"loud",children:"Trigger 3"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 7"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 8"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 9"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 10"})]})]}),e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{variant:"loud",children:"Trigger 4"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 7"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 8"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 9"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 10"})]})]})]})};var Be,Ke,qe;W.parameters={...W.parameters,docs:{...(Be=W.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
}`,...(qe=(Ke=W.parameters)==null?void 0:Ke.docs)==null?void 0:qe.source}}};var Ve,Ue,$e;Z.parameters={...Z.parameters,docs:{...(Ve=Z.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}} disabled>
                    Item 2
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
}`,...($e=(Ue=Z.parameters)==null?void 0:Ue.docs)==null?void 0:$e.source}}};var ze,Xe,Ye;J.parameters={...J.parameters,docs:{...(ze=J.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Group>
                    <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Item 4</Dropdown.Item>
                </Dropdown.Group>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
}`,...(Ye=(Xe=J.parameters)==null?void 0:Xe.docs)==null?void 0:Ye.source}}};var He,We,Ze;Q.parameters={...Q.parameters,docs:{...(He=Q.parameters)==null?void 0:He.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.SubMenu>
                    <Dropdown.SubTrigger>Item 4</Dropdown.SubTrigger>
                    <Dropdown.SubContent>
                        <Dropdown.Item onSelect={() => {}}>Item 4.1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.3</Dropdown.Item>
                    </Dropdown.SubContent>
                </Dropdown.SubMenu>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
}`,...(Ze=(We=Q.parameters)==null?void 0:We.docs)==null?void 0:Ze.source}}};var Je,Qe,eo;ee.parameters={...ee.parameters,docs:{...(Je=ee.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>
                    <Dropdown.Slot name="left">
                        <IconIcon size={16} />
                    </Dropdown.Slot>
                    Left decorator
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>
                    <Dropdown.Slot name="right">
                        <IconIcon size={16} />
                    </Dropdown.Slot>
                    Right decorator
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>
                    <Dropdown.Slot>
                        <IconIcon size={16} />
                    </Dropdown.Slot>
                    Implicit placement left
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>
                    <Dropdown.Slot>
                        <IconIcon size={16} />
                    </Dropdown.Slot>
                    <Dropdown.Slot>
                        <IconIcon size={16} />
                    </Dropdown.Slot>
                    Implicit placement both
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
}`,...(eo=(Qe=ee.parameters)==null?void 0:Qe.docs)==null?void 0:eo.source}}};var oo,no,to;oe.parameters={...oe.parameters,docs:{...(oo=oe.parameters)==null?void 0:oo.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>
                    <div className="tw-bg-red-50">test bla</div>
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
}`,...(to=(no=oe.parameters)==null?void 0:no.docs)==null?void 0:to.source}}};var ro,so,ao;ne.parameters={...ne.parameters,docs:{...(ro=ne.parameters)==null?void 0:ro.docs,source:{originalSource:`{
  decorators: [Story => <div className="tw-flex tw-flex-col tw-gap-2 tw-w-fit">
                <Story />
            </div>],
  render: ({
    ...args
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
                <Button onPress={() => setIsOpen(!isOpen)}>External Toggle Dropdown</Button>
                <Dropdown.Root {...args} open={isOpen} onOpenChange={setIsOpen}>
                    <Dropdown.Trigger>
                        <Button variant="loud">Trigger</Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            </>;
  }
}`,...(ao=(so=ne.parameters)==null?void 0:so.docs)==null?void 0:ao.source}}};var co,io,lo;te.parameters={...te.parameters,docs:{...(co=te.parameters)==null?void 0:co.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 32
  }}>
                <Story />
            </div>],
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '300px',
            height: '272px'
          }
        }
      },
      defaultViewport: 'mobile'
    }
  },
  render: ({
    ...args
  }) => {
    return <>
                <Dropdown.Root {...args}>
                    <Dropdown.Trigger>
                        <Button variant="loud">Trigger 1</Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 7</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 8</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 9</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 10</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
                <Dropdown.Root {...args}>
                    <Dropdown.Trigger>
                        <Button variant="loud">Trigger 2</Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 7</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 8</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 9</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 10</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
                <Dropdown.Root {...args}>
                    <Dropdown.Trigger>
                        <Button variant="loud">Trigger 3</Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 7</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 8</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 9</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 10</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
                <Dropdown.Root {...args}>
                    <Dropdown.Trigger>
                        <Button variant="loud">Trigger 4</Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 7</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 8</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 9</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 10</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            </>;
  }
}`,...(lo=(io=te.parameters)==null?void 0:io.docs)==null?void 0:lo.source}}};const Cr=["Default","DisabledItems","ItemGroups","SubMenus","Decorator","CustomItem","ControlledComponent","Overflow"];export{ne as ControlledComponent,oe as CustomItem,ee as Decorator,W as Default,Z as DisabledItems,J as ItemGroups,te as Overflow,Q as SubMenus,Cr as __namedExportsOrder,vr as default};
