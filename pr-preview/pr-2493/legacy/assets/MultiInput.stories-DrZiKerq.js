import{r as o,j as t}from"./iframe-CKSe3Fqe.js";import{D as k,c as R}from"./Dropdown-RYEb7gr6.js";import{M as C}from"./MenuItem-BL5l2ryH.js";import{T as u}from"./TextInput-Dz8QchSO.js";import{I as h}from"./IconIcon-S0zCvl6y.js";import{I as g}from"./IconSize-BcCrF_mi.js";import"./preload-helper-h55SgzPI.js";import"./useButton-DgyyYZg2.js";import"./useFocusable-DQCP7yek.js";import"./useFocusRing-BQoRK99m.js";import"./useEffectEvent-CiRKx17B.js";import"./chain-Dd3df6pO.js";import"./index-BPMpVAZo.js";import"./FocusScope-g4nBy1T5.js";import"./useOverlayTriggerState-BXRdEGhS.js";import"./useControlledState-DdOe7TCg.js";import"./useMenuTrigger-BBANgVXr.js";import"./useLabels-n-CMa9-N.js";import"./useLocalizedStringFormatter-BfOcmrtd.js";import"./context-DS6XwCl4.js";import"./VisuallyHidden-C-0myvF4.js";import"./helper-DhyHdWO2.js";import"./keyboard-fgHsnZ5J.js";import"./SelectionManager-3hucHCSe.js";import"./useField-BHFNPV93.js";import"./useFormValidationState-Tubgfymy.js";import"./usePopper-AUSlNj6G.js";import"./index-DAN2AmUJ.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./LoadingCircle-CtM1sAez.js";import"./Trigger-CdwHkVGq.js";import"./IconCaretDown-CYM-4S_c.js";import"./IconCaretDown16-Cq0_e1LD.js";import"./IconCross-BMzgP3k8.js";import"./IconExclamationMarkTriangle-DkY8FJQ1.js";import"./IconExclamationMarkTriangle24-DqG8_uUA.js";import"./IconTrashBin16-BwyJnQhs.js";import"./IconTrashBin24-Cg69eDvd.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DBduxGiL.js";import"./Portal-D2beUhEQ.js";import"./useMemoizedId-CzKriQUz.js";import"./IconCaretRight-BTLUY8GD.js";import"./IconCheckMark-DAilidFq.js";import"./elements-BOYmskOL.js";import"./LegacyTooltip-DDj7Pmgz.js";import"./useLink-NIXYB2di.js";import"./Button-BbgN8YT0.js";import"./IconExclamationMarkCircle24-BW3Bxg0w.js";import"./IconIcon16-BuXtuRb2.js";import"./IconIcon24-C01aB07W.js";var x=(s=>(s.Columns="Columns",s.Spider="Spider",s))(x||{});const d=({layout:s,spanLastItem:p,children:r,"data-test-id":i="multi-input"})=>{const e=o.Children.toArray(r);return t.jsxs("div",{"data-test-id":i,className:"tw-flex tw-gap-2 tw-w-full tw-flex-col",children:[s==="Columns"&&t.jsx("div",{"data-test-id":`${i}-grid-columns`,className:"tw-grid tw-grid-cols-2 tw-gap-2",children:e.map((a,m)=>t.jsx("div",{className:p&&m===e.length-1?"tw-col-span-2":"",children:a},m))}),s==="Spider"&&t.jsxs("div",{"data-test-id":`${i}-grid-spider`,className:"tw-grid tw-grid-cols-4 tw-gap-2",children:[e[0]?t.jsx("div",{className:"tw-col-start-2 tw-col-span-2",children:e[0]}):null,e[1]?t.jsx("div",{className:"tw-col-start-1 tw-col-span-2",children:e[1]}):null,e[2]?t.jsx("div",{className:"tw-col-start-3 tw-col-span-2",children:e[2]}):null,e[3]?t.jsx("div",{className:"tw-col-start-2 tw-col-span-2",children:e[3]}):null]})]})};d.displayName="FondueMultiInput";d.__docgenInfo={description:"@deprecated Use a Layout component from `frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md the migration guide}.",methods:[],displayName:"FondueMultiInput",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'multi-input'",computed:!1}}}};const kt={title:"Components/Multi Input",component:d,tags:["autodocs"],args:{layout:x.Columns,spanLastItem:!1},argTypes:{layout:{options:Object.values(x),control:{type:"radio"}}},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use a [new Layout component](/docs/current_layout-grid--documentation) instead."}}}},v=s=>{const[p,r]=o.useState("Some value"),[i,e]=o.useState("Some value"),[a,m]=o.useState("Some value"),[l,y]=o.useState("Some value");return t.jsxs(d,{...s,children:[t.jsx(u,{value:p,onChange:n=>r(n)}),t.jsx(u,{value:i,onChange:n=>e(n)}),t.jsx(u,{value:a,onChange:n=>m(n)}),t.jsx(u,{value:l,onChange:n=>y(n)})]})},S=s=>{const[p,r]=o.useState("Here's a value"),[i,e]=o.useState("And here's another one");return t.jsxs(d,{...s,children:[t.jsx(u,{value:p,onChange:a=>r(a)}),t.jsx(u,{value:i,onChange:a=>e(a)})]})},c=s=>{const[p,r]=o.useState("Some value"),[i,e]=o.useState("Some other value"),[a,m]=o.useState();return t.jsxs(d,{...s,children:[t.jsx(u,{value:p,onChange:l=>r(l)}),t.jsx(u,{value:i,onChange:l=>e(l)}),t.jsx(k,{onChange:l=>m(l),activeItemId:a,size:R.Small,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"This is an option",size:C.Small},{id:"2",title:"Another option",size:C.Small},{id:"3",title:"Third option",size:C.Small}]}]})]})};c.args={spanLastItem:!0};const I=s=>{const[p,r]=o.useState("8px"),[i,e]=o.useState("8px"),[a,m]=o.useState("8px"),[l,y]=o.useState("8px");return t.jsxs(d,{...s,children:[t.jsx(u,{decorator:t.jsx(h,{size:g.Size16}),value:p,onChange:n=>r(n)}),t.jsx(u,{decorator:t.jsx(h,{size:g.Size16}),value:i,onChange:n=>e(n)}),t.jsx(u,{decorator:t.jsx(h,{size:g.Size16}),value:a,onChange:n=>m(n)}),t.jsx(u,{decorator:t.jsx(h,{size:g.Size16}),value:l,onChange:n=>y(n)})]})};I.args={layout:x.Spider};v.__docgenInfo={description:"",methods:[],displayName:"MultiInputColumns",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"MultiInputTwoInputs",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};c.__docgenInfo={description:"",methods:[],displayName:"MultiInputThreeInputs",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};I.__docgenInfo={description:"",methods:[],displayName:"MultiInputSpider",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};var T,M,f;v.parameters={...v.parameters,docs:{...(T=v.parameters)==null?void 0:T.docs,source:{originalSource:`(args: MultiInputProps) => {
  const [input1, setInput1] = useState('Some value');
  const [input2, setInput2] = useState('Some value');
  const [input3, setInput3] = useState('Some value');
  const [input4, setInput4] = useState('Some value');
  return <MultiInputComponent {...args}>
            <TextInput value={input1} onChange={value => setInput1(value)} />
            <TextInput value={input2} onChange={value => setInput2(value)} />
            <TextInput value={input3} onChange={value => setInput3(value)} />
            <TextInput value={input4} onChange={value => setInput4(value)} />
        </MultiInputComponent>;
}`,...(f=(M=v.parameters)==null?void 0:M.docs)==null?void 0:f.source}}};var z,j,w;S.parameters={...S.parameters,docs:{...(z=S.parameters)==null?void 0:z.docs,source:{originalSource:`(args: MultiInputProps) => {
  const [input1, setInput1] = useState("Here's a value");
  const [input2, setInput2] = useState("And here's another one");
  return <MultiInputComponent {...args}>
            <TextInput value={input1} onChange={value => setInput1(value)} />
            <TextInput value={input2} onChange={value => setInput2(value)} />
        </MultiInputComponent>;
}`,...(w=(j=S.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var q,N,_;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`(args: MultiInputProps) => {
  const [input1, setInput1] = useState('Some value');
  const [input2, setInput2] = useState('Some other value');
  const [activeItemId, setActiveItemId] = useState<string | number | undefined>();
  return <MultiInputComponent {...args}>
            <TextInput value={input1} onChange={value => setInput1(value)} />
            <TextInput value={input2} onChange={value => setInput2(value)} />
            <Dropdown onChange={id => setActiveItemId(id)} activeItemId={activeItemId} size={DropdownSize.Small} menuBlocks={[{
      id: 'block1',
      menuItems: [{
        id: '1',
        title: 'This is an option',
        size: MenuItemContentSize.Small
      }, {
        id: '2',
        title: 'Another option',
        size: MenuItemContentSize.Small
      }, {
        id: '3',
        title: 'Third option',
        size: MenuItemContentSize.Small
      }]
    }]} />
        </MultiInputComponent>;
}`,...(_=(N=c.parameters)==null?void 0:N.docs)==null?void 0:_.source}}};var L,b,A;I.parameters={...I.parameters,docs:{...(L=I.parameters)==null?void 0:L.docs,source:{originalSource:`(args: MultiInputProps) => {
  const [input1, setInput1] = useState('8px');
  const [input2, setInput2] = useState('8px');
  const [input3, setInput3] = useState('8px');
  const [input4, setInput4] = useState('8px');
  return <MultiInputComponent {...args}>
            <TextInput decorator={<IconIcon size={IconSize.Size16} />} value={input1} onChange={value => setInput1(value)} />
            <TextInput decorator={<IconIcon size={IconSize.Size16} />} value={input2} onChange={value => setInput2(value)} />
            <TextInput decorator={<IconIcon size={IconSize.Size16} />} value={input3} onChange={value => setInput3(value)} />
            <TextInput decorator={<IconIcon size={IconSize.Size16} />} value={input4} onChange={value => setInput4(value)} />
        </MultiInputComponent>;
}`,...(A=(b=I.parameters)==null?void 0:b.docs)==null?void 0:A.source}}};const Rt=["MultiInputColumns","MultiInputTwoInputs","MultiInputThreeInputs","MultiInputSpider"];export{v as MultiInputColumns,I as MultiInputSpider,c as MultiInputThreeInputs,S as MultiInputTwoInputs,Rt as __namedExportsOrder,kt as default};
