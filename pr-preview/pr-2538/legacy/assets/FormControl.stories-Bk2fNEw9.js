import{r as i,j as t}from"./iframe-B6wMFBmr.js";import{a as M,C as R}from"./Checklist-CBGblB0G.js";import{D as H,c as O}from"./Dropdown-BZR8qXnN.js";import{M as S}from"./MenuItem-DDRbAxwv.js";import{S as q}from"./SegmentedControls-COnHEPY7.js";import{T as g}from"./TextInput-tcJ9GSxD.js";import{g as L}from"./useMemoizedId-DnKqk2fp.js";import{a as h,b as C,H as G,F as n}from"./FormControl-BerGKFeK.js";import"./preload-helper-B3RP-zrM.js";import"./useFocusable-k5y2-4wJ.js";import"./useFocusRing-CGF_IT6k.js";import"./useEffectEvent-CikN4lv1.js";import"./chain-DULsJ5c3.js";import"./index-BEaJUMGy.js";import"./useField-Dp7AoHgr.js";import"./useLabels-iV6M4uY7.js";import"./Checkbox-NkJHbado.js";import"./useFormValidationState-CYXbRssD.js";import"./useControlledState-PCU4xVfe.js";import"./InputLabel-QH3KoYmW.js";import"./TooltipIcon-W-6H6r9U.js";import"./LegacyTooltip-BCilkNdt.js";import"./useLink-DkTIgE5u.js";import"./usePopper-0MaFEurT.js";import"./index-8VFt0Zma.js";import"./Button-BAqzJ5Pv.js";import"./useButton-DD58yLyN.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Portal-nAgA0YlW.js";import"./IconCheckMark-DBwBkYZ5.js";import"./IconExclamationMarkCircle24-DoWZywMv.js";import"./IconExclamationMarkTriangle-BYVM_8KN.js";import"./IconExclamationMarkTriangle24-CQVhFF9W.js";import"./IconQuestionMarkCircle-I-XoRTAy.js";import"./IconMinus-8sJ1gpUk.js";import"./IconMinus16-DYxNzZXx.js";import"./FocusScope-Dt4zdXll.js";import"./useOverlayTriggerState-COWLY9Bb.js";import"./useMenuTrigger-B_xujHOn.js";import"./useLocalizedStringFormatter-_44spkyP.js";import"./context-an3UwHXz.js";import"./VisuallyHidden-Bk4N6Mql.js";import"./helper-CbE7pDTg.js";import"./keyboard-e0C7KN6K.js";import"./SelectionManager-VAVtIvSp.js";import"./LoadingCircle-CGnUCcrv.js";import"./Trigger-BePnZEUN.js";import"./IconCaretDown-cafC8Hpv.js";import"./IconCaretDown16-3J6DVSTn.js";import"./IconCross-YTa4RDxM.js";import"./IconTrashBin16-BtMaa5md.js";import"./IconTrashBin24-Lo7FQUwm.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BhSC5jqe.js";import"./IconCaretRight-ByFVwKQK.js";import"./elements-BOYmskOL.js";import"./proxy-s3nNbv_u.js";const Zt={title:"Components/Form Control",component:n,tags:["autodocs"],args:{style:h.Primary,disabled:!1,direction:C.Vertical,label:{children:"Input Label",required:!1,htmlFor:L(),tooltip:{content:"Tooltip Text"}},extra:"Extra Text or Element",helper:{text:"Helper Text (before/after) and variant (Primary/Success/Danger)",position:G.After},children:""},argTypes:{orientation:{options:Object.values(C),control:"select"},children:{table:{disable:!0}},style:{options:Object.values(h),control:"radio"}}},s=e=>{const[o,r]=i.useState("");return t.jsx(n,{clickable:!0,...e,children:t.jsx(g,{value:o,onChange:r})})},a=e=>{const[o,r]=i.useState("");return t.jsx(n,{...e,style:h.Danger,children:t.jsx(g,{value:o,onChange:r})})},m=e=>{const[o,r]=i.useState("");return t.jsx(n,{...e,style:h.Positive,children:t.jsx(g,{value:o,onChange:r})})},l=e=>{const[o,r]=i.useState("");return t.jsx(n,{...e,disabled:!0,children:t.jsx(g,{value:o,onChange:r})})},c=e=>{const[o,r]=i.useState("a");return t.jsx(n,{...e,children:t.jsx(q,{items:[{id:"1",value:"abc"},{id:"2",value:"def"},{id:"3",value:"ghi"}],activeItemId:o,onChange:r})})},p=e=>{const[o,r]=i.useState();return t.jsx(n,{...e,children:t.jsx(H,{onChange:I=>r(I),activeItemId:o,size:O.Small,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Small 1",size:S.Small},{id:"2",title:"Small 2",size:S.Small},{id:"3",title:"Small 3",size:S.Small}]}]})})},d=e=>{const[o,r]=i.useState([]),I=Array.from({length:5}).fill({}).map((J,u)=>({id:`checkbox-${u}`,value:`checkbox-${u}`,label:`Checkbox Nr. ${u}`,tooltip:{content:`Random Tooltip ${u}`}}));return t.jsx(n,{...e,children:t.jsx(M,{activeValues:o,setActiveValues:r,direction:R.Vertical,checkboxes:I})})};s.__docgenInfo={description:"",methods:[],displayName:"WithTextInput"};a.__docgenInfo={description:"",methods:[],displayName:"WithStyleDanger"};m.__docgenInfo={description:"",methods:[],displayName:"WithStylePositive"};l.__docgenInfo={description:"",methods:[],displayName:"WithStyleDisabled"};c.__docgenInfo={description:"",methods:[],displayName:"WithSegmentedControls"};p.__docgenInfo={description:"",methods:[],displayName:"WithDropdown"};d.__docgenInfo={description:"",methods:[],displayName:"WithVerticalChecklist"};var x,v,b;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
