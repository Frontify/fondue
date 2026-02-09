import{j as n}from"./iframe-DiPuhK18.js";import{C as E,a as s}from"./ColorPicker-DGY4DHcS.js";import"./preload-helper-CZVL1Juu.js";import"./fondue-icons372-Dz8wQiVZ.js";import"./useTranslation-BpAqNeEC.js";import"./Button-BGSZX-dX.js";import"./index-D8L9FnrQ.js";import"./index-D19W2U9M.js";import"./index-8wJ2O7FJ.js";import"./index-DEpKhOcq.js";import"./index-DD6c7ge6.js";import"./index-k8uIv5MC.js";import"./Combination-Jm_B6tIg.js";import"./LoadingCircle-4lM2R114.js";import"./Badge-8-GZzeeE.js";import"./TextInput-ZyZAs-Tb.js";const K={title:"Components/ColorPicker/Input",component:E,tags:["autodocs"],parameters:{status:{type:"released"}},args:{}},r={args:{currentColor:{red:230,green:100,blue:50,alpha:.8,name:"custom-color"}},render:a=>n.jsx(s.Input,{...a,onClear:()=>{}})},e={args:{},render:a=>n.jsx(s.Input,{...a,onClear:()=>{}})},o={args:{},render:a=>n.jsx(s.Input,{...a,disabled:!0,onClear:()=>{}})};var t,c,p;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{code:`const Default = () => {
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
`,...(p=(c=r.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var m,u,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{code:`const Empty = () => {
  return <ColorPicker.Input onClear={() => {}} />;
};
`,...(l=(u=e.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};var d,i,C;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{code:`const Disabled = () => {
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
}`,...(j=(D=o.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};const L=["Default","Empty","Disabled"];export{r as Default,o as Disabled,e as Empty,L as __namedExportsOrder,K as default};
