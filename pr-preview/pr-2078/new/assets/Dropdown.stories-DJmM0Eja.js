import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as d}from"./index-BwDkhjyp.js";import{f as xo,c as k}from"./fondue-icons331-DgfJDM8m.js";import{B as C}from"./Button-Bmc9bttI.js";import{c as I,u as je}from"./index-DOnKqARA.js";import{u as K,P as O,c as Mn,S as So,d as vo}from"./index-Brw_kfkv.js";import{c as jn}from"./index-BWD2N0gV.js";import{u as _n}from"./index-DGaPG0k3.js";import{c as Co}from"./index-BCwfsm-V.js";import{u as Mo}from"./index-C8IlRUt1.js";import{c as Rn,A as jo,D as _o,C as Ro,a as To,R as Tn,P as bo}from"./index-9q6yCIGA.js";import{h as yo,u as No,F as Eo,R as Po,b as Oo,s as qe}from"./usePreventDropdownOverflow-hl17Ppn0.js";import{u as de}from"./index-DduqEaLY.js";import{P as le}from"./index-BwIM2_zL.js";import{c as bn,R as Ao,I as Go}from"./index-ImmjAmjo.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-BnElyh0X.js";import"./focusStyle-IgMhxCMT.js";import"./index-DxjWwZXO.js";import"./index-kUwV4muI.js";var Me=["Enter"," "],ko=["ArrowDown","PageUp","Home"],yn=["ArrowUp","PageDown","End"],Fo=[...ko,...yn],Lo={ltr:[...Me,"ArrowRight"],rtl:[...Me,"ArrowLeft"]},Bo={ltr:["ArrowLeft"],rtl:["ArrowRight"]},q="Menu",[L,Ko,qo]=Co(q),[y,Nn]=jn(q,[qo,Rn,bn]),V=Rn(),En=bn(),[Pn,T]=y(q),[Vo,U]=y(q),On=n=>{const{__scopeMenu:t,open:o=!1,children:s,dir:a,onOpenChange:c,modal:l=!0}=n,u=V(t),[w,g]=d.useState(null),m=d.useRef(!1),i=je(c),f=Mo(a);return d.useEffect(()=>{const D=()=>{m.current=!0,document.addEventListener("pointerdown",h,{capture:!0,once:!0}),document.addEventListener("pointermove",h,{capture:!0,once:!0})},h=()=>m.current=!1;return document.addEventListener("keydown",D,{capture:!0}),()=>{document.removeEventListener("keydown",D,{capture:!0}),document.removeEventListener("pointerdown",h,{capture:!0}),document.removeEventListener("pointermove",h,{capture:!0})}},[]),e.jsx(Tn,{...u,children:e.jsx(Pn,{scope:t,open:o,onOpenChange:i,content:w,onContentChange:g,children:e.jsx(Vo,{scope:t,onClose:d.useCallback(()=>i(!1),[i]),isUsingKeyboardRef:m,dir:f,modal:l,children:s})})})};On.displayName=q;var Uo="MenuAnchor",_e=d.forwardRef((n,t)=>{const{__scopeMenu:o,...s}=n,a=V(o);return e.jsx(jo,{...a,...s,ref:t})});_e.displayName=Uo;var Re="MenuPortal",[$o,An]=y(Re,{forceMount:void 0}),Gn=n=>{const{__scopeMenu:t,forceMount:o,children:s,container:a}=n,c=T(Re,t);return e.jsx($o,{scope:t,forceMount:o,children:e.jsx(le,{present:o||c.open,children:e.jsx(bo,{asChild:!0,container:a,children:s})})})};Gn.displayName=Re;var v="MenuContent",[zo,Te]=y(v),kn=d.forwardRef((n,t)=>{const o=An(v,n.__scopeMenu),{forceMount:s=o.forceMount,...a}=n,c=T(v,n.__scopeMenu),l=U(v,n.__scopeMenu);return e.jsx(L.Provider,{scope:n.__scopeMenu,children:e.jsx(le,{present:s||c.open,children:e.jsx(L.Slot,{scope:n.__scopeMenu,children:l.modal?e.jsx(Xo,{...a,ref:t}):e.jsx(Yo,{...a,ref:t})})})})}),Xo=d.forwardRef((n,t)=>{const o=T(v,n.__scopeMenu),s=d.useRef(null),a=K(t,s);return d.useEffect(()=>{const c=s.current;if(c)return yo(c)},[]),e.jsx(be,{...n,ref:a,trapFocus:o.open,disableOutsidePointerEvents:o.open,disableOutsideScroll:!0,onFocusOutside:I(n.onFocusOutside,c=>c.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>o.onOpenChange(!1)})}),Yo=d.forwardRef((n,t)=>{const o=T(v,n.__scopeMenu);return e.jsx(be,{...n,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>o.onOpenChange(!1)})}),be=d.forwardRef((n,t)=>{const{__scopeMenu:o,loop:s=!1,trapFocus:a,onOpenAutoFocus:c,onCloseAutoFocus:l,disableOutsidePointerEvents:u,onEntryFocus:w,onEscapeKeyDown:g,onPointerDownOutside:m,onFocusOutside:i,onInteractOutside:f,onDismiss:D,disableOutsideScroll:h,...b}=n,N=T(v,o),A=U(v,o),$=V(o),z=En(o),Ge=Ko(o),[wo,ke]=d.useState(null),X=d.useRef(null),fo=K(t,X,N.onContentChange),Y=d.useRef(0),H=d.useRef(""),go=d.useRef(0),xe=d.useRef(null),Fe=d.useRef("right"),Se=d.useRef(0),Io=h?Po:d.Fragment,ho=h?{as:So,allowPinchZoom:!0}:void 0,Do=p=>{var P,Be;const S=H.current+p,M=Ge().filter(j=>!j.disabled),R=document.activeElement,ve=(P=M.find(j=>j.ref.current===R))==null?void 0:P.textValue,Ce=M.map(j=>j.textValue),Le=at(Ce,S,ve),G=(Be=M.find(j=>j.textValue===Le))==null?void 0:Be.ref.current;(function j(Ke){H.current=Ke,window.clearTimeout(Y.current),Ke!==""&&(Y.current=window.setTimeout(()=>j(""),1e3))})(S),G&&setTimeout(()=>G.focus())};d.useEffect(()=>()=>window.clearTimeout(Y.current),[]),No();const E=d.useCallback(p=>{var M,R;return Fe.current===((M=xe.current)==null?void 0:M.side)&&ct(p,(R=xe.current)==null?void 0:R.area)},[]);return e.jsx(zo,{scope:o,searchRef:H,onItemEnter:d.useCallback(p=>{E(p)&&p.preventDefault()},[E]),onItemLeave:d.useCallback(p=>{var S;E(p)||((S=X.current)==null||S.focus(),ke(null))},[E]),onTriggerLeave:d.useCallback(p=>{E(p)&&p.preventDefault()},[E]),pointerGraceTimerRef:go,onPointerGraceIntentChange:d.useCallback(p=>{xe.current=p},[]),children:e.jsx(Io,{...ho,children:e.jsx(Eo,{asChild:!0,trapped:a,onMountAutoFocus:I(c,p=>{var S;p.preventDefault(),(S=X.current)==null||S.focus({preventScroll:!0})}),onUnmountAutoFocus:l,children:e.jsx(_o,{asChild:!0,disableOutsidePointerEvents:u,onEscapeKeyDown:g,onPointerDownOutside:m,onFocusOutside:i,onInteractOutside:f,onDismiss:D,children:e.jsx(Ao,{asChild:!0,...z,dir:A.dir,orientation:"vertical",loop:s,currentTabStopId:wo,onCurrentTabStopIdChange:ke,onEntryFocus:I(w,p=>{A.isUsingKeyboardRef.current||p.preventDefault()}),preventScrollOnEntryFocus:!0,children:e.jsx(Ro,{role:"menu","aria-orientation":"vertical","data-state":eo(N.open),"data-radix-menu-content":"",dir:A.dir,...$,...b,ref:fo,style:{outline:"none",...b.style},onKeyDown:I(b.onKeyDown,p=>{const M=p.target.closest("[data-radix-menu-content]")===p.currentTarget,R=p.ctrlKey||p.altKey||p.metaKey,ve=p.key.length===1;M&&(p.key==="Tab"&&p.preventDefault(),!R&&ve&&Do(p.key));const Ce=X.current;if(p.target!==Ce||!Fo.includes(p.key))return;p.preventDefault();const G=Ge().filter(P=>!P.disabled).map(P=>P.ref.current);yn.includes(p.key)&&G.reverse(),rt(G)}),onBlur:I(n.onBlur,p=>{p.currentTarget.contains(p.target)||(window.clearTimeout(Y.current),H.current="")}),onPointerMove:I(n.onPointerMove,B(p=>{const S=p.target,M=Se.current!==p.clientX;if(p.currentTarget.contains(S)&&M){const R=p.clientX>Se.current?"right":"left";Fe.current=R,Se.current=p.clientX}}))})})})})})})});kn.displayName=v;var Ho="MenuGroup",ye=d.forwardRef((n,t)=>{const{__scopeMenu:o,...s}=n;return e.jsx(O.div,{role:"group",...s,ref:t})});ye.displayName=Ho;var Wo="MenuLabel",Fn=d.forwardRef((n,t)=>{const{__scopeMenu:o,...s}=n;return e.jsx(O.div,{...s,ref:t})});Fn.displayName=Wo;var ce="MenuItem",Ve="menu.itemSelect",ue=d.forwardRef((n,t)=>{const{disabled:o=!1,onSelect:s,...a}=n,c=d.useRef(null),l=U(ce,n.__scopeMenu),u=Te(ce,n.__scopeMenu),w=K(t,c),g=d.useRef(!1),m=()=>{const i=c.current;if(!o&&i){const f=new CustomEvent(Ve,{bubbles:!0,cancelable:!0});i.addEventListener(Ve,D=>s==null?void 0:s(D),{once:!0}),vo(i,f),f.defaultPrevented?g.current=!1:l.onClose()}};return e.jsx(Ln,{...a,ref:w,disabled:o,onClick:I(n.onClick,m),onPointerDown:i=>{var f;(f=n.onPointerDown)==null||f.call(n,i),g.current=!0},onPointerUp:I(n.onPointerUp,i=>{var f;g.current||(f=i.currentTarget)==null||f.click()}),onKeyDown:I(n.onKeyDown,i=>{const f=u.searchRef.current!=="";o||f&&i.key===" "||Me.includes(i.key)&&(i.currentTarget.click(),i.preventDefault())})})});ue.displayName=ce;var Ln=d.forwardRef((n,t)=>{const{__scopeMenu:o,disabled:s=!1,textValue:a,...c}=n,l=Te(ce,o),u=En(o),w=d.useRef(null),g=K(t,w),[m,i]=d.useState(!1),[f,D]=d.useState("");return d.useEffect(()=>{const h=w.current;h&&D((h.textContent??"").trim())},[c.children]),e.jsx(L.ItemSlot,{scope:o,disabled:s,textValue:a??f,children:e.jsx(Go,{asChild:!0,...u,focusable:!s,children:e.jsx(O.div,{role:"menuitem","data-highlighted":m?"":void 0,"aria-disabled":s||void 0,"data-disabled":s?"":void 0,...c,ref:g,onPointerMove:I(n.onPointerMove,B(h=>{s?l.onItemLeave(h):(l.onItemEnter(h),h.defaultPrevented||h.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:I(n.onPointerLeave,B(h=>l.onItemLeave(h))),onFocus:I(n.onFocus,()=>i(!0)),onBlur:I(n.onBlur,()=>i(!1))})})})}),Zo="MenuCheckboxItem",Bn=d.forwardRef((n,t)=>{const{checked:o=!1,onCheckedChange:s,...a}=n;return e.jsx($n,{scope:n.__scopeMenu,checked:o,children:e.jsx(ue,{role:"menuitemcheckbox","aria-checked":ie(o)?"mixed":o,...a,ref:t,"data-state":Pe(o),onSelect:I(a.onSelect,()=>s==null?void 0:s(ie(o)?!0:!o),{checkForDefaultPrevented:!1})})})});Bn.displayName=Zo;var Kn="MenuRadioGroup",[Jo,Qo]=y(Kn,{value:void 0,onValueChange:()=>{}}),qn=d.forwardRef((n,t)=>{const{value:o,onValueChange:s,...a}=n,c=je(s);return e.jsx(Jo,{scope:n.__scopeMenu,value:o,onValueChange:c,children:e.jsx(ye,{...a,ref:t})})});qn.displayName=Kn;var Vn="MenuRadioItem",Un=d.forwardRef((n,t)=>{const{value:o,...s}=n,a=Qo(Vn,n.__scopeMenu),c=o===a.value;return e.jsx($n,{scope:n.__scopeMenu,checked:c,children:e.jsx(ue,{role:"menuitemradio","aria-checked":c,...s,ref:t,"data-state":Pe(c),onSelect:I(s.onSelect,()=>{var l;return(l=a.onValueChange)==null?void 0:l.call(a,o)},{checkForDefaultPrevented:!1})})})});Un.displayName=Vn;var Ne="MenuItemIndicator",[$n,et]=y(Ne,{checked:!1}),zn=d.forwardRef((n,t)=>{const{__scopeMenu:o,forceMount:s,...a}=n,c=et(Ne,o);return e.jsx(le,{present:s||ie(c.checked)||c.checked===!0,children:e.jsx(O.span,{...a,ref:t,"data-state":Pe(c.checked)})})});zn.displayName=Ne;var nt="MenuSeparator",Xn=d.forwardRef((n,t)=>{const{__scopeMenu:o,...s}=n;return e.jsx(O.div,{role:"separator","aria-orientation":"horizontal",...s,ref:t})});Xn.displayName=nt;var ot="MenuArrow",Yn=d.forwardRef((n,t)=>{const{__scopeMenu:o,...s}=n,a=V(o);return e.jsx(To,{...a,...s,ref:t})});Yn.displayName=ot;var Ee="MenuSub",[tt,Hn]=y(Ee),Wn=n=>{const{__scopeMenu:t,children:o,open:s=!1,onOpenChange:a}=n,c=T(Ee,t),l=V(t),[u,w]=d.useState(null),[g,m]=d.useState(null),i=je(a);return d.useEffect(()=>(c.open===!1&&i(!1),()=>i(!1)),[c.open,i]),e.jsx(Tn,{...l,children:e.jsx(Pn,{scope:t,open:s,onOpenChange:i,content:g,onContentChange:m,children:e.jsx(tt,{scope:t,contentId:de(),triggerId:de(),trigger:u,onTriggerChange:w,children:o})})})};Wn.displayName=Ee;var F="MenuSubTrigger",Zn=d.forwardRef((n,t)=>{const o=T(F,n.__scopeMenu),s=U(F,n.__scopeMenu),a=Hn(F,n.__scopeMenu),c=Te(F,n.__scopeMenu),l=d.useRef(null),{pointerGraceTimerRef:u,onPointerGraceIntentChange:w}=c,g={__scopeMenu:n.__scopeMenu},m=d.useCallback(()=>{l.current&&window.clearTimeout(l.current),l.current=null},[]);return d.useEffect(()=>m,[m]),d.useEffect(()=>{const i=u.current;return()=>{window.clearTimeout(i),w(null)}},[u,w]),e.jsx(_e,{asChild:!0,...g,children:e.jsx(Ln,{id:a.triggerId,"aria-haspopup":"menu","aria-expanded":o.open,"aria-controls":a.contentId,"data-state":eo(o.open),...n,ref:Mn(t,a.onTriggerChange),onClick:i=>{var f;(f=n.onClick)==null||f.call(n,i),!(n.disabled||i.defaultPrevented)&&(i.currentTarget.focus(),o.open||o.onOpenChange(!0))},onPointerMove:I(n.onPointerMove,B(i=>{c.onItemEnter(i),!i.defaultPrevented&&!n.disabled&&!o.open&&!l.current&&(c.onPointerGraceIntentChange(null),l.current=window.setTimeout(()=>{o.onOpenChange(!0),m()},100))})),onPointerLeave:I(n.onPointerLeave,B(i=>{var D,h;m();const f=(D=o.content)==null?void 0:D.getBoundingClientRect();if(f){const b=(h=o.content)==null?void 0:h.dataset.side,N=b==="right",A=N?-5:5,$=f[N?"left":"right"],z=f[N?"right":"left"];c.onPointerGraceIntentChange({area:[{x:i.clientX+A,y:i.clientY},{x:$,y:f.top},{x:z,y:f.top},{x:z,y:f.bottom},{x:$,y:f.bottom}],side:b}),window.clearTimeout(u.current),u.current=window.setTimeout(()=>c.onPointerGraceIntentChange(null),300)}else{if(c.onTriggerLeave(i),i.defaultPrevented)return;c.onPointerGraceIntentChange(null)}})),onKeyDown:I(n.onKeyDown,i=>{var D;const f=c.searchRef.current!=="";n.disabled||f&&i.key===" "||Lo[s.dir].includes(i.key)&&(o.onOpenChange(!0),(D=o.content)==null||D.focus(),i.preventDefault())})})})});Zn.displayName=F;var Jn="MenuSubContent",Qn=d.forwardRef((n,t)=>{const o=An(v,n.__scopeMenu),{forceMount:s=o.forceMount,...a}=n,c=T(v,n.__scopeMenu),l=U(v,n.__scopeMenu),u=Hn(Jn,n.__scopeMenu),w=d.useRef(null),g=K(t,w);return e.jsx(L.Provider,{scope:n.__scopeMenu,children:e.jsx(le,{present:s||c.open,children:e.jsx(L.Slot,{scope:n.__scopeMenu,children:e.jsx(be,{id:u.contentId,"aria-labelledby":u.triggerId,...a,ref:g,align:"start",side:l.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:m=>{var i;l.isUsingKeyboardRef.current&&((i=w.current)==null||i.focus()),m.preventDefault()},onCloseAutoFocus:m=>m.preventDefault(),onFocusOutside:I(n.onFocusOutside,m=>{m.target!==u.trigger&&c.onOpenChange(!1)}),onEscapeKeyDown:I(n.onEscapeKeyDown,m=>{l.onClose(),m.preventDefault()}),onKeyDown:I(n.onKeyDown,m=>{var D;const i=m.currentTarget.contains(m.target),f=Bo[l.dir].includes(m.key);i&&f&&(c.onOpenChange(!1),(D=u.trigger)==null||D.focus(),m.preventDefault())})})})})})});Qn.displayName=Jn;function eo(n){return n?"open":"closed"}function ie(n){return n==="indeterminate"}function Pe(n){return ie(n)?"indeterminate":n?"checked":"unchecked"}function rt(n){const t=document.activeElement;for(const o of n)if(o===t||(o.focus(),document.activeElement!==t))return}function st(n,t){return n.map((o,s)=>n[(t+s)%n.length])}function at(n,t,o){const a=t.length>1&&Array.from(t).every(g=>g===t[0])?t[0]:t,c=o?n.indexOf(o):-1;let l=st(n,Math.max(c,0));a.length===1&&(l=l.filter(g=>g!==o));const w=l.find(g=>g.toLowerCase().startsWith(a.toLowerCase()));return w!==o?w:void 0}function dt(n,t){const{x:o,y:s}=n;let a=!1;for(let c=0,l=t.length-1;c<t.length;l=c++){const u=t[c].x,w=t[c].y,g=t[l].x,m=t[l].y;w>s!=m>s&&o<(g-u)*(s-w)/(m-w)+u&&(a=!a)}return a}function ct(n,t){if(!t)return!1;const o={x:n.clientX,y:n.clientY};return dt(o,t)}function B(n){return t=>t.pointerType==="mouse"?n(t):void 0}var it=On,lt=_e,ut=Gn,pt=kn,mt=ye,wt=Fn,ft=ue,gt=Bn,It=qn,ht=Un,Dt=zn,xt=Xn,St=Yn,vt=Wn,Ct=Zn,Mt=Qn,Oe="DropdownMenu",[jt,Gr]=jn(Oe,[Nn]),x=Nn(),[_t,no]=jt(Oe),oo=n=>{const{__scopeDropdownMenu:t,children:o,dir:s,open:a,defaultOpen:c,onOpenChange:l,modal:u=!0}=n,w=x(t),g=d.useRef(null),[m=!1,i]=_n({prop:a,defaultProp:c,onChange:l});return e.jsx(_t,{scope:t,triggerId:de(),triggerRef:g,contentId:de(),open:m,onOpenChange:i,onOpenToggle:d.useCallback(()=>i(f=>!f),[i]),modal:u,children:e.jsx(it,{...w,open:m,onOpenChange:i,dir:s,modal:u,children:o})})};oo.displayName=Oe;var to="DropdownMenuTrigger",ro=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,disabled:s=!1,...a}=n,c=no(to,o),l=x(o);return e.jsx(lt,{asChild:!0,...l,children:e.jsx(O.button,{type:"button",id:c.triggerId,"aria-haspopup":"menu","aria-expanded":c.open,"aria-controls":c.open?c.contentId:void 0,"data-state":c.open?"open":"closed","data-disabled":s?"":void 0,disabled:s,...a,ref:Mn(t,c.triggerRef),onPointerDown:I(n.onPointerDown,u=>{!s&&u.button===0&&u.ctrlKey===!1&&(c.onOpenToggle(),c.open||u.preventDefault())}),onKeyDown:I(n.onKeyDown,u=>{s||(["Enter"," "].includes(u.key)&&c.onOpenToggle(),u.key==="ArrowDown"&&c.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(u.key)&&u.preventDefault())})})})});ro.displayName=to;var Rt="DropdownMenuPortal",so=n=>{const{__scopeDropdownMenu:t,...o}=n,s=x(t);return e.jsx(ut,{...s,...o})};so.displayName=Rt;var ao="DropdownMenuContent",co=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=no(ao,o),c=x(o),l=d.useRef(!1);return e.jsx(pt,{id:a.contentId,"aria-labelledby":a.triggerId,...c,...s,ref:t,onCloseAutoFocus:I(n.onCloseAutoFocus,u=>{var w;l.current||(w=a.triggerRef.current)==null||w.focus(),l.current=!1,u.preventDefault()}),onInteractOutside:I(n.onInteractOutside,u=>{const w=u.detail.originalEvent,g=w.button===0&&w.ctrlKey===!0,m=w.button===2||g;(!a.modal||m)&&(l.current=!0)}),style:{...n.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});co.displayName=ao;var Tt="DropdownMenuGroup",io=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(mt,{...a,...s,ref:t})});io.displayName=Tt;var bt="DropdownMenuLabel",yt=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(wt,{...a,...s,ref:t})});yt.displayName=bt;var Nt="DropdownMenuItem",lo=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(ft,{...a,...s,ref:t})});lo.displayName=Nt;var Et="DropdownMenuCheckboxItem",Pt=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(gt,{...a,...s,ref:t})});Pt.displayName=Et;var Ot="DropdownMenuRadioGroup",At=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(It,{...a,...s,ref:t})});At.displayName=Ot;var Gt="DropdownMenuRadioItem",kt=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(ht,{...a,...s,ref:t})});kt.displayName=Gt;var Ft="DropdownMenuItemIndicator",Lt=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(Dt,{...a,...s,ref:t})});Lt.displayName=Ft;var Bt="DropdownMenuSeparator",Kt=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(xt,{...a,...s,ref:t})});Kt.displayName=Bt;var qt="DropdownMenuArrow",Vt=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(St,{...a,...s,ref:t})});Vt.displayName=qt;var Ut=n=>{const{__scopeDropdownMenu:t,children:o,open:s,onOpenChange:a,defaultOpen:c}=n,l=x(t),[u=!1,w]=_n({prop:s,defaultProp:c,onChange:a});return e.jsx(vt,{...l,open:u,onOpenChange:w,children:o})},$t="DropdownMenuSubTrigger",uo=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(Ct,{...a,...s,ref:t})});uo.displayName=$t;var zt="DropdownMenuSubContent",po=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(Mt,{...a,...s,ref:t,style:{...n.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});po.displayName=zt;var Xt=oo,Yt=ro,mo=so,Ht=co,Wt=io,Zt=lo,Jt=Ut,Qt=uo,er=po;const nr="_content_1phow_5",or="_subContent_1phow_6",tr="_item_1phow_32",rr="_subTrigger_1phow_33",sr="_itemContent_1phow_78",ar="_subMenuIndicator_1phow_85",dr="_group_1phow_91",cr="_slot_1phow_98",_={content:nr,subContent:or,item:tr,subTrigger:rr,itemContent:sr,subMenuIndicator:ar,group:dr,slot:cr},pe=({children:n,open:t,onOpenChange:o,"data-test-id":s="fondue-dropdown"})=>e.jsx(Xt,{open:t,onOpenChange:o,"data-test-id":s,children:n});pe.displayName="Dropdown.Root";const me=({asChild:n=!0,children:t,"data-test-id":o="fondue-dropdown-trigger"},s)=>e.jsx(Yt,{asChild:n,"data-test-id":o,ref:s,children:t});me.displayName="Dropdown.Trigger";const we=({onOpen:n,onClose:t,side:o="bottom",children:s,"data-test-id":a="fondue-dropdown-content"},c)=>{const l=d.useRef(null),u=d.useRef(!1),{setMaxHeight:w}=Oo(l);return e.jsx(mo,{children:e.jsx(Ht,{align:"start",collisionPadding:8,sideOffset:8,side:o,className:_.content,"data-test-id":a,ref:l,onCloseAutoFocus:()=>{qe(l,c),t&&t(),u.current=!1},onFocus:()=>{u.current||(w(),qe(l,c),n&&n(),u.current=!0)},children:s})})};we.displayName="Dropdown.Content";const fe=({children:n,"data-test-id":t="fondue-dropdown-group"},o)=>e.jsx(Wt,{className:_.group,"data-test-id":t,ref:o,children:n});fe.displayName="Dropdown.Group";const ge=({children:n,"data-test-id":t="fondue-dropdown-submenu"})=>e.jsx(Jt,{"data-test-id":t,children:n});ge.displayName="Dropdown.SubMenu";const Ie=({children:n,"data-test-id":t="fondue-dropdown-subtrigger"},o)=>e.jsxs(Qt,{className:_.subTrigger,"data-test-id":t,ref:o,children:[e.jsx("div",{className:_.itemContent,children:n}),e.jsx(xo,{className:_.subMenuIndicator,size:16})]});Ie.displayName="Dropdown.SubTrigger";const he=({children:n,"data-test-id":t="fondue-dropdown-subcontent"},o)=>e.jsx(mo,{children:e.jsx(er,{className:_.subContent,"data-test-id":t,ref:o,children:n})});he.displayName="Dropdown.SubContent";const De=({children:n,padding:t="compact",disabled:o,textValue:s,onSelect:a,"data-test-id":c="fondue-dropdown-subtrigger",...l},u)=>e.jsx(Zt,{onSelect:a,className:_.item,"data-padding":t,textValue:s,"data-test-id":c,ref:u,disabled:o,...l,children:e.jsx("div",{className:_.itemContent,children:n})});De.displayName="Dropdown.Item";const Ae=({children:n,name:t,"data-test-id":o="fondue-dropdown-slot"},s)=>e.jsx("div",{"data-name":t,className:_.slot,"data-test-id":o,ref:s,children:n});Ae.displayName="Dropdown.Slot";const ir=d.forwardRef(me),lr=d.forwardRef(we),ur=d.forwardRef(fe),pr=d.forwardRef(Ie),mr=d.forwardRef(he),wr=d.forwardRef(De),fr=d.forwardRef(Ae),r={Root:pe,Trigger:ir,Content:lr,Group:ur,SubMenu:ge,SubTrigger:pr,SubContent:mr,Item:wr,Slot:fr};pe.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Root",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},open:{required:!1,tsType:{name:"boolean"},description:"Controls the open state of the dropdown."},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Callback that is called when the open state of the dropdown changes."},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown'",computed:!1}}}};me.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Trigger",props:{asChild:{required:!1,tsType:{name:"boolean"},description:`Change the default rendered element for the one passed as a child, merging their props and behavior.
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-trigger'",computed:!1}}}};we.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Content",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-content'",computed:!1}},onOpen:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},side:{required:!1,tsType:{name:"union",raw:"'top' | 'right' | 'bottom' | 'left'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'right'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"}]},description:`Defines the preferred side of the dropdown. It will not be respected if there are collisions with the viewport.
@default "bottom"`,defaultValue:{value:"'bottom'",computed:!1}}}};fe.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Group",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-group'",computed:!1}}}};ge.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubMenu",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-submenu'",computed:!1}}}};Ie.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubTrigger",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subtrigger'",computed:!1}}}};he.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubContent",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subcontent'",computed:!1}}}};De.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Item",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},padding:{required:!1,tsType:{name:"union",raw:"'compact' | 'tight'",elements:[{name:"literal",value:"'compact'"},{name:"literal",value:"'tight'"}]},description:`The height of the item.
@default "compact"`,defaultValue:{value:"'compact'",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"Disables the item."},textValue:{required:!1,tsType:{name:"string"},description:"The text value of the item that is passed to the onSelect callback."},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: Event) => void",signature:{arguments:[{type:{name:"Event"},name:"event"}],return:{name:"void"}}},description:"Callback that is called when the item is selected."},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subtrigger'",computed:!1}}}};Ae.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Slot",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},name:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-slot'",computed:!1}}}};const kr={component:pe,subcomponents:{"Dropdown.Trigger":me,"Dropdown.Content":we,"Dropdown.Item":De,"Dropdown.Group":fe,"Dropdown.SubMenu":ge,"Dropdown.SubTrigger":Ie,"Dropdown.SubContent":he},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{}},W={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})},Z={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},disabled:!0,children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})},J={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsxs(r.Group,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]}),e.jsx(r.Group,{children:e.jsx(r.Item,{onSelect:()=>{},children:"Item 4"})}),e.jsx(r.Group,{children:e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"})}),e.jsxs(r.Group,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 7"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 8"})]})]})]})},Q={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsxs(r.SubMenu,{children:[e.jsx(r.SubTrigger,{children:"Item 4"}),e.jsxs(r.SubContent,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.3"})]})]}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"})]})]})},ee={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2 - This is a very long text that overflows the element it is contained in"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsxs(r.SubMenu,{children:[e.jsx(r.SubTrigger,{children:"Item 4 - This is a very long text that overflows the element it is contained in"}),e.jsxs(r.SubContent,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.2 - This is a very long text that overflows the element it is contained in"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.3"})]})]}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"})]})]})},ne={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{name:"left",children:e.jsx(k,{size:16})}),"Left decorator"]}),e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{name:"right",children:e.jsx(k,{size:16})}),"Right decorator"]}),e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{children:e.jsx(k,{size:16})}),"Implicit placement left"]}),e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{children:e.jsx(k,{size:16})}),e.jsx(r.Slot,{children:e.jsx(k,{size:16})}),"Implicit placement both"]}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"})]})]})},oe={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:e.jsx("div",{className:"tw-bg-red-50",children:"test bla"})}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})},te={decorators:[n=>e.jsx("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-w-fit",children:e.jsx(n,{})})],render:({...n})=>{const[t,o]=d.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(C,{onPress:()=>o(!t),children:"External Toggle Dropdown"}),e.jsxs(r.Root,{...n,open:t,onOpenChange:o,children:[e.jsx(r.Trigger,{children:e.jsx(C,{variant:"loud",children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})]})}},re={decorators:[n=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:32},children:e.jsx(n,{})})],parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"300px",height:"272px"}}},defaultViewport:"mobile"}},render:({...n})=>e.jsx(e.Fragment,{children:Array.from({length:4}).map((t,o)=>d.createElement(r.Root,{...n,key:o},e.jsx(r.Trigger,{children:e.jsx(C,{variant:"loud",children:"Trigger 1"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 7"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 8"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 9"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 10"})]})))})},se={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{side:"right",children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})},ae={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{side:"right",children:[e.jsxs(r.Item,{padding:"tight",onSelect:()=>{},children:[e.jsx("p",{children:"Item 1"}),e.jsx("p",{children:"Item 1 description"})]}),e.jsxs(r.Item,{padding:"tight",onSelect:()=>{},children:[e.jsx("p",{children:"Item 2"}),e.jsx("p",{children:"Item 2 description"})]}),e.jsx(r.Item,{padding:"tight",onSelect:()=>{},children:"Item 3"})]})]})};var Ue,$e,ze;W.parameters={...W.parameters,docs:{...(Ue=W.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
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
}`,...(ze=($e=W.parameters)==null?void 0:$e.docs)==null?void 0:ze.source}}};var Xe,Ye,He;Z.parameters={...Z.parameters,docs:{...(Xe=Z.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
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
}`,...(He=(Ye=Z.parameters)==null?void 0:Ye.docs)==null?void 0:He.source}}};var We,Ze,Je;J.parameters={...J.parameters,docs:{...(We=J.parameters)==null?void 0:We.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Group>
                    <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                </Dropdown.Group>
                <Dropdown.Group>
                    <Dropdown.Item onSelect={() => {}}>Item 4</Dropdown.Item>
                </Dropdown.Group>
                <Dropdown.Group>
                    <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                </Dropdown.Group>
                <Dropdown.Group>
                    <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Item 7</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Item 8</Dropdown.Item>
                </Dropdown.Group>
            </Dropdown.Content>
        </Dropdown.Root>
}`,...(Je=(Ze=J.parameters)==null?void 0:Ze.docs)==null?void 0:Je.source}}};var Qe,en,nn;Q.parameters={...Q.parameters,docs:{...(Qe=Q.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
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
}`,...(nn=(en=Q.parameters)==null?void 0:en.docs)==null?void 0:nn.source}}};var on,tn,rn;ee.parameters={...ee.parameters,docs:{...(on=ee.parameters)==null?void 0:on.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>
                    Item 2 - This is a very long text that overflows the element it is contained in
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.SubMenu>
                    <Dropdown.SubTrigger>
                        Item 4 - This is a very long text that overflows the element it is contained in
                    </Dropdown.SubTrigger>
                    <Dropdown.SubContent>
                        <Dropdown.Item onSelect={() => {}}>Item 4.1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>
                            Item 4.2 - This is a very long text that overflows the element it is contained in
                        </Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.3</Dropdown.Item>
                    </Dropdown.SubContent>
                </Dropdown.SubMenu>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
}`,...(rn=(tn=ee.parameters)==null?void 0:tn.docs)==null?void 0:rn.source}}};var sn,an,dn;ne.parameters={...ne.parameters,docs:{...(sn=ne.parameters)==null?void 0:sn.docs,source:{originalSource:`{
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
}`,...(dn=(an=ne.parameters)==null?void 0:an.docs)==null?void 0:dn.source}}};var cn,ln,un;oe.parameters={...oe.parameters,docs:{...(cn=oe.parameters)==null?void 0:cn.docs,source:{originalSource:`{
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
}`,...(un=(ln=oe.parameters)==null?void 0:ln.docs)==null?void 0:un.source}}};var pn,mn,wn;te.parameters={...te.parameters,docs:{...(pn=te.parameters)==null?void 0:pn.docs,source:{originalSource:`{
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
}`,...(wn=(mn=te.parameters)==null?void 0:mn.docs)==null?void 0:wn.source}}};var fn,gn,In;re.parameters={...re.parameters,docs:{...(fn=re.parameters)==null?void 0:fn.docs,source:{originalSource:`{
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
}`,...(In=(gn=re.parameters)==null?void 0:gn.docs)==null?void 0:In.source}}};var hn,Dn,xn;se.parameters={...se.parameters,docs:{...(hn=se.parameters)==null?void 0:hn.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content side="right">
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
}`,...(xn=(Dn=se.parameters)==null?void 0:Dn.docs)==null?void 0:xn.source}}};var Sn,vn,Cn;ae.parameters={...ae.parameters,docs:{...(Sn=ae.parameters)==null?void 0:Sn.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Dropdown.Root {...args}>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content side="right">
                <Dropdown.Item padding="tight" onSelect={() => {}}>
                    <p>Item 1</p>
                    <p>Item 1 description</p>
                </Dropdown.Item>
                <Dropdown.Item padding="tight" onSelect={() => {}}>
                    <p>Item 2</p>
                    <p>Item 2 description</p>
                </Dropdown.Item>
                <Dropdown.Item padding="tight" onSelect={() => {}}>
                    Item 3
                </Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
}`,...(Cn=(vn=ae.parameters)==null?void 0:vn.docs)==null?void 0:Cn.source}}};const Fr=["Default","DisabledItems","ItemGroups","SubMenus","OverflowingText","Decorator","CustomItem","ControlledComponent","Overflow","RightSide","TightItems"];export{te as ControlledComponent,oe as CustomItem,ne as Decorator,W as Default,Z as DisabledItems,J as ItemGroups,re as Overflow,ee as OverflowingText,se as RightSide,Q as SubMenus,ae as TightItems,Fr as __namedExportsOrder,kr as default};
