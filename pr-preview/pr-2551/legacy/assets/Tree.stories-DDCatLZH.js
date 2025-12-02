import{j as r,r as o}from"./iframe-BxF2FGBq.js";import{C as c}from"./Container-C4azX5R9.js";import{a as W,b as E,c as D,d as R,e as j,f as P,T as m}from"./Tree-Dr7CDrBP.js";import{t as y,u as be,a as ue}from"./mocks-I3u-yo0A.js";import{I as Te}from"./IconDocument-CzIpccTG.js";import{T as N,u as xe}from"./TreeItem-BDszVNQh.js";import"./preload-helper-BM1FUv7X.js";import"./Box-Dtf-5p3q.js";import"./focusStyle-6rwBDk7H.js";import"./merge-DI-veSMP.js";import"./index-DSvGictn.js";import"./index-BwU8jf4Y.js";import"./IconSize-BcCrF_mi.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,ze={title:"Legacy Components/Tree",component:m,tags:["autodocs"],args:{id:"storybook-tree",draggable:!0,selectedIds:["2"],dragHandlerPosition:"left",showDragHandlerOnHoverOnly:!0,showContentWhileDragging:!1,spacingY:"none",contentHight:"single-line",shadow:"none",borderRadius:"small",borderWidth:"none",borderStyle:"none",activeColorStyle:"neutral"},argTypes:{draggable:{control:{type:"boolean"}},showDragHandlerOnHoverOnly:{table:{category:"Item Options"},control:{type:"boolean"}},showContentWhileDragging:{table:{category:"Item Options"},control:{type:"boolean"}},dragHandlerPosition:{table:{category:"Item Options"},options:["left","right","none"],control:{type:"inline-radio"}},spacingY:{table:{category:"Item Style"},name:"itemStyle.spacingY",options:[...Object.keys(P)],mapping:[...Object.values(P)],control:{type:"inline-radio"}},contentHight:{table:{category:"Item Style"},name:"itemStyle.contentHight",options:["content-fit","single-line"],control:{type:"inline-radio"}},shadow:{table:{category:"Item Style"},name:"itemStyle.shadow",options:[...Object.keys(j)],mapping:[...Object.values(j)],control:{type:"select"}},borderRadius:{table:{category:"Item Style"},name:"itemStyle.borderRadius",options:[...Object.keys(R)],mapping:[...Object.values(R)],control:{type:"select"}},borderWidth:{table:{category:"Item Style"},name:"itemStyle.borderWidth",options:[...Object.keys(D)],mapping:[...Object.values(D)],control:{type:"select"}},borderStyle:{table:{category:"Item Style"},name:"itemStyle.borderStyle",options:[...Object.keys(E)],mapping:[...Object.values(E)],control:{type:"select"}},activeColorStyle:{table:{category:"Item Style"},name:"itemStyle.activeColorStyle",options:[...Object.keys(W)],mapping:[...Object.values(W)],control:{type:"inline-radio"}},selectedIds:{control:{type:"object"}},expandedIds:{control:{type:"object"}}},parameters:{docs:{description:{component:`### *Legacy component warning*
#### This is a unmaintained legacy component. It will be deprecated and replaced with a new component in an upcoming release.`}}}},pe=({title:e})=>r.jsxs("div",{className:"tw-flex tw-space-x-1.5 tw-w-full",children:[r.jsx("span",{className:"tw-flex tw-justify-center tw-items-center tw-w-5",children:r.jsx(Te,{})}),r.jsx("span",{children:e})]}),fe=({label:e,contentComponent:n,nodes:a,...t})=>{const s=`${e} CUSTOM`,l=()=>d("onDrop");return r.jsx(N,{label:s,...t,onDrop:l,children:a==null?void 0:a.map(i=>ge({...i,nodes:i.nodes}))})},ge=({id:e,onDrop:n,...a})=>r.jsx(fe,{id:e,onDrop:n??d("onDrop"),...a},`${e}-custom`),k=({nodes:e,onDrop:n,ignoreItemDoubleClick:a,expandOnSelect:t,...s})=>o.createElement(N,{...s,ignoreItemDoubleClick:a,expandOnSelect:t,key:s.id,onDrop:n??d("onDrop")},e==null?void 0:e.map(l=>k({...l,nodes:l.nodes,onDrop:n,ignoreItemDoubleClick:a,expandOnSelect:t}))),p=({nodes:e,label:n,numChildNodes:a,onDrop:t,...s})=>{const l=(e==null?void 0:e.length)??0,i=a!==void 0?!!a:l>0;return o.createElement(N,{...s,key:s.id,contentComponent:r.jsx(pe,{title:n||"NO TITLE"}),onDrop:t??d("onDrop"),showCaret:i},e==null?void 0:e.map(p))},g=({...e})=>{const n={spacingY:e.spacingY,contentHight:e.contentHight,shadow:e.shadow,borderRadius:e.borderRadius,borderWidth:e.borderWidth,borderStyle:e.borderStyle,activeColorStyle:e.activeColorStyle,...e.itemStyle};return delete e.spacingY,delete e.contentHight,delete e.shadow,delete e.borderRadius,delete e.borderWidth,delete e.borderStyle,delete e.activeColorStyle,{...e,itemStyle:n}},v=({...e})=>{const n=()=>d("onDrop");return r.jsx(c,{maxWidth:"400px",children:r.jsx(m,{id:e.id,...g(e),children:y.map(a=>k({...a,onDrop:n}))})})},b=({...e})=>{const n=()=>d("onDrop");return r.jsx(c,{maxWidth:"400px",children:r.jsx(m,{id:e.id,...g(e),children:y.map(a=>ge({...a,onDrop:n}))})})},T=({...e})=>{const[n,a]=o.useState([]),t=l=>{a(i=>[...i,l])},s=l=>{a(i=>i.filter(u=>u!==l))};return r.jsx("div",{style:{position:"fixed",height:"800px",width:"800px",backgroundColor:"white"},children:r.jsx("div",{style:{width:"800px",height:"300px",overflow:"auto",position:"absolute"},children:r.jsx(m,{id:e.id,...g(e),expandedIds:n,onExpand:t,onShrink:s,children:y.map(k)})})})},x=({...e})=>r.jsx(c,{maxWidth:"400px",children:r.jsx(m,{id:e.id,...g(e),children:y.map(p)})}),f=({...e})=>{const[n,a]=o.useState([]),t=g(e);return o.useEffect(()=>{setTimeout(()=>{a([{id:"2-1",label:"Document Category 2",nodes:[{id:"2-1-1",label:"Home",type:"document-page"},{id:"2-1-2",label:"Members",type:"document-page"},{id:"2-1-3",label:"About us",type:"document-page"}],type:"document-category",accepts:["document-page","document-page-within","document-category"].join(", ")}])},500)},[]),r.jsx(c,{maxWidth:"400px",children:r.jsxs(m,{id:e.id,...t,children:[y.map(p),n.map(p)]})})},he=({...e})=>{const[n,a]=o.useState([]),[t]=be(n),s=i=>{a([...n,i])},l=i=>{a(n.filter(u=>u!==i))};return r.jsxs(m,{id:e.id,...g(e),draggable:!0,expandedIds:n,onExpand:s,onShrink:l,children:[p({id:"first-fixed-tree-item",draggable:!1,label:"First Fixed TreeItem"}),t.length>0&&t.map(p),p({id:"last-fixed-tree-item",draggable:!1,label:"Last Fixed TreeItem"})]})},h=({...e})=>r.jsx(c,{maxWidth:"400px",children:r.jsx(he,{...e,id:"dynamic-navigation"})}),ce=o.memo(({label:e,numChildNodes:n,onDrop:a,...t})=>{const{isExpanded:s}=xe(t.id),{nodes:l}=ue(t.id,s),i=o.useMemo(()=>l.map(C=>C),[l]),u=()=>d("onDrop");return r.jsx(N,{contentComponent:r.jsx(pe,{title:e||"NO TITLE"}),onDrop:a??u,showCaret:!!n,...t,children:i.map(ye)})});ce.displayName="FondueStoryLazyLoadingTreeItem";const ye=({id:e,...n})=>r.jsx(ce,{id:`${e}-lazyloaded`,...n},`${e}-lazyloaded`),ve=o.memo(({...e})=>{const[n,a]=o.useState([]),{nodes:t}=ue(void 0,!0,!0),s=u=>{a([...n,u])},l=u=>{a(n.filter(C=>C!==u))},i=()=>d("onDrop");return r.jsxs(m,{...e,draggable:!0,expandedIds:n,onExpand:s,onShrink:l,children:[p({id:"first-fixed-tree-item",draggable:!1,label:"First Fixed TreeItem",onDrop:i}),...t.map(ye),p({id:"last-fixed-tree-item",draggable:!1,label:"Last Fixed TreeItem",onDrop:i})]})});ve.displayName="FondueStoryLazyLoadingTreeRoot";const q=({...e})=>r.jsx(ve,{...g(e),id:"dynamic-navigation",children:null}),w=({...e})=>{const n=()=>d("onDrop");return r.jsx(c,{maxWidth:"400px",children:r.jsx(m,{id:e.id,...g(e),children:y.map(a=>k({...a,onDrop:n,ignoreItemDoubleClick:!0}))})})},I=({...e})=>{const n=()=>d("onDrop");return r.jsx(c,{maxWidth:"400px",children:r.jsx(m,{id:e.id,...g(e),children:y.map(a=>k({...a,onDrop:n,expandOnSelect:!0}))})})},qe=e=>v(e),S=qe.bind({});S.args={id:"storybook-tree",draggable:!0,selectedIds:["2"],dragHandlerPosition:"left",showDragHandlerOnHoverOnly:!0,showContentWhileDragging:!0,spacingY:"large",contentHight:"content-fit",shadow:"small",borderRadius:"large",borderWidth:"x-small",borderStyle:"solid",activeColorStyle:"soft"};v.__docgenInfo={description:"",methods:[],displayName:"WithLabel"};b.__docgenInfo={description:"",methods:[],displayName:"WithCustomTreeItem",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};T.__docgenInfo={description:"",methods:[],displayName:"ScrollableWithLabel",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};x.__docgenInfo={description:"",methods:[],displayName:"WithBasicItem",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};f.__docgenInfo={description:"",methods:[],displayName:"WithAwaitedItem",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};h.__docgenInfo={description:"",methods:[],displayName:"WithDynamicNavigation",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};q.__docgenInfo={description:"",methods:[],displayName:"CustomItemsWithLazyLoadedChildren",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};w.__docgenInfo={description:"",methods:[],displayName:"WithCancelSelectionOnDoubleClick",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};I.__docgenInfo={description:"",methods:[],displayName:"WithExpandOnSelect",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};var H,z,O;v.parameters={...v.parameters,docs:{...(H=v.parameters)==null?void 0:H.docs,source:{originalSource:`({
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
}`,...(O=(z=v.parameters)==null?void 0:z.docs)==null?void 0:O.source}}};var A,L,_;b.parameters={...b.parameters,docs:{...(A=b.parameters)==null?void 0:A.docs,source:{originalSource:`({
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
}`,...(_=(L=b.parameters)==null?void 0:L.docs)==null?void 0:_.source}}};var Y,M,F;T.parameters={...T.parameters,docs:{...(Y=T.parameters)==null?void 0:Y.docs,source:{originalSource:`({
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
}`,...(F=(M=T.parameters)==null?void 0:M.docs)==null?void 0:F.source}}};var B,V,$;x.parameters={...x.parameters,docs:{...(B=x.parameters)==null?void 0:B.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  return <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map(renderTreeItemComponent)}
            </TreeView>
        </Container>;
}`,...($=(V=x.parameters)==null?void 0:V.docs)==null?void 0:$.source}}};var U,K,G;f.parameters={...f.parameters,docs:{...(U=f.parameters)==null?void 0:U.docs,source:{originalSource:`({
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
}`,...(G=(K=f.parameters)==null?void 0:K.docs)==null?void 0:G.source}}};var J,Q,X;h.parameters={...h.parameters,docs:{...(J=h.parameters)==null?void 0:J.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  return <Container maxWidth="400px">
            <DynamicNavigation {...args} id="dynamic-navigation" />
        </Container>;
}`,...(X=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,ee,ne;q.parameters={...q.parameters,docs:{...(Z=q.parameters)==null?void 0:Z.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  return <LazyLoadingTreeRoot {...cleanProps(args)} id="dynamic-navigation">
            {null}
        </LazyLoadingTreeRoot>;
}`,...(ne=(ee=q.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var ae,re,te;w.parameters={...w.parameters,docs:{...(ae=w.parameters)==null?void 0:ae.docs,source:{originalSource:`({
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
}`,...(te=(re=w.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var le,ie,se;I.parameters={...I.parameters,docs:{...(le=I.parameters)==null?void 0:le.docs,source:{originalSource:`({
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
}`,...(se=(ie=I.parameters)==null?void 0:ie.docs)==null?void 0:se.source}}};var oe,me,de;S.parameters={...S.parameters,docs:{...(oe=S.parameters)==null?void 0:oe.docs,source:{originalSource:`args => {
  return WithLabel(args);
}`,...(de=(me=S.parameters)==null?void 0:me.docs)==null?void 0:de.source}}};const Oe=["WithLabel","WithCustomTreeItem","ScrollableWithLabel","WithBasicItem","WithAwaitedItem","WithDynamicNavigation","CustomItemsWithLazyLoadedChildren","WithCancelSelectionOnDoubleClick","WithExpandOnSelect","WithTreeItemsStyled"];export{q as CustomItemsWithLazyLoadedChildren,T as ScrollableWithLabel,f as WithAwaitedItem,x as WithBasicItem,w as WithCancelSelectionOnDoubleClick,b as WithCustomTreeItem,h as WithDynamicNavigation,I as WithExpandOnSelect,v as WithLabel,S as WithTreeItemsStyled,Oe as __namedExportsOrder,ze as default};
