import{j as t}from"./jsx-runtime-DH9XN8A8.js";import{r as o}from"./index-v7USjxUg.js";import{D as k,a as R}from"./Dropdown-Dao21ydm.js";import{M as C}from"./MenuItem-n3bavbk_.js";import{T as i}from"./TextInput-DncHZpfW.js";import{I as h}from"./IconIcon-Czev5ZcQ.js";import{I as g}from"./IconSize-BcCrF_mi.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./useButton-B6orroTH.js";import"./useFocusable-BRFkliNn.js";import"./useFocusRing-CP9UJNUw.js";import"./useEffectEvent-BaECT7_f.js";import"./chain-C8AhrK0W.js";import"./FocusScope-Drcq722v.js";import"./useOverlayTriggerState-C3ap9Qkt.js";import"./useControlledState-BSgwHaZM.js";import"./useMenuTrigger-dROe67R1.js";import"./useLabels-v-oj2KeZ.js";import"./useLocalizedStringFormatter-BEKlpfz7.js";import"./context-BFA77VTM.js";import"./VisuallyHidden-CBFC6H_6.js";import"./helper-B_Vetl89.js";import"./isScrollable-BSEN4xi5.js";import"./index-voQlCD4e.js";import"./SelectionManager-BD4p7d3N.js";import"./useField-Cf7VimOC.js";import"./useFormValidationState-BKAFCnHb.js";import"./usePopper-BO8FF5JQ.js";import"./index-DlnOb27V.js";import"./merge-DI-veSMP.js";import"./focusStyle-CBFElZiz.js";import"./LoadingCircle-BSQayp2F.js";import"./Trigger-BvTVBjbf.js";import"./IconCaretDown-BxzyP7sS.js";import"./IconCaretDown16-DV8CvCws.js";import"./IconCross-LL1GOU_p.js";import"./IconExclamationMarkTriangle-CTTfs2nR.js";import"./IconExclamationMarkTriangle24-ZUoV6XtQ.js";import"./IconTrashBin16-Db8fv2tm.js";import"./IconTrashBin24-Dz-kV-1n.js";import"./validation-CJXPAjNB.js";import"./EnablePortalWrapper-DzTSSIqA.js";import"./Portal-BMcVKwlx.js";import"./useMemoizedId-Cl5PI4eu.js";import"./IconCaretRight-bL6MdAvD.js";import"./IconCheckMark-CMS57PRn.js";import"./elements-BOYmskOL.js";import"./LegacyTooltip-BReeJmjq.js";import"./useLink-C2PgwcjG.js";import"./Button-BfBJpGQT.js";import"./IconExclamationMarkCircle24-CS86ZjBV.js";import"./IconIcon16-KBXYRe7H.js";import"./IconIcon24-HjPMrfFS.js";var x=(s=>(s.Columns="Columns",s.Spider="Spider",s))(x||{});const d=({layout:s,spanLastItem:p,children:r,"data-test-id":u="multi-input"})=>{const e=o.Children.toArray(r);return t.jsxs("div",{"data-test-id":u,className:"tw-flex tw-gap-2 tw-w-full tw-flex-col",children:[s==="Columns"&&t.jsx("div",{"data-test-id":`${u}-grid-columns`,className:"tw-grid tw-grid-cols-2 tw-gap-2",children:e.map((a,m)=>t.jsx("div",{className:p&&m===e.length-1?"tw-col-span-2":"",children:a},m))}),s==="Spider"&&t.jsxs("div",{"data-test-id":`${u}-grid-spider`,className:"tw-grid tw-grid-cols-4 tw-gap-2",children:[e[0]&&t.jsx("div",{className:"tw-col-start-2 tw-col-span-2",children:e[0]}),e[1]&&t.jsx("div",{className:"tw-col-start-1 tw-col-span-2",children:e[1]}),e[2]&&t.jsx("div",{className:"tw-col-start-3 tw-col-span-2",children:e[2]}),e[3]&&t.jsx("div",{className:"tw-col-start-2 tw-col-span-2",children:e[3]})]})]})};d.displayName="FondueMultiInput";d.__docgenInfo={description:"@deprecated Use a Layout component from `frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md the migration guide}.",methods:[],displayName:"FondueMultiInput",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'multi-input'",computed:!1}}}};const Rt={title:"Components/Multi Input",component:d,tags:["autodocs"],args:{layout:x.Columns,spanLastItem:!1},argTypes:{layout:{options:Object.values(x),control:{type:"radio"}}},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use a [new Layout component](/docs/current_layout-grid--documentation) instead."}}}},v=s=>{const[p,r]=o.useState("Some value"),[u,e]=o.useState("Some value"),[a,m]=o.useState("Some value"),[l,y]=o.useState("Some value");return t.jsxs(d,{...s,children:[t.jsx(i,{value:p,onChange:n=>r(n)}),t.jsx(i,{value:u,onChange:n=>e(n)}),t.jsx(i,{value:a,onChange:n=>m(n)}),t.jsx(i,{value:l,onChange:n=>y(n)})]})},S=s=>{const[p,r]=o.useState("Here's a value"),[u,e]=o.useState("And here's another one");return t.jsxs(d,{...s,children:[t.jsx(i,{value:p,onChange:a=>r(a)}),t.jsx(i,{value:u,onChange:a=>e(a)})]})},c=s=>{const[p,r]=o.useState("Some value"),[u,e]=o.useState("Some other value"),[a,m]=o.useState();return t.jsxs(d,{...s,children:[t.jsx(i,{value:p,onChange:l=>r(l)}),t.jsx(i,{value:u,onChange:l=>e(l)}),t.jsx(k,{onChange:l=>m(l),activeItemId:a,size:R.Small,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"This is an option",size:C.Small},{id:"2",title:"Another option",size:C.Small},{id:"3",title:"Third option",size:C.Small}]}]})]})};c.args={spanLastItem:!0};const I=s=>{const[p,r]=o.useState("8px"),[u,e]=o.useState("8px"),[a,m]=o.useState("8px"),[l,y]=o.useState("8px");return t.jsxs(d,{...s,children:[t.jsx(i,{decorator:t.jsx(h,{size:g.Size16}),value:p,onChange:n=>r(n)}),t.jsx(i,{decorator:t.jsx(h,{size:g.Size16}),value:u,onChange:n=>e(n)}),t.jsx(i,{decorator:t.jsx(h,{size:g.Size16}),value:a,onChange:n=>m(n)}),t.jsx(i,{decorator:t.jsx(h,{size:g.Size16}),value:l,onChange:n=>y(n)})]})};I.args={layout:x.Spider};v.__docgenInfo={description:"",methods:[],displayName:"MultiInputColumns",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};S.__docgenInfo={description:"",methods:[],displayName:"MultiInputTwoInputs",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};c.__docgenInfo={description:"",methods:[],displayName:"MultiInputThreeInputs",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};I.__docgenInfo={description:"",methods:[],displayName:"MultiInputSpider",props:{layout:{required:!0,tsType:{name:"MultiInputLayout"},description:""},spanLastItem:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};var T,M,f;v.parameters={...v.parameters,docs:{...(T=v.parameters)==null?void 0:T.docs,source:{originalSource:`(args: MultiInputProps) => {
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
}`,...(A=(b=I.parameters)==null?void 0:b.docs)==null?void 0:A.source}}};const Dt=["MultiInputColumns","MultiInputTwoInputs","MultiInputThreeInputs","MultiInputSpider"];export{v as MultiInputColumns,I as MultiInputSpider,c as MultiInputThreeInputs,S as MultiInputTwoInputs,Dt as __namedExportsOrder,Rt as default};
