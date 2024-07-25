import{j as r}from"./jsx-runtime-DBEcOq3S.js";import{r as c}from"./index-DtJulBIN.js";import{C as b,a as f,b as S,c as e}from"./ColorPicker-DxnhYiiN.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-Dhc4yksV.js";import"./index-BqTDQIm7.js";import"./index-GpQCGCAv.js";import"./fondue-icons311-cxtRWhAe.js";import"./Select-uZbANkcZ.js";import"./index-fOb33GKb.js";import"./index-DYI_kRwo.js";import"./index-P-l_ls5c.js";import"./index-24aZOQX_.js";import"./Combination-DuhGN8JR.js";import"./index-DBH0Kh6a.js";import"./index-BYh9UA9V.js";import"./index-CMjj8zSi.js";import"./index-RzzeDlDa.js";import"./index-D3ylJrlI.js";import"./TextInput-C8X0wDo0.js";import"./styleUtilities-T76WvCte.js";const M={component:b,subcomponents:{"ColorPicker.Values":f,"ColorPicker.Gradient":S},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{}},a={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:n=>{const[o,t]=c.useState(n.currentColor);return r.jsxs(r.Fragment,{children:[r.jsx("span",{children:o==null?void 0:o.name}),r.jsxs(e.Root,{defaultFormat:"HEX",currentColor:o,onColorChange:t,children:[r.jsx(e.Values,{}),r.jsx(e.Gradient,{})]})]})}},s={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:n=>{const[o,t]=c.useState(n.currentColor);return r.jsxs(e.Root,{currentColor:o,onColorChange:t,children:[r.jsx(e.Values,{defaultFormat:"RGBA"}),r.jsx(e.Gradient,{})]})}},l={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:n=>{const[o,t]=c.useState(n.currentColor);return r.jsx(e.Root,{currentColor:o,onColorChange:t,children:r.jsx(e.Gradient,{})})}},u={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:n=>{const[o,t]=c.useState(n.currentColor);return r.jsx(e.Root,{currentColor:o,onColorChange:t,children:r.jsx(e.Values,{})})}};var C,i,p;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    currentColor: {
      red: 230,
      green: 100,
      blue: 50,
      alpha: 0.8
    }
  },
  render: args => {
    const [currentColor, setCurrentColor] = useState(args.currentColor);
    return <>
                <span>{currentColor?.name}</span>
                <ColorPicker.Root defaultFormat="HEX" currentColor={currentColor} onColorChange={setCurrentColor}>
                    <ColorPicker.Values />
                    <ColorPicker.Gradient />
                </ColorPicker.Root>
            </>;
  }
}`,...(p=(i=a.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var m,d,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    currentColor: {
      red: 230,
      green: 100,
      blue: 50,
      alpha: 0.8
    }
  },
  render: args => {
    const [currentColor, setCurrentColor] = useState(args.currentColor);
    return <ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor}>
                <ColorPicker.Values defaultFormat="RGBA" />
                <ColorPicker.Gradient />
            </ColorPicker.Root>;
  }
}`,...(g=(d=s.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var h,k,P;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    currentColor: {
      red: 230,
      green: 100,
      blue: 50,
      alpha: 0.8
    }
  },
  render: args => {
    const [currentColor, setCurrentColor] = useState(args.currentColor);
    return <ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor}>
                <ColorPicker.Gradient />
            </ColorPicker.Root>;
  }
}`,...(P=(k=l.parameters)==null?void 0:k.docs)==null?void 0:P.source}}};var R,x,j;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    currentColor: {
      red: 230,
      green: 100,
      blue: 50,
      alpha: 0.8
    }
  },
  render: args => {
    const [currentColor, setCurrentColor] = useState(args.currentColor);
    return <ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor}>
                <ColorPicker.Values />
            </ColorPicker.Root>;
  }
}`,...(j=(x=u.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};const N=["Default","WithRgbaDefaultFormat","OnlyPicker","OnlyValues"];export{a as Default,l as OnlyPicker,u as OnlyValues,s as WithRgbaDefaultFormat,N as __namedExportsOrder,M as default};
