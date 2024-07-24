import{j as P}from"./jsx-runtime-Nms4Y4qS.js";import{r as g}from"./index-BwDkhjyp.js";import{T as I}from"./TooltipIcon-PlSsTjyA.js";import{I as _}from"./IconExclamationMarkCircle-Cob4vb5T.js";import{S as z}from"./Switch-xU4d-oj4.js";import"./_commonjsHelpers-BosuxZz1.js";import"./LegacyTooltip-DXE5SqpV.js";import"./useLink-DorAuuFQ.js";import"./useFocusable-CAGu0lKI.js";import"./useFocusRing-4Vnvtzpc.js";import"./SSRProvider-CYXx33DY.js";import"./chain-D5h1pgIF.js";import"./usePopper-DPXU-o95.js";import"./index-DxjWwZXO.js";import"./index-CfyPTyT-.js";import"./Button-CYWlMQhW.js";import"./useButton-DofEV6SJ.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./Portal-0C9N3MSP.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./IconCheckMark-CLvJH1sB.js";import"./IconExclamationMarkTriangle-CRTWkDyu.js";import"./IconExclamationMarkTriangle24-GqPjgFpk.js";import"./IconQuestionMarkCircle-C_agVHg1.js";import"./IconExclamationMarkCircle24-DpwtNT9z.js";import"./InputLabel-3Blx3uwT.js";const H=["small","medium"],k=["on","off","indeterminate"],q=["default","heading"],le={title:"Components/Switch",component:z,tags:["autodocs"],argTypes:{size:{options:H,control:{type:"radio"}},labelStyle:{options:q,control:{type:"radio"}},label:{placeholder:"Switch label",type:{name:"string",required:!1},control:{type:"text"}},mode:{options:k,control:{type:"radio"}},onChange:{table:{disable:!1},action:"Change"}},args:{mode:"on",disabled:!1,labelStyle:"default",hug:!1,name:"switch-name",size:"small"}},o=e=>{const[d,i]=g.useState(e.mode||"off");g.useEffect(()=>{e.mode&&i(e.mode)},[e.mode]);const j=A=>{i(d==="on"?"off":"on"),e.onChange&&e.onChange(A)};return P.jsx(z,{...e,onChange:j,mode:d})},t=o.bind({});t.args={size:"small"};const n=o.bind({});n.args={size:"medium"};const s=o.bind({});s.args={label:"Switch label"};const r=o.bind({});r.args={label:"Switch label",tooltip:{content:"Switch tooltip"}};const a=o.bind({});a.args={label:"Switch label",tooltip:[{content:"First tooltip"},{content:"Second Tooltip",triggerIcon:P.jsx(_,{}),triggerStyle:I.Warning}]};const m=o.bind({});m.args={hug:!0,label:"Switch label"};var c,l,p;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`(args: Props) => {
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
}`,...(W=(L=m.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};const pe=["Small","Medium","WithLabel","WithLabelAndTooltip","WithLabelAndMultipleTooltips","HugLabel"];export{m as HugLabel,n as Medium,t as Small,s as WithLabel,a as WithLabelAndMultipleTooltips,r as WithLabelAndTooltip,pe as __namedExportsOrder,le as default};
