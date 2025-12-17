import{r as s,j as r}from"./iframe-BpAGuEkl.js";import{B as g}from"./Button-doR8GsKW.js";import{F as i}from"./Flyout-D9tZ-XGO.js";import{C as Q,a as U,b as Y,c as o}from"./ColorPicker-N7hokTUI.js";import"./preload-helper-DRIJ0rx4.js";import"./fondue-icons369-Dw0uY-Iv.js";import"./index-3j5JM6xs.js";import"./index-C1q05TLA.js";import"./index-BIMMwjVe.js";import"./index-ByIzz2oB.js";import"./index-CDvyfnnK.js";import"./index--Hr9R9RR.js";import"./index-CLWbU5fH.js";import"./component-96ZVfjaW.js";import"./useTranslation-CJ8eI22Z.js";import"./domUtilities-DGDVwu3_.js";import"./Select-CxlvVCUQ.js";import"./LoadingCircle-CH6MVi60.js";import"./TextInput-Ed2yDKcr.js";import"./styleUtilities-A7Ia-tuh.js";const hr={component:Y,subcomponents:{"ColorPicker.Values":U,"ColorPicker.Gradient":Q},tags:["autodocs"],parameters:{status:{type:"released"}},args:{}},a={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsxs(o.Root,{defaultFormat:"HEX",currentColor:n,onColorChange:t,children:[r.jsx(o.Values,{}),r.jsx(o.Gradient,{})]})}},l={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsxs(o.Root,{currentColor:n,onColorChange:t,defaultFormat:"RGBA",children:[r.jsx(o.Values,{}),r.jsx(o.Gradient,{})]})}},u={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsx(o.Root,{currentColor:n,onColorChange:t,children:r.jsx(o.Gradient,{})})}},c={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsx(o.Root,{currentColor:n,onColorChange:t,children:r.jsx(o.Values,{})})}},C={args:{},render:e=>{const[n,t]=s.useState(e.currentColor),[d,p]=s.useState(e.currentColor),[K,L]=s.useState(e.currentFormat),[M,m]=s.useState(!0);return r.jsxs(i.Root,{open:M,onOpenChange:m,children:[r.jsx(i.Trigger,{children:r.jsx(o.Input,{"aria-label":"Color Picker",currentColor:d,onClear:()=>{p(void 0)}})}),r.jsxs(i.Content,{maxWidth:"600px",children:[r.jsx(i.Body,{children:r.jsx("div",{className:"tw-p-2 md:tw-w-[450px]",children:r.jsxs(o.Root,{currentFormat:K,currentColor:d,onColorChange:p,onFormatChange:L,children:[r.jsx(o.Values,{}),r.jsx(o.Gradient,{})]})})}),r.jsxs(i.Footer,{children:[r.jsx(g,{emphasis:"default",onPress:()=>{m(!1),p(n)},children:"Cancel"}),r.jsx(g,{onPress:()=>{m(!1),t(d)},children:"Save"})]})]})]})}};var F,P,h;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{code:`const OnlyPicker = (args) => {
  const [currentColor, setCurrentColor] = useState(args.currentColor);
  return (
    <ColorPicker.Root
      currentColor={currentColor}
      onColorChange={setCurrentColor}
    >
      <ColorPicker.Gradient />
    </ColorPicker.Root>
  );
};
`,...(h=(P=u.parameters)==null?void 0:P.docs)==null?void 0:h.source}}};var k,R,S;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{code:`const OnlyValues = (args) => {
  const [currentColor, setCurrentColor] = useState(args.currentColor);
  return (
    <ColorPicker.Root
      currentColor={currentColor}
      onColorChange={setCurrentColor}
    >
      <ColorPicker.Values />
    </ColorPicker.Root>
  );
};
`,...(S=(R=c.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};var x,y,f;C.parameters={...C.parameters,docs:{...(x=C.parameters)==null?void 0:x.docs,source:{code:`const InFlyout = (args) => {
  const [savedColor, setSavedColor] = useState(args.currentColor);
  const [currentColor, setCurrentColor] = useState(args.currentColor);
  const [currentFormat, setCurrentFormat] = useState(args.currentFormat);
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Flyout.Root open={isOpen} onOpenChange={setIsOpen}>
      <Flyout.Trigger>
        <ColorPicker.Input
          aria-label="Color Picker"
          currentColor={currentColor}
          onClear={() => {
            setCurrentColor(undefined);
          }}
        />
      </Flyout.Trigger>
      <Flyout.Content maxWidth="600px">
        <Flyout.Body>
          <div className="tw-p-2 md:tw-w-[450px]">
            <ColorPicker.Root
              currentFormat={currentFormat}
              currentColor={currentColor}
              onColorChange={setCurrentColor}
              onFormatChange={setCurrentFormat}
            >
              <ColorPicker.Values />
              <ColorPicker.Gradient />
            </ColorPicker.Root>
          </div>
        </Flyout.Body>
        <Flyout.Footer>
          <Button
            emphasis="default"
            onPress={() => {
              setIsOpen(false);
              setCurrentColor(savedColor);
            }}
          >
            Cancel
          </Button>
          <Button
            onPress={() => {
              setIsOpen(false);
              setSavedColor(currentColor);
            }}
          >
            Save
          </Button>
        </Flyout.Footer>
      </Flyout.Content>
    </Flyout.Root>
  );
};
`,...(f=(y=C.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var j,O,v;a.parameters={...a.parameters,docs:{...(j=a.parameters)==null?void 0:j.docs,source:{code:`const Default = (args) => {
  const [currentColor, setCurrentColor] = useState(args.currentColor);
  return (
    <ColorPicker.Root
      defaultFormat="HEX"
      currentColor={currentColor}
      onColorChange={setCurrentColor}
    >
      <ColorPicker.Values />
      <ColorPicker.Gradient />
    </ColorPicker.Root>
  );
};
`,...(v=(O=a.parameters)==null?void 0:O.docs)==null?void 0:v.source}}};var B,G,I;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{code:`const WithRgbaDefaultFormat = (args) => {
  const [currentColor, setCurrentColor] = useState(args.currentColor);
  return (
    <ColorPicker.Root
      currentColor={currentColor}
      onColorChange={setCurrentColor}
      defaultFormat="RGBA"
    >
      <ColorPicker.Values />
      <ColorPicker.Gradient />
    </ColorPicker.Root>
  );
};
`,...(I=(G=l.parameters)==null?void 0:G.docs)==null?void 0:I.source}}};var V,b,w;a.parameters={...a.parameters,docs:{...(V=a.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(w=(b=a.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var D,E,W;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(W=(E=l.parameters)==null?void 0:E.docs)==null?void 0:W.source}}};var T,A,H;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(H=(A=u.parameters)==null?void 0:A.docs)==null?void 0:H.source}}};var N,X,_;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(_=(X=c.parameters)==null?void 0:X.docs)==null?void 0:_.source}}};var q,z,J;C.parameters={...C.parameters,docs:{...(q=C.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(J=(z=C.parameters)==null?void 0:z.docs)==null?void 0:J.source}}};const kr=["Default","WithRgbaDefaultFormat","OnlyPicker","OnlyValues","InFlyout"];export{a as Default,C as InFlyout,u as OnlyPicker,c as OnlyValues,l as WithRgbaDefaultFormat,kr as __namedExportsOrder,hr as default};
