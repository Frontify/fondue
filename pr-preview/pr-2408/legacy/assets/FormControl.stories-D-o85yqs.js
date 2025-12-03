import{r as i,j as t}from"./iframe-Dp4fbuuy.js";import{a as M,C as R}from"./Checklist-BhbwMLAN.js";import{D as H,c as O}from"./Dropdown-CQy6XHE7.js";import{M as S}from"./MenuItem-DBCptwPa.js";import{S as q}from"./SegmentedControls-BDF6f0un.js";import{T as g}from"./TextInput-B7uBBf5A.js";import{g as L}from"./useMemoizedId-BUNTmYDx.js";import{a as h,b as C,H as G,F as n}from"./FormControl-BXaPXzvE.js";import"./preload-helper-DyHTrhc7.js";import"./useFocusable-CeGMk2ep.js";import"./useFocusRing-BExXxzqs.js";import"./useEffectEvent-CfvH5P65.js";import"./chain-CGUvIyZV.js";import"./index-lmvN-6Hm.js";import"./useField-BysF95Kl.js";import"./useLabels-CEaoGjYm.js";import"./Checkbox-EwmFMRA6.js";import"./useFormValidationState-C5f-lQ-E.js";import"./useControlledState-D7rifX7W.js";import"./InputLabel-DPYz3LQq.js";import"./TooltipIcon-HG7TB1cj.js";import"./LegacyTooltip-yJhGCXdN.js";import"./useLink-DIITzRJO.js";import"./usePopper-Cbxvd94B.js";import"./index-ByEqKqlR.js";import"./Button-hpaYI8nC.js";import"./useButton-uXbj8Tmo.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Portal-k2uf4qJr.js";import"./IconCheckMark-BYsPbMZM.js";import"./IconExclamationMarkCircle24-X1Y3J7QY.js";import"./IconExclamationMarkTriangle-MgLAzRKW.js";import"./IconExclamationMarkTriangle24-Xr7VtV80.js";import"./IconQuestionMarkCircle-aiPeRZ32.js";import"./IconMinus-Z2Grj69L.js";import"./IconMinus16-CuHxE3yT.js";import"./FocusScope-CMfYuLFC.js";import"./useOverlayTriggerState-BRVPNNzn.js";import"./useMenuTrigger-B7PLvfsf.js";import"./useLocalizedStringFormatter-xWAGHEW4.js";import"./context-BJ9Z_pO_.js";import"./VisuallyHidden-DkTZPmY2.js";import"./helper-D521602e.js";import"./keyboard-CK7Gw1of.js";import"./SelectionManager-CtJbuIt7.js";import"./LoadingCircle-DxhuergG.js";import"./Trigger-BpMBtIi6.js";import"./IconCaretDown-CoFnmUrM.js";import"./IconCaretDown16-DKk_tbP0.js";import"./IconCross-5hMYBooT.js";import"./IconTrashBin16-p1WSYv39.js";import"./IconTrashBin24-B2OaCDTK.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CgTetPBk.js";import"./IconCaretRight-Ds--FfDY.js";import"./elements-BOYmskOL.js";import"./proxy-DjshYo82.js";const Zt={title:"Components/Form Control",component:n,tags:["autodocs"],args:{style:h.Primary,disabled:!1,direction:C.Vertical,label:{children:"Input Label",required:!1,htmlFor:L(),tooltip:{content:"Tooltip Text"}},extra:"Extra Text or Element",helper:{text:"Helper Text (before/after) and variant (Primary/Success/Danger)",position:G.After},children:""},argTypes:{orientation:{options:Object.values(C),control:"select"},children:{table:{disable:!0}},style:{options:Object.values(h),control:"radio"}}},s=e=>{const[o,r]=i.useState("");return t.jsx(n,{clickable:!0,...e,children:t.jsx(g,{value:o,onChange:r})})},a=e=>{const[o,r]=i.useState("");return t.jsx(n,{...e,style:h.Danger,children:t.jsx(g,{value:o,onChange:r})})},m=e=>{const[o,r]=i.useState("");return t.jsx(n,{...e,style:h.Positive,children:t.jsx(g,{value:o,onChange:r})})},l=e=>{const[o,r]=i.useState("");return t.jsx(n,{...e,disabled:!0,children:t.jsx(g,{value:o,onChange:r})})},c=e=>{const[o,r]=i.useState("a");return t.jsx(n,{...e,children:t.jsx(q,{items:[{id:"1",value:"abc"},{id:"2",value:"def"},{id:"3",value:"ghi"}],activeItemId:o,onChange:r})})},p=e=>{const[o,r]=i.useState();return t.jsx(n,{...e,children:t.jsx(H,{onChange:I=>r(I),activeItemId:o,size:O.Small,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Small 1",size:S.Small},{id:"2",title:"Small 2",size:S.Small},{id:"3",title:"Small 3",size:S.Small}]}]})})},d=e=>{const[o,r]=i.useState([]),I=Array.from({length:5}).fill({}).map((J,u)=>({id:`checkbox-${u}`,value:`checkbox-${u}`,label:`Checkbox Nr. ${u}`,tooltip:{content:`Random Tooltip ${u}`}}));return t.jsx(n,{...e,children:t.jsx(M,{activeValues:o,setActiveValues:r,direction:R.Vertical,checkboxes:I})})};s.__docgenInfo={description:"",methods:[],displayName:"WithTextInput"};a.__docgenInfo={description:"",methods:[],displayName:"WithStyleDanger"};m.__docgenInfo={description:"",methods:[],displayName:"WithStylePositive"};l.__docgenInfo={description:"",methods:[],displayName:"WithStyleDisabled"};c.__docgenInfo={description:"",methods:[],displayName:"WithSegmentedControls"};p.__docgenInfo={description:"",methods:[],displayName:"WithDropdown"};d.__docgenInfo={description:"",methods:[],displayName:"WithVerticalChecklist"};var x,v,b;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
