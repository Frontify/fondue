import{r as p,j as t}from"./iframe-BIfcB0X2.js";import{T as o}from"./TooltipIcon-CIj69YaR.js";import{I as x}from"./LegacyTooltip-DyWCUoLz.js";import{I as f}from"./IconInfo-Dm_-vlCL.js";import{I as T}from"./IconQuestionMarkCircle-24RFih0R.js";import{C as r,a as I,b as w,c as q}from"./Checkbox-Cyn5e4sb.js";import"./preload-helper-OAyExbmo.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./useLink-DAFaRtwo.js";import"./useFocusable-C-Xc2xVU.js";import"./useFocusRing-DHqNp4Q2.js";import"./useEffectEvent-CMLs76Ad.js";import"./chain-CHiwi0M-.js";import"./index-7Pi3A3mt.js";import"./usePopper-BkMdSZz_.js";import"./index-CLa14mTA.js";import"./Button-91rj7uoX.js";import"./useButton-CNkmC7oi.js";import"./Portal-DO3N8iZr.js";import"./useMemoizedId-xtDXxhrd.js";import"./IconCheckMark-oDrSz9RN.js";import"./IconExclamationMarkCircle24-De_lyuU4.js";import"./IconExclamationMarkTriangle-BRPLl85B.js";import"./IconExclamationMarkTriangle24-CWq69Q4w.js";import"./useFormValidationState-CEWVO4VP.js";import"./useControlledState-SEwrKaho.js";import"./InputLabel-DkmK5SvI.js";import"./IconMinus-BqGNNXb1.js";import"./IconMinus16-D9i4Mx_B.js";const oe={title:"Components/Checkbox",tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Checkbox component](/docs/current_components-checkbox--documentation) instead."}}},argTypes:{state:{options:Object.values(r),control:{type:"radio"}},emphasis:{options:Object.values(w),control:{type:"radio"}},size:{options:Object.values(I),control:{type:"radio"}},onChange:{table:{disable:!1},action:"Change"}},args:{state:r.Unchecked,disabled:!1,required:!1,emphasis:"Default",size:"Default",value:"whatever-you'd-like",label:"Checkbox label",hideLabel:!1,ariaLabel:"Custom aria label",helperText:"Note about this input",tooltip:{content:"Lorem ipsum dolor sit amet."}}},e=({wrapperClasses:y,...s})=>{const[S,i]=p.useState(s.state||r.Unchecked);return p.useEffect(()=>i(s.state||r.Unchecked),[s.state]),t.jsx("div",{className:y,children:t.jsx(q,{...s,state:S,onChange:c=>{i(c?r.Checked:r.Unchecked),s.onChange&&s.onChange(c)}})})},a=e.bind({});a.args={...e.args,tooltip:[{triggerIcon:t.jsx(f,{}),triggerStyle:o.Danger,content:"Tooltip 1"},{triggerIcon:t.jsx(T,{}),triggerStyle:o.Primary,content:"Tooltip 2"},{triggerIcon:t.jsx(x,{filled:!0}),triggerStyle:o.Warning,content:"Tooltip 3"}]};const n=e.bind({});n.args={...e.args,tooltip:[{triggerIcon:t.jsx(f,{}),triggerStyle:o.Danger,content:"Tooltip 1"},{triggerIcon:t.jsx(T,{}),triggerStyle:o.Primary,content:"Tooltip 2"},{triggerIcon:t.jsx(x,{filled:!0}),triggerStyle:o.Warning,content:"Tooltip 3"}],wrapperClasses:"tw-w-40"};e.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{id:{required:!1,tsType:{name:"string"},description:""},state:{required:!1,tsType:{name:"CheckboxState"},description:""},emphasis:{required:!1,tsType:{name:"CheckboxEmphasis"},description:""},size:{required:!1,tsType:{name:"CheckboxSize"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(isChecked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isChecked"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"string"},description:""},hideLabel:{required:!1,tsType:{name:"boolean"},description:""},tooltip:{required:!1,tsType:{name:"union",raw:`| (LegacyTooltipProps & Pick<TooltipIconProps, 'triggerStyle' | 'triggerIcon'>)
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
      if (args.onChange) {
        args.onChange(isChecked);
      }
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
      if (args.onChange) {
        args.onChange(isChecked);
      }
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
      if (args.onChange) {
        args.onChange(isChecked);
      }
    }} />
        </div>;
}`,...(b=(u=n.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};const ae=["Checkbox","CheckboxWithMultipleTooltips","CheckboxWithMultipleTooltipsAndEllipsis"];export{e as Checkbox,a as CheckboxWithMultipleTooltips,n as CheckboxWithMultipleTooltipsAndEllipsis,ae as __namedExportsOrder,oe as default};
