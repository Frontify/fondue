import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{a as c}from"./chain-DrsK4odg.js";import{r as I}from"./index-B2-qRKKC.js";import{L as r,s as M,r as p}from"./renderContent-BxaPFqXJ.js";import"./useEffectEvent-Bx4XsOxK.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./merge-DI-veSMP.js";import"./useFocusRing-T6RsE8HB.js";import"./focusStyle-BtNTXUM4.js";const O={title:"Components/Drop Zone",component:r,tags:["autodocs"],args:{dragDisabled:!1},argTypes:{onMove:{action:"onMove"}}},n=({onMove:s,dragDisabled:i})=>{const[o,u]=I.useState(M),a=t=>{const v=o.map(d=>{const m=t.find(h=>h.id===d.id);return m?{...m}:{...d}});u(v)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"tw-m-auto tw-w-[600px] tw-pb-6",children:e.jsx(r,{items:o,onMove:c(a,s),dragDisabled:i,renderContent:(...t)=>p(...t)})}),e.jsx("div",{className:"tw-m-auto tw-w-[600px]",children:e.jsx(r,{items:o,onMove:c(a,s),dragDisabled:i,renderContent:(...t)=>p(...t)})})]})};n.__docgenInfo={description:"",methods:[],displayName:"DropZoneWithOrderableList"};var f,l,g;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`({
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
}`,...(g=(l=n.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};const N=["DropZoneWithOrderableList"];export{n as DropZoneWithOrderableList,N as __namedExportsOrder,O as default};
