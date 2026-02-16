import{j as n}from"./iframe-BHgUBvhF.js";import{C as E,a as s}from"./ColorPicker-C-W301my.js";import"./preload-helper-CyD9-9eU.js";import"./fondue-icons372-CAK_F_MQ.js";import"./useTranslation-Cq82uPPr.js";import"./Button-BYfcH5AE.js";import"./index-Ck_V3MDG.js";import"./index-JZmxKwEf.js";import"./index-lPGTKXTi.js";import"./index-ZF6uhlX8.js";import"./index-DGz0gzq3.js";import"./index-Ch3v48Ay.js";import"./Combination-DbqxV-8y.js";import"./LoadingCircle-E6u10EX_.js";import"./Badge-CrPq46qB.js";import"./TextInput-Bmo20uZg.js";const K={title:"Components/ColorPicker/Input",component:E,tags:["autodocs"],parameters:{status:{type:"released"}},args:{}},r={args:{currentColor:{red:230,green:100,blue:50,alpha:.8,name:"custom-color"}},render:a=>n.jsx(s.Input,{...a,onClear:()=>{}})},e={args:{},render:a=>n.jsx(s.Input,{...a,onClear:()=>{}})},o={args:{},render:a=>n.jsx(s.Input,{...a,disabled:!0,onClear:()=>{}})};var t,c,p;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{code:`const Default = () => {
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
