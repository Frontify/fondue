import{j as r}from"./jsx-runtime-DBEcOq3S.js";import{r as s}from"./index-DtJulBIN.js";import{F as i}from"./Flyout-B7hzPoia.js";import{C as G,a as V,b as O,c as o}from"./ColorPicker-DzWqCNaJ.js";import"./_commonjsHelpers-BosuxZz1.js";import"./fondue-icons311-BZCDKIoV.js";import"./index-fOb33GKb.js";import"./index-DYI_kRwo.js";import"./index-Dhc4yksV.js";import"./index-BqTDQIm7.js";import"./index-P-l_ls5c.js";import"./index-24aZOQX_.js";import"./Combination-DuhGN8JR.js";import"./index-DBH0Kh6a.js";import"./index-BYh9UA9V.js";import"./index-CMjj8zSi.js";import"./index-RzzeDlDa.js";import"./styleUtilities-T76WvCte.js";import"./index-GpQCGCAv.js";import"./Select-DQc9wKL_.js";import"./index-D3ylJrlI.js";import"./TextInput-_sF7mbua.js";const Z={component:G,subcomponents:{"ColorPicker.Values":V,"ColorPicker.Gradient":O},tags:["autodocs"],parameters:{status:{type:"in_progress"}},args:{}},a={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:t=>{const[e,n]=s.useState(t.currentColor);return r.jsxs(r.Fragment,{children:[r.jsx("span",{children:JSON.stringify(e)}),r.jsxs(o.Root,{defaultFormat:"HEX",currentColor:e,onColorChange:n,children:[r.jsx(o.Values,{}),r.jsx(o.Gradient,{})]})]})}},l={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:t=>{const[e,n]=s.useState(t.currentColor);return r.jsxs(o.Root,{currentColor:e,onColorChange:n,defaultFormat:"RGBA",children:[r.jsx(o.Values,{}),r.jsx(o.Gradient,{})]})}},u={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:t=>{const[e,n]=s.useState(t.currentColor);return r.jsx(o.Root,{currentColor:e,onColorChange:n,children:r.jsx(o.Gradient,{})})}},c={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:t=>{const[e,n]=s.useState(t.currentColor);return r.jsx(o.Root,{currentColor:e,onColorChange:n,children:r.jsx(o.Values,{})})}},C={args:{},render:t=>{const[e,n]=s.useState(t.currentColor);return r.jsxs(i.Root,{children:[r.jsx(i.Trigger,{children:r.jsx(o.Input,{currentColor:e,onClear:()=>{n(void 0)}})}),r.jsx(i.Content,{maxWidth:"500px",children:r.jsx("div",{className:"tw-p-4",children:r.jsxs(o.Root,{currentColor:e,onColorChange:n,children:[r.jsx(o.Values,{}),r.jsx(o.Gradient,{})]})})})]})}};var d,p,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
                <span>{JSON.stringify(currentColor)}</span>
                <ColorPicker.Root defaultFormat="HEX" currentColor={currentColor} onColorChange={setCurrentColor}>
                    <ColorPicker.Values />
                    <ColorPicker.Gradient />
                </ColorPicker.Root>
            </>;
  }
}`,...(m=(p=a.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var g,h,x;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
    return <ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor} defaultFormat="RGBA">
                <ColorPicker.Values />
                <ColorPicker.Gradient />
            </ColorPicker.Root>;
  }
}`,...(x=(h=l.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var k,P,R;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(R=(P=u.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var j,F,S;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(S=(F=c.parameters)==null?void 0:F.docs)==null?void 0:S.source}}};var f,y,b;C.parameters={...C.parameters,docs:{...(f=C.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {},
  render: args => {
    const [currentColor, setCurrentColor] = useState(args.currentColor);
    return <Flyout.Root>
                <Flyout.Trigger>
                    <ColorPicker.Input currentColor={currentColor} onClear={() => {
          setCurrentColor(undefined);
        }} />
                </Flyout.Trigger>

                <Flyout.Content maxWidth="500px">
                    <div className="tw-p-4">
                        <ColorPicker.Root currentColor={currentColor} onColorChange={setCurrentColor}>
                            <ColorPicker.Values />
                            <ColorPicker.Gradient />
                        </ColorPicker.Root>
                    </div>
                </Flyout.Content>
            </Flyout.Root>;
  }
}`,...(b=(y=C.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};const $=["Default","WithRgbaDefaultFormat","OnlyPicker","OnlyValues","InFlyout"];export{a as Default,C as InFlyout,u as OnlyPicker,c as OnlyValues,l as WithRgbaDefaultFormat,$ as __namedExportsOrder,Z as default};
