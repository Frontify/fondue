import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as d}from"./index-BwDkhjyp.js";import{f as go,c as k}from"./fondue-icons330-C1IajNtr.js";import{B as C}from"./Button-Bmc9bttI.js";import{c as I,u as Me}from"./index-DOnKqARA.js";import{u as K,P as O,c as xn,S as Io,d as ho}from"./index-Brw_kfkv.js";import{c as Sn}from"./index-BWD2N0gV.js";import{u as vn}from"./index-DGaPG0k3.js";import{c as Do}from"./index-BCwfsm-V.js";import{u as xo}from"./index-C8IlRUt1.js";import{c as Cn,A as So,D as vo,C as Co,a as Mo,R as Mn,P as jo}from"./index-9q6yCIGA.js";import{h as _o,u as Ro,F as To,R as bo,b as yo,s as Ke}from"./usePreventDropdownOverflow-hl17Ppn0.js";import{u as ae}from"./index-DduqEaLY.js";import{P as ie}from"./index-BwIM2_zL.js";import{c as jn,R as No,I as Eo}from"./index-ImmjAmjo.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-BnElyh0X.js";import"./focusStyle-IgMhxCMT.js";import"./index-DxjWwZXO.js";import"./index-kUwV4muI.js";var Ce=["Enter"," "],Po=["ArrowDown","PageUp","Home"],_n=["ArrowUp","PageDown","End"],Oo=[...Po,..._n],Ao={ltr:[...Ce,"ArrowRight"],rtl:[...Ce,"ArrowLeft"]},Go={ltr:["ArrowLeft"],rtl:["ArrowRight"]},q="Menu",[L,ko,Fo]=Do(q),[y,Rn]=Sn(q,[Fo,Cn,jn]),V=Cn(),Tn=jn(),[bn,T]=y(q),[Lo,U]=y(q),yn=n=>{const{__scopeMenu:t,open:o=!1,children:s,dir:a,onOpenChange:c,modal:u=!0}=n,l=V(t),[w,g]=d.useState(null),m=d.useRef(!1),i=Me(c),f=xo(a);return d.useEffect(()=>{const D=()=>{m.current=!0,document.addEventListener("pointerdown",h,{capture:!0,once:!0}),document.addEventListener("pointermove",h,{capture:!0,once:!0})},h=()=>m.current=!1;return document.addEventListener("keydown",D,{capture:!0}),()=>{document.removeEventListener("keydown",D,{capture:!0}),document.removeEventListener("pointerdown",h,{capture:!0}),document.removeEventListener("pointermove",h,{capture:!0})}},[]),e.jsx(Mn,{...l,children:e.jsx(bn,{scope:t,open:o,onOpenChange:i,content:w,onContentChange:g,children:e.jsx(Lo,{scope:t,onClose:d.useCallback(()=>i(!1),[i]),isUsingKeyboardRef:m,dir:f,modal:u,children:s})})})};yn.displayName=q;var Bo="MenuAnchor",je=d.forwardRef((n,t)=>{const{__scopeMenu:o,...s}=n,a=V(o);return e.jsx(So,{...a,...s,ref:t})});je.displayName=Bo;var _e="MenuPortal",[Ko,Nn]=y(_e,{forceMount:void 0}),En=n=>{const{__scopeMenu:t,forceMount:o,children:s,container:a}=n,c=T(_e,t);return e.jsx(Ko,{scope:t,forceMount:o,children:e.jsx(ie,{present:o||c.open,children:e.jsx(jo,{asChild:!0,container:a,children:s})})})};En.displayName=_e;var v="MenuContent",[qo,Re]=y(v),Pn=d.forwardRef((n,t)=>{const o=Nn(v,n.__scopeMenu),{forceMount:s=o.forceMount,...a}=n,c=T(v,n.__scopeMenu),u=U(v,n.__scopeMenu);return e.jsx(L.Provider,{scope:n.__scopeMenu,children:e.jsx(ie,{present:s||c.open,children:e.jsx(L.Slot,{scope:n.__scopeMenu,children:u.modal?e.jsx(Vo,{...a,ref:t}):e.jsx(Uo,{...a,ref:t})})})})}),Vo=d.forwardRef((n,t)=>{const o=T(v,n.__scopeMenu),s=d.useRef(null),a=K(t,s);return d.useEffect(()=>{const c=s.current;if(c)return _o(c)},[]),e.jsx(Te,{...n,ref:a,trapFocus:o.open,disableOutsidePointerEvents:o.open,disableOutsideScroll:!0,onFocusOutside:I(n.onFocusOutside,c=>c.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>o.onOpenChange(!1)})}),Uo=d.forwardRef((n,t)=>{const o=T(v,n.__scopeMenu);return e.jsx(Te,{...n,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>o.onOpenChange(!1)})}),Te=d.forwardRef((n,t)=>{const{__scopeMenu:o,loop:s=!1,trapFocus:a,onOpenAutoFocus:c,onCloseAutoFocus:u,disableOutsidePointerEvents:l,onEntryFocus:w,onEscapeKeyDown:g,onPointerDownOutside:m,onFocusOutside:i,onInteractOutside:f,onDismiss:D,disableOutsideScroll:h,...b}=n,N=T(v,o),A=U(v,o),$=V(o),z=Tn(o),Ae=ko(o),[uo,Ge]=d.useState(null),X=d.useRef(null),lo=K(t,X,N.onContentChange),Y=d.useRef(0),H=d.useRef(""),po=d.useRef(0),De=d.useRef(null),ke=d.useRef("right"),xe=d.useRef(0),mo=h?bo:d.Fragment,wo=h?{as:Io,allowPinchZoom:!0}:void 0,fo=p=>{var P,Le;const S=H.current+p,M=Ae().filter(j=>!j.disabled),R=document.activeElement,Se=(P=M.find(j=>j.ref.current===R))==null?void 0:P.textValue,ve=M.map(j=>j.textValue),Fe=ot(ve,S,Se),G=(Le=M.find(j=>j.textValue===Fe))==null?void 0:Le.ref.current;(function j(Be){H.current=Be,window.clearTimeout(Y.current),Be!==""&&(Y.current=window.setTimeout(()=>j(""),1e3))})(S),G&&setTimeout(()=>G.focus())};d.useEffect(()=>()=>window.clearTimeout(Y.current),[]),Ro();const E=d.useCallback(p=>{var M,R;return ke.current===((M=De.current)==null?void 0:M.side)&&rt(p,(R=De.current)==null?void 0:R.area)},[]);return e.jsx(qo,{scope:o,searchRef:H,onItemEnter:d.useCallback(p=>{E(p)&&p.preventDefault()},[E]),onItemLeave:d.useCallback(p=>{var S;E(p)||((S=X.current)==null||S.focus(),Ge(null))},[E]),onTriggerLeave:d.useCallback(p=>{E(p)&&p.preventDefault()},[E]),pointerGraceTimerRef:po,onPointerGraceIntentChange:d.useCallback(p=>{De.current=p},[]),children:e.jsx(mo,{...wo,children:e.jsx(To,{asChild:!0,trapped:a,onMountAutoFocus:I(c,p=>{var S;p.preventDefault(),(S=X.current)==null||S.focus({preventScroll:!0})}),onUnmountAutoFocus:u,children:e.jsx(vo,{asChild:!0,disableOutsidePointerEvents:l,onEscapeKeyDown:g,onPointerDownOutside:m,onFocusOutside:i,onInteractOutside:f,onDismiss:D,children:e.jsx(No,{asChild:!0,...z,dir:A.dir,orientation:"vertical",loop:s,currentTabStopId:uo,onCurrentTabStopIdChange:Ge,onEntryFocus:I(w,p=>{A.isUsingKeyboardRef.current||p.preventDefault()}),preventScrollOnEntryFocus:!0,children:e.jsx(Co,{role:"menu","aria-orientation":"vertical","data-state":Wn(N.open),"data-radix-menu-content":"",dir:A.dir,...$,...b,ref:lo,style:{outline:"none",...b.style},onKeyDown:I(b.onKeyDown,p=>{const M=p.target.closest("[data-radix-menu-content]")===p.currentTarget,R=p.ctrlKey||p.altKey||p.metaKey,Se=p.key.length===1;M&&(p.key==="Tab"&&p.preventDefault(),!R&&Se&&fo(p.key));const ve=X.current;if(p.target!==ve||!Oo.includes(p.key))return;p.preventDefault();const G=Ae().filter(P=>!P.disabled).map(P=>P.ref.current);_n.includes(p.key)&&G.reverse(),et(G)}),onBlur:I(n.onBlur,p=>{p.currentTarget.contains(p.target)||(window.clearTimeout(Y.current),H.current="")}),onPointerMove:I(n.onPointerMove,B(p=>{const S=p.target,M=xe.current!==p.clientX;if(p.currentTarget.contains(S)&&M){const R=p.clientX>xe.current?"right":"left";ke.current=R,xe.current=p.clientX}}))})})})})})})});Pn.displayName=v;var $o="MenuGroup",be=d.forwardRef((n,t)=>{const{__scopeMenu:o,...s}=n;return e.jsx(O.div,{role:"group",...s,ref:t})});be.displayName=$o;var zo="MenuLabel",On=d.forwardRef((n,t)=>{const{__scopeMenu:o,...s}=n;return e.jsx(O.div,{...s,ref:t})});On.displayName=zo;var de="MenuItem",qe="menu.itemSelect",ue=d.forwardRef((n,t)=>{const{disabled:o=!1,onSelect:s,...a}=n,c=d.useRef(null),u=U(de,n.__scopeMenu),l=Re(de,n.__scopeMenu),w=K(t,c),g=d.useRef(!1),m=()=>{const i=c.current;if(!o&&i){const f=new CustomEvent(qe,{bubbles:!0,cancelable:!0});i.addEventListener(qe,D=>s==null?void 0:s(D),{once:!0}),ho(i,f),f.defaultPrevented?g.current=!1:u.onClose()}};return e.jsx(An,{...a,ref:w,disabled:o,onClick:I(n.onClick,m),onPointerDown:i=>{var f;(f=n.onPointerDown)==null||f.call(n,i),g.current=!0},onPointerUp:I(n.onPointerUp,i=>{var f;g.current||(f=i.currentTarget)==null||f.click()}),onKeyDown:I(n.onKeyDown,i=>{const f=l.searchRef.current!=="";o||f&&i.key===" "||Ce.includes(i.key)&&(i.currentTarget.click(),i.preventDefault())})})});ue.displayName=de;var An=d.forwardRef((n,t)=>{const{__scopeMenu:o,disabled:s=!1,textValue:a,...c}=n,u=Re(de,o),l=Tn(o),w=d.useRef(null),g=K(t,w),[m,i]=d.useState(!1),[f,D]=d.useState("");return d.useEffect(()=>{const h=w.current;h&&D((h.textContent??"").trim())},[c.children]),e.jsx(L.ItemSlot,{scope:o,disabled:s,textValue:a??f,children:e.jsx(Eo,{asChild:!0,...l,focusable:!s,children:e.jsx(O.div,{role:"menuitem","data-highlighted":m?"":void 0,"aria-disabled":s||void 0,"data-disabled":s?"":void 0,...c,ref:g,onPointerMove:I(n.onPointerMove,B(h=>{s?u.onItemLeave(h):(u.onItemEnter(h),h.defaultPrevented||h.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:I(n.onPointerLeave,B(h=>u.onItemLeave(h))),onFocus:I(n.onFocus,()=>i(!0)),onBlur:I(n.onBlur,()=>i(!1))})})})}),Xo="MenuCheckboxItem",Gn=d.forwardRef((n,t)=>{const{checked:o=!1,onCheckedChange:s,...a}=n;return e.jsx(Kn,{scope:n.__scopeMenu,checked:o,children:e.jsx(ue,{role:"menuitemcheckbox","aria-checked":ce(o)?"mixed":o,...a,ref:t,"data-state":Ee(o),onSelect:I(a.onSelect,()=>s==null?void 0:s(ce(o)?!0:!o),{checkForDefaultPrevented:!1})})})});Gn.displayName=Xo;var kn="MenuRadioGroup",[Yo,Ho]=y(kn,{value:void 0,onValueChange:()=>{}}),Fn=d.forwardRef((n,t)=>{const{value:o,onValueChange:s,...a}=n,c=Me(s);return e.jsx(Yo,{scope:n.__scopeMenu,value:o,onValueChange:c,children:e.jsx(be,{...a,ref:t})})});Fn.displayName=kn;var Ln="MenuRadioItem",Bn=d.forwardRef((n,t)=>{const{value:o,...s}=n,a=Ho(Ln,n.__scopeMenu),c=o===a.value;return e.jsx(Kn,{scope:n.__scopeMenu,checked:c,children:e.jsx(ue,{role:"menuitemradio","aria-checked":c,...s,ref:t,"data-state":Ee(c),onSelect:I(s.onSelect,()=>{var u;return(u=a.onValueChange)==null?void 0:u.call(a,o)},{checkForDefaultPrevented:!1})})})});Bn.displayName=Ln;var ye="MenuItemIndicator",[Kn,Wo]=y(ye,{checked:!1}),qn=d.forwardRef((n,t)=>{const{__scopeMenu:o,forceMount:s,...a}=n,c=Wo(ye,o);return e.jsx(ie,{present:s||ce(c.checked)||c.checked===!0,children:e.jsx(O.span,{...a,ref:t,"data-state":Ee(c.checked)})})});qn.displayName=ye;var Zo="MenuSeparator",Vn=d.forwardRef((n,t)=>{const{__scopeMenu:o,...s}=n;return e.jsx(O.div,{role:"separator","aria-orientation":"horizontal",...s,ref:t})});Vn.displayName=Zo;var Jo="MenuArrow",Un=d.forwardRef((n,t)=>{const{__scopeMenu:o,...s}=n,a=V(o);return e.jsx(Mo,{...a,...s,ref:t})});Un.displayName=Jo;var Ne="MenuSub",[Qo,$n]=y(Ne),zn=n=>{const{__scopeMenu:t,children:o,open:s=!1,onOpenChange:a}=n,c=T(Ne,t),u=V(t),[l,w]=d.useState(null),[g,m]=d.useState(null),i=Me(a);return d.useEffect(()=>(c.open===!1&&i(!1),()=>i(!1)),[c.open,i]),e.jsx(Mn,{...u,children:e.jsx(bn,{scope:t,open:s,onOpenChange:i,content:g,onContentChange:m,children:e.jsx(Qo,{scope:t,contentId:ae(),triggerId:ae(),trigger:l,onTriggerChange:w,children:o})})})};zn.displayName=Ne;var F="MenuSubTrigger",Xn=d.forwardRef((n,t)=>{const o=T(F,n.__scopeMenu),s=U(F,n.__scopeMenu),a=$n(F,n.__scopeMenu),c=Re(F,n.__scopeMenu),u=d.useRef(null),{pointerGraceTimerRef:l,onPointerGraceIntentChange:w}=c,g={__scopeMenu:n.__scopeMenu},m=d.useCallback(()=>{u.current&&window.clearTimeout(u.current),u.current=null},[]);return d.useEffect(()=>m,[m]),d.useEffect(()=>{const i=l.current;return()=>{window.clearTimeout(i),w(null)}},[l,w]),e.jsx(je,{asChild:!0,...g,children:e.jsx(An,{id:a.triggerId,"aria-haspopup":"menu","aria-expanded":o.open,"aria-controls":a.contentId,"data-state":Wn(o.open),...n,ref:xn(t,a.onTriggerChange),onClick:i=>{var f;(f=n.onClick)==null||f.call(n,i),!(n.disabled||i.defaultPrevented)&&(i.currentTarget.focus(),o.open||o.onOpenChange(!0))},onPointerMove:I(n.onPointerMove,B(i=>{c.onItemEnter(i),!i.defaultPrevented&&!n.disabled&&!o.open&&!u.current&&(c.onPointerGraceIntentChange(null),u.current=window.setTimeout(()=>{o.onOpenChange(!0),m()},100))})),onPointerLeave:I(n.onPointerLeave,B(i=>{var D,h;m();const f=(D=o.content)==null?void 0:D.getBoundingClientRect();if(f){const b=(h=o.content)==null?void 0:h.dataset.side,N=b==="right",A=N?-5:5,$=f[N?"left":"right"],z=f[N?"right":"left"];c.onPointerGraceIntentChange({area:[{x:i.clientX+A,y:i.clientY},{x:$,y:f.top},{x:z,y:f.top},{x:z,y:f.bottom},{x:$,y:f.bottom}],side:b}),window.clearTimeout(l.current),l.current=window.setTimeout(()=>c.onPointerGraceIntentChange(null),300)}else{if(c.onTriggerLeave(i),i.defaultPrevented)return;c.onPointerGraceIntentChange(null)}})),onKeyDown:I(n.onKeyDown,i=>{var D;const f=c.searchRef.current!=="";n.disabled||f&&i.key===" "||Ao[s.dir].includes(i.key)&&(o.onOpenChange(!0),(D=o.content)==null||D.focus(),i.preventDefault())})})})});Xn.displayName=F;var Yn="MenuSubContent",Hn=d.forwardRef((n,t)=>{const o=Nn(v,n.__scopeMenu),{forceMount:s=o.forceMount,...a}=n,c=T(v,n.__scopeMenu),u=U(v,n.__scopeMenu),l=$n(Yn,n.__scopeMenu),w=d.useRef(null),g=K(t,w);return e.jsx(L.Provider,{scope:n.__scopeMenu,children:e.jsx(ie,{present:s||c.open,children:e.jsx(L.Slot,{scope:n.__scopeMenu,children:e.jsx(Te,{id:l.contentId,"aria-labelledby":l.triggerId,...a,ref:g,align:"start",side:u.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:m=>{var i;u.isUsingKeyboardRef.current&&((i=w.current)==null||i.focus()),m.preventDefault()},onCloseAutoFocus:m=>m.preventDefault(),onFocusOutside:I(n.onFocusOutside,m=>{m.target!==l.trigger&&c.onOpenChange(!1)}),onEscapeKeyDown:I(n.onEscapeKeyDown,m=>{u.onClose(),m.preventDefault()}),onKeyDown:I(n.onKeyDown,m=>{var D;const i=m.currentTarget.contains(m.target),f=Go[u.dir].includes(m.key);i&&f&&(c.onOpenChange(!1),(D=l.trigger)==null||D.focus(),m.preventDefault())})})})})})});Hn.displayName=Yn;function Wn(n){return n?"open":"closed"}function ce(n){return n==="indeterminate"}function Ee(n){return ce(n)?"indeterminate":n?"checked":"unchecked"}function et(n){const t=document.activeElement;for(const o of n)if(o===t||(o.focus(),document.activeElement!==t))return}function nt(n,t){return n.map((o,s)=>n[(t+s)%n.length])}function ot(n,t,o){const a=t.length>1&&Array.from(t).every(g=>g===t[0])?t[0]:t,c=o?n.indexOf(o):-1;let u=nt(n,Math.max(c,0));a.length===1&&(u=u.filter(g=>g!==o));const w=u.find(g=>g.toLowerCase().startsWith(a.toLowerCase()));return w!==o?w:void 0}function tt(n,t){const{x:o,y:s}=n;let a=!1;for(let c=0,u=t.length-1;c<t.length;u=c++){const l=t[c].x,w=t[c].y,g=t[u].x,m=t[u].y;w>s!=m>s&&o<(g-l)*(s-w)/(m-w)+l&&(a=!a)}return a}function rt(n,t){if(!t)return!1;const o={x:n.clientX,y:n.clientY};return tt(o,t)}function B(n){return t=>t.pointerType==="mouse"?n(t):void 0}var st=yn,at=je,dt=En,ct=Pn,it=be,ut=On,lt=ue,pt=Gn,mt=Fn,wt=Bn,ft=qn,gt=Vn,It=Un,ht=zn,Dt=Xn,xt=Hn,Pe="DropdownMenu",[St,Er]=Sn(Pe,[Rn]),x=Rn(),[vt,Zn]=St(Pe),Jn=n=>{const{__scopeDropdownMenu:t,children:o,dir:s,open:a,defaultOpen:c,onOpenChange:u,modal:l=!0}=n,w=x(t),g=d.useRef(null),[m=!1,i]=vn({prop:a,defaultProp:c,onChange:u});return e.jsx(vt,{scope:t,triggerId:ae(),triggerRef:g,contentId:ae(),open:m,onOpenChange:i,onOpenToggle:d.useCallback(()=>i(f=>!f),[i]),modal:l,children:e.jsx(st,{...w,open:m,onOpenChange:i,dir:s,modal:l,children:o})})};Jn.displayName=Pe;var Qn="DropdownMenuTrigger",eo=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,disabled:s=!1,...a}=n,c=Zn(Qn,o),u=x(o);return e.jsx(at,{asChild:!0,...u,children:e.jsx(O.button,{type:"button",id:c.triggerId,"aria-haspopup":"menu","aria-expanded":c.open,"aria-controls":c.open?c.contentId:void 0,"data-state":c.open?"open":"closed","data-disabled":s?"":void 0,disabled:s,...a,ref:xn(t,c.triggerRef),onPointerDown:I(n.onPointerDown,l=>{!s&&l.button===0&&l.ctrlKey===!1&&(c.onOpenToggle(),c.open||l.preventDefault())}),onKeyDown:I(n.onKeyDown,l=>{s||(["Enter"," "].includes(l.key)&&c.onOpenToggle(),l.key==="ArrowDown"&&c.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(l.key)&&l.preventDefault())})})})});eo.displayName=Qn;var Ct="DropdownMenuPortal",no=n=>{const{__scopeDropdownMenu:t,...o}=n,s=x(t);return e.jsx(dt,{...s,...o})};no.displayName=Ct;var oo="DropdownMenuContent",to=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=Zn(oo,o),c=x(o),u=d.useRef(!1);return e.jsx(ct,{id:a.contentId,"aria-labelledby":a.triggerId,...c,...s,ref:t,onCloseAutoFocus:I(n.onCloseAutoFocus,l=>{var w;u.current||(w=a.triggerRef.current)==null||w.focus(),u.current=!1,l.preventDefault()}),onInteractOutside:I(n.onInteractOutside,l=>{const w=l.detail.originalEvent,g=w.button===0&&w.ctrlKey===!0,m=w.button===2||g;(!a.modal||m)&&(u.current=!0)}),style:{...n.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});to.displayName=oo;var Mt="DropdownMenuGroup",ro=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(it,{...a,...s,ref:t})});ro.displayName=Mt;var jt="DropdownMenuLabel",_t=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(ut,{...a,...s,ref:t})});_t.displayName=jt;var Rt="DropdownMenuItem",so=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(lt,{...a,...s,ref:t})});so.displayName=Rt;var Tt="DropdownMenuCheckboxItem",bt=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(pt,{...a,...s,ref:t})});bt.displayName=Tt;var yt="DropdownMenuRadioGroup",Nt=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(mt,{...a,...s,ref:t})});Nt.displayName=yt;var Et="DropdownMenuRadioItem",Pt=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(wt,{...a,...s,ref:t})});Pt.displayName=Et;var Ot="DropdownMenuItemIndicator",At=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(ft,{...a,...s,ref:t})});At.displayName=Ot;var Gt="DropdownMenuSeparator",kt=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(gt,{...a,...s,ref:t})});kt.displayName=Gt;var Ft="DropdownMenuArrow",Lt=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(It,{...a,...s,ref:t})});Lt.displayName=Ft;var Bt=n=>{const{__scopeDropdownMenu:t,children:o,open:s,onOpenChange:a,defaultOpen:c}=n,u=x(t),[l=!1,w]=vn({prop:s,defaultProp:c,onChange:a});return e.jsx(ht,{...u,open:l,onOpenChange:w,children:o})},Kt="DropdownMenuSubTrigger",ao=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(Dt,{...a,...s,ref:t})});ao.displayName=Kt;var qt="DropdownMenuSubContent",co=d.forwardRef((n,t)=>{const{__scopeDropdownMenu:o,...s}=n,a=x(o);return e.jsx(xt,{...a,...s,ref:t,style:{...n.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});co.displayName=qt;var Vt=Jn,Ut=eo,io=no,$t=to,zt=ro,Xt=so,Yt=Bt,Ht=ao,Wt=co;const Zt="_content_1m5jw_5",Jt="_subContent_1m5jw_6",Qt="_item_1m5jw_32",er="_subTrigger_1m5jw_33",nr="_itemContent_1m5jw_72",or="_subMenuIndicator_1m5jw_79",tr="_group_1m5jw_85",rr="_slot_1m5jw_92",_={content:Zt,subContent:Jt,item:Qt,subTrigger:er,itemContent:nr,subMenuIndicator:or,group:tr,slot:rr},le=({children:n,open:t,onOpenChange:o,"data-test-id":s="fondue-dropdown"})=>e.jsx(Vt,{open:t,onOpenChange:o,"data-test-id":s,children:n});le.displayName="Dropdown.Root";const pe=({asChild:n=!0,children:t,"data-test-id":o="fondue-dropdown-trigger"},s)=>e.jsx(Ut,{asChild:n,"data-test-id":o,ref:s,children:t});pe.displayName="Dropdown.Trigger";const me=({onOpen:n,onClose:t,side:o="bottom",children:s,"data-test-id":a="fondue-dropdown-content"},c)=>{const u=d.useRef(null),l=d.useRef(!1),{setMaxHeight:w}=yo(u);return e.jsx(io,{children:e.jsx($t,{align:"start",collisionPadding:8,sideOffset:8,side:o,className:_.content,"data-test-id":a,ref:u,onCloseAutoFocus:()=>{Ke(u,c),t&&t(),l.current=!1},onFocus:()=>{l.current||(w(),Ke(u,c),n&&n(),l.current=!0)},children:s})})};me.displayName="Dropdown.Content";const we=({children:n,"data-test-id":t="fondue-dropdown-group"},o)=>e.jsx(zt,{className:_.group,"data-test-id":t,ref:o,children:n});we.displayName="Dropdown.Group";const fe=({children:n,"data-test-id":t="fondue-dropdown-submenu"})=>e.jsx(Yt,{"data-test-id":t,children:n});fe.displayName="Dropdown.SubMenu";const ge=({children:n,"data-test-id":t="fondue-dropdown-subtrigger"},o)=>e.jsxs(Ht,{className:_.subTrigger,"data-test-id":t,ref:o,children:[e.jsx("div",{className:_.itemContent,children:n}),e.jsx(go,{className:_.subMenuIndicator,size:16})]});ge.displayName="Dropdown.SubTrigger";const Ie=({children:n,"data-test-id":t="fondue-dropdown-subcontent"},o)=>e.jsx(io,{children:e.jsx(Wt,{className:_.subContent,"data-test-id":t,ref:o,children:n})});Ie.displayName="Dropdown.SubContent";const he=({children:n,disabled:t,textValue:o,onSelect:s,"data-test-id":a="fondue-dropdown-subtrigger",...c},u)=>e.jsx(Xt,{onSelect:s,className:_.item,textValue:o,"data-test-id":a,ref:u,disabled:t,...c,children:e.jsx("div",{className:_.itemContent,children:n})});he.displayName="Dropdown.Item";const Oe=({children:n,name:t,"data-test-id":o="fondue-dropdown-slot"},s)=>e.jsx("div",{"data-name":t,className:_.slot,"data-test-id":o,ref:s,children:n});Oe.displayName="Dropdown.Slot";const sr=d.forwardRef(pe),ar=d.forwardRef(me),dr=d.forwardRef(we),cr=d.forwardRef(ge),ir=d.forwardRef(Ie),ur=d.forwardRef(he),lr=d.forwardRef(Oe),r={Root:le,Trigger:sr,Content:ar,Group:dr,SubMenu:fe,SubTrigger:cr,SubContent:ir,Item:ur,Slot:lr};le.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Root",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},open:{required:!1,tsType:{name:"boolean"},description:"Controls the open state of the dropdown."},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Callback that is called when the open state of the dropdown changes."},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown'",computed:!1}}}};pe.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Trigger",props:{asChild:{required:!1,tsType:{name:"boolean"},description:`Change the default rendered element for the one passed as a child, merging their props and behavior.
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-trigger'",computed:!1}}}};me.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Content",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-content'",computed:!1}},onOpen:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},side:{required:!1,tsType:{name:"union",raw:"'top' | 'right' | 'bottom' | 'left'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'right'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"}]},description:`Defines the preferred side of the dropdown. It will not be respected if there are collisions with the viewport.
@default "bottom"`,defaultValue:{value:"'bottom'",computed:!1}}}};we.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Group",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-group'",computed:!1}}}};fe.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubMenu",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-submenu'",computed:!1}}}};ge.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubTrigger",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subtrigger'",computed:!1}}}};Ie.__docgenInfo={description:"",methods:[],displayName:"Dropdown.SubContent",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subcontent'",computed:!1}}}};he.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Item",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"Disables the item."},textValue:{required:!1,tsType:{name:"string"},description:"The text value of the item that is passed to the onSelect callback."},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: Event) => void",signature:{arguments:[{type:{name:"Event"},name:"event"}],return:{name:"void"}}},description:"Callback that is called when the item is selected."},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-subtrigger'",computed:!1}}}};Oe.__docgenInfo={description:"",methods:[],displayName:"Dropdown.Slot",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},name:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dropdown-slot'",computed:!1}}}};const Pr={component:le,subcomponents:{"Dropdown.Trigger":pe,"Dropdown.Content":me,"Dropdown.Item":he,"Dropdown.Group":we,"Dropdown.SubMenu":fe,"Dropdown.SubTrigger":ge,"Dropdown.SubContent":Ie},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{}},W={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})},Z={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},disabled:!0,children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})},J={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsxs(r.Group,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]}),e.jsx(r.Group,{children:e.jsx(r.Item,{onSelect:()=>{},children:"Item 4"})}),e.jsx(r.Group,{children:e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"})}),e.jsxs(r.Group,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 7"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 8"})]})]})]})},Q={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsxs(r.SubMenu,{children:[e.jsx(r.SubTrigger,{children:"Item 4"}),e.jsxs(r.SubContent,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.3"})]})]}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"})]})]})},ee={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2 - This is a very long text that overflows the element it is contained in"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsxs(r.SubMenu,{children:[e.jsx(r.SubTrigger,{children:"Item 4 - This is a very long text that overflows the element it is contained in"}),e.jsxs(r.SubContent,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.2 - This is a very long text that overflows the element it is contained in"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4.3"})]})]}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"})]})]})},ne={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{name:"left",children:e.jsx(k,{size:16})}),"Left decorator"]}),e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{name:"right",children:e.jsx(k,{size:16})}),"Right decorator"]}),e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{children:e.jsx(k,{size:16})}),"Implicit placement left"]}),e.jsxs(r.Item,{onSelect:()=>{},children:[e.jsx(r.Slot,{children:e.jsx(k,{size:16})}),e.jsx(r.Slot,{children:e.jsx(k,{size:16})}),"Implicit placement both"]}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"})]})]})},oe={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:e.jsx("div",{className:"tw-bg-red-50",children:"test bla"})}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})},te={decorators:[n=>e.jsx("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-w-fit",children:e.jsx(n,{})})],render:({...n})=>{const[t,o]=d.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(C,{onPress:()=>o(!t),children:"External Toggle Dropdown"}),e.jsxs(r.Root,{...n,open:t,onOpenChange:o,children:[e.jsx(r.Trigger,{children:e.jsx(C,{variant:"loud",children:"Trigger"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})]})}},re={decorators:[n=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:32},children:e.jsx(n,{})})],parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"300px",height:"272px"}}},defaultViewport:"mobile"}},render:({...n})=>e.jsx(e.Fragment,{children:Array.from({length:4}).map((t,o)=>d.createElement(r.Root,{...n,key:o},e.jsx(r.Trigger,{children:e.jsx(C,{variant:"loud",children:"Trigger 1"})}),e.jsxs(r.Content,{children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 4"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 5"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 6"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 7"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 8"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 9"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 10"})]})))})},se={render:({...n})=>e.jsxs(r.Root,{...n,children:[e.jsx(r.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(r.Content,{side:"right",children:[e.jsx(r.Item,{onSelect:()=>{},children:"Item 1"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 2"}),e.jsx(r.Item,{onSelect:()=>{},children:"Item 3"})]})]})};var Ve,Ue,$e;W.parameters={...W.parameters,docs:{...(Ve=W.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
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
}`,...($e=(Ue=W.parameters)==null?void 0:Ue.docs)==null?void 0:$e.source}}};var ze,Xe,Ye;Z.parameters={...Z.parameters,docs:{...(ze=Z.parameters)==null?void 0:ze.docs,source:{originalSource:`{
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
}`,...(Ye=(Xe=Z.parameters)==null?void 0:Xe.docs)==null?void 0:Ye.source}}};var He,We,Ze;J.parameters={...J.parameters,docs:{...(He=J.parameters)==null?void 0:He.docs,source:{originalSource:`{
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
}`,...(Ze=(We=J.parameters)==null?void 0:We.docs)==null?void 0:Ze.source}}};var Je,Qe,en;Q.parameters={...Q.parameters,docs:{...(Je=Q.parameters)==null?void 0:Je.docs,source:{originalSource:`{
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
}`,...(en=(Qe=Q.parameters)==null?void 0:Qe.docs)==null?void 0:en.source}}};var nn,on,tn;ee.parameters={...ee.parameters,docs:{...(nn=ee.parameters)==null?void 0:nn.docs,source:{originalSource:`{
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
}`,...(tn=(on=ee.parameters)==null?void 0:on.docs)==null?void 0:tn.source}}};var rn,sn,an;ne.parameters={...ne.parameters,docs:{...(rn=ne.parameters)==null?void 0:rn.docs,source:{originalSource:`{
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
}`,...(an=(sn=ne.parameters)==null?void 0:sn.docs)==null?void 0:an.source}}};var dn,cn,un;oe.parameters={...oe.parameters,docs:{...(dn=oe.parameters)==null?void 0:dn.docs,source:{originalSource:`{
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
}`,...(un=(cn=oe.parameters)==null?void 0:cn.docs)==null?void 0:un.source}}};var ln,pn,mn;te.parameters={...te.parameters,docs:{...(ln=te.parameters)==null?void 0:ln.docs,source:{originalSource:`{
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
}`,...(mn=(pn=te.parameters)==null?void 0:pn.docs)==null?void 0:mn.source}}};var wn,fn,gn;re.parameters={...re.parameters,docs:{...(wn=re.parameters)==null?void 0:wn.docs,source:{originalSource:`{
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
}`,...(gn=(fn=re.parameters)==null?void 0:fn.docs)==null?void 0:gn.source}}};var In,hn,Dn;se.parameters={...se.parameters,docs:{...(In=se.parameters)==null?void 0:In.docs,source:{originalSource:`{
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
}`,...(Dn=(hn=se.parameters)==null?void 0:hn.docs)==null?void 0:Dn.source}}};const Or=["Default","DisabledItems","ItemGroups","SubMenus","OverflowingText","Decorator","CustomItem","ControlledComponent","Overflow","RightSide"];export{te as ControlledComponent,oe as CustomItem,ne as Decorator,W as Default,Z as DisabledItems,J as ItemGroups,re as Overflow,ee as OverflowingText,se as RightSide,Q as SubMenus,Or as __namedExportsOrder,Pr as default};
