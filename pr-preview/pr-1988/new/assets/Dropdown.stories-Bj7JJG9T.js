import{j as e}from"./jsx-runtime-DBEcOq3S.js";import{r as a}from"./index-DtJulBIN.js";import{d as an,c as F}from"./fondue-icons324-Bw2AQYl8.js";import{B as v}from"./Button-CeW1VRZi.js";import{c as g,b as ve,u as po}from"./index-DYI_kRwo.js";import{u as K,P as O,c as mo,S as cn,d as ln}from"./index-Dhc4yksV.js";import{c as Io}from"./index-P-l_ls5c.js";import{c as un,a as wo,R as pn,I as mn,u as In}from"./index-DiyasXNA.js";import{D as wn,P as fn}from"./index-24aZOQX_.js";import{h as gn,u as Dn,F as hn,R as xn}from"./Combination-DuhGN8JR.js";import{u as re}from"./index-DBH0Kh6a.js";import{c as fo,A as Sn,C as vn,a as Cn,R as go}from"./index-BYh9UA9V.js";import{P as ae}from"./index-RzzeDlDa.js";import{u as Mn,s as Le}from"./usePreventDropdownOverflow-BbhSVJTt.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-T76WvCte.js";import"./focusStyle-IgMhxCMT.js";import"./index-BqTDQIm7.js";import"./index-CMjj8zSi.js";var Se=["Enter"," "],jn=["ArrowDown","PageUp","Home"],Do=["ArrowUp","PageDown","End"],Rn=[...jn,...Do],_n={ltr:[...Se,"ArrowRight"],rtl:[...Se,"ArrowLeft"]},Tn={ltr:["ArrowLeft"],rtl:["ArrowRight"]},q="Menu",[L,bn,yn]=un(q),[y,ho]=Io(q,[yn,fo,wo]),V=fo(),xo=wo(),[So,_]=y(q),[Nn,U]=y(q),vo=o=>{const{__scopeMenu:t,open:n=!1,children:s,dir:d,onOpenChange:c,modal:l=!0}=o,u=V(t),[I,f]=a.useState(null),m=a.useRef(!1),i=ve(c),w=In(d);return a.useEffect(()=>{const h=()=>{m.current=!0,document.addEventListener("pointerdown",D,{capture:!0,once:!0}),document.addEventListener("pointermove",D,{capture:!0,once:!0})},D=()=>m.current=!1;return document.addEventListener("keydown",h,{capture:!0}),()=>{document.removeEventListener("keydown",h,{capture:!0}),document.removeEventListener("pointerdown",D,{capture:!0}),document.removeEventListener("pointermove",D,{capture:!0})}},[]),e.jsx(go,{...u,children:e.jsx(So,{scope:t,open:n,onOpenChange:i,content:I,onContentChange:f,children:e.jsx(Nn,{scope:t,onClose:a.useCallback(()=>i(!1),[i]),isUsingKeyboardRef:m,dir:w,modal:l,children:s})})})};vo.displayName=q;var En="MenuAnchor",Ce=a.forwardRef((o,t)=>{const{__scopeMenu:n,...s}=o,d=V(n);return e.jsx(Sn,{...d,...s,ref:t})});Ce.displayName=En;var Me="MenuPortal",[Pn,Co]=y(Me,{forceMount:void 0}),Mo=o=>{const{__scopeMenu:t,forceMount:n,children:s,container:d}=o,c=_(Me,t);return e.jsx(Pn,{scope:t,forceMount:n,children:e.jsx(ae,{present:n||c.open,children:e.jsx(fn,{asChild:!0,container:d,children:s})})})};Mo.displayName=Me;var C="MenuContent",[On,je]=y(C),jo=a.forwardRef((o,t)=>{const n=Co(C,o.__scopeMenu),{forceMount:s=n.forceMount,...d}=o,c=_(C,o.__scopeMenu),l=U(C,o.__scopeMenu);return e.jsx(L.Provider,{scope:o.__scopeMenu,children:e.jsx(ae,{present:s||c.open,children:e.jsx(L.Slot,{scope:o.__scopeMenu,children:l.modal?e.jsx(An,{...d,ref:t}):e.jsx(kn,{...d,ref:t})})})})}),An=a.forwardRef((o,t)=>{const n=_(C,o.__scopeMenu),s=a.useRef(null),d=K(t,s);return a.useEffect(()=>{const c=s.current;if(c)return gn(c)},[]),e.jsx(Re,{...o,ref:d,trapFocus:n.open,disableOutsidePointerEvents:n.open,disableOutsideScroll:!0,onFocusOutside:g(o.onFocusOutside,c=>c.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>n.onOpenChange(!1)})}),kn=a.forwardRef((o,t)=>{const n=_(C,o.__scopeMenu);return e.jsx(Re,{...o,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>n.onOpenChange(!1)})}),Re=a.forwardRef((o,t)=>{const{__scopeMenu:n,loop:s=!1,trapFocus:d,onOpenAutoFocus:c,onCloseAutoFocus:l,disableOutsidePointerEvents:u,onEntryFocus:I,onEscapeKeyDown:f,onPointerDownOutside:m,onFocusOutside:i,onInteractOutside:w,onDismiss:h,disableOutsideScroll:D,...T}=o,N=_(C,n),A=U(C,n),$=V(n),z=xo(n),Pe=bn(n),[on,Oe]=a.useState(null),X=a.useRef(null),nn=K(t,X,N.onContentChange),Y=a.useRef(0),H=a.useRef(""),tn=a.useRef(0),ge=a.useRef(null),Ae=a.useRef("right"),De=a.useRef(0),rn=D?xn:a.Fragment,sn=D?{as:cn,allowPinchZoom:!0}:void 0,dn=p=>{var P,Fe;const S=H.current+p,M=Pe().filter(j=>!j.disabled),R=document.activeElement,he=(P=M.find(j=>j.ref.current===R))==null?void 0:P.textValue,xe=M.map(j=>j.textValue),ke=Yn(xe,S,he),k=(Fe=M.find(j=>j.textValue===ke))==null?void 0:Fe.ref.current;(function j(Ge){H.current=Ge,window.clearTimeout(Y.current),Ge!==""&&(Y.current=window.setTimeout(()=>j(""),1e3))})(S),k&&setTimeout(()=>k.focus())};a.useEffect(()=>()=>window.clearTimeout(Y.current),[]),Dn();const E=a.useCallback(p=>{var M,R;return Ae.current===((M=ge.current)==null?void 0:M.side)&&Wn(p,(R=ge.current)==null?void 0:R.area)},[]);return e.jsx(On,{scope:n,searchRef:H,onItemEnter:a.useCallback(p=>{E(p)&&p.preventDefault()},[E]),onItemLeave:a.useCallback(p=>{var S;E(p)||((S=X.current)==null||S.focus(),Oe(null))},[E]),onTriggerLeave:a.useCallback(p=>{E(p)&&p.preventDefault()},[E]),pointerGraceTimerRef:tn,onPointerGraceIntentChange:a.useCallback(p=>{ge.current=p},[]),children:e.jsx(rn,{...sn,children:e.jsx(hn,{asChild:!0,trapped:d,onMountAutoFocus:g(c,p=>{var S;p.preventDefault(),(S=X.current)==null||S.focus({preventScroll:!0})}),onUnmountAutoFocus:l,children:e.jsx(wn,{asChild:!0,disableOutsidePointerEvents:u,onEscapeKeyDown:f,onPointerDownOutside:m,onFocusOutside:i,onInteractOutside:w,onDismiss:h,children:e.jsx(pn,{asChild:!0,...z,dir:A.dir,orientation:"vertical",loop:s,currentTabStopId:on,onCurrentTabStopIdChange:Oe,onEntryFocus:g(I,p=>{A.isUsingKeyboardRef.current||p.preventDefault()}),preventScrollOnEntryFocus:!0,children:e.jsx(vn,{role:"menu","aria-orientation":"vertical","data-state":qo(N.open),"data-radix-menu-content":"",dir:A.dir,...$,...T,ref:nn,style:{outline:"none",...T.style},onKeyDown:g(T.onKeyDown,p=>{const M=p.target.closest("[data-radix-menu-content]")===p.currentTarget,R=p.ctrlKey||p.altKey||p.metaKey,he=p.key.length===1;M&&(p.key==="Tab"&&p.preventDefault(),!R&&he&&dn(p.key));const xe=X.current;if(p.target!==xe||!Rn.includes(p.key))return;p.preventDefault();const k=Pe().filter(P=>!P.disabled).map(P=>P.ref.current);Do.includes(p.key)&&k.reverse(),zn(k)}),onBlur:g(o.onBlur,p=>{p.currentTarget.contains(p.target)||(window.clearTimeout(Y.current),H.current="")}),onPointerMove:g(o.onPointerMove,B(p=>{const S=p.target,M=De.current!==p.clientX;if(p.currentTarget.contains(S)&&M){const R=p.clientX>De.current?"right":"left";Ae.current=R,De.current=p.clientX}}))})})})})})})});jo.displayName=C;var Fn="MenuGroup",_e=a.forwardRef((o,t)=>{const{__scopeMenu:n,...s}=o;return e.jsx(O.div,{role:"group",...s,ref:t})});_e.displayName=Fn;var Gn="MenuLabel",Ro=a.forwardRef((o,t)=>{const{__scopeMenu:n,...s}=o;return e.jsx(O.div,{...s,ref:t})});Ro.displayName=Gn;var se="MenuItem",Be="menu.itemSelect",ce=a.forwardRef((o,t)=>{const{disabled:n=!1,onSelect:s,...d}=o,c=a.useRef(null),l=U(se,o.__scopeMenu),u=je(se,o.__scopeMenu),I=K(t,c),f=a.useRef(!1),m=()=>{const i=c.current;if(!n&&i){const w=new CustomEvent(Be,{bubbles:!0,cancelable:!0});i.addEventListener(Be,h=>s==null?void 0:s(h),{once:!0}),ln(i,w),w.defaultPrevented?f.current=!1:l.onClose()}};return e.jsx(_o,{...d,ref:I,disabled:n,onClick:g(o.onClick,m),onPointerDown:i=>{var w;(w=o.onPointerDown)==null||w.call(o,i),f.current=!0},onPointerUp:g(o.onPointerUp,i=>{var w;f.current||(w=i.currentTarget)==null||w.click()}),onKeyDown:g(o.onKeyDown,i=>{const w=u.searchRef.current!=="";n||w&&i.key===" "||Se.includes(i.key)&&(i.currentTarget.click(),i.preventDefault())})})});ce.displayName=se;var _o=a.forwardRef((o,t)=>{const{__scopeMenu:n,disabled:s=!1,textValue:d,...c}=o,l=je(se,n),u=xo(n),I=a.useRef(null),f=K(t,I),[m,i]=a.useState(!1),[w,h]=a.useState("");return a.useEffect(()=>{const D=I.current;D&&h((D.textContent??"").trim())},[c.children]),e.jsx(L.ItemSlot,{scope:n,disabled:s,textValue:d??w,children:e.jsx(mn,{asChild:!0,...u,focusable:!s,children:e.jsx(O.div,{role:"menuitem","data-highlighted":m?"":void 0,"aria-disabled":s||void 0,"data-disabled":s?"":void 0,...c,ref:f,onPointerMove:g(o.onPointerMove,B(D=>{s?l.onItemLeave(D):(l.onItemEnter(D),D.defaultPrevented||D.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:g(o.onPointerLeave,B(D=>l.onItemLeave(D))),onFocus:g(o.onFocus,()=>i(!0)),onBlur:g(o.onBlur,()=>i(!1))})})})}),Ln="MenuCheckboxItem",To=a.forwardRef((o,t)=>{const{checked:n=!1,onCheckedChange:s,...d}=o;return e.jsx(Po,{scope:o.__scopeMenu,checked:n,children:e.jsx(ce,{role:"menuitemcheckbox","aria-checked":de(n)?"mixed":n,...d,ref:t,"data-state":ye(n),onSelect:g(d.onSelect,()=>s==null?void 0:s(de(n)?!0:!n),{checkForDefaultPrevented:!1})})})});To.displayName=Ln;var bo="MenuRadioGroup",[Bn,Kn]=y(bo,{value:void 0,onValueChange:()=>{}}),yo=a.forwardRef((o,t)=>{const{value:n,onValueChange:s,...d}=o,c=ve(s);return e.jsx(Bn,{scope:o.__scopeMenu,value:n,onValueChange:c,children:e.jsx(_e,{...d,ref:t})})});yo.displayName=bo;var No="MenuRadioItem",Eo=a.forwardRef((o,t)=>{const{value:n,...s}=o,d=Kn(No,o.__scopeMenu),c=n===d.value;return e.jsx(Po,{scope:o.__scopeMenu,checked:c,children:e.jsx(ce,{role:"menuitemradio","aria-checked":c,...s,ref:t,"data-state":ye(c),onSelect:g(s.onSelect,()=>{var l;return(l=d.onValueChange)==null?void 0:l.call(d,n)},{checkForDefaultPrevented:!1})})})});Eo.displayName=No;var Te="MenuItemIndicator",[Po,qn]=y(Te,{checked:!1}),Oo=a.forwardRef((o,t)=>{const{__scopeMenu:n,forceMount:s,...d}=o,c=qn(Te,n);return e.jsx(ae,{present:s||de(c.checked)||c.checked===!0,children:e.jsx(O.span,{...d,ref:t,"data-state":ye(c.checked)})})});Oo.displayName=Te;var Vn="MenuSeparator",Ao=a.forwardRef((o,t)=>{const{__scopeMenu:n,...s}=o;return e.jsx(O.div,{role:"separator","aria-orientation":"horizontal",...s,ref:t})});Ao.displayName=Vn;var Un="MenuArrow",ko=a.forwardRef((o,t)=>{const{__scopeMenu:n,...s}=o,d=V(n);return e.jsx(Cn,{...d,...s,ref:t})});ko.displayName=Un;var be="MenuSub",[$n,Fo]=y(be),Go=o=>{const{__scopeMenu:t,children:n,open:s=!1,onOpenChange:d}=o,c=_(be,t),l=V(t),[u,I]=a.useState(null),[f,m]=a.useState(null),i=ve(d);return a.useEffect(()=>(c.open===!1&&i(!1),()=>i(!1)),[c.open,i]),e.jsx(go,{...l,children:e.jsx(So,{scope:t,open:s,onOpenChange:i,content:f,onContentChange:m,children:e.jsx($n,{scope:t,contentId:re(),triggerId:re(),trigger:u,onTriggerChange:I,children:n})})})};Go.displayName=be;var G="MenuSubTrigger",Lo=a.forwardRef((o,t)=>{const n=_(G,o.__scopeMenu),s=U(G,o.__scopeMenu),d=Fo(G,o.__scopeMenu),c=je(G,o.__scopeMenu),l=a.useRef(null),{pointerGraceTimerRef:u,onPointerGraceIntentChange:I}=c,f={__scopeMenu:o.__scopeMenu},m=a.useCallback(()=>{l.current&&window.clearTimeout(l.current),l.current=null},[]);return a.useEffect(()=>m,[m]),a.useEffect(()=>{const i=u.current;return()=>{window.clearTimeout(i),I(null)}},[u,I]),e.jsx(Ce,{asChild:!0,...f,children:e.jsx(_o,{id:d.triggerId,"aria-haspopup":"menu","aria-expanded":n.open,"aria-controls":d.contentId,"data-state":qo(n.open),...o,ref:mo(t,d.onTriggerChange),onClick:i=>{var w;(w=o.onClick)==null||w.call(o,i),!(o.disabled||i.defaultPrevented)&&(i.currentTarget.focus(),n.open||n.onOpenChange(!0))},onPointerMove:g(o.onPointerMove,B(i=>{c.onItemEnter(i),!i.defaultPrevented&&!o.disabled&&!n.open&&!l.current&&(c.onPointerGraceIntentChange(null),l.current=window.setTimeout(()=>{n.onOpenChange(!0),m()},100))})),onPointerLeave:g(o.onPointerLeave,B(i=>{var h,D;m();const w=(h=n.content)==null?void 0:h.getBoundingClientRect();if(w){const T=(D=n.content)==null?void 0:D.dataset.side,N=T==="right",A=N?-5:5,$=w[N?"left":"right"],z=w[N?"right":"left"];c.onPointerGraceIntentChange({area:[{x:i.clientX+A,y:i.clientY},{x:$,y:w.top},{x:z,y:w.top},{x:z,y:w.bottom},{x:$,y:w.bottom}],side:T}),window.clearTimeout(u.current),u.current=window.setTimeout(()=>c.onPointerGraceIntentChange(null),300)}else{if(c.onTriggerLeave(i),i.defaultPrevented)return;c.onPointerGraceIntentChange(null)}})),onKeyDown:g(o.onKeyDown,i=>{var h;const w=c.searchRef.current!=="";o.disabled||w&&i.key===" "||_n[s.dir].includes(i.key)&&(n.onOpenChange(!0),(h=n.content)==null||h.focus(),i.preventDefault())})})})});Lo.displayName=G;var Bo="MenuSubContent",Ko=a.forwardRef((o,t)=>{const n=Co(C,o.__scopeMenu),{forceMount:s=n.forceMount,...d}=o,c=_(C,o.__scopeMenu),l=U(C,o.__scopeMenu),u=Fo(Bo,o.__scopeMenu),I=a.useRef(null),f=K(t,I);return e.jsx(L.Provider,{scope:o.__scopeMenu,children:e.jsx(ae,{present:s||c.open,children:e.jsx(L.Slot,{scope:o.__scopeMenu,children:e.jsx(Re,{id:u.contentId,"aria-labelledby":u.triggerId,...d,ref:f,align:"start",side:l.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:m=>{var i;l.isUsingKeyboardRef.current&&((i=I.current)==null||i.focus()),m.preventDefault()},onCloseAutoFocus:m=>m.preventDefault(),onFocusOutside:g(o.onFocusOutside,m=>{m.target!==u.trigger&&c.onOpenChange(!1)}),onEscapeKeyDown:g(o.onEscapeKeyDown,m=>{l.onClose(),m.preventDefault()}),onKeyDown:g(o.onKeyDown,m=>{var h;const i=m.currentTarget.contains(m.target),w=Tn[l.dir].includes(m.key);i&&w&&(c.onOpenChange(!1),(h=u.trigger)==null||h.focus(),m.preventDefault())})})})})})});Ko.displayName=Bo;function qo(o){return o?"open":"closed"}function de(o){return o==="indeterminate"}function ye(o){return de(o)?"indeterminate":o?"checked":"unchecked"}function zn(o){const t=document.activeElement;for(const n of o)if(n===t||(n.focus(),document.activeElement!==t))return}function Xn(o,t){return o.map((n,s)=>o[(t+s)%o.length])}function Yn(o,t,n){const d=t.length>1&&Array.from(t).every(f=>f===t[0])?t[0]:t,c=n?o.indexOf(n):-1;let l=Xn(o,Math.max(c,0));d.length===1&&(l=l.filter(f=>f!==n));const I=l.find(f=>f.toLowerCase().startsWith(d.toLowerCase()));return I!==n?I:void 0}function Hn(o,t){const{x:n,y:s}=o;let d=!1;for(let c=0,l=t.length-1;c<t.length;l=c++){const u=t[c].x,I=t[c].y,f=t[l].x,m=t[l].y;I>s!=m>s&&n<(f-u)*(s-I)/(m-I)+u&&(d=!d)}return d}function Wn(o,t){if(!t)return!1;const n={x:o.clientX,y:o.clientY};return Hn(n,t)}function B(o){return t=>t.pointerType==="mouse"?o(t):void 0}var Zn=vo,Jn=Ce,Qn=Mo,et=jo,ot=_e,nt=Ro,tt=ce,rt=To,st=yo,dt=Eo,at=Oo,ct=Ao,it=ko,lt=Go,ut=Lo,pt=Ko,Ne="DropdownMenu",[mt,vr]=Io(Ne,[ho]),x=ho(),[It,Vo]=mt(Ne),Uo=o=>{const{__scopeDropdownMenu:t,children:n,dir:s,open:d,defaultOpen:c,onOpenChange:l,modal:u=!0}=o,I=x(t),f=a.useRef(null),[m=!1,i]=po({prop:d,defaultProp:c,onChange:l});return e.jsx(It,{scope:t,triggerId:re(),triggerRef:f,contentId:re(),open:m,onOpenChange:i,onOpenToggle:a.useCallback(()=>i(w=>!w),[i]),modal:u,children:e.jsx(Zn,{...I,open:m,onOpenChange:i,dir:s,modal:u,children:n})})};Uo.displayName=Ne;var $o="DropdownMenuTrigger",zo=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,disabled:s=!1,...d}=o,c=Vo($o,n),l=x(n);return e.jsx(Jn,{asChild:!0,...l,children:e.jsx(O.button,{type:"button",id:c.triggerId,"aria-haspopup":"menu","aria-expanded":c.open,"aria-controls":c.open?c.contentId:void 0,"data-state":c.open?"open":"closed","data-disabled":s?"":void 0,disabled:s,...d,ref:mo(t,c.triggerRef),onPointerDown:g(o.onPointerDown,u=>{!s&&u.button===0&&u.ctrlKey===!1&&(c.onOpenToggle(),c.open||u.preventDefault())}),onKeyDown:g(o.onKeyDown,u=>{s||(["Enter"," "].includes(u.key)&&c.onOpenToggle(),u.key==="ArrowDown"&&c.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(u.key)&&u.preventDefault())})})})});zo.displayName=$o;var wt="DropdownMenuPortal",Xo=o=>{const{__scopeDropdownMenu:t,...n}=o,s=x(t);return e.jsx(Qn,{...s,...n})};Xo.displayName=wt;var Yo="DropdownMenuContent",Ho=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=Vo(Yo,n),c=x(n),l=a.useRef(!1);return e.jsx(et,{id:d.contentId,"aria-labelledby":d.triggerId,...c,...s,ref:t,onCloseAutoFocus:g(o.onCloseAutoFocus,u=>{var I;l.current||(I=d.triggerRef.current)==null||I.focus(),l.current=!1,u.preventDefault()}),onInteractOutside:g(o.onInteractOutside,u=>{const I=u.detail.originalEvent,f=I.button===0&&I.ctrlKey===!0,m=I.button===2||f;(!d.modal||m)&&(l.current=!0)}),style:{...o.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});Ho.displayName=Yo;var ft="DropdownMenuGroup",Wo=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(ot,{...d,...s,ref:t})});Wo.displayName=ft;var gt="DropdownMenuLabel",Dt=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(nt,{...d,...s,ref:t})});Dt.displayName=gt;var ht="DropdownMenuItem",Zo=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(tt,{...d,...s,ref:t})});Zo.displayName=ht;var xt="DropdownMenuCheckboxItem",St=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(rt,{...d,...s,ref:t})});St.displayName=xt;var vt="DropdownMenuRadioGroup",Ct=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(st,{...d,...s,ref:t})});Ct.displayName=vt;var Mt="DropdownMenuRadioItem",jt=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(dt,{...d,...s,ref:t})});jt.displayName=Mt;var Rt="DropdownMenuItemIndicator",_t=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(at,{...d,...s,ref:t})});_t.displayName=Rt;var Tt="DropdownMenuSeparator",bt=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(ct,{...d,...s,ref:t})});bt.displayName=Tt;var yt="DropdownMenuArrow",Nt=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(it,{...d,...s,ref:t})});Nt.displayName=yt;var Et=o=>{const{__scopeDropdownMenu:t,children:n,open:s,onOpenChange:d,defaultOpen:c}=o,l=x(t),[u=!1,I]=po({prop:s,defaultProp:c,onChange:d});return e.jsx(lt,{...l,open:u,onOpenChange:I,children:n})},Pt="DropdownMenuSubTrigger",Jo=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(ut,{...d,...s,ref:t})});Jo.displayName=Pt;var Ot="DropdownMenuSubContent",Qo=a.forwardRef((o,t)=>{const{__scopeDropdownMenu:n,...s}=o,d=x(n);return e.jsx(pt,{...d,...s,ref:t,style:{...o.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});Qo.displayName=Ot;var At=Uo,kt=zo,en=Xo,Ft=Ho,Gt=Wo,Lt=Zo,Bt=Et,Kt=Jo,qt=Qo;const Vt="_content_nhom2_5",Ut="_subContent_nhom2_6",$t="_item_nhom2_17",zt="_subTrigger_nhom2_18",Xt="_subMenuIndicator_nhom2_54",Yt="_group_nhom2_68",Ht="_slot_nhom2_75",b={content:Vt,subContent:Ut,item:$t,subTrigger:zt,subMenuIndicator:Xt,group:Yt,slot:Ht},ie=({children:o,open:t,onOpenChange:n,"data-test-id":s="fondue-dropdown"})=>e.jsx(At,{open:t,onOpenChange:n,"data-test-id":s,children:o});ie.displayName="Dropdown.Root";const le=({children:o,"data-test-id":t="fondue-dropdown-trigger"},n)=>e.jsx(kt,{asChild:!0,"data-test-id":t,ref:n,children:o});le.displayName="Dropdown.Trigger";const ue=({onOpen:o,onClose:t,children:n,"data-test-id":s="fondue-dropdown-content"},d)=>{const c=a.useRef(null),l=a.useRef(!1),{setMaxHeight:u}=Mn(c);return e.jsx(en,{children:e.jsx(Ft,{align:"start",collisionPadding:8,sideOffset:8,className:b.content,"data-test-id":s,ref:c,onCloseAutoFocus:()=>{Le(c,d),t&&t(),l.current=!1},onFocus:()=>{if(!l.current){u(),Le(c,d);debugger;o&&o(),l.current=!0}},children:n})})};ue.displayName="Dropdown.Content";const pe=({children:o,"data-test-id":t="fondue-dropdown-group"},n)=>e.jsx(Gt,{className:b.group,"data-test-id":t,ref:n,children:o});pe.displayName="Dropdown.Group";const me=({children:o,"data-test-id":t="fondue-dropdown-submenu"})=>e.jsx(Bt,{"data-test-id":t,children:o});me.displayName="Dropdown.SubMenu";const Ie=({children:o,"data-test-id":t="fondue-dropdown-subtrigger"},n)=>e.jsxs(Kt,{className:b.subTrigger,"data-test-id":t,ref:n,children:[o,e.jsx(an,{className:b.subMenuIndicator,size:16})]});Ie.displayName="Dropdown.SubTrigger";const we=({children:o,"data-test-id":t="fondue-dropdown-subcontent"},n)=>e.jsx(en,{children:e.jsx(qt,{className:b.subContent,"data-test-id":t,ref:n,children:o})});we.displayName="Dropdown.SubContent";const fe=({children:o,disabled:t,textValue:n,onSelect:s,"data-test-id":d="fondue-dropdown-subtrigger",...c},l)=>e.jsx(Lt,{onSelect:s,className:b.item,textValue:n,"data-test-id":d,ref:l,disabled:t,...c,children:o});fe.displayName="Dropdown.Item";const Ee=({children:o,name:t,"data-test-id":n="fondue-dropdown-slot"},s)=>e.jsx("div",{"data-name":t,className:b.slot,"data-test-id":n,ref:s,children:o});Ee.displayName="Dropdown.Slot";const Wt=a.forwardRef(le),Zt=a.forwardRef(ue),Jt=a.forwardRef(pe),Qt=a.forwardRef(Ie),er=a.forwardRef(we),or=a.forwardRef(fe),nr=a.forwardRef(Ee),r={Root:ie,Trigger:Wt,Content:Zt,Group:Jt,SubMenu:me,SubTrigger:Qt,SubContent:er,Item:or,Slot:nr};ie.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Root",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},open:{required:!1,tsType:{name:"boolean"},description:"Controls the open state of the dropdown."},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Callback that is called when the open state of the dropdown changes."},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown'",computed:!1}}}};le.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Trigger",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-trigger'",computed:!1}}}};ue.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Content",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-content'",computed:!1}},onOpen:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};pe.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Group",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-group'",computed:!1}}}};me.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubMenu",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-submenu'",computed:!1}}}};Ie.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubTrigger",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subtrigger'",computed:!1}}}};we.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubContent",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subcontent'",computed:!1}}}};fe.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Item",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"Disables the item."},textValue:{required:!1,tsType:{name:"string"},description:"The text value of the item that is passed to the onSelect callback."},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(event: Event) => void",signature:{arguments:[{type:{name:"Event"},name:"event"}],return:{name:"void"}}},description:"Callback that is called when the item is selected."},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subtrigger'",computed:!1}}}};Ee.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Slot",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},name:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-slot'",computed:!1}}}};const Cr={component:ie,subcomponents:{"Dropdown.Trigger":le,"Dropdown.Content":ue,"Dropdown.Item":fe,"Dropdown.Group":pe,"Dropdown.SubMenu":me,"Dropdown.SubTrigger":Ie,"Dropdown.SubContent":we},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{}},W={render:({...o})=>e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})},Z={render:({...o})=>e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},disabled:!0,children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})},J={render:({...o})=>e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsxs(r.Group,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4"})]}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"})]})]})},Q={render:({...o})=>e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsxs(r.SubMenu,{children:[e.jsx(r.SubTrigger,{children:"Item 4"}),e.jsxs(r.SubContent,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.3"})]})]}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"})]})]})},ee={render:({...o})=>e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{name:"left",children:e.jsx(F,{size:16})}),"Left decorator"]}),e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{name:"right",children:e.jsx(F,{size:16})}),"Right decorator"]}),e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{children:e.jsx(F,{size:16})}),"Implicit placement left"]}),e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{children:e.jsx(F,{size:16})}),e.jsx(r.Slot,{children:e.jsx(F,{size:16})}),"Implicit placement both"]}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"})]})]})},oe={render:({...o})=>e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:e.jsx("div",{className:"tw-bg-red-50",children:"test bla"})}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})},ne={decorators:[o=>e.jsx("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-w-fit",children:e.jsx(o,{})})],render:({...o})=>{const[t,n]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(v,{onPress:()=>n(!t),children:"External Toggle Dropdown"}),e.jsxs(r.Root,{...o,open:t,onOpenChange:n,children:[e.jsx(r.Trigger,{children:e.jsx(v,{variant:"loud",children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})]})}},te={decorators:[o=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:32},children:e.jsx(o,{})})],parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"300px",height:"272px"}}},defaultViewport:"mobile"}},render:({...o})=>e.jsxs(e.Fragment,{children:[e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{variant:"loud",children:"Trigger 1"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 7"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 8"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 9"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 10"})]})]}),e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{variant:"loud",children:"Trigger 2"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 7"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 8"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 9"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 10"})]})]}),e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{variant:"loud",children:"Trigger 3"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 7"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 8"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 9"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 10"})]})]}),e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{children:e.jsx(v,{variant:"loud",children:"Trigger 4"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 7"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 8"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 9"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 10"})]})]})]})};var Ke,qe,Ve;W.parameters={...W.parameters,docs:{...(Ke=W.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
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
}`,...(Ve=(qe=W.parameters)==null?void 0:qe.docs)==null?void 0:Ve.source}}};var Ue,$e,ze;Z.parameters={...Z.parameters,docs:{...(Ue=Z.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
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
}`,...(ze=($e=Z.parameters)==null?void 0:$e.docs)==null?void 0:ze.source}}};var Xe,Ye,He;J.parameters={...J.parameters,docs:{...(Xe=J.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
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
}`,...(He=(Ye=J.parameters)==null?void 0:Ye.docs)==null?void 0:He.source}}};var We,Ze,Je;Q.parameters={...Q.parameters,docs:{...(We=Q.parameters)==null?void 0:We.docs,source:{originalSource:`{
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
}`,...(Je=(Ze=Q.parameters)==null?void 0:Ze.docs)==null?void 0:Je.source}}};var Qe,eo,oo;ee.parameters={...ee.parameters,docs:{...(Qe=ee.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
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
}`,...(oo=(eo=ee.parameters)==null?void 0:eo.docs)==null?void 0:oo.source}}};var no,to,ro;oe.parameters={...oe.parameters,docs:{...(no=oe.parameters)==null?void 0:no.docs,source:{originalSource:`{
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
}`,...(ro=(to=oe.parameters)==null?void 0:to.docs)==null?void 0:ro.source}}};var so,ao,co;ne.parameters={...ne.parameters,docs:{...(so=ne.parameters)==null?void 0:so.docs,source:{originalSource:`{
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
}`,...(co=(ao=ne.parameters)==null?void 0:ao.docs)==null?void 0:co.source}}};var io,lo,uo;te.parameters={...te.parameters,docs:{...(io=te.parameters)==null?void 0:io.docs,source:{originalSource:`{
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
}`,...(uo=(lo=te.parameters)==null?void 0:lo.docs)==null?void 0:uo.source}}};const Mr=["Default","DisabledItems","ItemGroups","SubMenus","Decorator","CustomItem","ControlledComponent","Overflow"];export{ne as ControlledComponent,oe as CustomItem,ee as Decorator,W as Default,Z as DisabledItems,J as ItemGroups,te as Overflow,Q as SubMenus,Mr as __namedExportsOrder,Cr as default};
