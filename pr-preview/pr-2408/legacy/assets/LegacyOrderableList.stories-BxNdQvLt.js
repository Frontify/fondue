import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{a as c}from"./chain-DrsK4odg.js";import{r as L}from"./index-B2-qRKKC.js";import{L as s,s as I,r as p}from"./renderContent-BxaPFqXJ.js";import"./useEffectEvent-Bx4XsOxK.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./merge-DI-veSMP.js";import"./useFocusRing-T6RsE8HB.js";import"./focusStyle-BtNTXUM4.js";const N={title:"Deprecated/Legacy Orderable List",component:s,tags:["autodocs"],args:{dragDisabled:!1},argTypes:{onMove:{action:"onMove"}}},r=({onMove:o,dragDisabled:a})=>{const[n,b]=L.useState(I),i=t=>{const u=n.map(d=>{const m=t.find(v=>v.id===d.id);return m?{...m}:{...d}});b(u)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"tw-m-auto tw-w-[600px] tw-pb-6",children:e.jsx(s,{items:n,onMove:c(i,o),dragDisabled:a,renderContent:(...t)=>p(...t)})}),e.jsx("div",{className:"tw-m-auto tw-w-[600px]",children:e.jsx(s,{items:n,onMove:c(i,o),dragDisabled:a,renderContent:(...t)=>p(...t)})})]})};r.__docgenInfo={description:"",methods:[],displayName:"LegacyOrderableList"};var l,f,g;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`({
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
}`,...(g=(f=r.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};const _=["LegacyOrderableList"];export{r as LegacyOrderableList,_ as __namedExportsOrder,N as default};
