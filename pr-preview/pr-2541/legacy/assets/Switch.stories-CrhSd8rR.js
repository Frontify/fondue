import{r as c,j as P}from"./iframe-GsWVCcip.js";import{T as I}from"./TooltipIcon-DYpwK9w-.js";import{I as _}from"./LegacyTooltip-CLoes_20.js";import{S as z}from"./Switch-CuVKeTGx.js";import"./preload-helper-DlITqhEh.js";import"./IconQuestionMarkCircle-CDPtksXt.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./useLink-BYKTpev_.js";import"./useFocusable-Cw227HY_.js";import"./useFocusRing-CSdGRXHf.js";import"./useEffectEvent-Q8O3nA3c.js";import"./chain-CWiBJnxB.js";import"./index-DbWXpaPI.js";import"./usePopper-BaFuLpop.js";import"./index-BW__ZAa-.js";import"./Button-FFHUDWdy.js";import"./useButton-BshwJNnM.js";import"./Portal-Cy88iIFN.js";import"./useMemoizedId-Cwgw6BYb.js";import"./IconCheckMark-DUGK9hQx.js";import"./IconExclamationMarkCircle24-D0fkRMzk.js";import"./IconExclamationMarkTriangle-BwVEr5i3.js";import"./IconExclamationMarkTriangle24-3hVkDfff.js";import"./InputLabel-CahyiKfm.js";const H=["small","medium"],k=["on","off","indeterminate"],q=["default","heading"],ce={title:"Components/Switch",component:z,tags:["autodocs"],argTypes:{size:{options:H,control:{type:"radio"}},labelStyle:{options:q,control:{type:"radio"}},label:{placeholder:"Switch label",type:{name:"string",required:!1},control:{type:"text"}},mode:{options:k,control:{type:"radio"}},onChange:{table:{disable:!1},action:"Change"}},args:{mode:"on",disabled:!1,labelStyle:"default",hug:!1,name:"switch-name",size:"small"},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Switch component](/docs/current_components-switch--documentation) instead."}}}},o=e=>{const[d,m]=c.useState(e.mode||"off");c.useEffect(()=>{e.mode&&m(e.mode)},[e.mode]);const j=A=>{m(d==="on"?"off":"on"),e.onChange&&e.onChange(A)};return P.jsx(z,{...e,onChange:j,mode:d})},t=o.bind({});t.args={size:"small"};const n=o.bind({});n.args={size:"medium"};const s=o.bind({});s.args={label:"Switch label"};const r=o.bind({});r.args={label:"Switch label",tooltip:{content:"Switch tooltip"}};const a=o.bind({});a.args={label:"Switch label",tooltip:[{content:"First tooltip"},{content:"Second Tooltip",triggerIcon:P.jsx(_,{}),triggerStyle:I.Warning}]};const i=o.bind({});i.args={hug:!0,label:"Switch label"};var g,l,p;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`(args: Props) => {
  const [mode, setMode] = useState<SwitchMode>(args.mode || 'off');
  useEffect(() => {
    if (args.mode) {
      setMode(args.mode);
    }
  }, [args.mode]);
  const toggle = (event: MouseEvent) => {
    setMode(mode === 'on' ? 'off' : 'on');
    if (args.onChange) {
      args.onChange(event);
    }
  };
  return <Switch {...args} onChange={toggle} mode={mode} />;
}`,...(p=(l=t.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var f,u,h;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`(args: Props) => {
  const [mode, setMode] = useState<SwitchMode>(args.mode || 'off');
  useEffect(() => {
    if (args.mode) {
      setMode(args.mode);
    }
  }, [args.mode]);
  const toggle = (event: MouseEvent) => {
    setMode(mode === 'on' ? 'off' : 'on');
    if (args.onChange) {
      args.onChange(event);
    }
  };
  return <Switch {...args} onChange={toggle} mode={mode} />;
}`,...(h=(u=n.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var S,M,b;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`(args: Props) => {
  const [mode, setMode] = useState<SwitchMode>(args.mode || 'off');
  useEffect(() => {
    if (args.mode) {
      setMode(args.mode);
    }
  }, [args.mode]);
  const toggle = (event: MouseEvent) => {
    setMode(mode === 'on' ? 'off' : 'on');
    if (args.onChange) {
      args.onChange(event);
    }
  };
  return <Switch {...args} onChange={toggle} mode={mode} />;
}`,...(b=(M=s.parameters)==null?void 0:M.docs)==null?void 0:b.source}}};var w,C,v;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`(args: Props) => {
  const [mode, setMode] = useState<SwitchMode>(args.mode || 'off');
  useEffect(() => {
    if (args.mode) {
      setMode(args.mode);
    }
  }, [args.mode]);
  const toggle = (event: MouseEvent) => {
    setMode(mode === 'on' ? 'off' : 'on');
    if (args.onChange) {
      args.onChange(event);
    }
  };
  return <Switch {...args} onChange={toggle} mode={mode} />;
}`,...(v=(C=r.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var E,y,T;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`(args: Props) => {
  const [mode, setMode] = useState<SwitchMode>(args.mode || 'off');
  useEffect(() => {
    if (args.mode) {
      setMode(args.mode);
    }
  }, [args.mode]);
  const toggle = (event: MouseEvent) => {
    setMode(mode === 'on' ? 'off' : 'on');
    if (args.onChange) {
      args.onChange(event);
    }
  };
  return <Switch {...args} onChange={toggle} mode={mode} />;
}`,...(T=(y=a.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var x,L,W;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`(args: Props) => {
  const [mode, setMode] = useState<SwitchMode>(args.mode || 'off');
  useEffect(() => {
    if (args.mode) {
      setMode(args.mode);
    }
  }, [args.mode]);
  const toggle = (event: MouseEvent) => {
    setMode(mode === 'on' ? 'off' : 'on');
    if (args.onChange) {
      args.onChange(event);
    }
  };
  return <Switch {...args} onChange={toggle} mode={mode} />;
}`,...(W=(L=i.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};const ge=["Small","Medium","WithLabel","WithLabelAndTooltip","WithLabelAndMultipleTooltips","HugLabel"];export{i as HugLabel,n as Medium,t as Small,s as WithLabel,a as WithLabelAndMultipleTooltips,r as WithLabelAndTooltip,ge as __namedExportsOrder,ce as default};
