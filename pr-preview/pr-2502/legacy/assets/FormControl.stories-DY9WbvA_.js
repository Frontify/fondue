import{r as i,j as e}from"./iframe-CLWR3nUG.js";import{a as M,C as R}from"./Checklist-DBN55atA.js";import{D as H,c as O}from"./Dropdown-CgJKgsG5.js";import{M as S}from"./MenuItem-BLMEyQkG.js";import{S as q}from"./SegmentedControls-BKqRF-ZC.js";import{T as g}from"./TextInput-G_lGNFDI.js";import{g as L}from"./useMemoizedId-nabCRXrC.js";import{a as h,b as C,H as G,F as n}from"./FormControl-DLFZlT_c.js";import"./preload-helper-B933Jwna.js";import"./useFocusable-DqLL_9nB.js";import"./useFocusRing-BSAt-4Vk.js";import"./useEffectEvent-CAs0gB5n.js";import"./chain-BXOE_HCM.js";import"./index-B_9kxJ6p.js";import"./useField-kYwedNDJ.js";import"./useLabels-B9PzIB3R.js";import"./Checkbox-C_BnGEqa.js";import"./useFormValidationState-DsxgvnBE.js";import"./useControlledState-Bgj_pg2k.js";import"./InputLabel-Cqx25nUO.js";import"./TooltipIcon-4N5NOwNP.js";import"./LegacyTooltip-BxpYtXmg.js";import"./useLink-PH1jH_sQ.js";import"./usePopper-BaDtouo_.js";import"./index-D3ZbXnsu.js";import"./Button-BXJ3LDeK.js";import"./useButton--zqKr1UY.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Portal-BdiWRCVg.js";import"./IconCheckMark-Dpv-CvL4.js";import"./IconExclamationMarkCircle24-ClOhu_Ri.js";import"./IconExclamationMarkTriangle-znDU4MK2.js";import"./IconExclamationMarkTriangle24-zD4-cjbh.js";import"./IconQuestionMarkCircle-C0WF9A0R.js";import"./IconMinus-VNqTPRc-.js";import"./FocusScope-BqKd6BB4.js";import"./useOverlayTriggerState-DtfrjgdL.js";import"./useMenuTrigger-CQA0Zlhk.js";import"./useLocalizedStringFormatter-DltMrR-Y.js";import"./context-v0LEZ9V1.js";import"./VisuallyHidden-C8aD6iZq.js";import"./helper-BVjiVm4-.js";import"./keyboard-DiUzdOAm.js";import"./SelectionManager-DYagDv8k.js";import"./LoadingCircle-DTZpP-I5.js";import"./Trigger-DN5iHf_G.js";import"./IconCaretDown-KLV270_U.js";import"./IconCaretDown16-b6UFvhxi.js";import"./IconCross-XzksfC__.js";import"./IconTrashBin16-DR4mHbxD.js";import"./IconTrashBin24-Cml_YhRO.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-D2eOtS_g.js";import"./IconCaretRight-D_vXqUpq.js";import"./elements-BOYmskOL.js";import"./proxy-BU611xik.js";const Ye={title:"Components/Form Control",component:n,tags:["autodocs"],args:{style:h.Primary,disabled:!1,direction:C.Vertical,label:{children:"Input Label",required:!1,htmlFor:L(),tooltip:{content:"Tooltip Text"}},extra:"Extra Text or Element",helper:{text:"Helper Text (before/after) and variant (Primary/Success/Danger)",position:G.After},children:""},argTypes:{orientation:{options:Object.values(C),control:"select"},children:{table:{disable:!0}},style:{options:Object.values(h),control:"radio"}}},s=t=>{const[o,r]=i.useState("");return e.jsx(n,{clickable:!0,...t,children:e.jsx(g,{value:o,onChange:r})})},a=t=>{const[o,r]=i.useState("");return e.jsx(n,{...t,style:h.Danger,children:e.jsx(g,{value:o,onChange:r})})},m=t=>{const[o,r]=i.useState("");return e.jsx(n,{...t,style:h.Positive,children:e.jsx(g,{value:o,onChange:r})})},l=t=>{const[o,r]=i.useState("");return e.jsx(n,{...t,disabled:!0,children:e.jsx(g,{value:o,onChange:r})})},c=t=>{const[o,r]=i.useState("a");return e.jsx(n,{...t,children:e.jsx(q,{items:[{id:"1",value:"abc"},{id:"2",value:"def"},{id:"3",value:"ghi"}],activeItemId:o,onChange:r})})},p=t=>{const[o,r]=i.useState();return e.jsx(n,{...t,children:e.jsx(H,{onChange:I=>r(I),activeItemId:o,size:O.Small,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Small 1",size:S.Small},{id:"2",title:"Small 2",size:S.Small},{id:"3",title:"Small 3",size:S.Small}]}]})})},d=t=>{const[o,r]=i.useState([]),I=Array.from({length:5}).fill({}).map((J,u)=>({id:`checkbox-${u}`,value:`checkbox-${u}`,label:`Checkbox Nr. ${u}`,tooltip:{content:`Random Tooltip ${u}`}}));return e.jsx(n,{...t,children:e.jsx(M,{activeValues:o,setActiveValues:r,direction:R.Vertical,checkboxes:I})})};s.__docgenInfo={description:"",methods:[],displayName:"WithTextInput"};a.__docgenInfo={description:"",methods:[],displayName:"WithStyleDanger"};m.__docgenInfo={description:"",methods:[],displayName:"WithStylePositive"};l.__docgenInfo={description:"",methods:[],displayName:"WithStyleDisabled"};c.__docgenInfo={description:"",methods:[],displayName:"WithSegmentedControls"};p.__docgenInfo={description:"",methods:[],displayName:"WithDropdown"};d.__docgenInfo={description:"",methods:[],displayName:"WithVerticalChecklist"};var x,v,b;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
}`,...(E=(w=d.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};const Ze=["WithTextInput","WithStyleDanger","WithStylePositive","WithStyleDisabled","WithSegmentedControls","WithDropdown","WithVerticalChecklist"];export{p as WithDropdown,c as WithSegmentedControls,a as WithStyleDanger,l as WithStyleDisabled,m as WithStylePositive,s as WithTextInput,d as WithVerticalChecklist,Ze as __namedExportsOrder,Ye as default};
