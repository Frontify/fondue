import{g as ze}from"./_commonjsHelpers-BosuxZz1.js";import{b as Qe,t as Je,c as re,a as Pe,u as Ae,g as _e,v as et,w as tt,x as nt,y as xe,z as Ne,A as rt,B as at,C as ot,D as st,E as ae,i as Re,F as $e,G as Ie,H as it,I as ct,J as ut,h as lt}from"./_getPrototype-BKhpJVf-.js";import{r as i,a as ft}from"./index-BwDkhjyp.js";import{j as O}from"./jsx-runtime-Nms4Y4qS.js";import{r as Le,R as dt}from"./index-B8XB3FuZ.js";var U=function(){return U=Object.assign||function(t){for(var n,r=1,a=arguments.length;r<a;r++){n=arguments[r];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},U.apply(this,arguments)};function vt(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n}var k={exports:{}};k.exports;(function(e,t){var n=Qe,r=t&&!t.nodeType&&t,a=r&&!0&&e&&!e.nodeType&&e,s=a&&a.exports===r,c=s?n.Buffer:void 0,o=c?c.allocUnsafe:void 0;function f(u,d){if(d)return u.slice();var m=u.length,g=o?o(m):new u.constructor(m);return u.copy(g),g}e.exports=f})(k,k.exports);var mt=k.exports,ie=Je;function pt(e){var t=new e.constructor(e.byteLength);return new ie(t).set(new ie(e)),t}var oe=pt,gt=oe;function ht(e,t){var n=t?gt(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.length)}var yt=ht;function bt(e,t){var n=-1,r=e.length;for(t||(t=Array(r));++n<r;)t[n]=e[n];return t}var Et=bt,St=re,ce=Object.create,Ct=function(){function e(){}return function(t){if(!St(t))return{};if(ce)return ce(t);e.prototype=t;var n=new e;return e.prototype=void 0,n}}(),wt=Ct,Tt=wt,Ot=Pe,Pt=Ae;function At(e){return typeof e.constructor=="function"&&!Pt(e)?Tt(Ot(e)):{}}var _t=At,xt=_e,Nt=et,Rt=Object.prototype,$t=Rt.hasOwnProperty;function It(e,t,n){var r=e[t];(!($t.call(e,t)&&Nt(r,n))||n===void 0&&!(t in e))&&xt(e,t,n)}var je=It,Lt=je,jt=_e;function Mt(e,t,n,r){var a=!n;n||(n={});for(var s=-1,c=t.length;++s<c;){var o=t[s],f=r?r(n[o],e[o],o,n,e):void 0;f===void 0&&(f=e[o]),a?jt(n,o,f):Lt(n,o,f)}return n}var K=Mt;function Dt(e){var t=[];if(e!=null)for(var n in Object(e))t.push(n);return t}var Ft=Dt,Bt=re,Ut=Ae,kt=Ft,Wt=Object.prototype,Kt=Wt.hasOwnProperty;function Vt(e){if(!Bt(e))return kt(e);var t=Ut(e),n=[];for(var r in e)r=="constructor"&&(t||!Kt.call(e,r))||n.push(r);return n}var Gt=Vt,Yt=tt,Ht=Gt,Xt=nt;function Zt(e){return Xt(e)?Yt(e,!0):Ht(e)}var se=Zt;function qt(e,t){for(var n=-1,r=e==null?0:e.length;++n<r&&t(e[n],n,e)!==!1;);return e}var zt=qt,Qt=K,Jt=xe;function en(e,t){return e&&Qt(t,Jt(t),e)}var tn=en,nn=K,rn=se;function an(e,t){return e&&nn(t,rn(t),e)}var on=an,sn=K,cn=Ne;function un(e,t){return sn(e,cn(e),t)}var ln=un,fn=rt,dn=Pe,vn=Ne,mn=at,pn=Object.getOwnPropertySymbols,gn=pn?function(e){for(var t=[];e;)fn(t,vn(e)),e=dn(e);return t}:mn,Me=gn,hn=K,yn=Me;function bn(e,t){return hn(e,yn(e),t)}var En=bn,Sn=ot,Cn=Me,wn=se;function Tn(e){return Sn(e,wn,Cn)}var On=Tn,Pn=Object.prototype,An=Pn.hasOwnProperty;function _n(e){var t=e.length,n=new e.constructor(t);return t&&typeof e[0]=="string"&&An.call(e,"index")&&(n.index=e.index,n.input=e.input),n}var xn=_n,Nn=oe;function Rn(e,t){var n=t?Nn(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.byteLength)}var $n=Rn,In=/\w*$/;function Ln(e){var t=new e.constructor(e.source,In.exec(e));return t.lastIndex=e.lastIndex,t}var jn=Ln,ue=st,le=ue?ue.prototype:void 0,fe=le?le.valueOf:void 0;function Mn(e){return fe?Object(fe.call(e)):{}}var Dn=Mn,Fn=oe,Bn=$n,Un=jn,kn=Dn,Wn=yt,Kn="[object Boolean]",Vn="[object Date]",Gn="[object Map]",Yn="[object Number]",Hn="[object RegExp]",Xn="[object Set]",Zn="[object String]",qn="[object Symbol]",zn="[object ArrayBuffer]",Qn="[object DataView]",Jn="[object Float32Array]",er="[object Float64Array]",tr="[object Int8Array]",nr="[object Int16Array]",rr="[object Int32Array]",ar="[object Uint8Array]",or="[object Uint8ClampedArray]",sr="[object Uint16Array]",ir="[object Uint32Array]";function cr(e,t,n){var r=e.constructor;switch(t){case zn:return Fn(e);case Kn:case Vn:return new r(+e);case Qn:return Bn(e,n);case Jn:case er:case tr:case nr:case rr:case ar:case or:case sr:case ir:return Wn(e,n);case Gn:return new r;case Yn:case Zn:return new r(e);case Hn:return Un(e);case Xn:return new r;case qn:return kn(e)}}var ur=cr,lr=ae,fr=Re,dr="[object Map]";function vr(e){return fr(e)&&lr(e)==dr}var mr=vr,pr=mr,gr=Ie,de=$e,ve=de&&de.isMap,hr=ve?gr(ve):pr,yr=hr,br=ae,Er=Re,Sr="[object Set]";function Cr(e){return Er(e)&&br(e)==Sr}var wr=Cr,Tr=wr,Or=Ie,me=$e,pe=me&&me.isSet,Pr=pe?Or(pe):Tr,Ar=Pr,_r=it,xr=zt,Nr=je,Rr=tn,$r=on,Ir=mt,Lr=Et,jr=ln,Mr=En,Dr=ut,Fr=On,Br=ae,Ur=xn,kr=ur,Wr=_t,Kr=lt,Vr=ct,Gr=yr,Yr=re,Hr=Ar,Xr=xe,Zr=se,qr=1,zr=2,Qr=4,De="[object Arguments]",Jr="[object Array]",ea="[object Boolean]",ta="[object Date]",na="[object Error]",Fe="[object Function]",ra="[object GeneratorFunction]",aa="[object Map]",oa="[object Number]",Be="[object Object]",sa="[object RegExp]",ia="[object Set]",ca="[object String]",ua="[object Symbol]",la="[object WeakMap]",fa="[object ArrayBuffer]",da="[object DataView]",va="[object Float32Array]",ma="[object Float64Array]",pa="[object Int8Array]",ga="[object Int16Array]",ha="[object Int32Array]",ya="[object Uint8Array]",ba="[object Uint8ClampedArray]",Ea="[object Uint16Array]",Sa="[object Uint32Array]",y={};y[De]=y[Jr]=y[fa]=y[da]=y[ea]=y[ta]=y[va]=y[ma]=y[pa]=y[ga]=y[ha]=y[aa]=y[oa]=y[Be]=y[sa]=y[ia]=y[ca]=y[ua]=y[ya]=y[ba]=y[Ea]=y[Sa]=!0;y[na]=y[Fe]=y[la]=!1;function D(e,t,n,r,a,s){var c,o=t&qr,f=t&zr,u=t&Qr;if(n&&(c=a?n(e,r,a,s):n(e)),c!==void 0)return c;if(!Yr(e))return e;var d=Kr(e);if(d){if(c=Ur(e),!o)return Lr(e,c)}else{var m=Br(e),g=m==Fe||m==ra;if(Vr(e))return Ir(e,o);if(m==Be||m==De||g&&!a){if(c=f||g?{}:Wr(e),!o)return f?Mr(e,$r(c,e)):jr(e,Rr(c,e))}else{if(!y[m])return a?e:{};c=kr(e,m,o)}}s||(s=new _r);var h=s.get(e);if(h)return h;s.set(e,c),Hr(e)?e.forEach(function(v){c.add(D(v,t,n,v,e,s))}):Gr(e)&&e.forEach(function(v,p){c.set(p,D(v,t,n,p,e,s))});var C=u?f?Fr:Dr:f?Zr:Xr,l=d?void 0:C(e);return xr(l||e,function(v,p){l&&(p=v,v=e[p]),Nr(c,p,D(v,t,n,p,e,s))}),c}var Ca=D,wa=Ca,Ta=1,Oa=4;function Pa(e){return wa(e,Ta|Oa)}var Aa=Pa;const zo=ze(Aa);function _a(e,t){typeof e=="function"?e(t):e!=null&&(e.current=t)}function Ue(...e){return t=>e.forEach(n=>_a(n,t))}function V(...e){return i.useCallback(Ue(...e),e)}var ke=i.forwardRef((e,t)=>{const{children:n,...r}=e,a=i.Children.toArray(n),s=a.find(Na);if(s){const c=s.props.children,o=a.map(f=>f===s?i.Children.count(c)>1?i.Children.only(null):i.isValidElement(c)?c.props.children:null:f);return O.jsx(ee,{...r,ref:t,children:i.isValidElement(c)?i.cloneElement(c,void 0,o):null})}return O.jsx(ee,{...r,ref:t,children:n})});ke.displayName="Slot";var ee=i.forwardRef((e,t)=>{const{children:n,...r}=e;if(i.isValidElement(n)){const a=$a(n);return i.cloneElement(n,{...Ra(r,n.props),ref:t?Ue(t,a):a})}return i.Children.count(n)>1?i.Children.only(null):null});ee.displayName="SlotClone";var xa=({children:e})=>O.jsx(O.Fragment,{children:e});function Na(e){return i.isValidElement(e)&&e.type===xa}function Ra(e,t){const n={...t};for(const r in t){const a=e[r],s=t[r];/^on[A-Z]/.test(r)?a&&s?n[r]=(...o)=>{s(...o),a(...o)}:a&&(n[r]=a):r==="style"?n[r]={...a,...s}:r==="className"&&(n[r]=[a,s].filter(Boolean).join(" "))}return{...e,...n}}function $a(e){var r,a;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(a=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:a.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}function X(e,t,{checkForDefaultPrevented:n=!0}={}){return function(a){if(e==null||e(a),n===!1||!a.defaultPrevented)return t==null?void 0:t(a)}}function Qo(e,t){const n=i.createContext(t);function r(s){const{children:c,...o}=s,f=i.useMemo(()=>o,Object.values(o));return O.jsx(n.Provider,{value:f,children:c})}function a(s){const c=i.useContext(n);if(c)return c;if(t!==void 0)return t;throw new Error(`\`${s}\` must be used within \`${e}\``)}return r.displayName=e+"Provider",[r,a]}function Jo(e,t=[]){let n=[];function r(s,c){const o=i.createContext(c),f=n.length;n=[...n,c];function u(m){const{scope:g,children:h,...C}=m,l=(g==null?void 0:g[e][f])||o,v=i.useMemo(()=>C,Object.values(C));return O.jsx(l.Provider,{value:v,children:h})}function d(m,g){const h=(g==null?void 0:g[e][f])||o,C=i.useContext(h);if(C)return C;if(c!==void 0)return c;throw new Error(`\`${m}\` must be used within \`${s}\``)}return u.displayName=s+"Provider",[u,d]}const a=()=>{const s=n.map(c=>i.createContext(c));return function(o){const f=(o==null?void 0:o[e])||s;return i.useMemo(()=>({[`__scope${e}`]:{...o,[e]:f}}),[o,f])}};return a.scopeName=e,[r,Ia(a,...t)]}function Ia(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const r=e.map(a=>({useScope:a(),scopeName:a.scopeName}));return function(s){const c=r.reduce((o,{useScope:f,scopeName:u})=>{const m=f(s)[`__scope${u}`];return{...o,...m}},{});return i.useMemo(()=>({[`__scope${t.scopeName}`]:c}),[c])}};return n.scopeName=t.scopeName,n}var W=globalThis!=null&&globalThis.document?i.useLayoutEffect:()=>{},La=ft.useId||(()=>{}),ja=0;function es(e){const[t,n]=i.useState(La());return W(()=>{e||n(r=>r??String(ja++))},[e]),e||(t?`radix-${t}`:"")}var Ma=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],G=Ma.reduce((e,t)=>{const n=i.forwardRef((r,a)=>{const{asChild:s,...c}=r,o=s?ke:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),O.jsx(o,{...c,ref:a})});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function Da(e,t){e&&Le.flushSync(()=>e.dispatchEvent(t))}function N(e){const t=i.useRef(e);return i.useEffect(()=>{t.current=e}),i.useMemo(()=>(...n)=>{var r;return(r=t.current)==null?void 0:r.call(t,...n)},[])}function ts({prop:e,defaultProp:t,onChange:n=()=>{}}){const[r,a]=Fa({defaultProp:t,onChange:n}),s=e!==void 0,c=s?e:r,o=N(n),f=i.useCallback(u=>{if(s){const m=typeof u=="function"?u(e):u;m!==e&&o(m)}else a(u)},[s,e,a,o]);return[c,f]}function Fa({defaultProp:e,onChange:t}){const n=i.useState(e),[r]=n,a=i.useRef(r),s=N(t);return i.useEffect(()=>{a.current!==r&&(s(r),a.current=r)},[r,a,s]),n}function Ba(e,t=globalThis==null?void 0:globalThis.document){const n=N(e);i.useEffect(()=>{const r=a=>{a.key==="Escape"&&n(a)};return t.addEventListener("keydown",r,{capture:!0}),()=>t.removeEventListener("keydown",r,{capture:!0})},[n,t])}var Ua="DismissableLayer",te="dismissableLayer.update",ka="dismissableLayer.pointerDownOutside",Wa="dismissableLayer.focusOutside",ge,We=i.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Ka=i.forwardRef((e,t)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:r,onPointerDownOutside:a,onFocusOutside:s,onInteractOutside:c,onDismiss:o,...f}=e,u=i.useContext(We),[d,m]=i.useState(null),g=(d==null?void 0:d.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,h]=i.useState({}),C=V(t,b=>m(b)),l=Array.from(u.layers),[v]=[...u.layersWithOutsidePointerEventsDisabled].slice(-1),p=l.indexOf(v),T=d?l.indexOf(d):-1,E=u.layersWithOutsidePointerEventsDisabled.size>0,S=T>=p,w=Ya(b=>{const A=b.target,I=[...u.branches].some(H=>H.contains(A));!S||I||(a==null||a(b),c==null||c(b),b.defaultPrevented||o==null||o())},g),P=Ha(b=>{const A=b.target;[...u.branches].some(H=>H.contains(A))||(s==null||s(b),c==null||c(b),b.defaultPrevented||o==null||o())},g);return Ba(b=>{T===u.layers.size-1&&(r==null||r(b),!b.defaultPrevented&&o&&(b.preventDefault(),o()))},g),i.useEffect(()=>{if(d)return n&&(u.layersWithOutsidePointerEventsDisabled.size===0&&(ge=g.body.style.pointerEvents,g.body.style.pointerEvents="none"),u.layersWithOutsidePointerEventsDisabled.add(d)),u.layers.add(d),he(),()=>{n&&u.layersWithOutsidePointerEventsDisabled.size===1&&(g.body.style.pointerEvents=ge)}},[d,g,n,u]),i.useEffect(()=>()=>{d&&(u.layers.delete(d),u.layersWithOutsidePointerEventsDisabled.delete(d),he())},[d,u]),i.useEffect(()=>{const b=()=>h({});return document.addEventListener(te,b),()=>document.removeEventListener(te,b)},[]),O.jsx(G.div,{...f,ref:C,style:{pointerEvents:E?S?"auto":"none":void 0,...e.style},onFocusCapture:X(e.onFocusCapture,P.onFocusCapture),onBlurCapture:X(e.onBlurCapture,P.onBlurCapture),onPointerDownCapture:X(e.onPointerDownCapture,w.onPointerDownCapture)})});Ka.displayName=Ua;var Va="DismissableLayerBranch",Ga=i.forwardRef((e,t)=>{const n=i.useContext(We),r=i.useRef(null),a=V(t,r);return i.useEffect(()=>{const s=r.current;if(s)return n.branches.add(s),()=>{n.branches.delete(s)}},[n.branches]),O.jsx(G.div,{...e,ref:a})});Ga.displayName=Va;function Ya(e,t=globalThis==null?void 0:globalThis.document){const n=N(e),r=i.useRef(!1),a=i.useRef(()=>{});return i.useEffect(()=>{const s=o=>{if(o.target&&!r.current){let f=function(){Ke(ka,n,u,{discrete:!0})};const u={originalEvent:o};o.pointerType==="touch"?(t.removeEventListener("click",a.current),a.current=f,t.addEventListener("click",a.current,{once:!0})):f()}else t.removeEventListener("click",a.current);r.current=!1},c=window.setTimeout(()=>{t.addEventListener("pointerdown",s)},0);return()=>{window.clearTimeout(c),t.removeEventListener("pointerdown",s),t.removeEventListener("click",a.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}function Ha(e,t=globalThis==null?void 0:globalThis.document){const n=N(e),r=i.useRef(!1);return i.useEffect(()=>{const a=s=>{s.target&&!r.current&&Ke(Wa,n,{originalEvent:s},{discrete:!1})};return t.addEventListener("focusin",a),()=>t.removeEventListener("focusin",a)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function he(){const e=new CustomEvent(te);document.dispatchEvent(e)}function Ke(e,t,n,{discrete:r}){const a=n.originalEvent.target,s=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&a.addEventListener(e,t,{once:!0}),r?Da(a,s):a.dispatchEvent(s)}var Xa="Portal",Za=i.forwardRef((e,t)=>{var o;const{container:n,...r}=e,[a,s]=i.useState(!1);W(()=>s(!0),[]);const c=n||a&&((o=globalThis==null?void 0:globalThis.document)==null?void 0:o.body);return c?dt.createPortal(O.jsx(G.div,{...r,ref:t}),c):null});Za.displayName=Xa;function qa(e,t){return i.useReducer((n,r)=>t[n][r]??n,e)}var za=e=>{const{present:t,children:n}=e,r=Qa(t),a=typeof n=="function"?n({present:r.isPresent}):i.Children.only(n),s=V(r.ref,Ja(a));return typeof n=="function"||r.isPresent?i.cloneElement(a,{ref:s}):null};za.displayName="Presence";function Qa(e){const[t,n]=i.useState(),r=i.useRef({}),a=i.useRef(e),s=i.useRef("none"),c=e?"mounted":"unmounted",[o,f]=qa(c,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return i.useEffect(()=>{const u=L(r.current);s.current=o==="mounted"?u:"none"},[o]),W(()=>{const u=r.current,d=a.current;if(d!==e){const g=s.current,h=L(u);e?f("MOUNT"):h==="none"||(u==null?void 0:u.display)==="none"?f("UNMOUNT"):f(d&&g!==h?"ANIMATION_OUT":"UNMOUNT"),a.current=e}},[e,f]),W(()=>{if(t){const u=m=>{const h=L(r.current).includes(m.animationName);m.target===t&&h&&Le.flushSync(()=>f("ANIMATION_END"))},d=m=>{m.target===t&&(s.current=L(r.current))};return t.addEventListener("animationstart",d),t.addEventListener("animationcancel",u),t.addEventListener("animationend",u),()=>{t.removeEventListener("animationstart",d),t.removeEventListener("animationcancel",u),t.removeEventListener("animationend",u)}}else f("ANIMATION_END")},[t,f]),{isPresent:["mounted","unmountSuspended"].includes(o),ref:i.useCallback(u=>{u&&(r.current=getComputedStyle(u)),n(u)},[])}}function L(e){return(e==null?void 0:e.animationName)||"none"}function Ja(e){var r,a;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(a=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:a.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var Z=0;function ns(){i.useEffect(()=>{const e=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",e[0]??ye()),document.body.insertAdjacentElement("beforeend",e[1]??ye()),Z++,()=>{Z===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(t=>t.remove()),Z--}},[])}function ye(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.cssText="outline: none; opacity: 0; position: fixed; pointer-events: none",e}var q="focusScope.autoFocusOnMount",z="focusScope.autoFocusOnUnmount",be={bubbles:!1,cancelable:!0},eo="FocusScope",to=i.forwardRef((e,t)=>{const{loop:n=!1,trapped:r=!1,onMountAutoFocus:a,onUnmountAutoFocus:s,...c}=e,[o,f]=i.useState(null),u=N(a),d=N(s),m=i.useRef(null),g=V(t,l=>f(l)),h=i.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;i.useEffect(()=>{if(r){let l=function(E){if(h.paused||!o)return;const S=E.target;o.contains(S)?m.current=S:_(m.current,{select:!0})},v=function(E){if(h.paused||!o)return;const S=E.relatedTarget;S!==null&&(o.contains(S)||_(m.current,{select:!0}))},p=function(E){if(document.activeElement===document.body)for(const w of E)w.removedNodes.length>0&&_(o)};document.addEventListener("focusin",l),document.addEventListener("focusout",v);const T=new MutationObserver(p);return o&&T.observe(o,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",l),document.removeEventListener("focusout",v),T.disconnect()}}},[r,o,h.paused]),i.useEffect(()=>{if(o){Se.add(h);const l=document.activeElement;if(!o.contains(l)){const p=new CustomEvent(q,be);o.addEventListener(q,u),o.dispatchEvent(p),p.defaultPrevented||(no(io(Ve(o)),{select:!0}),document.activeElement===l&&_(o))}return()=>{o.removeEventListener(q,u),setTimeout(()=>{const p=new CustomEvent(z,be);o.addEventListener(z,d),o.dispatchEvent(p),p.defaultPrevented||_(l??document.body,{select:!0}),o.removeEventListener(z,d),Se.remove(h)},0)}}},[o,u,d,h]);const C=i.useCallback(l=>{if(!n&&!r||h.paused)return;const v=l.key==="Tab"&&!l.altKey&&!l.ctrlKey&&!l.metaKey,p=document.activeElement;if(v&&p){const T=l.currentTarget,[E,S]=ro(T);E&&S?!l.shiftKey&&p===S?(l.preventDefault(),n&&_(E,{select:!0})):l.shiftKey&&p===E&&(l.preventDefault(),n&&_(S,{select:!0})):p===T&&l.preventDefault()}},[n,r,h.paused]);return O.jsx(G.div,{tabIndex:-1,...c,ref:g,onKeyDown:C})});to.displayName=eo;function no(e,{select:t=!1}={}){const n=document.activeElement;for(const r of e)if(_(r,{select:t}),document.activeElement!==n)return}function ro(e){const t=Ve(e),n=Ee(t,e),r=Ee(t.reverse(),e);return[n,r]}function Ve(e){const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const a=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||a?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function Ee(e,t){for(const n of e)if(!ao(n,{upTo:t}))return n}function ao(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function oo(e){return e instanceof HTMLInputElement&&"select"in e}function _(e,{select:t=!1}={}){if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),e!==n&&oo(e)&&t&&e.select()}}var Se=so();function so(){let e=[];return{add(t){const n=e[0];t!==n&&(n==null||n.pause()),e=Ce(e,t),e.unshift(t)},remove(t){var n;e=Ce(e,t),(n=e[0])==null||n.resume()}}}function Ce(e,t){const n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function io(e){return e.filter(t=>t.tagName!=="A")}var x=function(){return x=Object.assign||function(t){for(var n,r=1,a=arguments.length;r<a;r++){n=arguments[r];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},x.apply(this,arguments)};function co(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n}function uo(e,t,n){if(n||arguments.length===2)for(var r=0,a=t.length,s;r<a;r++)(s||!(r in t))&&(s||(s=Array.prototype.slice.call(t,0,r)),s[r]=t[r]);return e.concat(s||Array.prototype.slice.call(t))}var F="right-scroll-bar-position",B="width-before-scroll-bar",lo="with-scroll-bars-hidden",fo="--removed-body-scroll-bar-size";function vo(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function mo(e,t){var n=i.useState(function(){return{value:e,callback:t,facade:{get current(){return n.value},set current(r){var a=n.value;a!==r&&(n.value=r,n.callback(r,a))}}}})[0];return n.callback=t,n.facade}function po(e,t){return mo(null,function(n){return e.forEach(function(r){return vo(r,n)})})}function go(e){return e}function ho(e,t){t===void 0&&(t=go);var n=[],r=!1,a={read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:e},useMedium:function(s){var c=t(s,r);return n.push(c),function(){n=n.filter(function(o){return o!==c})}},assignSyncMedium:function(s){for(r=!0;n.length;){var c=n;n=[],c.forEach(s)}n={push:function(o){return s(o)},filter:function(){return n}}},assignMedium:function(s){r=!0;var c=[];if(n.length){var o=n;n=[],o.forEach(s),c=n}var f=function(){var d=c;c=[],d.forEach(s)},u=function(){return Promise.resolve().then(f)};u(),n={push:function(d){c.push(d),u()},filter:function(d){return c=c.filter(d),n}}}};return a}function yo(e){e===void 0&&(e={});var t=ho(null);return t.options=U({async:!0,ssr:!1},e),t}var Ge=function(e){var t=e.sideCar,n=vt(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw new Error("Sidecar medium not found");return i.createElement(r,U({},n))};Ge.isSideCarExport=!0;function bo(e,t){return e.useMedium(t),Ge}var Ye=yo(),Q=function(){},Y=i.forwardRef(function(e,t){var n=i.useRef(null),r=i.useState({onScrollCapture:Q,onWheelCapture:Q,onTouchMoveCapture:Q}),a=r[0],s=r[1],c=e.forwardProps,o=e.children,f=e.className,u=e.removeScrollBar,d=e.enabled,m=e.shards,g=e.sideCar,h=e.noIsolation,C=e.inert,l=e.allowPinchZoom,v=e.as,p=v===void 0?"div":v,T=e.gapMode,E=co(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),S=g,w=po([n,t]),P=x(x({},E),a);return i.createElement(i.Fragment,null,d&&i.createElement(S,{sideCar:Ye,removeScrollBar:u,shards:m,noIsolation:h,inert:C,setCallbacks:s,allowPinchZoom:!!l,lockRef:n,gapMode:T}),c?i.cloneElement(i.Children.only(o),x(x({},P),{ref:w})):i.createElement(p,x({},P,{className:f,ref:w}),o))});Y.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};Y.classNames={fullWidth:B,zeroRight:F};var Eo=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function So(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=Eo();return t&&e.setAttribute("nonce",t),e}function Co(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function wo(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var To=function(){var e=0,t=null;return{add:function(n){e==0&&(t=So())&&(Co(t,n),wo(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},Oo=function(){var e=To();return function(t,n){i.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},He=function(){var e=Oo(),t=function(n){var r=n.styles,a=n.dynamic;return e(r,a),null};return t},Po={left:0,top:0,right:0,gap:0},J=function(e){return parseInt(e||"",10)||0},Ao=function(e){var t=window.getComputedStyle(document.body),n=t[e==="padding"?"paddingLeft":"marginLeft"],r=t[e==="padding"?"paddingTop":"marginTop"],a=t[e==="padding"?"paddingRight":"marginRight"];return[J(n),J(r),J(a)]},_o=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return Po;var t=Ao(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},xo=He(),No=function(e,t,n,r){var a=e.left,s=e.top,c=e.right,o=e.gap;return n===void 0&&(n="margin"),`
  .`.concat(lo,` {
   overflow: hidden `).concat(r,`;
   padding-right: `).concat(o,"px ").concat(r,`;
  }
  body {
    overflow: hidden `).concat(r,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(r,";"),n==="margin"&&`
    padding-left: `.concat(a,`px;
    padding-top: `).concat(s,`px;
    padding-right: `).concat(c,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(o,"px ").concat(r,`;
    `),n==="padding"&&"padding-right: ".concat(o,"px ").concat(r,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(F,` {
    right: `).concat(o,"px ").concat(r,`;
  }
  
  .`).concat(B,` {
    margin-right: `).concat(o,"px ").concat(r,`;
  }
  
  .`).concat(F," .").concat(F,` {
    right: 0 `).concat(r,`;
  }
  
  .`).concat(B," .").concat(B,` {
    margin-right: 0 `).concat(r,`;
  }
  
  body {
    `).concat(fo,": ").concat(o,`px;
  }
`)},Ro=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,a=r===void 0?"margin":r,s=i.useMemo(function(){return _o(a)},[a]);return i.createElement(xo,{styles:No(s,!t,a,n?"":"!important")})},ne=!1;if(typeof window<"u")try{var j=Object.defineProperty({},"passive",{get:function(){return ne=!0,!0}});window.addEventListener("test",j,j),window.removeEventListener("test",j,j)}catch{ne=!1}var R=ne?{passive:!1}:!1,$o=function(e){return e.tagName==="TEXTAREA"},Xe=function(e,t){var n=window.getComputedStyle(e);return n[t]!=="hidden"&&!(n.overflowY===n.overflowX&&!$o(e)&&n[t]==="visible")},Io=function(e){return Xe(e,"overflowY")},Lo=function(e){return Xe(e,"overflowX")},we=function(e,t){var n=t.ownerDocument,r=t;do{typeof ShadowRoot<"u"&&r instanceof ShadowRoot&&(r=r.host);var a=Ze(e,r);if(a){var s=qe(e,r),c=s[1],o=s[2];if(c>o)return!0}r=r.parentNode}while(r&&r!==n.body);return!1},jo=function(e){var t=e.scrollTop,n=e.scrollHeight,r=e.clientHeight;return[t,n,r]},Mo=function(e){var t=e.scrollLeft,n=e.scrollWidth,r=e.clientWidth;return[t,n,r]},Ze=function(e,t){return e==="v"?Io(t):Lo(t)},qe=function(e,t){return e==="v"?jo(t):Mo(t)},Do=function(e,t){return e==="h"&&t==="rtl"?-1:1},Fo=function(e,t,n,r,a){var s=Do(e,window.getComputedStyle(t).direction),c=s*r,o=n.target,f=t.contains(o),u=!1,d=c>0,m=0,g=0;do{var h=qe(e,o),C=h[0],l=h[1],v=h[2],p=l-v-s*C;(C||p)&&Ze(e,o)&&(m+=p,g+=C),o instanceof ShadowRoot?o=o.host:o=o.parentNode}while(!f&&o!==document.body||f&&(t.contains(o)||t===o));return(d&&(Math.abs(m)<1||!a)||!d&&(Math.abs(g)<1||!a))&&(u=!0),u},M=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},Te=function(e){return[e.deltaX,e.deltaY]},Oe=function(e){return e&&"current"in e?e.current:e},Bo=function(e,t){return e[0]===t[0]&&e[1]===t[1]},Uo=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},ko=0,$=[];function Wo(e){var t=i.useRef([]),n=i.useRef([0,0]),r=i.useRef(),a=i.useState(ko++)[0],s=i.useState(He)[0],c=i.useRef(e);i.useEffect(function(){c.current=e},[e]),i.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(a));var l=uo([e.lockRef.current],(e.shards||[]).map(Oe),!0).filter(Boolean);return l.forEach(function(v){return v.classList.add("allow-interactivity-".concat(a))}),function(){document.body.classList.remove("block-interactivity-".concat(a)),l.forEach(function(v){return v.classList.remove("allow-interactivity-".concat(a))})}}},[e.inert,e.lockRef.current,e.shards]);var o=i.useCallback(function(l,v){if("touches"in l&&l.touches.length===2)return!c.current.allowPinchZoom;var p=M(l),T=n.current,E="deltaX"in l?l.deltaX:T[0]-p[0],S="deltaY"in l?l.deltaY:T[1]-p[1],w,P=l.target,b=Math.abs(E)>Math.abs(S)?"h":"v";if("touches"in l&&b==="h"&&P.type==="range")return!1;var A=we(b,P);if(!A)return!0;if(A?w=b:(w=b==="v"?"h":"v",A=we(b,P)),!A)return!1;if(!r.current&&"changedTouches"in l&&(E||S)&&(r.current=w),!w)return!0;var I=r.current||w;return Fo(I,v,l,I==="h"?E:S,!0)},[]),f=i.useCallback(function(l){var v=l;if(!(!$.length||$[$.length-1]!==s)){var p="deltaY"in v?Te(v):M(v),T=t.current.filter(function(w){return w.name===v.type&&(w.target===v.target||v.target===w.shadowParent)&&Bo(w.delta,p)})[0];if(T&&T.should){v.cancelable&&v.preventDefault();return}if(!T){var E=(c.current.shards||[]).map(Oe).filter(Boolean).filter(function(w){return w.contains(v.target)}),S=E.length>0?o(v,E[0]):!c.current.noIsolation;S&&v.cancelable&&v.preventDefault()}}},[]),u=i.useCallback(function(l,v,p,T){var E={name:l,delta:v,target:p,should:T,shadowParent:Ko(p)};t.current.push(E),setTimeout(function(){t.current=t.current.filter(function(S){return S!==E})},1)},[]),d=i.useCallback(function(l){n.current=M(l),r.current=void 0},[]),m=i.useCallback(function(l){u(l.type,Te(l),l.target,o(l,e.lockRef.current))},[]),g=i.useCallback(function(l){u(l.type,M(l),l.target,o(l,e.lockRef.current))},[]);i.useEffect(function(){return $.push(s),e.setCallbacks({onScrollCapture:m,onWheelCapture:m,onTouchMoveCapture:g}),document.addEventListener("wheel",f,R),document.addEventListener("touchmove",f,R),document.addEventListener("touchstart",d,R),function(){$=$.filter(function(l){return l!==s}),document.removeEventListener("wheel",f,R),document.removeEventListener("touchmove",f,R),document.removeEventListener("touchstart",d,R)}},[]);var h=e.removeScrollBar,C=e.inert;return i.createElement(i.Fragment,null,C?i.createElement(s,{styles:Uo(a)}):null,h?i.createElement(Ro,{gapMode:e.gapMode}):null)}function Ko(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}const Vo=bo(Ye,Wo);var Go=i.forwardRef(function(e,t){return i.createElement(Y,x({},e,{ref:t,sideCar:Vo}))});Go.classNames=Y.classNames;export{Ka as D,to as F,G as P,Go as R,ke as S,je as _,es as a,V as b,Jo as c,X as d,za as e,Za as f,ns as g,Qo as h,On as i,zo as j,K as k,se as l,mt as m,yt as n,Et as o,_t as p,Ca as q,N as r,W as s,xa as t,ts as u,U as v};