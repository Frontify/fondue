import{r as o,j as t}from"./iframe-Bi_jfSnd.js";import{D as k,c as R}from"./Dropdown-CCvFu3K9.js";import{M as C}from"./MenuItem-Khlt57Pw.js";import{T as u}from"./TextInput-BYV0thMr.js";import{I as h}from"./IconIcon-CmUgOF70.js";import{I as g}from"./IconSize-BcCrF_mi.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-QBPONJkz.js";import"./useFocusable-BHWiTFLM.js";import"./useFocusRing-CQP_YSAQ.js";import"./useEffectEvent-zHRh56A3.js";import"./chain-CTs3wXrO.js";import"./index-Cl_29qdh.js";import"./FocusScope-CpCoYzyo.js";import"./useOverlayTriggerState-DSAU5ewh.js";import"./useControlledState-BgciVEFz.js";import"./useMenuTrigger-7dG_N6_K.js";import"./useLabels-DiC72Roz.js";import"./useLocalizedStringFormatter-D1dmmpfx.js";import"./context-C7MNOtJr.js";import"./VisuallyHidden-CoslJWhW.js";import"./helper-BGGyZPLj.js";import"./keyboard-C-NXuvu4.js";import"./SelectionManager-BFxNZJT_.js";import"./useField-CHYrgMmA.js";import"./useFormValidationState-BWEIozTf.js";import"./usePopper-hPvozz_f.js";import"./index-D7izUPt0.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./LoadingCircle-DeLs2a81.js";import"./Trigger-CFSxr8Ij.js";import"./IconCaretDown-DXMwG5TD.js";import"./IconCaretDown16-BBuXEcPp.js";import"./IconCross-B6ER-0OV.js";import"./IconExclamationMarkTriangle-BeXKyi0N.js";import"./IconExclamationMarkTriangle24-DbV4sldj.js";import"./IconTrashBin16-C0EoEvme.js";import"./IconTrashBin24-DzuIAFcI.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DT0NwmAe.js";import"./Portal-BK2M_YVZ.js";import"./useMemoizedId-mCaU_17l.js";import"./IconCaretRight-FNKrK0VN.js";import"./IconCheckMark-BD9LKDAE.js";import"./elements-BOYmskOL.js";import"./LegacyTooltip-CmBmbwCT.js";import"./useLink-BDIhzraw.js";import"./Button-B0gf8XMR.js";import"./IconExclamationMarkCircle24-DHU_uxqb.js";import"./IconIcon16-DWFc_9T8.js";import"./IconIcon24-DMrPVXpa.js";var x=(s=>(s.Columns="Columns",s.Spider="Spider",s))(x||{});const d=({layout:s,spanLastItem:p,children:r,"data-test-id":i="multi-input"})=>{const e=o.Children.toArray(r);return t.jsxs("div",{"data-test-id":i,className:"tw-flex tw-gap-2 tw-w-full tw-flex-col",children:[s==="Columns"&&t.jsx("div",{"data-test-id":`${i}-grid-columns`,className:"tw-grid tw-grid-cols-2 tw-gap-2",children:e.map((a,m)=>t.jsx("div",{className:p&&m===e.length-1?"tw-col-span-2":"",children:a},m))}),s==="Spider"&&t.jsxs("div",{"data-test-id":`${i}-grid-spider`,className:"tw-grid tw-grid-cols-4 tw-gap-2",children:[e[0]?t.jsx("div",{className:"tw-col-start-2 tw-col-span-2",children:e[0]}):null,e[1]?t.jsx("div",{className:"tw-col-start-1 tw-col-span-2",children:e[1]}):null,e[2]?t.jsx("div",{className:"tw-col-start-3 tw-col-span-2",children:e[2]}):null,e[3]?t.jsx("div",{className:"tw-col-start-2 tw-col-span-2",children:e[3]}):null]})]})};d.displayName="FondueMultiInput";d.__docgenInfo={description:"@deprecated Use a Layout component from `frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md the migration guide}.",methods:[],displayName:"FondueMultiInput",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'multi-input'",computed:!1}}}};const kt={title:"Components/Multi Input",component:d,tags:["autodocs"],args:{layout:x.Columns,spanLastItem:!1},argTypes:{layout:{options:Object.values(x),control:{type:"radio"}}},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use a [new Layout component](/docs/current_layout-grid--documentation) instead."}}}},v=s=>{const[p,r]=o.useState("Some value"),[i,e]=o.useState("Some value"),[a,m]=o.useState("Some value"),[l,y]=o.useState("Some value");return t.jsxs(d,{...s,children:[t.jsx(u,{value:p,onChange:n=>r(n)}),t.jsx(u,{value:i,onChange:n=>e(n)}),t.jsx(u,{value:a,onChange:n=>m(n)}),t.jsx(u,{value:l,onChange:n=>y(n)})]})},S=s=>{const[p,r]=o.useState("Here's a value"),[i,e]=o.useState("And here's another one");return t.jsxs(d,{...s,children:[t.jsx(u,{value:p,onChange:a=>r(a)}),t.jsx(u,{value:i,onChange:a=>e(a)})]})},c=s=>{const[p,r]=o.useState("Some value"),[i,e]=o.useState("Some other value"),[a,m]=o.useState();return t.jsxs(d,{...s,children:[t.jsx(u,{value:p,onChange:l=>r(l)}),t.jsx(u,{value:i,onChange:l=>e(l)}),t.jsx(k,{onChange:l=>m(l),activeItemId:a,size:R.Small,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"This is an option",size:C.Small},{id:"2",title:"Another option",size:C.Small},{id:"3",title:"Third option",size:C.Small}]}]})]})};c.args={spanLastItem:!0};const I=s=>{const[p,r]=o.useState("8px"),[i,e]=o.useState("8px"),[a,m]=o.useState("8px"),[l,y]=o.useState("8px");return t.jsxs(d,{...s,children:[t.jsx(u,{decorator:t.jsx(h,{size:g.Size16}),value:p,onChange:n=>r(n)}),t.jsx(u,{decorator:t.jsx(h,{size:g.Size16}),value:i,onChange:n=>e(n)}),t.jsx(u,{decorator:t.jsx(h,{size:g.Size16}),value:a,onChange:n=>m(n)}),t.jsx(u,{decorator:t.jsx(h,{size:g.Size16}),value:l,onChange:n=>y(n)})]})};I.args={layout:x.Spider};v.__docgenInfo={description:"",methods:[],displayName:"MultiInputColumns",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"MultiInputTwoInputs",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};c.__docgenInfo={description:"",methods:[],displayName:"MultiInputThreeInputs",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};I.__docgenInfo={description:"",methods:[],displayName:"MultiInputSpider",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};var T,M,f;v.parameters={...v.parameters,docs:{...(T=v.parameters)==null?void 0:T.docs,source:{originalSource:`(args: MultiInputProps) => {
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
