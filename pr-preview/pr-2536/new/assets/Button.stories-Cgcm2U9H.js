import{j as e}from"./iframe-vSLzqmy6.js";import{o as z,c as C}from"./fondue-icons366-D0ifgX8H.js";import{B as d}from"./Button-D0bgmiSb.js";import"./preload-helper-CxYQSAo3.js";import"./styleUtilities-Byf6Fdv2.js";import"./focusStyle-IgMhxCMT.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,D={title:"Components/Button",component:d,tags:["autodocs"],parameters:{status:{type:"released"}},args:{type:"button",variant:"default",emphasis:"default",size:"medium",rounding:"medium",disabled:!1,hugWidth:!0,children:"Button Text",aspect:"default",onPress:R("onPress")}},r={name:"Icon and Text Label",render:n=>e.jsxs(d,{...n,children:[e.jsx(z,{size:16}),"Button Text"]})},t={},s={name:"Icon Only",args:{aspect:"square",children:e.jsx(C,{size:20})}},a={name:"Icon Only Rounded",args:{rounding:"full",title:"Icon Only Rounded",children:e.jsx(C,{size:20}),aspect:"square"}},o={name:"Icon and Text Label",render:n=>e.jsxs(d,{...n,children:[e.jsx(z,{size:16}),"Button Text"]})},c={name:"With Link as Child",args:{asChild:!0},render:n=>e.jsx(d,{...n,children:e.jsx("a",{href:"https://www.frontify.com/",children:"Button Text"})})};var i,u,m;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(m=(u=r.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var l,p,h;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(h=(p=t.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var x,g,I;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: 'Icon Only',
  args: {
    aspect: 'square',
    children: <IconIcon size={20} />
  }
}`,...(I=(g=s.parameters)==null?void 0:g.docs)==null?void 0:I.source}}};var f,B,T;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: 'Icon Only Rounded',
  args: {
    rounding: 'full',
    title: 'Icon Only Rounded',
    children: <IconIcon size={20} />,
    aspect: 'square'
  }
}`,...(T=(B=a.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};var O,L,y;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: 'Icon and Text Label',
  render: args => <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
}`,...(y=(L=o.parameters)==null?void 0:L.docs)==null?void 0:y.source}}};var W,b,j;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  name: 'With Link as Child',
  args: {
    asChild: true
  },
  render: args => <Button {...args}>
            <a href="https://www.frontify.com/">Button Text</a>
        </Button>
}`,...(j=(b=c.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};const E=["Default","TextLabelOnly","WithIcon","WithRoundedIcon","WithIconAndLabel","WithLink"];export{r as Default,t as TextLabelOnly,s as WithIcon,o as WithIconAndLabel,c as WithLink,a as WithRoundedIcon,E as __namedExportsOrder,D as default};
