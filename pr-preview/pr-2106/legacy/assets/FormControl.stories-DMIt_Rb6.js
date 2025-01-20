import{j as t}from"./jsx-runtime-BvI67ttx.js";import{r as c}from"./index-BEEaWAwe.js";import{C as T,a as _}from"./Checklist-DGBpW-Ht.js";import{D as j,a as y}from"./Dropdown-BtR_x9Ve.js";import{M as d}from"./MenuItem-CcAAOiF6.js";import{S as D}from"./SegmentedControls-Btv1r2cE.js";import{T as W}from"./TextInput-DrA2OM1M.js";import{g as V}from"./useMemoizedId-P52koD2W.js";import{F as m,a as u,b as h,H as B}from"./FormControl-B09RM8pa.js";import"./_commonjsHelpers-BosuxZz1.js";import"./useFocusable-DySem7st.js";import"./useFocusRing-BuOUPy6p.js";import"./SSRProvider-4hSGecE0.js";import"./chain-Ck9CKbau.js";import"./useField-Dc7XGbIY.js";import"./useLabels-D_OVlzwR.js";import"./Checkbox-BSViDCl2.js";import"./useFormValidationState-Cm7EQ7so.js";import"./useControlledState-C1JYnvfk.js";import"./InputLabel-BUzvczwB.js";import"./TooltipIcon-DeJsuRhr.js";import"./LegacyTooltip-BC90iaVE.js";import"./useLink-CGrBbYMo.js";import"./usePopper-CHIbWn6Y.js";import"./index-CJX6plO5.js";import"./index-CfyPTyT-.js";import"./Button-ljOzJNbm.js";import"./useButton-CGbfYaYu.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./Portal-BFAtGiKe.js";import"./IconCheckMark-CEVoSHhf.js";import"./IconExclamationMarkCircle24-BbewMLoq.js";import"./IconExclamationMarkTriangle-BoexdZ5m.js";import"./IconExclamationMarkTriangle24-DY2uQ5A6.js";import"./IconQuestionMarkCircle-DJ6cviju.js";import"./IconMinus-B_0CHgCq.js";import"./IconMinus16-D263muHI.js";import"./FocusScope-CqItlJEB.js";import"./useOverlayTriggerState-kv3bAW5J.js";import"./useMenuTrigger-BDN5-qBG.js";import"./useLocalizedStringFormatter-GGVsfvFM.js";import"./context-DXnD6xbD.js";import"./VisuallyHidden-DdU2rIcI.js";import"./helper-C1ILvlDl.js";import"./isScrollable-Bts8_1NI.js";import"./SelectionManager-LV9dL26g.js";import"./LoadingCircle-CLFuk3gJ.js";import"./Trigger-DM6leiPg.js";import"./IconCaretDown-DO73XlJq.js";import"./IconCaretDown16-D1ph0gFc.js";import"./IconCross-B3GiP1Si.js";import"./IconTrashBin16-CVizQs9b.js";import"./IconTrashBin24-D97dm6YN.js";import"./validation-CJXPAjNB.js";import"./EnablePortalWrapper-CBs6EJfs.js";import"./IconCaretRight-CmZkFCOs.js";import"./elements-BOYmskOL.js";import"./motion-B4glEiOI.js";const Ot={title:"Components/Form Control",component:m,tags:["autodocs"],args:{style:u.Primary,disabled:!1,direction:h.Vertical,label:{children:"Input Label",required:!1,htmlFor:V(),tooltip:{content:"Tooltip Text"}},extra:"Extra Text or Element",helper:{text:"Helper Text (before/after) and variant (Primary/Success/Danger)",position:B.After},children:""},argTypes:{orientation:{options:Object.values(h),control:"select"},children:{table:{disable:!0}},style:{options:Object.values(u),control:"radio"}}},i=e=>{const[o,r]=c.useState("");return t.jsx(m,{clickable:!0,...e,children:t.jsx(W,{value:o,onChange:r})})},n=e=>{const[o,r]=c.useState("a");return t.jsx(m,{...e,children:t.jsx(D,{items:[{id:"1",value:"abc"},{id:"2",value:"def"},{id:"3",value:"ghi"}],activeItemId:o,onChange:r})})},s=e=>{const[o,r]=c.useState();return t.jsx(m,{...e,children:t.jsx(j,{onChange:p=>r(p),activeItemId:o,size:y.Small,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Small 1",size:d.Small},{id:"2",title:"Small 2",size:d.Small},{id:"3",title:"Small 3",size:d.Small}]}]})})},a=e=>{const[o,r]=c.useState([]),p=Array.from({length:5}).fill({}).map(($,l)=>({id:`checkbox-${l}`,value:`checkbox-${l}`,label:`Checkbox Nr. ${l}`,tooltip:{content:`Random Tooltip ${l}`}}));return t.jsx(m,{...e,children:t.jsx(T,{activeValues:o,setActiveValues:r,direction:_.Vertical,checkboxes:p})})};i.__docgenInfo={description:"",methods:[],displayName:"WithTextInput"};n.__docgenInfo={description:"",methods:[],displayName:"WithSegmentedControls"};s.__docgenInfo={description:"",methods:[],displayName:"WithDropdown"};a.__docgenInfo={description:"",methods:[],displayName:"WithVerticalChecklist"};var I,x,g;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
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
