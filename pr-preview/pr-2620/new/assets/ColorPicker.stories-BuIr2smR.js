import{r as s,j as r}from"./iframe-CQSKmblA.js";import{B as g}from"./Button-CFBCCpr-.js";import{F as i}from"./Flyout-16ER2-7P.js";import{b as Q,c as U,d as Y,a as o}from"./ColorPicker-BStEVe-h.js";import"./preload-helper-DI-8CSFo.js";import"./fondue-icons372-Z0j5to7N.js";import"./index-Dv6gvF6t.js";import"./index-CIVc8Kjj.js";import"./index-atnH6nRD.js";import"./index-BpncAhCU.js";import"./index-C9tVM3ks.js";import"./Combination-DqHVk1Na.js";import"./useTranslation-CW0idMxm.js";import"./domUtilities-DGDVwu3_.js";import"./index-BpwhJuI8.js";import"./LoadingCircle-BFv6ibMj.js";import"./Badge-DXVD02Xd.js";import"./TextInput-53j8l3gi.js";const hr={component:Y,subcomponents:{"ColorPicker.Values":U,"ColorPicker.Gradient":Q},tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["An interactive color selection control with gradient, hue, and value inputs. Outputs colors in hex, RGB, or HSL formats.","","**When to use:** When users need to pick or input a specific color — theme customization, brand settings, or design tools."].join(`
`)}}},args:{}},a={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsxs(o.Root,{defaultFormat:"HEX",currentColor:n,onColorChange:t,children:[r.jsx(o.Values,{}),r.jsx(o.Gradient,{})]})}},l={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsxs(o.Root,{currentColor:n,onColorChange:t,defaultFormat:"RGBA",children:[r.jsx(o.Values,{}),r.jsx(o.Gradient,{})]})}},u={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsx(o.Root,{currentColor:n,onColorChange:t,children:r.jsx(o.Gradient,{})})}},c={args:{currentColor:{red:230,green:100,blue:50,alpha:.8}},render:e=>{const[n,t]=s.useState(e.currentColor);return r.jsx(o.Root,{currentColor:n,onColorChange:t,children:r.jsx(o.Values,{})})}},C={args:{},render:e=>{const[n,t]=s.useState(e.currentColor),[d,p]=s.useState(e.currentColor),[J,K]=s.useState(e.currentFormat),[M,m]=s.useState(!0);return r.jsxs(i.Root,{open:M,onOpenChange:m,children:[r.jsx(i.Trigger,{children:r.jsx(o.Input,{"aria-label":"Color Picker",currentColor:d,onClear:()=>{p(void 0)}})}),r.jsxs(i.Content,{maxWidth:"600px",children:[r.jsx(i.Body,{children:r.jsx("div",{className:"tw-p-2 md:tw-w-[450px]",children:r.jsxs(o.Root,{currentFormat:J,currentColor:d,onColorChange:p,onFormatChange:K,children:[r.jsx(o.Values,{}),r.jsx(o.Gradient,{})]})})}),r.jsxs(i.Footer,{children:[r.jsx(g,{emphasis:"default",onPress:()=>{m(!1),p(n)},children:"Cancel"}),r.jsx(g,{onPress:()=>{m(!1),t(d)},children:"Save"})]})]})]})}};var h,F,P;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{code:`const Default = (args) => {
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
`,...(P=(F=a.parameters)==null?void 0:F.docs)==null?void 0:P.source}}};var k,R,S;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{code:`const WithRgbaDefaultFormat = (args) => {
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
`,...(S=(R=l.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};var x,y,f;u.parameters={...u.parameters,docs:{...(x=u.parameters)==null?void 0:x.docs,source:{code:`const OnlyPicker = (args) => {
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
`,...(f=(y=u.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var j,O,v;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{code:`const OnlyValues = (args) => {
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
`,...(v=(O=c.parameters)==null?void 0:O.docs)==null?void 0:v.source}}};var B,G,b;C.parameters={...C.parameters,docs:{...(B=C.parameters)==null?void 0:B.docs,source:{code:`const InFlyout = (args) => {
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
`,...(b=(G=C.parameters)==null?void 0:G.docs)==null?void 0:b.source}}};var I,V,w;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(w=(V=a.parameters)==null?void 0:V.docs)==null?void 0:w.source}}};var W,D,E;l.parameters={...l.parameters,docs:{...(W=l.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(E=(D=l.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var T,A,H;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(_=(X=c.parameters)==null?void 0:X.docs)==null?void 0:_.source}}};var z,L,q;C.parameters={...C.parameters,docs:{...(z=C.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(q=(L=C.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};const Fr=["Default","WithRgbaDefaultFormat","OnlyPicker","OnlyValues","InFlyout"];export{a as Default,C as InFlyout,u as OnlyPicker,c as OnlyValues,l as WithRgbaDefaultFormat,Fr as __namedExportsOrder,hr as default};
