import{j as t}from"./jsx-runtime-Nms4Y4qS.js";import{r as c}from"./index-BwDkhjyp.js";import{T as C,a as I}from"./TextInput-D6o7MZMT.js";import{I as F}from"./IconInfo-DtUT3D8z.js";import{I as v}from"./IconNook16-iV5-oZVh.js";import{I as E}from"./IconQuestionMark-BJdgkCAh.js";import{V as r}from"./validation-C9S5KgfE.js";import{F as u}from"./FormField-eSlHTG5R.js";import{N}from"./NumberInput-CV4sAy6m.js";import"./_commonjsHelpers-BosuxZz1.js";import"./useFocusRing-Vzyl7-Lk.js";import"./SSRProvider-CYXx33DY.js";import"./LoadingCircle-CZrma5le.js";import"./merge-DI-veSMP.js";import"./IconCheckMark-BVQYjlwc.js";import"./IconSize-BcCrF_mi.js";import"./IconEyeOff-BaqRyiPL.js";import"./IconCross-BUeQrH0h.js";import"./IconExclamationMarkTriangle-BucVSAOs.js";import"./IconExclamationMarkTriangle24-C3Ss9MHq.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./focusStyle-CBFElZiz.js";import"./LegacyTooltip-U-DDTH1O.js";import"./useLink-DsbBkAu3.js";import"./useFocusable-BzwuNUMa.js";import"./chain-CSFqNvhK.js";import"./usePopper-189yIbFE.js";import"./index-Drt3gf4w.js";import"./index-CfyPTyT-.js";import"./Button-BV9H8hN8.js";import"./useButton-DK39Zf6-.js";import"./Portal-BqNm3PMR.js";import"./IconExclamationMarkCircle-BkFYjnTO.js";import"./IconExclamationMarkCircle24-ChDY1Cve.js";import"./IconQuestionMark16-D4W_qAPx.js";import"./VisuallyHidden-do5PyVOr.js";import"./Tooltip-BrTzUZdY.js";import"./useClickOutside-CKV3CrvD.js";import"./EnablePortalWrapper-dSQoLOC5.js";import"./elements-BOYmskOL.js";import"./dialog-Dre1eVQK.js";import"./input-CFJXNmEQ.js";import"./Divider-DCi-HcbY.js";import"./FormControl-Bf6ahret.js";import"./InputLabel-9u13kwZY.js";import"./TooltipIcon-Dt8YeYVx.js";import"./IconQuestionMarkCircle-CMNESB9s.js";import"./SegmentedControls-oFV6ODk8.js";import"./useFormValidationState-Bo5Bz1o-.js";import"./FocusScope-CyCMBH7m.js";import"./useField-BS3w6xY_.js";import"./useLabels-Bp6d37Qr.js";import"./context-C2PaECDE.js";import"./useControlledState-C0C-dzuH.js";import"./motion-C48bHxkn.js";import"./Switch-BeOG5SH7.js";import"./TabItem-DYJEWVSF.js";import"./Tree-CR7Q55xc.js";import"./immer-DBm1MMjE.js";import"./IconGrabHandle12-EPEmE8ra.js";import"./Trigger-CcP8S0KO.js";import"./IconCaretDown-C-LXN2Z7.js";import"./IconCaretDown16-Bqoo7UzD.js";import"./IconTrashBin-ruSc1bNE.js";import"./IconTrashBin16-D8pYIjKc.js";import"./IconTrashBin24-DrDNK9RT.js";import"./IconMinus16-ChDakrvn.js";import"./IconPlus16-xrjAMgl7.js";const Me={title:"Components/FormField",component:u,tags:["autodocs"],argTypes:{children:{description:"Input element to be bonded to label.",name:"children"},label:{description:"Label object to pass the for the label element.",name:"label",control:{type:"object"}},error:{description:"Boolean flag to indicate a error state.",name:"error",defaultValue:!1,control:{type:"boolean"}},errorText:{description:"Error text to display on error state.",name:"errorText",defaultValue:void 0,control:{type:"text"}},errorTextColor:{description:"Token alisa to apply to the error message text.",options:Object.values(r),defaultValue:r.Error,control:{type:"select"}},helperText:{description:"Helper text to display on helper state.",name:"helperText",defaultValue:void 0,control:{type:"text"}},helperTextColor:{description:"Token alisa to apply to the helper message text.",options:Object.values(r),defaultValue:r.Default,control:{type:"select"}},hiddenLabel:{description:"Boolean flag to hide label text.",name:"hiddenLabel",defaultValue:!1,control:{type:"boolean"}},disabled:{description:"Boolean flag to disable the entire element.",name:"disabled",defaultValue:!1,control:{type:"boolean"}},readOnly:{description:"Boolean flag to make entire element a readOnly state.",name:"readOnly",defaultValue:!1,control:{type:"boolean"}}},args:{error:!1}},s=e=>{const[l,a]=c.useState(void 0),i=m=>{e.error=m?m<0:!1,a(m)},o=e.error?r.Error:r.Success;return t.jsx(u,{...e,label:{text:"Number Greater than 0",secondaryLabel:"1/10",required:!0},errorText:"Value must be greater and 0.",status:isNaN(Number(l))?r.Default:o,children:t.jsx(N,{controls:!0,stepInterval:20,clearable:!0,onChange:i,suffix:"px",decorator:t.jsx(v,{}),placeholder:"Enter a number..."})})},p=e=>{const[l,a]=c.useState(""),i=o=>a(o.length>0?o:"");return t.jsx(u,{...e,label:{text:"Enter some text",secondaryLabel:"4/10",hugWidth:!0},helperText:"I am a some helper text with a 'warning' text color.",helperTextColor:r.Warning,children:t.jsx(C,{type:I.Text,onChange:i,value:l})})},n=e=>{const[l,a]=c.useState(""),i=o=>{o.length>0?(a(o),e.error=!/^a+$/.test(o)):(a(""),e.error=!1)};return t.jsx(u,{...e,label:{text:"Only a's",hugWidth:!0,tooltips:[{content:"Only enter lowercase a's",children:t.jsx(E,{}),size:"compact"},{content:"I am tooltip number 1",children:t.jsx(F,{}),size:"compact"}]},errorText:"Please only enter the letter 'a'",errorTextColor:r.Error,children:t.jsx(C,{type:I.Text,onChange:i,value:l})})};n.parameters={docs:{source:{type:"code"}}};s.__docgenInfo={description:"",methods:[],displayName:"Default"};p.__docgenInfo={description:"",methods:[],displayName:"InlineWithHelperText"};n.__docgenInfo={description:"",methods:[],displayName:"WithError"};var d,h,x;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
  const [currentValue, setCurrentValue] = useState<number | string | undefined>(undefined);
  const handleChange = (value?: number) => {
    args.error = value ? value < 0 : false;
    setCurrentValue(value);
  };
  const currentValidation = args.error ? Validation.Error : Validation.Success;
  return <FormField {...args} label={{
    text: 'Number Greater than 0',
    secondaryLabel: '1/10',
    required: true
  }} errorText={'Value must be greater and 0.'} status={isNaN(Number(currentValue)) ? Validation.Default : currentValidation}>
            <NumberInput controls={true} stepInterval={20} clearable={true} onChange={handleChange} suffix="px" decorator={<IconNook16 />} placeholder="Enter a number..." />
        </FormField>;
}`,...(x=(h=s.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var g,f,b;p.parameters={...p.parameters,docs:{...(g=p.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const [currentValue, setCurrentValue] = useState<string>('');
  const handleChange = (value: string) => setCurrentValue(value.length > 0 ? value : '');
  return <FormField {...args} label={{
    text: 'Enter some text',
    secondaryLabel: '4/10',
    hugWidth: true
  }} helperText="I am a some helper text with a 'warning' text color." helperTextColor={Validation.Warning}>
            <TextInput type={TextInputType.Text} onChange={handleChange} value={currentValue} />
        </FormField>;
}`,...(b=(f=p.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var V,y,T;n.parameters={...n.parameters,docs:{...(V=n.parameters)==null?void 0:V.docs,source:{originalSource:`args => {
  const [currentValue, setCurrentValue] = useState<string>('');
  const handleChange = (value: string) => {
    if (value.length > 0) {
      setCurrentValue(value);
      args.error = !/^a+$/.test(value);
    } else {
      setCurrentValue('');
      args.error = false;
    }
  };
  return <FormField {...args} label={{
    text: "Only a's",
    hugWidth: true,
    tooltips: [{
      content: "Only enter lowercase a's",
      children: <IconQuestionMark />,
      size: 'compact'
    }, {
      content: 'I am tooltip number 1',
      children: <IconInfo />,
      size: 'compact'
    }]
  }} errorText={"Please only enter the letter 'a'"} errorTextColor={Validation.Error}>
            <TextInput type={TextInputType.Text} onChange={handleChange} value={currentValue} />
        </FormField>;
}`,...(T=(y=n.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};const Pe=["Default","InlineWithHelperText","WithError"];export{s as Default,p as InlineWithHelperText,n as WithError,Pe as __namedExportsOrder,Me as default};
