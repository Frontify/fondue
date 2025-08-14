import{j as n}from"./jsx-runtime-BYYWji4R.js";import{a as j,b as W,c as D}from"./useDialog-DNMX-qOU.js";import{a as C}from"./FocusScope-BbG7qqtO.js";import{a as F}from"./useOverlayTriggerState-Do1lhetf.js";import{a as E}from"./chain-zZtnTS2i.js";import{$ as A}from"./useEffectEvent-23OTMzEQ.js";import{$}from"./isScrollable-BSEN4xi5.js";import{p as O}from"./useFocusRing-CqhiwHAH.js";import{r as s}from"./index-ClcD9ViR.js";import{m as g}from"./merge-DI-veSMP.js";import{a as V}from"./ScrollWrapper-jHVrNd8N.js";import{c as _,B as G}from"./Button-BkcxChke.js";import{I as U}from"./IconSize-BcCrF_mi.js";import{F as X,P as Y,b as K,p as Z}from"./FrontifyPattern-WpjcW4FF.js";import{A as J}from"./index-dpLYmkX3.js";import{m as N}from"./motion-DqKuqH19.js";function L(e,t){let a=e;for($(a,t)&&(a=a.parentElement);a&&!$(a,t);)a=a.parentElement;return a||document.scrollingElement||document.documentElement}const k=typeof document<"u"&&window.visualViewport,Q=new Set(["checkbox","radio","range","color","file","image","button","submit","reset"]);let v=0,q;function ee(e={}){let{isDisabled:t}=e;A(()=>{if(!t)return v++,v===1&&(O()?q=ae():q=te()),()=>{v--,v===0&&q()}},[t])}function te(){return E(m(document.documentElement,"paddingRight",`${window.innerWidth-document.documentElement.clientWidth}px`),m(document.documentElement,"overflow","hidden"))}function ae(){let e,t,a=l=>{e=L(l.target,!0),!(e===document.documentElement&&e===document.body)&&e instanceof HTMLElement&&window.getComputedStyle(e).overscrollBehavior==="auto"&&(t=m(e,"overscrollBehavior","contain"))},i=l=>{if(!e||e===document.documentElement||e===document.body){l.preventDefault();return}e.scrollHeight===e.clientHeight&&e.scrollWidth===e.clientWidth&&l.preventDefault()},u=()=>{t&&t()},r=l=>{let d=l.target;ne(d)&&(h(),d.style.transform="translateY(-2000px)",requestAnimationFrame(()=>{d.style.transform="",k&&(k.height<window.innerHeight?requestAnimationFrame(()=>{z(d)}):k.addEventListener("resize",()=>z(d),{once:!0}))}))},o=null,h=()=>{if(o)return;let l=()=>{window.scrollTo(0,0)},d=window.pageXOffset,y=window.pageYOffset;o=E(c(window,"scroll",l),m(document.documentElement,"paddingRight",`${window.innerWidth-document.documentElement.clientWidth}px`),m(document.documentElement,"overflow","hidden"),m(document.body,"marginTop",`-${y}px`),()=>{window.scrollTo(d,y)}),window.scrollTo(0,0)},w=E(c(document,"touchstart",a,{passive:!1,capture:!0}),c(document,"touchmove",i,{passive:!1,capture:!0}),c(document,"touchend",u,{passive:!1,capture:!0}),c(document,"focus",r,!0));return()=>{t==null||t(),o==null||o(),w()}}function m(e,t,a){let i=e.style[t];return e.style[t]=a,()=>{e.style[t]=i}}function c(e,t,a,i){return e.addEventListener(t,a,i),()=>{e.removeEventListener(t,a,i)}}function z(e){let t=document.scrollingElement||document.documentElement,a=e;for(;a&&a!==t;){let i=L(a);if(i!==document.documentElement&&i!==document.body&&i!==a){let u=i.getBoundingClientRect().top,r=a.getBoundingClientRect().top;r>u+a.clientHeight&&(i.scrollTop+=r-u)}a=i.parentElement}}function ne(e){return e instanceof HTMLInputElement&&!Q.has(e.type)||e instanceof HTMLTextAreaElement||e instanceof HTMLElement&&e.isContentEditable}const B={default:{top:"tw-pt-14",horizontal:"tw-px-14",bottom:"tw-pb-14"},compact:{top:"tw-pt-6",horizontal:"tw-px-6",bottom:"tw-pb-6"}},b=s.createContext({compact:!1,padding:B.default}),M=({direction:e,children:t,horizontalPadding:a=!0})=>{const{padding:i}=s.useContext(b);return n.jsx("div",{"data-test-id":"modal-body",className:`tw-flex-auto tw-min-h-0 ${a?i.horizontal:"tw-pr-2"}`,children:n.jsx(V,{direction:e,children:t})})};M.displayName="FondueModalBody";M.__docgenInfo={description:"@deprecated Use `Dialog.Body` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.",methods:[],displayName:"FondueModalBody",props:{direction:{required:!1,tsType:{name:"ScrollWrapperDirection"},description:""},children:{required:!1,tsType:{name:"union",raw:"ReactElement | ReactElement[]",elements:[{name:"ReactElement"},{name:"Array",elements:[{name:"ReactElement"}],raw:"ReactElement[]"}]},description:""},horizontalPadding:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const x=({buttons:e})=>{const{padding:t}=s.useContext(b);return n.jsx("div",{"data-test-id":"modal-footer",className:`${t.bottom} ${t.horizontal}`,children:e&&n.jsx("div",{className:"tw-flex tw-gap-x-3 tw-justify-end",children:e.map((a,i)=>s.createElement(_,{...a,size:G.Medium,key:i}))})})};x.displayName="FondueModalFooter";x.__docgenInfo={description:"@deprecated Use `Dialog.Footer` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.",methods:[],displayName:"FondueModalFooter",props:{buttons:{required:!0,tsType:{name:"union",raw:"[ModalButton] | [ModalButton, ModalButton]",elements:[{name:"tuple",raw:"[ModalButton]",elements:[{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"ButtonType",required:!1}},{key:"title",value:{name:"string",required:!1}},{key:"style",value:{name:"ButtonStyle",required:!1}},{key:"emphasis",value:{name:"ButtonEmphasis",required:!1}},{key:"hideLabel",value:{name:"boolean",required:!1}},{key:"size",value:{name:"ButtonSize",required:!1}},{key:"rounding",value:{name:"ButtonRounding",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"icon",value:{name:"ReactElement",required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"(event?: MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"HTMLButtonElement"}],raw:"MouseEvent<HTMLButtonElement>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"hugWidth",value:{name:"boolean",required:!1}},{key:"aria-label",value:{name:"string",required:!1}},{key:"aria-describedby",value:{name:"string",required:!1}},{key:"formId",value:{name:"string",required:!1}},{key:"solid",value:{name:"boolean",required:!1},description:"@deprecated use emphasis with ButtonEmphasis.Weak"},{key:"inverted",value:{name:"boolean",required:!1},description:'@deprecated inverted can be done by wrapping the component in a className="tw-dark"'},{key:"data-test-id",value:{name:"string",required:!1}}]}},{name:"literal",value:"'size'"}],raw:"Omit<ButtonProps, 'size'>"}]}]},description:""}}};const S=s.createContext({id:void 0});var H=(e=>(e.Default="Default",e.Informative="Informative",e.Negative="Negative",e.Positive="Positive",e.Warning="Warning",e))(H||{});const ie={Default:"tw-text-grey-80",Informative:"tw-text-violet-60",Negative:"tw-text-red-60",Positive:"tw-text-green-60",Warning:"tw-text-yellow-60"};var p=(e=>(e.Default="Default",e.Small="Small",e.Large="Large",e))(p||{});const T=({title:e,leadText:t,decorator:a,variant:i=H.Default})=>{const u=s.useContext(S),{padding:r,compact:o}=s.useContext(b);return n.jsxs("div",{"data-test-id":"modal-header",className:`${r.top} ${r.horizontal}`,children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[a&&n.jsx("span",{"data-test-id":"modal-header-decorator-container",className:g(["tw-mr-2",ie[i]]),children:s.cloneElement(a,{size:U.Size24})}),n.jsx("h3",{...u,className:g(["tw-font-heading tw-font-medium tw-text-text",o?"tw-text-lg":"tw-text-xl"]),children:e})]}),t&&n.jsx("p",{className:"tw-text-text-weak tw-mt-4",children:t})]})};T.displayName="FondueModalHeader";T.__docgenInfo={description:"@deprecated Use `Dialog.Header` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.",methods:[],displayName:"FondueModalHeader",props:{title:{required:!1,tsType:{name:"string"},description:""},leadText:{required:!1,tsType:{name:"ReactNode"},description:""},decorator:{required:!1,tsType:{name:"ReactElement"},description:""},variant:{required:!1,tsType:{name:"ModalHeaderVariant"},description:"",defaultValue:{value:"ModalHeaderVariant.Default",computed:!0}}}};const R=({pattern:e=K.DigitalAssets,foregroundColor:t})=>n.jsx("div",{"data-test-id":"modal-visual",className:g(["tw-h-[1802px] tw-absolute tw-bottom-0",t&&Z[t]]),style:{clipPath:"path('M0 0L252 145.492C256.95 148.35 260 153.632 260 159.349V1641.98C260 1647.7 256.95 1652.98 252 1655.84L0 1801.33V1501.11V0Z')"},children:n.jsx("div",{className:"tw-absolute tw-bottom-0",children:n.jsx(X,{pattern:e,scaleOrigin:["left","bottom"],scale:Y.XXL,foregroundColor:t})})});R.displayName="FondueModalVisual";R.__docgenInfo={description:"@deprecated Use `DialogSide.Content` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.",methods:[],displayName:"FondueModalVisual",props:{pattern:{required:!1,tsType:{name:"PatternDesign"},description:"",defaultValue:{value:"PatternDesign.DigitalAssets",computed:!0}},foregroundColor:{required:!1,tsType:{name:"PatternTheme"},description:""}}};const oe={initial:{opacity:0},show:{opacity:1,transition:{duration:.15}},exit:{opacity:0,transition:{duration:.15}}},re={initial:{y:-200},show:{y:0,transition:{duration:.3}},exit:{y:0}},le={[p.Default]:"tw-max-w-[800px]",[p.Small]:"tw-max-w-[600px]",[p.Large]:"tw-max-w-[1200px]"},P=s.memo(e=>{const{visual:t,children:a,width:i=p.Default,zIndex:u,compact:r=!1}=e,o=s.useRef(null),{overlayProps:h,underlayProps:{onPointerDown:w}}=F(e,o);ee();const{modalProps:l}=W(),{dialogProps:d,titleProps:y}=D(e,o),I=r?B.compact:B.default;return n.jsx(N.div,{variants:oe,initial:"initial",animate:"show",exit:"exit",style:{background:"rgba(0, 0, 0, .5)",zIndex:u},onPointerDown:w,"data-is-underlay":!0,className:"tw-fixed tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-flex tw-justify-center tw-items-center tw-p-4",children:n.jsx(C,{contain:!0,restoreFocus:!0,autoFocus:!0,children:n.jsx(N.div,{variants:re,className:g([le[i],"tw-w-full tw-max-h-full tw-h-contents tw-flex tw-flex-col"]),children:n.jsxs("div",{...h,...d,...l,ref:o,"data-test-id":"modal-container",className:"tw-flex-initial tw-min-h-0 tw-w-full tw-flex tw-bg-white tw-overflow-hidden tw-border tw-border-solid tw-border-line-strong tw-rounded tw-shadow-2xl",children:[(t==null?void 0:t.pattern)&&n.jsx("div",{className:"tw-w-[260px] tw-relative tw-flex-shrink-0 tw-overflow-hidden",children:n.jsx(R,{...t})}),n.jsx("div",{className:"tw-flex tw-flex-col tw-flex-1 tw-space-y-6 tw-overflow-hidden",children:n.jsx(b.Provider,{value:{compact:r,padding:I},children:n.jsx(S.Provider,{value:y,children:a})})})]})})})})});P.displayName="Modal";const f=({isOpen:e,...t})=>n.jsx(j,{children:n.jsx(J,{children:e&&n.jsx(P,{...t,isOpen:!0})})});f.displayName="FondueModal";f.Header=T;f.Body=M;f.Footer=x;f.__docgenInfo={description:"@deprecated Use `Dialog` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.",methods:[{name:"Header",docblock:null,modifiers:["static"],params:[{name:`{
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
}`,signature:{properties:[{key:"pattern",value:{name:"PatternDesign",required:!1}},{key:"foregroundColor",value:{name:"PatternTheme",required:!1}}]}},description:""},width:{required:!1,tsType:{name:"ModalWidth"},description:""},children:{required:!1,tsType:{name:"union",raw:"ReactElement | ReactElement[]",elements:[{name:"ReactElement"},{name:"Array",elements:[{name:"ReactElement"}],raw:"ReactElement[]"}]},description:""},isOpen:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},isDismissable:{required:!1,tsType:{name:"boolean"},description:""},zIndex:{required:!1,tsType:{name:"number"},description:""},compact:{required:!1,tsType:{name:"boolean"},description:""}}};export{f as M,H as a,p as b,B as c};
