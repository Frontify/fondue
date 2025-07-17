import{j as P}from"./jsx-runtime-BYYWji4R.js";import{r as c}from"./index-ClcD9ViR.js";import{T as I}from"./TooltipIcon-0QxfgwfT.js";import{I as _}from"./LegacyTooltip-BMTu7B_J.js";import{S as z}from"./Switch-B1eeU859.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./IconQuestionMarkCircle-7EPrDyIp.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-BtNTXUM4.js";import"./merge-DI-veSMP.js";import"./useLink-DLd-zCvm.js";import"./useFocusable-NpJIjJzn.js";import"./useFocusRing-CqhiwHAH.js";import"./useEffectEvent-23OTMzEQ.js";import"./chain-zZtnTS2i.js";import"./index-Cho7bklK.js";import"./usePopper-BHXQC2xD.js";import"./index-DlnOb27V.js";import"./Button-BkcxChke.js";import"./useButton-CmN_Qqm3.js";import"./Portal-B3A1C5qZ.js";import"./useMemoizedId-BicaxHcO.js";import"./generateRandomId-Dxm0_E-2.js";import"./IconCheckMark-CqkZOEh6.js";import"./IconCheckMark16-BSi_kkf1.js";import"./IconDocument-BT3LAKWU.js";import"./IconExclamationMarkCircle24-4UiwpX0o.js";import"./IconExclamationMarkTriangle-DebOIQd7.js";import"./IconExclamationMarkTriangle16-DGaIrm4W.js";import"./IconExclamationMarkTriangle24-BCoex7hw.js";import"./InputLabel-CwZoIbN1.js";const H=["small","medium"],k=["on","off","indeterminate"],q=["default","heading"],he={title:"Components/Switch",component:z,tags:["autodocs"],argTypes:{size:{options:H,control:{type:"radio"}},labelStyle:{options:q,control:{type:"radio"}},label:{placeholder:"Switch label",type:{name:"string",required:!1},control:{type:"text"}},mode:{options:k,control:{type:"radio"}},onChange:{table:{disable:!1},action:"Change"}},args:{mode:"on",disabled:!1,labelStyle:"default",hug:!1,name:"switch-name",size:"small"},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Switch component](/docs/current_components-switch--documentation) instead."}}}},o=e=>{const[d,i]=c.useState(e.mode||"off");c.useEffect(()=>{e.mode&&i(e.mode)},[e.mode]);const j=A=>{i(d==="on"?"off":"on"),e.onChange&&e.onChange(A)};return P.jsx(z,{...e,onChange:j,mode:d})},t=o.bind({});t.args={size:"small"};const n=o.bind({});n.args={size:"medium"};const s=o.bind({});s.args={label:"Switch label"};const r=o.bind({});r.args={label:"Switch label",tooltip:{content:"Switch tooltip"}};const a=o.bind({});a.args={label:"Switch label",tooltip:[{content:"First tooltip"},{content:"Second Tooltip",triggerIcon:P.jsx(_,{}),triggerStyle:I.Warning}]};const m=o.bind({});m.args={hug:!0,label:"Switch label"};var g,l,p;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`(args: Props) => {
  const [mode, setMode] = useState<SwitchMode>(args.mode || 'off');
  useEffect(() => {
    args.mode && setMode(args.mode);
  }, [args.mode]);
  const toggle = (event: MouseEvent) => {
    setMode(mode === 'on' ? 'off' : 'on');
    args.onChange && args.onChange(event);
  };
  return <Switch {...args} onChange={toggle} mode={mode} />;
}`,...(p=(l=t.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var u,h,f;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`(args: Props) => {
  const [mode, setMode] = useState<SwitchMode>(args.mode || 'off');
  useEffect(() => {
    args.mode && setMode(args.mode);
  }, [args.mode]);
  const toggle = (event: MouseEvent) => {
    setMode(mode === 'on' ? 'off' : 'on');
    args.onChange && args.onChange(event);
  };
  return <Switch {...args} onChange={toggle} mode={mode} />;
}`,...(f=(h=n.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var S,M,b;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`(args: Props) => {
  const [mode, setMode] = useState<SwitchMode>(args.mode || 'off');
  useEffect(() => {
    args.mode && setMode(args.mode);
  }, [args.mode]);
  const toggle = (event: MouseEvent) => {
    setMode(mode === 'on' ? 'off' : 'on');
    args.onChange && args.onChange(event);
  };
  return <Switch {...args} onChange={toggle} mode={mode} />;
}`,...(b=(M=s.parameters)==null?void 0:M.docs)==null?void 0:b.source}}};var w,C,v;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`(args: Props) => {
  const [mode, setMode] = useState<SwitchMode>(args.mode || 'off');
  useEffect(() => {
    args.mode && setMode(args.mode);
  }, [args.mode]);
  const toggle = (event: MouseEvent) => {
    setMode(mode === 'on' ? 'off' : 'on');
    args.onChange && args.onChange(event);
  };
  return <Switch {...args} onChange={toggle} mode={mode} />;
}`,...(v=(C=r.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var E,y,T;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`(args: Props) => {
  const [mode, setMode] = useState<SwitchMode>(args.mode || 'off');
  useEffect(() => {
    args.mode && setMode(args.mode);
  }, [args.mode]);
  const toggle = (event: MouseEvent) => {
    setMode(mode === 'on' ? 'off' : 'on');
    args.onChange && args.onChange(event);
  };
  return <Switch {...args} onChange={toggle} mode={mode} />;
}`,...(T=(y=a.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var x,L,W;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`(args: Props) => {
  const [mode, setMode] = useState<SwitchMode>(args.mode || 'off');
  useEffect(() => {
    args.mode && setMode(args.mode);
  }, [args.mode]);
  const toggle = (event: MouseEvent) => {
    setMode(mode === 'on' ? 'off' : 'on');
    args.onChange && args.onChange(event);
  };
  return <Switch {...args} onChange={toggle} mode={mode} />;
}`,...(W=(L=m.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};const fe=["Small","Medium","WithLabel","WithLabelAndTooltip","WithLabelAndMultipleTooltips","HugLabel"];export{m as HugLabel,n as Medium,t as Small,s as WithLabel,a as WithLabelAndMultipleTooltips,r as WithLabelAndTooltip,fe as __namedExportsOrder,he as default};
