import{j as o}from"./jsx-runtime-DBEcOq3S.js";import{r as O}from"./index-DtJulBIN.js";import{B as p}from"./Button-CnC-uSyE.js";import{a as y,b as D,c as v,T as e}from"./Tooltip-iErnfzB3.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-T76WvCte.js";import"./focusStyle-IgMhxCMT.js";import"./index-DYI_kRwo.js";import"./index-B6WxdOXM.js";import"./index-DD2ZIxVL.js";import"./index-P-l_ls5c.js";import"./index-Ddz0BVCY.js";import"./index-DBH0Kh6a.js";import"./index-jbnhK9sQ.js";import"./index-CMjj8zSi.js";import"./index-BK_vzMtd.js";const A={component:y,title:"Components/Tooltip",subcomponents:{"Tooltip.Content":D,"Tooltip.Trigger":v},tags:["autodocs"],parameters:{status:{type:"in_progress"}},render:({...t})=>o.jsxs(e.Root,{...t,children:[o.jsx(e.Trigger,{children:o.jsx(p,{children:"Hover over me!"})}),o.jsx(e.Content,{children:"I am a tooltip!"})]})},r={args:{}},n={args:{enterDelay:0}},s={args:{enterDelay:2e3}},a={decorators:[t=>o.jsx("div",{className:"tw-flex tw-gap-4",children:o.jsx(t,{})})],render:()=>{const[t,i]=O.useState(!1);return o.jsxs(o.Fragment,{children:[o.jsxs(e.Root,{open:t,onOpenChange:i,children:[o.jsx(e.Trigger,{children:o.jsx(p,{children:"Hover over me!"})}),o.jsx(e.Content,{children:"I am a tooltip!"})]}),o.jsx(p,{onPress:()=>i(!0),children:"Open Tooltip"}),o.jsx(p,{onPress:()=>i(!1),children:"Close Tooltip"})]})}};var l,m,c;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {}
}`,...(c=(m=r.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var d,u,T;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    enterDelay: 0
  }
}`,...(T=(u=n.parameters)==null?void 0:u.docs)==null?void 0:T.source}}};var g,x,j;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    enterDelay: 2000
  }
}`,...(j=(x=s.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var C,h,f;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(f=(h=a.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};const G=["Default","NoDelay","LongDelay","ControlledComponent"];export{a as ControlledComponent,r as Default,s as LongDelay,n as NoDelay,G as __namedExportsOrder,A as default};
