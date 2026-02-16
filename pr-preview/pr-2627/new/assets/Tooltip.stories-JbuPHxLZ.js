import{j as o,r as to,F as eo}from"./iframe-pojAo36N.js";import{n as no,h as ro,c as so}from"./fondue-icons372-CPCnPfhf.js";import{B as c}from"./Button-D170-R9e.js";import{L as io}from"./Label-XMWoHnkQ.js";import{S as ao}from"./Switch-DyssYJOJ.js";import{T as m}from"./TextInput-BTn-iMnN.js";import{a as po,b as lo,c as co,T as t}from"./Tooltip-QxFm2S19.js";import"./preload-helper-zta_rV5C.js";import"./index-DnhmpWcy.js";import"./index-Ddl_i04C.js";import"./index-8WYzREwD.js";import"./index-BDl2nEmf.js";import"./useTranslation-BEZSfz59.js";import"./LoadingCircle-7czUJ1IS.js";import"./index-CAeUnbsf.js";import"./index-B6n2D-cG.js";const yo={component:co,title:"Components/Tooltip",subcomponents:{"Tooltip.Content":lo,"Tooltip.Trigger":po},tags:["autodocs"],parameters:{status:{type:"released"},docs:{description:{component:["A small, floating text label that appears on hover or focus to describe an element. Disappears when the user moves away.","","**When to use:** To provide supplementary context for icons, truncated text, or controls that lack a visible label. Keep content brief — for richer content use `<Flyout>`."].join(`
`)}}},render:({...l})=>o.jsxs(t.Root,{...l,children:[o.jsx(t.Trigger,{children:o.jsx("p",{children:"Hover over me!"})}),o.jsx(t.Content,{children:"I am a tooltip!"})]})},e={args:{}},n={args:{enterDelay:0}},r={args:{enterDelay:2e3}},s={decorators:[l=>o.jsx("div",{className:"tw-flex tw-gap-4",children:o.jsx(l,{})})],render:()=>{const[l,T]=to.useState(!1);return o.jsxs(o.Fragment,{children:[o.jsxs(t.Root,{open:l,onOpenChange:T,children:[o.jsx(t.Trigger,{children:o.jsx(c,{children:"Hover over me!"})}),o.jsx(t.Content,{children:"I am a tooltip!"})]}),o.jsx(c,{onPress:()=>T(!0),children:"Open Tooltip"}),o.jsx(c,{onPress:()=>T(!1),children:"Close Tooltip"})]})}},i={render:()=>o.jsxs(eo,{direction:"row",gap:"4px",align:"flex-start",children:[o.jsx(ao,{id:"switch","aria-label":"Hover me!"}),o.jsx(io,{htmlFor:"switch",children:o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(no,{size:16})}),o.jsx(t.Content,{children:"I am a tooltip!"})]})})]})},a={render:()=>o.jsxs(m.Root,{children:[o.jsx(m.Slot,{name:"left",children:o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(ro,{size:16})}),o.jsx(t.Content,{children:"I have a pen"})]})}),o.jsx(m.Slot,{name:"right",children:o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{children:o.jsx(so,{size:16})}),o.jsx(t.Content,{children:"I am an icon with a tooltip"})]})})]})},p={render:()=>o.jsxs(t.Root,{children:[o.jsx(t.Trigger,{asChild:!0,children:o.jsx(c,{children:"Hover me!"})}),o.jsx(t.Content,{children:"I am a tooltip!"})]})};var d,u,g;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{code:`const Default = () => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <p>Hover over me!</p>
      </Tooltip.Trigger>
      <Tooltip.Content>I am a tooltip!</Tooltip.Content>
    </Tooltip.Root>
  );
};
`,...(g=(u=e.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var h,x,I;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{code:`const NoDelay = () => {
  return (
    <Tooltip.Root enterDelay={0}>
      <Tooltip.Trigger>
        <p>Hover over me!</p>
      </Tooltip.Trigger>
      <Tooltip.Content>I am a tooltip!</Tooltip.Content>
    </Tooltip.Root>
  );
};
`,...(I=(x=n.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};var C,R,j;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{code:`const LongDelay = () => {
  return (
    <Tooltip.Root enterDelay={2000}>
      <Tooltip.Trigger>
        <p>Hover over me!</p>
      </Tooltip.Trigger>
      <Tooltip.Content>I am a tooltip!</Tooltip.Content>
    </Tooltip.Root>
  );
};
`,...(j=(R=r.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var f,v,S;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{code:`const ControlledComponent = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  return (
    <>
      <Tooltip.Root open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <Tooltip.Trigger>
          <Button>Hover over me!</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>I am a tooltip!</Tooltip.Content>
      </Tooltip.Root>
      <Button onPress={() => setIsTooltipOpen(true)}>Open Tooltip</Button>
      <Button onPress={() => setIsTooltipOpen(false)}>Close Tooltip</Button>
    </>
  );
};
`,...(S=(v=s.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var w,B,O;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{code:`const WithSwitch = () => (
  <Flex direction="row" gap="4px" align="flex-start">
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
);
`,...(O=(B=i.parameters)==null?void 0:B.docs)==null?void 0:O.source}}};var y,D,b;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{code:`const WithTextInput = () => (
  <TextInput.Root>
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
);
`,...(b=(D=a.parameters)==null?void 0:D.docs)==null?void 0:b.source}}};var H,F,W;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{code:`const WithButton = () => (
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <Button>Hover me!</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>I am a tooltip!</Tooltip.Content>
  </Tooltip.Root>
);
`,...(W=(F=p.parameters)==null?void 0:F.docs)==null?void 0:W.source}}};var z,L,P;e.parameters={...e.parameters,docs:{...(z=e.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {}
}`,...(P=(L=e.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var N,E,_;n.parameters={...n.parameters,docs:{...(N=n.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    enterDelay: 0
  }
}`,...(_=(E=n.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var k,A,K;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    enterDelay: 2000
  }
}`,...(K=(A=r.parameters)==null?void 0:A.docs)==null?void 0:K.source}}};var q,G,J;s.parameters={...s.parameters,docs:{...(q=s.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(J=(G=s.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var M,Q,U;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(U=(Q=i.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var V,X,Y;a.parameters={...a.parameters,docs:{...(V=a.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(Y=(X=a.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,oo;p.parameters={...p.parameters,docs:{...(Z=p.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <Button>Hover me!</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Root>
}`,...(oo=($=p.parameters)==null?void 0:$.docs)==null?void 0:oo.source}}};const Do=["Default","NoDelay","LongDelay","ControlledComponent","WithSwitch","WithTextInput","WithButton"];export{s as ControlledComponent,e as Default,r as LongDelay,n as NoDelay,p as WithButton,i as WithSwitch,a as WithTextInput,Do as __namedExportsOrder,yo as default};
