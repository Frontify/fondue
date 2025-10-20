import{j as r,r as o}from"./iframe-BhuDJLWV.js";import{B as je,a as Pe,b as He}from"./Button-B-ZKF-CJ.js";import{C as y}from"./Container-zZWvDL96.js";import{m as Oe}from"./merge-DI-veSMP.js";import{d as ze,O as Ae,a as Le,M as R}from"./Overlay-CX_bUqVj.js";import{a as O,b as z,c as A,d as L,e as M,f as _,T as d}from"./Tree-Bv2ecSsb.js";import{t as v,u as Me,a as xe}from"./mocks-CS3h0jty.js";import{I as _e}from"./IconDocument-D0Qd1MG0.js";import{T as E,u as Ve}from"./TreeItem-BO_QMLE3.js";import"./preload-helper-BcldwPt0.js";import"./useButton-DFIg_-tx.js";import"./useFocusable-D6HbKAvw.js";import"./useFocusRing-CZPCyUk3.js";import"./useEffectEvent-D43V7X_F.js";import"./chain-4OGvqgIL.js";import"./index-N3sf9TLp.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-6rwBDk7H.js";import"./Box-DTt04oZp.js";import"./usePopper-BVEnGw7n.js";import"./index-D-IdEyg6.js";import"./EnablePortalWrapper-C5GnudQN.js";import"./Portal-C8kTP3XF.js";import"./useClickOutside-C1iwCU3N.js";import"./elements-BOYmskOL.js";import"./useMemoizedId-DfNdbn8X.js";import"./_Uint8Array-DY-L0TZN.js";import"./useDebounce-BbFJbUVc.js";const j=({children:e,maxHeight:a="auto",padding:n="none","data-test-id":t="fondue-dialog-body"})=>r.jsx("div",{"data-test-id":t,className:Oe(["tw-overflow-auto",ze[n]]),style:{maxHeight:a},children:e});j.displayName="FondueDialogBody";j.__docgenInfo={description:"@deprecated Use `Dialog` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.",methods:[],displayName:"FondueDialogBody",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},maxHeight:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"",defaultValue:{value:"'auto'",computed:!1}},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:"",defaultValue:{value:"'none'",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-dialog-body'",computed:!1}}}};const P=({children:e,open:a,anchor:n,placement:t="bottom-start",offset:s=[0,8],flip:i=!1,enablePortal:l=!0,maxHeight:m="auto",maxWidth:g=360,minHeight:T=0,minWidth:D=360,modality:H=R.Modal,handleClose:Ne,"data-test-id":Ce="fondue-inlineDialog",autoHeight:We=!1,roundedCorners:Ee=!0,width:De=360,unsafe_zIndex:Re=Le})=>r.jsx(Ae,{"data-test-id":Ce,open:a,anchor:n,placement:t,offset:s,flip:i,enablePortal:l,minWidth:D,minHeight:T,maxWidth:g,maxHeight:m,modality:H,handleClose:Ne,role:H===R.NonModal?"region":"dialog",autoHeight:We,roundedCorners:Ee,borderRadius:"small",shadow:"medium",width:De,isDialog:!0,zIndex:Re,children:e});P.displayName="FondueInlineDialog";P.__docgenInfo={description:"@deprecated Use `Flyout` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#flyout-old-inlinedialog the migration guide}.",methods:[],displayName:"FondueInlineDialog",props:{placement:{defaultValue:{value:"'bottom-start'",computed:!1},required:!1},offset:{defaultValue:{value:"[0, 8]",computed:!1},required:!1},flip:{defaultValue:{value:"false",computed:!1},required:!1},enablePortal:{defaultValue:{value:"true",computed:!1},required:!1},maxHeight:{defaultValue:{value:"'auto'",computed:!1},required:!1},maxWidth:{defaultValue:{value:"360",computed:!1},required:!1},minHeight:{defaultValue:{value:"0",computed:!1},required:!1},minWidth:{defaultValue:{value:"360",computed:!1},required:!1},modality:{defaultValue:{value:"Modality.Modal",computed:!0},required:!1},"data-test-id":{defaultValue:{value:"'fondue-inlineDialog'",computed:!1},required:!1},autoHeight:{defaultValue:{value:"false",computed:!1},required:!1},roundedCorners:{defaultValue:{value:"true",computed:!1},required:!1},width:{defaultValue:{value:"360",computed:!1},required:!1},unsafe_zIndex:{defaultValue:{value:"1200",computed:!1},required:!1}}};const{action:u}=__STORYBOOK_MODULE_ACTIONS__,ha={title:"Legacy Components/Tree",component:d,tags:["autodocs"],args:{id:"storybook-tree",draggable:!0,selectedIds:["2"],dragHandlerPosition:"left",showDragHandlerOnHoverOnly:!0,showContentWhileDragging:!1,spacingY:"none",contentHight:"single-line",shadow:"none",borderRadius:"small",borderWidth:"none",borderStyle:"none",activeColorStyle:"neutral"},argTypes:{draggable:{control:{type:"boolean"}},showDragHandlerOnHoverOnly:{table:{category:"Item Options"},control:{type:"boolean"}},showContentWhileDragging:{table:{category:"Item Options"},control:{type:"boolean"}},dragHandlerPosition:{table:{category:"Item Options"},options:["left","right","none"],control:{type:"inline-radio"}},spacingY:{table:{category:"Item Style"},name:"itemStyle.spacingY",options:[...Object.keys(_)],mapping:[...Object.values(_)],control:{type:"inline-radio"}},contentHight:{table:{category:"Item Style"},name:"itemStyle.contentHight",options:["content-fit","single-line"],control:{type:"inline-radio"}},shadow:{table:{category:"Item Style"},name:"itemStyle.shadow",options:[...Object.keys(M)],mapping:[...Object.values(M)],control:{type:"select"}},borderRadius:{table:{category:"Item Style"},name:"itemStyle.borderRadius",options:[...Object.keys(L)],mapping:[...Object.values(L)],control:{type:"select"}},borderWidth:{table:{category:"Item Style"},name:"itemStyle.borderWidth",options:[...Object.keys(A)],mapping:[...Object.values(A)],control:{type:"select"}},borderStyle:{table:{category:"Item Style"},name:"itemStyle.borderStyle",options:[...Object.keys(z)],mapping:[...Object.values(z)],control:{type:"select"}},activeColorStyle:{table:{category:"Item Style"},name:"itemStyle.activeColorStyle",options:[...Object.keys(O)],mapping:[...Object.values(O)],control:{type:"inline-radio"}},selectedIds:{control:{type:"object"}},expandedIds:{control:{type:"object"}}},parameters:{docs:{description:{component:`### *Legacy component warning*
#### This is a unmaintained legacy component. It will be deprecated and replaced with a new component in an upcoming release.`}}}},qe=({title:e})=>r.jsxs("div",{className:"tw-flex tw-space-x-1.5 tw-w-full",children:[r.jsx("span",{className:"tw-flex tw-justify-center tw-items-center tw-w-5",children:r.jsx(_e,{})}),r.jsx("span",{children:e})]}),Be=({label:e,contentComponent:a,nodes:n,...t})=>{const s=`${e} CUSTOM`,i=()=>u("onDrop");return r.jsx(E,{label:s,...t,onDrop:i,children:n==null?void 0:n.map(l=>Ie({...l,nodes:l.nodes}))})},Ie=({id:e,onDrop:a,...n})=>r.jsx(Be,{id:e,onDrop:a??u("onDrop"),...n},`${e}-custom`),b=({nodes:e,onDrop:a,ignoreItemDoubleClick:n,expandOnSelect:t,...s})=>o.createElement(E,{...s,ignoreItemDoubleClick:n,expandOnSelect:t,key:s.id,onDrop:a??u("onDrop")},e==null?void 0:e.map(i=>b({...i,nodes:i.nodes,onDrop:a,ignoreItemDoubleClick:n,expandOnSelect:t}))),c=({nodes:e,label:a,numChildNodes:n,onDrop:t,...s})=>{const i=(e==null?void 0:e.length)??0,l=n!==void 0?!!n:i>0;return o.createElement(E,{...s,key:s.id,contentComponent:r.jsx(qe,{title:a||"NO TITLE"}),onDrop:t??u("onDrop"),showCaret:l},e==null?void 0:e.map(c))},p=({...e})=>{const a={spacingY:e.spacingY,contentHight:e.contentHight,shadow:e.shadow,borderRadius:e.borderRadius,borderWidth:e.borderWidth,borderStyle:e.borderStyle,activeColorStyle:e.activeColorStyle,...e.itemStyle};return delete e.spacingY,delete e.contentHight,delete e.shadow,delete e.borderRadius,delete e.borderWidth,delete e.borderStyle,delete e.activeColorStyle,{...e,itemStyle:a}},f=({...e})=>{const a=()=>u("onDrop");return r.jsx(y,{maxWidth:"400px",children:r.jsx(d,{id:e.id,...p(e),children:v.map(n=>b({...n,onDrop:a}))})})},h=({...e})=>{const a=()=>u("onDrop");return r.jsx(y,{maxWidth:"400px",children:r.jsx(d,{id:e.id,...p(e),children:v.map(n=>Ie({...n,onDrop:a}))})})},x=({...e})=>{const[a,n]=o.useState([]),t=i=>{n(l=>[...l,i])},s=i=>{n(l=>l.filter(m=>m!==i))};return r.jsx("div",{style:{position:"fixed",height:"800px",width:"800px",backgroundColor:"white"},children:r.jsx("div",{style:{width:"800px",height:"300px",overflow:"auto",position:"absolute"},children:r.jsx(d,{id:e.id,...p(e),expandedIds:a,onExpand:t,onShrink:s,children:v.map(b)})})})},q=({...e})=>r.jsx(y,{maxWidth:"400px",children:r.jsx(d,{id:e.id,...p(e),children:v.map(c)})}),I=({...e})=>{const[a,n]=o.useState([]),t=p(e);return o.useEffect(()=>{setTimeout(()=>{n([{id:"2-1",label:"Document Category 2",nodes:[{id:"2-1-1",label:"Home",type:"document-page"},{id:"2-1-2",label:"Members",type:"document-page"},{id:"2-1-3",label:"About us",type:"document-page"}],type:"document-category",accepts:["document-page","document-page-within","document-category"].join(", ")}])},500)},[]),r.jsx(y,{maxWidth:"400px",children:r.jsxs(d,{id:e.id,...t,children:[v.map(c),a.map(c)]})})},Ye=({...e})=>{const[a,n]=o.useState([]),[t]=Me(a),s=l=>{n([...a,l])},i=l=>{n(a.filter(m=>m!==l))};return r.jsxs(d,{id:e.id,...p(e),draggable:!0,expandedIds:a,onExpand:s,onShrink:i,children:[c({id:"first-fixed-tree-item",draggable:!1,label:"First Fixed TreeItem"}),t.length>0&&t.map(c),c({id:"last-fixed-tree-item",draggable:!1,label:"Last Fixed TreeItem"})]})},w=({...e})=>r.jsx(y,{maxWidth:"400px",children:r.jsx(Ye,{...e,id:"dynamic-navigation"})}),we=o.memo(({label:e,numChildNodes:a,onDrop:n,...t})=>{const{isExpanded:s}=Ve(t.id),{nodes:i}=xe(t.id,s),l=o.useMemo(()=>i.map(g=>g),[i]),m=()=>u("onDrop");return r.jsx(E,{contentComponent:r.jsx(qe,{title:e||"NO TITLE"}),onDrop:n??m,showCaret:!!a,...t,children:l.map(Se)})});we.displayName="FondueStoryLazyLoadingTreeItem";const Se=({id:e,...a})=>r.jsx(we,{id:`${e}-lazyloaded`,...a},`${e}-lazyloaded`),ke=o.memo(({...e})=>{const[a,n]=o.useState([]),{nodes:t}=xe(void 0,!0,!0),s=m=>{n([...a,m])},i=m=>{n(a.filter(g=>g!==m))},l=()=>u("onDrop");return r.jsxs(d,{...e,draggable:!0,expandedIds:a,onExpand:s,onShrink:i,children:[c({id:"first-fixed-tree-item",draggable:!1,label:"First Fixed TreeItem",onDrop:l}),...t.map(Se),c({id:"last-fixed-tree-item",draggable:!1,label:"Last Fixed TreeItem",onDrop:l})]})});ke.displayName="FondueStoryLazyLoadingTreeRoot";const S=({...e})=>r.jsx(ke,{...p(e),id:"dynamic-navigation",children:null}),k=({...e})=>{const a=()=>u("onDrop");return r.jsx(y,{maxWidth:"400px",children:r.jsx(d,{id:e.id,...p(e),children:v.map(n=>b({...n,onDrop:a,ignoreItemDoubleClick:!0}))})})},N=({...e})=>{const a=()=>u("onDrop");return r.jsx(y,{maxWidth:"400px",children:r.jsx(d,{id:e.id,...p(e),children:v.map(n=>b({...n,onDrop:a,expandOnSelect:!0}))})})},C=({...e})=>{const[a,n]=o.useState([]),t=o.useRef(null),s=o.useCallback(g=>{n(T=>[...T,g])},[]),i=o.useCallback(g=>{n(T=>T.filter(D=>D!==g))},[]),[l,m]=o.useState(!1);return r.jsxs(y,{maxWidth:"800px",children:[r.jsx(je,{ref:t,style:He.Default,emphasis:Pe.Strong,onClick:()=>m(!l),children:"Click me"}),r.jsx(P,{anchor:t,open:l,modality:R.NonModal,enablePortal:!0,handleClose:()=>m(!1),children:r.jsx(j,{children:r.jsx(d,{id:e.id,...p(e),expandedIds:a,onExpand:s,onShrink:i,children:v.map(b)})})})]})},Fe=e=>f(e),W=Fe.bind({});W.args={id:"storybook-tree",draggable:!0,selectedIds:["2"],dragHandlerPosition:"left",showDragHandlerOnHoverOnly:!0,showContentWhileDragging:!0,spacingY:"large",contentHight:"content-fit",shadow:"small",borderRadius:"large",borderWidth:"x-small",borderStyle:"solid",activeColorStyle:"soft"};f.__docgenInfo={description:"",methods:[],displayName:"WithLabel"};h.__docgenInfo={description:"",methods:[],displayName:"WithCustomTreeItem",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};q.__docgenInfo={description:"",methods:[],displayName:"WithBasicItem",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};I.__docgenInfo={description:"",methods:[],displayName:"WithAwaitedItem",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};w.__docgenInfo={description:"",methods:[],displayName:"WithDynamicNavigation",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"CustomItemsWithLazyLoadedChildren",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};k.__docgenInfo={description:"",methods:[],displayName:"WithCancelSelectionOnDoubleClick",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};N.__docgenInfo={description:"",methods:[],displayName:"WithExpandOnSelect",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};C.__docgenInfo={description:"",methods:[],displayName:"InsideInlineDialog",props:{id:{required:!0,tsType:{name:"string"},description:""},draggable:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},multiselect:{required:!1,tsType:{name:"boolean"},description:""},selectedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},expandedIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:""},enableDragDelay:{required:!1,tsType:{name:"boolean"},description:""},showDragHandlerOnHoverOnly:{required:!1,tsType:{name:"boolean"},description:""},showContentWhileDragging:{required:!1,tsType:{name:"boolean"},description:""},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"parentId",value:{name:"Nullable",elements:[{name:"string"}],raw:"Nullable<string>",required:!0}},{key:"sort",value:{name:"number",required:!0}},{key:"contentComponent",value:{name:"Nullable",elements:[{name:"ReactNode"}],raw:"Nullable<ReactNode>",required:!0}},{key:"parentType",value:{name:"string",required:!1}}]}},name:"args"}],return:{name:"void"}}},description:""}}};var V,B,Y;f.parameters={...f.parameters,docs:{...(V=f.parameters)==null?void 0:V.docs,source:{originalSource:`({
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
}`,...(Y=(B=f.parameters)==null?void 0:B.docs)==null?void 0:Y.source}}};var F,G,U;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`({
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
}`,...(U=(G=h.parameters)==null?void 0:G.docs)==null?void 0:U.source}}};var $,K,X;x.parameters={...x.parameters,docs:{...($=x.parameters)==null?void 0:$.docs,source:{originalSource:`({
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
}`,...(X=(K=x.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};var Z,J,Q;q.parameters={...q.parameters,docs:{...(Z=q.parameters)==null?void 0:Z.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  return <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)}>
                {treeItemsMock.map(renderTreeItemComponent)}
            </TreeView>
        </Container>;
}`,...(Q=(J=q.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var ee,ae,ne;I.parameters={...I.parameters,docs:{...(ee=I.parameters)==null?void 0:ee.docs,source:{originalSource:`({
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
}`,...(ne=(ae=I.parameters)==null?void 0:ae.docs)==null?void 0:ne.source}}};var re,te,le;w.parameters={...w.parameters,docs:{...(re=w.parameters)==null?void 0:re.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  return <Container maxWidth="400px">
            <DynamicNavigation {...args} id="dynamic-navigation" />
        </Container>;
}`,...(le=(te=w.parameters)==null?void 0:te.docs)==null?void 0:le.source}}};var ie,se,oe;S.parameters={...S.parameters,docs:{...(ie=S.parameters)==null?void 0:ie.docs,source:{originalSource:`({
  ...args
}: TreeProps) => {
  return <LazyLoadingTreeRoot {...cleanProps(args)} id="dynamic-navigation">
            {null}
        </LazyLoadingTreeRoot>;
}`,...(oe=(se=S.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};var me,de,ue;k.parameters={...k.parameters,docs:{...(me=k.parameters)==null?void 0:me.docs,source:{originalSource:`({
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
}`,...(ue=(de=k.parameters)==null?void 0:de.docs)==null?void 0:ue.source}}};var pe,ge,ce;N.parameters={...N.parameters,docs:{...(pe=N.parameters)==null?void 0:pe.docs,source:{originalSource:`({
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
}`,...(ce=(ge=N.parameters)==null?void 0:ge.docs)==null?void 0:ce.source}}};var ye,ve,fe;C.parameters={...C.parameters,docs:{...(ye=C.parameters)==null?void 0:ye.docs,source:{originalSource:`({
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
}`,...(fe=(ve=C.parameters)==null?void 0:ve.docs)==null?void 0:fe.source}}};var be,Te,he;W.parameters={...W.parameters,docs:{...(be=W.parameters)==null?void 0:be.docs,source:{originalSource:`args => {
  return WithLabel(args);
}`,...(he=(Te=W.parameters)==null?void 0:Te.docs)==null?void 0:he.source}}};const xa=["WithLabel","WithCustomTreeItem","ScrollableWithLabel","WithBasicItem","WithAwaitedItem","WithDynamicNavigation","CustomItemsWithLazyLoadedChildren","WithCancelSelectionOnDoubleClick","WithExpandOnSelect","InsideInlineDialog","WithTreeItemsStyled"];export{S as CustomItemsWithLazyLoadedChildren,C as InsideInlineDialog,x as ScrollableWithLabel,I as WithAwaitedItem,q as WithBasicItem,k as WithCancelSelectionOnDoubleClick,h as WithCustomTreeItem,w as WithDynamicNavigation,N as WithExpandOnSelect,f as WithLabel,W as WithTreeItemsStyled,xa as __namedExportsOrder,ha as default};
