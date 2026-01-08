import{r as i,j as t}from"./iframe-B1NH0d8E.js";import{a as M,C as R}from"./Checklist-4WWg0hxG.js";import{D as H,c as O}from"./Dropdown-CRsrFL1r.js";import{M as S}from"./MenuItem-B5L2unfa.js";import{S as q}from"./SegmentedControls-Cr6K4IZy.js";import{T as g}from"./TextInput-CwXX9Bla.js";import{g as L}from"./useMemoizedId-B10bANt6.js";import{a as h,b as C,H as G,F as n}from"./FormControl-DKa4d7cu.js";import"./preload-helper-CxFeC-BG.js";import"./useFocusable-DP6unWF8.js";import"./useFocusRing-rvuW17v-.js";import"./useEffectEvent-Cuuo5Go7.js";import"./chain-CDNEhT9V.js";import"./index-NnVgL01k.js";import"./useField-Ck-FbqVi.js";import"./useLabels-D6M7Y-Ad.js";import"./Checkbox-BsSAYc5P.js";import"./useFormValidationState-BS6Czv8J.js";import"./useControlledState-VV8iETpF.js";import"./InputLabel-DK0GeTMZ.js";import"./TooltipIcon-CaQbfCOt.js";import"./LegacyTooltip-DWKf2bEz.js";import"./useLink-DGFVcWby.js";import"./usePopper-jtv-PNE8.js";import"./index-C7tiHcAr.js";import"./Button-CjOUnz39.js";import"./useButton-CXaNqm_z.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Portal-CySXwQ73.js";import"./IconCheckMark-Az9s2S0p.js";import"./IconExclamationMarkCircle24-Bbl11HkU.js";import"./IconExclamationMarkTriangle-BR7mnz4z.js";import"./IconExclamationMarkTriangle24-DoKVx44R.js";import"./IconQuestionMarkCircle-DdcULYxs.js";import"./IconMinus-Dx_lZq48.js";import"./IconMinus16-B8kCVrJZ.js";import"./FocusScope-CSl_sW_4.js";import"./useOverlayTriggerState-EK37ykhd.js";import"./useMenuTrigger-CLvR65IU.js";import"./useLocalizedStringFormatter-B_wUy5H5.js";import"./context-DkQ0DKut.js";import"./VisuallyHidden-Dc2v8xjK.js";import"./helper-BAqNwAfB.js";import"./keyboard-Cfnwcw1j.js";import"./SelectionManager-CGSidPqj.js";import"./LoadingCircle-DgTICg-p.js";import"./Trigger-0BTyAmbE.js";import"./IconCaretDown-BKOjvZBQ.js";import"./IconCaretDown16-CgcPEXOJ.js";import"./IconCross-CS9vqEH5.js";import"./IconTrashBin16-DLhMgjk_.js";import"./IconTrashBin24-OmLsHuw5.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BaBU1IWY.js";import"./IconCaretRight-D43a9Ky7.js";import"./elements-BOYmskOL.js";import"./proxy-bLfdvkZL.js";const Zt={title:"Components/Form Control",component:n,tags:["autodocs"],args:{style:h.Primary,disabled:!1,direction:C.Vertical,label:{children:"Input Label",required:!1,htmlFor:L(),tooltip:{content:"Tooltip Text"}},extra:"Extra Text or Element",helper:{text:"Helper Text (before/after) and variant (Primary/Success/Danger)",position:G.After},children:""},argTypes:{orientation:{options:Object.values(C),control:"select"},children:{table:{disable:!0}},style:{options:Object.values(h),control:"radio"}}},s=e=>{const[o,r]=i.useState("");return t.jsx(n,{clickable:!0,...e,children:t.jsx(g,{value:o,onChange:r})})},a=e=>{const[o,r]=i.useState("");return t.jsx(n,{...e,style:h.Danger,children:t.jsx(g,{value:o,onChange:r})})},m=e=>{const[o,r]=i.useState("");return t.jsx(n,{...e,style:h.Positive,children:t.jsx(g,{value:o,onChange:r})})},l=e=>{const[o,r]=i.useState("");return t.jsx(n,{...e,disabled:!0,children:t.jsx(g,{value:o,onChange:r})})},c=e=>{const[o,r]=i.useState("a");return t.jsx(n,{...e,children:t.jsx(q,{items:[{id:"1",value:"abc"},{id:"2",value:"def"},{id:"3",value:"ghi"}],activeItemId:o,onChange:r})})},p=e=>{const[o,r]=i.useState();return t.jsx(n,{...e,children:t.jsx(H,{onChange:I=>r(I),activeItemId:o,size:O.Small,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Small 1",size:S.Small},{id:"2",title:"Small 2",size:S.Small},{id:"3",title:"Small 3",size:S.Small}]}]})})},d=e=>{const[o,r]=i.useState([]),I=Array.from({length:5}).fill({}).map((J,u)=>({id:`checkbox-${u}`,value:`checkbox-${u}`,label:`Checkbox Nr. ${u}`,tooltip:{content:`Random Tooltip ${u}`}}));return t.jsx(n,{...e,children:t.jsx(M,{activeValues:o,setActiveValues:r,direction:R.Vertical,checkboxes:I})})};s.__docgenInfo={description:"",methods:[],displayName:"WithTextInput"};a.__docgenInfo={description:"",methods:[],displayName:"WithStyleDanger"};m.__docgenInfo={description:"",methods:[],displayName:"WithStylePositive"};l.__docgenInfo={description:"",methods:[],displayName:"WithStyleDisabled"};c.__docgenInfo={description:"",methods:[],displayName:"WithSegmentedControls"};p.__docgenInfo={description:"",methods:[],displayName:"WithDropdown"};d.__docgenInfo={description:"",methods:[],displayName:"WithVerticalChecklist"};var x,v,b;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const [input, setInput] = useState('');
  return <FormControl clickable {...args}>
            <TextInput value={input} onChange={setInput} />
        </FormControl>;
}`,...(b=(v=s.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var y,f,k;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  const [input, setInput] = useState('');
  return <FormControl {...args} style={FormControlStyle.Danger}>
            <TextInput value={input} onChange={setInput} />
        </FormControl>;
}`,...(k=(f=a.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var F,W,D;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`args => {
  const [input, setInput] = useState('');
  return <FormControl {...args} style={FormControlStyle.Positive}>
            <TextInput value={input} onChange={setInput} />
        </FormControl>;
}`,...(D=(W=m.parameters)==null?void 0:W.docs)==null?void 0:D.source}}};var _,j,T;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`args => {
  const [input, setInput] = useState('');
  return <FormControl {...args} disabled>
            <TextInput value={input} onChange={setInput} />
        </FormControl>;
}`,...(T=(j=l.parameters)==null?void 0:j.docs)==null?void 0:T.source}}};var z,A,V;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`args => {
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
}`,...(V=(A=c.parameters)==null?void 0:A.docs)==null?void 0:V.source}}};var N,B,P;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
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
}`,...(P=(B=p.parameters)==null?void 0:B.docs)==null?void 0:P.source}}};var $,w,E;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`args => {
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
}`,...(E=(w=d.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};const te=["WithTextInput","WithStyleDanger","WithStylePositive","WithStyleDisabled","WithSegmentedControls","WithDropdown","WithVerticalChecklist"];export{p as WithDropdown,c as WithSegmentedControls,a as WithStyleDanger,l as WithStyleDisabled,m as WithStylePositive,s as WithTextInput,d as WithVerticalChecklist,te as __namedExportsOrder,Zt as default};
