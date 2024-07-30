import{j as E}from"./jsx-runtime-Nms4Y4qS.js";import{h as te,g as ve}from"./getVerticalPositioning-CXY_GBne.js";import{$ as he}from"./useButton-DFNFXdnN.js";import{a as be}from"./FocusScope-DegwnO3I.js";import{h as ye,$ as we}from"./useFocusRing-Vzyl7-Lk.js";import{b as $e,a as Ee,c as ke}from"./useMenuTrigger-QxOTs40T.js";import{b as xe,c as Te,a as qe}from"./useDialog-BeiZRcOL.js";import{b as pe}from"./useFocusable-wKuCPQI4.js";import{a as Be,$ as Le}from"./useOverlayTriggerState-CAIlDegc.js";import{r as T}from"./index-BwDkhjyp.js";import{F as Re}from"./focusStyle-CBFElZiz.js";import{m as A}from"./merge-DI-veSMP.js";import{B as Pe,a as He,b as D,c as U}from"./Button-DqlvyMV-.js";import{I as Se}from"./IconCheckMark-CLvJH1sB.js";import{B as Me}from"./Badge-D-eWKloI.js";import{F as Ie}from"./FieldsetHeader-x4UvCVug.js";import{$ as X}from"./SSRProvider-CYXx33DY.js";import{$ as Ce}from"./context-C2PaECDE.js";function Ne(){return typeof window.ResizeObserver<"u"}function oe(e){const{ref:t,box:o,onResize:a}=e;T.useEffect(()=>{let n=t==null?void 0:t.current;if(n)if(Ne()){const r=new window.ResizeObserver(i=>{i.length&&a()});return r.observe(n,{box:o}),()=>{n&&r.unobserve(n)}}else return window.addEventListener("resize",a,!1),()=>{window.removeEventListener("resize",a,!1)}},[a,t,o])}function Z(e,t=-1/0,o=1/0){return Math.min(Math.max(e,t),o)}const F={top:"top",bottom:"top",left:"left",right:"left"},V={top:"bottom",bottom:"top",left:"right",right:"left"},Fe={top:"left",left:"top"},J={top:"height",left:"width"},fe={width:"totalWidth",height:"totalHeight"},O={};let q=typeof document<"u"&&window.visualViewport;function ne(e){let t=0,o=0,a=0,n=0,r=0,i=0,l={},p=(q==null?void 0:q.scale)>1;if(e.tagName==="BODY"){let u=document.documentElement;a=u.clientWidth,n=u.clientHeight;var s;t=(s=q==null?void 0:q.width)!==null&&s!==void 0?s:a;var c;o=(c=q==null?void 0:q.height)!==null&&c!==void 0?c:n,l.top=u.scrollTop||e.scrollTop,l.left=u.scrollLeft||e.scrollLeft,q&&(r=q.offsetTop,i=q.offsetLeft)}else({width:t,height:o,top:r,left:i}=z(e)),l.top=e.scrollTop,l.left=e.scrollLeft,a=t,n=o;return ye()&&(e.tagName==="BODY"||e.tagName==="HTML")&&p&&(l.top=0,l.left=0,r=q.pageTop,i=q.pageLeft),{width:t,height:o,totalWidth:a,totalHeight:n,scroll:l,top:r,left:i}}function ze(e){return{top:e.scrollTop,left:e.scrollLeft,width:e.scrollWidth,height:e.scrollHeight}}function ae(e,t,o,a,n,r,i){let l=n.scroll[e],p=a[J[e]],s=a.scroll[F[e]]+r,c=p+a.scroll[F[e]]-r,u=t-l+i[e]-a[F[e]],f=t-l+o+i[e]-a[F[e]];return u<s?s-u:f>c?Math.max(c-f,s-u):0}function je(e){let t=window.getComputedStyle(e);return{top:parseInt(t.marginTop,10)||0,bottom:parseInt(t.marginBottom,10)||0,left:parseInt(t.marginLeft,10)||0,right:parseInt(t.marginRight,10)||0}}function re(e){if(O[e])return O[e];let[t,o]=e.split(" "),a=F[t]||"right",n=Fe[a];F[o]||(o="center");let r=J[a],i=J[n];return O[e]={placement:t,crossPlacement:o,axis:a,crossAxis:n,size:r,crossSize:i},O[e]}function G(e,t,o,a,n,r,i,l,p,s){let{placement:c,crossPlacement:u,axis:f,crossAxis:d,size:g,crossSize:b}=a,m={};m[d]=e[d],u==="center"?m[d]+=(e[b]-o[b])/2:u!==d&&(m[d]+=e[b]-o[b]),m[d]+=r;const x=e[d]-o[b]+p+s,v=e[d]+e[b]-p-s;if(m[d]=Z(m[d],x,v),c===f){const y=l?i[g]:t[fe[g]];m[V[f]]=Math.floor(y-e[f]+n)}else m[f]=Math.floor(e[f]+e[g]+n);return m}function Ae(e,t,o,a,n,r,i,l){const p=a?o.height:t[fe.height];let s=e.top!=null?o.top+e.top:o.top+(p-e.bottom-i),c=l!=="top"?Math.max(0,t.height+t.top+t.scroll.top-s-(n.top+n.bottom+r)):Math.max(0,s+i-(t.top+t.scroll.top)-(n.top+n.bottom+r));return Math.min(t.height-r*2,c)}function le(e,t,o,a,n,r){let{placement:i,axis:l,size:p}=r;return i===l?Math.max(0,o[l]-e[l]-e.scroll[l]+t[l]-a[l]-a[V[l]]-n):Math.max(0,e[p]+e[l]+e.scroll[l]-t[l]-o[l]-o[p]-a[l]-a[V[l]]-n)}function Oe(e,t,o,a,n,r,i,l,p,s,c,u,f,d,g,b){let m=re(e),{size:x,crossAxis:v,crossSize:y,placement:C,crossPlacement:B}=m,h=G(t,l,o,m,c,u,s,f,g,b),H=c,R=le(l,s,t,n,r+c,m);if(i&&a[x]>R){let _=re(`${V[C]} ${B}`),ge=G(t,l,o,_,c,u,s,f,g,b);le(l,s,t,n,r+c,_)>R&&(m=_,h=ge,H=c)}let w="bottom";m.axis==="top"?m.placement==="top"?w="top":m.placement==="bottom"&&(w="bottom"):m.crossAxis==="top"&&(m.crossPlacement==="top"?w="bottom":m.crossPlacement==="bottom"&&(w="top"));let k=ae(v,h[v],o[y],l,p,r,s);h[v]+=k;let L=Ae(h,l,s,f,n,r,o.height,w);d&&d<L&&(L=d),o.height=Math.min(o.height,L),h=G(t,l,o,m,H,u,s,f,g,b),k=ae(v,h[v],o[y],l,p,r,s),h[v]+=k;let S={},M=t[v]+.5*t[y]-h[v];const P=g/2+b,I=o[y]-g/2-b,N=t[v]-h[v]+g/2,Y=t[v]+t[y]-h[v]-g/2,W=Z(M,N,Y);return S[v]=Z(W,P,I),{position:h,maxHeight:L,arrowOffsetLeft:S.left,arrowOffsetTop:S.top,placement:m.placement}}function Ve(e){let{placement:t,targetNode:o,overlayNode:a,scrollNode:n,padding:r,shouldFlip:i,boundaryElement:l,offset:p,crossOffset:s,maxHeight:c,arrowSize:u=0,arrowBoundaryOffset:f=0}=e,d=a instanceof HTMLElement?Ye(a):document.documentElement,g=d===document.documentElement;const b=window.getComputedStyle(d).position;let m=!!b&&b!=="static",x=g?z(o):ie(o,d);if(!g){let{marginTop:R,marginLeft:w}=window.getComputedStyle(o);x.top+=parseInt(R,10)||0,x.left+=parseInt(w,10)||0}let v=z(a),y=je(a);v.width+=y.left+y.right,v.height+=y.top+y.bottom;let C=ze(n),B=ne(l),h=ne(d),H=l.tagName==="BODY"?z(d):ie(d,l);return d.tagName==="HTML"&&l.tagName==="BODY"&&(h.scroll.top=0,h.scroll.left=0),Oe(t,x,v,C,y,r,i,B,h,H,p,s,m,c,u,f)}function z(e){let{top:t,left:o,width:a,height:n}=e.getBoundingClientRect(),{scrollTop:r,scrollLeft:i,clientTop:l,clientLeft:p}=document.documentElement;return{top:t+r-l,left:o+i-p,width:a,height:n}}function ie(e,t){let o=window.getComputedStyle(e),a;if(o.position==="fixed"){let{top:n,left:r,width:i,height:l}=e.getBoundingClientRect();a={top:n,left:r,width:i,height:l}}else{a=z(e);let n=z(t),r=window.getComputedStyle(t);n.top+=(parseInt(r.borderTopWidth,10)||0)-t.scrollTop,n.left+=(parseInt(r.borderLeftWidth,10)||0)-t.scrollLeft,a.top-=n.top,a.left-=n.left}return a.top-=parseInt(o.marginTop,10)||0,a.left-=parseInt(o.marginLeft,10)||0,a}function Ye(e){let t=e.offsetParent;if(t&&t===document.body&&window.getComputedStyle(t).position==="static"&&!se(t)&&(t=document.documentElement),t==null)for(t=e.parentElement;t&&!se(t);)t=t.parentElement;return t||document.documentElement}function se(e){let t=window.getComputedStyle(e);return t.transform!=="none"||/transform|perspective/.test(t.willChange)||t.filter!=="none"||t.contain==="paint"||"backdropFilter"in t&&t.backdropFilter!=="none"||"WebkitBackdropFilter"in t&&t.WebkitBackdropFilter!=="none"}let $=typeof document<"u"&&window.visualViewport;function We(e){let{direction:t}=Ce(),{arrowSize:o=0,targetRef:a,overlayRef:n,scrollRef:r=n,placement:i="bottom",containerPadding:l=12,shouldFlip:p=!0,boundaryElement:s=typeof document<"u"?document.body:null,offset:c=0,crossOffset:u=0,shouldUpdatePosition:f=!0,isOpen:d=!0,onClose:g,maxHeight:b,arrowBoundaryOffset:m=0}=e,[x,v]=T.useState({position:{},arrowOffsetLeft:void 0,arrowOffsetTop:void 0,maxHeight:void 0,placement:void 0}),y=[f,i,n.current,a.current,r.current,l,p,s,c,u,d,t,b,m,o],C=T.useRef($==null?void 0:$.scale);T.useEffect(()=>{d&&(C.current=$==null?void 0:$.scale)},[d]);let B=T.useCallback(()=>{if(f===!1||!d||!n.current||!a.current||!s||($==null?void 0:$.scale)!==C.current)return;let w=null;if(r.current&&r.current.contains(document.activeElement)){let P=document.activeElement.getBoundingClientRect(),I=r.current.getBoundingClientRect();w={type:"top",offset:P.top-I.top},w.offset>I.height/2&&(w.type="bottom",w.offset=P.bottom-I.bottom)}let k=n.current;if(!b&&n.current){var L;k.style.top="0px",k.style.bottom="";var S;k.style.maxHeight=((S=(L=window.visualViewport)===null||L===void 0?void 0:L.height)!==null&&S!==void 0?S:window.innerHeight)+"px"}let M=Ve({placement:De(i,t),overlayNode:n.current,targetNode:a.current,scrollNode:r.current||n.current,padding:l,shouldFlip:p,boundaryElement:s,offset:c,crossOffset:u,maxHeight:b,arrowSize:o,arrowBoundaryOffset:m});if(k.style.top="",k.style.bottom="",k.style.left="",k.style.right="",Object.keys(M.position).forEach(P=>k.style[P]=M.position[P]+"px"),k.style.maxHeight=M.maxHeight!=null?M.maxHeight+"px":void 0,w){let P=document.activeElement.getBoundingClientRect(),I=r.current.getBoundingClientRect(),N=P[w.type]-I[w.type];r.current.scrollTop+=N-w.offset}v(M)},y);X(B,y),_e(B),oe({ref:n,onResize:B}),oe({ref:a,onResize:B});let h=T.useRef(!1);X(()=>{let w,k=()=>{h.current=!0,clearTimeout(w),w=setTimeout(()=>{h.current=!1},500),B()},L=()=>{h.current&&k()};return $==null||$.addEventListener("resize",k),$==null||$.addEventListener("scroll",L),()=>{$==null||$.removeEventListener("resize",k),$==null||$.removeEventListener("scroll",L)}},[B]);let H=T.useCallback(()=>{h.current||g()},[g,h]);$e({triggerRef:a,isOpen:d,onClose:g&&H});var R;return{overlayProps:{style:{position:"absolute",zIndex:1e5,...x.position,maxHeight:(R=x.maxHeight)!==null&&R!==void 0?R:"100vh"}},placement:x.placement,arrowProps:{"aria-hidden":"true",role:"presentation",style:{left:x.arrowOffsetLeft,top:x.arrowOffsetTop}},updatePosition:B}}function _e(e){X(()=>(window.addEventListener("resize",e,!1),()=>{window.removeEventListener("resize",e,!1)}),[e])}function De(e,t){return t==="rtl"?e.replace("start","right").replace("end","left"):e.replace("start","left").replace("end","right")}const Ue=typeof document<"u"?document:void 0;function Ge(e="body",{document:t=Ue}={}){if(!t)return()=>{};let o=t.querySelector(e);if(!o)return()=>{};let a={childList:!0},n=[],r,i=new MutationObserver(l=>{const p=t.querySelector('[data-live-announcer="true"]');for(let s of l)if(s.type==="childList"&&s.addedNodes.length>0){let c=Array.from(s.addedNodes).find(u=>{var f;return(f=u.querySelector)===null||f===void 0?void 0:f.call(u,'[aria-modal="true"], [data-ismodal="true"]')});if(c){n.push(c);let u=c.querySelector('[aria-modal="true"], [data-ismodal="true"]');r==null||r();let f=[u,...p?[p]:[]];r=te(f)}}else if(s.type==="childList"&&s.removedNodes.length>0){let c=Array.from(s.removedNodes),u=n.findIndex(f=>c.includes(f));if(u>=0)if(r==null||r(),n=n.filter((f,d)=>d!==u),n.length>0){let d=[n[n.length-1].querySelector('[aria-modal="true"], [data-ismodal="true"]'),...p?[p]:[]];r=te(d)}else r=void 0}});return i.observe(o,a),()=>{r==null||r(),i.disconnect()}}const K=({buttons:e,border:t=!0})=>E.jsx("div",{className:A(["tw-flex tw-gap-x-3 tw-rounded-b tw-justify-end tw-py-5 tw-px-8 tw-bg-base",t&&"tw-border-t tw-border-line","tw-min-h-[4.75rem]"]),children:e.map((o,a)=>E.jsx(Pe,{...o,size:He.Medium},`flyout-footer-button-${a}`))});K.displayName="FondueFlyoutFooter";const Q=({onConfirm:e,onCancel:t})=>E.jsx(K,{buttons:e?[{style:D.Default,emphasis:U.Default,children:"Cancel",onClick:t},{style:D.Default,emphasis:U.Strong,children:"Confirm",onClick:e,icon:E.jsx(Se,{})}]:[{style:D.Default,emphasis:U.Default,children:"Close",onClick:t}]});Q.displayName="FondueLegacyFlyoutFooter";K.__docgenInfo={description:"",methods:[],displayName:"FondueFlyoutFooter",props:{buttons:{required:!0,tsType:{name:"union",raw:"[ButtonProps, ButtonProps] | [ButtonProps]",elements:[{name:"tuple",raw:"[ButtonProps, ButtonProps]",elements:[{name:"signature",type:"object",raw:`{
    type?: ButtonType;
    title?: string;
    style?: ButtonStyle;
    emphasis?: ButtonEmphasis;
    hideLabel?: boolean;
    size?: ButtonSize;
    rounding?: ButtonRounding;
    disabled?: boolean;
    icon?: ReactElement;
    children?: ReactNode;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    hugWidth?: boolean;
    'aria-label'?: string;
    'aria-describedby'?: string;
    formId?: string;
    /** @deprecated use emphasis with ButtonEmphasis.Weak */
    solid?: boolean;
    /** @deprecated inverted can be done by wrapping the component in a className="tw-dark" */
    inverted?: boolean;
    'data-test-id'?: string;
}`,signature:{properties:[{key:"type",value:{name:"ButtonType",required:!1}},{key:"title",value:{name:"string",required:!1}},{key:"style",value:{name:"ButtonStyle",required:!1}},{key:"emphasis",value:{name:"ButtonEmphasis",required:!1}},{key:"hideLabel",value:{name:"boolean",required:!1}},{key:"size",value:{name:"ButtonSize",required:!1}},{key:"rounding",value:{name:"ButtonRounding",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ReactElement",required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"(event?: MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"HTMLButtonElement"}],raw:"MouseEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"hugWidth",value:{name:"boolean",required:!1}},{key:"aria-label",value:{name:"string",required:!1}},{key:"aria-describedby",value:{name:"string",required:!1}},{key:"formId",value:{name:"string",required:!1}},{key:"solid",value:{name:"boolean",required:!1},description:"@deprecated use emphasis with ButtonEmphasis.Weak"},{key:"inverted",value:{name:"boolean",required:!1},description:'@deprecated inverted can be done by wrapping the component in a className="tw-dark"'},{key:"data-test-id",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type?: ButtonType;
    title?: string;
    style?: ButtonStyle;
    emphasis?: ButtonEmphasis;
    hideLabel?: boolean;
    size?: ButtonSize;
    rounding?: ButtonRounding;
    disabled?: boolean;
    icon?: ReactElement;
    children?: ReactNode;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    hugWidth?: boolean;
    'aria-label'?: string;
    'aria-describedby'?: string;
    formId?: string;
    /** @deprecated use emphasis with ButtonEmphasis.Weak */
    solid?: boolean;
    /** @deprecated inverted can be done by wrapping the component in a className="tw-dark" */
    inverted?: boolean;
    'data-test-id'?: string;
}`,signature:{properties:[{key:"type",value:{name:"ButtonType",required:!1}},{key:"title",value:{name:"string",required:!1}},{key:"style",value:{name:"ButtonStyle",required:!1}},{key:"emphasis",value:{name:"ButtonEmphasis",required:!1}},{key:"hideLabel",value:{name:"boolean",required:!1}},{key:"size",value:{name:"ButtonSize",required:!1}},{key:"rounding",value:{name:"ButtonRounding",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ReactElement",required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"(event?: MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"HTMLButtonElement"}],raw:"MouseEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"hugWidth",value:{name:"boolean",required:!1}},{key:"aria-label",value:{name:"string",required:!1}},{key:"aria-describedby",value:{name:"string",required:!1}},{key:"formId",value:{name:"string",required:!1}},{key:"solid",value:{name:"boolean",required:!1},description:"@deprecated use emphasis with ButtonEmphasis.Weak"},{key:"inverted",value:{name:"boolean",required:!1},description:'@deprecated inverted can be done by wrapping the component in a className="tw-dark"'},{key:"data-test-id",value:{name:"string",required:!1}}]}}]},{name:"tuple",raw:"[ButtonProps]",elements:[{name:"signature",type:"object",raw:`{
    type?: ButtonType;
    title?: string;
    style?: ButtonStyle;
    emphasis?: ButtonEmphasis;
    hideLabel?: boolean;
    size?: ButtonSize;
    rounding?: ButtonRounding;
    disabled?: boolean;
    icon?: ReactElement;
    children?: ReactNode;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    hugWidth?: boolean;
    'aria-label'?: string;
    'aria-describedby'?: string;
    formId?: string;
    /** @deprecated use emphasis with ButtonEmphasis.Weak */
    solid?: boolean;
    /** @deprecated inverted can be done by wrapping the component in a className="tw-dark" */
    inverted?: boolean;
    'data-test-id'?: string;
}`,signature:{properties:[{key:"type",value:{name:"ButtonType",required:!1}},{key:"title",value:{name:"string",required:!1}},{key:"style",value:{name:"ButtonStyle",required:!1}},{key:"emphasis",value:{name:"ButtonEmphasis",required:!1}},{key:"hideLabel",value:{name:"boolean",required:!1}},{key:"size",value:{name:"ButtonSize",required:!1}},{key:"rounding",value:{name:"ButtonRounding",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ReactElement",required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"(event?: MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"HTMLButtonElement"}],raw:"MouseEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"hugWidth",value:{name:"boolean",required:!1}},{key:"aria-label",value:{name:"string",required:!1}},{key:"aria-describedby",value:{name:"string",required:!1}},{key:"formId",value:{name:"string",required:!1}},{key:"solid",value:{name:"boolean",required:!1},description:"@deprecated use emphasis with ButtonEmphasis.Weak"},{key:"inverted",value:{name:"boolean",required:!1},description:'@deprecated inverted can be done by wrapping the component in a className="tw-dark"'},{key:"data-test-id",value:{name:"string",required:!1}}]}}]}]},description:""},border:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};Q.__docgenInfo={description:"",methods:[],displayName:"FondueLegacyFlyoutFooter",props:{onConfirm:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const Xe=({title:e,decorator:t,badges:o=[],onClose:a,children:n,isOpen:r,positionProps:i,overlayTriggerProps:l,scrollRef:p,fixedHeader:s,fixedFooter:c,fitContent:u,contentMinHeight:f},d)=>{const{overlayProps:g}=Be({onClose:a,isOpen:r,isDismissable:!0},d),{modalProps:b}=xe(),{dialogProps:m,titleProps:x}=Te({},d);return E.jsx("div",{...pe(g,m,b,i,l),ref:d,className:A(["tw-rounded tw-flex tw-outline-none tw-relative",u?"tw-min-w-0":"tw-min-w-[400px]"]),children:E.jsxs("div",{className:A(["tw-flex tw-flex-col tw-flex-auto tw-min-h-0 tw-rounded tw-shadow-mid tw-border tw-border-line-x-strong"]),children:[s,E.jsxs("div",{ref:p,className:A(["tw-flex tw-overflow-y-auto tw-overflow-x-hidden tw-flex-col tw-divide-y tw-divide tw-divide-black-10 tw-bg-white tw-text-black dark:tw-text-white dark:tw-bg-black-95",!s&&"tw-rounded-t",!c&&"tw-rounded-b"]),style:{minHeight:`${f}px`},children:[e&&E.jsxs("div",{className:"tw-flex tw-justify-between tw-flex-wrap tw-gap-3 tw-p-8",children:[E.jsx("div",{...x,className:"tw-inline-flex",children:E.jsx(Ie,{decorator:t,children:e})}),E.jsx("div",{className:"tw-inline-flex tw-gap-2 tw-flex-wrap",children:o.map((v,y)=>T.createElement(Me,{...v,key:`flyout-badge-${y}`}))})]}),T.Children.map(n,(v,y)=>E.jsx("div",{children:v},y)),E.jsx(Ee,{onDismiss:a})]}),c]})})},ee=T.forwardRef(Xe);ee.displayName="FondueOverlay";ee.__docgenInfo={description:"",methods:[],displayName:"FondueOverlay",props:{badges:{defaultValue:{value:"[]",computed:!1},required:!1}}};const Ze=(e,{isDisabled:t=!1})=>{T.useEffect(()=>{const o=e.current,a=i=>{const l=["auto","scroll"];if(!i||i===o)return null;const p=l.includes(window.getComputedStyle(i).overflowY);return i.scrollHeight>i.clientHeight&&p?i:a(i.parentElement)},n=i=>{const l=()=>{i.stopPropagation(),i.preventDefault()};if(o!==null){const p=i.deltaY,s=p<0,c=a(i.target)??o,{scrollTop:u,scrollHeight:f,clientHeight:d}=c;if(!s&&p>f-d-u)return c.scrollTop=f,l(),!1;if(s&&-p>u)return c.scrollTop=0,l(),!1}},r={passive:!1,capture:!1};return!t&&o!==null&&o.addEventListener("wheel",n,r),()=>{!t&&o!==null&&o.removeEventListener("wheel",n,r)}},[t,e])},Je=(e,t)=>{let o=0;if(t.current&&e.current){const a=e.current.scrollHeight,{scrollHeight:n,clientHeight:r}=t.current;o=a+(n-r)}return o},de=5,ue=12,ce=70,Ke={top:"bottom",bottom:"top",left:"right",right:"left","top left":"bottom left","top right":"bottom right","bottom left":"top left","bottom right":"top right"},Qe=({triggerRef:e,overlayRef:t,scrollRef:o,isOpen:a,placement:n,offset:r,updatePositionOnContentChange:i})=>{var d;const[l,p]=T.useState(!1),s=n&&Ke[n],c=l?s:n,{overlayProps:u,updatePosition:f}=We({targetRef:e,overlayRef:t,shouldFlip:n===j.Left||n===j.Right,placement:n&&(n===j.Left||n===j.Right)?n:c,containerPadding:ue,offset:r??de,scrollRef:o,isOpen:a});if(T.useLayoutEffect(()=>{const g=new ResizeObserver(f);if(a){const b=Je(t,o),m=ve(e.current,b,de,ce).position==="top";p(m),o.current&&i&&g.observe(o.current),t.current&&i&&g.observe(t.current)}return()=>{g.disconnect()}},[a,i,f,o,t,e]),typeof((d=u==null?void 0:u.style)==null?void 0:d.maxHeight)=="number"&&!l){const g=ce-ue;u.style.maxHeight-=g}return{positionProps:u}},yt="#eaebeb",wt="10px";var j=(e=>(e.Top="top",e.Bottom="bottom",e.TopLeft="top left",e.BottomLeft="bottom left",e.TopRight="top right",e.BottomRight="bottom right",e.Right="right",e.Left="left",e))(j||{});const me=({trigger:e,isTriggerDisabled:t=!1,decorator:o,onConfirm:a,onCancel:n,children:r,onOpenChange:i,isOpen:l=!1,title:p="",badges:s=[],hug:c=!0,fitContent:u=!1,fixedHeader:f,fixedFooter:d,contentMinHeight:g,legacyFooter:b=!0,placement:m="bottom left",offset:x,updatePositionOnContentChange:v=!1})=>{const y=Le({isOpen:l,onOpenChange:i}),{toggle:C,close:B}=y,h=T.useRef(null),H=T.useRef(null),R=T.useRef(null),{isFocusVisible:w,focusProps:k}=we(),{triggerProps:L,overlayProps:S}=ke({type:"dialog"},y,h),{positionProps:M}=Qe({triggerRef:h,overlayRef:H,scrollRef:R,isOpen:l,placement:m,offset:x,updatePositionOnContentChange:v}),{buttonProps:P,isPressed:I}=he({onPress:()=>C(),elementType:"div",isDisabled:t,preventFocusOnPress:!0},h);T.useEffect(()=>{const W=Ge();return()=>W()},[]),Ze(H,{isDisabled:!l});const N=pe(P,L,k,{"aria-label":"Toggle Flyout Menu"}),Y=typeof e=="function"?e(N,h,{isFocusVisible:w,isPressed:I}):E.jsx("div",{...N,ref:h,className:A(["tw-outline-none tw-rounded",c?"tw-mx-3":"tw-w-full",w&&Re]),"data-test-id":"flyout-trigger",children:e});return E.jsxs(E.Fragment,{children:[Y,l&&E.jsx(qe,{children:E.jsx(be,{restoreFocus:!0,contain:!0,children:E.jsx(ee,{title:p,badges:s,decorator:o,isOpen:l,onClose:B,overlayTriggerProps:S,positionProps:M,fixedHeader:f,fixedFooter:b?E.jsx(Q,{onConfirm:a,onCancel:n}):d,ref:H,scrollRef:R,fitContent:u,contentMinHeight:g,children:r})})})]})};me.displayName="FondueFlyout";me.__docgenInfo={description:"@deprecated Use `Flyout` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#flyout-old-inlinedialog the migration guide}.",methods:[],displayName:"FondueFlyout",props:{trigger:{required:!0,tsType:{name:"union",raw:`| ReactNode
| ((
      triggerProps: HTMLAttributes<HTMLElement>,
      ref: MutableRefObject<HTMLElement | null>,
      triggerState: { isFocusVisible: boolean; isPressed: boolean },
  ) => JSX.Element)`,elements:[{name:"ReactNode"},{name:"unknown"}]},description:""},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onConfirm:{required:!1,tsType:{name:"signature",type:"function",raw:"(event?: MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"HTMLButtonElement"}],raw:"MouseEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},decorator:{required:!1,tsType:{name:"ReactNode"},description:""},badges:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    style?: BadgeStyle;
    icon?: ReactElement<IconProps>;
    status?: BadgeStatusIconProps['status'];
    onClick?: () => void;
    onDismiss?: () => void;
    disabled?: boolean;
    emphasis?: BadgeEmphasis;
    size?: BadgeSize;
    children?: ReactNode;
    'data-test-id'?: string;
    /** @description withTitle could be disabled only in the case another overlay is present, ex Tooltip */
    withTitleAttribute?: boolean;
}`,signature:{properties:[{key:"style",value:{name:"BadgeStyle",required:!1}},{key:"icon",value:{name:"ReactElement",elements:[{name:"intersection",raw:`GeneratedIconProps & {
    icon: IconEnum;
}`,elements:[{name:"signature",type:"object",raw:`{
    size?: IconSize;
    filled?: boolean;
}`,signature:{properties:[{key:"size",value:{name:"IconSize",required:!1}},{key:"filled",value:{name:"boolean",required:!1}}]}},{name:"signature",type:"object",raw:`{
    icon: IconEnum;
}`,signature:{properties:[{key:"icon",value:{name:"IconEnum",required:!0}}]}}]}],raw:"ReactElement<IconProps>",required:!1}},{key:"status",value:{name:"union",raw:"BadgeStatusIconProps['status']",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"onDismiss",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"emphasis",value:{name:"BadgeEmphasis",required:!1}},{key:"size",value:{name:"union",raw:"'small' | 'medium'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"}],required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}},{key:"withTitleAttribute",value:{name:"boolean",required:!1},description:"@description withTitle could be disabled only in the case another overlay is present, ex Tooltip"}]}}],raw:"BadgeProps[]"},description:"",defaultValue:{value:"[]",computed:!1}},hug:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},fitContent:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isOpen:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onOpenChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(isOpen: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isOpen"}],return:{name:"void"}}},description:""},fixedHeader:{required:!1,tsType:{name:"ReactNode"},description:""},fixedFooter:{required:!1,tsType:{name:"ReactNode"},description:""},contentMinHeight:{required:!1,tsType:{name:"number"},description:""},legacyFooter:{required:!1,tsType:{name:"boolean"},description:`The legacy footer buttons section inside of the flyout will be deleted in the future.
@deprecated Pass the FlyoutFooter component with buttons to the Flyout component.`,defaultValue:{value:"true",computed:!1}},placement:{required:!1,tsType:{name:"FlyoutPlacement"},description:"",defaultValue:{value:"FlyoutPlacement.BottomLeft",computed:!0}},offset:{required:!1,tsType:{name:"number"},description:""},updatePositionOnContentChange:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isTriggerDisabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};export{me as F,j as a,K as b,yt as c,wt as d};