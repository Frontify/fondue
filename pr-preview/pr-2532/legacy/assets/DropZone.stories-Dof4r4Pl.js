import{r as I,j as e}from"./iframe-C8H_7DY9.js";import{b as c}from"./chain-BXb1kVuv.js";import{L as r,s as M,r as p}from"./renderContent-BqOvU-S0.js";import"./preload-helper-DXpIkoC8.js";import"./useEffectEvent-VMJO_dOH.js";import"./merge-DI-veSMP.js";import"./useFocusRing-CJxA-gpa.js";import"./focusStyle-Ch_WJ4aJ.js";const Z={title:"Components/Drop Zone",component:r,tags:["autodocs"],args:{dragDisabled:!1},argTypes:{onMove:{action:"onMove"}}},n=({onMove:s,dragDisabled:i})=>{const[o,u]=I.useState(M),a=t=>{const v=o.map(d=>{const m=t.find(h=>h.id===d.id);return m?{...m}:{...d}});u(v)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"tw-m-auto tw-w-[600px] tw-pb-6",children:e.jsx(r,{items:o,onMove:c(a,s),dragDisabled:i,renderContent:(...t)=>p(...t)})}),e.jsx("div",{className:"tw-m-auto tw-w-[600px]",children:e.jsx(r,{items:o,onMove:c(a,s),dragDisabled:i,renderContent:(...t)=>p(...t)})})]})};n.__docgenInfo={description:"",methods:[],displayName:"DropZoneWithOrderableList"};var l,f,g;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`({
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
                <DropZoneComponent items={items} onMove={chain(handleMove, onMove)} dragDisabled={dragDisabled} renderContent={(...args) => renderContent(...args)} />
            </div>
            <div className="tw-m-auto tw-w-[600px]">
                <DropZoneComponent items={items} onMove={chain(handleMove, onMove)} dragDisabled={dragDisabled} renderContent={(...args) => renderContent(...args)} />
            </div>
        </>;
}`,...(g=(f=n.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};const O=["DropZoneWithOrderableList"];export{n as DropZoneWithOrderableList,O as __namedExportsOrder,Z as default};
