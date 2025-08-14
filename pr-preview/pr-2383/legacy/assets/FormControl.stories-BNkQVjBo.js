import{j as t}from"./jsx-runtime-BYYWji4R.js";import{r as i}from"./index-ClcD9ViR.js";import{a as M,C as R}from"./Checklist-Du0GtJKj.js";import{c as H,b as O}from"./Dropdown-4n3OkMqG.js";import{M as S}from"./MenuItem-DLnzVIUf.js";import{S as q}from"./SegmentedControls-yt7MXrCb.js";import{T as g}from"./TextInput-DxGfxErH.js";import{g as L}from"./useMemoizedId-DU5NJZZj.js";import{a as h,b as C,H as G,F as n}from"./FormControl-BkRGxkdF.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./useFocusable-NpJIjJzn.js";import"./useFocusRing-CqhiwHAH.js";import"./useEffectEvent-23OTMzEQ.js";import"./chain-zZtnTS2i.js";import"./index-Cho7bklK.js";import"./useField-DK1vwUqC.js";import"./useLabels-B-KZ60t7.js";import"./Checkbox-5h-5NZvX.js";import"./useFormValidationState-CY2oi0R5.js";import"./useControlledState-CbyHarIm.js";import"./InputLabel-BBoeJyMH.js";import"./TooltipIcon-CBNLwOmC.js";import"./LegacyTooltip-DwGdpKnT.js";import"./useLink-DLd-zCvm.js";import"./usePopper-BHXQC2xD.js";import"./index-DlnOb27V.js";import"./Button-BkcxChke.js";import"./useButton-CmN_Qqm3.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-BtNTXUM4.js";import"./merge-DI-veSMP.js";import"./Portal-B3A1C5qZ.js";import"./IconCheckMark-DDrIoLdu.js";import"./IconExclamationMarkCircle24-4UiwpX0o.js";import"./IconExclamationMarkTriangle-DOh84ahI.js";import"./IconExclamationMarkTriangle24-BCoex7hw.js";import"./IconQuestionMarkCircle-7EPrDyIp.js";import"./IconMinus-DVuqM0Be.js";import"./IconMinus16-C5LwBrlK.js";import"./FocusScope-BbG7qqtO.js";import"./useOverlayTriggerState-Do1lhetf.js";import"./useMenuTrigger-WEg3SWYq.js";import"./useLocalizedStringFormatter-DuHRzRSj.js";import"./context-dZDq9eSh.js";import"./VisuallyHidden-BJ4JcGHV.js";import"./helper-kX8HYG1i.js";import"./isScrollable-BSEN4xi5.js";import"./SelectionManager-C5uJtM9S.js";import"./LoadingCircle-N4gckcbl.js";import"./Trigger-DtS_F8DS.js";import"./IconCaretDown-BLgqrlDL.js";import"./IconCaretDown16-Df8Xsbqc.js";import"./IconCross-BVasaH61.js";import"./IconTrashBin16-DOiZQ5Am.js";import"./IconTrashBin24-10Yg3nt7.js";import"./validation-CJXPAjNB.js";import"./EnablePortalWrapper-DHpdIRHB.js";import"./IconCaretRight-CAeLeSzU.js";import"./elements-BOYmskOL.js";import"./motion-DqKuqH19.js";const te={title:"Components/Form Control",component:n,tags:["autodocs"],args:{style:h.Primary,disabled:!1,direction:C.Vertical,label:{children:"Input Label",required:!1,htmlFor:L(),tooltip:{content:"Tooltip Text"}},extra:"Extra Text or Element",helper:{text:"Helper Text (before/after) and variant (Primary/Success/Danger)",position:G.After},children:""},argTypes:{orientation:{options:Object.values(C),control:"select"},children:{table:{disable:!0}},style:{options:Object.values(h),control:"radio"}}},s=e=>{const[o,r]=i.useState("");return t.jsx(n,{clickable:!0,...e,children:t.jsx(g,{value:o,onChange:r})})},a=e=>{const[o,r]=i.useState("");return t.jsx(n,{...e,style:h.Danger,children:t.jsx(g,{value:o,onChange:r})})},m=e=>{const[o,r]=i.useState("");return t.jsx(n,{...e,style:h.Positive,children:t.jsx(g,{value:o,onChange:r})})},l=e=>{const[o,r]=i.useState("");return t.jsx(n,{...e,disabled:!0,children:t.jsx(g,{value:o,onChange:r})})},c=e=>{const[o,r]=i.useState("a");return t.jsx(n,{...e,children:t.jsx(q,{items:[{id:"1",value:"abc"},{id:"2",value:"def"},{id:"3",value:"ghi"}],activeItemId:o,onChange:r})})},p=e=>{const[o,r]=i.useState();return t.jsx(n,{...e,children:t.jsx(H,{onChange:I=>r(I),activeItemId:o,size:O.Small,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Small 1",size:S.Small},{id:"2",title:"Small 2",size:S.Small},{id:"3",title:"Small 3",size:S.Small}]}]})})},d=e=>{const[o,r]=i.useState([]),I=Array.from({length:5}).fill({}).map((J,u)=>({id:`checkbox-${u}`,value:`checkbox-${u}`,label:`Checkbox Nr. ${u}`,tooltip:{content:`Random Tooltip ${u}`}}));return t.jsx(n,{...e,children:t.jsx(M,{activeValues:o,setActiveValues:r,direction:R.Vertical,checkboxes:I})})};s.__docgenInfo={description:"",methods:[],displayName:"WithTextInput"};a.__docgenInfo={description:"",methods:[],displayName:"WithStyleDanger"};m.__docgenInfo={description:"",methods:[],displayName:"WithStylePositive"};l.__docgenInfo={description:"",methods:[],displayName:"WithStyleDisabled"};c.__docgenInfo={description:"",methods:[],displayName:"WithSegmentedControls"};p.__docgenInfo={description:"",methods:[],displayName:"WithDropdown"};d.__docgenInfo={description:"",methods:[],displayName:"WithVerticalChecklist"};var x,v,b;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const [input, setInput] = useState('');
  return <FormControl clickable={true} {...args}>
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
  return <FormControl {...args} disabled={true}>
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
}`,...(E=(w=d.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};const ee=["WithTextInput","WithStyleDanger","WithStylePositive","WithStyleDisabled","WithSegmentedControls","WithDropdown","WithVerticalChecklist"];export{p as WithDropdown,c as WithSegmentedControls,a as WithStyleDanger,l as WithStyleDisabled,m as WithStylePositive,s as WithTextInput,d as WithVerticalChecklist,ee as __namedExportsOrder,te as default};
