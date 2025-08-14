import{j as T}from"./jsx-runtime-BYYWji4R.js";import{c as Q,b as R,d as ve,$ as pe,h as Te,e as Me}from"./useFocusable-NpJIjJzn.js";import{$ as ye,c as fe,a as Ee,d as ge,g as be,e as he,m as ke,f as we}from"./helper-kX8HYG1i.js";import{$ as Le,a as He,b as xe}from"./SelectionManager-C5uJtM9S.js";import{r as M}from"./index-ClcD9ViR.js";import{$ as Ae}from"./useControlledState-CbyHarIm.js";import{m as X}from"./merge-DI-veSMP.js";import{n as J,o as qe,$ as $e}from"./useFocusRing-CqhiwHAH.js";import{b as K,$ as Be}from"./chain-zZtnTS2i.js";import{b as Ie}from"./MenuItem-DLnzVIUf.js";import{S as Fe}from"./Switch-Cd2vSyfE.js";import{d as Se}from"./focusStyle-BtNTXUM4.js";const Z=new WeakMap;function Pe(e,t,n){let{shouldFocusWrap:a=!0,onKeyDown:o,onKeyUp:u,...l}=e;!e["aria-label"]&&!e["aria-labelledby"]&&console.warn("An aria-label or aria-labelledby prop is required for accessibility.");let i=Q(e,{labelable:!0}),{listProps:s}=ye({...l,ref:n,selectionManager:t.selectionManager,collection:t.collection,disabledKeys:t.disabledKeys,shouldFocusWrap:a,linkBehavior:"override"});return Z.set(t,{onClose:e.onClose,onAction:e.onAction,shouldUseVirtualFocus:e.shouldUseVirtualFocus}),{menuProps:R(i,{onKeyDown:o,onKeyUp:u},{role:"menu",...s,onKeyDown:c=>{var m;(c.key!=="Escape"||e.shouldUseVirtualFocus)&&((m=s.onKeyDown)===null||m===void 0||m.call(s,c))}})}}function Ce(e,t,n){let{id:a,key:o,closeOnSelect:u,isVirtualized:l,"aria-haspopup":i,onPressStart:s,onPressUp:c,onPress:m,onPressChange:L,onPressEnd:E,onHoverStart:y,onHoverChange:H,onHoverEnd:f,onKeyDown:g,onKeyUp:A,onFocus:q,onFocusChange:$,onBlur:ne,selectionManager:v=t.selectionManager}=e,p=!!i,B=p&&e["aria-expanded"]==="true";var I;let b=(I=e.isDisabled)!==null&&I!==void 0?I:v.isDisabled(o);var F;let V=(F=e.isSelected)!==null&&F!==void 0?F:v.isSelected(o),h=Z.get(t),d=t.collection.getItem(o),k=e.onClose||h.onClose,te=ve(),S=r=>{var C;if(!p){if(!(d==null||(C=d.props)===null||C===void 0)&&C.onAction?d.props.onAction():e.onAction&&e.onAction(o),h.onAction){let me=h.onAction;me(o)}r.target instanceof HTMLAnchorElement&&d&&te.open(r.target,r,d.props.href,d.props.routerOptions)}},P="menuitem";p||(v.selectionMode==="single"?P="menuitemradio":v.selectionMode==="multiple"&&(P="menuitemcheckbox"));let _=K(),D=K(),U=K(),x={id:a,"aria-disabled":b||void 0,role:P,"aria-label":e["aria-label"],"aria-labelledby":_,"aria-describedby":[D,U].filter(Boolean).join(" ")||void 0,"aria-controls":e["aria-controls"],"aria-haspopup":i,"aria-expanded":e["aria-expanded"]};v.selectionMode!=="none"&&!p&&(x["aria-checked"]=V),l&&(x["aria-posinset"]=d==null?void 0:d.index,x["aria-setsize"]=fe(t.collection));let oe=r=>{r.pointerType==="keyboard"&&S(r),s==null||s(r)},W=()=>{!p&&k&&(u??(v.selectionMode!=="multiple"||v.isLink(o)))&&k()},ae=r=>{r.pointerType==="mouse"&&(S(r),W()),c==null||c(r)},re=r=>{r.pointerType!=="keyboard"&&r.pointerType!=="mouse"&&(S(r),W()),m==null||m(r)},{itemProps:w,isFocused:G}=Ee({id:a,selectionManager:v,key:o,ref:n,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,linkBehavior:"none",shouldUseVirtualFocus:h.shouldUseVirtualFocus}),{pressProps:se,isPressed:ie}=pe({onPressStart:oe,onPress:re,onPressUp:ae,onPressChange:L,onPressEnd:E,isDisabled:b}),{hoverProps:le}=ge({isDisabled:b,onHoverStart(r){!J()&&!(B&&i)&&(v.setFocused(!0),v.setFocusedKey(o)),y==null||y(r)},onHoverChange:H,onHoverEnd:f}),{keyboardProps:ue}=Te({onKeyDown:r=>{if(r.repeat){r.continuePropagation();return}switch(r.key){case" ":!b&&v.selectionMode==="none"&&!p&&u!==!1&&k&&k();break;case"Enter":!b&&u!==!1&&!p&&k&&k();break;default:p||r.continuePropagation(),g==null||g(r);break}},onKeyUp:A}),{focusProps:de}=qe({onBlur:ne,onFocus:q,onFocusChange:$}),Y=Q(d==null?void 0:d.props);delete Y.id;let ce=Me(d==null?void 0:d.props);return{menuItemProps:{...x,...R(Y,ce,p?{onFocus:w.onFocus,"data-collection":w["data-collection"],"data-key":w["data-key"]}:w,se,le,ue,de,h.shouldUseVirtualFocus||p?{onMouseDown:r=>r.preventDefault()}:void 0),tabIndex:w.tabIndex!=null&&B&&!h.shouldUseVirtualFocus?-1:w.tabIndex},labelProps:{id:_},descriptionProps:{id:D},keyboardShortcutProps:{id:U},isFocused:G,isFocusVisible:G&&v.isFocused&&J()&&!B,isSelected:V,isPressed:ie,isDisabled:b}}function Ke(e){let{heading:t,"aria-label":n}=e,a=Be();return{itemProps:{role:"presentation"},headingProps:t?{id:a,role:"presentation"}:{},groupProps:{role:"group","aria-label":n,"aria-labelledby":t?a:void 0}}}class Oe{*[Symbol.iterator](){yield*this.iterable}get size(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(t){let n=this.keyMap.get(t);var a;return n&&(a=n.prevKey)!==null&&a!==void 0?a:null}getKeyAfter(t){let n=this.keyMap.get(t);var a;return n&&(a=n.nextKey)!==null&&a!==void 0?a:null}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(t){var n;return(n=this.keyMap.get(t))!==null&&n!==void 0?n:null}at(t){const n=[...this.getKeys()];return this.getItem(n[t])}constructor(t,{expandedKeys:n}={}){this.keyMap=new Map,this.firstKey=null,this.lastKey=null,this.iterable=t,n=n||new Set;let a=i=>{if(this.keyMap.set(i.key,i),i.childNodes&&(i.type==="section"||n.has(i.key)))for(let s of i.childNodes)a(s)};for(let i of t)a(i);let o=null,u=0;for(let[i,s]of this.keyMap)o?(o.nextKey=i,s.prevKey=o.key):(this.firstKey=i,s.prevKey=void 0),s.type==="item"&&(s.index=u++),o=s,o.nextKey=void 0;var l;this.lastKey=(l=o==null?void 0:o.key)!==null&&l!==void 0?l:null}}function Re(e){let{onExpandedChange:t}=e,[n,a]=Ae(e.expandedKeys?new Set(e.expandedKeys):void 0,e.defaultExpandedKeys?new Set(e.defaultExpandedKeys):new Set,t),o=Le(e),u=M.useMemo(()=>e.disabledKeys?new Set(e.disabledKeys):new Set,[e.disabledKeys]),l=He(e,M.useCallback(s=>new Oe(s,{expandedKeys:n}),[n]),null);return M.useEffect(()=>{o.focusedKey!=null&&!l.getItem(o.focusedKey)&&o.setFocusedKey(null)},[l,o.focusedKey]),{collection:l,expandedKeys:n,disabledKeys:u,toggleKey:s=>{a(Ne(n,s))},setExpandedKeys:a,selectionManager:new xe(l,o)}}function Ne(e,t){let n=new Set(e);return n.has(t)?n.delete(t):n.add(t),n}const N=M.forwardRef(({ariaProps:e,children:t,scrollable:n=!1,border:a=!0},o)=>T.jsx("ul",{...e,ref:o,className:X(["tw-list-none tw-p-0 tw-m-0 tw-bg-base tw-z-20 focus-visible:tw-outline-none",a&&"tw-border tw-border-line tw-rounded",n&&"tw-overflow-y-auto"]),children:t}));N.displayName="FondueAriaList";N.__docgenInfo={description:"",methods:[],displayName:"FondueAriaList",props:{scrollable:{defaultValue:{value:"false",computed:!1},required:!1},border:{defaultValue:{value:"true",computed:!1},required:!1}}};const je=e=>typeof e.onClick<"u"&&typeof e.type>"u",O=e=>typeof e.onClick<"u"&&e.type==="switch",ze=(e,t)=>{const[n,a]=M.useState(t??!1),[o,u]=M.useState({switchComponent:void 0,switchValue:null,toggleSwitch:null});return M.useEffect(()=>{if(e){const l=()=>a(!n);u({switchComponent:T.jsx(Fe,{size:"small",mode:n?"on":"off"}),switchValue:n,toggleSwitch:l})}},[e,n]),o},j=({menuItem:e,node:t,state:n,isSelected:a,onClick:o})=>{const u=M.useRef(null),l=O(e)?e.initialValue:!1,{switchComponent:i=void 0,switchValue:s=null,toggleSwitch:c=null}=ze(O(e),l),{menuItemProps:m}=Ce({...t,onAction:()=>{je(e)&&e.onClick(),O(e)&&(c==null||c(),e.onClick(!s))},isDisabled:(e==null?void 0:e.disabled)||!1,"aria-label":typeof(e==null?void 0:e.title)=="string"?e==null?void 0:e.title:"Menu item"},n,u),{title:L,decorator:E,subtitle:y,size:H,style:f,disabled:g,selectionIndicator:A}=e,{isFocusVisible:q,focusProps:$}=$e();return T.jsx("li",{...R(m,$,{onClick:()=>o==null?void 0:o()}),"data-test-id":"menu-item",className:X(["tw-relative hover:tw-bg-box-neutral-hover tw-list-none tw-outline-none",g&&"tw-pointer-events-none tw-top-px",q&&Se]),ref:u,children:T.jsx(Ie,{title:L,decorator:E,subtitle:y,size:H,style:f,disabled:g,active:a,selectionIndicator:A,switchComponent:i})})};j.displayName="FondueAriaMenuItem";j.__docgenInfo={description:"",methods:[],displayName:"FondueAriaMenuItem",props:{menuItem:{required:!0,tsType:{name:"union",raw:"MenuItemType | ActionMenuItemType | ActionMenuSwitchItemType",elements:[{name:"intersection",raw:"Omit<MenuItemProps, 'switchComponent'> & { id: string | number; link?: string }",elements:[{name:"Omit",elements:[{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"onClick",value:{name:"signature",type:"function",raw:"(switchValue: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"switchValue"}],return:{name:"void"}},required:!0}},{key:"type",value:{name:"literal",value:"'switch'",required:!0}},{key:"initialValue",value:{name:"boolean",required:!0}}]}}]}]},description:""},node:{required:!0,tsType:{name:"Node",elements:[{name:"object"}],raw:"Node<object>"},description:""},isSelected:{required:!1,tsType:{name:"boolean"},description:""},state:{required:!0,tsType:{name:"TreeState",elements:[{name:"object"}],raw:"TreeState<object>"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"@deprecated Use `menuItem.onClick` instead"}}};const z=({ariaLabel:e,children:t})=>{const{itemProps:n,groupProps:a}=Ke({"aria-label":e});return T.jsx("li",{...n,className:"tw-border-b tw-border-line last:tw-border-0","data-test-id":"menu-block-divider",children:T.jsx("ul",{...a,className:"tw-py-2 tw-px-0 tw-m-0 tw-list-none","data-test-id":"menu-item-list",children:t})})};z.displayName="FondueAriaSection";z.__docgenInfo={description:"",methods:[],displayName:"FondueAriaSection",props:{ariaLabel:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const ee=({menuBlocks:e,ariaLabel:t="Action Menu",focus:n,border:a=!0,scrollable:o=!1,onClick:u})=>{const l=be(e),i=he(l),s=ke(t,e),c=Re({...s,selectionMode:"none",disabledKeys:we(l)}),m=M.useRef(null),{menuProps:L}=Pe({...s,autoFocus:n},c,m);return T.jsx(N,{ariaProps:{...L},ref:m,border:a,scrollable:o,children:[...c.collection].map(E=>{const{key:y,"aria-label":H}=E;return T.jsx(z,{ariaLabel:H,children:[...E.childNodes].map(f=>T.jsx(j,{menuItem:i[f.key],state:c,node:f,onClick:u},f.key))},y)})})};ee.displayName="FondueActionMenu";ee.__docgenInfo={description:"@deprecated Use `Dropdown` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dropdown the migration guide}.",methods:[],displayName:"FondueActionMenu",props:{ariaLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Action Menu'",computed:!1}},menuBlocks:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
        />`}}};export{Re as $,ee as A};
