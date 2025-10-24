import{r as L,j as e}from"./iframe-DWfSlb0i.js";import{b as c}from"./chain-BD6ckHh_.js";import{L as s,s as I,r as p}from"./renderContent-CDCASlQP.js";import"./preload-helper-sQDyWCwb.js";import"./useEffectEvent-CI6MWEdz.js";import"./merge-DI-veSMP.js";import"./useFocusRing-DXr4GaW4.js";import"./focusStyle-Ch_WJ4aJ.js";const D={title:"Deprecated/Legacy Orderable List",component:s,tags:["autodocs"],args:{dragDisabled:!1},argTypes:{onMove:{action:"onMove"}}},r=({onMove:o,dragDisabled:a})=>{const[n,b]=L.useState(I),i=t=>{const u=n.map(d=>{const m=t.find(v=>v.id===d.id);return m?{...m}:{...d}});b(u)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"tw-m-auto tw-w-[600px] tw-pb-6",children:e.jsx(s,{items:n,onMove:c(i,o),dragDisabled:a,renderContent:(...t)=>p(...t)})}),e.jsx("div",{className:"tw-m-auto tw-w-[600px]",children:e.jsx(s,{items:n,onMove:c(i,o),dragDisabled:a,renderContent:(...t)=>p(...t)})})]})};r.__docgenInfo={description:"",methods:[],displayName:"LegacyOrderableList"};var l,g,f;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`({
  onMove,
  dragDisabled
}) => {
  const [items, setItems] = useState(storyItems);
  const handleMove = (modifiedItems: LegacyOrderableListItem<StoryListItem>[]) => {
    const modifiedArray = items.map(item => {
      const matchingModifiedItem = modifiedItems.find(modifiedItem => modifiedItem.id === item.id);
      if (matchingModifiedItem) {
        return {
          ...matchingModifiedItem
        };
      }
      return {
        ...item
      };
    });
    setItems(modifiedArray);
  };
  return <>
            <div className="tw-m-auto tw-w-[600px] tw-pb-6">
                <OrderableListComponent items={items} onMove={chain(handleMove, onMove)} dragDisabled={dragDisabled} renderContent={(...args) => renderContent(...args)} />
            </div>
            <div className="tw-m-auto tw-w-[600px]">
                <OrderableListComponent items={items} onMove={chain(handleMove, onMove)} dragDisabled={dragDisabled} renderContent={(...args) => renderContent(...args)} />
            </div>
        </>;
}`,...(f=(g=r.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};const N=["LegacyOrderableList"];export{r as LegacyOrderableList,N as __namedExportsOrder,D as default};
