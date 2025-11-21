import{r as i,j as e}from"./iframe-LEv1GSvY.js";import{a as M,C as R}from"./Checklist-DH_G7gnz.js";import{D as H,c as O}from"./Dropdown-CdbWAuhg.js";import{M as S}from"./MenuItem-B3as2R1k.js";import{S as q}from"./SegmentedControls-Bob_7IwD.js";import{T as g}from"./TextInput-CW45iaTr.js";import{g as L}from"./useMemoizedId-YPBy6EbL.js";import{a as h,b as C,H as G,F as n}from"./FormControl-CNZZySl_.js";import"./preload-helper-DlITqhEh.js";import"./useFocusable-stfJeIpU.js";import"./useFocusRing-CmQWnBCR.js";import"./useEffectEvent-g570qV22.js";import"./chain-BYYKUROJ.js";import"./index-w8RZ3Xa7.js";import"./useField-CCoyLB6s.js";import"./useLabels-CWRs9Jqj.js";import"./Checkbox-BGN2gp-7.js";import"./useFormValidationState-OkvhBaTv.js";import"./useControlledState-B2DC-eKR.js";import"./InputLabel-DxuW7zDn.js";import"./TooltipIcon-CV8X81_I.js";import"./LegacyTooltip-o5Kd4SF7.js";import"./useLink-saIWG3I9.js";import"./usePopper-C2pndz_I.js";import"./index-CgWYneLo.js";import"./Button-DUwtZbrH.js";import"./useButton-Cr6sqSYQ.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Portal-Bl2R-8KJ.js";import"./IconCheckMark-DuN6dQH8.js";import"./IconExclamationMarkCircle24-jUU22MCT.js";import"./IconExclamationMarkTriangle-BcYnUjX4.js";import"./IconExclamationMarkTriangle24-DU65-zzt.js";import"./IconQuestionMarkCircle-BRsB91tC.js";import"./IconMinus-BOXaew8y.js";import"./FocusScope-BqaDDR3P.js";import"./useOverlayTriggerState-B5L-ygsi.js";import"./useMenuTrigger-CyWsHXvS.js";import"./useLocalizedStringFormatter-Ddg6B2D6.js";import"./context-D0ah4ZX1.js";import"./VisuallyHidden-CBZQpDOf.js";import"./helper-DGlWRziH.js";import"./keyboard-CGqlBRCB.js";import"./SelectionManager-BSkRPO3C.js";import"./LoadingCircle-BwNxSYA8.js";import"./Trigger-B6ThISim.js";import"./IconCaretDown-Bq-EReh4.js";import"./IconCaretDown16-DcQxwk-i.js";import"./IconCross-DVGcdwIR.js";import"./IconTrashBin16-xy03U9Qa.js";import"./IconTrashBin24-Dx0UE5Kn.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DvmytOZ7.js";import"./IconCaretRight-CrxHTkIa.js";import"./elements-BOYmskOL.js";import"./proxy-6sVoxJjU.js";const Ye={title:"Components/Form Control",component:n,tags:["autodocs"],args:{style:h.Primary,disabled:!1,direction:C.Vertical,label:{children:"Input Label",required:!1,htmlFor:L(),tooltip:{content:"Tooltip Text"}},extra:"Extra Text or Element",helper:{text:"Helper Text (before/after) and variant (Primary/Success/Danger)",position:G.After},children:""},argTypes:{orientation:{options:Object.values(C),control:"select"},children:{table:{disable:!0}},style:{options:Object.values(h),control:"radio"}}},s=t=>{const[o,r]=i.useState("");return e.jsx(n,{clickable:!0,...t,children:e.jsx(g,{value:o,onChange:r})})},a=t=>{const[o,r]=i.useState("");return e.jsx(n,{...t,style:h.Danger,children:e.jsx(g,{value:o,onChange:r})})},m=t=>{const[o,r]=i.useState("");return e.jsx(n,{...t,style:h.Positive,children:e.jsx(g,{value:o,onChange:r})})},l=t=>{const[o,r]=i.useState("");return e.jsx(n,{...t,disabled:!0,children:e.jsx(g,{value:o,onChange:r})})},c=t=>{const[o,r]=i.useState("a");return e.jsx(n,{...t,children:e.jsx(q,{items:[{id:"1",value:"abc"},{id:"2",value:"def"},{id:"3",value:"ghi"}],activeItemId:o,onChange:r})})},p=t=>{const[o,r]=i.useState();return e.jsx(n,{...t,children:e.jsx(H,{onChange:I=>r(I),activeItemId:o,size:O.Small,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Small 1",size:S.Small},{id:"2",title:"Small 2",size:S.Small},{id:"3",title:"Small 3",size:S.Small}]}]})})},d=t=>{const[o,r]=i.useState([]),I=Array.from({length:5}).fill({}).map((J,u)=>({id:`checkbox-${u}`,value:`checkbox-${u}`,label:`Checkbox Nr. ${u}`,tooltip:{content:`Random Tooltip ${u}`}}));return e.jsx(n,{...t,children:e.jsx(M,{activeValues:o,setActiveValues:r,direction:R.Vertical,checkboxes:I})})};s.__docgenInfo={description:"",methods:[],displayName:"WithTextInput"};a.__docgenInfo={description:"",methods:[],displayName:"WithStyleDanger"};m.__docgenInfo={description:"",methods:[],displayName:"WithStylePositive"};l.__docgenInfo={description:"",methods:[],displayName:"WithStyleDisabled"};c.__docgenInfo={description:"",methods:[],displayName:"WithSegmentedControls"};p.__docgenInfo={description:"",methods:[],displayName:"WithDropdown"};d.__docgenInfo={description:"",methods:[],displayName:"WithVerticalChecklist"};var x,v,b;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
