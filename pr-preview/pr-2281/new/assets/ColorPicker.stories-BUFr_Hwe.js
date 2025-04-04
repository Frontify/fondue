import{j as r}from"./jsx-runtime-BYYWji4R.js";import{r as s}from"./index-ClcD9ViR.js";import{B as g}from"./Button-CuTu8_ln.js";import{F as a}from"./Flyout-TRJr7T27.js";import{C as I,a as w,b as E,c as o}from"./ColorPicker-BTHHtoeA.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./styleUtilities-Byf6Fdv2.js";import"./focusStyle-IgMhxCMT.js";import"./fondue-icons349-izFEZ7jD.js";import"./index-_R0kX3iN.js";import"./index-Cf7qgl8U.js";import"./index-BxcciFvf.js";import"./index-CWz5EflU.js";import"./index-EOOszGrN.js";import"./index-R-TRi7i8.js";import"./index-Cho7bklK.js";import"./index-BnD2ijW9.js";import"./Combination-D5l578qz.js";import"./index-X3Ss1B-F.js";import"./domUtilities-DGDVwu3_.js";import"./ThemeProvider-BHSUYfSe.js";import"./Select-BgqQ1BGG.js";import"./TextInput-BjT9NvqC.js";const tr={component:E,subcomponents:{"ColorPicker.Values":w,"ColorPicker.Gradient":I},tags:["autodocs"],parameters:{status:{type:"released"}},args:{}},l={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsxs(o.Root,{defaultFormat:"HEX",currentColor:n,onColorChange:t,children:[r.jsx(o.Values,{}),r.jsx(o.Gradient,{})]})}},u={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsxs(o.Root,{currentColor:n,onColorChange:t,defaultFormat:"RGBA",children:[r.jsx(o.Values,{}),r.jsx(o.Gradient,{})]})}},c={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsx(o.Root,{currentColor:n,onColorChange:t,children:r.jsx(o.Gradient,{})})}},C={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsx(o.Root,{currentColor:n,onColorChange:t,children:r.jsx(o.Values,{})})}},i={args:{},render:e=>{const[n,t]=s.useState(e.currentColor),[d,p]=s.useState(e.currentColor),[V,m]=s.useState(!0);return r.jsxs(a.Root,{open:V,onOpenChange:m,children:[r.jsx(a.Trigger,{children:r.jsx(o.Input,{"aria-label":"Color Picker",currentColor:d,onClear:()=>{p(void 0)}})}),r.jsxs(a.Content,{maxWidth:"600px",children:[r.jsx(a.Body,{children:r.jsx("div",{className:"tw-p-2 md:tw-w-[450px]",children:r.jsxs(o.Root,{defaultFormat:"RGBA",currentColor:d,onColorChange:p,children:[r.jsx(o.Values,{}),r.jsx(o.Gradient,{})]})})}),r.jsxs(a.Footer,{children:[r.jsx(g,{emphasis:"default",onPress:()=>{m(!1),p(n)},children:"Cancel"}),r.jsx(g,{onPress:()=>{m(!1),t(d)},children:"Save"})]})]})]})}};var h,x,P;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(P=(x=l.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};var k,R,F;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(F=(R=u.parameters)==null?void 0:R.docs)==null?void 0:F.source}}};var j,S,f;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(f=(S=c.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var y,O,b;C.parameters={...C.parameters,docs:{...(y=C.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(b=(O=C.parameters)==null?void 0:O.docs)==null?void 0:b.source}}};var G,B,v;i.parameters={...i.parameters,docs:{...(G=i.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {},
  render: args => {
    const [savedColor, setSavedColor] = useState(args.currentColor);
    const [currentColor, setCurrentColor] = useState(args.currentColor);
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
                            <ColorPicker.Root defaultFormat="RGBA" currentColor={currentColor} onColorChange={setCurrentColor}>
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
}`,...(v=(B=i.parameters)==null?void 0:B.docs)==null?void 0:v.source}}};const sr=["Default","WithRgbaDefaultFormat","OnlyPicker","OnlyValues","InFlyout"];export{l as Default,i as InFlyout,c as OnlyPicker,C as OnlyValues,u as WithRgbaDefaultFormat,sr as __namedExportsOrder,tr as default};
