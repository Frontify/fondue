import{r as i,j as e}from"./iframe-hrVkOCwH.js";import{a as M,C as R}from"./Checklist-DzcjhaOA.js";import{D as H,c as O}from"./Dropdown-84j--ydh.js";import{M as S}from"./MenuItem-DlkMY8wX.js";import{S as q}from"./SegmentedControls-gjynIlrO.js";import{T as g}from"./TextInput-DmxJRx96.js";import{g as L}from"./useMemoizedId-sOEvST2M.js";import{a as h,b as C,H as G,F as n}from"./FormControl-DVxoqDTe.js";import"./preload-helper-C1FmrZbK.js";import"./useFocusable-B4p0MNCv.js";import"./useFocusRing-1BNT7VFY.js";import"./useEffectEvent-r0uIPgQg.js";import"./chain--XmeI2qo.js";import"./index-B71KNn4Z.js";import"./useField-CmitCZja.js";import"./useLabels-CEhUj6kL.js";import"./Checkbox-BPm9Jugo.js";import"./useFormValidationState-BwX-GImz.js";import"./useControlledState-71UIMywV.js";import"./InputLabel-DavHylX_.js";import"./TooltipIcon-Cr95l-NA.js";import"./LegacyTooltip-DHrljL_9.js";import"./useLink-DOG0Yu1Y.js";import"./usePopper-J_p-icdG.js";import"./index-CGZABk5_.js";import"./Button-W5JU2GYF.js";import"./useButton-DZD6mn4U.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Portal-DTFr9_A2.js";import"./IconCheckMark-B-YCLBcL.js";import"./IconExclamationMarkCircle24-481k8n6W.js";import"./IconExclamationMarkTriangle-CBe5H8Hw.js";import"./IconExclamationMarkTriangle24-jdOtgNlK.js";import"./IconQuestionMarkCircle-DYtN5BBW.js";import"./IconMinus-D4AubFA7.js";import"./FocusScope-Cw-KBXLf.js";import"./useOverlayTriggerState-Cvso7mUw.js";import"./useMenuTrigger-dINMcV5G.js";import"./useLocalizedStringFormatter-CDoLW0UQ.js";import"./context-7EnkloMM.js";import"./VisuallyHidden-B2NBSuQA.js";import"./helper-AyX-w3Jl.js";import"./keyboard-DN5zZ3_G.js";import"./SelectionManager-dXuotmYo.js";import"./LoadingCircle-B35Oo3EB.js";import"./Trigger-Bgg3h0fg.js";import"./IconCaretDown-COnPOjBQ.js";import"./IconCaretDown16-CwmIioRV.js";import"./IconCross-CC8OVy8K.js";import"./IconTrashBin16-BhYglj6k.js";import"./IconTrashBin24-DlsKPU2P.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CGVUP28H.js";import"./IconCaretRight-qWk9Lipi.js";import"./elements-BOYmskOL.js";import"./proxy-BGY8fYuI.js";const Ye={title:"Components/Form Control",component:n,tags:["autodocs"],args:{style:h.Primary,disabled:!1,direction:C.Vertical,label:{children:"Input Label",required:!1,htmlFor:L(),tooltip:{content:"Tooltip Text"}},extra:"Extra Text or Element",helper:{text:"Helper Text (before/after) and variant (Primary/Success/Danger)",position:G.After},children:""},argTypes:{orientation:{options:Object.values(C),control:"select"},children:{table:{disable:!0}},style:{options:Object.values(h),control:"radio"}}},s=t=>{const[o,r]=i.useState("");return e.jsx(n,{clickable:!0,...t,children:e.jsx(g,{value:o,onChange:r})})},a=t=>{const[o,r]=i.useState("");return e.jsx(n,{...t,style:h.Danger,children:e.jsx(g,{value:o,onChange:r})})},m=t=>{const[o,r]=i.useState("");return e.jsx(n,{...t,style:h.Positive,children:e.jsx(g,{value:o,onChange:r})})},l=t=>{const[o,r]=i.useState("");return e.jsx(n,{...t,disabled:!0,children:e.jsx(g,{value:o,onChange:r})})},c=t=>{const[o,r]=i.useState("a");return e.jsx(n,{...t,children:e.jsx(q,{items:[{id:"1",value:"abc"},{id:"2",value:"def"},{id:"3",value:"ghi"}],activeItemId:o,onChange:r})})},p=t=>{const[o,r]=i.useState();return e.jsx(n,{...t,children:e.jsx(H,{onChange:I=>r(I),activeItemId:o,size:O.Small,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Small 1",size:S.Small},{id:"2",title:"Small 2",size:S.Small},{id:"3",title:"Small 3",size:S.Small}]}]})})},d=t=>{const[o,r]=i.useState([]),I=Array.from({length:5}).fill({}).map((J,u)=>({id:`checkbox-${u}`,value:`checkbox-${u}`,label:`Checkbox Nr. ${u}`,tooltip:{content:`Random Tooltip ${u}`}}));return e.jsx(n,{...t,children:e.jsx(M,{activeValues:o,setActiveValues:r,direction:R.Vertical,checkboxes:I})})};s.__docgenInfo={description:"",methods:[],displayName:"WithTextInput"};a.__docgenInfo={description:"",methods:[],displayName:"WithStyleDanger"};m.__docgenInfo={description:"",methods:[],displayName:"WithStylePositive"};l.__docgenInfo={description:"",methods:[],displayName:"WithStyleDisabled"};c.__docgenInfo={description:"",methods:[],displayName:"WithSegmentedControls"};p.__docgenInfo={description:"",methods:[],displayName:"WithDropdown"};d.__docgenInfo={description:"",methods:[],displayName:"WithVerticalChecklist"};var x,v,b;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
