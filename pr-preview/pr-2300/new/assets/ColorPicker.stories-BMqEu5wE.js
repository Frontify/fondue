import{j as r}from"./jsx-runtime-BYYWji4R.js";import{r as s}from"./index-ClcD9ViR.js";import{B as g}from"./Button-BiiXV9NM.js";import{F as a}from"./Flyout-DulWAQWu.js";import{C as E,a as D,b as W,c as o}from"./ColorPicker-C1sYW6eh.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./styleUtilities-Byf6Fdv2.js";import"./focusStyle-IgMhxCMT.js";import"./fondue-icons351-CNs5B0wj.js";import"./index-DISCH4w8.js";import"./index-BIU06K05.js";import"./index-BUNfiIdP.js";import"./index-CWz5EflU.js";import"./index-DuL23WnM.js";import"./index-Cr2iZZCw.js";import"./index-Cho7bklK.js";import"./index-6uuHhnjI.js";import"./Combination-Dejovr5Y.js";import"./index-Dkr9yJHh.js";import"./domUtilities-DGDVwu3_.js";import"./ThemeProvider-DsLTl1GE.js";import"./Select-CoWRwzwF.js";import"./TextInput-bw5gtDqk.js";const ar={component:W,subcomponents:{"ColorPicker.Values":D,"ColorPicker.Gradient":E},tags:["autodocs"],parameters:{status:{type:"released"}},args:{}},l={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsxs(o.Root,{defaultFormat:"HEX",currentColor:n,onColorChange:t,children:[r.jsx(o.Values,{}),r.jsx(o.Gradient,{})]})}},u={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsxs(o.Root,{currentColor:n,onColorChange:t,defaultFormat:"RGBA",children:[r.jsx(o.Values,{}),r.jsx(o.Gradient,{})]})}},c={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsx(o.Root,{currentColor:n,onColorChange:t,children:r.jsx(o.Gradient,{})})}},C={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsx(o.Root,{currentColor:n,onColorChange:t,children:r.jsx(o.Values,{})})}},i={args:{},render:e=>{const[n,t]=s.useState(e.currentColor),[d,p]=s.useState(e.currentColor),[B,I]=s.useState(e.currentFormat),[w,m]=s.useState(!0);return r.jsxs(a.Root,{open:w,onOpenChange:m,children:[r.jsx(a.Trigger,{children:r.jsx(o.Input,{"aria-label":"Color Picker",currentColor:d,onClear:()=>{p(void 0)}})}),r.jsxs(a.Content,{maxWidth:"600px",children:[r.jsx(a.Body,{children:r.jsx("div",{className:"tw-p-2 md:tw-w-[450px]",children:r.jsxs(o.Root,{currentFormat:B,currentColor:d,onColorChange:p,onFormatChange:I,children:[r.jsx(o.Values,{}),r.jsx(o.Gradient,{})]})})}),r.jsxs(a.Footer,{children:[r.jsx(g,{emphasis:"default",onPress:()=>{m(!1),p(n)},children:"Cancel"}),r.jsx(g,{onPress:()=>{m(!1),t(d)},children:"Save"})]})]})]})}};var h,F,x;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
    return <ColorPicker.Root defaultFormat="HEX" currentColor={currentColor} onColorChange={setCurrentColor}>
                <ColorPicker.Values />
                <ColorPicker.Gradient />
            </ColorPicker.Root>;
  }
}`,...(x=(F=l.parameters)==null?void 0:F.docs)==null?void 0:x.source}}};var P,k,S;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(S=(k=u.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var j,R,f;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(f=(R=c.parameters)==null?void 0:R.docs)==null?void 0:f.source}}};var y,O,b;C.parameters={...C.parameters,docs:{...(y=C.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(b=(O=C.parameters)==null?void 0:O.docs)==null?void 0:b.source}}};var v,G,V;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {},
  render: args => {
    const [savedColor, setSavedColor] = useState(args.currentColor);
    const [currentColor, setCurrentColor] = useState(args.currentColor);
    const [currentFormat, setCurrentFormat] = useState(args.currentFormat);
    const [isOpen, setIsOpen] = useState(true);
    return <Flyout.Root open={isOpen} onOpenChange={setIsOpen}>
                <Flyout.Trigger>
                    <ColorPicker.Input aria-label="Color Picker" currentColor={currentColor} onClear={() => {
          setCurrentColor(undefined);
        }} />
                </Flyout.Trigger>
                <Flyout.Content maxWidth="600px">
                    <Flyout.Body>
                        <div className="tw-p-2 md:tw-w-[450px]">
                            <ColorPicker.Root currentFormat={currentFormat} currentColor={currentColor} onColorChange={setCurrentColor} onFormatChange={setCurrentFormat}>
                                <ColorPicker.Values />
                                <ColorPicker.Gradient />
                            </ColorPicker.Root>
                        </div>
                    </Flyout.Body>
                    <Flyout.Footer>
                        <Button emphasis="default" onPress={() => {
            setIsOpen(false);
            setCurrentColor(savedColor);
          }}>
                            Cancel
                        </Button>
                        <Button onPress={() => {
            setIsOpen(false);
            setSavedColor(currentColor);
          }}>
                            Save
                        </Button>
                    </Flyout.Footer>
                </Flyout.Content>
            </Flyout.Root>;
  }
}`,...(V=(G=i.parameters)==null?void 0:G.docs)==null?void 0:V.source}}};const lr=["Default","WithRgbaDefaultFormat","OnlyPicker","OnlyValues","InFlyout"];export{l as Default,i as InFlyout,c as OnlyPicker,C as OnlyValues,u as WithRgbaDefaultFormat,lr as __namedExportsOrder,ar as default};
