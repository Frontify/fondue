import{j as t}from"./jsx-runtime-BYYWji4R.js";import{r as p}from"./index-ClcD9ViR.js";import{T as o}from"./TooltipIcon-0QxfgwfT.js";import{I as x}from"./LegacyTooltip-BMTu7B_J.js";import{I as T}from"./IconInfo-i1bGpKXn.js";import{I as f}from"./IconQuestionMarkCircle-7EPrDyIp.js";import{C as r,a as I,b as w,c as q}from"./Checkbox-B78qFUew.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-BtNTXUM4.js";import"./merge-DI-veSMP.js";import"./useLink-DLd-zCvm.js";import"./useFocusable-NpJIjJzn.js";import"./useFocusRing-CqhiwHAH.js";import"./useEffectEvent-23OTMzEQ.js";import"./chain-zZtnTS2i.js";import"./index-Cho7bklK.js";import"./usePopper-BHXQC2xD.js";import"./index-DlnOb27V.js";import"./Button-BkcxChke.js";import"./useButton-CmN_Qqm3.js";import"./Portal-B3A1C5qZ.js";import"./useMemoizedId-BicaxHcO.js";import"./generateRandomId-Dxm0_E-2.js";import"./IconCheckMark-CqkZOEh6.js";import"./IconCheckMark16-BSi_kkf1.js";import"./IconDocument-BT3LAKWU.js";import"./IconExclamationMarkCircle24-4UiwpX0o.js";import"./IconExclamationMarkTriangle-DebOIQd7.js";import"./IconExclamationMarkTriangle16-DGaIrm4W.js";import"./IconExclamationMarkTriangle24-BCoex7hw.js";import"./useFormValidationState-CY2oi0R5.js";import"./useControlledState-CbyHarIm.js";import"./InputLabel-CwZoIbN1.js";import"./IconMinus-DVuqM0Be.js";import"./IconMinus16-C5LwBrlK.js";const pe={title:"Components/Checkbox",tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Checkbox component](/docs/current_components-checkbox--documentation) instead."}}},argTypes:{state:{options:Object.values(r),control:{type:"radio"}},emphasis:{options:Object.values(w),control:{type:"radio"}},size:{options:Object.values(I),control:{type:"radio"}},onChange:{table:{disable:!1},action:"Change"}},args:{state:r.Unchecked,disabled:!1,required:!1,emphasis:"Default",size:"Default",value:"whatever-you'd-like",label:"Checkbox label",hideLabel:!1,ariaLabel:"Custom aria label",helperText:"Note about this input",tooltip:{content:"Lorem ipsum dolor sit amet."}}},e=({wrapperClasses:y,...s})=>{const[S,i]=p.useState(s.state||r.Unchecked);return p.useEffect(()=>i(s.state||r.Unchecked),[s.state]),t.jsx("div",{className:y,children:t.jsx(q,{...s,state:S,onChange:c=>{i(c?r.Checked:r.Unchecked),s.onChange&&s.onChange(c)}})})},a=e.bind({});a.args={...e.args,tooltip:[{triggerIcon:t.jsx(T,{}),triggerStyle:o.Danger,content:"Tooltip 1"},{triggerIcon:t.jsx(f,{}),triggerStyle:o.Primary,content:"Tooltip 2"},{triggerIcon:t.jsx(x,{filled:!0}),triggerStyle:o.Warning,content:"Tooltip 3"}]};const n=e.bind({});n.args={...e.args,tooltip:[{triggerIcon:t.jsx(T,{}),triggerStyle:o.Danger,content:"Tooltip 1"},{triggerIcon:t.jsx(f,{}),triggerStyle:o.Primary,content:"Tooltip 2"},{triggerIcon:t.jsx(x,{filled:!0}),triggerStyle:o.Warning,content:"Tooltip 3"}],wrapperClasses:"tw-w-40"};e.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{id:{required:!1,tsType:{name:"string"},description:""},state:{required:!1,tsType:{name:"CheckboxState"},description:""},emphasis:{required:!1,tsType:{name:"CheckboxEmphasis"},description:""},size:{required:!1,tsType:{name:"CheckboxSize"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(isChecked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isChecked"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"string"},description:""},hideLabel:{required:!1,tsType:{name:"boolean"},description:""},tooltip:{required:!1,tsType:{name:"union",raw:`| (LegacyTooltipProps & Pick<TooltipIconProps, 'triggerStyle' | 'triggerIcon'>)
| (LegacyTooltipProps & Pick<TooltipIconProps, 'triggerStyle' | 'triggerIcon'>)[]`,elements:[{name:"unknown"},{name:"Array",elements:[{name:"unknown"}],raw:"(LegacyTooltipProps & Pick<TooltipIconProps, 'triggerStyle' | 'triggerIcon'>)[]"}]},description:""},helperText:{required:!1,tsType:{name:"string"},description:""},"aria-label":{required:!1,tsType:{name:"string"},description:""},groupInputProps:{required:!1,tsType:{name:"HTMLAttributes",elements:[{name:"HTMLElement"}],raw:"HTMLAttributes<HTMLElement>"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},wrapperClasses:{required:!0,tsType:{name:"string"},description:""}}};var d,l,h;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`({
  wrapperClasses,
  ...args
}: CheckboxProps & {
  wrapperClasses: string;
}) => {
  const [checked, setChecked] = useState<CheckboxState>(args.state || CheckboxState.Unchecked);
  useEffect(() => setChecked(args.state || CheckboxState.Unchecked), [args.state]);
  return <div className={wrapperClasses}>
            <CheckboxComponent {...args} state={checked} onChange={isChecked => {
      setChecked(isChecked ? CheckboxState.Checked : CheckboxState.Unchecked);
      args.onChange && args.onChange(isChecked);
    }} />
        </div>;
}`,...(h=(l=e.parameters)==null?void 0:l.docs)==null?void 0:h.source}}};var m,g,C;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`({
  wrapperClasses,
  ...args
}: CheckboxProps & {
  wrapperClasses: string;
}) => {
  const [checked, setChecked] = useState<CheckboxState>(args.state || CheckboxState.Unchecked);
  useEffect(() => setChecked(args.state || CheckboxState.Unchecked), [args.state]);
  return <div className={wrapperClasses}>
            <CheckboxComponent {...args} state={checked} onChange={isChecked => {
      setChecked(isChecked ? CheckboxState.Checked : CheckboxState.Unchecked);
      args.onChange && args.onChange(isChecked);
    }} />
        </div>;
}`,...(C=(g=a.parameters)==null?void 0:g.docs)==null?void 0:C.source}}};var k,u,b;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`({
  wrapperClasses,
  ...args
}: CheckboxProps & {
  wrapperClasses: string;
}) => {
  const [checked, setChecked] = useState<CheckboxState>(args.state || CheckboxState.Unchecked);
  useEffect(() => setChecked(args.state || CheckboxState.Unchecked), [args.state]);
  return <div className={wrapperClasses}>
            <CheckboxComponent {...args} state={checked} onChange={isChecked => {
      setChecked(isChecked ? CheckboxState.Checked : CheckboxState.Unchecked);
      args.onChange && args.onChange(isChecked);
    }} />
        </div>;
}`,...(b=(u=n.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};const de=["Checkbox","CheckboxWithMultipleTooltips","CheckboxWithMultipleTooltipsAndEllipsis"];export{e as Checkbox,a as CheckboxWithMultipleTooltips,n as CheckboxWithMultipleTooltipsAndEllipsis,de as __namedExportsOrder,pe as default};
