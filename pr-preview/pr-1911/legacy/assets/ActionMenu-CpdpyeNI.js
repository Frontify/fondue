import{j as v}from"./jsx-runtime-Nms4Y4qS.js";import{c as U,b as F,d as se,$ as ie,h as le,e as ue}from"./useFocusable-CAGu0lKI.js";import{$ as de,c as ce,a as me,d as ve,g as pe,e as Te,m as Me,f as ye}from"./helper-BO104GaE.js";import{$ as fe,a as Ee,b as ge}from"./SelectionManager-BuW52QpN.js";import{r as p}from"./index-BwDkhjyp.js";import{$ as be}from"./useControlledState-C0C-dzuH.js";import{m as W}from"./merge-DI-veSMP.js";import{e as he,f as ke,$ as we}from"./useFocusRing-4Vnvtzpc.js";import{b as P,$ as Le}from"./chain-D5h1pgIF.js";import{b as He}from"./MenuItem-C9PA6k_H.js";import{S as xe}from"./Switch-28jLeicn.js";import{d as Ae}from"./focusStyle-CBFElZiz.js";const Y=new WeakMap;function qe(e,n,t){let{shouldFocusWrap:a=!0,onKeyDown:o,onKeyUp:u,...r}=e;!e["aria-label"]&&!e["aria-labelledby"]&&console.warn("An aria-label or aria-labelledby prop is required for accessibility.");let s=U(e,{labelable:!0}),{listProps:l}=de({...r,ref:t,selectionManager:n.selectionManager,collection:n.collection,disabledKeys:n.disabledKeys,shouldFocusWrap:a,linkBehavior:"override"});return Y.set(n,{onClose:e.onClose,onAction:e.onAction}),{menuProps:F(s,{onKeyDown:o,onKeyUp:u},{role:"menu",...l,onKeyDown:d=>{d.key!=="Escape"&&l.onKeyDown(d)}})}}function $e(e,n,t){let{key:a,closeOnSelect:o,isVirtualized:u,"aria-haspopup":r,onPressStart:s,onPressUp:l,onPress:d,onPressChange:y,onPressEnd:g,onHoverStart:T,onHoverChange:b,onHoverEnd:h,onKeyDown:m,onKeyUp:k,onFocus:H,onFocusChange:x,onBlur:A}=e,M=!!r;var q;let f=(q=e.isDisabled)!==null&&q!==void 0?q:n.selectionManager.isDisabled(a);var $;let N=($=e.isSelected)!==null&&$!==void 0?$:n.selectionManager.isSelected(a),B=Y.get(n),c=n.collection.getItem(a),E=e.onClose||B.onClose,J=se(),j=i=>{var I;M||(!(c==null||(I=c.props)===null||I===void 0)&&I.onAction&&c.props.onAction(),e.onAction?e.onAction(a):B.onAction&&B.onAction(a),i.target instanceof HTMLAnchorElement&&J.open(i.target,i,c.props.href,c.props.routerOptions))},S="menuitem";M||(n.selectionManager.selectionMode==="single"?S="menuitemradio":n.selectionManager.selectionMode==="multiple"&&(S="menuitemcheckbox"));let z=P(),V=P(),D=P(),w={"aria-disabled":f||void 0,role:S,"aria-label":e["aria-label"],"aria-labelledby":z,"aria-describedby":[V,D].filter(Boolean).join(" ")||void 0,"aria-controls":e["aria-controls"],"aria-haspopup":r,"aria-expanded":e["aria-expanded"]};n.selectionManager.selectionMode!=="none"&&!M&&(w["aria-checked"]=N),u&&(w["aria-posinset"]=c==null?void 0:c.index,w["aria-setsize"]=ce(n.collection));let Q=i=>{i.pointerType==="keyboard"&&j(i),s==null||s(i)},X=i=>{i.pointerType!=="keyboard"&&(j(i),!M&&E&&(o??(n.selectionManager.selectionMode!=="multiple"||n.selectionManager.isLink(a)))&&E()),l==null||l(i)},{itemProps:L,isFocused:Z}=me({selectionManager:n.selectionManager,key:a,ref:t,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,linkBehavior:"none"}),{pressProps:ee,isPressed:ne}=ie({onPressStart:Q,onPress:d,onPressUp:X,onPressChange:y,onPressEnd:g,isDisabled:f}),{hoverProps:te}=ve({isDisabled:f,onHoverStart(i){he()||(n.selectionManager.setFocused(!0),n.selectionManager.setFocusedKey(a)),T==null||T(i)},onHoverChange:b,onHoverEnd:h}),{keyboardProps:oe}=le({onKeyDown:i=>{if(i.repeat){i.continuePropagation();return}switch(i.key){case" ":!f&&n.selectionManager.selectionMode==="none"&&!M&&o!==!1&&E&&E();break;case"Enter":!f&&o!==!1&&!M&&E&&E();break;default:M||i.continuePropagation(),m==null||m(i);break}},onKeyUp:k}),{focusProps:ae}=ke({onBlur:A,onFocus:H,onFocusChange:x}),_=U(c.props);delete _.id;let re=ue(c.props);return{menuItemProps:{...w,...F(_,re,M?{onFocus:L.onFocus,"data-key":L["data-key"]}:L,ee,te,oe,ae),tabIndex:L.tabIndex!=null?-1:void 0},labelProps:{id:z},descriptionProps:{id:V},keyboardShortcutProps:{id:D},isFocused:Z,isSelected:N,isPressed:ne,isDisabled:f}}function Be(e){let{heading:n,"aria-label":t}=e,a=Le();return{itemProps:{role:"presentation"},headingProps:n?{id:a,role:"presentation"}:{},groupProps:{role:"group","aria-label":t,"aria-labelledby":n?a:void 0}}}class Se{*[Symbol.iterator](){yield*this.iterable}get size(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(n){let t=this.keyMap.get(n);return t?t.prevKey:null}getKeyAfter(n){let t=this.keyMap.get(n);return t?t.nextKey:null}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(n){return this.keyMap.get(n)}at(n){const t=[...this.getKeys()];return this.getItem(t[n])}constructor(n,{expandedKeys:t}={}){this.keyMap=new Map,this.iterable=n,t=t||new Set;let a=r=>{if(this.keyMap.set(r.key,r),r.childNodes&&(r.type==="section"||t.has(r.key)))for(let s of r.childNodes)a(s)};for(let r of n)a(r);let o,u=0;for(let[r,s]of this.keyMap)o?(o.nextKey=r,s.prevKey=o.key):(this.firstKey=r,s.prevKey=void 0),s.type==="item"&&(s.index=u++),o=s,o.nextKey=void 0;this.lastKey=o==null?void 0:o.key}}function Ie(e){let{onExpandedChange:n}=e,[t,a]=be(e.expandedKeys?new Set(e.expandedKeys):void 0,e.defaultExpandedKeys?new Set(e.defaultExpandedKeys):new Set,n),o=fe(e),u=p.useMemo(()=>e.disabledKeys?new Set(e.disabledKeys):new Set,[e.disabledKeys]),r=Ee(e,p.useCallback(l=>new Se(l,{expandedKeys:t}),[t]),null);return p.useEffect(()=>{o.focusedKey!=null&&!r.getItem(o.focusedKey)&&o.setFocusedKey(null)},[r,o.focusedKey]),{collection:r,expandedKeys:t,disabledKeys:u,toggleKey:l=>{a(Pe(t,l))},setExpandedKeys:a,selectionManager:new ge(r,o)}}function Pe(e,n){let t=new Set(e);return t.has(n)?t.delete(n):t.add(n),t}const K=p.forwardRef(({ariaProps:e,children:n,scrollable:t=!1,border:a=!0},o)=>v.jsx("ul",{...e,ref:o,className:W(["tw-list-none tw-p-0 tw-m-0 tw-bg-base tw-z-20 focus-visible:tw-outline-none",a&&"tw-border tw-border-line tw-rounded",t&&"tw-overflow-y-auto"]),children:n}));K.displayName="FondueAriaList";K.__docgenInfo={description:"",methods:[],displayName:"FondueAriaList",props:{scrollable:{defaultValue:{value:"false",computed:!1},required:!1},border:{defaultValue:{value:"true",computed:!1},required:!1}}};const Ce=e=>typeof e.onClick<"u"&&typeof e.type>"u",C=e=>typeof e.onClick<"u"&&e.type==="switch",Fe=(e,n)=>{const[t,a]=p.useState(n??!1),[o,u]=p.useState({switchComponent:void 0,switchValue:null,toggleSwitch:null});return p.useEffect(()=>{if(e){const r=()=>a(!t);u({switchComponent:v.jsx(xe,{size:"small",mode:t?"on":"off"}),switchValue:t,toggleSwitch:r})}},[e,t]),o},O=({menuItem:e,node:n,state:t,isSelected:a,onClick:o})=>{const u=p.useRef(null),r=C(e)?e.initialValue:!1,{switchComponent:s=void 0,switchValue:l=null,toggleSwitch:d=null}=Fe(C(e),r),{menuItemProps:y}=$e({...n,onAction:()=>{Ce(e)&&e.onClick(),C(e)&&(d==null||d(),e.onClick(!l))},isDisabled:(e==null?void 0:e.disabled)||!1,"aria-label":typeof(e==null?void 0:e.title)=="string"?e==null?void 0:e.title:"Menu item"},t,u),{title:g,decorator:T,subtitle:b,size:h,style:m,disabled:k,selectionIndicator:H}=e,{isFocusVisible:x,focusProps:A}=we();return v.jsx("li",{...F(y,A,{onClick:()=>o==null?void 0:o()}),"data-test-id":"menu-item",className:W(["tw-relative hover:tw-bg-box-neutral-hover tw-list-none tw-outline-none",k&&"tw-pointer-events-none tw-top-px",x&&Ae]),ref:u,children:v.jsx(He,{title:g,decorator:T,subtitle:b,size:h,style:m,disabled:k,active:a,selectionIndicator:H,switchComponent:s})})};O.displayName="FondueAriaMenuItem";O.__docgenInfo={description:"",methods:[],displayName:"FondueAriaMenuItem",props:{menuItem:{required:!0,tsType:{name:"union",raw:"MenuItemType | ActionMenuItemType | ActionMenuSwitchItemType",elements:[{name:"intersection",raw:"Omit<MenuItemProps, 'switchComponent'> & { id: string | number; link?: string }",elements:[{name:"Omit",elements:[{name:"intersection",raw:`{
    style?: MenuItemStyle;
    disabled?: boolean;
    active?: boolean;
    checked?: boolean;
    selectionIndicator?: SelectionIndicatorIcon;
    /** @deprecated this prop is not being used anymore */
    type?: string;
    link?: string;
    onBlur?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onClick?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onFocus?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onMouseEnter?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOut?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOver?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseLeave?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    children?: ReactNode;
    'data-test-id'?: string;
} & Omit<MenuItemContentProps, 'iconSize'>`,elements:[{name:"signature",type:"object",raw:`{
    style?: MenuItemStyle;
    disabled?: boolean;
    active?: boolean;
    checked?: boolean;
    selectionIndicator?: SelectionIndicatorIcon;
    /** @deprecated this prop is not being used anymore */
    type?: string;
    link?: string;
    onBlur?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onClick?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onFocus?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onMouseEnter?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOut?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOver?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseLeave?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    children?: ReactNode;
    'data-test-id'?: string;
}`,signature:{properties:[{key:"style",value:{name:"MenuItemStyle",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"active",value:{name:"boolean",required:!1}},{key:"checked",value:{name:"boolean",required:!1}},{key:"selectionIndicator",value:{name:"SelectionIndicatorIcon",required:!1}},{key:"type",value:{name:"string",required:!1},description:"@deprecated this prop is not being used anymore"},{key:"link",value:{name:"string",required:!1}},{key:"onBlur",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void",signature:{arguments:[{type:{name:"FocusEvent",elements:[{name:"T"}],raw:"FocusEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onFocus",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void",signature:{arguments:[{type:{name:"FocusEvent",elements:[{name:"T"}],raw:"FocusEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onMouseEnter",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onMouseOut",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onMouseOver",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onMouseLeave",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}}]}},{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
    title?: ReactNode;
    decorator?: ReactElement;
    switchComponent?: ReactElement;
    subtitle?: string;
    size?: MenuItemContentSize;
    ariaProps?: HTMLAttributes<HTMLElement>;
    children?: ReactNode;
}`,signature:{properties:[{key:"title",value:{name:"ReactNode",required:!1}},{key:"decorator",value:{name:"ReactElement",required:!1}},{key:"switchComponent",value:{name:"ReactElement",required:!1}},{key:"subtitle",value:{name:"string",required:!1}},{key:"size",value:{name:"MenuItemContentSize",required:!1}},{key:"ariaProps",value:{name:"HTMLAttributes",elements:[{name:"HTMLElement"}],raw:"HTMLAttributes<HTMLElement>",required:!1}},{key:"children",value:{name:"ReactNode",required:!1}}]}},{name:"literal",value:"'iconSize'"}],raw:"Omit<MenuItemContentProps, 'iconSize'>"}]},{name:"literal",value:"'switchComponent'"}],raw:"Omit<MenuItemProps, 'switchComponent'>"},{name:"signature",type:"object",raw:"{ id: string | number; link?: string }",signature:{properties:[{key:"id",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!0}},{key:"link",value:{name:"string",required:!1}}]}}]},{name:"intersection",raw:"MenuItemType & { onClick: () => void }",elements:[{name:"intersection",raw:"Omit<MenuItemProps, 'switchComponent'> & { id: string | number; link?: string }",elements:[{name:"Omit",elements:[{name:"intersection",raw:`{
    style?: MenuItemStyle;
    disabled?: boolean;
    active?: boolean;
    checked?: boolean;
    selectionIndicator?: SelectionIndicatorIcon;
    /** @deprecated this prop is not being used anymore */
    type?: string;
    link?: string;
    onBlur?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onClick?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onFocus?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onMouseEnter?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOut?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOver?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseLeave?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    children?: ReactNode;
    'data-test-id'?: string;
} & Omit<MenuItemContentProps, 'iconSize'>`,elements:[{name:"signature",type:"object",raw:`{
    style?: MenuItemStyle;
    disabled?: boolean;
    active?: boolean;
    checked?: boolean;
    selectionIndicator?: SelectionIndicatorIcon;
    /** @deprecated this prop is not being used anymore */
    type?: string;
    link?: string;
    onBlur?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onClick?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onFocus?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onMouseEnter?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOut?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOver?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseLeave?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    children?: ReactNode;
    'data-test-id'?: string;
}`,signature:{properties:[{key:"style",value:{name:"MenuItemStyle",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"active",value:{name:"boolean",required:!1}},{key:"checked",value:{name:"boolean",required:!1}},{key:"selectionIndicator",value:{name:"SelectionIndicatorIcon",required:!1}},{key:"type",value:{name:"string",required:!1},description:"@deprecated this prop is not being used anymore"},{key:"link",value:{name:"string",required:!1}},{key:"onBlur",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void",signature:{arguments:[{type:{name:"FocusEvent",elements:[{name:"T"}],raw:"FocusEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onFocus",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void",signature:{arguments:[{type:{name:"FocusEvent",elements:[{name:"T"}],raw:"FocusEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onMouseEnter",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onMouseOut",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onMouseOver",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onMouseLeave",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}}]}},{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
    title?: ReactNode;
    decorator?: ReactElement;
    switchComponent?: ReactElement;
    subtitle?: string;
    size?: MenuItemContentSize;
    ariaProps?: HTMLAttributes<HTMLElement>;
    children?: ReactNode;
}`,signature:{properties:[{key:"title",value:{name:"ReactNode",required:!1}},{key:"decorator",value:{name:"ReactElement",required:!1}},{key:"switchComponent",value:{name:"ReactElement",required:!1}},{key:"subtitle",value:{name:"string",required:!1}},{key:"size",value:{name:"MenuItemContentSize",required:!1}},{key:"ariaProps",value:{name:"HTMLAttributes",elements:[{name:"HTMLElement"}],raw:"HTMLAttributes<HTMLElement>",required:!1}},{key:"children",value:{name:"ReactNode",required:!1}}]}},{name:"literal",value:"'iconSize'"}],raw:"Omit<MenuItemContentProps, 'iconSize'>"}]},{name:"literal",value:"'switchComponent'"}],raw:"Omit<MenuItemProps, 'switchComponent'>"},{name:"signature",type:"object",raw:"{ id: string | number; link?: string }",signature:{properties:[{key:"id",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!0}},{key:"link",value:{name:"string",required:!1}}]}}]},{name:"signature",type:"object",raw:"{ onClick: () => void }",signature:{properties:[{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]},{name:"intersection",raw:`MenuItemType & {
    onClick: (switchValue: boolean) => void;
    type: 'switch';
    initialValue: boolean;
}`,elements:[{name:"intersection",raw:"Omit<MenuItemProps, 'switchComponent'> & { id: string | number; link?: string }",elements:[{name:"Omit",elements:[{name:"intersection",raw:`{
    style?: MenuItemStyle;
    disabled?: boolean;
    active?: boolean;
    checked?: boolean;
    selectionIndicator?: SelectionIndicatorIcon;
    /** @deprecated this prop is not being used anymore */
    type?: string;
    link?: string;
    onBlur?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onClick?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onFocus?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onMouseEnter?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOut?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOver?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseLeave?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    children?: ReactNode;
    'data-test-id'?: string;
} & Omit<MenuItemContentProps, 'iconSize'>`,elements:[{name:"signature",type:"object",raw:`{
    style?: MenuItemStyle;
    disabled?: boolean;
    active?: boolean;
    checked?: boolean;
    selectionIndicator?: SelectionIndicatorIcon;
    /** @deprecated this prop is not being used anymore */
    type?: string;
    link?: string;
    onBlur?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onClick?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onFocus?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onMouseEnter?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOut?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOver?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseLeave?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    children?: ReactNode;
    'data-test-id'?: string;
}`,signature:{properties:[{key:"style",value:{name:"MenuItemStyle",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"active",value:{name:"boolean",required:!1}},{key:"checked",value:{name:"boolean",required:!1}},{key:"selectionIndicator",value:{name:"SelectionIndicatorIcon",required:!1}},{key:"type",value:{name:"string",required:!1},description:"@deprecated this prop is not being used anymore"},{key:"link",value:{name:"string",required:!1}},{key:"onBlur",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void",signature:{arguments:[{type:{name:"FocusEvent",elements:[{name:"T"}],raw:"FocusEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onFocus",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void",signature:{arguments:[{type:{name:"FocusEvent",elements:[{name:"T"}],raw:"FocusEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onMouseEnter",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onMouseOut",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onMouseOver",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"onMouseLeave",value:{name:"signature",type:"function",raw:"<T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void",signature:{arguments:[{type:{name:"MouseEvent",elements:[{name:"T"}],raw:"MouseEvent<T>"},name:"event"}],return:{name:"void"}},required:!1}},{key:"children",value:{name:"ReactNode",required:!1}},{key:"data-test-id",value:{name:"string",required:!1}}]}},{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
    title?: ReactNode;
    decorator?: ReactElement;
    switchComponent?: ReactElement;
    subtitle?: string;
    size?: MenuItemContentSize;
    ariaProps?: HTMLAttributes<HTMLElement>;
    children?: ReactNode;
}`,signature:{properties:[{key:"title",value:{name:"ReactNode",required:!1}},{key:"decorator",value:{name:"ReactElement",required:!1}},{key:"switchComponent",value:{name:"ReactElement",required:!1}},{key:"subtitle",value:{name:"string",required:!1}},{key:"size",value:{name:"MenuItemContentSize",required:!1}},{key:"ariaProps",value:{name:"HTMLAttributes",elements:[{name:"HTMLElement"}],raw:"HTMLAttributes<HTMLElement>",required:!1}},{key:"children",value:{name:"ReactNode",required:!1}}]}},{name:"literal",value:"'iconSize'"}],raw:"Omit<MenuItemContentProps, 'iconSize'>"}]},{name:"literal",value:"'switchComponent'"}],raw:"Omit<MenuItemProps, 'switchComponent'>"},{name:"signature",type:"object",raw:"{ id: string | number; link?: string }",signature:{properties:[{key:"id",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!0}},{key:"link",value:{name:"string",required:!1}}]}}]},{name:"signature",type:"object",raw:`{
    onClick: (switchValue: boolean) => void;
    type: 'switch';
    initialValue: boolean;
}`,signature:{properties:[{key:"onClick",value:{name:"signature",type:"function",raw:"(switchValue: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"switchValue"}],return:{name:"void"}},required:!0}},{key:"type",value:{name:"literal",value:"'switch'",required:!0}},{key:"initialValue",value:{name:"boolean",required:!0}}]}}]}]},description:""},node:{required:!0,tsType:{name:"Node",elements:[{name:"object"}],raw:"Node<object>"},description:""},isSelected:{required:!1,tsType:{name:"boolean"},description:""},state:{required:!0,tsType:{name:"TreeState",elements:[{name:"object"}],raw:"TreeState<object>"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"@deprecated Use `menuItem.onClick` instead"}}};const R=({ariaLabel:e,children:n})=>{const{itemProps:t,groupProps:a}=Be({"aria-label":e});return v.jsx("li",{...t,className:"tw-border-b tw-border-line last:tw-border-0","data-test-id":"menu-block-divider",children:v.jsx("ul",{...a,className:"tw-py-2 tw-px-0 tw-m-0 tw-list-none","data-test-id":"menu-item-list",children:n})})};R.displayName="FondueAriaSection";R.__docgenInfo={description:"",methods:[],displayName:"FondueAriaSection",props:{ariaLabel:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const G=({menuBlocks:e,ariaLabel:n="Action Menu",focus:t,border:a=!0,scrollable:o=!1,onClick:u})=>{const r=pe(e),s=Te(r),l=Me(n,e),d=Ie({...l,selectionMode:"none",disabledKeys:ye(r)}),y=p.useRef(null),{menuProps:g}=qe({...l,autoFocus:t},d,y);return v.jsx(K,{ariaProps:{...g},ref:y,border:a,scrollable:o,children:[...d.collection].map(T=>{const{key:b,"aria-label":h}=T;return v.jsx(R,{ariaLabel:h,children:[...T.childNodes].map(m=>v.jsx(O,{menuItem:s[m.key],state:d,node:m,onClick:u},m.key))},b)})})};G.displayName="FondueActionMenu";G.__docgenInfo={description:"",methods:[],displayName:"FondueActionMenu",props:{ariaLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Action Menu'",computed:!1}},menuBlocks:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: string;
    menuItems: (ActionMenuItemType | ActionMenuSwitchItemType)[];
    ariaLabel?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"menuItems",value:{name:"Array",elements:[{name:"unknown"}],raw:"(ActionMenuItemType | ActionMenuSwitchItemType)[]",required:!0}},{key:"ariaLabel",value:{name:"string",required:!1}}]}}],raw:"ActionMenuBlock[]"},description:""},focus:{required:!1,tsType:{name:"FocusStrategy"},description:""},border:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},scrollable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:`@deprecated Use the onClick method available on each \`menuItem\` in the \`menuBlocks\` instead.
@example
 <ActionMenu
          menuBlocks={[
              {
                  id: 'menu-block-1',
                  menuItems: [
                      {
                          id: 'menu-item-1',
                          label: 'Item 1',
                          onClick: () => console.log('Item 1 clicked');
                      },
                  ],
              },
          ]}
        />`}}};export{Ie as $,G as A};
