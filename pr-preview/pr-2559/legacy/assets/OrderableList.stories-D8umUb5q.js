import{j as e,r as m}from"./iframe-gG0jm5Gs.js";import{a as $,b as V}from"./chain-BFhKn55C.js";import{m as Y}from"./merge-DI-veSMP.js";import{T as z,a as q,b as D,c as L,d as N,e as P,f as H}from"./Tree-BDFiKayN.js";import{T as A}from"./TreeItem-B7sXF9OV.js";import"./preload-helper-xzzJIhxy.js";import"./useEffectEvent-N813LuON.js";import"./focusStyle-6rwBDk7H.js";import"./index-sx4glaJF.js";import"./index-BoiT_4tm.js";var r=(n=>(n.Violet="Violet",n.Green="Green",n.Red="Red",n))(r||{});const F={[r.Violet]:"tw-text-violet-60",[r.Green]:"tw-text-green-60",[r.Red]:"tw-text-red-60"},s=({color:n,children:t})=>e.jsx("span",{className:Y(["tw-font-medium",F[n]]),children:t}),B=[{id:"1",textContent:e.jsxs("p",{children:["The list rendering is completely customizable through the  ",e.jsx(s,{color:r.Green,children:"renderContent"})," callback prop, but also"," ",e.jsx(s,{color:r.Violet,children:"Tree"})," component functionality can be used for styling."]}),alt:"one",sort:1},{id:"3",textContent:e.jsxs("p",{children:["Use the ",e.jsx(s,{color:r.Green,children:"sort"})," property in the  ",e.jsx(s,{color:r.Green,children:"OrderableListItem"})," to determine the position of items items in the list."]}),alt:"three",sort:2},{id:"4",textContent:e.jsx("p",{children:"Items can contain multiple focusable elements."}),alt:"four",sort:null},{id:"7",textContent:e.jsxs("p",{children:["The dragHandler can be positioned to the ",e.jsx(s,{color:r.Green,children:"left"}),","," ",e.jsx(s,{color:r.Green,children:"right"}),", or"," ",e.jsx(s,{color:r.Green,children:"hide (none)"}),". When the setting is drag handler is set to ",e.jsx(s,{color:r.Green,children:"none"})," means that the whole lit item is draggable, otherwise only dragging from the handler will do the job."]}),alt:"seven",sort:3}],G=({textContent:n,id:t,onSelect:l})=>{const i=o=>{o.key==="Enter"&&l(t)};return e.jsxs("div",{role:"button",tabIndex:0,className:"tw-break-words tw-border tw-border-line tw-border-solid tw-rounded-md tw-p-3 tw-outline-none",onClick:()=>l(t),onKeyDown:i,children:[e.jsxs("div",{className:"tw-text-xs tw-text-black-60",children:["id: ",t]}),e.jsx("hr",{className:"tw-mt-2 tw-mb-2 tw-border-black-20 tw-bg-black-20"}),e.jsx("div",{children:n})]})};G.__docgenInfo={description:"",methods:[],displayName:"renderContent",props:{textContent:{required:!0,tsType:{name:"JSX.Element"},description:""},id:{required:!0,tsType:{name:"string"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""}}};const K=(n,t)=>n.sort===null&&t.sort===null||n.sort===null?1:t.sort===null?-1:n.sort-t.sort,J=(n,t,l)=>{const i=l.find(o=>o.id===n);return i?[{...i,sort:t}]:[]},w=({onMove:n,dragDisabled:t,items:l,dragHandlerPosition:i="none",enableDragDelay:o=!0,itemStyle:y,selectedId:b,renderContent:x,"data-test-id":f="orderable-list"})=>{const[v,S]=m.useState(l),T=$(),u=!t;m.useEffect(()=>{const a=[...l];a.sort(K),S(a)},[l]);const C=a=>{n(J(a.id,a.sort,v))},c=m.useMemo(()=>({spacingY:"small",contentHight:"content-fit",shadow:"small",borderRadius:"medium",borderWidth:"x-small",borderStyle:"solid",activeColorStyle:"soft",...y}),[y]);return e.jsx(z,{draggable:u,id:T,onDrop:C,"data-test-id":f,selectedIds:b?[b]:[],itemStyle:c,showDragHandlerOnHoverOnly:!u,dragHandlerPosition:u?i:"none",showContentWhileDragging:!0,enableDragDelay:o,children:v.map(a=>{const h=`collection-item-${a.id}`;return e.jsx(A,{"data-test-id":`${f}-item`,id:a.id,type:"collection-item",accepts:"collection-item",expandable:!1,levelConstraint:0,contentComponent:x(a)},h)})})};w.displayName="FondueOrderableList";w.__docgenInfo={description:"",methods:[],displayName:"FondueOrderableList",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:`DraggableItem<T> & {
    alt: string;
}`,elements:[{name:"intersection",raw:`T & {
    id: string;
    sort: Nullable<number>;
    type?: string;
    parentId?: string;
}`,elements:[{name:"T"},{name:"signature",type:"object",raw:`{
    id: string;
    sort: Nullable<number>;
    type?: string;
    parentId?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"sort",value:{name:"Nullable",elements:[{name:"number"}],raw:"Nullable<number>",required:!0}},{key:"type",value:{name:"string",required:!1}},{key:"parentId",value:{name:"string",required:!1}}]}}]},{name:"signature",type:"object",raw:`{
    alt: string;
}`,signature:{properties:[{key:"alt",value:{name:"string",required:!0}}]}}]}],raw:"OrderableListItem<T>[]"},description:""},dragDisabled:{required:!0,tsType:{name:"boolean"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'none'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'none'"}]},description:"",defaultValue:{value:"'none'",computed:!1}},itemStyle:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    spacingY?: TreeItemPropsSizing;
    contentHight?: TreeItemContentFit;
    shadow?: TreeItemPropsSizing;
    borderRadius?: TreeItemPropsSizing;
    borderWidth?: Exclude<TreeItemPropsSizing, 'x-large'>;
    borderStyle?: TreeItemBorderStyle;
    activeColorStyle?: TreeItemColors;
}`,signature:{properties:[{key:"spacingY",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"contentHight",value:{name:"union",raw:"'content-fit' | 'single-line'",elements:[{name:"literal",value:"'content-fit'"},{name:"literal",value:"'single-line'"}],required:!1}},{key:"shadow",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderRadius",value:{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1}},{key:"borderWidth",value:{name:"Exclude",elements:[{name:"union",raw:"'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'x-small'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"},{name:"literal",value:"'x-large'"}],required:!1},{name:"literal",value:"'x-large'"}],raw:"Exclude<TreeItemPropsSizing, 'x-large'>",required:!1}},{key:"borderStyle",value:{name:"union",raw:"'solid' | 'dashed' | 'dotted' | 'none'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dashed'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'none'"}],required:!1}},{key:"activeColorStyle",value:{name:"union",raw:"'neutral' | 'soft' | 'none'",elements:[{name:"literal",value:"'neutral'"},{name:"literal",value:"'soft'"},{name:"literal",value:"'none'"}],required:!1}}]}},description:""},selectedId:{required:!1,tsType:{name:"string"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(modifiedItems: DraggableItem<T>[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"intersection",raw:`T & {
    id: string;
    sort: Nullable<number>;
    type?: string;
    parentId?: string;
}`,elements:[{name:"T"},{name:"signature",type:"object",raw:`{
    id: string;
    sort: Nullable<number>;
    type?: string;
    parentId?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"sort",value:{name:"Nullable",elements:[{name:"number"}],raw:"Nullable<number>",required:!0}},{key:"type",value:{name:"string",required:!1}},{key:"parentId",value:{name:"string",required:!1}}]}}]}],raw:"DraggableItem<T>[]"},name:"modifiedItems"}],return:{name:"void"}}},description:""},renderContent:{required:!0,tsType:{name:"signature",type:"function",raw:"(items: OrderableListItem<T>) => ReactElement",signature:{arguments:[{type:{name:"intersection",raw:`DraggableItem<T> & {
    alt: string;
}`,elements:[{name:"intersection",raw:`T & {
    id: string;
    sort: Nullable<number>;
    type?: string;
    parentId?: string;
}`,elements:[{name:"T"},{name:"signature",type:"object",raw:`{
    id: string;
    sort: Nullable<number>;
    type?: string;
    parentId?: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"sort",value:{name:"Nullable",elements:[{name:"number"}],raw:"Nullable<number>",required:!0}},{key:"type",value:{name:"string",required:!1}},{key:"parentId",value:{name:"string",required:!1}}]}}]},{name:"signature",type:"object",raw:`{
    alt: string;
}`,signature:{properties:[{key:"alt",value:{name:"string",required:!0}}]}}]},name:"items"}],return:{name:"ReactElement"}}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'orderable-list'",computed:!1}},enableDragDelay:{defaultValue:{value:"true",computed:!1},required:!1}}};const ie={title:"Legacy Components/Orderable List",component:w,tags:["autodocs"],args:{dragDisabled:!1,dragHandlerPosition:"right",enableDragDelay:!0,spacingY:"small",contentHight:"content-fit",shadow:"small",borderRadius:"medium",borderWidth:"x-small",borderStyle:"solid",activeColorStyle:"soft",selectedId:"3"},argTypes:{onMove:{action:"onMove"},selectedId:{type:"string"},dragHandlerPosition:{table:{category:"Item Options"},options:["left","right","none"],control:{type:"inline-radio"}},enableDragDelay:{table:{category:"Item Options"},defaultValue:!0,control:{type:"boolean"}},spacingY:{table:{category:"Item Style"},name:"itemStyle.spacingY",options:[...Object.keys(H)],mapping:[...Object.values(H)],control:{type:"inline-radio"}},contentHight:{table:{category:"Item Style"},name:"itemStyle.contentHight",options:["content-fit","single-line"],control:{type:"inline-radio"}},shadow:{table:{category:"Item Style"},name:"itemStyle.shadow",options:[...Object.keys(P)],mapping:[...Object.values(P)],control:{type:"inline-radio"}},borderRadius:{table:{category:"Item Style"},name:"itemStyle.borderRadius",options:[...Object.keys(N)],mapping:[...Object.values(N)],control:{type:"inline-radio"}},borderWidth:{table:{category:"Item Style"},name:"itemStyle.borderWidth",options:[...Object.keys(L)],mapping:[...Object.values(L)],control:{type:"inline-radio"}},borderStyle:{table:{category:"Item Style"},name:"itemStyle.borderStyle",options:[...Object.keys(D)],mapping:[...Object.values(D)],control:{type:"inline-radio"}},activeColorStyle:{table:{category:"Item Style"},name:"itemStyle.activeColorStyle",options:[...Object.keys(q)],mapping:[...Object.values(q)],control:{type:"inline-radio"}}},parameters:{docs:{description:{component:`### *Legacy component warning*
#### This is a unmaintained legacy component. It will be deprecated and replaced with a new component in an upcoming release.`}}}},g=({onMove:n,selectedId:t,dragDisabled:l,dragHandlerPosition:i,enableDragDelay:o,spacingY:y,contentHight:b,shadow:x,borderRadius:f,borderWidth:v,borderStyle:S,activeColorStyle:T})=>{const[u,C]=m.useState(B),c=m.useRef(t),[a,h]=m.useState(t);m.useEffect(()=>{c.current!==t&&(c.current=t,h(t))},[t,c]);const W=d=>{if(d.length===0)return;const I=d[0],p=[];let j=1,O=!0;for(const k of u)k.id!==I.id&&(p.length-1===I.sort&&(p.push(I),j++,O=!1),p.push({...k,sort:j}),j++);O&&p.push(I),C(p)},_=d=>{h(d)};return e.jsx("div",{className:"tw-m-auto tw-w-[600px] tw-pb-6",children:e.jsx(w,{items:u,onMove:V(W,n),dragDisabled:l,dragHandlerPosition:i,enableDragDelay:o,selectedId:a,itemStyle:{spacingY:y,contentHight:b,shadow:x,borderRadius:f,borderWidth:v,borderStyle:S,activeColorStyle:T},renderContent:(...d)=>G({textContent:d[0].textContent,id:d[0].id,onSelect:_})})})};g.__docgenInfo={description:"",methods:[],displayName:"OrderableList"};var M,R,E;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`({
  onMove,
  selectedId,
  dragDisabled,
  dragHandlerPosition,
  enableDragDelay,
  spacingY,
  contentHight,
  shadow,
  borderRadius,
  borderWidth,
  borderStyle,
  activeColorStyle
}) => {
  const [items, setItems] = useState(storyItems);
  const prevSelectedId = useRef(selectedId);
  const [currentSelectedId, setCurrentSelectedId] = useState(selectedId);
  useEffect(() => {
    if (prevSelectedId.current !== selectedId) {
      prevSelectedId.current = selectedId;
      setCurrentSelectedId(selectedId);
    }
  }, [selectedId, prevSelectedId]);
  const handleMove = (modifiedItems: OrderableListItem<StoryListItem>[]) => {
    if (modifiedItems.length === 0) {
      return;
    }
    const modifiedItem = modifiedItems[0];
    const modifiedArray: OrderableListItem<StoryListItem>[] = [];
    let sort = 1;
    let isPageOnLastPosition = true;
    for (const item of items) {
      if (item.id === modifiedItem.id) {
        continue;
      }
      if (modifiedArray.length - 1 === modifiedItem.sort) {
        modifiedArray.push(modifiedItem);
        sort++;
        isPageOnLastPosition = false;
      }
      modifiedArray.push({
        ...item,
        sort
      });
      sort++;
    }
    if (isPageOnLastPosition) {
      modifiedArray.push(modifiedItem);
    }
    setItems(modifiedArray);
  };
  const handleSelect = (id: string) => {
    setCurrentSelectedId(id);
  };
  return <div className="tw-m-auto tw-w-[600px] tw-pb-6">
            <OrderableListComponent items={items} onMove={chain(handleMove, onMove)} dragDisabled={dragDisabled} dragHandlerPosition={dragHandlerPosition} enableDragDelay={enableDragDelay} selectedId={currentSelectedId} itemStyle={{
      spacingY,
      contentHight,
      shadow,
      borderRadius,
      borderWidth,
      borderStyle,
      activeColorStyle
    }} renderContent={(...args) => renderContent({
      textContent: args[0].textContent,
      id: args[0].id,
      onSelect: handleSelect
    })} />
        </div>;
}`,...(E=(R=g.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};const se=["OrderableList"];export{g as OrderableList,se as __namedExportsOrder,ie as default};
