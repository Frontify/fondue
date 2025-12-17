import{j as e,r as c}from"./iframe-CdGc6rt-.js";import{a as V,b as W}from"./chain-CsMXX72K.js";import{m as A}from"./merge-DI-veSMP.js";import{T as Y,a as L,b as H,c as M,d as P,e as k,f as R}from"./Tree-Caw4PiJe.js";import{T as F}from"./TreeItem-BJCqOZvW.js";import"./preload-helper-2PZZeCBp.js";import"./useEffectEvent-DFTdwXCf.js";import"./focusStyle-6rwBDk7H.js";import"./index-B-6GQune.js";import"./index-DytxLiFv.js";var r=(n=>(n.Violet="Violet",n.Green="Green",n.Red="Red",n))(r||{});const K={[r.Violet]:"tw-text-violet-60",[r.Green]:"tw-text-green-60",[r.Red]:"tw-text-red-60"},i=({color:n,children:t})=>e.jsx("span",{className:A(["tw-font-medium",K[n]]),children:t}),z=[{id:"1",textContent:e.jsxs("p",{children:["The list rendering is completely customizable through the  ",e.jsx(i,{color:r.Green,children:"renderContent"})," callback prop, but also"," ",e.jsx(i,{color:r.Violet,children:"Tree"})," component functionality can be used for styling."]}),alt:"one",sort:1},{id:"3",textContent:e.jsxs("p",{children:["Use the ",e.jsx(i,{color:r.Green,children:"sort"})," property in the  ",e.jsx(i,{color:r.Green,children:"OrderableListItem"})," to determine the position of items items in the list."]}),alt:"three",sort:2},{id:"4",textContent:e.jsx("p",{children:"Items can contain multiple focusable elements."}),alt:"four",sort:null},{id:"7",textContent:e.jsxs("p",{children:["The dragHandler can be positioned to the ",e.jsx(i,{color:r.Green,children:"left"}),","," ",e.jsx(i,{color:r.Green,children:"right"}),", or"," ",e.jsx(i,{color:r.Green,children:"hide (none)"}),". When the setting is drag handler is set to ",e.jsx(i,{color:r.Green,children:"none"})," means that the whole lit item is draggable, otherwise only dragging from the handler will do the job."]}),alt:"seven",sort:3}],N=({textContent:n,id:t,onSelect:s})=>{const a=l=>{l.key==="Enter"&&s(t)};return e.jsxs("div",{role:"button",tabIndex:0,className:"tw-break-words tw-border tw-border-line tw-border-solid tw-rounded-md tw-p-3 tw-outline-none",onClick:()=>s(t),onKeyDown:a,children:[e.jsxs("div",{className:"tw-text-xs tw-text-black-60",children:["id: ",t]}),e.jsx("hr",{className:"tw-mt-2 tw-mb-2 tw-border-black-20 tw-bg-black-20"}),e.jsx("div",{children:n})]})};N.__docgenInfo={description:"",methods:[],displayName:"renderContent",props:{textContent:{required:!0,tsType:{name:"JSX.Element"},description:""},id:{required:!0,tsType:{name:"string"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""}}};const B=(n,t)=>n.sort===null&&t.sort===null||n.sort===null?1:t.sort===null?-1:n.sort-t.sort,J=(n,t,s)=>{const a=s.find(l=>l.id===n);return a?[{...a,sort:t}]:[]},w=({onMove:n,dragDisabled:t,items:s,dragHandlerPosition:a="none",enableDragDelay:l=!0,itemStyle:y,selectedId:b,renderContent:x,"data-test-id":f="orderable-list"})=>{const[h,v]=c.useState(s),C=V(),m=!t;c.useEffect(()=>{const o=[...s];o.sort(B),v(o)},[s]);const j=o=>{n(J(o.id,o.sort,h))},p=c.useMemo(()=>({spacingY:"small",contentHight:"content-fit",shadow:"small",borderRadius:"medium",borderWidth:"x-small",borderStyle:"solid",activeColorStyle:"soft",...y}),[y]);return e.jsx(Y,{draggable:m,id:C,onDrop:j,"data-test-id":f,selectedIds:b?[b]:[],itemStyle:p,showDragHandlerOnHoverOnly:!m,dragHandlerPosition:m?a:"none",showContentWhileDragging:!0,enableDragDelay:l,children:h.map(o=>{const I=`collection-item-${o.id}`;return e.jsx(F,{"data-test-id":`${f}-item`,id:o.id,type:"collection-item",accepts:"collection-item",expandable:!1,levelConstraint:0,contentComponent:x(o)},I)})})};w.displayName="FondueOrderableList";w.__docgenInfo={description:"",methods:[],displayName:"FondueOrderableList",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:`DraggableItem<T> & {
    alt: string;
}`,elements:[{name:"DraggableItem",elements:[{name:"T"}],raw:"DraggableItem<T>"},{name:"signature",type:"object",raw:`{
    alt: string;
}`,signature:{properties:[{key:"alt",value:{name:"string",required:!0}}]}}]}],raw:"OrderableListItem<T>[]"},description:""},dragDisabled:{required:!0,tsType:{name:"boolean"},description:""},dragHandlerPosition:{required:!1,tsType:{name:"DragHandlerPosition"},description:"",defaultValue:{value:"'none'",computed:!1}},itemStyle:{required:!1,tsType:{name:"TreeItemStyling"},description:""},selectedId:{required:!1,tsType:{name:"string"},description:""},onMove:{required:!0,tsType:{name:"signature",type:"function",raw:"(modifiedItems: DraggableItem<T>[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"DraggableItem",elements:[{name:"T"}],raw:"DraggableItem<T>"}],raw:"DraggableItem<T>[]"},name:"modifiedItems"}],return:{name:"void"}}},description:""},renderContent:{required:!0,tsType:{name:"signature",type:"function",raw:"(items: OrderableListItem<T>) => ReactElement",signature:{arguments:[{type:{name:"intersection",raw:`DraggableItem<T> & {
    alt: string;
}`,elements:[{name:"DraggableItem",elements:[{name:"T"}],raw:"DraggableItem<T>"},{name:"signature",type:"object",raw:`{
    alt: string;
}`,signature:{properties:[{key:"alt",value:{name:"string",required:!0}}]}}]},name:"items"}],return:{name:"ReactElement"}}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'orderable-list'",computed:!1}},enableDragDelay:{defaultValue:{value:"true",computed:!1},required:!1}}};const ae={title:"Legacy Components/Orderable List",component:w,tags:["autodocs"],args:{dragDisabled:!1,dragHandlerPosition:"right",enableDragDelay:!0,spacingY:"small",contentHight:"content-fit",shadow:"small",borderRadius:"medium",borderWidth:"x-small",borderStyle:"solid",activeColorStyle:"soft",selectedId:"3"},argTypes:{onMove:{action:"onMove"},selectedId:{type:"string"},dragHandlerPosition:{table:{category:"Item Options"},options:["left","right","none"],control:{type:"inline-radio"}},enableDragDelay:{table:{category:"Item Options"},defaultValue:!0,control:{type:"boolean"}},spacingY:{table:{category:"Item Style"},name:"itemStyle.spacingY",options:[...Object.keys(R)],mapping:[...Object.values(R)],control:{type:"inline-radio"}},contentHight:{table:{category:"Item Style"},name:"itemStyle.contentHight",options:["content-fit","single-line"],control:{type:"inline-radio"}},shadow:{table:{category:"Item Style"},name:"itemStyle.shadow",options:[...Object.keys(k)],mapping:[...Object.values(k)],control:{type:"inline-radio"}},borderRadius:{table:{category:"Item Style"},name:"itemStyle.borderRadius",options:[...Object.keys(P)],mapping:[...Object.values(P)],control:{type:"inline-radio"}},borderWidth:{table:{category:"Item Style"},name:"itemStyle.borderWidth",options:[...Object.keys(M)],mapping:[...Object.values(M)],control:{type:"inline-radio"}},borderStyle:{table:{category:"Item Style"},name:"itemStyle.borderStyle",options:[...Object.keys(H)],mapping:[...Object.values(H)],control:{type:"inline-radio"}},activeColorStyle:{table:{category:"Item Style"},name:"itemStyle.activeColorStyle",options:[...Object.keys(L)],mapping:[...Object.values(L)],control:{type:"inline-radio"}}},parameters:{docs:{description:{component:`### *Legacy component warning*
#### This is a unmaintained legacy component. It will be deprecated and replaced with a new component in an upcoming release.`}}}},g=({onMove:n,selectedId:t,dragDisabled:s,dragHandlerPosition:a,enableDragDelay:l,spacingY:y,contentHight:b,shadow:x,borderRadius:f,borderWidth:h,borderStyle:v,activeColorStyle:C})=>{const[m,j]=c.useState(z),p=c.useRef(t),[o,I]=c.useState(t);c.useEffect(()=>{p.current!==t&&(p.current=t,I(t))},[t,p]);const _=d=>{if(d.length===0)return;const S=d[0],u=[];let T=1,D=!0;for(const O of m)O.id!==S.id&&(u.length-1===S.sort&&(u.push(S),T++,D=!1),u.push({...O,sort:T}),T++);D&&u.push(S),j(u)},$=d=>{I(d)};return e.jsx("div",{className:"tw-m-auto tw-w-[600px] tw-pb-6",children:e.jsx(w,{items:m,onMove:W(_,n),dragDisabled:s,dragHandlerPosition:a,enableDragDelay:l,selectedId:o,itemStyle:{spacingY:y,contentHight:b,shadow:x,borderRadius:f,borderWidth:h,borderStyle:v,activeColorStyle:C},renderContent:(...d)=>N({textContent:d[0].textContent,id:d[0].id,onSelect:$})})})};g.__docgenInfo={description:"",methods:[],displayName:"OrderableList"};var q,E,G;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`({
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
}`,...(G=(E=g.parameters)==null?void 0:E.docs)==null?void 0:G.source}}};const ie=["OrderableList"];export{g as OrderableList,ie as __namedExportsOrder,ae as default};
