import{j as n}from"./jsx-runtime-DBEcOq3S.js";import{r as a}from"./index-DtJulBIN.js";import{b as oo,c as G}from"./fondue-icons311-Cyz8yLVl.js";import{B as R}from"./Button-CnC-uSyE.js";import{c as I,b as Se,u as an}from"./index-DYI_kRwo.js";import{u as B,P as O,c as dn,S as to,d as ro}from"./index-B6WxdOXM.js";import{c as cn}from"./index-P-l_ls5c.js";import{c as so,a as un,R as ao,I as co,u as io}from"./index-ChONBxKU.js";import{D as uo,P as lo}from"./index-Ddz0BVCY.js";import{h as po,u as mo,F as fo,R as wo}from"./index-HXHbcWZ0.js";import{u as te}from"./index-DBH0Kh6a.js";import{c as ln,A as go,C as Io,a as ho,R as pn}from"./index-jbnhK9sQ.js";import{P as ae}from"./index-BK_vzMtd.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-T76WvCte.js";import"./focusStyle-IgMhxCMT.js";import"./index-DD2ZIxVL.js";import"./index-CMjj8zSi.js";var xe=["Enter"," "],Do=["ArrowDown","PageUp","Home"],mn=["ArrowUp","PageDown","End"],xo=[...Do,...mn],So={ltr:[...xe,"ArrowRight"],rtl:[...xe,"ArrowLeft"]},vo={ltr:["ArrowLeft"],rtl:["ArrowRight"]},q="Menu",[L,Mo,Co]=so(q),[y,fn]=cn(q,[Co,ln,un]),U=ln(),wn=un(),[gn,b]=y(q),[_o,V]=y(q),In=e=>{const{__scopeMenu:t,open:o=!1,children:r,dir:s,onOpenChange:d,modal:u=!0}=e,l=U(t),[f,g]=a.useState(null),m=a.useRef(!1),i=Se(d),w=io(s);return a.useEffect(()=>{const D=()=>{m.current=!0,document.addEventListener("pointerdown",h,{capture:!0,once:!0}),document.addEventListener("pointermove",h,{capture:!0,once:!0})},h=()=>m.current=!1;return document.addEventListener("keydown",D,{capture:!0}),()=>{document.removeEventListener("keydown",D,{capture:!0}),document.removeEventListener("pointerdown",h,{capture:!0}),document.removeEventListener("pointermove",h,{capture:!0})}},[]),n.jsx(pn,{...l,children:n.jsx(gn,{scope:t,open:o,onOpenChange:i,content:f,onContentChange:g,children:n.jsx(_o,{scope:t,onClose:a.useCallback(()=>i(!1),[i]),isUsingKeyboardRef:m,dir:w,modal:u,children:r})})})};In.displayName=q;var Ro="MenuAnchor",ve=a.forwardRef((e,t)=>{const{__scopeMenu:o,...r}=e,s=U(o);return n.jsx(go,{...s,...r,ref:t})});ve.displayName=Ro;var Me="MenuPortal",[bo,hn]=y(Me,{forceMount:void 0}),Dn=e=>{const{__scopeMenu:t,forceMount:o,children:r,container:s}=e,d=b(Me,t);return n.jsx(bo,{scope:t,forceMount:o,children:n.jsx(ae,{present:o||d.open,children:n.jsx(lo,{asChild:!0,container:s,children:r})})})};Dn.displayName=Me;var v="MenuContent",[jo,Ce]=y(v),xn=a.forwardRef((e,t)=>{const o=hn(v,e.__scopeMenu),{forceMount:r=o.forceMount,...s}=e,d=b(v,e.__scopeMenu),u=V(v,e.__scopeMenu);return n.jsx(L.Provider,{scope:e.__scopeMenu,children:n.jsx(ae,{present:r||d.open,children:n.jsx(L.Slot,{scope:e.__scopeMenu,children:u.modal?n.jsx(To,{...s,ref:t}):n.jsx(yo,{...s,ref:t})})})})}),To=a.forwardRef((e,t)=>{const o=b(v,e.__scopeMenu),r=a.useRef(null),s=B(t,r);return a.useEffect(()=>{const d=r.current;if(d)return po(d)},[]),n.jsx(_e,{...e,ref:s,trapFocus:o.open,disableOutsidePointerEvents:o.open,disableOutsideScroll:!0,onFocusOutside:I(e.onFocusOutside,d=>d.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>o.onOpenChange(!1)})}),yo=a.forwardRef((e,t)=>{const o=b(v,e.__scopeMenu);return n.jsx(_e,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>o.onOpenChange(!1)})}),_e=a.forwardRef((e,t)=>{const{__scopeMenu:o,loop:r=!1,trapFocus:s,onOpenAutoFocus:d,onCloseAutoFocus:u,disableOutsidePointerEvents:l,onEntryFocus:f,onEscapeKeyDown:g,onPointerDownOutside:m,onFocusOutside:i,onInteractOutside:w,onDismiss:D,disableOutsideScroll:h,...j}=e,N=b(v,o),A=V(v,o),$=U(o),z=wn(o),Ee=Mo(o),[Wn,Pe]=a.useState(null),X=a.useRef(null),Zn=B(t,X,N.onContentChange),Y=a.useRef(0),H=a.useRef(""),Jn=a.useRef(0),ge=a.useRef(null),Oe=a.useRef("right"),Ie=a.useRef(0),Qn=h?wo:a.Fragment,eo=h?{as:to,allowPinchZoom:!0}:void 0,no=p=>{var P,ke;const S=H.current+p,M=Ee().filter(C=>!C.disabled),_=document.activeElement,he=(P=M.find(C=>C.ref.current===_))==null?void 0:P.textValue,De=M.map(C=>C.textValue),Ae=qo(De,S,he),k=(ke=M.find(C=>C.textValue===Ae))==null?void 0:ke.ref.current;(function C(Ge){H.current=Ge,window.clearTimeout(Y.current),Ge!==""&&(Y.current=window.setTimeout(()=>C(""),1e3))})(S),k&&setTimeout(()=>k.focus())};a.useEffect(()=>()=>window.clearTimeout(Y.current),[]),mo();const E=a.useCallback(p=>{var M,_;return Oe.current===((M=ge.current)==null?void 0:M.side)&&Vo(p,(_=ge.current)==null?void 0:_.area)},[]);return n.jsx(jo,{scope:o,searchRef:H,onItemEnter:a.useCallback(p=>{E(p)&&p.preventDefault()},[E]),onItemLeave:a.useCallback(p=>{var S;E(p)||((S=X.current)==null||S.focus(),Pe(null))},[E]),onTriggerLeave:a.useCallback(p=>{E(p)&&p.preventDefault()},[E]),pointerGraceTimerRef:Jn,onPointerGraceIntentChange:a.useCallback(p=>{ge.current=p},[]),children:n.jsx(Qn,{...eo,children:n.jsx(fo,{asChild:!0,trapped:s,onMountAutoFocus:I(d,p=>{var S;p.preventDefault(),(S=X.current)==null||S.focus({preventScroll:!0})}),onUnmountAutoFocus:u,children:n.jsx(uo,{asChild:!0,disableOutsidePointerEvents:l,onEscapeKeyDown:g,onPointerDownOutside:m,onFocusOutside:i,onInteractOutside:w,onDismiss:D,children:n.jsx(ao,{asChild:!0,...z,dir:A.dir,orientation:"vertical",loop:r,currentTabStopId:Wn,onCurrentTabStopIdChange:Pe,onEntryFocus:I(f,p=>{A.isUsingKeyboardRef.current||p.preventDefault()}),preventScrollOnEntryFocus:!0,children:n.jsx(Io,{role:"menu","aria-orientation":"vertical","data-state":Gn(N.open),"data-radix-menu-content":"",dir:A.dir,...$,...j,ref:Zn,style:{outline:"none",...j.style},onKeyDown:I(j.onKeyDown,p=>{const M=p.target.closest("[data-radix-menu-content]")===p.currentTarget,_=p.ctrlKey||p.altKey||p.metaKey,he=p.key.length===1;M&&(p.key==="Tab"&&p.preventDefault(),!_&&he&&no(p.key));const De=X.current;if(p.target!==De||!xo.includes(p.key))return;p.preventDefault();const k=Ee().filter(P=>!P.disabled).map(P=>P.ref.current);mn.includes(p.key)&&k.reverse(),Ko(k)}),onBlur:I(e.onBlur,p=>{p.currentTarget.contains(p.target)||(window.clearTimeout(Y.current),H.current="")}),onPointerMove:I(e.onPointerMove,K(p=>{const S=p.target,M=Ie.current!==p.clientX;if(p.currentTarget.contains(S)&&M){const _=p.clientX>Ie.current?"right":"left";Oe.current=_,Ie.current=p.clientX}}))})})})})})})});xn.displayName=v;var No="MenuGroup",Re=a.forwardRef((e,t)=>{const{__scopeMenu:o,...r}=e;return n.jsx(O.div,{role:"group",...r,ref:t})});Re.displayName=No;var Eo="MenuLabel",Sn=a.forwardRef((e,t)=>{const{__scopeMenu:o,...r}=e;return n.jsx(O.div,{...r,ref:t})});Sn.displayName=Eo;var re="MenuItem",Fe="menu.itemSelect",de=a.forwardRef((e,t)=>{const{disabled:o=!1,onSelect:r,...s}=e,d=a.useRef(null),u=V(re,e.__scopeMenu),l=Ce(re,e.__scopeMenu),f=B(t,d),g=a.useRef(!1),m=()=>{const i=d.current;if(!o&&i){const w=new CustomEvent(Fe,{bubbles:!0,cancelable:!0});i.addEventListener(Fe,D=>r==null?void 0:r(D),{once:!0}),ro(i,w),w.defaultPrevented?g.current=!1:u.onClose()}};return n.jsx(vn,{...s,ref:f,disabled:o,onClick:I(e.onClick,m),onPointerDown:i=>{var w;(w=e.onPointerDown)==null||w.call(e,i),g.current=!0},onPointerUp:I(e.onPointerUp,i=>{var w;g.current||(w=i.currentTarget)==null||w.click()}),onKeyDown:I(e.onKeyDown,i=>{const w=l.searchRef.current!=="";o||w&&i.key===" "||xe.includes(i.key)&&(i.currentTarget.click(),i.preventDefault())})})});de.displayName=re;var vn=a.forwardRef((e,t)=>{const{__scopeMenu:o,disabled:r=!1,textValue:s,...d}=e,u=Ce(re,o),l=wn(o),f=a.useRef(null),g=B(t,f),[m,i]=a.useState(!1),[w,D]=a.useState("");return a.useEffect(()=>{const h=f.current;h&&D((h.textContent??"").trim())},[d.children]),n.jsx(L.ItemSlot,{scope:o,disabled:r,textValue:s??w,children:n.jsx(co,{asChild:!0,...l,focusable:!r,children:n.jsx(O.div,{role:"menuitem","data-highlighted":m?"":void 0,"aria-disabled":r||void 0,"data-disabled":r?"":void 0,...d,ref:g,onPointerMove:I(e.onPointerMove,K(h=>{r?u.onItemLeave(h):(u.onItemEnter(h),h.defaultPrevented||h.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:I(e.onPointerLeave,K(h=>u.onItemLeave(h))),onFocus:I(e.onFocus,()=>i(!0)),onBlur:I(e.onBlur,()=>i(!1))})})})}),Po="MenuCheckboxItem",Mn=a.forwardRef((e,t)=>{const{checked:o=!1,onCheckedChange:r,...s}=e;return n.jsx(jn,{scope:e.__scopeMenu,checked:o,children:n.jsx(de,{role:"menuitemcheckbox","aria-checked":se(o)?"mixed":o,...s,ref:t,"data-state":Te(o),onSelect:I(s.onSelect,()=>r==null?void 0:r(se(o)?!0:!o),{checkForDefaultPrevented:!1})})})});Mn.displayName=Po;var Cn="MenuRadioGroup",[Oo,Ao]=y(Cn,{value:void 0,onValueChange:()=>{}}),_n=a.forwardRef((e,t)=>{const{value:o,onValueChange:r,...s}=e,d=Se(r);return n.jsx(Oo,{scope:e.__scopeMenu,value:o,onValueChange:d,children:n.jsx(Re,{...s,ref:t})})});_n.displayName=Cn;var Rn="MenuRadioItem",bn=a.forwardRef((e,t)=>{const{value:o,...r}=e,s=Ao(Rn,e.__scopeMenu),d=o===s.value;return n.jsx(jn,{scope:e.__scopeMenu,checked:d,children:n.jsx(de,{role:"menuitemradio","aria-checked":d,...r,ref:t,"data-state":Te(d),onSelect:I(r.onSelect,()=>{var u;return(u=s.onValueChange)==null?void 0:u.call(s,o)},{checkForDefaultPrevented:!1})})})});bn.displayName=Rn;var be="MenuItemIndicator",[jn,ko]=y(be,{checked:!1}),Tn=a.forwardRef((e,t)=>{const{__scopeMenu:o,forceMount:r,...s}=e,d=ko(be,o);return n.jsx(ae,{present:r||se(d.checked)||d.checked===!0,children:n.jsx(O.span,{...s,ref:t,"data-state":Te(d.checked)})})});Tn.displayName=be;var Go="MenuSeparator",yn=a.forwardRef((e,t)=>{const{__scopeMenu:o,...r}=e;return n.jsx(O.div,{role:"separator","aria-orientation":"horizontal",...r,ref:t})});yn.displayName=Go;var Fo="MenuArrow",Nn=a.forwardRef((e,t)=>{const{__scopeMenu:o,...r}=e,s=U(o);return n.jsx(ho,{...s,...r,ref:t})});Nn.displayName=Fo;var je="MenuSub",[Lo,En]=y(je),Pn=e=>{const{__scopeMenu:t,children:o,open:r=!1,onOpenChange:s}=e,d=b(je,t),u=U(t),[l,f]=a.useState(null),[g,m]=a.useState(null),i=Se(s);return a.useEffect(()=>(d.open===!1&&i(!1),()=>i(!1)),[d.open,i]),n.jsx(pn,{...u,children:n.jsx(gn,{scope:t,open:r,onOpenChange:i,content:g,onContentChange:m,children:n.jsx(Lo,{scope:t,contentId:te(),triggerId:te(),trigger:l,onTriggerChange:f,children:o})})})};Pn.displayName=je;var F="MenuSubTrigger",On=a.forwardRef((e,t)=>{const o=b(F,e.__scopeMenu),r=V(F,e.__scopeMenu),s=En(F,e.__scopeMenu),d=Ce(F,e.__scopeMenu),u=a.useRef(null),{pointerGraceTimerRef:l,onPointerGraceIntentChange:f}=d,g={__scopeMenu:e.__scopeMenu},m=a.useCallback(()=>{u.current&&window.clearTimeout(u.current),u.current=null},[]);return a.useEffect(()=>m,[m]),a.useEffect(()=>{const i=l.current;return()=>{window.clearTimeout(i),f(null)}},[l,f]),n.jsx(ve,{asChild:!0,...g,children:n.jsx(vn,{id:s.triggerId,"aria-haspopup":"menu","aria-expanded":o.open,"aria-controls":s.contentId,"data-state":Gn(o.open),...e,ref:dn(t,s.onTriggerChange),onClick:i=>{var w;(w=e.onClick)==null||w.call(e,i),!(e.disabled||i.defaultPrevented)&&(i.currentTarget.focus(),o.open||o.onOpenChange(!0))},onPointerMove:I(e.onPointerMove,K(i=>{d.onItemEnter(i),!i.defaultPrevented&&!e.disabled&&!o.open&&!u.current&&(d.onPointerGraceIntentChange(null),u.current=window.setTimeout(()=>{o.onOpenChange(!0),m()},100))})),onPointerLeave:I(e.onPointerLeave,K(i=>{var D,h;m();const w=(D=o.content)==null?void 0:D.getBoundingClientRect();if(w){const j=(h=o.content)==null?void 0:h.dataset.side,N=j==="right",A=N?-5:5,$=w[N?"left":"right"],z=w[N?"right":"left"];d.onPointerGraceIntentChange({area:[{x:i.clientX+A,y:i.clientY},{x:$,y:w.top},{x:z,y:w.top},{x:z,y:w.bottom},{x:$,y:w.bottom}],side:j}),window.clearTimeout(l.current),l.current=window.setTimeout(()=>d.onPointerGraceIntentChange(null),300)}else{if(d.onTriggerLeave(i),i.defaultPrevented)return;d.onPointerGraceIntentChange(null)}})),onKeyDown:I(e.onKeyDown,i=>{var D;const w=d.searchRef.current!=="";e.disabled||w&&i.key===" "||So[r.dir].includes(i.key)&&(o.onOpenChange(!0),(D=o.content)==null||D.focus(),i.preventDefault())})})})});On.displayName=F;var An="MenuSubContent",kn=a.forwardRef((e,t)=>{const o=hn(v,e.__scopeMenu),{forceMount:r=o.forceMount,...s}=e,d=b(v,e.__scopeMenu),u=V(v,e.__scopeMenu),l=En(An,e.__scopeMenu),f=a.useRef(null),g=B(t,f);return n.jsx(L.Provider,{scope:e.__scopeMenu,children:n.jsx(ae,{present:r||d.open,children:n.jsx(L.Slot,{scope:e.__scopeMenu,children:n.jsx(_e,{id:l.contentId,"aria-labelledby":l.triggerId,...s,ref:g,align:"start",side:u.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:m=>{var i;u.isUsingKeyboardRef.current&&((i=f.current)==null||i.focus()),m.preventDefault()},onCloseAutoFocus:m=>m.preventDefault(),onFocusOutside:I(e.onFocusOutside,m=>{m.target!==l.trigger&&d.onOpenChange(!1)}),onEscapeKeyDown:I(e.onEscapeKeyDown,m=>{u.onClose(),m.preventDefault()}),onKeyDown:I(e.onKeyDown,m=>{var D;const i=m.currentTarget.contains(m.target),w=vo[u.dir].includes(m.key);i&&w&&(d.onOpenChange(!1),(D=l.trigger)==null||D.focus(),m.preventDefault())})})})})})});kn.displayName=An;function Gn(e){return e?"open":"closed"}function se(e){return e==="indeterminate"}function Te(e){return se(e)?"indeterminate":e?"checked":"unchecked"}function Ko(e){const t=document.activeElement;for(const o of e)if(o===t||(o.focus(),document.activeElement!==t))return}function Bo(e,t){return e.map((o,r)=>e[(t+r)%e.length])}function qo(e,t,o){const s=t.length>1&&Array.from(t).every(g=>g===t[0])?t[0]:t,d=o?e.indexOf(o):-1;let u=Bo(e,Math.max(d,0));s.length===1&&(u=u.filter(g=>g!==o));const f=u.find(g=>g.toLowerCase().startsWith(s.toLowerCase()));return f!==o?f:void 0}function Uo(e,t){const{x:o,y:r}=e;let s=!1;for(let d=0,u=t.length-1;d<t.length;u=d++){const l=t[d].x,f=t[d].y,g=t[u].x,m=t[u].y;f>r!=m>r&&o<(g-l)*(r-f)/(m-f)+l&&(s=!s)}return s}function Vo(e,t){if(!t)return!1;const o={x:e.clientX,y:e.clientY};return Uo(o,t)}function K(e){return t=>t.pointerType==="mouse"?e(t):void 0}var $o=In,zo=ve,Xo=Dn,Yo=xn,Ho=Re,Wo=Sn,Zo=de,Jo=Mn,Qo=_n,et=bn,nt=Tn,ot=yn,tt=Nn,rt=Pn,st=On,at=kn,ye="DropdownMenu",[dt,wr]=cn(ye,[fn]),x=fn(),[ct,Fn]=dt(ye),Ln=e=>{const{__scopeDropdownMenu:t,children:o,dir:r,open:s,defaultOpen:d,onOpenChange:u,modal:l=!0}=e,f=x(t),g=a.useRef(null),[m=!1,i]=an({prop:s,defaultProp:d,onChange:u});return n.jsx(ct,{scope:t,triggerId:te(),triggerRef:g,contentId:te(),open:m,onOpenChange:i,onOpenToggle:a.useCallback(()=>i(w=>!w),[i]),modal:l,children:n.jsx($o,{...f,open:m,onOpenChange:i,dir:r,modal:l,children:o})})};Ln.displayName=ye;var Kn="DropdownMenuTrigger",Bn=a.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,disabled:r=!1,...s}=e,d=Fn(Kn,o),u=x(o);return n.jsx(zo,{asChild:!0,...u,children:n.jsx(O.button,{type:"button",id:d.triggerId,"aria-haspopup":"menu","aria-expanded":d.open,"aria-controls":d.open?d.contentId:void 0,"data-state":d.open?"open":"closed","data-disabled":r?"":void 0,disabled:r,...s,ref:dn(t,d.triggerRef),onPointerDown:I(e.onPointerDown,l=>{!r&&l.button===0&&l.ctrlKey===!1&&(d.onOpenToggle(),d.open||l.preventDefault())}),onKeyDown:I(e.onKeyDown,l=>{r||(["Enter"," "].includes(l.key)&&d.onOpenToggle(),l.key==="ArrowDown"&&d.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(l.key)&&l.preventDefault())})})})});Bn.displayName=Kn;var it="DropdownMenuPortal",qn=e=>{const{__scopeDropdownMenu:t,...o}=e,r=x(t);return n.jsx(Xo,{...r,...o})};qn.displayName=it;var Un="DropdownMenuContent",Vn=a.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,s=Fn(Un,o),d=x(o),u=a.useRef(!1);return n.jsx(Yo,{id:s.contentId,"aria-labelledby":s.triggerId,...d,...r,ref:t,onCloseAutoFocus:I(e.onCloseAutoFocus,l=>{var f;u.current||(f=s.triggerRef.current)==null||f.focus(),u.current=!1,l.preventDefault()}),onInteractOutside:I(e.onInteractOutside,l=>{const f=l.detail.originalEvent,g=f.button===0&&f.ctrlKey===!0,m=f.button===2||g;(!s.modal||m)&&(u.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});Vn.displayName=Un;var ut="DropdownMenuGroup",$n=a.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,s=x(o);return n.jsx(Ho,{...s,...r,ref:t})});$n.displayName=ut;var lt="DropdownMenuLabel",pt=a.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,s=x(o);return n.jsx(Wo,{...s,...r,ref:t})});pt.displayName=lt;var mt="DropdownMenuItem",zn=a.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,s=x(o);return n.jsx(Zo,{...s,...r,ref:t})});zn.displayName=mt;var ft="DropdownMenuCheckboxItem",wt=a.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,s=x(o);return n.jsx(Jo,{...s,...r,ref:t})});wt.displayName=ft;var gt="DropdownMenuRadioGroup",It=a.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,s=x(o);return n.jsx(Qo,{...s,...r,ref:t})});It.displayName=gt;var ht="DropdownMenuRadioItem",Dt=a.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,s=x(o);return n.jsx(et,{...s,...r,ref:t})});Dt.displayName=ht;var xt="DropdownMenuItemIndicator",St=a.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,s=x(o);return n.jsx(nt,{...s,...r,ref:t})});St.displayName=xt;var vt="DropdownMenuSeparator",Mt=a.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,s=x(o);return n.jsx(ot,{...s,...r,ref:t})});Mt.displayName=vt;var Ct="DropdownMenuArrow",_t=a.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,s=x(o);return n.jsx(tt,{...s,...r,ref:t})});_t.displayName=Ct;var Rt=e=>{const{__scopeDropdownMenu:t,children:o,open:r,onOpenChange:s,defaultOpen:d}=e,u=x(t),[l=!1,f]=an({prop:r,defaultProp:d,onChange:s});return n.jsx(rt,{...u,open:l,onOpenChange:f,children:o})},bt="DropdownMenuSubTrigger",Xn=a.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,s=x(o);return n.jsx(st,{...s,...r,ref:t})});Xn.displayName=bt;var jt="DropdownMenuSubContent",Yn=a.forwardRef((e,t)=>{const{__scopeDropdownMenu:o,...r}=e,s=x(o);return n.jsx(at,{...s,...r,ref:t,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});Yn.displayName=jt;var Tt=Ln,yt=Bn,Hn=qn,Nt=Vn,Et=$n,Pt=zn,Ot=Rt,At=Xn,kt=Yn;const Gt="_content_11ubj_5",Ft="_subContent_11ubj_6",Lt="_item_11ubj_16",Kt="_subTrigger_11ubj_17",Bt="_subMenuIndicator_11ubj_54",qt="_group_11ubj_60",Ut="_slot_11ubj_67",T={content:Gt,subContent:Ft,item:Lt,subTrigger:Kt,subMenuIndicator:Bt,group:qt,slot:Ut},ce=({children:e,open:t,onOpenChange:o,"data-test-id":r="fondue-dropdown"})=>n.jsx(Tt,{open:t,onOpenChange:o,"data-test-id":r,children:e});ce.displayName="Dropdown.Root";const ie=({children:e,"data-test-id":t="fondue-dropdown-trigger"},o)=>n.jsx(yt,{asChild:!0,"data-test-id":t,ref:o,children:e});ie.displayName="Dropdown.Trigger";const ue=({children:e,"data-test-id":t="fondue-dropdown-content"},o)=>n.jsx(Hn,{children:n.jsx(Nt,{align:"start",collisionPadding:8,sideOffset:8,className:T.content,"data-test-id":t,ref:o,children:e})});ue.displayName="Dropdown.Content";const le=({children:e,"data-test-id":t="fondue-dropdown-group"},o)=>n.jsx(Et,{className:T.group,"data-test-id":t,ref:o,children:e});le.displayName="Dropdown.Group";const pe=({children:e,"data-test-id":t="fondue-dropdown-submenu"})=>n.jsx(Ot,{"data-test-id":t,children:e});pe.displayName="Dropdown.SubMenu";const me=({children:e,"data-test-id":t="fondue-dropdown-subtrigger"},o)=>n.jsxs(At,{className:T.subTrigger,"data-test-id":t,ref:o,children:[e,n.jsx(oo,{className:T.subMenuIndicator,size:16})]});me.displayName="Dropdown.SubTrigger";const fe=({children:e,"data-test-id":t="fondue-dropdown-subcontent"},o)=>n.jsx(Hn,{children:n.jsx(kt,{className:T.subContent,"data-test-id":t,ref:o,children:e})});fe.displayName="Dropdown.SubContent";const we=({children:e,disabled:t,textValue:o,onSelect:r,"data-test-id":s="fondue-dropdown-subtrigger",...d},u)=>n.jsx(Pt,{onSelect:r,className:T.item,textValue:o,"data-test-id":s,ref:u,disabled:t,...d,children:e});we.displayName="Dropdown.Item";const Ne=({children:e,name:t,"data-test-id":o="fondue-dropdown-slot"},r)=>n.jsx("div",{"data-name":t,className:T.slot,"data-test-id":o,ref:r,children:e});Ne.displayName="Dropdown.Slot";const Vt=a.forwardRef(ie),$t=a.forwardRef(ue),zt=a.forwardRef(le),Xt=a.forwardRef(me),Yt=a.forwardRef(fe),Ht=a.forwardRef(we),Wt=a.forwardRef(Ne),c={Root:ce,Trigger:Vt,Content:$t,Group:zt,SubMenu:pe,SubTrigger:Xt,SubContent:Yt,Item:Ht,Slot:Wt};ce.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Root",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},open:{required:!1,tsType:{name:"boolean"},description:"Controls the open state of the dropdown."},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Callback that is called when the open state of the dropdown changes."},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown'",computed:!1}}}};ie.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Trigger",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-trigger'",computed:!1}}}};ue.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Content",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-content'",computed:!1}}}};le.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Group",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-group'",computed:!1}}}};pe.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubMenu",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-submenu'",computed:!1}}}};me.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubTrigger",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subtrigger'",computed:!1}}}};fe.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubContent",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subcontent'",computed:!1}}}};we.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Item",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"Disables the item."},textValue:{required:!1,tsType:{name:"string"},description:"The text value of the item that is passed to the onSelect callback."},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(event: Event) => void",signature:{arguments:[{type:{name:"Event"},name:"event"}],return:{name:"void"}}},description:"Callback that is called when the item is selected."},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subtrigger'",computed:!1}}}};Ne.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Slot",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},name:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-slot'",computed:!1}}}};const gr={component:ce,subcomponents:{"Dropdown.Trigger":ie,"Dropdown.Content":ue,"Dropdown.Item":we,"Dropdown.Group":le,"Dropdown.SubMenu":pe,"Dropdown.SubTrigger":me,"Dropdown.SubContent":fe},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{}},W={render:({...e})=>n.jsxs(c.Root,{...e,children:[n.jsx(c.Trigger,{children:n.jsx(R,{children:"Trigger"})}),n.jsxs(c.Content,{children:[n.jsx(c.Item,{onSelect:()=>{},children:"Item 1"}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 2"}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 3"})]})]})},Z={render:({...e})=>n.jsxs(c.Root,{...e,children:[n.jsx(c.Trigger,{children:n.jsx(R,{children:"Trigger"})}),n.jsxs(c.Content,{children:[n.jsx(c.Item,{onSelect:()=>{},children:"Item 1"}),n.jsx(c.Item,{onSelect:()=>{},disabled:!0,children:"Item 2"}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 3"})]})]})},J={render:({...e})=>n.jsxs(c.Root,{...e,children:[n.jsx(c.Trigger,{children:n.jsx(R,{children:"Trigger"})}),n.jsxs(c.Content,{children:[n.jsx(c.Item,{onSelect:()=>{},children:"Item 1"}),n.jsxs(c.Group,{children:[n.jsx(c.Item,{onSelect:()=>{},children:"Item 2"}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 3"}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 4"})]}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 5"}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 6"})]})]})},Q={render:({...e})=>n.jsxs(c.Root,{...e,children:[n.jsx(c.Trigger,{children:n.jsx(R,{children:"Trigger"})}),n.jsxs(c.Content,{children:[n.jsx(c.Item,{onSelect:()=>{},children:"Item 1"}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 2"}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 3"}),n.jsxs(c.SubMenu,{children:[n.jsx(c.SubTrigger,{children:"Item 4"}),n.jsxs(c.SubContent,{children:[n.jsx(c.Item,{onSelect:()=>{},children:"Item 4.1"}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 4.2"}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 4.3"})]})]}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 5"}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 6"})]})]})},ee={render:({...e})=>n.jsxs(c.Root,{...e,children:[n.jsx(c.Trigger,{children:n.jsx(R,{children:"Trigger"})}),n.jsxs(c.Content,{children:[n.jsxs(c.Item,{onSelect:()=>{},children:[n.jsx(c.Slot,{name:"left",children:n.jsx(G,{size:16})}),"Left decorator"]}),n.jsxs(c.Item,{onSelect:()=>{},children:[n.jsx(c.Slot,{name:"right",children:n.jsx(G,{size:16})}),"Right decorator"]}),n.jsxs(c.Item,{onSelect:()=>{},children:[n.jsx(c.Slot,{children:n.jsx(G,{size:16})}),"Implicit placement left"]}),n.jsxs(c.Item,{onSelect:()=>{},children:[n.jsx(c.Slot,{children:n.jsx(G,{size:16})}),n.jsx(c.Slot,{children:n.jsx(G,{size:16})}),"Implicit placement both"]}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 5"}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 6"})]})]})},ne={render:({...e})=>n.jsxs(c.Root,{...e,children:[n.jsx(c.Trigger,{children:n.jsx(R,{children:"Trigger"})}),n.jsxs(c.Content,{children:[n.jsx(c.Item,{onSelect:()=>{},children:"Item 1"}),n.jsx(c.Item,{onSelect:()=>{},children:n.jsx("div",{className:"tw-bg-red-50",children:"test bla"})}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 2"}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 3"})]})]})},oe={decorators:[e=>n.jsx("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-w-fit",children:n.jsx(e,{})})],render:({...e})=>{const[t,o]=a.useState(!1);return n.jsxs(n.Fragment,{children:[n.jsx(R,{onPress:()=>o(!t),children:"External Toggle Dropdown"}),n.jsxs(c.Root,{...e,open:t,onOpenChange:o,children:[n.jsx(c.Trigger,{children:n.jsx(R,{variant:"loud",children:"Trigger"})}),n.jsxs(c.Content,{children:[n.jsx(c.Item,{onSelect:()=>{},children:"Item 1"}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 2"}),n.jsx(c.Item,{onSelect:()=>{},children:"Item 3"})]})]})]})}};var Le,Ke,Be;W.parameters={...W.parameters,docs:{...(Le=W.parameters)==null?void 0:Le.docs,source:{originalSource:`{
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
}`,...(Be=(Ke=W.parameters)==null?void 0:Ke.docs)==null?void 0:Be.source}}};var qe,Ue,Ve;Z.parameters={...Z.parameters,docs:{...(qe=Z.parameters)==null?void 0:qe.docs,source:{originalSource:`{
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
}`,...(Ve=(Ue=Z.parameters)==null?void 0:Ue.docs)==null?void 0:Ve.source}}};var $e,ze,Xe;J.parameters={...J.parameters,docs:{...($e=J.parameters)==null?void 0:$e.docs,source:{originalSource:`{
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
}`,...(Xe=(ze=J.parameters)==null?void 0:ze.docs)==null?void 0:Xe.source}}};var Ye,He,We;Q.parameters={...Q.parameters,docs:{...(Ye=Q.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
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
}`,...(We=(He=Q.parameters)==null?void 0:He.docs)==null?void 0:We.source}}};var Ze,Je,Qe;ee.parameters={...ee.parameters,docs:{...(Ze=ee.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
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
}`,...(Qe=(Je=ee.parameters)==null?void 0:Je.docs)==null?void 0:Qe.source}}};var en,nn,on;ne.parameters={...ne.parameters,docs:{...(en=ne.parameters)==null?void 0:en.docs,source:{originalSource:`{
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
}`,...(on=(nn=ne.parameters)==null?void 0:nn.docs)==null?void 0:on.source}}};var tn,rn,sn;oe.parameters={...oe.parameters,docs:{...(tn=oe.parameters)==null?void 0:tn.docs,source:{originalSource:`{
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
}`,...(sn=(rn=oe.parameters)==null?void 0:rn.docs)==null?void 0:sn.source}}};const Ir=["Default","DisabledItems","ItemGroups","SubMenus","Decorator","CustomItem","ControlledComponent"];export{oe as ControlledComponent,ne as CustomItem,ee as Decorator,W as Default,Z as DisabledItems,J as ItemGroups,Q as SubMenus,Ir as __namedExportsOrder,gr as default};