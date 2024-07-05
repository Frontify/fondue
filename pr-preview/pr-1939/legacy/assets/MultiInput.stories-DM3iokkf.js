import{j as t}from"./jsx-runtime-Nms4Y4qS.js";import{r as o}from"./index-BwDkhjyp.js";import{D as R,a as D}from"./Dropdown-CTG8V9Ey.js";import{M as T}from"./MenuItem-C9PA6k_H.js";import{T as i}from"./TextInput-D2gdfhfK.js";import{I as h}from"./IconIcon-BgR7AKTB.js";import{I as g}from"./IconSize-BcCrF_mi.js";import"./_commonjsHelpers-BosuxZz1.js";import"./useButton-DofEV6SJ.js";import"./useFocusable-CAGu0lKI.js";import"./useFocusRing-4Vnvtzpc.js";import"./SSRProvider-CYXx33DY.js";import"./chain-D5h1pgIF.js";import"./FocusScope-DYM0gkGr.js";import"./useOverlayTriggerState-Bq4IkdK0.js";import"./useControlledState-C0C-dzuH.js";import"./useMenuTrigger-BhJE1x_4.js";import"./useLabels-DH9bA-v0.js";import"./useLocalizedStringFormatter-D7Kogc_3.js";import"./context-C2PaECDE.js";import"./VisuallyHidden-YFPGrsWM.js";import"./helper-DdpWMU6g.js";import"./index-B8XB3FuZ.js";import"./isScrollable-Bts8_1NI.js";import"./SelectionManager-BuW52QpN.js";import"./useField-BhCfq6jD.js";import"./useFormValidationState-Vs0Uifwm.js";import"./usePopper-D9CaHHBx.js";import"./index-CfyPTyT-.js";import"./merge-DI-veSMP.js";import"./focusStyle-CBFElZiz.js";import"./LoadingCircle-CZrma5le.js";import"./Trigger-BkAUJNF7.js";import"./IconCaretDown-Cxrx1sF_.js";import"./IconCaretDown16-BGp5IVAI.js";import"./IconCross-Bt-I3opn.js";import"./IconExclamationMarkTriangle-CRTWkDyu.js";import"./IconExclamationMarkTriangle24-GqPjgFpk.js";import"./IconTrashBin-Bl46mt1V.js";import"./IconTrashBin16-qlTE457i.js";import"./IconTrashBin24-CvdAkIgz.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BTwPCJkS.js";import"./Portal-dPA1dSZg.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./IconCaretRight-CxmZKZHS.js";import"./IconCheckMark-CLvJH1sB.js";import"./elements-BOYmskOL.js";import"./IconEyeOff-Dzh4tjis.js";import"./LegacyTooltip-BsRDxGT9.js";import"./useLink-DorAuuFQ.js";import"./Button-CYWlMQhW.js";import"./IconExclamationMarkCircle-Cob4vb5T.js";import"./IconExclamationMarkCircle24-DpwtNT9z.js";import"./IconIcon16-27wsZPKI.js";import"./IconIcon24-C-aalyCY.js";var x=(s=>(s.Columns="Columns",s.Spider="Spider",s))(x||{});const d=({layout:s,spanLastItem:p,children:r,"data-test-id":u="multi-input"})=>{const e=o.Children.toArray(r);return t.jsxs("div",{"data-test-id":u,className:"tw-flex tw-gap-2 tw-w-full tw-flex-col",children:[s==="Columns"&&t.jsx("div",{"data-test-id":`${u}-grid-columns`,className:"tw-grid tw-grid-cols-2 tw-gap-2",children:e.map((a,m)=>t.jsx("div",{className:p&&m===e.length-1?"tw-col-span-2":"",children:a},m))}),s==="Spider"&&t.jsxs("div",{"data-test-id":`${u}-grid-spider`,className:"tw-grid tw-grid-cols-4 tw-gap-2",children:[e[0]&&t.jsx("div",{className:"tw-col-start-2 tw-col-span-2",children:e[0]}),e[1]&&t.jsx("div",{className:"tw-col-start-1 tw-col-span-2",children:e[1]}),e[2]&&t.jsx("div",{className:"tw-col-start-3 tw-col-span-2",children:e[2]}),e[3]&&t.jsx("div",{className:"tw-col-start-2 tw-col-span-2",children:e[3]})]})]})};d.displayName="FondueMultiInput";d.__docgenInfo={description:"",methods:[],displayName:"FondueMultiInput",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'multi-input'",computed:!1}}}};const Et={title:"Components/Multi Input",component:d,tags:["autodocs"],args:{layout:x.Columns,spanLastItem:!1},argTypes:{layout:{options:Object.values(x),control:{type:"radio"}}}},v=s=>{const[p,r]=o.useState("Some value"),[u,e]=o.useState("Some value"),[a,m]=o.useState("Some value"),[l,C]=o.useState("Some value");return t.jsxs(d,{...s,children:[t.jsx(i,{value:p,onChange:n=>r(n)}),t.jsx(i,{value:u,onChange:n=>e(n)}),t.jsx(i,{value:a,onChange:n=>m(n)}),t.jsx(i,{value:l,onChange:n=>C(n)})]})},S=s=>{const[p,r]=o.useState("Here's a value"),[u,e]=o.useState("And here's another one");return t.jsxs(d,{...s,children:[t.jsx(i,{value:p,onChange:a=>r(a)}),t.jsx(i,{value:u,onChange:a=>e(a)})]})},c=s=>{const[p,r]=o.useState("Some value"),[u,e]=o.useState("Some other value"),[a,m]=o.useState();return t.jsxs(d,{...s,children:[t.jsx(i,{value:p,onChange:l=>r(l)}),t.jsx(i,{value:u,onChange:l=>e(l)}),t.jsx(R,{onChange:l=>m(l),activeItemId:a,size:D.Small,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"This is an option",size:T.Small},{id:"2",title:"Another option",size:T.Small},{id:"3",title:"Third option",size:T.Small}]}]})]})};c.args={spanLastItem:!0};const I=s=>{const[p,r]=o.useState("8px"),[u,e]=o.useState("8px"),[a,m]=o.useState("8px"),[l,C]=o.useState("8px");return t.jsxs(d,{...s,children:[t.jsx(i,{decorator:t.jsx(h,{size:g.Size16}),value:p,onChange:n=>r(n)}),t.jsx(i,{decorator:t.jsx(h,{size:g.Size16}),value:u,onChange:n=>e(n)}),t.jsx(i,{decorator:t.jsx(h,{size:g.Size16}),value:a,onChange:n=>m(n)}),t.jsx(i,{decorator:t.jsx(h,{size:g.Size16}),value:l,onChange:n=>C(n)})]})};I.args={layout:x.Spider};v.__docgenInfo={description:"",methods:[],displayName:"MultiInputColumns",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"MultiInputTwoInputs",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};c.__docgenInfo={description:"",methods:[],displayName:"MultiInputThreeInputs",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};I.__docgenInfo={description:"",methods:[],displayName:"MultiInputSpider",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};var y,M,z;v.parameters={...v.parameters,docs:{...(y=v.parameters)==null?void 0:y.docs,source:{originalSource:`(args: MultiInputProps) => {
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
}`,...(z=(M=v.parameters)==null?void 0:M.docs)==null?void 0:z.source}}};var j,f,w;S.parameters={...S.parameters,docs:{...(j=S.parameters)==null?void 0:j.docs,source:{originalSource:`(args: MultiInputProps) => {
  const [input1, setInput1] = useState("Here's a value");
  const [input2, setInput2] = useState("And here's another one");
  return <MultiInputComponent {...args}>
            <TextInput value={input1} onChange={value => setInput1(value)} />
            <TextInput value={input2} onChange={value => setInput2(value)} />
        </MultiInputComponent>;
}`,...(w=(f=S.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var q,N,_;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`(args: MultiInputProps) => {
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
}`,...(A=(b=I.parameters)==null?void 0:b.docs)==null?void 0:A.source}}};const Bt=["MultiInputColumns","MultiInputTwoInputs","MultiInputThreeInputs","MultiInputSpider"];export{v as MultiInputColumns,I as MultiInputSpider,c as MultiInputThreeInputs,S as MultiInputTwoInputs,Bt as __namedExportsOrder,Et as default};