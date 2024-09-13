import{j as o}from"./jsx-runtime-Nms4Y4qS.js";import{r as w}from"./index-BwDkhjyp.js";import{B as p}from"./Button-Bmc9bttI.js";import{S as D}from"./Switch-BkmYdC2_.js";import{a as I,b as R,c as B,T as e}from"./Tooltip-DUtJk-pB.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-BnElyh0X.js";import"./focusStyle-IgMhxCMT.js";import"./index-DOnKqARA.js";import"./index-Brw_kfkv.js";import"./index-DxjWwZXO.js";import"./index-BWD2N0gV.js";import"./index-DGaPG0k3.js";import"./index-BgCrdp81.js";import"./index-kUwV4muI.js";import"./index-9q6yCIGA.js";import"./index-DduqEaLY.js";import"./index-BwIM2_zL.js";const U={component:I,title:"Components/Tooltip",subcomponents:{"Tooltip.Content":R,"Tooltip.Trigger":B},tags:["autodocs"],parameters:{status:{type:"in_progress"}},render:({...r})=>o.jsxs(e.Root,{...r,children:[o.jsx(e.Trigger,{children:o.jsx(p,{children:"Hover over me!"})}),o.jsx(e.Content,{children:"I am a tooltip!"})]})},t={args:{}},n={args:{enterDelay:0}},s={args:{enterDelay:2e3}},a={decorators:[r=>o.jsx("div",{className:"tw-flex tw-gap-4",children:o.jsx(r,{})})],render:()=>{const[r,l]=w.useState(!1);return o.jsxs(o.Fragment,{children:[o.jsxs(e.Root,{open:r,onOpenChange:l,children:[o.jsx(e.Trigger,{children:o.jsx(p,{children:"Hover over me!"})}),o.jsx(e.Content,{children:"I am a tooltip!"})]}),o.jsx(p,{onPress:()=>l(!0),children:"Open Tooltip"}),o.jsx(p,{onPress:()=>l(!1),children:"Close Tooltip"})]})}},i={decorators:[r=>o.jsx("div",{className:"tw-flex tw-gap-4",children:o.jsx(r,{})})],render:()=>o.jsxs(e.Root,{children:[o.jsx(e.Trigger,{children:o.jsx(D,{"aria-label":"Hover me!"})}),o.jsx(e.Content,{children:"I am a tooltip!"})]})};var m,c,d;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {}
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,T,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    enterDelay: 0
  }
}`,...(g=(T=n.parameters)==null?void 0:T.docs)==null?void 0:g.source}}};var x,h,j;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    enterDelay: 2000
  }
}`,...(j=(h=s.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};var C,f,v;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(v=(f=a.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var S,y,O;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  decorators: [Story => {
    return <div className="tw-flex tw-gap-4">
                    <Story />
                </div>;
  }],
  render: () => {
    return <Tooltip.Root>
                <Tooltip.Trigger>
                    <Switch aria-label="Hover me!" />
                </Tooltip.Trigger>
                <Tooltip.Content>I am a tooltip!</Tooltip.Content>
            </Tooltip.Root>;
  }
}`,...(O=(y=i.parameters)==null?void 0:y.docs)==null?void 0:O.source}}};const V=["Default","NoDelay","LongDelay","ControlledComponent","WithFormComponent"];export{a as ControlledComponent,t as Default,s as LongDelay,n as NoDelay,i as WithFormComponent,V as __namedExportsOrder,U as default};
