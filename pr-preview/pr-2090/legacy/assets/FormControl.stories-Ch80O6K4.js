import{j as t}from"./jsx-runtime-Nms4Y4qS.js";import{r as c}from"./index-BwDkhjyp.js";import{C as T,a as _}from"./Checklist-CD5Jdkl_.js";import{D as j,a as y}from"./Dropdown-BXaRMDFW.js";import{M as d}from"./MenuItem-itn0OPM5.js";import{S as D}from"./SegmentedControls-BSWtFswn.js";import{T as W}from"./TextInput-3-VhK_fn.js";import{g as V}from"./useMemoizedId-EtHZ7Sxa.js";import{F as m,a as u,b as h,H as B}from"./FormControl-DbVvWZHc.js";import"./_commonjsHelpers-BosuxZz1.js";import"./useFocusable-ClqOF1PM.js";import"./useFocusRing-Vzyl7-Lk.js";import"./SSRProvider-CYXx33DY.js";import"./chain-CSFqNvhK.js";import"./useField-CqwgNQmU.js";import"./useLabels-Bp6d37Qr.js";import"./Checkbox-BWCdojtM.js";import"./useFormValidationState-Bo5Bz1o-.js";import"./useControlledState-C0C-dzuH.js";import"./InputLabel-DuXda3bY.js";import"./TooltipIcon-CI6qleYl.js";import"./LegacyTooltip-NmtBsAB1.js";import"./useLink-BrkukSAv.js";import"./usePopper-C28Vz6Qz.js";import"./index-CS4BWtGh.js";import"./index-CfyPTyT-.js";import"./Button-BBdFcQ_2.js";import"./useButton-B0CVDvll.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./Portal-BBACcjoK.js";import"./IconCheckMark-ByVuQE55.js";import"./IconExclamationMarkCircle-DIK3qNWl.js";import"./IconExclamationMarkCircle24-Vs83y98-.js";import"./IconExclamationMarkTriangle-DvvXw1YP.js";import"./IconExclamationMarkTriangle24-NdDZZD89.js";import"./IconQuestionMarkCircle-DpV6l-09.js";import"./IconMinus-C2D-9VKa.js";import"./IconMinus16-D_g1WimF.js";import"./FocusScope-CryrrNNO.js";import"./useOverlayTriggerState-CiJgB9B9.js";import"./useMenuTrigger-ByptOacy.js";import"./useLocalizedStringFormatter-D7Kogc_3.js";import"./context-C2PaECDE.js";import"./VisuallyHidden-BDm5AEDr.js";import"./helper-DRMjeydv.js";import"./isScrollable-Bts8_1NI.js";import"./SelectionManager-f1Y_ghrx.js";import"./LoadingCircle-CZrma5le.js";import"./Trigger-gz8WCINE.js";import"./IconCaretDown-BFa2RsTm.js";import"./IconCaretDown16-mzuMIk3a.js";import"./IconCross-CxP4FPDR.js";import"./IconTrashBin-BqqROPt7.js";import"./IconTrashBin16-g_sB0yBJ.js";import"./IconTrashBin24-DyoUj1kc.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-B_d3Ldct.js";import"./IconCaretRight-CdUgGX0g.js";import"./elements-BOYmskOL.js";import"./motion-C48bHxkn.js";import"./IconEyeOff-BAmb6qT8.js";const Lt={title:"Components/Form Control",component:m,tags:["autodocs"],args:{style:u.Primary,disabled:!1,direction:h.Vertical,label:{children:"Input Label",required:!1,htmlFor:V(),tooltip:{content:"Tooltip Text"}},extra:"Extra Text or Element",helper:{text:"Helper Text (before/after) and variant (Primary/Success/Danger)",position:B.After},children:""},argTypes:{orientation:{options:Object.values(h),control:"select"},children:{table:{disable:!0}},style:{options:Object.values(u),control:"radio"}}},i=e=>{const[o,r]=c.useState("");return t.jsx(m,{clickable:!0,...e,children:t.jsx(W,{value:o,onChange:r})})},n=e=>{const[o,r]=c.useState("a");return t.jsx(m,{...e,children:t.jsx(D,{items:[{id:"1",value:"abc"},{id:"2",value:"def"},{id:"3",value:"ghi"}],activeItemId:o,onChange:r})})},s=e=>{const[o,r]=c.useState();return t.jsx(m,{...e,children:t.jsx(j,{onChange:p=>r(p),activeItemId:o,size:y.Small,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Small 1",size:d.Small},{id:"2",title:"Small 2",size:d.Small},{id:"3",title:"Small 3",size:d.Small}]}]})})},a=e=>{const[o,r]=c.useState([]),p=Array.from({length:5}).fill({}).map(($,l)=>({id:`checkbox-${l}`,value:`checkbox-${l}`,label:`Checkbox Nr. ${l}`,tooltip:{content:`Random Tooltip ${l}`}}));return t.jsx(m,{...e,children:t.jsx(T,{activeValues:o,setActiveValues:r,direction:_.Vertical,checkboxes:p})})};i.__docgenInfo={description:"",methods:[],displayName:"WithTextInput"};n.__docgenInfo={description:"",methods:[],displayName:"WithSegmentedControls"};s.__docgenInfo={description:"",methods:[],displayName:"WithDropdown"};a.__docgenInfo={description:"",methods:[],displayName:"WithVerticalChecklist"};var I,x,g;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
  const [input, setInput] = useState('');
  return <FormControl clickable={true} {...args}>
            <TextInput value={input} onChange={setInput} />
        </FormControl>;
}`,...(g=(x=i.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var S,C,v;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
  const [activeItemId, setActiveItemId] = useState<string>('a');
  return <FormControl {...args}>
            <SegmentedControls items={[{
      id: '1',
      value: 'abc'
    }, {
      id: '2',
      value: 'def'
    }, {
      id: '3',
      value: 'ghi'
    }]} activeItemId={activeItemId} onChange={setActiveItemId} />
        </FormControl>;
}`,...(v=(C=n.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var b,f,k;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
  const [activeItemId, setActiveItemId] = useState<string | number | undefined>();
  return <FormControl {...args}>
            <Dropdown onChange={id => setActiveItemId(id)} activeItemId={activeItemId} size={DropdownSize.Small} menuBlocks={[{
      id: 'block1',
      menuItems: [{
        id: '1',
        title: 'Small 1',
        size: MenuItemContentSize.Small
      }, {
        id: '2',
        title: 'Small 2',
        size: MenuItemContentSize.Small
      }, {
        id: '3',
        title: 'Small 3',
        size: MenuItemContentSize.Small
      }]
    }]} />
        </FormControl>;
}`,...(k=(f=s.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var F,z,A;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`args => {
  const [activeBoxes, setActiveBoxes] = useState<string[]>([]);
  const checkboxes = Array.from({
    length: 5
  }).fill({}).map((_, index) => ({
    id: \`checkbox-\${index}\`,
    value: \`checkbox-\${index}\`,
    label: \`Checkbox Nr. \${index}\`,
    tooltip: {
      content: \`Random Tooltip \${index}\`
    }
  }));
  return <FormControl {...args}>
            <Checklist activeValues={activeBoxes} setActiveValues={setActiveBoxes} direction={ChecklistDirection.Vertical} checkboxes={checkboxes} />
        </FormControl>;
}`,...(A=(z=a.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};const Gt=["WithTextInput","WithSegmentedControls","WithDropdown","WithVerticalChecklist"];export{s as WithDropdown,n as WithSegmentedControls,i as WithTextInput,a as WithVerticalChecklist,Gt as __namedExportsOrder,Lt as default};
