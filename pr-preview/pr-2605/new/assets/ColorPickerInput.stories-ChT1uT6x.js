import{j as n}from"./iframe-CI7S4IS1.js";import{d as E,c as s}from"./ColorPicker-A4yc_tnf.js";import"./preload-helper-Ie946MLx.js";import"./fondue-icons369-vrsCiRPO.js";import"./useTranslation-BZPM90-V.js";import"./Button-bsQ-3dRs.js";import"./Select-C_wqR-EJ.js";import"./index-BudsJGuW.js";import"./index-BKxKMUOR.js";import"./index-bVCvxReh.js";import"./index-Cz-ptZmu.js";import"./index-C1w66_89.js";import"./Combination-Dhf3uLMQ.js";import"./LoadingCircle-DdOsAM0S.js";import"./TextInput-BmXKSZ5T.js";const J={title:"Components/ColorPicker/Input",component:E,tags:["autodocs"],parameters:{status:{type:"released"}},args:{}},r={args:{currentColor:{red:230,green:100,blue:50,alpha:.8,name:"custom-color"}},render:a=>n.jsx(s.Input,{...a,onClear:()=>{}})},e={args:{},render:a=>n.jsx(s.Input,{...a,onClear:()=>{}})},o={args:{},render:a=>n.jsx(s.Input,{...a,disabled:!0,onClear:()=>{}})};var t,c,p;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{code:`const Default = () => {
  return (
    <ColorPicker.Input
      currentColor={{
        red: 230,
        green: 100,
        blue: 50,
        alpha: 0.8,
        name: "custom-color",
      }}
      onClear={() => {}}
    />
  );
};
`,...(p=(c=r.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var m,u,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{code:`const Empty = () => {
  return <ColorPicker.Input onClear={() => {}} />;
};
`,...(d=(u=e.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var l,i,C;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{code:`const Disabled = () => {
  return <ColorPicker.Input disabled onClear={() => {}} />;
};
`,...(C=(i=o.parameters)==null?void 0:i.docs)==null?void 0:C.source}}};var g,I,b;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    currentColor: {
      red: 230,
      green: 100,
      blue: 50,
      alpha: 0.8,
      name: 'custom-color'
    }
  },
  render: args => {
    return <ColorPicker.Input {...args} onClear={() => {}} />;
  }
}`,...(b=(I=r.parameters)==null?void 0:I.docs)==null?void 0:b.source}}};var k,P,x;e.parameters={...e.parameters,docs:{...(k=e.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {},
  render: args => {
    return <ColorPicker.Input {...args} onClear={() => {}} />;
  }
}`,...(x=(P=e.parameters)==null?void 0:P.docs)==null?void 0:x.source}}};var f,D,j;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {},
  render: args => {
    return <ColorPicker.Input {...args} disabled onClear={() => {}} />;
  }
}`,...(j=(D=o.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};const K=["Default","Empty","Disabled"];export{r as Default,o as Disabled,e as Empty,K as __namedExportsOrder,J as default};
