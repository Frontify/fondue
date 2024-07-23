import{j as t}from"./jsx-runtime-Nms4Y4qS.js";import{r as c}from"./index-BwDkhjyp.js";import{T as C,a as I}from"./TextInput-BJ6WSDaF.js";import{I as F}from"./IconInfo-CXDuXiKK.js";import{I as v}from"./IconNook16-gldlwduk.js";import{I as E}from"./IconQuestionMark-BLFSQbL7.js";import{V as r}from"./validation-C9S5KgfE.js";import{F as m}from"./FormField-3oskhmlR.js";import{N}from"./NumberInput-frNAUTkN.js";import"./_commonjsHelpers-BosuxZz1.js";import"./useFocusRing-4Vnvtzpc.js";import"./SSRProvider-CYXx33DY.js";import"./LoadingCircle-CZrma5le.js";import"./merge-DI-veSMP.js";import"./IconCheckMark-CLvJH1sB.js";import"./IconSize-BcCrF_mi.js";import"./IconEyeOff-Dzh4tjis.js";import"./IconCross-Bt-I3opn.js";import"./IconExclamationMarkTriangle-CRTWkDyu.js";import"./IconExclamationMarkTriangle24-GqPjgFpk.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./focusStyle-CBFElZiz.js";import"./LegacyTooltip-BoEBGEhI.js";import"./useLink-DorAuuFQ.js";import"./useFocusable-CAGu0lKI.js";import"./chain-D5h1pgIF.js";import"./usePopper-ByXn8U-3.js";import"./index-BxibOwXx.js";import"./index-CfyPTyT-.js";import"./Button-CYWlMQhW.js";import"./useButton-DofEV6SJ.js";import"./Portal-By7XnO0v.js";import"./IconExclamationMarkCircle-Cob4vb5T.js";import"./IconExclamationMarkCircle24-DpwtNT9z.js";import"./IconQuestionMark16-BIJP4QEU.js";import"./VisuallyHidden-YFPGrsWM.js";import"./Tooltip-DYRhLsHJ.js";import"./useClickOutside-CKV3CrvD.js";import"./EnablePortalWrapper-I0EzvwWK.js";import"./elements-BOYmskOL.js";import"./dialog-Dre1eVQK.js";import"./input-B67_57M7.js";import"./Checkbox-DwYPwAWP.js";import"./useFormValidationState-Vs0Uifwm.js";import"./useControlledState-C0C-dzuH.js";import"./InputLabel-Cb39M_3M.js";import"./TooltipIcon-DgUrnRFN.js";import"./IconQuestionMarkCircle-C_agVHg1.js";import"./IconMinus-Bw7tNJhm.js";import"./Divider-DCi-HcbY.js";import"./FormControl-D7P3KZv0.js";import"./SegmentedControls-D3WaRgzO.js";import"./FocusScope-DYM0gkGr.js";import"./useField-BhCfq6jD.js";import"./useLabels-DH9bA-v0.js";import"./context-C2PaECDE.js";import"./motion-C48bHxkn.js";import"./Switch-28jLeicn.js";import"./TabItem-DYJEWVSF.js";import"./Tree-CVMTatqj.js";import"./immer-DBm1MMjE.js";import"./IconGrabHandle12-IS3l0vsO.js";import"./Trigger-BkAUJNF7.js";import"./IconCaretDown-Cxrx1sF_.js";import"./IconCaretDown16-BGp5IVAI.js";import"./IconTrashBin-Bl46mt1V.js";import"./IconTrashBin16-qlTE457i.js";import"./IconTrashBin24-CvdAkIgz.js";import"./IconPlus16-DMEnDMzI.js";const Pe={title:"Components/FormField",component:m,tags:["autodocs"],argTypes:{children:{description:"Input element to be bonded to label.",name:"children"},label:{description:"Label object to pass the for the label element.",name:"label",control:{type:"object"}},error:{description:"Boolean flag to indicate a error state.",name:"error",defaultValue:!1,control:{type:"boolean"}},errorText:{description:"Error text to display on error state.",name:"errorText",defaultValue:void 0,control:{type:"text"}},errorTextColor:{description:"Token alisa to apply to the error message text.",options:Object.values(r),defaultValue:r.Error,control:{type:"select"}},helperText:{description:"Helper text to display on helper state.",name:"helperText",defaultValue:void 0,control:{type:"text"}},helperTextColor:{description:"Token alisa to apply to the helper message text.",options:Object.values(r),defaultValue:r.Default,control:{type:"select"}},hiddenLabel:{description:"Boolean flag to hide label text.",name:"hiddenLabel",defaultValue:!1,control:{type:"boolean"}},disabled:{description:"Boolean flag to disable the entire element.",name:"disabled",defaultValue:!1,control:{type:"boolean"}},readOnly:{description:"Boolean flag to make entire element a readOnly state.",name:"readOnly",defaultValue:!1,control:{type:"boolean"}}},args:{error:!1}},s=e=>{const[l,a]=c.useState(void 0),i=u=>{e.error=u?u<0:!1,a(u)},o=e.error?r.Error:r.Success;return t.jsx(m,{...e,label:{text:"Number Greater than 0",secondaryLabel:"1/10",required:!0},errorText:"Value must be greater and 0.",status:isNaN(Number(l))?r.Default:o,children:t.jsx(N,{controls:!0,stepInterval:20,clearable:!0,onChange:i,suffix:"px",decorator:t.jsx(v,{}),placeholder:"Enter a number..."})})},p=e=>{const[l,a]=c.useState(""),i=o=>a(o.length>0?o:"");return t.jsx(m,{...e,label:{text:"Enter some text",secondaryLabel:"4/10",hugWidth:!0},helperText:"I am a some helper text with a 'warning' text color.",helperTextColor:r.Warning,children:t.jsx(C,{type:I.Text,onChange:i,value:l})})},n=e=>{const[l,a]=c.useState(""),i=o=>{o.length>0?(a(o),e.error=!/^a+$/.test(o)):(a(""),e.error=!1)};return t.jsx(m,{...e,label:{text:"Only a's",hugWidth:!0,tooltips:[{content:"Only enter lowercase a's",children:t.jsx(E,{}),size:"compact"},{content:"I am tooltip number 1",children:t.jsx(F,{}),size:"compact"}]},errorText:"Please only enter the letter 'a'",errorTextColor:r.Error,children:t.jsx(C,{type:I.Text,onChange:i,value:l})})};n.parameters={docs:{source:{type:"code"}}};s.__docgenInfo={description:"",methods:[],displayName:"Default"};p.__docgenInfo={description:"",methods:[],displayName:"InlineWithHelperText"};n.__docgenInfo={description:"",methods:[],displayName:"WithError"};var d,h,x;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
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
}`,...(T=(y=n.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};const Qe=["Default","InlineWithHelperText","WithError"];export{s as Default,p as InlineWithHelperText,n as WithError,Qe as __namedExportsOrder,Pe as default};
