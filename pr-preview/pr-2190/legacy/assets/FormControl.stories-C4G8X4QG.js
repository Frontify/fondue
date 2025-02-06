import{j as t}from"./jsx-runtime-DH9XN8A8.js";import{r as c}from"./index-v7USjxUg.js";import{C as T,a as _}from"./Checklist-C2g2kAMH.js";import{D as j,a as y}from"./Dropdown-B7FwpEmp.js";import{M as d}from"./MenuItem-n3bavbk_.js";import{S as D}from"./SegmentedControls-DCWkCWQT.js";import{T as W}from"./TextInput-NLH6WSWe.js";import{g as V}from"./useMemoizedId-Cl5PI4eu.js";import{F as m,a as u,b as h,H as B}from"./FormControl-DeLflFlr.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./useFocusable-BRFkliNn.js";import"./useFocusRing-CP9UJNUw.js";import"./useEffectEvent-BaECT7_f.js";import"./chain-C8AhrK0W.js";import"./useField-Cf7VimOC.js";import"./useLabels-v-oj2KeZ.js";import"./Checkbox-C8fDjqts.js";import"./useFormValidationState-BKAFCnHb.js";import"./useControlledState-BSgwHaZM.js";import"./InputLabel-CAkTbk9Q.js";import"./TooltipIcon-DWdr_hgc.js";import"./LegacyTooltip-BReeJmjq.js";import"./useLink-C2PgwcjG.js";import"./usePopper-BO8FF5JQ.js";import"./index-voQlCD4e.js";import"./index-DlnOb27V.js";import"./Button-BfBJpGQT.js";import"./useButton-B6orroTH.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./Portal-BMcVKwlx.js";import"./IconCheckMark-CMS57PRn.js";import"./IconExclamationMarkCircle24-CS86ZjBV.js";import"./IconExclamationMarkTriangle-CTTfs2nR.js";import"./IconExclamationMarkTriangle24-ZUoV6XtQ.js";import"./IconQuestionMarkCircle-DT_LrHkX.js";import"./IconMinus-DtF84-GK.js";import"./FocusScope-Drcq722v.js";import"./useOverlayTriggerState-C3ap9Qkt.js";import"./useMenuTrigger-dROe67R1.js";import"./useLocalizedStringFormatter-BEKlpfz7.js";import"./context-BFA77VTM.js";import"./VisuallyHidden-CBFC6H_6.js";import"./helper-B_Vetl89.js";import"./isScrollable-BSEN4xi5.js";import"./SelectionManager-BD4p7d3N.js";import"./LoadingCircle-CnEko-RI.js";import"./Trigger-BvTVBjbf.js";import"./IconCaretDown-BxzyP7sS.js";import"./IconCaretDown16-DV8CvCws.js";import"./IconCross-LL1GOU_p.js";import"./IconTrashBin16-Db8fv2tm.js";import"./IconTrashBin24-Dz-kV-1n.js";import"./validation-CJXPAjNB.js";import"./EnablePortalWrapper-DzTSSIqA.js";import"./IconCaretRight-bL6MdAvD.js";import"./elements-BOYmskOL.js";import"./motion-EixWmitH.js";const Ht={title:"Components/Form Control",component:m,tags:["autodocs"],args:{style:u.Primary,disabled:!1,direction:h.Vertical,label:{children:"Input Label",required:!1,htmlFor:V(),tooltip:{content:"Tooltip Text"}},extra:"Extra Text or Element",helper:{text:"Helper Text (before/after) and variant (Primary/Success/Danger)",position:B.After},children:""},argTypes:{orientation:{options:Object.values(h),control:"select"},children:{table:{disable:!0}},style:{options:Object.values(u),control:"radio"}}},i=e=>{const[o,r]=c.useState("");return t.jsx(m,{clickable:!0,...e,children:t.jsx(W,{value:o,onChange:r})})},n=e=>{const[o,r]=c.useState("a");return t.jsx(m,{...e,children:t.jsx(D,{items:[{id:"1",value:"abc"},{id:"2",value:"def"},{id:"3",value:"ghi"}],activeItemId:o,onChange:r})})},s=e=>{const[o,r]=c.useState();return t.jsx(m,{...e,children:t.jsx(j,{onChange:p=>r(p),activeItemId:o,size:y.Small,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Small 1",size:d.Small},{id:"2",title:"Small 2",size:d.Small},{id:"3",title:"Small 3",size:d.Small}]}]})})},a=e=>{const[o,r]=c.useState([]),p=Array.from({length:5}).fill({}).map(($,l)=>({id:`checkbox-${l}`,value:`checkbox-${l}`,label:`Checkbox Nr. ${l}`,tooltip:{content:`Random Tooltip ${l}`}}));return t.jsx(m,{...e,children:t.jsx(T,{activeValues:o,setActiveValues:r,direction:_.Vertical,checkboxes:p})})};i.__docgenInfo={description:"",methods:[],displayName:"WithTextInput"};n.__docgenInfo={description:"",methods:[],displayName:"WithSegmentedControls"};s.__docgenInfo={description:"",methods:[],displayName:"WithDropdown"};a.__docgenInfo={description:"",methods:[],displayName:"WithVerticalChecklist"};var I,x,g;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
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
}`,...(A=(z=a.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};const Ot=["WithTextInput","WithSegmentedControls","WithDropdown","WithVerticalChecklist"];export{s as WithDropdown,n as WithSegmentedControls,i as WithTextInput,a as WithVerticalChecklist,Ot as __namedExportsOrder,Ht as default};
