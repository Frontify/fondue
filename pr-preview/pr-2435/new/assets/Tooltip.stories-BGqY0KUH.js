import{j as o}from"./jsx-runtime-BYYWji4R.js";import{r as L}from"./index-ClcD9ViR.js";import{i as W,b as P,c as N}from"./fondue-icons351-BwRByKtE.js";import{B as c}from"./Button-iQhkEP3o.js";import{F as E}from"./Flex-BQUHScux.js";import{L as _}from"./Label-1bHheCUK.js";import{S as k}from"./Switch-CcrT1d-3.js";import{T as d}from"./TextInput-KIsEXpm_.js";import{a as q,b as A,c as G,T as t}from"./Tooltip-Dh5B_QLB.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./styleUtilities-Byf6Fdv2.js";import"./focusStyle-IgMhxCMT.js";import"./propsToCssVariables-DuhnUZvM.js";import"./index-CMmqAaFT.js";import"./index-BUMxx5F6.js";import"./index-Q_VQqEV0.js";import"./index-DulyF36n.js";import"./index-CWz5EflU.js";import"./index-BZQsQlpo.js";import"./index-sY83p_TZ.js";import"./index-JHbJ-wYR.js";import"./index-BezEZHzC.js";import"./ThemeProvider-Dbar5Ost.js";const go={component:G,title:"Components/Tooltip",subcomponents:{"Tooltip.Content":A,"Tooltip.Trigger":q},tags:["autodocs"],parameters:{status:{type:"released"}},render:({...e})=>o.jsxs(t.Root,{...e,children:[o.jsx(t.Trigger,{children:o.jsx("p",{children:"Hover over me!"})}),o.jsx(t.Content,{children:"I am a tooltip!"})]})},r={args:{}},n={args:{enterDelay:0}},s={args:{enterDelay:2e3}},i={decorators:[e=>o.jsx("div",{className:"tw-flex tw-gap-4",children:o.jsx(e,{})})],render:()=>{const[e,m]=L.useState(!1);return o.jsxs(o.Fragment,{children:[o.jsxs(t.Root,{open:e,onOpenChange:m,children:[o.jsx(t.Trigger,{children:o.jsx(c,{children:"Hover over me!"})}),o.jsx(t.Content,{children:"I am a tooltip!"})]}),o.jsx(c,{onPress:()=>m(!0),children:"Open Tooltip"}),o.jsx(c,{onPress:()=>m(!1),children:"Close Tooltip"})]})}},a={render:()=>o.jsxs(E,{direction:"row",gap:"4px",align:"flex-start",children:[o.jsx(k,{id:"switch","aria-label":"Hover me!"}),o.jsx(_,{htmlFor:"switch",children:o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(W,{size:16})}),o.jsx(t.Content,{children:"I am a tooltip!"})]})})]})},p={render:()=>o.jsxs(d.Root,{children:[o.jsx(d.Slot,{name:"left",children:o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(P,{size:16})}),o.jsx(t.Content,{children:"I have a pen"})]})}),o.jsx(d.Slot,{name:"right",children:o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(N,{size:16})}),o.jsx(t.Content,{children:"I am an icon with a tooltip"})]})})]})},l={render:()=>o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{asChild:!0,children:o.jsx(c,{children:"Hover me!"})}),o.jsx(t.Content,{children:"I am a tooltip!"})]})};var T,g,u;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {}
}`,...(u=(g=r.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var x,h,j;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    enterDelay: 0
  }
}`,...(j=(h=n.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};var I,C,f;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    enterDelay: 2000
  }
}`,...(f=(C=s.parameters)==null?void 0:C.docs)==null?void 0:f.source}}};var S,R,w;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  decorators: [Story => {
    return <div className="tw-flex tw-gap-4">
                    <Story />
                </div>;
  }],
  render: () => {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    return <>
                <Tooltip.Root open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
                    <Tooltip.Trigger>
                        <Button>Hover over me!</Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                </Tooltip.Root>
                <Button onPress={() => setIsTooltipOpen(true)}>Open Tooltip</Button>
                <Button onPress={() => setIsTooltipOpen(false)}>Close Tooltip</Button>
            </>;
  }
}`,...(w=(R=i.parameters)==null?void 0:R.docs)==null?void 0:w.source}}};var v,O,B;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <Flex direction="row" gap="4px" align="flex-start">
            <Switch id="switch" aria-label="Hover me!" />
            <Label htmlFor="switch">
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <IconInfo size={16} />
                    </Tooltip.Trigger>
                    <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                </Tooltip.Root>
            </Label>
        </Flex>
}`,...(B=(O=a.parameters)==null?void 0:O.docs)==null?void 0:B.source}}};var y,D,b;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <TextInput.Root>
            <TextInput.Slot name="left">
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <IconPen size={16} />
                    </Tooltip.Trigger>
                    <Tooltip.Content>I have a pen</Tooltip.Content>
                </Tooltip.Root>
            </TextInput.Slot>
            <TextInput.Slot name="right">
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <IconIcon size={16} />
                    </Tooltip.Trigger>
                    <Tooltip.Content>I am an icon with a tooltip</Tooltip.Content>
                </Tooltip.Root>
            </TextInput.Slot>
        </TextInput.Root>
}`,...(b=(D=p.parameters)==null?void 0:D.docs)==null?void 0:b.source}}};var F,H,z;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <Button>Hover me!</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Root>
}`,...(z=(H=l.parameters)==null?void 0:H.docs)==null?void 0:z.source}}};const uo=["Default","NoDelay","LongDelay","ControlledComponent","WithSwitch","WithTextInput","WithButton"];export{i as ControlledComponent,r as Default,s as LongDelay,n as NoDelay,l as WithButton,a as WithSwitch,p as WithTextInput,uo as __namedExportsOrder,go as default};
