import{r as m,j as i}from"./iframe-BIfcB0X2.js";import{b as W,$ as C,a as F}from"./useDialog-S7A2JLF6.js";import{$ as A}from"./FocusScope-D7jXQngg.js";import{a as V}from"./useOverlayTriggerState-BhO5QHIL.js";import{b as P}from"./chain-CHiwi0M-.js";import{$ as O}from"./useEffectEvent-CMLs76Ad.js";import{$ as M,b as k}from"./keyboard-SS7VUtrh.js";import{u as G}from"./useFocusRing-DHqNp4Q2.js";import{m as w}from"./merge-DI-veSMP.js";import{S as _}from"./ScrollWrapper-BPL6dpah.js";import{B as U,e as X}from"./Button-91rj7uoX.js";import{I as K}from"./IconSize-BcCrF_mi.js";import{F as Y,P as Z,b as J,p as Q}from"./FrontifyPattern-3bzC9a1f.js";import{A as ee}from"./index-COFow3Qu.js";import{m as L}from"./proxy-6VjESirL.js";function j(e,t){let a=e;for(M(a,t)&&(a=a.parentElement);a&&!M(a,t);)a=a.parentElement;return a||document.scrollingElement||document.documentElement}const y=typeof document<"u"&&window.visualViewport;let h=0,E;function te(e={}){let{isDisabled:t}=e;O(()=>{if(!t)return h++,h===1&&(G()?E=ne():E=ae()),()=>{h--,h===0&&E()}},[t])}function ae(){let e=window.innerWidth-document.documentElement.clientWidth;return P(e>0&&("scrollbarGutter"in document.documentElement.style?q(document.documentElement,"scrollbarGutter","stable"):q(document.documentElement,"paddingRight",`${e}px`)),q(document.documentElement,"overflow","hidden"))}function ne(){let e,t=!1,a=r=>{let o=r.target;e=M(o)?o:j(o,!0),t=!1;let u=o.ownerDocument.defaultView.getSelection();u&&!u.isCollapsed&&u.containsNode(o,!0)&&(t=!0),"selectionStart"in o&&"selectionEnd"in o&&o.selectionStart<o.selectionEnd&&o.ownerDocument.activeElement===o&&(t=!0)},n=document.createElement("style");n.textContent=`
@layer {
  * {
    overscroll-behavior: contain;
  }
}`.trim(),document.head.prepend(n);let d=r=>{if(!(r.touches.length===2||t)){if(!e||e===document.documentElement||e===document.body){r.preventDefault();return}e.scrollHeight===e.clientHeight&&e.scrollWidth===e.clientWidth&&r.preventDefault()}},l=r=>{let o=r.target,u=r.relatedTarget;if(u&&k(u))u.focus({preventScroll:!0}),S(u,k(o));else if(!u){var f;let c=(f=o.parentElement)===null||f===void 0?void 0:f.closest("[tabindex]");c==null||c.focus({preventScroll:!0})}},s=HTMLElement.prototype.focus;HTMLElement.prototype.focus=function(r){let o=document.activeElement!=null&&k(document.activeElement);s.call(this,{...r,preventScroll:!0}),(!r||!r.preventScroll)&&S(this,o)};let p=P(B(document,"touchstart",a,{passive:!1,capture:!0}),B(document,"touchmove",d,{passive:!1,capture:!0}),B(document,"blur",l,!0));return()=>{p(),n.remove(),HTMLElement.prototype.focus=s}}function q(e,t,a){let n=e.style[t];return e.style[t]=a,()=>{e.style[t]=n}}function B(e,t,a,n){return e.addEventListener(t,a,n),()=>{e.removeEventListener(t,a,n)}}function S(e,t){t||!y?H(e):y.addEventListener("resize",()=>H(e),{once:!0})}function H(e){let t=document.scrollingElement||document.documentElement,a=e;for(;a&&a!==t;){let n=j(a);if(n!==document.documentElement&&n!==document.body&&n!==a){let d=n.getBoundingClientRect(),l=a.getBoundingClientRect();if(l.top<d.top||l.bottom>d.top+a.clientHeight){let s=d.bottom;y&&(s=Math.min(s,y.offsetTop+y.height));let p=l.top-d.top-((s-d.top)/2-l.height/2);n.scrollTo({top:Math.max(0,Math.min(n.scrollHeight-n.clientHeight,n.scrollTop+p)),behavior:"smooth"})}}a=n.parentElement}}const x={default:{top:"tw-pt-14",horizontal:"tw-px-14",bottom:"tw-pb-14"},compact:{top:"tw-pt-6",horizontal:"tw-px-6",bottom:"tw-pb-6"}},b=m.createContext({compact:!1,padding:x.default});b.displayName="ModalLayoutContext";const T=({direction:e,children:t,horizontalPadding:a=!0})=>{const{padding:n}=m.useContext(b);return i.jsx("div",{"data-test-id":"modal-body",className:`tw-flex-auto tw-min-h-0 ${a?n.horizontal:"tw-pr-2"}`,children:i.jsx(_,{direction:e,children:t})})};T.displayName="FondueModalBody";T.__docgenInfo={description:"@deprecated Use `Dialog.Body` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.",methods:[],displayName:"FondueModalBody",props:{direction:{required:!1,tsType:{name:"ScrollWrapperDirection"},description:""},children:{required:!1,tsType:{name:"union",raw:"ReactElement | ReactElement[]",elements:[{name:"ReactElement"},{name:"Array",elements:[{name:"ReactElement"}],raw:"ReactElement[]"}]},description:""},horizontalPadding:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const R=({buttons:e})=>{const{padding:t}=m.useContext(b);return i.jsx("div",{"data-test-id":"modal-footer",className:`${t.bottom} ${t.horizontal}`,children:e&&i.jsx("div",{className:"tw-flex tw-gap-x-3 tw-justify-end",children:e.map((a,n)=>m.createElement(U,{...a,size:X.Medium,key:n}))})})};R.displayName="FondueModalFooter";R.__docgenInfo={description:"@deprecated Use `Dialog.Footer` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.",methods:[],displayName:"FondueModalFooter",props:{buttons:{required:!0,tsType:{name:"union",raw:"[ModalButton] | [ModalButton, ModalButton]",elements:[{name:"tuple",raw:"[ModalButton]",elements:[{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"ButtonType",required:!1}},{key:"title",value:{name:"string",required:!1}},{key:"style",value:{name:"ButtonStyle",required:!1}},{key:"emphasis",value:{name:"ButtonEmphasis",required:!1}},{key:"hideLabel",value:{name:"boolean",required:!1}},{key:"size",value:{name:"ButtonSize",required:!1}},{key:"rounding",value:{name:"ButtonRounding",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ReactElement",required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"(event?: MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"HTMLButtonElement"}],raw:"MouseEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"hugWidth",value:{name:"boolean",required:!1}},{key:"aria-label",value:{name:"string",required:!1}},{key:"aria-describedby",value:{name:"string",required:!1}},{key:"formId",value:{name:"string",required:!1}},{key:"solid",value:{name:"boolean",required:!1},description:"@deprecated use emphasis with ButtonEmphasis.Weak"},{key:"inverted",value:{name:"boolean",required:!1},description:'@deprecated inverted can be done by wrapping the component in a className="tw-dark"'},{key:"data-test-id",value:{name:"string",required:!1}}]}},{name:"literal",value:"'size'"}],raw:"Omit<ButtonProps, 'size'>"}]},{name:"tuple",raw:"[ModalButton, ModalButton]",elements:[{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"ButtonType",required:!1}},{key:"title",value:{name:"string",required:!1}},{key:"style",value:{name:"ButtonStyle",required:!1}},{key:"emphasis",value:{name:"ButtonEmphasis",required:!1}},{key:"hideLabel",value:{name:"boolean",required:!1}},{key:"size",value:{name:"ButtonSize",required:!1}},{key:"rounding",value:{name:"ButtonRounding",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ReactElement",required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"(event?: MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"HTMLButtonElement"}],raw:"MouseEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"hugWidth",value:{name:"boolean",required:!1}},{key:"aria-label",value:{name:"string",required:!1}},{key:"aria-describedby",value:{name:"string",required:!1}},{key:"formId",value:{name:"string",required:!1}},{key:"solid",value:{name:"boolean",required:!1},description:"@deprecated use emphasis with ButtonEmphasis.Weak"},{key:"inverted",value:{name:"boolean",required:!1},description:'@deprecated inverted can be done by wrapping the component in a className="tw-dark"'},{key:"data-test-id",value:{name:"string",required:!1}}]}},{name:"literal",value:"'size'"}],raw:"Omit<ButtonProps, 'size'>"},{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"ButtonType",required:!1}},{key:"title",value:{name:"string",required:!1}},{key:"style",value:{name:"ButtonStyle",required:!1}},{key:"emphasis",value:{name:"ButtonEmphasis",required:!1}},{key:"hideLabel",value:{name:"boolean",required:!1}},{key:"size",value:{name:"ButtonSize",required:!1}},{key:"rounding",value:{name:"ButtonRounding",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ReactElement",required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"(event?: MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"HTMLButtonElement"}],raw:"MouseEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"hugWidth",value:{name:"boolean",required:!1}},{key:"aria-label",value:{name:"string",required:!1}},{key:"aria-describedby",value:{name:"string",required:!1}},{key:"formId",value:{name:"string",required:!1}},{key:"solid",value:{name:"boolean",required:!1},description:"@deprecated use emphasis with ButtonEmphasis.Weak"},{key:"inverted",value:{name:"boolean",required:!1},description:'@deprecated inverted can be done by wrapping the component in a className="tw-dark"'},{key:"data-test-id",value:{name:"string",required:!1}}]}},{name:"literal",value:"'size'"}],raw:"Omit<ButtonProps, 'size'>"}]}]},description:""}}};const $=m.createContext({id:void 0});$.displayName="ModalTitleContext";var I=(e=>(e.Default="Default",e.Informative="Informative",e.Negative="Negative",e.Positive="Positive",e.Warning="Warning",e))(I||{});const ie={Default:"tw-text-grey-80",Informative:"tw-text-violet-60",Negative:"tw-text-red-60",Positive:"tw-text-green-60",Warning:"tw-text-yellow-60"};var v=(e=>(e.Default="Default",e.Small="Small",e.Large="Large",e))(v||{});const N=({title:e,leadText:t,decorator:a,variant:n=I.Default})=>{const d=m.useContext($),{padding:l,compact:s}=m.useContext(b);return i.jsxs("div",{"data-test-id":"modal-header",className:`${l.top} ${l.horizontal}`,children:[i.jsxs("div",{className:"tw-flex tw-items-center",children:[a&&i.jsx("span",{"data-test-id":"modal-header-decorator-container",className:w(["tw-mr-2",ie[n]]),children:m.cloneElement(a,{size:K.Size24})}),i.jsx("h3",{...d,className:w(["tw-font-heading tw-font-medium tw-text-text",s?"tw-text-lg":"tw-text-xl"]),children:e})]}),t?i.jsx("p",{className:"tw-text-text-weak tw-mt-4",children:t}):null]})};N.displayName="FondueModalHeader";N.__docgenInfo={description:"@deprecated Use `Dialog.Header` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.",methods:[],displayName:"FondueModalHeader",props:{title:{required:!1,tsType:{name:"string"},description:""},leadText:{required:!1,tsType:{name:"ReactNode"},description:""},decorator:{required:!1,tsType:{name:"ReactElement"},description:""},variant:{required:!1,tsType:{name:"ModalHeaderVariant"},description:"",defaultValue:{value:"ModalHeaderVariant.Default",computed:!0}}}};const z=({pattern:e=J.DigitalAssets,foregroundColor:t})=>i.jsx("div",{"data-test-id":"modal-visual",className:w(["tw-h-[1802px] tw-absolute tw-bottom-0",t&&Q[t]]),style:{clipPath:"path('M0 0L252 145.492C256.95 148.35 260 153.632 260 159.349V1641.98C260 1647.7 256.95 1652.98 252 1655.84L0 1801.33V1501.11V0Z')"},children:i.jsx("div",{className:"tw-absolute tw-bottom-0",children:i.jsx(Y,{pattern:e,scaleOrigin:["left","bottom"],scale:Z.XXL,foregroundColor:t})})});z.displayName="FondueModalVisual";z.__docgenInfo={description:"@deprecated Use `DialogSide.Content` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.",methods:[],displayName:"FondueModalVisual",props:{pattern:{required:!1,tsType:{name:"PatternDesign"},description:"",defaultValue:{value:"PatternDesign.DigitalAssets",computed:!0}},foregroundColor:{required:!1,tsType:{name:"PatternTheme"},description:""}}};const oe={initial:{opacity:0},show:{opacity:1,transition:{duration:.15}},exit:{opacity:0,transition:{duration:.15}}},re={initial:{y:-200},show:{y:0,transition:{duration:.3}},exit:{y:0}},le={[v.Default]:"tw-max-w-[800px]",[v.Small]:"tw-max-w-[600px]",[v.Large]:"tw-max-w-[1200px]"},D=m.memo(e=>{const{visual:t,children:a,width:n=v.Default,zIndex:d,compact:l=!1}=e,s=m.useRef(null),{overlayProps:p,underlayProps:{onPointerDown:r}}=V(e,s);te();const{modalProps:o}=C(),{dialogProps:u,titleProps:f}=F(e,s),c=l?x.compact:x.default;return i.jsx(L.div,{variants:oe,initial:"initial",animate:"show",exit:"exit",style:{background:"rgba(0, 0, 0, .5)",zIndex:d},onPointerDown:r,"data-is-underlay":!0,className:"tw-fixed tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-flex tw-justify-center tw-items-center tw-p-4",children:i.jsx(A,{contain:!0,restoreFocus:!0,autoFocus:!0,children:i.jsx(L.div,{variants:re,className:w([le[n],"tw-w-full tw-max-h-full tw-h-contents tw-flex tw-flex-col"]),children:i.jsxs("div",{...p,...u,...o,ref:s,"data-test-id":"modal-container",className:"tw-flex-initial tw-min-h-0 tw-w-full tw-flex tw-bg-white tw-overflow-hidden tw-border tw-border-solid tw-border-line-strong tw-rounded tw-shadow-2xl",children:[t!=null&&t.pattern?i.jsx("div",{className:"tw-w-[260px] tw-relative tw-flex-shrink-0 tw-overflow-hidden",children:i.jsx(z,{...t})}):null,i.jsx("div",{className:"tw-flex tw-flex-col tw-flex-1 tw-space-y-6 tw-overflow-hidden",children:i.jsx(b.Provider,{value:m.useMemo(()=>({compact:l,padding:c}),[l,c]),children:i.jsx($.Provider,{value:f,children:a})})})]})})})})});D.displayName="Modal";const g=({isOpen:e,...t})=>i.jsx(W,{children:i.jsx(ee,{children:e&&i.jsx(D,{...t,isOpen:!0})})});g.displayName="FondueModal";g.Header=N;g.Body=T;g.Footer=R;g.__docgenInfo={description:"@deprecated Use `Dialog` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.",methods:[{name:"Header",docblock:null,modifiers:["static"],params:[{name:`{
    title,
    leadText,
    decorator,
    variant = ModalHeaderVariant.Default,
}: ModalHeaderProps`,optional:!1,type:{name:"signature",type:"object",raw:`{
    title?: string;
    leadText?: ReactNode;
    decorator?: ReactElement;
    variant?: ModalHeaderVariant;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!1}},{key:"leadText",value:{name:"ReactNode",required:!1}},{key:"decorator",value:{name:"ReactElement",required:!1}},{key:"variant",value:{name:"ModalHeaderVariant",required:!1}}]},alias:"ModalHeaderProps"}}],returns:{type:{name:"ReactElement"}}},{name:"Body",docblock:null,modifiers:["static"],params:[{name:"{ direction, children, horizontalPadding = true }: ModalBodyProps",optional:!1,type:{name:"signature",type:"object",raw:`{
    direction?: ScrollWrapperDirection;
    children?: ModalBodyChildren;
    horizontalPadding?: boolean;
}`,signature:{properties:[{key:"direction",value:{name:"ScrollWrapperDirection",required:!1}},{key:"children",value:{name:"union",raw:"ReactElement | ReactElement[]",elements:[{name:"ReactElement"},{name:"Array",elements:[{name:"ReactElement"}],raw:"ReactElement[]"}],required:!1}},{key:"horizontalPadding",value:{name:"boolean",required:!1}}]},alias:"ModalBodyProps"}}],returns:{type:{name:"ReactElement"}}},{name:"Footer",docblock:null,modifiers:["static"],params:[{name:"{ buttons }: ModalFooterProps",optional:!1,type:{name:"signature",type:"object",raw:`{
    buttons: [ModalButton] | [ModalButton, ModalButton];
}`,signature:{properties:[{key:"buttons",value:{name:"union",raw:"[ModalButton] | [ModalButton, ModalButton]",elements:[{name:"tuple",raw:"[ModalButton]",elements:[{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"ButtonType",required:!1}},{key:"title",value:{name:"string",required:!1}},{key:"style",value:{name:"ButtonStyle",required:!1}},{key:"emphasis",value:{name:"ButtonEmphasis",required:!1}},{key:"hideLabel",value:{name:"boolean",required:!1}},{key:"size",value:{name:"ButtonSize",required:!1}},{key:"rounding",value:{name:"ButtonRounding",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ReactElement",required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"(event?: MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"HTMLButtonElement"}],raw:"MouseEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"hugWidth",value:{name:"boolean",required:!1}},{key:"aria-label",value:{name:"string",required:!1}},{key:"aria-describedby",value:{name:"string",required:!1}},{key:"formId",value:{name:"string",required:!1}},{key:"solid",value:{name:"boolean",required:!1},description:"@deprecated use emphasis with ButtonEmphasis.Weak"},{key:"inverted",value:{name:"boolean",required:!1},description:'@deprecated inverted can be done by wrapping the component in a className="tw-dark"'},{key:"data-test-id",value:{name:"string",required:!1}}]}},{name:"literal",value:"'size'"}],raw:"Omit<ButtonProps, 'size'>"}]},{name:"tuple",raw:"[ModalButton, ModalButton]",elements:[{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"ButtonType",required:!1}},{key:"title",value:{name:"string",required:!1}},{key:"style",value:{name:"ButtonStyle",required:!1}},{key:"emphasis",value:{name:"ButtonEmphasis",required:!1}},{key:"hideLabel",value:{name:"boolean",required:!1}},{key:"size",value:{name:"ButtonSize",required:!1}},{key:"rounding",value:{name:"ButtonRounding",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ReactElement",required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"(event?: MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"HTMLButtonElement"}],raw:"MouseEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"hugWidth",value:{name:"boolean",required:!1}},{key:"aria-label",value:{name:"string",required:!1}},{key:"aria-describedby",value:{name:"string",required:!1}},{key:"formId",value:{name:"string",required:!1}},{key:"solid",value:{name:"boolean",required:!1},description:"@deprecated use emphasis with ButtonEmphasis.Weak"},{key:"inverted",value:{name:"boolean",required:!1},description:'@deprecated inverted can be done by wrapping the component in a className="tw-dark"'},{key:"data-test-id",value:{name:"string",required:!1}}]}},{name:"literal",value:"'size'"}],raw:"Omit<ButtonProps, 'size'>"},{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"ButtonType",required:!1}},{key:"title",value:{name:"string",required:!1}},{key:"style",value:{name:"ButtonStyle",required:!1}},{key:"emphasis",value:{name:"ButtonEmphasis",required:!1}},{key:"hideLabel",value:{name:"boolean",required:!1}},{key:"size",value:{name:"ButtonSize",required:!1}},{key:"rounding",value:{name:"ButtonRounding",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ReactElement",required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"(event?: MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"HTMLButtonElement"}],raw:"MouseEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"hugWidth",value:{name:"boolean",required:!1}},{key:"aria-label",value:{name:"string",required:!1}},{key:"aria-describedby",value:{name:"string",required:!1}},{key:"formId",value:{name:"string",required:!1}},{key:"solid",value:{name:"boolean",required:!1},description:"@deprecated use emphasis with ButtonEmphasis.Weak"},{key:"inverted",value:{name:"boolean",required:!1},description:'@deprecated inverted can be done by wrapping the component in a className="tw-dark"'},{key:"data-test-id",value:{name:"string",required:!1}}]}},{name:"literal",value:"'size'"}],raw:"Omit<ButtonProps, 'size'>"}]}],required:!0}}]},alias:"ModalFooterProps"}}],returns:{type:{name:"ReactElement"}}}],displayName:"FondueModal",props:{visual:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    pattern?: PatternDesign;
    foregroundColor?: PatternTheme;
}`,signature:{properties:[{key:"pattern",value:{name:"PatternDesign",required:!1}},{key:"foregroundColor",value:{name:"PatternTheme",required:!1}}]}},description:""},width:{required:!1,tsType:{name:"ModalWidth"},description:""},children:{required:!1,tsType:{name:"union",raw:"ReactElement | ReactElement[]",elements:[{name:"ReactElement"},{name:"Array",elements:[{name:"ReactElement"}],raw:"ReactElement[]"}]},description:""},isOpen:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},isDismissable:{required:!1,tsType:{name:"boolean"},description:""},zIndex:{required:!1,tsType:{name:"number"},description:""},compact:{required:!1,tsType:{name:"boolean"},description:""}}};export{g as M,I as a,v as b,x as c};
