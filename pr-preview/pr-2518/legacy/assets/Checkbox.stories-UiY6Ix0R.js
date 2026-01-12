import{r as p,j as t}from"./iframe-D_BOSi7z.js";import{T as o}from"./TooltipIcon-C4hpdbpH.js";import{I as x}from"./LegacyTooltip-wq0qLjqe.js";import{I as f}from"./IconInfo-DsHcJNSy.js";import{I as T}from"./IconQuestionMarkCircle-BhtGQ5mm.js";import{C as r,a as I,b as w,c as q}from"./Checkbox-RWp0g1Pa.js";import"./preload-helper-D9dL-qgt.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./useLink-JLbnaYkl.js";import"./useFocusable-PX_TjPkN.js";import"./useFocusRing-3FNqU6ul.js";import"./useEffectEvent-CC_qXDJd.js";import"./chain-BCugQ9l9.js";import"./index-D-wBK1Ng.js";import"./usePopper-CWJKvBxE.js";import"./index-C8RUnOp5.js";import"./Button-C4MmvNvx.js";import"./useButton-DYuGFIG_.js";import"./Portal-CoV8HD0d.js";import"./useMemoizedId-C_W2q-Ms.js";import"./IconCheckMark-DdBrvFtV.js";import"./IconExclamationMarkCircle24-BuQiGPe5.js";import"./IconExclamationMarkTriangle-xQH9byf_.js";import"./IconExclamationMarkTriangle24-BJ7X_RsB.js";import"./useFormValidationState-CKHn6c8R.js";import"./useControlledState-edCwLap7.js";import"./InputLabel-CtdBwKXa.js";import"./IconMinus-eV4DCU7u.js";import"./IconMinus16-DgqZmABB.js";const oe={title:"Components/Checkbox",tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Checkbox component](/docs/current_components-checkbox--documentation) instead."}}},argTypes:{state:{options:Object.values(r),control:{type:"radio"}},emphasis:{options:Object.values(w),control:{type:"radio"}},size:{options:Object.values(I),control:{type:"radio"}},onChange:{table:{disable:!1},action:"Change"}},args:{state:r.Unchecked,disabled:!1,required:!1,emphasis:"Default",size:"Default",value:"whatever-you'd-like",label:"Checkbox label",hideLabel:!1,ariaLabel:"Custom aria label",helperText:"Note about this input",tooltip:{content:"Lorem ipsum dolor sit amet."}}},e=({wrapperClasses:y,...s})=>{const[S,i]=p.useState(s.state||r.Unchecked);return p.useEffect(()=>i(s.state||r.Unchecked),[s.state]),t.jsx("div",{className:y,children:t.jsx(q,{...s,state:S,onChange:c=>{i(c?r.Checked:r.Unchecked),s.onChange&&s.onChange(c)}})})},a=e.bind({});a.args={...e.args,tooltip:[{triggerIcon:t.jsx(f,{}),triggerStyle:o.Danger,content:"Tooltip 1"},{triggerIcon:t.jsx(T,{}),triggerStyle:o.Primary,content:"Tooltip 2"},{triggerIcon:t.jsx(x,{filled:!0}),triggerStyle:o.Warning,content:"Tooltip 3"}]};const n=e.bind({});n.args={...e.args,tooltip:[{triggerIcon:t.jsx(f,{}),triggerStyle:o.Danger,content:"Tooltip 1"},{triggerIcon:t.jsx(T,{}),triggerStyle:o.Primary,content:"Tooltip 2"},{triggerIcon:t.jsx(x,{filled:!0}),triggerStyle:o.Warning,content:"Tooltip 3"}],wrapperClasses:"tw-w-40"};e.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{id:{required:!1,tsType:{name:"string"},description:""},state:{required:!1,tsType:{name:"CheckboxState"},description:""},emphasis:{required:!1,tsType:{name:"CheckboxEmphasis"},description:""},size:{required:!1,tsType:{name:"CheckboxSize"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(isChecked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isChecked"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"string"},description:""},hideLabel:{required:!1,tsType:{name:"boolean"},description:""},tooltip:{required:!1,tsType:{name:"union",raw:`| (LegacyTooltipProps & Pick<TooltipIconProps, 'triggerStyle' | 'triggerIcon'>)
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
