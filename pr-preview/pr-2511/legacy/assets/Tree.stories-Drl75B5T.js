import{j as r,r as o}from"./iframe-Dsejfqf3.js";import{B as Ie,a as we,b as Se}from"./Button-D3yCbMCu.js";import{C as c}from"./Container-DRHPpytQ.js";import{D as ke}from"./DialogBody-BD6B2_pR.js";import{I as Ne}from"./InlineDialog-oScmXjCR.js";import{T as d}from"./Tree-CHXkJzp-.js";import{T as D,a as R,b as j,c as P,d as H,e as O}from"./ExpandButton-Bl_TkTLr.js";import{t as y,u as Ce,a as ve}from"./mocks-vLKnKEfG.js";import{d as We}from"./LegacyTooltip-BJIfuung.js";import{T as W,u as Ee}from"./TreeItem-BU8CIDb2.js";import{M as De}from"./dialog-D9O7a7Fm.js";import"./preload-helper-sQDyWCwb.js";import"./useButton-DrDu0hN4.js";import"./useFocusable-kZrDkqc7.js";import"./useFocusRing-DWqOtJ-L.js";import"./useEffectEvent-C7jBvXkh.js";import"./chain-BFmjOoFO.js";import"./index-BbLRgUGO.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Cord8vlN.js";import"./borderStyle-D9jrV09G.js";import"./input--aYGB3iM.js";import"./Divider-CSA0glUk.js";import"./FormControl-B73r47xs.js";import"./InputLabel-DoHx15Zm.js";import"./TooltipIcon-_Xzg-Fhc.js";import"./IconQuestionMarkCircle-BAuAtzUg.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-j6DPyhiU.js";import"./Switch-CQpRUTqU.js";import"./useMemoizedId-DeujXZR8.js";import"./TabItem-D9LFcEE2.js";import"./elements-BOYmskOL.js";import"./TextInput-lWB17Ld3.js";import"./IconCheckMark-C6DMESJP.js";import"./IconCross-DFUwyl11.js";import"./IconExclamationMarkTriangle-ClnlLp-c.js";import"./IconExclamationMarkTriangle24-CZYrQjwB.js";import"./Tooltip-1AYg5Joy.js";import"./useClickOutside-TtSMHBKs.js";import"./usePopper-DjOQrLf2.js";import"./index-MQ_sJc9e.js";import"./EnablePortalWrapper-DjCaNXWL.js";import"./Portal-CXUvUdjm.js";import"./Trigger-CmZ21mE1.js";import"./IconCaretDown--QkG6ADy.js";import"./IconCaretDown16-DqiiGdgJ.js";import"./IconTrashBin16-BkNVPgcX.js";import"./IconTrashBin24-Bj6htdPw.js";import"./_Uint8Array-CwPxMkg2.js";import"./useLink-CdtBTF-A.js";import"./IconExclamationMarkCircle24-R5PjI8Kl.js";import"./useDebounce-BhSMlsfq.js";import"./noop-DX6rZLP_.js";const{action:u}=__STORYBOOK_MODULE_ACTIONS__,An={title:"Components/Tree",component:d,tags:["autodocs"],args:{id:"storybook-tree",draggable:!0,selectedIds:["2"],dragHandlerPosition:"left",showDragHandlerOnHoverOnly:!0,showContentWhileDragging:!1,spacingY:"none",contentHight:"single-line",shadow:"none",borderRadius:"small",borderWidth:"none",borderStyle:"none",activeColorStyle:"neutral"},argTypes:{draggable:{control:{type:"boolean"}},showDragHandlerOnHoverOnly:{table:{category:"Item Options"},control:{type:"boolean"}},showContentWhileDragging:{table:{category:"Item Options"},control:{type:"boolean"}},dragHandlerPosition:{table:{category:"Item Options"},options:["left","right","none"],control:{type:"inline-radio"}},spacingY:{table:{category:"Item Style"},name:"itemStyle.spacingY",options:[...Object.keys(O)],mapping:[...Object.values(O)],control:{type:"inline-radio"}},contentHight:{table:{category:"Item Style"},name:"itemStyle.contentHight",options:["content-fit","single-line"],control:{type:"inline-radio"}},shadow:{table:{category:"Item Style"},name:"itemStyle.shadow",options:[...Object.keys(H)],mapping:[...Object.values(H)],control:{type:"select"}},borderRadius:{table:{category:"Item Style"},name:"itemStyle.borderRadius",options:[...Object.keys(P)],mapping:[...Object.values(P)],control:{type:"select"}},borderWidth:{table:{category:"Item Style"},name:"itemStyle.borderWidth",options:[...Object.keys(j)],mapping:[...Object.values(j)],control:{type:"select"}},borderStyle:{table:{category:"Item Style"},name:"itemStyle.borderStyle",options:[...Object.keys(R)],mapping:[...Object.values(R)],control:{type:"select"}},activeColorStyle:{table:{category:"Item Style"},name:"itemStyle.activeColorStyle",options:[...Object.keys(D)],mapping:[...Object.values(D)],control:{type:"inline-radio"}},selectedIds:{control:{type:"object"}},expandedIds:{control:{type:"object"}}}},be=({title:e})=>r.jsxs("div",{className:"tw-flex tw-space-x-1.5 tw-w-full",children:[r.jsx("span",{className:"tw-flex tw-justify-center tw-items-center tw-w-5",children:r.jsx(We,{})}),r.jsx("span",{children:e})]}),Re=({label:e,contentComponent:n,nodes:a,...t})=>{const s=`${e} CUSTOM`,i=()=>u("onDrop");return r.jsx(W,{label:s,...t,onDrop:i,children:a==null?void 0:a.map(l=>Te({...l,nodes:l.nodes}))})},Te=({id:e,onDrop:n,...a})=>r.jsx(Re,{id:e,onDrop:n??u("onDrop"),...a},`${e}-custom`),T=({nodes:e,onDrop:n,ignoreItemDoubleClick:a,expandOnSelect:t,...s})=>o.createElement(W,{...s,ignoreItemDoubleClick:a,expandOnSelect:t,key:s.id,onDrop:n??u("onDrop")},e==null?void 0:e.map(i=>T({...i,nodes:i.nodes,onDrop:n,ignoreItemDoubleClick:a,expandOnSelect:t}))),g=({nodes:e,label:n,numChildNodes:a,onDrop:t,...s})=>{const i=(e==null?void 0:e.length)??0,l=a!==void 0?!!a:i>0;return o.createElement(W,{...s,key:s.id,contentComponent:r.jsx(be,{title:n||"NO TITLE"}),onDrop:t??u("onDrop"),showCaret:l},e==null?void 0:e.map(g))},p=({...e})=>{const n={spacingY:e.spacingY,contentHight:e.contentHight,shadow:e.shadow,borderRadius:e.borderRadius,borderWidth:e.borderWidth,borderStyle:e.borderStyle,activeColorStyle:e.activeColorStyle,...e.itemStyle};return delete e.spacingY,delete e.contentHight,delete e.shadow,delete e.borderRadius,delete e.borderWidth,delete e.borderStyle,delete e.activeColorStyle,{...e,itemStyle:n}},b=({...e})=>{const n=()=>u("onDrop");return r.jsx(c,{maxWidth:"400px",children:r.jsx(d,{id:e.id,...p(e),children:y.map(a=>T({...a,onDrop:n}))})})},f=({...e})=>{const n=()=>u("onDrop");return r.jsx(c,{maxWidth:"400px",children:r.jsx(d,{id:e.id,...p(e),children:y.map(a=>Te({...a,onDrop:n}))})})},x=({...e})=>{const[n,a]=o.useState([]),t=i=>{a(l=>[...l,i])},s=i=>{a(l=>l.filter(m=>m!==i))};return r.jsx("div",{style:{position:"fixed",height:"800px",width:"800px",backgroundColor:"white"},children:r.jsx("div",{style:{width:"800px",height:"300px",overflow:"auto",position:"absolute"},children:r.jsx(d,{id:e.id,...p(e),expandedIds:n,onExpand:t,onShrink:s,children:y.map(T)})})})},h=({...e})=>r.jsx(c,{maxWidth:"400px",children:r.jsx(d,{id:e.id,...p(e),children:y.map(g)})}),q=({...e})=>{const[n,a]=o.useState([]),t=p(e);return o.useEffect(()=>{setTimeout(()=>{a([{id:"2-1",label:"Document Category 2",nodes:[{id:"2-1-1",label:"Home",type:"document-page"},{id:"2-1-2",label:"Members",type:"document-page"},{id:"2-1-3",label:"About us",type:"document-page"}],type:"document-category",accepts:["document-page","document-page-within","document-category"].join(", ")}])},500)},[]),r.jsx(c,{maxWidth:"400px",children:r.jsxs(d,{id:e.id,...t,children:[y.map(g),n.map(g)]})})},je=({...e})=>{const[n,a]=o.useState([]),[t]=Ce(n),s=l=>{a([...n,l])},i=l=>{a(n.filter(m=>m!==l))};return r.jsxs(d,{id:e.id,...p(e),draggable:!0,expandedIds:n,onExpand:s,onShrink:i,children:[g({id:"first-fixed-tree-item",draggable:!1,label:"First Fixed TreeItem"}),t.length>0&&t.map(g),g({id:"last-fixed-tree-item",draggable:!1,label:"Last Fixed TreeItem"})]})},I=({...e})=>r.jsx(c,{maxWidth:"400px",children:r.jsx(je,{...e,id:"dynamic-navigation"})}),fe=o.memo(({label:e,numChildNodes:n,onDrop:a,...t})=>{const{isExpanded:s}=Ee(t.id),{nodes:i}=ve(t.id,s),l=o.useMemo(()=>i.map(v=>v),[i]),m=()=>u("onDrop");return r.jsx(W,{contentComponent:r.jsx(be,{title:e||"NO TITLE"}),onDrop:a??m,showCaret:!!n,...t,children:l.map(xe)})});fe.displayName="FondueStoryLazyLoadingTreeItem";const xe=({id:e,...n})=>r.jsx(fe,{id:`${e}-lazyloaded`,...n},`${e}-lazyloaded`),he=o.memo(({...e})=>{const[n,a]=o.useState([]),{nodes:t}=ve(void 0,!0,!0),s=m=>{a([...n,m])},i=m=>{a(n.filter(v=>v!==m))},l=()=>u("onDrop");return r.jsxs(d,{...e,draggable:!0,expandedIds:n,onExpand:s,onShrink:i,children:[g({id:"first-fixed-tree-item",draggable:!1,label:"First Fixed TreeItem",onDrop:l}),...t.map(xe),g({id:"last-fixed-tree-item",draggable:!1,label:"Last Fixed TreeItem",onDrop:l})]})});he.displayName="FondueStoryLazyLoadingTreeRoot";const w=({...e})=>r.jsx(he,{...p(e),id:"dynamic-navigation",children:null}),S=({...e})=>{const n=()=>u("onDrop");return r.jsx(c,{maxWidth:"400px",children:r.jsx(d,{id:e.id,...p(e),children:y.map(a=>T({...a,onDrop:n,ignoreItemDoubleClick:!0}))})})},k=({...e})=>{const n=()=>u("onDrop");return r.jsx(c,{maxWidth:"400px",children:r.jsx(d,{id:e.id,...p(e),children:y.map(a=>T({...a,onDrop:n,expandOnSelect:!0}))})})},N=({...e})=>{const[n,a]=o.useState([]),t=o.useRef(null),s=o.useCallback(v=>{a(E=>[...E,v])},[]),i=o.useCallback(v=>{a(E=>E.filter(qe=>qe!==v))},[]),[l,m]=o.useState(!1);return r.jsxs(c,{maxWidth:"800px",children:[r.jsx(Ie,{ref:t,style:Se.Default,emphasis:we.Strong,onClick:()=>m(!l),children:"Click me"}),r.jsx(Ne,{anchor:t,open:l,modality:De.NonModal,enablePortal:!0,handleClose:()=>m(!1),children:r.jsx(ke,{children:r.jsx(d,{id:e.id,...p(e),expandedIds:n,onExpand:s,onShrink:i,children:y.map(T)})})})]})},Pe=e=>b(e),C=Pe.bind({});C.args={id:"storybook-tree",draggable:!0,selectedIds:["2"],dragHandlerPosition:"left",showDragHandlerOnHoverOnly:!0,showContentWhileDragging:!0,spacingY:"large",contentHight:"content-fit",shadow:"small",borderRadius:"large",borderWidth:"x-small",borderStyle:"solid",activeColorStyle:"soft"};b.__docgenInfo={description:"",methods:[],displayName:"WithLabel"};f.__docgenInfo={description:"",methods:[],displayName:"WithCustomTreeItem",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    spacingY?: TreeItemPropsSizing;
    contentHight?: TreeItemContentFit;
    shadow?: TreeItemPropsSizing;
    borderRadius?: TreeItemPropsSizing;
    borderWidth?: Exclude<TreeItemPropsSizing, 'x-large'>;
    borderStyle?: TreeItemBorderStyle;
    activeColorStyle?: TreeItemColors;
}`,signature:{properties:[{key:"spacingY",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"contentHight",value:{name:"union",raw:"'content-fit' | 'single-line'",elements:[{name:"literal",value:"'content-fit'"},{name:"literal",value:"'single-line'"}],required:!1}},{key:"shadow",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderRadius",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderWidth",value:{name:"Exclude",elements:[{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1},{name:"literal",value:"'x-large'"}],raw:"Exclude<TreeItemPropsSizing, 'x-large'>",required:!1}},{key:"borderStyle",value:{name:"union",raw:"'solid' | 'dashed' | 'dotted' | 'none'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dashed'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'none'"}],required:!1}},{key:"activeColorStyle",value:{name:"union",raw:"'neutral' | 'soft' | 'none'",elements:[{name:"literal",value:"'neutral'"},{name:"literal",value:"'soft'"},{name:"literal",value:"'none'"}],required:!1}}]}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string, ignoreRemoveSelected?: boolean, nodes?: TreeNodeWithoutElements[]) => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"boolean"},name:"ignoreRemoveSelected"},{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: string;
    level: number;
    parentId: string;
    extendedId: string;
    nodes: TreeNodeWithoutElements[];
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"level",value:{name:"number",required:!0}},{key:"parentId",value:{name:"string",required:!0}},{key:"extendedId",value:{name:"string",required:!0}},{key:"nodes",value:{name:"Array",elements:[{name:"TreeNodeWithoutElements"}],raw:"TreeNodeWithoutElements[]",required:!0}}]}}],raw:"TreeNodeWithoutElements[]"},name:"nodes"}],return:{name:"void"}}},description:""},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onShrink:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onDrop:{required:!1,tsType:{name:"signature",type:"function",raw:`(args: {
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};x.__docgenInfo={description:"",methods:[],displayName:"ScrollableWithLabel",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    spacingY?: TreeItemPropsSizing;
    contentHight?: TreeItemContentFit;
    shadow?: TreeItemPropsSizing;
    borderRadius?: TreeItemPropsSizing;
    borderWidth?: Exclude<TreeItemPropsSizing, 'x-large'>;
    borderStyle?: TreeItemBorderStyle;
    activeColorStyle?: TreeItemColors;
}`,signature:{properties:[{key:"spacingY",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"contentHight",value:{name:"union",raw:"'content-fit' | 'single-line'",elements:[{name:"literal",value:"'content-fit'"},{name:"literal",value:"'single-line'"}],required:!1}},{key:"shadow",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderRadius",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderWidth",value:{name:"Exclude",elements:[{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1},{name:"literal",value:"'x-large'"}],raw:"Exclude<TreeItemPropsSizing, 'x-large'>",required:!1}},{key:"borderStyle",value:{name:"union",raw:"'solid' | 'dashed' | 'dotted' | 'none'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dashed'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'none'"}],required:!1}},{key:"activeColorStyle",value:{name:"union",raw:"'neutral' | 'soft' | 'none'",elements:[{name:"literal",value:"'neutral'"},{name:"literal",value:"'soft'"},{name:"literal",value:"'none'"}],required:!1}}]}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string, ignoreRemoveSelected?: boolean, nodes?: TreeNodeWithoutElements[]) => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"boolean"},name:"ignoreRemoveSelected"},{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: string;
    level: number;
    parentId: string;
    extendedId: string;
    nodes: TreeNodeWithoutElements[];
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"level",value:{name:"number",required:!0}},{key:"parentId",value:{name:"string",required:!0}},{key:"extendedId",value:{name:"string",required:!0}},{key:"nodes",value:{name:"Array",elements:[{name:"TreeNodeWithoutElements"}],raw:"TreeNodeWithoutElements[]",required:!0}}]}}],raw:"TreeNodeWithoutElements[]"},name:"nodes"}],return:{name:"void"}}},description:""},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onShrink:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onDrop:{required:!1,tsType:{name:"signature",type:"function",raw:`(args: {
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};h.__docgenInfo={description:"",methods:[],displayName:"WithBasicItem",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    spacingY?: TreeItemPropsSizing;
    contentHight?: TreeItemContentFit;
    shadow?: TreeItemPropsSizing;
    borderRadius?: TreeItemPropsSizing;
    borderWidth?: Exclude<TreeItemPropsSizing, 'x-large'>;
    borderStyle?: TreeItemBorderStyle;
    activeColorStyle?: TreeItemColors;
}`,signature:{properties:[{key:"spacingY",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"contentHight",value:{name:"union",raw:"'content-fit' | 'single-line'",elements:[{name:"literal",value:"'content-fit'"},{name:"literal",value:"'single-line'"}],required:!1}},{key:"shadow",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderRadius",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderWidth",value:{name:"Exclude",elements:[{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1},{name:"literal",value:"'x-large'"}],raw:"Exclude<TreeItemPropsSizing, 'x-large'>",required:!1}},{key:"borderStyle",value:{name:"union",raw:"'solid' | 'dashed' | 'dotted' | 'none'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dashed'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'none'"}],required:!1}},{key:"activeColorStyle",value:{name:"union",raw:"'neutral' | 'soft' | 'none'",elements:[{name:"literal",value:"'neutral'"},{name:"literal",value:"'soft'"},{name:"literal",value:"'none'"}],required:!1}}]}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string, ignoreRemoveSelected?: boolean, nodes?: TreeNodeWithoutElements[]) => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"boolean"},name:"ignoreRemoveSelected"},{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: string;
    level: number;
    parentId: string;
    extendedId: string;
    nodes: TreeNodeWithoutElements[];
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"level",value:{name:"number",required:!0}},{key:"parentId",value:{name:"string",required:!0}},{key:"extendedId",value:{name:"string",required:!0}},{key:"nodes",value:{name:"Array",elements:[{name:"TreeNodeWithoutElements"}],raw:"TreeNodeWithoutElements[]",required:!0}}]}}],raw:"TreeNodeWithoutElements[]"},name:"nodes"}],return:{name:"void"}}},description:""},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onShrink:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onDrop:{required:!1,tsType:{name:"signature",type:"function",raw:`(args: {
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};q.__docgenInfo={description:"",methods:[],displayName:"WithAwaitedItem",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    spacingY?: TreeItemPropsSizing;
    contentHight?: TreeItemContentFit;
    shadow?: TreeItemPropsSizing;
    borderRadius?: TreeItemPropsSizing;
    borderWidth?: Exclude<TreeItemPropsSizing, 'x-large'>;
    borderStyle?: TreeItemBorderStyle;
    activeColorStyle?: TreeItemColors;
}`,signature:{properties:[{key:"spacingY",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"contentHight",value:{name:"union",raw:"'content-fit' | 'single-line'",elements:[{name:"literal",value:"'content-fit'"},{name:"literal",value:"'single-line'"}],required:!1}},{key:"shadow",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderRadius",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderWidth",value:{name:"Exclude",elements:[{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1},{name:"literal",value:"'x-large'"}],raw:"Exclude<TreeItemPropsSizing, 'x-large'>",required:!1}},{key:"borderStyle",value:{name:"union",raw:"'solid' | 'dashed' | 'dotted' | 'none'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dashed'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'none'"}],required:!1}},{key:"activeColorStyle",value:{name:"union",raw:"'neutral' | 'soft' | 'none'",elements:[{name:"literal",value:"'neutral'"},{name:"literal",value:"'soft'"},{name:"literal",value:"'none'"}],required:!1}}]}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string, ignoreRemoveSelected?: boolean, nodes?: TreeNodeWithoutElements[]) => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"boolean"},name:"ignoreRemoveSelected"},{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: string;
    level: number;
    parentId: string;
    extendedId: string;
    nodes: TreeNodeWithoutElements[];
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"level",value:{name:"number",required:!0}},{key:"parentId",value:{name:"string",required:!0}},{key:"extendedId",value:{name:"string",required:!0}},{key:"nodes",value:{name:"Array",elements:[{name:"TreeNodeWithoutElements"}],raw:"TreeNodeWithoutElements[]",required:!0}}]}}],raw:"TreeNodeWithoutElements[]"},name:"nodes"}],return:{name:"void"}}},description:""},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onShrink:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onDrop:{required:!1,tsType:{name:"signature",type:"function",raw:`(args: {
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};I.__docgenInfo={description:"",methods:[],displayName:"WithDynamicNavigation",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    spacingY?: TreeItemPropsSizing;
    contentHight?: TreeItemContentFit;
    shadow?: TreeItemPropsSizing;
    borderRadius?: TreeItemPropsSizing;
    borderWidth?: Exclude<TreeItemPropsSizing, 'x-large'>;
    borderStyle?: TreeItemBorderStyle;
    activeColorStyle?: TreeItemColors;
}`,signature:{properties:[{key:"spacingY",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"contentHight",value:{name:"union",raw:"'content-fit' | 'single-line'",elements:[{name:"literal",value:"'content-fit'"},{name:"literal",value:"'single-line'"}],required:!1}},{key:"shadow",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderRadius",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderWidth",value:{name:"Exclude",elements:[{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1},{name:"literal",value:"'x-large'"}],raw:"Exclude<TreeItemPropsSizing, 'x-large'>",required:!1}},{key:"borderStyle",value:{name:"union",raw:"'solid' | 'dashed' | 'dotted' | 'none'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dashed'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'none'"}],required:!1}},{key:"activeColorStyle",value:{name:"union",raw:"'neutral' | 'soft' | 'none'",elements:[{name:"literal",value:"'neutral'"},{name:"literal",value:"'soft'"},{name:"literal",value:"'none'"}],required:!1}}]}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string, ignoreRemoveSelected?: boolean, nodes?: TreeNodeWithoutElements[]) => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"boolean"},name:"ignoreRemoveSelected"},{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: string;
    level: number;
    parentId: string;
    extendedId: string;
    nodes: TreeNodeWithoutElements[];
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"level",value:{name:"number",required:!0}},{key:"parentId",value:{name:"string",required:!0}},{key:"extendedId",value:{name:"string",required:!0}},{key:"nodes",value:{name:"Array",elements:[{name:"TreeNodeWithoutElements"}],raw:"TreeNodeWithoutElements[]",required:!0}}]}}],raw:"TreeNodeWithoutElements[]"},name:"nodes"}],return:{name:"void"}}},description:""},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onShrink:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onDrop:{required:!1,tsType:{name:"signature",type:"function",raw:`(args: {
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};w.__docgenInfo={description:"",methods:[],displayName:"CustomItemsWithLazyLoadedChildren",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    spacingY?: TreeItemPropsSizing;
    contentHight?: TreeItemContentFit;
    shadow?: TreeItemPropsSizing;
    borderRadius?: TreeItemPropsSizing;
    borderWidth?: Exclude<TreeItemPropsSizing, 'x-large'>;
    borderStyle?: TreeItemBorderStyle;
    activeColorStyle?: TreeItemColors;
}`,signature:{properties:[{key:"spacingY",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"contentHight",value:{name:"union",raw:"'content-fit' | 'single-line'",elements:[{name:"literal",value:"'content-fit'"},{name:"literal",value:"'single-line'"}],required:!1}},{key:"shadow",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderRadius",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderWidth",value:{name:"Exclude",elements:[{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1},{name:"literal",value:"'x-large'"}],raw:"Exclude<TreeItemPropsSizing, 'x-large'>",required:!1}},{key:"borderStyle",value:{name:"union",raw:"'solid' | 'dashed' | 'dotted' | 'none'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dashed'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'none'"}],required:!1}},{key:"activeColorStyle",value:{name:"union",raw:"'neutral' | 'soft' | 'none'",elements:[{name:"literal",value:"'neutral'"},{name:"literal",value:"'soft'"},{name:"literal",value:"'none'"}],required:!1}}]}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string, ignoreRemoveSelected?: boolean, nodes?: TreeNodeWithoutElements[]) => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"boolean"},name:"ignoreRemoveSelected"},{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: string;
    level: number;
    parentId: string;
    extendedId: string;
    nodes: TreeNodeWithoutElements[];
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"level",value:{name:"number",required:!0}},{key:"parentId",value:{name:"string",required:!0}},{key:"extendedId",value:{name:"string",required:!0}},{key:"nodes",value:{name:"Array",elements:[{name:"TreeNodeWithoutElements"}],raw:"TreeNodeWithoutElements[]",required:!0}}]}}],raw:"TreeNodeWithoutElements[]"},name:"nodes"}],return:{name:"void"}}},description:""},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onShrink:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onDrop:{required:!1,tsType:{name:"signature",type:"function",raw:`(args: {
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"WithCancelSelectionOnDoubleClick",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    spacingY?: TreeItemPropsSizing;
    contentHight?: TreeItemContentFit;
    shadow?: TreeItemPropsSizing;
    borderRadius?: TreeItemPropsSizing;
    borderWidth?: Exclude<TreeItemPropsSizing, 'x-large'>;
    borderStyle?: TreeItemBorderStyle;
    activeColorStyle?: TreeItemColors;
}`,signature:{properties:[{key:"spacingY",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"contentHight",value:{name:"union",raw:"'content-fit' | 'single-line'",elements:[{name:"literal",value:"'content-fit'"},{name:"literal",value:"'single-line'"}],required:!1}},{key:"shadow",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderRadius",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderWidth",value:{name:"Exclude",elements:[{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1},{name:"literal",value:"'x-large'"}],raw:"Exclude<TreeItemPropsSizing, 'x-large'>",required:!1}},{key:"borderStyle",value:{name:"union",raw:"'solid' | 'dashed' | 'dotted' | 'none'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dashed'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'none'"}],required:!1}},{key:"activeColorStyle",value:{name:"union",raw:"'neutral' | 'soft' | 'none'",elements:[{name:"literal",value:"'neutral'"},{name:"literal",value:"'soft'"},{name:"literal",value:"'none'"}],required:!1}}]}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string, ignoreRemoveSelected?: boolean, nodes?: TreeNodeWithoutElements[]) => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"boolean"},name:"ignoreRemoveSelected"},{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: string;
    level: number;
    parentId: string;
    extendedId: string;
    nodes: TreeNodeWithoutElements[];
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"level",value:{name:"number",required:!0}},{key:"parentId",value:{name:"string",required:!0}},{key:"extendedId",value:{name:"string",required:!0}},{key:"nodes",value:{name:"Array",elements:[{name:"TreeNodeWithoutElements"}],raw:"TreeNodeWithoutElements[]",required:!0}}]}}],raw:"TreeNodeWithoutElements[]"},name:"nodes"}],return:{name:"void"}}},description:""},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onShrink:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onDrop:{required:!1,tsType:{name:"signature",type:"function",raw:`(args: {
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};k.__docgenInfo={description:"",methods:[],displayName:"WithExpandOnSelect",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    spacingY?: TreeItemPropsSizing;
    contentHight?: TreeItemContentFit;
    shadow?: TreeItemPropsSizing;
    borderRadius?: TreeItemPropsSizing;
    borderWidth?: Exclude<TreeItemPropsSizing, 'x-large'>;
    borderStyle?: TreeItemBorderStyle;
    activeColorStyle?: TreeItemColors;
}`,signature:{properties:[{key:"spacingY",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"contentHight",value:{name:"union",raw:"'content-fit' | 'single-line'",elements:[{name:"literal",value:"'content-fit'"},{name:"literal",value:"'single-line'"}],required:!1}},{key:"shadow",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderRadius",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderWidth",value:{name:"Exclude",elements:[{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1},{name:"literal",value:"'x-large'"}],raw:"Exclude<TreeItemPropsSizing, 'x-large'>",required:!1}},{key:"borderStyle",value:{name:"union",raw:"'solid' | 'dashed' | 'dotted' | 'none'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dashed'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'none'"}],required:!1}},{key:"activeColorStyle",value:{name:"union",raw:"'neutral' | 'soft' | 'none'",elements:[{name:"literal",value:"'neutral'"},{name:"literal",value:"'soft'"},{name:"literal",value:"'none'"}],required:!1}}]}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string, ignoreRemoveSelected?: boolean, nodes?: TreeNodeWithoutElements[]) => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"boolean"},name:"ignoreRemoveSelected"},{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: string;
    level: number;
    parentId: string;
    extendedId: string;
    nodes: TreeNodeWithoutElements[];
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"level",value:{name:"number",required:!0}},{key:"parentId",value:{name:"string",required:!0}},{key:"extendedId",value:{name:"string",required:!0}},{key:"nodes",value:{name:"Array",elements:[{name:"TreeNodeWithoutElements"}],raw:"TreeNodeWithoutElements[]",required:!0}}]}}],raw:"TreeNodeWithoutElements[]"},name:"nodes"}],return:{name:"void"}}},description:""},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onShrink:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onDrop:{required:!1,tsType:{name:"signature",type:"function",raw:`(args: {
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};N.__docgenInfo={description:"",methods:[],displayName:"InsideInlineDialog",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    spacingY?: TreeItemPropsSizing;
    contentHight?: TreeItemContentFit;
    shadow?: TreeItemPropsSizing;
    borderRadius?: TreeItemPropsSizing;
    borderWidth?: Exclude<TreeItemPropsSizing, 'x-large'>;
    borderStyle?: TreeItemBorderStyle;
    activeColorStyle?: TreeItemColors;
}`,signature:{properties:[{key:"spacingY",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"contentHight",value:{name:"union",raw:"'content-fit' | 'single-line'",elements:[{name:"literal",value:"'content-fit'"},{name:"literal",value:"'single-line'"}],required:!1}},{key:"shadow",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderRadius",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderWidth",value:{name:"Exclude",elements:[{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1},{name:"literal",value:"'x-large'"}],raw:"Exclude<TreeItemPropsSizing, 'x-large'>",required:!1}},{key:"borderStyle",value:{name:"union",raw:"'solid' | 'dashed' | 'dotted' | 'none'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dashed'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'none'"}],required:!1}},{key:"activeColorStyle",value:{name:"union",raw:"'neutral' | 'soft' | 'none'",elements:[{name:"literal",value:"'neutral'"},{name:"literal",value:"'soft'"},{name:"literal",value:"'none'"}],required:!1}}]}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string, ignoreRemoveSelected?: boolean, nodes?: TreeNodeWithoutElements[]) => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"boolean"},name:"ignoreRemoveSelected"},{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: string;
    level: number;
    parentId: string;
    extendedId: string;
    nodes: TreeNodeWithoutElements[];
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"level",value:{name:"number",required:!0}},{key:"parentId",value:{name:"string",required:!0}},{key:"extendedId",value:{name:"string",required:!0}},{key:"nodes",value:{name:"Array",elements:[{name:"TreeNodeWithoutElements"}],raw:"TreeNodeWithoutElements[]",required:!0}}]}}],raw:"TreeNodeWithoutElements[]"},name:"nodes"}],return:{name:"void"}}},description:""},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onShrink:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onDrop:{required:!1,tsType:{name:"signature",type:"function",raw:`(args: {
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}) => void`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};var z,A,L;b.parameters={...b.parameters,docs:{...(z=b.parameters)==null?void 0:z.docs,source:{originalSource:`({
  ...args
}) => {
  const onDrop = () => action('onDrop');
  return <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map(item => renderTreeItemLabel({
        ...item,
        onDrop
      }))}
            </TreeView>
        </Container>;
}`,...(L=(A=b.parameters)==null?void 0:A.docs)==null?void 0:L.source}}};var M,_,B;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  const onDrop = () => action('onDrop');
  return <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map(item => renderCustomTreeItem({
        ...item,
        onDrop
      }))}
            </TreeView>
        </Container>;
}`,...(B=(_=f.parameters)==null?void 0:_.docs)==null?void 0:B.source}}};var Y,F,V;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const handleItemExpand = (id: string) => {
    setExpandedIds(ids => [...ids, id]);
  };
  const handleItemShrink = (id: string) => {
    setExpandedIds(ids => ids.filter((itemId: string) => itemId !== id));
  };
  return <div style={{
    position: 'fixed',
    height: '800px',
    width: '800px',
    backgroundColor: 'white'
  }}>
            <div style={{
      width: '800px',
      height: '300px',
      overflow: 'auto',
      position: 'absolute'
    }}>
                <TreeView id={args.id} {...cleanProps(args)} expandedIds={expandedIds} onExpand={handleItemExpand} onShrink={handleItemShrink}>
                    {treeItemsMock.map(renderTreeItemLabel)}
                </TreeView>
            </div>
        </div>;
}`,...(V=(F=x.parameters)==null?void 0:F.docs)==null?void 0:V.source}}};var $,U,K;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  return <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map(renderTreeItemComponent)}
            </TreeView>
        </Container>;
}`,...(K=(U=h.parameters)==null?void 0:U.docs)==null?void 0:K.source}}};var G,J,Q;q.parameters={...q.parameters,docs:{...(G=q.parameters)==null?void 0:G.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  const [awaitedItems, setAwaitedItems] = useState<TreeItemMock[]>([]);
  const cleanArgs = cleanProps(args);
  useEffect(() => {
    setTimeout(() => {
      setAwaitedItems([{
        id: '2-1',
        label: 'Document Category 2',
        nodes: [{
          id: '2-1-1',
          label: 'Home',
          type: 'document-page'
        }, {
          id: '2-1-2',
          label: 'Members',
          type: 'document-page'
        }, {
          id: '2-1-3',
          label: 'About us',
          type: 'document-page'
        }],
        type: 'document-category',
        accepts: ['document-page', 'document-page-within', 'document-category'].join(', ')
      }]);
    }, 500);
  }, []);
  return <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanArgs}>
                {treeItemsMock.map(renderTreeItemComponent)}
                {awaitedItems.map(renderTreeItemComponent)}
            </TreeView>
        </Container>;
}`,...(Q=(J=q.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,Z,ee;I.parameters={...I.parameters,docs:{...(X=I.parameters)==null?void 0:X.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  return <Container maxWidth="400px">
            <DynamicNavigation {...args} id="dynamic-navigation" />
        </Container>;
}`,...(ee=(Z=I.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ne,ae,re;w.parameters={...w.parameters,docs:{...(ne=w.parameters)==null?void 0:ne.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  return <LazyLoadingTreeRoot {...cleanProps(args)} id="dynamic-navigation">
            {null}
        </LazyLoadingTreeRoot>;
}`,...(re=(ae=w.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var te,le,ie;S.parameters={...S.parameters,docs:{...(te=S.parameters)==null?void 0:te.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  const onDrop = () => action('onDrop');
  return <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map(item => renderTreeItemLabel({
        ...item,
        onDrop,
        ignoreItemDoubleClick: true
      }))}
            </TreeView>
        </Container>;
}`,...(ie=(le=S.parameters)==null?void 0:le.docs)==null?void 0:ie.source}}};var se,oe,me;k.parameters={...k.parameters,docs:{...(se=k.parameters)==null?void 0:se.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  const onDrop = () => action('onDrop');
  return <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map(item => renderTreeItemLabel({
        ...item,
        onDrop,
        expandOnSelect: true
      }))}
            </TreeView>
        </Container>;
}`,...(me=(oe=k.parameters)==null?void 0:oe.docs)==null?void 0:me.source}}};var de,ue,pe;N.parameters={...N.parameters,docs:{...(de=N.parameters)==null?void 0:de.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const dialogTriggerRef = useRef<HTMLButtonElement | null>(null);
  const handleItemExpand = useCallback((id: string) => {
    setExpandedIds(ids => [...ids, id]);
  }, []);
  const handleItemShrink = useCallback((id: string) => {
    setExpandedIds(ids => ids.filter((itemId: string) => itemId !== id));
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  return <Container maxWidth="800px">
            <Button ref={dialogTriggerRef} style={ButtonStyle.Default} emphasis={ButtonEmphasis.Strong} onClick={() => setIsOpen(!isOpen)}>
                Click me
            </Button>
            <InlineDialog anchor={dialogTriggerRef} open={isOpen} modality={Modality.NonModal} enablePortal handleClose={() => setIsOpen(false)}>
                <DialogBody>
                    <TreeView id={args.id} {...cleanProps(args)} expandedIds={expandedIds} onExpand={handleItemExpand} onShrink={handleItemShrink}>
                        {treeItemsMock.map(renderTreeItemLabel)}
                    </TreeView>
                </DialogBody>
            </InlineDialog>
        </Container>;
}`,...(pe=(ue=N.parameters)==null?void 0:ue.docs)==null?void 0:pe.source}}};var ge,ce,ye;C.parameters={...C.parameters,docs:{...(ge=C.parameters)==null?void 0:ge.docs,source:{originalSource:`args => {
  return WithLabel(args);
}`,...(ye=(ce=C.parameters)==null?void 0:ce.docs)==null?void 0:ye.source}}};const Ln=["WithLabel","WithCustomTreeItem","ScrollableWithLabel","WithBasicItem","WithAwaitedItem","WithDynamicNavigation","CustomItemsWithLazyLoadedChildren","WithCancelSelectionOnDoubleClick","WithExpandOnSelect","InsideInlineDialog","WithTreeItemsStyled"];export{w as CustomItemsWithLazyLoadedChildren,N as InsideInlineDialog,x as ScrollableWithLabel,q as WithAwaitedItem,h as WithBasicItem,S as WithCancelSelectionOnDoubleClick,f as WithCustomTreeItem,I as WithDynamicNavigation,k as WithExpandOnSelect,b as WithLabel,C as WithTreeItemsStyled,Ln as __namedExportsOrder,An as default};
