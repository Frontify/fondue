import{j as n}from"./jsx-runtime-DBEcOq3S.js";import{r as d}from"./index-DtJulBIN.js";import{d as po,c as F}from"./fondue-icons324-Bw2AQYl8.js";import{B as C}from"./Button-CeW1VRZi.js";import{c as g,a as Me,u as In}from"./index-BHYJtXto.js";import{u as K,P as O,c as gn,S as mo,d as fo}from"./index-Dhc4yksV.js";import{c as Dn}from"./index-P-l_ls5c.js";import{c as wo,u as Io}from"./index-6kD61ZNA.js";import{D as go,P as Do}from"./index-COuo08O9.js";import{h as ho,u as xo,F as So,R as vo}from"./Combination-CBds3eJs.js";import{u as se}from"./index-Bw4vj2Av.js";import{c as hn,A as Mo,C as Co,a as _o,R as xn}from"./index-CTHx29zj.js";import{P as ce}from"./index-D21DJKX5.js";import{c as Sn,R as Ro,I as jo}from"./index-CyrAKxev.js";import{u as bo,s as Be}from"./usePreventDropdownOverflow-DVWF_q5K.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-T76WvCte.js";import"./focusStyle-IgMhxCMT.js";import"./index-BqTDQIm7.js";import"./index-CvTA8V3i.js";var ve=["Enter"," "],To=["ArrowDown","PageUp","Home"],vn=["ArrowUp","PageDown","End"],yo=[...To,...vn],Eo={ltr:[...ve,"ArrowRight"],rtl:[...ve,"ArrowLeft"]},No={ltr:["ArrowLeft"],rtl:["ArrowRight"]},q="Menu",[L,Po,Oo]=wo(q),[y,Mn]=Dn(q,[Oo,hn,Sn]),V=hn(),Cn=Sn(),[_n,j]=y(q),[Ao,U]=y(q),Rn=e=>{const{__scopeMenu:t,open:o=!1,children:r,dir:a,onOpenChange:c,modal:u=!0}=e,l=V(t),[f,I]=d.useState(null),m=d.useRef(!1),i=Me(c),w=Io(a);return d.useEffect(()=>{const h=()=>{m.current=!0,document.addEventListener("pointerdown",D,{capture:!0,once:!0}),document.addEventListener("pointermove",D,{capture:!0,once:!0})},D=()=>m.current=!1;return document.addEventListener("keydown",h,{capture:!0}),()=>{document.removeEventListener("keydown",h,{capture:!0}),document.removeEventListener("pointerdown",D,{capture:!0}),document.removeEventListener("pointermove",D,{capture:!0})}},[]),n.jsx(xn,{...l,children:n.jsx(_n,{scope:t,open:o,onOpenChange:i,content:f,onContentChange:I,children:n.jsx(Ao,{scope:t,onClose:d.useCallback(()=>i(!1),[i]),isUsingKeyboardRef:m,dir:w,modal:u,children:r})})})};Rn.displayName=q;var ko="MenuAnchor",Ce=d.forwardRef((e,t)=>{const{__scopeMenu:o,...r}=e,a=V(o);return n.jsx(Mo,{...a,...r,ref:t})});Ce.displayName=ko;var _e="MenuPortal",[Fo,jn]=y(_e,{forceMount:void 0}),bn=e=>{const{__scopeMenu:t,forceMount:o,children:r,container:a}=e,c=j(_e,t);return n.jsx(Fo,{scope:t,forceMount:o,children:n.jsx(ce,{present:o||c.open,children:n.jsx(Do,{asChild:!0,container:a,children:r})})})};bn.displayName=_e;var v="MenuContent",[Go,Re]=y(v),Tn=d.forwardRef((e,t)=>{const o=jn(v,e.__scopeMenu),{forceMount:r=o.forceMount,...a}=e,c=j(v,e.__scopeMenu),u=U(v,e.__scopeMenu);return n.jsx(L.Provider,{scope:e.__scopeMenu,children:n.jsx(ce,{present:r||c.open,children:n.jsx(L.Slot,{scope:e.__scopeMenu,children:u.modal?n.jsx(Lo,{...a,ref:t}):n.jsx(Bo,{...a,ref:t})})})})}),Lo=d.forwardRef((e,t)=>{const o=j(v,e.__scopeMenu),r=d.useRef(null),a=K(t,r);return d.useEffect(()=>{const c=r.current;if(c)return ho(c)},[]),n.jsx(je,{...e,ref:a,trapFocus:o.open,disableOutsidePointerEvents:o.open,disableOutsideScroll:!0,onFocusOutside:g(e.onFocusOutside,c=>c.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>o.onOpenChange(!1)})}),Bo=d.forwardRef((e,t)=>{const o=j(v,e.__scopeMenu);return n.jsx(je,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>o.onOpenChange(!1)})}),je=d.forwardRef((e,t)=>{const{__scopeMenu:o,loop:r=!1,trapFocus:a,onOpenAutoFocus:c,onCloseAutoFocus:u,disableOutsidePointerEvents:l,onEntryFocus:f,onEscapeKeyDown:I,onPointerDownOutside:m,onFocusOutside:i,onInteractOutside:w,onDismiss:h,disableOutsideScroll:D,...b}=e,E=j(v,o),A=U(v,o),z=V(o),$=Cn(o),Oe=Po(o),[so,Ae]=d.useState(null),X=d.useRef(null),ao=K(t,X,E.onContentChange),Y=d.useRef(0),H=d.useRef(""),co=d.useRef(0),De=d.useRef(null),ke=d.useRef("right"),he=d.useRef(0),io=D?vo:d.Fragment,uo=D?{as:mo,allowPinchZoom:!0}:void 0,lo=p=>{var P,Ge;const S=H.current+p,M=Oe().filter(_=>!_.disabled),R=document.activeElement,xe=(P=M.find(_=>_.ref.current===R))==null?void 0:P.textValue,Se=M.map(_=>_.textValue),Fe=Jo(Se,S,xe),k=(Ge=M.find(_=>_.textValue===Fe))==null?void 0:Ge.ref.current;(function _(Le){H.current=Le,window.clearTimeout(Y.current),Le!==""&&(Y.current=window.setTimeout(()=>_(""),1e3))})(S),k&&setTimeout(()=>k.focus())};d.useEffect(()=>()=>window.clearTimeout(Y.current),[]),xo();const N=d.useCallback(p=>{var M,R;return ke.current===((M=De.current)==null?void 0:M.side)&&et(p,(R=De.current)==null?void 0:R.area)},[]);return n.jsx(Go,{scope:o,searchRef:H,onItemEnter:d.useCallback(p=>{N(p)&&p.preventDefault()},[N]),onItemLeave:d.useCallback(p=>{var S;N(p)||((S=X.current)==null||S.focus(),Ae(null))},[N]),onTriggerLeave:d.useCallback(p=>{N(p)&&p.preventDefault()},[N]),pointerGraceTimerRef:co,onPointerGraceIntentChange:d.useCallback(p=>{De.current=p},[]),children:n.jsx(io,{...uo,children:n.jsx(So,{asChild:!0,trapped:a,onMountAutoFocus:g(c,p=>{var S;p.preventDefault(),(S=X.current)==null||S.focus({preventScroll:!0})}),onUnmountAutoFocus:u,children:n.jsx(go,{asChild:!0,disableOutsidePointerEvents:l,onEscapeKeyDown:I,onPointerDownOutside:m,onFocusOutside:i,onInteractOutside:w,onDismiss:h,children:n.jsx(Ro,{asChild:!0,...$,dir:A.dir,orientation:"vertical",loop:r,currentTabStopId:so,onCurrentTabStopIdChange:Ae,onEntryFocus:g(f,p=>{A.isUsingKeyboardRef.current||p.preventDefault()}),preventScrollOnEntryFocus:!0,children:n.jsx(Co,{role:"menu","aria-orientation":"vertical","data-state":$n(E.open),"data-radix-menu-content":"",dir:A.dir,...z,...b,ref:ao,style:{outline:"none",...b.style},onKeyDown:g(b.onKeyDown,p=>{const M=p.target.closest("[data-radix-menu-content]")===p.currentTarget,R=p.ctrlKey||p.altKey||p.metaKey,xe=p.key.length===1;M&&(p.key==="Tab"&&p.preventDefault(),!R&&xe&&lo(p.key));const Se=X.current;if(p.target!==Se||!yo.includes(p.key))return;p.preventDefault();const k=Oe().filter(P=>!P.disabled).map(P=>P.ref.current);vn.includes(p.key)&&k.reverse(),Wo(k)}),onBlur:g(e.onBlur,p=>{p.currentTarget.contains(p.target)||(window.clearTimeout(Y.current),H.current="")}),onPointerMove:g(e.onPointerMove,B(p=>{const S=p.target,M=he.current!==p.clientX;if(p.currentTarget.contains(S)&&M){const R=p.clientX>he.current?"right":"left";ke.current=R,he.current=p.clientX}}))})})})})})})});Tn.displayName=v;var Ko="MenuGroup",be=d.forwardRef((e,t)=>{const{__scopeMenu:o,...r}=e;return n.jsx(O.div,{role:"group",...r,ref:t})});be.displayName=Ko;var qo="MenuLabel",yn=d.forwardRef((e,t)=>{const{__scopeMenu:o,...r}=e;return n.jsx(O.div,{...r,ref:t})});yn.displayName=qo;var ae="MenuItem",Ke="menu.itemSelect",ie=d.forwardRef((e,t)=>{const{disabled:o=!1,onSelect:r,...a}=e,c=d.useRef(null),u=U(ae,e.__scopeMenu),l=Re(ae,e.__scopeMenu),f=K(t,c),I=d.useRef(!1),m=()=>{const i=c.current;if(!o&&i){const w=new CustomEvent(Ke,{bubbles:!0,cancelable:!0});i.addEventListener(Ke,h=>r==null?void 0:r(h),{once:!0}),fo(i,w),w.defaultPrevented?I.current=!1:u.onClose()}};return n.jsx(En,{...a,ref:f,disabled:o,onClick:g(e.onClick,m),onPointerDown:i=>{var w;(w=e.onPointerDown)==null||w.call(e,i),I.current=!0},onPointerUp:g(e.onPointerUp,i=>{var w;I.current||(w=i.currentTarget)==null||w.click()}),onKeyDown:g(e.onKeyDown,i=>{const w=l.searchRef.current!=="";o||w&&i.key===" "||ve.includes(i.key)&&(i.currentTarget.click(),i.preventDefault())})})});ie.displayName=ae;var En=d.forwardRef((e,t)=>{const{__scopeMenu:o,disabled:r=!1,textValue:a,...c}=e,u=Re(ae,o),l=Cn(o),f=d.useRef(null),I=K(t,f),[m,i]=d.useState(!1),[w,h]=d.useState("");return d.useEffect(()=>{const D=f.current;D&&h((D.textContent??"").trim())},[c.children]),n.jsx(L.ItemSlot,{scope:o,disabled:r,textValue:a??w,children:n.jsx(jo,{asChild:!0,...l,focusable:!r,children:n.jsx(O.div,{role:"menuitem","data-highlighted":m?"":void 0,"aria-disabled":r||void 0,"data-disabled":r?"":void 0,...c,ref:I,onPointerMove:g(e.onPointerMove,B(D=>{r?u.onItemLeave(D):(u.onItemEnter(D),D.defaultPrevented||D.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:g(e.onPointerLeave,B(D=>u.onItemLeave(D))),onFocus:g(e.onFocus,()=>i(!0)),onBlur:g(e.onBlur,()=>i(!1))})})})}),Vo="MenuCheckboxItem",Nn=d.forwardRef((e,t)=>{const{checked:o=!1,onCheckedChange:r,...a}=e;return n.jsx(Fn,{scope:e.__scopeMenu,checked:o,children:n.jsx(ie,{role:"menuitemcheckbox","aria-checked":de(o)?"mixed":o,...a,ref:t,"data-state":Ee(o),onSelect:g(a.onSelect,()=>r==null?void 0:r(de(o)?!0:!o),{checkForDefaultPrevented:!1})})})});Nn.displayName=Vo;var Pn="MenuRadioGroup",[Uo,zo]=y(Pn,{value:void 0,onValueChange:()=>{}}),On=d.forwardRef((e,t)=>{const{value:o,onValueChange:r,...a}=e,c=Me(r);return n.jsx(Uo,{scope:e.__scopeMenu,value:o,onValueChange:c,children:n.jsx(be,{...a,ref:t})})});On.displayName=Pn;var An="MenuRadioItem",kn=d.forwardRef((e,t)=>{const{value:o,...r}=e,a=zo(An,e.__scopeMenu),c=o===a.value;return n.jsx(Fn,{scope:e.__scopeMenu,checked:c,children:n.jsx(ie,{role:"menuitemradio","aria-checked":c,...r,ref:t,"data-state":Ee(c),onSelect:g(r.onSelect,()=>{var u;return(u=a.onValueChange)==null?void 0:u.call(a,o)},{checkForDefaultPrevented:!1})})})});kn.displayName=An;var Te="MenuItemIndicator",[Fn,$o]=y(Te,{checked:!1}),Gn=d.forwardRef((e,t)=>{const{__scopeMenu:o,forceMount:r,...a}=e,c=$o(Te,o);return n.jsx(ce,{present:r||de(c.checked)||c.checked===!0,children:n.jsx(O.span,{...a,ref:t,"data-state":Ee(c.checked)})})});Gn.displayName=Te;var Xo="MenuSeparator",Ln=d.forwardRef((e,t)=>{const{__scopeMenu:o,...r}=e;return n.jsx(O.div,{role:"separator","aria-orientation":"horizontal",...r,ref:t})});Ln.displayName=Xo;var Yo="MenuArrow",Bn=d.forwardRef((e,t)=>{const{__scopeMenu:o,...r}=e,a=V(o);return n.jsx(_o,{...a,...r,ref:t})});Bn.displayName=Yo;var ye="MenuSub",[Ho,Kn]=y(ye),qn=e=>{const{__scopeMenu:t,children:o,open:r=!1,onOpenChange:a}=e,c=j(ye,t),u=V(t),[l,f]=d.useState(null),[I,m]=d.useState(null),i=Me(a);return d.useEffect(()=>(c.open===!1&&i(!1),()=>i(!1)),[c.open,i]),n.jsx(xn,{...u,children:n.jsx(_n,{scope:t,open:r,onOpenChange:i,content:I,onContentChange:m,children:n.jsx(Ho,{scope:t,contentId:se(),triggerId:se(),trigger:l,onTriggerChange:f,children:o})})})};qn.displayName=ye;var G="MenuSubTrigger",Vn=d.forwardRef((e,t)=>{const o=j(G,e.__scopeMenu),r=U(G,e.__scopeMenu),a=Kn(G,e.__scopeMenu),c=Re(G,e.__scopeMenu),u=d.useRef(null),{pointerGraceTimerRef:l,onPointerGraceIntentChange:f}=c,I={__scopeMenu:e.__scopeMenu},m=d.useCallback(()=>{u.current&&window.clearTimeout(u.current),u.current=null},[]);return d.useEffect(()=>m,[m]),d.useEffect(()=>{const i=l.current;return()=>{window.clearTimeout(i),f(null)}},[l,f]),n.jsx(Ce,{asChild:!0,...I,children:n.jsx(En,{id:a.triggerId,"aria-haspopup":"menu","aria-expanded":o.open,"aria-controls":a.contentId,"data-state":$n(o.open),...e,ref:gn(t,a.onTriggerChange),onClick:i=>{var w;(w=e.onClick)==null||w.call(e,i),!(e.disabled||i.defaultPrevented)&&(i.currentTarget.focus(),o.open||o.onOpenChange(!0))},onPointerMove:g(e.onPointerMove,B(i=>{c.onItemEnter(i),!i.defaultPrevented&&!e.disabled&&!o.open&&!u.current&&(c.onPointerGraceIntentChange(null),u.current=window.setTimeout(()=>{o.onOpenChange(!0),m()},100))})),onPointerLeave:g(e.onPointerLeave,B(i=>{var h,D;m();const w=(h=o.content)==null?void 0:h.getBoundingClientRect();if(w){const b=(D=o.content)==null?void 0:D.dataset.side,E=b==="right",A=E?-5:5,z=w[E?"left":"right"],$=w[E?"right":"left"];c.onPointerGraceIntentChange({area:[{x:i.clientX+A,y:i.clientY},{x:z,y:w.top},{x:$,y:w.top},{x:$,y:w.bottom},{x:z,y:w.bottom}],side:b}),window.clearTimeout(l.current),l.current=window.setTimeout(()=>c.onPointerGraceIntentChange(null),300)}else{if(c.onTriggerLeave(i),i.defaultPrevented)return;c.onPointerGraceIntentChange(null)}})),onKeyDown:g(e.onKeyDown,i=>{var h;const w=c.searchRef.current!=="";e.disabled||w&&i.key===" "||Eo[r.dir].includes(i.key)&&(o.onOpenChange(!0),(h=o.content)==null||h.focus(),i.preventDefault())})})})});Vn.displayName=G;var Un="MenuSubContent",zn=d.forwardRef((e,t)=>{const o=jn(v,e.__scopeMenu),{forceMount:r=o.forceMount,...a}=e,c=j(v,e.__scopeMenu),u=U(v,e.__scopeMenu),l=Kn(Un,e.__scopeMenu),f=d.useRef(null),I=K(t,f);return n.jsx(L.Provider,{scope:e.__scopeMenu,children:n.jsx(ce,{present:r||c.open,children:n.jsx(L.Slot,{scope:e.__scopeMenu,children:n.jsx(je,{id:l.contentId,"aria-labelledby":l.triggerId,...a,ref:I,align:"start",side:u.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:m=>{var i;u.isUsingKeyboardRef.current&&((i=f.current)==null||i.focus()),m.preventDefault()},onCloseAutoFocus:m=>m.preventDefault(),onFocusOutside:g(e.onFocusOutside,m=>{m.target!==l.trigger&&c.onOpenChange(!1)}),onEscapeKeyDown:g(e.onEscapeKeyDown,m=>{u.onClose(),m.preventDefault()}),onKeyDown:g(e.onKeyDown,m=>{var h;const i=m.currentTarget.contains(m.target),w=No[u.dir].includes(m.key);i&&w&&(c.onOpenChange(!1),(h=l.trigger)==null||h.focus(),m.preventDefault())})})})})})});zn.displayName=Un;function $n(e){return e?"open":"closed"}function de(e){return e==="indeterminate"}function Ee(e){return de(e)?"indeterminate":e?"checked":"unchecked"}function Wo(e){const t=document.activeElement;for(const o of e)if(o===t||(o.focus(),document.activeElement!==t))return}function Zo(e,t){return e.map((o,r)=>e[(t+r)%e.length])}function Jo(e,t,o){const a=t.length>1&&Array.from(t).every(I=>I===t[0])?t[0]:t,c=o?e.indexOf(o):-1;let u=Zo(e,Math.max(c,0));a.length===1&&(u=u.filter(I=>I!==o));const f=u.find(I=>I.toLowerCase().startsWith(a.toLowerCase()));return f!==o?f:void 0}function Qo(e,t){const{x:o,y:r}=e;let a=!1;for(let c=0,u=t.length-1;c<t.length;u=c++){const l=t[c].x,f=t[c].y,I=t[u].x,m=t[u].y;f>r!=m>r&&o<(I-l)*(r-f)/(m-f)+l&&(a=!a)}return a}function et(e,t){if(!t)return!1;const o={x:e.clientX,y:e.clientY};return Qo(o,t)}function B(e){return t=>t.pointerType==="mouse"?e(t):void 0}var nt=Rn,ot=Ce,tt=bn,rt=Tn,st=be,at=yn,dt=ie,ct=Nn,it=On,ut=kn,lt=Gn,pt=Ln,mt=Bn,ft=qn,wt=Vn,It=zn,Ne="DropdownMenu",[gt,jr]=Dn(Ne,[Mn]),x=Mn(),[Dt,Xn]=gt(Ne),Yn=e=>{const{__scopeDropdownMenu:t,children:o,dir:r,open:a,defaultOpen:c,onOpenChange:u,modal:l=!0}=e,f=x(t),I=d.useRef(null),[m=!1,i]=In({prop:a,defaultProp:c,onChange:u});return n.jsx(Dt,{scope:t,triggerId:se(),triggerRef:I,contentId:se(),open:m,onOpenChange:i,onOpenToggle:d.useCallback(()=>i(w=>!w),[i]),modal:l,children:n.jsx(nt,{...f,open:m,onOpenChange:i,dir:r,modal:l,children:o})})};Yn.displayName=Ne;var Hn="DropdownMenuTrigger",Wn=d.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,disabled:r=!1,...a}=e,c=Xn(Hn,o),u=x(o);return n.jsx(ot,{asChild:!0,...u,children:n.jsx(O.button,{type:"button",id:c.triggerId,"aria-haspopup":"menu","aria-expanded":c.open,"aria-controls":c.open?c.contentId:void 0,"data-state":c.open?"open":"closed","data-disabled":r?"":void 0,disabled:r,...a,ref:gn(t,c.triggerRef),onPointerDown:g(e.onPointerDown,l=>{!r&&l.button===0&&l.ctrlKey===!1&&(c.onOpenToggle(),c.open||l.preventDefault())}),onKeyDown:g(e.onKeyDown,l=>{r||(["Enter"," "].includes(l.key)&&c.onOpenToggle(),l.key==="ArrowDown"&&c.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(l.key)&&l.preventDefault())})})})});Wn.displayName=Hn;var ht="DropdownMenuPortal",Zn=e=>{const{__scopeDropdownMenu:t,...o}=e,r=x(t);return n.jsx(tt,{...r,...o})};Zn.displayName=ht;var Jn="DropdownMenuContent",Qn=d.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,a=Xn(Jn,o),c=x(o),u=d.useRef(!1);return n.jsx(rt,{id:a.contentId,"aria-labelledby":a.triggerId,...c,...r,ref:t,onCloseAutoFocus:g(e.onCloseAutoFocus,l=>{var f;u.current||(f=a.triggerRef.current)==null||f.focus(),u.current=!1,l.preventDefault()}),onInteractOutside:g(e.onInteractOutside,l=>{const f=l.detail.originalEvent,I=f.button===0&&f.ctrlKey===!0,m=f.button===2||I;(!a.modal||m)&&(u.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});Qn.displayName=Jn;var xt="DropdownMenuGroup",eo=d.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,a=x(o);return n.jsx(st,{...a,...r,ref:t})});eo.displayName=xt;var St="DropdownMenuLabel",vt=d.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,a=x(o);return n.jsx(at,{...a,...r,ref:t})});vt.displayName=St;var Mt="DropdownMenuItem",no=d.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,a=x(o);return n.jsx(dt,{...a,...r,ref:t})});no.displayName=Mt;var Ct="DropdownMenuCheckboxItem",_t=d.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,a=x(o);return n.jsx(ct,{...a,...r,ref:t})});_t.displayName=Ct;var Rt="DropdownMenuRadioGroup",jt=d.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,a=x(o);return n.jsx(it,{...a,...r,ref:t})});jt.displayName=Rt;var bt="DropdownMenuRadioItem",Tt=d.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,a=x(o);return n.jsx(ut,{...a,...r,ref:t})});Tt.displayName=bt;var yt="DropdownMenuItemIndicator",Et=d.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,a=x(o);return n.jsx(lt,{...a,...r,ref:t})});Et.displayName=yt;var Nt="DropdownMenuSeparator",Pt=d.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,a=x(o);return n.jsx(pt,{...a,...r,ref:t})});Pt.displayName=Nt;var Ot="DropdownMenuArrow",At=d.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,a=x(o);return n.jsx(mt,{...a,...r,ref:t})});At.displayName=Ot;var kt=e=>{const{__scopeDropdownMenu:t,children:o,open:r,onOpenChange:a,defaultOpen:c}=e,u=x(t),[l=!1,f]=In({prop:r,defaultProp:c,onChange:a});return n.jsx(ft,{...u,open:l,onOpenChange:f,children:o})},Ft="DropdownMenuSubTrigger",oo=d.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,a=x(o);return n.jsx(wt,{...a,...r,ref:t})});oo.displayName=Ft;var Gt="DropdownMenuSubContent",to=d.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,a=x(o);return n.jsx(It,{...a,...r,ref:t,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});to.displayName=Gt;var Lt=Yn,Bt=Wn,ro=Zn,Kt=Qn,qt=eo,Vt=no,Ut=kt,zt=oo,$t=to;const Xt="_content_5bz3o_4",Yt="_subContent_5bz3o_5",Ht="_item_5bz3o_15",Wt="_subTrigger_5bz3o_16",Zt="_subMenuIndicator_5bz3o_52",Jt="_group_5bz3o_58",Qt="_slot_5bz3o_65",T={content:Xt,subContent:Yt,item:Ht,subTrigger:Wt,subMenuIndicator:Zt,group:Jt,slot:Qt},ue=({children:e,open:t,onOpenChange:o,"data-test-id":r="fondue-dropdown"})=>n.jsx(Lt,{open:t,onOpenChange:o,"data-test-id":r,children:e});ue.displayName="Dropdown.Root";const le=({children:e,"data-test-id":t="fondue-dropdown-trigger"},o)=>n.jsx(Bt,{asChild:!0,"data-test-id":t,ref:o,children:e});le.displayName="Dropdown.Trigger";const pe=({onOpen:e,onClose:t,side:o="bottom",children:r,"data-test-id":a="fondue-dropdown-content"},c)=>{const u=d.useRef(null),l=d.useRef(!1),{setMaxHeight:f}=bo(u);return n.jsx(ro,{children:n.jsx(Kt,{align:"start",collisionPadding:8,sideOffset:8,side:o,className:T.content,"data-test-id":a,ref:u,onCloseAutoFocus:()=>{Be(u,c),t&&t(),l.current=!1},onFocus:()=>{l.current||(f(),Be(u,c),e&&e(),l.current=!0)},children:r})})};pe.displayName="Dropdown.Content";const me=({children:e,"data-test-id":t="fondue-dropdown-group"},o)=>n.jsx(qt,{className:T.group,"data-test-id":t,ref:o,children:e});me.displayName="Dropdown.Group";const fe=({children:e,"data-test-id":t="fondue-dropdown-submenu"})=>n.jsx(Ut,{"data-test-id":t,children:e});fe.displayName="Dropdown.SubMenu";const we=({children:e,"data-test-id":t="fondue-dropdown-subtrigger"},o)=>n.jsxs(zt,{className:T.subTrigger,"data-test-id":t,ref:o,children:[e,n.jsx(po,{className:T.subMenuIndicator,size:16})]});we.displayName="Dropdown.SubTrigger";const Ie=({children:e,"data-test-id":t="fondue-dropdown-subcontent"},o)=>n.jsx(ro,{children:n.jsx($t,{className:T.subContent,"data-test-id":t,ref:o,children:e})});Ie.displayName="Dropdown.SubContent";const ge=({children:e,disabled:t,textValue:o,onSelect:r,"data-test-id":a="fondue-dropdown-subtrigger",...c},u)=>n.jsx(Vt,{onSelect:r,className:T.item,textValue:o,"data-test-id":a,ref:u,disabled:t,...c,children:e});ge.displayName="Dropdown.Item";const Pe=({children:e,name:t,"data-test-id":o="fondue-dropdown-slot"},r)=>n.jsx("div",{"data-name":t,className:T.slot,"data-test-id":o,ref:r,children:e});Pe.displayName="Dropdown.Slot";const er=d.forwardRef(le),nr=d.forwardRef(pe),or=d.forwardRef(me),tr=d.forwardRef(we),rr=d.forwardRef(Ie),sr=d.forwardRef(ge),ar=d.forwardRef(Pe),s={Root:ue,Trigger:er,Content:nr,Group:or,SubMenu:fe,SubTrigger:tr,SubContent:rr,Item:sr,Slot:ar};ue.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Root",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},open:{required:!1,tsType:{name:"boolean"},description:"Controls the open state of the dropdown."},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Callback that is called when the open state of the dropdown changes."},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown'",computed:!1}}}};le.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Trigger",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-trigger'",computed:!1}}}};pe.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Content",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-content'",computed:!1}},onOpen:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},side:{required:!1,tsType:{name:"union",raw:"'top' | 'right' | 'bottom' | 'left'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'right'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"}]},description:`Defines the preferred side of the dropdown. It will not be respected if there are collisions with the viewport.
@default "bottom"`,defaultValue:{value:"'bottom'",computed:!1}}}};me.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Group",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-group'",computed:!1}}}};fe.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubMenu",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-submenu'",computed:!1}}}};we.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubTrigger",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subtrigger'",computed:!1}}}};Ie.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubContent",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subcontent'",computed:!1}}}};ge.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Item",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"Disables the item."},textValue:{required:!1,tsType:{name:"string"},description:"The text value of the item that is passed to the onSelect callback."},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: Event) => void",signature:{arguments:[{type:{name:"Event"},name:"event"}],return:{name:"void"}}},description:"Callback that is called when the item is selected."},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subtrigger'",computed:!1}}}};Pe.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Slot",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},name:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-slot'",computed:!1}}}};const br={component:ue,subcomponents:{"Dropdown.Trigger":le,"Dropdown.Content":pe,"Dropdown.Item":ge,"Dropdown.Group":me,"Dropdown.SubMenu":fe,"Dropdown.SubTrigger":we,"Dropdown.SubContent":Ie},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{}},W={render:({...e})=>n.jsxs(s.Root,{...e,children:[n.jsx(s.Trigger,{children:n.jsx(C,{children:"Trigger"})}),n.jsxs(s.Content,{children:[n.jsx(s.Item,{onSelect:()=>{},children:"Item 1"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 2"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 3"})]})]})},Z={render:({...e})=>n.jsxs(s.Root,{...e,children:[n.jsx(s.Trigger,{children:n.jsx(C,{children:"Trigger"})}),n.jsxs(s.Content,{children:[n.jsx(s.Item,{onSelect:()=>{},children:"Item 1"}),n.jsx(s.Item,{onSelect:()=>{},disabled:!0,children:"Item 2"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 3"})]})]})},J={render:({...e})=>n.jsxs(s.Root,{...e,children:[n.jsx(s.Trigger,{children:n.jsx(C,{children:"Trigger"})}),n.jsxs(s.Content,{children:[n.jsx(s.Item,{onSelect:()=>{},children:"Item 1"}),n.jsxs(s.Group,{children:[n.jsx(s.Item,{onSelect:()=>{},children:"Item 2"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 3"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 4"})]}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 5"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 6"})]})]})},Q={render:({...e})=>n.jsxs(s.Root,{...e,children:[n.jsx(s.Trigger,{children:n.jsx(C,{children:"Trigger"})}),n.jsxs(s.Content,{children:[n.jsx(s.Item,{onSelect:()=>{},children:"Item 1"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 2"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 3"}),n.jsxs(s.SubMenu,{children:[n.jsx(s.SubTrigger,{children:"Item 4"}),n.jsxs(s.SubContent,{children:[n.jsx(s.Item,{onSelect:()=>{},children:"Item 4.1"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 4.2"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 4.3"})]})]}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 5"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 6"})]})]})},ee={render:({...e})=>n.jsxs(s.Root,{...e,children:[n.jsx(s.Trigger,{children:n.jsx(C,{children:"Trigger"})}),n.jsxs(s.Content,{children:[n.jsxs(s.Item,{onSelect:()=>{},children:[n.jsx(s.Slot,{name:"left",children:n.jsx(F,{size:16})}),"Left decorator"]}),n.jsxs(s.Item,{onSelect:()=>{},children:[n.jsx(s.Slot,{name:"right",children:n.jsx(F,{size:16})}),"Right decorator"]}),n.jsxs(s.Item,{onSelect:()=>{},children:[n.jsx(s.Slot,{children:n.jsx(F,{size:16})}),"Implicit placement left"]}),n.jsxs(s.Item,{onSelect:()=>{},children:[n.jsx(s.Slot,{children:n.jsx(F,{size:16})}),n.jsx(s.Slot,{children:n.jsx(F,{size:16})}),"Implicit placement both"]}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 5"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 6"})]})]})},ne={render:({...e})=>n.jsxs(s.Root,{...e,children:[n.jsx(s.Trigger,{children:n.jsx(C,{children:"Trigger"})}),n.jsxs(s.Content,{children:[n.jsx(s.Item,{onSelect:()=>{},children:"Item 1"}),n.jsx(s.Item,{onSelect:()=>{},children:n.jsx("div",{className:"tw-bg-red-50",children:"test bla"})}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 2"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 3"})]})]})},oe={decorators:[e=>n.jsx("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-w-fit",children:n.jsx(e,{})})],render:({...e})=>{const[t,o]=d.useState(!1);return n.jsxs(n.Fragment,{children:[n.jsx(C,{onPress:()=>o(!t),children:"External Toggle Dropdown"}),n.jsxs(s.Root,{...e,open:t,onOpenChange:o,children:[n.jsx(s.Trigger,{children:n.jsx(C,{variant:"loud",children:"Trigger"})}),n.jsxs(s.Content,{children:[n.jsx(s.Item,{onSelect:()=>{},children:"Item 1"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 2"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 3"})]})]})]})}},te={decorators:[e=>n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:32},children:n.jsx(e,{})})],parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"300px",height:"272px"}}},defaultViewport:"mobile"}},render:({...e})=>n.jsx(n.Fragment,{children:Array.from({length:4}).map((t,o)=>d.createElement(s.Root,{...e,key:o},n.jsx(s.Trigger,{children:n.jsx(C,{variant:"loud",children:"Trigger 1"})}),n.jsxs(s.Content,{children:[n.jsx(s.Item,{onSelect:()=>{},children:"Item 1"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 2"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 3"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 4"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 5"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 6"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 7"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 8"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 9"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 10"})]})))})},re={render:({...e})=>n.jsxs(s.Root,{...e,children:[n.jsx(s.Trigger,{children:n.jsx(C,{children:"Trigger"})}),n.jsxs(s.Content,{side:"left",children:[n.jsx(s.Item,{onSelect:()=>{},children:"Item 1"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 2"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 3"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 1"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 2"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 3"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 1"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 2"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 3"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 1"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 2"}),n.jsx(s.Item,{onSelect:()=>{},children:"Item 3"})]})]})};var qe,Ve,Ue;W.parameters={...W.parameters,docs:{...(qe=W.parameters)==null?void 0:qe.docs,source:{originalSource:`{
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
}`,...(Ue=(Ve=W.parameters)==null?void 0:Ve.docs)==null?void 0:Ue.source}}};var ze,$e,Xe;Z.parameters={...Z.parameters,docs:{...(ze=Z.parameters)==null?void 0:ze.docs,source:{originalSource:`{
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
}`,...(Xe=($e=Z.parameters)==null?void 0:$e.docs)==null?void 0:Xe.source}}};var Ye,He,We;J.parameters={...J.parameters,docs:{...(Ye=J.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
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
}`,...(We=(He=J.parameters)==null?void 0:He.docs)==null?void 0:We.source}}};var Ze,Je,Qe;Q.parameters={...Q.parameters,docs:{...(Ze=Q.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
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
}`,...(Qe=(Je=Q.parameters)==null?void 0:Je.docs)==null?void 0:Qe.source}}};var en,nn,on;ee.parameters={...ee.parameters,docs:{...(en=ee.parameters)==null?void 0:en.docs,source:{originalSource:`{
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
}`,...(on=(nn=ee.parameters)==null?void 0:nn.docs)==null?void 0:on.source}}};var tn,rn,sn;ne.parameters={...ne.parameters,docs:{...(tn=ne.parameters)==null?void 0:tn.docs,source:{originalSource:`{
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
}`,...(sn=(rn=ne.parameters)==null?void 0:rn.docs)==null?void 0:sn.source}}};var an,dn,cn;oe.parameters={...oe.parameters,docs:{...(an=oe.parameters)==null?void 0:an.docs,source:{originalSource:`{
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
}`,...(cn=(dn=oe.parameters)==null?void 0:dn.docs)==null?void 0:cn.source}}};var un,ln,pn;te.parameters={...te.parameters,docs:{...(un=te.parameters)==null?void 0:un.docs,source:{originalSource:`{
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
  }) => <>
            {Array.from({
      length: 4
    }).map((_, index) => <Dropdown.Root {...args} key={index}>
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
                </Dropdown.Root>)}
        </>
}`,...(pn=(ln=te.parameters)==null?void 0:ln.docs)==null?void 0:pn.source}}};var mn,fn,wn;re.parameters={...re.parameters,docs:{...(mn=re.parameters)==null?void 0:mn.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content side="left">
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
}`,...(wn=(fn=re.parameters)==null?void 0:fn.docs)==null?void 0:wn.source}}};const Tr=["Default","DisabledItems","ItemGroups","SubMenus","Decorator","CustomItem","ControlledComponent","Overflow","RightSide"];export{oe as ControlledComponent,ne as CustomItem,ee as Decorator,W as Default,Z as DisabledItems,J as ItemGroups,te as Overflow,re as RightSide,Q as SubMenus,Tr as __namedExportsOrder,br as default};
