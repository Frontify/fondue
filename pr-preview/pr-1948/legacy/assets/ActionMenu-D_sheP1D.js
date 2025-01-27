import{j as T}from"./jsx-runtime-DH9XN8A8.js";import{c as Y,b as O,d as me,$ as ve,h as pe,e as Te}from"./useFocusable-BRFkliNn.js";import{$ as Me,c as ye,a as fe,d as Ee,g as be,e as ge,m as he,f as ke}from"./helper-B_Vetl89.js";import{$ as we,a as Le,b as He}from"./SelectionManager-BD4p7d3N.js";import{r as M}from"./index-v7USjxUg.js";import{$ as xe}from"./useControlledState-BSgwHaZM.js";import{m as J}from"./merge-DI-veSMP.js";import{h as Ae,i as qe,$ as $e}from"./useFocusRing-CP9UJNUw.js";import{b as C,$ as Be}from"./chain-C8AhrK0W.js";import{b as Ie}from"./MenuItem-n3bavbk_.js";import{S as Pe}from"./Switch-CibQ61jG.js";import{d as Se}from"./focusStyle-CBFElZiz.js";const Q=new WeakMap;function Fe(e,t,n){let{shouldFocusWrap:a=!0,onKeyDown:o,onKeyUp:u,...l}=e;!e["aria-label"]&&!e["aria-labelledby"]&&console.warn("An aria-label or aria-labelledby prop is required for accessibility.");let i=Y(e,{labelable:!0}),{listProps:r}=Me({...l,ref:n,selectionManager:t.selectionManager,collection:t.collection,disabledKeys:t.disabledKeys,shouldFocusWrap:a,linkBehavior:"override"});return Q.set(t,{onClose:e.onClose,onAction:e.onAction,shouldUseVirtualFocus:e.shouldUseVirtualFocus}),{menuProps:O(i,{onKeyDown:o,onKeyUp:u},{role:"menu",...r,onKeyDown:c=>{var m;(c.key!=="Escape"||e.shouldUseVirtualFocus)&&((m=r.onKeyDown)===null||m===void 0||m.call(r,c))}})}}function Ce(e,t,n){let{id:a,key:o,closeOnSelect:u,isVirtualized:l,"aria-haspopup":i,onPressStart:r,onPressUp:c,onPress:m,onPressChange:k,onPressEnd:E,onHoverStart:y,onHoverChange:w,onHoverEnd:f,onKeyDown:b,onKeyUp:A,onFocus:q,onFocusChange:$,onBlur:Z,selectionManager:v=t.selectionManager}=e,p=!!i,z=p&&e["aria-expanded"]==="true";var B;let g=(B=e.isDisabled)!==null&&B!==void 0?B:v.isDisabled(o);var I;let _=(I=e.isSelected)!==null&&I!==void 0?I:v.isSelected(o),H=Q.get(t),d=t.collection.getItem(o),h=e.onClose||H.onClose,ee=me(),P=s=>{var F;if(!p){if(!(d==null||(F=d.props)===null||F===void 0)&&F.onAction?d.props.onAction():e.onAction&&e.onAction(o),H.onAction){let ce=H.onAction;ce(o)}s.target instanceof HTMLAnchorElement&&d&&ee.open(s.target,s,d.props.href,d.props.routerOptions)}},S="menuitem";p||(v.selectionMode==="single"?S="menuitemradio":v.selectionMode==="multiple"&&(S="menuitemcheckbox"));let V=C(),D=C(),U=C(),x={id:a,"aria-disabled":g||void 0,role:S,"aria-label":e["aria-label"],"aria-labelledby":V,"aria-describedby":[D,U].filter(Boolean).join(" ")||void 0,"aria-controls":e["aria-controls"],"aria-haspopup":i,"aria-expanded":e["aria-expanded"]};v.selectionMode!=="none"&&!p&&(x["aria-checked"]=_),l&&(x["aria-posinset"]=d==null?void 0:d.index,x["aria-setsize"]=ye(t.collection));let ne=s=>{s.pointerType==="keyboard"&&P(s),r==null||r(s)},W=()=>{!p&&h&&(u??(v.selectionMode!=="multiple"||v.isLink(o)))&&h()},te=s=>{s.pointerType==="mouse"&&(P(s),W()),c==null||c(s)},oe=s=>{s.pointerType!=="keyboard"&&s.pointerType!=="mouse"&&(P(s),W()),m==null||m(s)},{itemProps:L,isFocused:ae}=fe({id:a,selectionManager:v,key:o,ref:n,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,linkBehavior:"none",shouldUseVirtualFocus:H.shouldUseVirtualFocus}),{pressProps:re,isPressed:se}=ve({onPressStart:ne,onPress:oe,onPressUp:te,onPressChange:k,onPressEnd:E,isDisabled:g}),{hoverProps:ie}=Ee({isDisabled:g,onHoverStart(s){!Ae()&&!(z&&i==="dialog")&&(v.setFocused(!0),v.setFocusedKey(o)),y==null||y(s)},onHoverChange:w,onHoverEnd:f}),{keyboardProps:le}=pe({onKeyDown:s=>{if(s.repeat){s.continuePropagation();return}switch(s.key){case" ":!g&&v.selectionMode==="none"&&!p&&u!==!1&&h&&h();break;case"Enter":!g&&u!==!1&&!p&&h&&h();break;default:p||s.continuePropagation(),b==null||b(s);break}},onKeyUp:A}),{focusProps:ue}=qe({onBlur:Z,onFocus:q,onFocusChange:$}),G=Y(d==null?void 0:d.props);delete G.id;let de=Te(d==null?void 0:d.props);return{menuItemProps:{...x,...O(G,de,p?{onFocus:L.onFocus,"data-key":L["data-key"]}:L,re,ie,le,ue),tabIndex:L.tabIndex!=null&&z?-1:L.tabIndex},labelProps:{id:V},descriptionProps:{id:D},keyboardShortcutProps:{id:U},isFocused:ae,isSelected:_,isPressed:se,isDisabled:g}}function Ke(e){let{heading:t,"aria-label":n}=e,a=Be();return{itemProps:{role:"presentation"},headingProps:t?{id:a,role:"presentation"}:{},groupProps:{role:"group","aria-label":n,"aria-labelledby":t?a:void 0}}}class Oe{*[Symbol.iterator](){yield*this.iterable}get size(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(t){let n=this.keyMap.get(t);var a;return n&&(a=n.prevKey)!==null&&a!==void 0?a:null}getKeyAfter(t){let n=this.keyMap.get(t);var a;return n&&(a=n.nextKey)!==null&&a!==void 0?a:null}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(t){var n;return(n=this.keyMap.get(t))!==null&&n!==void 0?n:null}at(t){const n=[...this.getKeys()];return this.getItem(n[t])}constructor(t,{expandedKeys:n}={}){this.keyMap=new Map,this.firstKey=null,this.lastKey=null,this.iterable=t,n=n||new Set;let a=i=>{if(this.keyMap.set(i.key,i),i.childNodes&&(i.type==="section"||n.has(i.key)))for(let r of i.childNodes)a(r)};for(let i of t)a(i);let o=null,u=0;for(let[i,r]of this.keyMap)o?(o.nextKey=i,r.prevKey=o.key):(this.firstKey=i,r.prevKey=void 0),r.type==="item"&&(r.index=u++),o=r,o.nextKey=void 0;var l;this.lastKey=(l=o==null?void 0:o.key)!==null&&l!==void 0?l:null}}function Re(e){let{onExpandedChange:t}=e,[n,a]=xe(e.expandedKeys?new Set(e.expandedKeys):void 0,e.defaultExpandedKeys?new Set(e.defaultExpandedKeys):new Set,t),o=we(e),u=M.useMemo(()=>e.disabledKeys?new Set(e.disabledKeys):new Set,[e.disabledKeys]),l=Le(e,M.useCallback(r=>new Oe(r,{expandedKeys:n}),[n]),null);return M.useEffect(()=>{o.focusedKey!=null&&!l.getItem(o.focusedKey)&&o.setFocusedKey(null)},[l,o.focusedKey]),{collection:l,expandedKeys:n,disabledKeys:u,toggleKey:r=>{a(Ne(n,r))},setExpandedKeys:a,selectionManager:new He(l,o)}}function Ne(e,t){let n=new Set(e);return n.has(t)?n.delete(t):n.add(t),n}const R=M.forwardRef(({ariaProps:e,children:t,scrollable:n=!1,border:a=!0},o)=>T.jsx("ul",{...e,ref:o,className:J(["tw-list-none tw-p-0 tw-m-0 tw-bg-base tw-z-20 focus-visible:tw-outline-none",a&&"tw-border tw-border-line tw-rounded",n&&"tw-overflow-y-auto"]),children:t}));R.displayName="FondueAriaList";R.__docgenInfo={description:"",methods:[],displayName:"FondueAriaList",props:{ariaProps:{required:!0,tsType:{name:"HTMLAttributes",elements:[{name:"HTMLElement"}],raw:"HTMLAttributes<HTMLElement>"},description:""},border:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},children:{required:!0,tsType:{name:"ReactNode"},description:""},scrollable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const je=e=>typeof e.onClick<"u"&&typeof e.type>"u",K=e=>typeof e.onClick<"u"&&e.type==="switch",ze=(e,t)=>{const[n,a]=M.useState(t??!1),[o,u]=M.useState({switchComponent:void 0,switchValue:null,toggleSwitch:null});return M.useEffect(()=>{if(e){const l=()=>a(!n);u({switchComponent:T.jsx(Pe,{size:"small",mode:n?"on":"off"}),switchValue:n,toggleSwitch:l})}},[e,n]),o},N=({menuItem:e,node:t,state:n,isSelected:a,onClick:o})=>{const u=M.useRef(null),l=K(e)?e.initialValue:!1,{switchComponent:i=void 0,switchValue:r=null,toggleSwitch:c=null}=ze(K(e),l),{menuItemProps:m}=Ce({...t,onAction:()=>{je(e)&&e.onClick(),K(e)&&(c==null||c(),e.onClick(!r))},isDisabled:(e==null?void 0:e.disabled)||!1,"aria-label":typeof(e==null?void 0:e.title)=="string"?e==null?void 0:e.title:"Menu item"},n,u),{title:k,decorator:E,subtitle:y,size:w,style:f,disabled:b,selectionIndicator:A}=e,{isFocusVisible:q,focusProps:$}=$e();return T.jsx("li",{...O(m,$,{onClick:()=>o==null?void 0:o()}),"data-test-id":"menu-item",className:J(["tw-relative hover:tw-bg-box-neutral-hover tw-list-none tw-outline-none",b&&"tw-pointer-events-none tw-top-px",q&&Se]),ref:u,children:T.jsx(Ie,{title:k,decorator:E,subtitle:y,size:w,style:f,disabled:b,active:a,selectionIndicator:A,switchComponent:i})})};N.displayName="FondueAriaMenuItem";N.__docgenInfo={description:"",methods:[],displayName:"FondueAriaMenuItem",props:{menuItem:{required:!0,tsType:{name:"union",raw:"MenuItemType | ActionMenuItemType | ActionMenuSwitchItemType",elements:[{name:"intersection",raw:"Omit<MenuItemProps, 'switchComponent'> & { id: string | number; link?: string }",elements:[{name:"Omit",elements:[{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"onClick",value:{name:"signature",type:"function",raw:"(switchValue: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"switchValue"}],return:{name:"void"}},required:!0}},{key:"type",value:{name:"literal",value:"'switch'",required:!0}},{key:"initialValue",value:{name:"boolean",required:!0}}]}}]}]},description:""},node:{required:!0,tsType:{name:"Node",elements:[{name:"object"}],raw:"Node<object>"},description:""},isSelected:{required:!1,tsType:{name:"boolean"},description:""},state:{required:!0,tsType:{name:"TreeState",elements:[{name:"object"}],raw:"TreeState<object>"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"@deprecated Use `menuItem.onClick` instead"}}};const j=({ariaLabel:e,children:t})=>{const{itemProps:n,groupProps:a}=Ke({"aria-label":e});return T.jsx("li",{...n,className:"tw-border-b tw-border-line last:tw-border-0","data-test-id":"menu-block-divider",children:T.jsx("ul",{...a,className:"tw-py-2 tw-px-0 tw-m-0 tw-list-none","data-test-id":"menu-item-list",children:t})})};j.displayName="FondueAriaSection";j.__docgenInfo={description:"",methods:[],displayName:"FondueAriaSection",props:{ariaLabel:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const X=({menuBlocks:e,ariaLabel:t="Action Menu",focus:n,border:a=!0,scrollable:o=!1,onClick:u})=>{const l=be(e),i=ge(l),r=he(t,e),c=Re({...r,selectionMode:"none",disabledKeys:ke(l)}),m=M.useRef(null),{menuProps:k}=Fe({...r,autoFocus:n},c,m);return T.jsx(R,{ariaProps:{...k},ref:m,border:a,scrollable:o,children:[...c.collection].map(E=>{const{key:y,"aria-label":w}=E;return T.jsx(j,{ariaLabel:w,children:[...E.childNodes].map(f=>T.jsx(N,{menuItem:i[f.key],state:c,node:f,onClick:u},f.key))},y)})})};X.displayName="FondueActionMenu";X.__docgenInfo={description:"@deprecated Use `Dropdown` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dropdown the migration guide}.",methods:[],displayName:"FondueActionMenu",props:{ariaLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Action Menu'",computed:!1}},menuBlocks:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
        />`}}};export{Re as $,X as A};
