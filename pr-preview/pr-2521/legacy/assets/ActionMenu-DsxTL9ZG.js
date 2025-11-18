import{r as v,j as T}from"./iframe-C_X0LXbg.js";import{a as Z,$ as N,b as Me,c as ye,d as fe,e as Ee,f as be}from"./useFocusable-P2cNa7fe.js";import{$ as ge,c as he,a as ke,d as we,g as Le,e as He,m as xe,f as Ae}from"./helper-B9kJ87Sn.js";import{$ as qe,a as $e,b as Be}from"./SelectionManager-BKzRhrRA.js";import{$ as Ie}from"./useControlledState-C7NVvjwe.js";import{m as ee}from"./merge-DI-veSMP.js";import{a as X,b as Pe,$ as Se}from"./useFocusRing-B-vCA7C1.js";import{a as R,$ as Fe}from"./chain-CAXrBEkW.js";import{b as Ce}from"./MenuItem-C-0NolIX.js";import{S as Ke}from"./Switch-BZcGK09Q.js";import{b as Re}from"./focusStyle-Ch_WJ4aJ.js";const ne=new WeakMap;function Oe(e,t,n){let{shouldFocusWrap:a=!0,onKeyDown:o,onKeyUp:d,...l}=e;!e["aria-label"]&&e["aria-labelledby"];let i=Z(e,{labelable:!0}),{listProps:s}=ge({...l,ref:n,selectionManager:t.selectionManager,collection:t.collection,disabledKeys:t.disabledKeys,shouldFocusWrap:a,linkBehavior:"override"});return ne.set(t,{onClose:e.onClose,onAction:e.onAction,shouldUseVirtualFocus:e.shouldUseVirtualFocus}),{menuProps:N(i,{onKeyDown:o,onKeyUp:d},{role:"menu",...s,onKeyDown:c=>{var p;(c.key!=="Escape"||e.shouldUseVirtualFocus)&&((p=s.onKeyDown)===null||p===void 0||p.call(s,c))}})}}function Ne(e,t,n){let{id:a,key:o,closeOnSelect:d,isVirtualized:l,"aria-haspopup":i,onPressStart:s,onPressUp:c,onPress:p,onPressChange:y,onPressEnd:g,onClick:f,onHoverStart:E,onHoverChange:b,onHoverEnd:A,onKeyDown:L,onKeyUp:$,onFocus:B,onFocusChange:oe,onBlur:ae,selectionManager:m=t.selectionManager}=e,M=!!i,I=M&&e["aria-expanded"]==="true";var P;let H=(P=e.isDisabled)!==null&&P!==void 0?P:m.isDisabled(o);var S;let V=(S=e.isSelected)!==null&&S!==void 0?S:m.isSelected(o),h=ne.get(t),u=t.collection.getItem(o),D=e.onClose||h.onClose,re=Me(),ie=()=>{var r;if(!M&&(!(u==null||(r=u.props)===null||r===void 0)&&r.onAction?u.props.onAction():e.onAction&&e.onAction(o),h.onAction)){let x=h.onAction;x(o)}},F="menuitem";M||(m.selectionMode==="single"?F="menuitemradio":m.selectionMode==="multiple"&&(F="menuitemcheckbox"));let U=R(),G=R(),W=R(),q={id:a,"aria-disabled":H||void 0,role:F,"aria-label":e["aria-label"],"aria-labelledby":U,"aria-describedby":[G,W].filter(Boolean).join(" ")||void 0,"aria-controls":e["aria-controls"],"aria-haspopup":i,"aria-expanded":e["aria-expanded"]};m.selectionMode!=="none"&&!M&&(q["aria-checked"]=V),l&&(q["aria-posinset"]=u==null?void 0:u.index,q["aria-setsize"]=he(t.collection));let Y=v.useRef(!1),se=r=>{y==null||y(r),Y.current=r},k=v.useRef(null),le=r=>{r.pointerType!=="keyboard"&&(k.current={pointerType:r.pointerType}),r.pointerType==="mouse"&&(Y.current||r.target.click()),c==null||c(r)},ue=r=>{var x,C;f==null||f(r),ie(),be(r,re,u.props.href,u==null?void 0:u.props.routerOptions);let K=((x=k.current)===null||x===void 0?void 0:x.pointerType)==="keyboard"?((C=k.current)===null||C===void 0?void 0:C.key)==="Enter"||m.selectionMode==="none"||m.isLink(o):m.selectionMode!=="multiple"||m.isLink(o);K=d??K,D&&!M&&K&&D(),k.current=null},{itemProps:w,isFocused:J}=ke({id:a,selectionManager:m,key:o,ref:n,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,linkBehavior:"none",shouldUseVirtualFocus:h.shouldUseVirtualFocus}),{pressProps:de,isPressed:ce}=ye({onPressStart:s,onPress:p,onPressUp:le,onPressChange:se,onPressEnd:g,isDisabled:H}),{hoverProps:me}=we({isDisabled:H,onHoverStart(r){!X()&&!(I&&i)&&(m.setFocused(!0),m.setFocusedKey(o)),E==null||E(r)},onHoverChange:b,onHoverEnd:A}),{keyboardProps:ve}=fe({onKeyDown:r=>{if(r.repeat){r.continuePropagation();return}switch(r.key){case" ":k.current={pointerType:"keyboard",key:" "},r.target.click();break;case"Enter":k.current={pointerType:"keyboard",key:"Enter"},r.target.tagName!=="A"&&r.target.click();break;default:M||r.continuePropagation(),L==null||L(r);break}},onKeyUp:$}),{focusProps:pe}=Pe({onBlur:ae,onFocus:B,onFocusChange:oe}),Q=Z(u==null?void 0:u.props);delete Q.id;let Te=Ee(u==null?void 0:u.props);return{menuItemProps:{...q,...N(Q,Te,M?{onFocus:w.onFocus,"data-collection":w["data-collection"],"data-key":w["data-key"]}:w,de,me,ve,pe,h.shouldUseVirtualFocus||M?{onMouseDown:r=>r.preventDefault()}:void 0,H?void 0:{onClick:ue}),tabIndex:w.tabIndex!=null&&I&&!h.shouldUseVirtualFocus?-1:w.tabIndex},labelProps:{id:U},descriptionProps:{id:G},keyboardShortcutProps:{id:W},isFocused:J,isFocusVisible:J&&m.isFocused&&X()&&!I,isSelected:V,isPressed:ce,isDisabled:H}}function _e(e){let{heading:t,"aria-label":n}=e,a=Fe();return{itemProps:{role:"presentation"},headingProps:t?{id:a,role:"presentation"}:{},groupProps:{role:"group","aria-label":n,"aria-labelledby":t?a:void 0}}}class je{*[Symbol.iterator](){yield*this.iterable}get size(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(t){let n=this.keyMap.get(t);var a;return n&&(a=n.prevKey)!==null&&a!==void 0?a:null}getKeyAfter(t){let n=this.keyMap.get(t);var a;return n&&(a=n.nextKey)!==null&&a!==void 0?a:null}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(t){var n;return(n=this.keyMap.get(t))!==null&&n!==void 0?n:null}at(t){const n=[...this.getKeys()];return this.getItem(n[t])}constructor(t,{expandedKeys:n}={}){this.keyMap=new Map,this.firstKey=null,this.lastKey=null,this.iterable=t,n=n||new Set;let a=i=>{if(this.keyMap.set(i.key,i),i.childNodes&&(i.type==="section"||n.has(i.key)))for(let s of i.childNodes)a(s)};for(let i of t)a(i);let o=null,d=0;for(let[i,s]of this.keyMap)o?(o.nextKey=i,s.prevKey=o.key):(this.firstKey=i,s.prevKey=void 0),s.type==="item"&&(s.index=d++),o=s,o.nextKey=void 0;var l;this.lastKey=(l=o==null?void 0:o.key)!==null&&l!==void 0?l:null}}function ze(e){let{onExpandedChange:t}=e,[n,a]=Ie(e.expandedKeys?new Set(e.expandedKeys):void 0,e.defaultExpandedKeys?new Set(e.defaultExpandedKeys):new Set,t),o=qe(e),d=v.useMemo(()=>e.disabledKeys?new Set(e.disabledKeys):new Set,[e.disabledKeys]),l=$e(e,v.useCallback(s=>new je(s,{expandedKeys:n}),[n]),null);return v.useEffect(()=>{o.focusedKey!=null&&!l.getItem(o.focusedKey)&&o.setFocusedKey(null)},[l,o.focusedKey]),{collection:l,expandedKeys:n,disabledKeys:d,toggleKey:s=>{a(Ve(n,s))},setExpandedKeys:a,selectionManager:new Be(l,o)}}function Ve(e,t){let n=new Set(e);return n.has(t)?n.delete(t):n.add(t),n}const _=v.forwardRef(({ariaProps:e,children:t,scrollable:n=!1,border:a=!0},o)=>T.jsx("ul",{...e,ref:o,className:ee(["tw-list-none tw-p-0 tw-m-0 tw-bg-base tw-z-20 focus-visible:tw-outline-none",a&&"tw-border tw-border-line tw-rounded",n&&"tw-overflow-y-auto"]),children:t}));_.displayName="FondueAriaList";_.__docgenInfo={description:"",methods:[],displayName:"FondueAriaList",props:{ariaProps:{required:!0,tsType:{name:"HTMLAttributes",elements:[{name:"HTMLElement"}],raw:"HTMLAttributes<HTMLElement>"},description:""},border:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},children:{required:!0,tsType:{name:"ReactNode"},description:""},scrollable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const De=e=>typeof e.onClick<"u"&&typeof e.type>"u",O=e=>typeof e.onClick<"u"&&e.type==="switch",Ue=(e,t)=>{const[n,a]=v.useState(t??!1),[o,d]=v.useState({switchComponent:void 0,switchValue:null,toggleSwitch:null});return v.useEffect(()=>{if(e){const l=()=>a(!n);d({switchComponent:T.jsx(Ke,{size:"small",mode:n?"on":"off"}),switchValue:n,toggleSwitch:l})}},[e,n]),o},j=({menuItem:e,node:t,state:n,isSelected:a,onClick:o})=>{const d=v.useRef(null),l=O(e)?e.initialValue:!1,{switchComponent:i=void 0,switchValue:s=null,toggleSwitch:c=null}=Ue(O(e),l),{menuItemProps:p}=Ne({...t,onAction:()=>{De(e)&&e.onClick(),O(e)&&(c==null||c(),e.onClick(!s))},isDisabled:(e==null?void 0:e.disabled)||!1,"aria-label":typeof(e==null?void 0:e.title)=="string"?e==null?void 0:e.title:"Menu item"},n,d),{title:y,decorator:g,subtitle:f,size:E,style:b,disabled:A,selectionIndicator:L}=e,{isFocusVisible:$,focusProps:B}=Se();return T.jsx("li",{...N(p,B,{onClick:()=>o==null?void 0:o()}),"data-test-id":"menu-item",className:ee(["tw-relative hover:tw-bg-box-neutral-hover tw-list-none tw-outline-none",A&&"tw-pointer-events-none tw-top-px",$&&Re]),ref:d,children:T.jsx(Ce,{title:y,decorator:g,subtitle:f,size:E,style:b,disabled:A,active:a,selectionIndicator:L,switchComponent:i})})};j.displayName="FondueAriaMenuItem";j.__docgenInfo={description:"",methods:[],displayName:"FondueAriaMenuItem",props:{menuItem:{required:!0,tsType:{name:"union",raw:"MenuItemType | ActionMenuItemType | ActionMenuSwitchItemType",elements:[{name:"intersection",raw:"Omit<MenuItemProps, 'switchComponent'> & { id: string | number; link?: string }",elements:[{name:"Omit",elements:[{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"onClick",value:{name:"signature",type:"function",raw:"(switchValue: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"switchValue"}],return:{name:"void"}},required:!0}},{key:"type",value:{name:"literal",value:"'switch'",required:!0}},{key:"initialValue",value:{name:"boolean",required:!0}}]}}]}]},description:""},node:{required:!0,tsType:{name:"Node",elements:[{name:"object"}],raw:"Node<object>"},description:""},isSelected:{required:!1,tsType:{name:"boolean"},description:""},state:{required:!0,tsType:{name:"TreeState",elements:[{name:"object"}],raw:"TreeState<object>"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"@deprecated Use `menuItem.onClick` instead"}}};const z=({ariaLabel:e,children:t})=>{const{itemProps:n,groupProps:a}=_e({"aria-label":e});return T.jsx("li",{...n,className:"tw-border-b tw-border-line last:tw-border-0","data-test-id":"menu-block-divider",children:T.jsx("ul",{...a,className:"tw-py-2 tw-px-0 tw-m-0 tw-list-none","data-test-id":"menu-item-list",children:t})})};z.displayName="FondueAriaSection";z.__docgenInfo={description:"",methods:[],displayName:"FondueAriaSection",props:{ariaLabel:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const te=({menuBlocks:e,ariaLabel:t="Action Menu",focus:n,border:a=!0,scrollable:o=!1,onClick:d})=>{const l=Le(e),i=He(l),s=xe(t,e),c=ze({...s,selectionMode:"none",disabledKeys:Ae(l)}),p=v.useRef(null),{menuProps:y}=Oe({...s,autoFocus:n},c,p);return T.jsx(_,{ariaProps:{...y},ref:p,border:a,scrollable:o,children:[...c.collection].map(g=>{const{key:f,"aria-label":E}=g;return T.jsx(z,{ariaLabel:E,children:[...g.childNodes].map(b=>T.jsx(j,{menuItem:i[b.key],state:c,node:b,onClick:d},b.key))},f)})})};te.displayName="FondueActionMenu";te.__docgenInfo={description:"@deprecated Use `Dropdown` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dropdown the migration guide}.",methods:[],displayName:"FondueActionMenu",props:{ariaLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Action Menu'",computed:!1}},menuBlocks:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
        />`}}};export{ze as $,te as A};
