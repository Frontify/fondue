import{j as t}from"./jsx-runtime-BYYWji4R.js";import{r as c}from"./index-ClcD9ViR.js";import{a as T,C as _}from"./Checklist-CtCngH_a.js";import{c as j,b as y}from"./Dropdown-DNd1p4TV.js";import{M as d}from"./MenuItem-CSK1Q0qS.js";import{S as W}from"./SegmentedControls-BEk_OMU3.js";import{T as D}from"./TextInput-BACchVig.js";import{g as V}from"./useMemoizedId-DU5NJZZj.js";import{a as u,b as h,H as B,F as m}from"./FormControl--ehuic3I.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./useFocusable-NpJIjJzn.js";import"./useFocusRing-CqhiwHAH.js";import"./useEffectEvent-23OTMzEQ.js";import"./chain-zZtnTS2i.js";import"./index-Cho7bklK.js";import"./useField-DK1vwUqC.js";import"./useLabels-B-KZ60t7.js";import"./Checkbox-W_a5RfOe.js";import"./useFormValidationState-CY2oi0R5.js";import"./useControlledState-CbyHarIm.js";import"./InputLabel-CAP8jsDr.js";import"./TooltipIcon-C9vG9kLd.js";import"./LegacyTooltip-CmyMM9dF.js";import"./useLink-DLd-zCvm.js";import"./usePopper-BHXQC2xD.js";import"./index-DlnOb27V.js";import"./Button-CacleqQO.js";import"./useButton-CmN_Qqm3.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./Portal-B3A1C5qZ.js";import"./IconCheckMark-DDrIoLdu.js";import"./IconExclamationMarkCircle24-4UiwpX0o.js";import"./IconExclamationMarkTriangle-DOh84ahI.js";import"./IconExclamationMarkTriangle24-BCoex7hw.js";import"./IconQuestionMarkCircle-7EPrDyIp.js";import"./IconMinus-DVuqM0Be.js";import"./IconMinus16-C5LwBrlK.js";import"./FocusScope-BbG7qqtO.js";import"./useOverlayTriggerState-Do1lhetf.js";import"./useMenuTrigger-WEg3SWYq.js";import"./useLocalizedStringFormatter-DuHRzRSj.js";import"./context-dZDq9eSh.js";import"./VisuallyHidden-BJ4JcGHV.js";import"./helper-kX8HYG1i.js";import"./isScrollable-BSEN4xi5.js";import"./SelectionManager-C5uJtM9S.js";import"./LoadingCircle-N4gckcbl.js";import"./Trigger-DPfUCRqP.js";import"./IconCaretDown-BLgqrlDL.js";import"./IconCaretDown16-Df8Xsbqc.js";import"./IconCross-BVasaH61.js";import"./IconTrashBin16-DOiZQ5Am.js";import"./IconTrashBin24-10Yg3nt7.js";import"./validation-CJXPAjNB.js";import"./EnablePortalWrapper-DHpdIRHB.js";import"./IconCaretRight-CAeLeSzU.js";import"./elements-BOYmskOL.js";import"./motion-DqKuqH19.js";const Ot={title:"Components/Form Control",component:m,tags:["autodocs"],args:{style:u.Primary,disabled:!1,direction:h.Vertical,label:{children:"Input Label",required:!1,htmlFor:V(),tooltip:{content:"Tooltip Text"}},extra:"Extra Text or Element",helper:{text:"Helper Text (before/after) and variant (Primary/Success/Danger)",position:B.After},children:""},argTypes:{orientation:{options:Object.values(h),control:"select"},children:{table:{disable:!0}},style:{options:Object.values(u),control:"radio"}}},i=e=>{const[o,r]=c.useState("");return t.jsx(m,{clickable:!0,...e,children:t.jsx(D,{value:o,onChange:r})})},n=e=>{const[o,r]=c.useState("a");return t.jsx(m,{...e,children:t.jsx(W,{items:[{id:"1",value:"abc"},{id:"2",value:"def"},{id:"3",value:"ghi"}],activeItemId:o,onChange:r})})},s=e=>{const[o,r]=c.useState();return t.jsx(m,{...e,children:t.jsx(j,{onChange:p=>r(p),activeItemId:o,size:y.Small,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Small 1",size:d.Small},{id:"2",title:"Small 2",size:d.Small},{id:"3",title:"Small 3",size:d.Small}]}]})})},a=e=>{const[o,r]=c.useState([]),p=Array.from({length:5}).fill({}).map(($,l)=>({id:`checkbox-${l}`,value:`checkbox-${l}`,label:`Checkbox Nr. ${l}`,tooltip:{content:`Random Tooltip ${l}`}}));return t.jsx(m,{...e,children:t.jsx(T,{activeValues:o,setActiveValues:r,direction:_.Vertical,checkboxes:p})})};i.__docgenInfo={description:"",methods:[],displayName:"WithTextInput"};n.__docgenInfo={description:"",methods:[],displayName:"WithSegmentedControls"};s.__docgenInfo={description:"",methods:[],displayName:"WithDropdown"};a.__docgenInfo={description:"",methods:[],displayName:"WithVerticalChecklist"};var I,x,g;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
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
}`,...(A=(z=a.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};const Pt=["WithTextInput","WithSegmentedControls","WithDropdown","WithVerticalChecklist"];export{s as WithDropdown,n as WithSegmentedControls,i as WithTextInput,a as WithVerticalChecklist,Pt as __namedExportsOrder,Ot as default};
